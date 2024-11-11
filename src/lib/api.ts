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

    console.log('Response Status:', response.status);

    if (response.status !== 200) {
      throw new Error(response.statusText || 'Registration failed');
    }

    return true;
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

  // Parse the response body as text
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(response.statusText || 'Registration failed');
  }
  return data;
}
