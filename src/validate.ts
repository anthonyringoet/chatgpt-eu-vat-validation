import { OpenAPIRoute, Query } from "@cloudflare/itty-router-openapi";

const ALLOWED_COUNTRIES = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','EL','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE', 'XI']

export class GetValidate extends OpenAPIRoute {
  static schema = {
    tags: ['Validate'],
    summary: 'Validate an EU VAT number',
    parameters: {
      vat_number: Query(String, {
        description: 'The VAT number to validate',
        default: 'BE0112233445'
      }),
    },
    responses: {
      '200': {
        schema: {
          address: "Apple Street 1, 1000 Brussels, Belgium",
          isValid: true,
          name: "Fake BV",
          vatNumber: "0112233445",
          countryCode: "BE"
        },
      },
      '400': {
        schema: {
          error: "Invalid VAT number"
        },
      }
    },
  }

  async handle(request: Request, env, ctx, data: Record<string, any>) {
    // split the vat number in country code and numbers
    const country_code = data.vat_number.substring(0, 2)
    const numbers = data.vat_number.substring(2)

    if (!ALLOWED_COUNTRIES.includes(country_code)) {
      return new Response(JSON.stringify({ error: 'Invalid country_code' }), {
        status: 400,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        }
      })
    }

    const url = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${country_code}/vat/${numbers}`

    const resp = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'EU_VAT ChatGPT Plugin v0.0.1'
      }
    })

    if (!resp.ok) {
      return new Response(await resp.text(), { status: 400 })
    }

    // @ts-ignore
    const { address, isValid, name, userError, vatNumber } = await resp.json()

    if (!isValid || userError === 'INVALID') {
      return new Response(JSON.stringify({ error: 'Invalid VAT number' }), {
        status: 400,
        headers: {
          "content-type": "application/json;charset=UTF-8",
        }
      })
    }


    return new Response(JSON.stringify({
      address,
      isValid,
      name,
      vatNumber,
      countryCode: country_code
    }), {
      status: 200
    })
  }
}
