export { default } from 'next-auth/middleware'

export const config = { 
  matcher: [ '/puzzles/:path', '/profile/:path', '/home' ]
}