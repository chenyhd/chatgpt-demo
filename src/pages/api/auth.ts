import { getRuntime } from '@astrojs/cloudflare/runtime'
import type { APIRoute } from 'astro'

export const post: APIRoute = async(context) => {
  const body = await context.request.json()

  const runtime = getRuntime(context.request)

  const realPassword = runtime.env.SITE_PASSWORD || ''
  const passList = realPassword.split(',') || []

  const { pass } = body
  return new Response(JSON.stringify({
    code: (!realPassword || pass === realPassword || passList.includes(pass)) ? 0 : -1,
  }))
}
