const loginFormHandler = async (event) => {
    // Prevent default behaviour of submit button
    event.preventDefault();
  
    // Get user's details from selected fields
    const user_email = document.querySelector('#email-login').value.trim();
    const user_password = document.querySelector('#password-login').value.trim();
  
    // Check that both email and password have a value
    if (user_email && user_password) {
      // Send a POST request to the login API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_email, user_password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Log the user in and display the homepage
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  // signupFormHandler behaves in much the same way as loginFormHandler
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#username-signup').value.trim();
    const user_email = document.querySelector('#email-signup').value.trim();
    const user_password = document.querySelector('#password-signup').value.trim();
  
    if (user_name && user_email && user_password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, user_email, user_password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  // Call correct form handler based on the submitted form
  document.addEventListener('submit', (event) => {
    const element = event.target;
  
    if (element.matches('.login-form')) {
      loginFormHandler(event);
    }
  
    if (element.matches('.signup-form')) {
      signupFormHandler(event);
    }
  });

  