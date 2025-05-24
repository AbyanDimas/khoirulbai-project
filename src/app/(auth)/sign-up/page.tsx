import { ClerkProvider, SignedIn, SignedOut, RedirectToSignUp } from '@clerk/nextjs'
import { AppProps } from 'next/app'

function SignUpPage({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </ClerkProvider>
  )
}

export default SignUpPage