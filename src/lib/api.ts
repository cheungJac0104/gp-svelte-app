// place files you want to import through the `$lib` alias in this folder.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(user: User): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    console.log('Response:', response);

    // Check if the response body is empty
    const text = await response.text();
    const responseBody = text ? JSON.parse(text) : {};

    console.log('Response Status:', response.status);
    console.log('Response Body:', responseBody);

    if (response.status !== 200) {
      throw new Error(responseBody.message || 'Registration failed');
    }

    return responseBody;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}


export async function loginUser(username: string,password: string) : Promise<any> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return response.json();
}
