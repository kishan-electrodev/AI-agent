const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
import { Clerk } from '@clerk/clerk-js'

const clerk = new Clerk(clerkPubKey)
await clerk.load()


if (clerk.isSignedIn) {
  document.querySelector('.login-btn').innerHTML = `
    <div id="user-button"></div>
  `

  const userButtonDiv = document.getElementById('user-button')

  clerk.mountUserButton(userButtonDiv)
} else {
  document.getElementById('app').innerHTML = `
    <div id="sign-in"></div>
  `

  const signInDiv = document.getElementById('sign-in')

  clerk.mountSignIn(signInDiv,{
  afterSignInUrl: '/index.html',
  afterSignUpUrl: '/index.html',
})
}
