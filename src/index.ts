import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { GetValidate } from "./validate";

export const router = OpenAPIRouter({
  schema: {
    info: {
      title: 'EU VAT number validation API',
      description: 'A plugin that allows the user to validate an EU VAT number.',
      version: 'v0.0.1',
    },
  },
  docs_url: '/',
  aiPlugin: {
    name_for_human: 'EU VAT validation',
    name_for_model: 'eu_vat_validation',
    description_for_human: "EU VAT number validation plugin for ChatGPT.",
    description_for_model: "EU VAT number validation plugin for ChatGPT. You can validate EU VAT numbers using this plugin.",
    contact_email: 'chatgpt_eu_vat_validation@anthonyringoet.be',
    legal_info_url: 'http://www.example.com/legal',
    logo_url: 'https://workers.cloudflare.com/resources/logo/logo.svg',
  },
})

router.get('/validate', GetValidate)

// 404 catchall
router.all('*', () => new Response('Not Found', { status: 404 }))

export default {
  fetch: router.handle
}
