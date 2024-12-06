// User Data Storage (LocalStorage Simulation)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Form Elements
const loginForm = document.getElementById('loginForm');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// Login Form Handler
loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === '' || password === '') {
    alert('Please fill in all fields.');
    return;
  }

  // Authenticate User
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert(`Welcome back, ${user.username}!`);
    // Redirect to a dashboard or perform another action
  } else {
    alert('Invalid username or password.');
  }
});

// Theme Toggle Functionality
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');

  // Update button text
  if (body.classList.contains('dark-theme')) {
    themeToggleBtn.textContent = '🌙 Dark Theme';
  } else {
    themeToggleBtn.textContent = '☀️ Light Theme';
  }
});

// Signup Functionality
function showSignupForm() {
  const signupContainer = document.createElement('div');
  signupContainer.classList.add('login-container');
  signupContainer.innerHTML = `
    <h1>Sign Up</h1>
    <form id="signupForm">
      <div class="input-group">
        <label for="signupUsername">Username</label>
        <input type="text" id="signupUsername" name="username" placeholder="Choose a username" required>
      </div>
      <div class="input-group">
        <label for="signupPassword">Password</label>
        <input type="password" id="signupPassword" name="password" placeholder="Create a password" required>
      </div>
      <button type="submit" class="btn">Sign Up</button>
    </form>
    <p class="footer-text">Already have an account? <a id="backToLogin" href="#">Login</a></p>
  `;

  // Replace Login Container with Signup Container
  document.body.innerHTML = '';
  document.body.appendChild(signupContainer);

  // Add Event Listener for Signup Form
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', handleSignup);

  // Add Event Listener to Back to Login Link
  document.getElementById('backToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    location.reload(); // Reload page to show login form
  });
}

// Handle Signup Submission
function handleSignup(e) {
  e.preventDefault();

  const signupUsername = document.getElementById('signupUsername').value.trim();
  const signupPassword = document.getElementById('signupPassword').value.trim();

  if (signupUsername === '' || signupPassword === '') {
    alert('Please fill in all fields.');
    return;
  }

  if (signupPassword.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  // Check if Username Already Exists
  const existingUser = users.find((user) => user.username === signupUsername);
  if (existingUser) {
    alert('Username already exists. Please choose a different one.');
    return;
  }

  // Register New User
  users.push({ username: signupUsername, password: signupPassword });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Account created successfully! You can now log in.');
  location.reload(); // Reload page to show login form
}

// Attach Signup Event to "Sign Up" Link
document.querySelector('.footer-text a').addEventListener('click', (e) => {
  e.preventDefault();
  showSignupForm();
});
