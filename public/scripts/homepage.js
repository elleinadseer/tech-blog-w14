const logoutHandler = async (event) => {
  console.log('Logout button clicked')
  
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      body: '',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to logout');
    }
  };