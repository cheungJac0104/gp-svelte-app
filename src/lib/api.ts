// place files you want to import through the `$lib` alias in this folder.
import { token } from '$lib/stores.js';
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

let currentToken : string = '';
token.subscribe(value => currentToken = `Bearer ${value}`);


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

export async function admin_retrieve_donation_programs() : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/retrieveDonationProgram`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to retrieve donation programs');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
  
}

export async function admin_add_donation_program(program: any) : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/addDonationProgram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(program)
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to add donation program');
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
  
}

export async function admin_update_donation_program(program: any) : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/updateDonationProgram`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(program)
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to update donation program');
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
  
}

export async function user_get_donation_programs() : Promise<any> {

  console.log(token);

  try {
    const response = await fetch(`${API_BASE_URL}/user/getDonationProgram`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken }
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to retrieve donation programs');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
  
}

export async function user_new_donation(data: any) : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/donate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken },
      body: JSON.stringify(data)
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to add donation');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
}

export async function user_get_donations() : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/getDonationsByDonor`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken }
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to retrieve donations');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
}

export async function user_get_acknowledgements() : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/getAcknowledgmentsByDonor`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken }
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to retrieve acknowledgements');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
}

export async function user_get_donor_profile() : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/getDonorProfile`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken }
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to retrieve donor profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
}

export async function user_update_donor_profile(data: any) : Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/updateDonorProfile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        'Authorization': currentToken },
      body: JSON.stringify(data)
    });

    if (response.status!== 200) {
      throw new Error(response.statusText || 'Failed to update donor profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  } 
}
