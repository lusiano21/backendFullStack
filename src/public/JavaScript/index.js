/*(function() {
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('password');
    const inputEmail = document.getElementById('email');
    const inputEdad = document.getElementById('edad');
    const inputDni = document.getElementById('dni');
    const inputAvatar = document.getElementById('avatar');
    const inputPassword = document.getElementById('password');
    const formRegister = document.getElementById('form-register')
    formRegister.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
          nombre: inputNombre.value,
          apellido: inputApellido.value,
          email: inputEmail.value,
          edad: inputEdad.value,
          dni: inputDni.value,
          avatar: inputAvatar.value,
          password: inputPassword.value,

        };
    console.log()
fetch('/api/sessions/user', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
})
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Login successfully. Redirecting to private page...')
            window.location.href = '/static/.html'
          } else {
            alert(data.message);
          }
    })
})
})();*/