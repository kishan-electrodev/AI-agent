const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { Clerk } from '@clerk/clerk-js'

const clerk = new Clerk(clerkPubKey)
await clerk.load()


// show login button if user not logged in else show user button

if (!clerk.user) {
  document.querySelector('.login-btn').onclick = () => clerk.openSignIn()
  document.getElementById('menuToggle').style.display = 'none';
  
} else {

  //save user to backend
  saveUserToBackend(clerk.user);

  document.querySelector('.login-btn').innerHTML = 
  `
  <div class="user-area">
    <div id="user-button"></div>
  </div>
  `

  //Now mount user icon
  const userBtn = document.getElementById('user-button');
  clerk.mountUserButton(userBtn);

  document.querySelector('.greeting h1').innerHTML = 
  `<span class="status-dot"></span>Hi ${clerk.user.fullName}`

  document.querySelector('.user-profile').innerHTML =
  `
    <div class="footer-icon user-icon">
    <img src="${clerk.user.imageUrl}" alt="User Profile" class="user-avatar" />
    </div>
    <span id="user-fullname">${clerk.user.fullName}</span>
  `

  document.getElementById('menuToggle').style.display = 'flex';
  document.querySelector('.user-profile').addEventListener('click', () => { clerk.openUserProfile(); });
  const userBtn1 = document.getElementById('user-button1');
  
  clerk.mountUserButton(userBtn1);
}

// save function
async function saveUserToBackend(user){
  await fetch("/api/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: user.id,
      email: user.primaryEmailAddress.emailAddress,
      name: user.fullName
    })
  });
  
}
