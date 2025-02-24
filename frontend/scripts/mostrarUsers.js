window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const users = await response.json();
      const userList = document.getElementById('userList');
      
      if (response.ok) {
        users.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.nombre} - ${user.email} (${user.rol})`;
          userList.appendChild(li);
        });
      } else {
        userList.textContent = 'Error al obtener los usuarios';
      }
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('userList').textContent = 'Error en la conexión';
    }
  });