import OpenAI from 'openai';
import { AutoRouter, cors } from 'itty-router'

// Create the CORS middleware
const { preflight, corsify } = cors(); 

// Create a router instance using itty-router's AutoRouter
// Initialize the router with the preflight handler
// This allows the router to handle CORS preflight requests automatically
// The preflight handler will respond to OPTIONS requests with appropriate CORS headers
// The corsify handler will add CORS headers to the responses for GET, POST, etc.
const router = AutoRouter({
  before: [preflight],  // add preflight upstream
  finally: [corsify],   // and corsify downstream
})

// Root route – simple connectivity test
router.get('/', () => 'Hello!');

// Handle Madlib generation using OpenAI's chat completion API
// POST /madlib
// Expects an array of words in the request body to generate a humorous Madlib story
// Returns the generated story or an error message
// Uses OpenAI's chat completion API to create a short story based on the provided words
// The story will be humorous and limited to 50 words or less
router.post('/madlib', async (request, env, ctx) => {
  
  // Retrieve the OpenAI API key from environment variables
  // Use env.OPENAI_API_KEY to access the API key
  const apiKey = env.OPENAI_API_KEY;

  // Check if the API key is provided in the environment variables
  // If not, return a 500 error with a message
  if (!apiKey) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 });
  }

  // Initialize OpenAI client with the API key
  // Use the OpenAI library to create a new client instance
  // The baseURL is set to the Cloudflare OpenAI gateway
  // This allows the worker to communicate with OpenAI's API
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "your_gateway_url_here" // Replace with your actual gateway URL
  });

  // Parse the request body as JSON
  const words = await request.json();
  
  // Validate the input
  // Ensure words is an array and has at least one word
  if (!words) {
    return new Response("Missing or invalid words", { status: 400 });
  }

  // Create a prompt for the OpenAI chat completion
  // Use the provided words to create a humorous Madlib story prompt
  const prompt = `Write a hilarious Madlib short story (50 words or less) using these words: ${JSON.stringify(words)}`;

  // Call OpenAI's chat completion API to generate the story
  // Use the openai.chat.completions.create method to generate a response
  try {
    // Make the API call to OpenAI
    // Specify the model, messages, temperature, and max tokens
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [{ role: 'system', content: prompt }],
      temperature: 1,
      max_tokens: 100
    });

    // Extract the generated story from the response
    // Access the content of the first choice in the response
    // The content will be the generated Madlib story based on the provided words
    const story = response.choices[0]?.message?.content;

    // Return the generated story or a default message if no story was generated
    // Use a 200 status code if a story was generated, otherwise 500
    return new Response(story || "No story generated.", { status: story ? 200 : 500});

    // If the API call fails, catch the error and log it
  } catch (error) {

    // Log the error to the console for debugging
    // This will help identify issues with the OpenAI API call
    console.error("OpenAI error:", error);

    // Return a 500 error with a message indicating something went wrong
    return new Response("Something went wrong generating your madlib.", { status: 500 });
  }
});

// Handle image generation using OpenAI's DALL-E model
// POST /image
// Expects a text prompt in the request body to generate an image
// Returns the generated image in base64 format
// Uses OpenAI's DALL-E model to create images based on the provided prompt
router.post('/image', async (request, env, ctx) => {

  // Retrieve the OpenAI API key from environment variables
  const apiKey = env.OPENAI_API_KEY;

  // Check if the API key is provided in the environment variables
  // If not, return a 500 error with a message
  if (!apiKey) {
    return new Response("Missing OPENAI_API_KEY", { status: 500 });
  }

  // Initialize OpenAI client with the API key
  // Use the OpenAI library to create a new client instance
  // The baseURL is set to the Cloudflare OpenAI gateway
  // This allows the worker to communicate with OpenAI's API
  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "your_gateway_url_here" // Replace with your actual gateway URL
  });

  // Parse the request body as JSON
  // Expect the request body to contain a text prompt for image generation
  const prompt = await request.text();

  // Validate the input
  // Ensure the prompt is a non-empty string
  if (!prompt) {
    return new Response("Missing prompt", { status: 400 });
  }

  // Create a prompt for the OpenAI image generation
  // Use the provided prompt to generate an image using DALL-E
  // The prompt should describe the image to be generated
  try {
    // Call OpenAI's image generation API to create the image
    // Use the openai.images.generate method to generate an image
    const response = await openai.images.generate({
        model: 'dall-e-2', // default dall-e-2
        prompt: prompt, //required
        n: 1, //default 1 
        size: '256x256', //default 1024x1024
        // style: 'natural', //default vivid (other option: natural)
        response_format: 'b64_json' //default url
    })

    // Extract the base64-encoded image from the response
    // Access the first image in the response data
    const image = response.data[0].b64_json;

    // Return the generated image or a default message if no image was generated
    // Use a 200 status code if an image was generated, otherwise 500
    return new Response(
      JSON.stringify({ b64_json: image }),
      {
        status: image ? 200 : 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );

    // If the API call fails, catch the error and log it
  } catch (error) {

    // Log the error to the console for debugging
    // This will help identify issues with the OpenAI API call
    console.error("OpenAI error:", error);
    
    // Return a 500 error with a message indicating something went wrong
    return new Response("Something went wrong generating your image.", { status: 500 });
  }
});

// Catch-all for undefined routes
router.all('*', () => new Response("404 - Not found", { status: 404 }));

// Export the router for use in the worker
export default router