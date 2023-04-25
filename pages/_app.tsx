import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import MenuBarLayout from '@layout/MenuBarLayout'

import 'styles/global.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MenuBarLayout>
        <Component {...pageProps} />
      </MenuBarLayout>
    </SessionProvider>
  )
}
