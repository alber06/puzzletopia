declare module 'config'
declare module 'bcryptjs'
declare module 'cookies'

interface PuzzleOption {
  title: string,
  key: string
}

interface User {
  username?: string,
  puzzle1Complete?: boolean,
  puzzle2Complete?: boolean,
  password?: string,
  id?: string,
  createdAt?: string,
  updatedAt?: string
}
interface UserSession {
  user: User
}