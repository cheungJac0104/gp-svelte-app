<script lang="ts">
    import { registerUser } from '$lib/api';
    import LoadingScreen from '../LoadingScreen.svelte';
  
    let name = '';
    let email = '';
    let phone = '';
    let address = '';
    let type = 'personal';
    let username = '';
    let isLoading = false;
  
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

      isLoading = true;
      try {
      const response = await registerUser(user);
      if (response) {
        console.log('Registration successful:', response);
        alert('Registration successful, please turn back to the login page');
      } else {
        console.error('Registration failed:', response);
        alert('Registration failed, please try again');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      isLoading = false;
    }
    }
  </script>

  <div>
    <LoadingScreen {isLoading} />
  
    <form on:submit|preventDefault={handleRegister} class="max-w-md mx-auto mt-10 p-6 titanium-gradient rounded-lg titanium-shadow">
      <h2 class="text-2xl font-bold mb-6 text-white">Register</h2>
      
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-white">Name:</label>
        <input type="text" id="name" bind:value={name} class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm" />
      </div>
      
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-white">Email:</label>
        <input type="email" id="email" bind:value={email} class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm" />
      </div>
      
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium text-white">Phone:</label>
        <input type="text" id="phone" bind:value={phone} class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm" />
      </div>
      
      <div class="mb-4">
        <label for="address" class="block text-sm font-medium text-white">Address:</label>
        <input type="text" id="address" bind:value={address} class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm" />
      </div>
      
      <div class="mb-4">
        <label for="type" class="block text-sm font-medium text-white">Type:</label>
        <select id="type" bind:value={type} class="mt-1 block w-full px-3 py-2 titanium-input titanium-select rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm">
          <option value="personal">Personal</option>
          <option value="organization">Organization</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-white">Username:</label>
        <input type="text" id="username" bind:value={username} class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 sm:text-sm" />
      </div>
      
      <div class="flex items-center justify-between">
        <button type="submit" class="px-4 py-2 purple-titanium-button text-white rounded-md focus:outline-none purple-glow transition-all duration-200 titanium-shadow">Register</button>
        <a href="/" class="text-purple-300 hover:text-purple-100 transition-colors duration-200">Already have an account? Login</a>
      </div>
</form>
  </div>


  <style>
    .titanium-gradient {
      background: linear-gradient(145deg, #BEC2C7 0%, #8F979E 45%, #6A7075 100%);
    }
    .purple-titanium-button {
      background: linear-gradient(145deg, #9F7AEA 0%, #805AD5 50%, #6B46C1 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .purple-titanium-button:hover {
      background: linear-gradient(145deg, #805AD5 0%, #6B46C1 50%, #553C9A 100%);
      transform: translateY(-1px);
    }
    .titanium-input {
      background: linear-gradient(
      135deg,
      #ffffff 0%,
      #f0f0f0 45%,
      #e0e0e0 50%,
      #f0f0f0 55%,
      #ffffff 100%
    );
    border: 1px solid rgba(74, 85, 104, 0.2);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }
    .titanium-select {
      background-image: linear-gradient(
      135deg,
      #ffffff 0%,
      #f0f0f0 45%,
      #e0e0e0 50%,
      #f0f0f0 55%,
      #ffffff 100%
    );
    border: 1px solid rgba(74, 85, 104, 0.2);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }
    .titanium-shadow {
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    .purple-glow:focus {
      box-shadow: 
        0 0 0 2px rgba(159, 122, 234, 0.2),
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  </style>
  