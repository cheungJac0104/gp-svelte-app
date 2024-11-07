<script lang="ts">
    import { registerUser } from '$lib/api';
  
    let name = '';
    let email = '';
    let phone = '';
    let address = '';
    let type = 'personal';
    let username = '';
  
    async function handleRegister() {
      if (!name || !email || !phone || !address || !username) {
        // Handle missing fields
        console.error('Please fill in all required fields.');
        return;
      }
  
      const user: User = {
        name,
        email,
        phone,
        address,
        type,
        username
      };
  
      const response = await registerUser(user);
      if (response.success) {
        // Handle successful registration
        console.log('Registration successful:', response);
      } else {
        // Handle registration error
        console.error('Registration failed:', response);
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleRegister} class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Register</h2>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
      <input type="text" id="name" bind:value={name} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
      <input type="email" id="email" bind:value={email} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
      <input type="text" id="phone" bind:value={phone} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <label for="address" class="block text-sm font-medium text-gray-700">Address:</label>
      <input type="text" id="address" bind:value={address} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-4">
      <label for="type" class="block text-sm font-medium text-gray-700">Type:</label>
      <select id="type" bind:value={type} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
      <input type="text" id="username" bind:value={username} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Register</button>
      <a href="/login" class="text-indigo-600 hover:text-indigo-900">Already have an account? Login</a>
    </div>
  </form>
  