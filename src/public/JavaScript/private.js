(function () {
  fetch('/api/sessions/me')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        console.log(data);
        profile.innerHTML = `
            <p><strong>Fullname</strong>: ${data.payload.fullname}</p>
            <p><strong>Email</strong>: ${data.payload.email}</p>
            <p><strong>Role</strong>: ${data.payload.rol}</p>
          `;
      } else {
        alert('You are not authorized to view this page. Redirecting to login page...');
        window.location.href = '/';
      }
    });
    
  const button = document.getElementById('sign-out');
  const profile = document.getElementById('profile');
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    fetch('/api/sessions/sign-out', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        console.log('data:', data)
        if (data.success) {
          alert('Sign out successfully. Redirecting to login page...');
          window.location.href = '/';
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      });
  });

})();