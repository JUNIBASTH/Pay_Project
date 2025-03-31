document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('http://localhost:5000/api/employees');
      const data = await response.json();
  
      const tableBody = document.querySelector('#employeesTable tbody');
        if (!tableBody) {
        console.error('Tabla de empleados no encontrada en el DOM.');
        return;
        }
      tableBody.innerHTML = '';
  
      data.forEach((emp: {
        name: string;
        position: string;
        salary: number;
        overtimeHours: number;
        deductions: number[];
      }) => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${emp.name}</td>
          <td>${emp.position}</td>
          <td>${emp.salary}</td>
          <td>${emp.overtimeHours}</td>
          <td>${emp.deductions?.join(', ') || ''}</td>
        `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  });