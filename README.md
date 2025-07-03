# OpenAI Worker on Cloudflare

A Cloudflare Worker that exposes simple HTTP endpoints for generating Madlib stories and images using OpenAI APIs. 

![a dog with googles flying on a Cloudflare cloud](images/cloudflaredoggie.png)

Built with [itty-router](https://github.com/kwhitley/itty-router) and the [OpenAI Node.js SDK](https://github.com/openai/openai-node).

---

## Features

- **/madlib**: Generate a humorous Madlib story using OpenAI GPT-4.1-nano.
- **/image**: Generate an image using OpenAI DALL-E.
- CORS enabled for easy integration with web clients.

---

## Installation

```sh
npm install
```

---

## Configuration

1. **Set your OpenAI API key as a secret:**

   ```sh
   npx wrangler secret put OPENAI_API_KEY
   ```

2. **Configure your Cloudflare OpenAI Gateway:**

   - Replace `your_gateway_url_here` in [`src/index.js`](src/index.js) with your actual Cloudflare OpenAI Gateway URL.
   - Replace `your_account_id` in [`wrangler.toml`](wrangler.toml) with your Cloudflare account ID.
   - Update the `routes` pattern in [`wrangler.toml`](wrangler.toml) as needed.

---

## Development

Start a local development server:

```sh
npm run dev
```

---

## Deployment

Deploy to Cloudflare Workers:

```sh
npm run deploy
```

---

## Endpoints

### `GET /`

- Returns: `"Hello!"`  
- Use to test connectivity.

---

### `POST /madlib`

- **Body:** JSON array of words, e.g. `["cat", "banana", "run"]`
- **Returns:** A short, humorous Madlib story (≤ 50 words) using the provided words.

**Example:**

```sh
curl -X POST https://<your-worker-url>/madlib \
  -H "Content-Type: application/json" \
  -d '["cat", "banana", "run"]'
```

---

### `POST /image`

- **Body:** Plain text prompt describing the image.
- **Returns:** JSON with a base64-encoded image.

**Example:**

```sh
curl -X POST https://<your-worker-url>/image \
  -H "Content-Type: text/plain" \
  --data "A cat running with a banana"
```

**Response:**

```json
{
  "b64_json": "<base64-encoded-image>"
}
```

---

## Gateway Configuration

- The worker uses a Cloudflare OpenAI Gateway for API calls.
- Update the `baseURL` in [`src/index.js`](src/index.js) to your gateway URL.
- See [Cloudflare OpenAI Gateway docs](https://developers.cloudflare.com/openai/gateway/) for setup instructions.

---

## Project Structure

- [`src/index.js`](src/index.js): Worker source code and endpoint logic.
- [`wrangler.toml`](wrangler.toml): Cloudflare Worker configuration.
- [`wrangler.jsonc`](wrangler.jsonc): Additional Wrangler config.
- [`package.json`](package.json): Project dependencies and scripts.

---
## Frontend Project

[wacky-madlib-frontend](https://github.com/kathleenwest/wacky-madlib-frontend)

A playful web app for generating wacky, AI-powered stories and images. Built with Vite and vanilla JS, it connects to an OpenAI backend via Cloudflare Workers and the Cloudflare AI Gateway for secure and efficient AI API usage. Great for fun, creativity, and demoing modern AI integration.

To be able to play with the app, you can visit the live demo at: https://kathleenwest.github.io/wacky-madlib-frontend/

---
## Demo Video

- Watch the funny marketing demo video on [YouTube](https://www.youtube.com/shorts/qyWQo9VDbt8 "😂Wacky Madlib App Marketing Video")
- Watch the demo video on COMING SOON!
---
Keep the nonsense alive!
