# OpenAI Worker on Cloudflare

A Cloudflare Worker that exposes simple HTTP endpoints for generating Madlib stories and images using OpenAI APIs. 

## Table of Contents

- [OpenAI Worker on Cloudflare](#openai-worker-on-cloudflare)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Deployment](#deployment)
  - [Endpoints](#endpoints)
    - [`GET /`](#get-)
    - [`POST /madlib`](#post-madlib)
    - [`POST /image`](#post-image)
  - [Gateway Configuration](#gateway-configuration)
  - [Project Structure](#project-structure)
  - [Frontend Project](#frontend-project)
  - [Demo Videos](#demo-videos)
    - [Wacky Madlib App Marketing Video](#wacky-madlib-app-marketing-video)
    - [Behind the Code, Architecture, and Demo](#behind-the-code-architecture-and-demo)

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
## Demo Videos

### Wacky Madlib App Marketing Video

😂Wacky Madlib App Made THIS?! [Watch on YouTube](https://www.youtube.com/shorts/qyWQo9VDbt8 "😂Wacky Madlib App Marketing Video")

🦝✨ Ever wondered what happens when you mix AI with total nonsense? Meet the Wacky Madlib App—where YOU choose the words (like “Disco Raccoon,” “Boogie,” and “Squishy”), and the AI turns them into a hilariously unhinged story… then generates an image to match. Yes, it’s as weird as it sounds—and yes, you’re going to love it.

🎉 In this short demo, watch the magic unfold as our AI spins your wildest word combos into a story that makes zero sense and 100% joy. Bonus: You get to see a raccoon in bell-bottoms. You’re welcome.

🧠 Built with Cloudflare Workers + AI wizardry
🎨 Story + Image = Instant chaos
😂 Try it. Share it. Confuse your friends.
👉 Like, comment, and subscribe for more AI-powered absurdity!

Watch the funny marketing demo video on [YouTube](https://www.youtube.com/shorts/qyWQo9VDbt8 "😂Wacky Madlib App Marketing Video")

### Behind the Code, Architecture, and Demo

🎬 Madlibs, Mayhem & Magic: Behind the Code and Demo of My AI Generator [Watch on Youtube](https://www.youtube.com/watch?v=LTxtzDpAH1A "Behind the Code and Demo of My AI Generator")

Ready for an AI-powered rollercoaster of absurdity and innovation? In this demo, I take you deep into the colorful chaos of my Madlib Generator web app, where users throw in wild nouns, quirky verbs, and eccentric adjectives to spark utterly ridiculous stories. Once a story is born, DALL·E jumps in to create matching visuals—unless you're stuck in cache déjà vu! 💥 This app is lightning-fast thanks to Cloudflare Workers and a strategically crafted AI Gateway that caches responses, reduces costs, and keeps the backend humming.

But it’s not just about the giggles—this walkthrough dives into the technical nuts and bolts. I break down the architecture from frontend to backend, show how token usage and caching strategies are logged in real time, and even zoom into analytics dashboards to analyze traffic patterns, response times, and OpenAI API usage legs. Whether you're here for the weird stories or the sleek design powered by vanilla JavaScript, it’s a wild blend of creativity, performance, and practical engineering. Buckle up, because this isn’t just a demo—it’s a celebration of playful problem-solving at the edge. 🚀🧠

Watch the complete video on [Youtube](https://www.youtube.com/watch?v=LTxtzDpAH1A "Behind the Code and Demo of My AI Generator")

---
Keep the nonsense alive!
