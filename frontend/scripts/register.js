document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;
  
    
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, email, password, rol })
      });
      
      const data = await response.json();
      const messageEl = document.getElementById('message');
      
      if (response.ok) {
        messageEl.textContent = 'Usuario registrado exitosamente';
      } else {
        messageEl.textContent = data.message || 'Error al registrar el usuario';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'Error en la conexión';
    }
  });