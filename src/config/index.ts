const dev = process.env.NODE_ENV !== 'production'

export const HTTP_SERVER = dev ? 'http://localhost:3000' : 'https://boris-art.vercel.app'
export const SERVER = dev
  ? 'http://localhost:3000/api/graphql'
  : 'https://boris-art.vercel.app/api/graphql'
export const WEB_SOCKET_LINK = dev
  ? 'ws://localhost:3000/api/graphql'
  : 'https://boris-art.vercel.app/api/graphql'
