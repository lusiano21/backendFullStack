(function () {
    const button = document.getElementById('sign-out');
    const profile = document.getElementById('profile');
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      fetch('/sign-out', { method: 'POST' })
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
    
    fetch('/private')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.user);
          profile.innerHTML = `
            <p><strong>Fullname</strong>: ${data.user.name}</p>
            <p><strong>Email</strong>: ${data.user.email}</p>
            <p><strong>Role</strong>: ${data.user.role}</p>
          `;
        } else {
          alert('You are not authorized to view this page. Redirecting to login page...');
          window.location.href = '/';
        }
      });
  })();