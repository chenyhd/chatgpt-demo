import { fetch } from 'undici'
import type { APIRoute } from 'astro'

const baseUrl = import.meta.env.OPENAI_API_BASE_URL

export const post: APIRoute = async(context) => {
  const body = await context.request.json()

  const { pass } = body

  const apiUrl = `${baseUrl}/user/info?from=x-vercel-server`

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${pass}`,
    },
  })
  const data = await response.json()
  // eslint-disable-next-line no-console
  console.log(`User data ${data.username}`)
  const username = data.username
  return new Response(JSON.stringify({
    code: (username) ? 0 : -1,
    error: data.error,
  }))
}
