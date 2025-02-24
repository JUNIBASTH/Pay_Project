document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { // Ajusta el puerto si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      const messageEl = document.getElementById('message');
      
      if (response.ok) {
        messageEl.textContent = '¡Login exitoso!';
        // Guarda el token en el localStorage para usarlo en futuras peticiones
        localStorage.setItem('token', data.token);
      } else {
        messageEl.textContent = data.message || 'Error al iniciar sesión';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'Error en la conexión';
    }
  });