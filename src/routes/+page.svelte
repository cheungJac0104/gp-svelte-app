<script lang="ts">
    import { loginUser } from '$lib/api';
    import { goto } from '$app/navigation';
  
    let username = '';
    let password = '';
  
    async function handleLogin() {
      const response = await loginUser(username, password);
      if (response.success) {
        // Handle successful login
        console.log('Login successful:', response);
      } else {
        // Handle login error
        console.error('Login failed:', response);
      }
    }
  
    function redirectToRegister() {
      goto('/register');
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin} class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
      <input type="text" id="username" bind:value={username} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
      <input type="password" id="password" bind:value={password} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
      <button type="button" on:click={redirectToRegister} class="text-indigo-600 hover:text-indigo-900">Register</button>
    </div>
  </form>
  