document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envío tradicional del formulario

    // Obtén los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    // Prepara los datos para enviar (ajusta la URL al endpoint de tu backend)
    const datos = { nombre, email, password, rol };

    try {
      const respuesta = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
      const resultado = await respuesta.json();
      document.getElementById('message').textContent = resultado.message || 'Usuario registrado correctamente';
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      document.getElementById('message').textContent = 'Ocurrió un error al registrar el usuario.';
    }
  });
});