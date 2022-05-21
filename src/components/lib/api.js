const BASE_API_URL = 'http://localhost:8080/emp-reg';

export async function getAllDepartment() {
  const response = await fetch(`${BASE_API_URL}/getAllDepartments`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }
  const departments = [];
  for (const key in data) {
    const deptObj = {
      id: key,
      ...data[key],
    };
    departments.push(deptObj);
  }
  return departments;
}


export async function registerEmployee(employeeData) {
  const response = await fetch(`${BASE_API_URL}/registerEmployee`, {
    method: 'POST',
    body: JSON.stringify(employeeData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }else{
    return data.message;
  }
}