# EU VAT Validation ChatGPT plugin

The plugin allows ChatGPT users to validate EU VAT numbers and get company address info. The plugin is implemented in TypeScript and uses the [OpenAPI](https://www.openapis.org/) specification to define the plugin's API.

<img width="1225" alt="eu-vat-openapi" src="https://github.com/anthonyringoet/chatgpt-eu-vat-validation/assets/576905/255ed3f2-21bf-4aa6-b7c5-3168567bbb20">


## Get started

0. Sign up for [Cloudflare Workers](https://workers.dev). The free tier is more than enough for most use cases.
1. Install [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update), the Cloudflare Workers CLI
2. Clone this project and install dependencies with `npm install`
3. Run `wrangler login` to login to your Cloudflare account in wrangler
4. Run `wrangler deploy` to publish the plugin to Cloudflare Workers

## Usage

1. You can configure the `.well-known/ai-plugin.json` route in `index.ts`.
2. Update the OpenAPI schema simply by updating your routes in `index.ts`.
3. You can set up any new routes and the associated OpenAPI schema by defining new routes. See `validate.ts` for an example.

## Deploying to OpenAI's API

Follow the instructions [in the ChatGPT documentation](https://platform.openai.com/docs/plugins/introduction/plugin-flow) to deploy your plugin and begin using it in ChatGPT.
