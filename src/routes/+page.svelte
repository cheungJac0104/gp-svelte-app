<script lang="ts">
    import { loginUser } from '$lib/api';
    import { goto } from '$app/navigation';
    import LoadingScreen from './LoadingScreen.svelte';
  
    let username = '';
    let password = '';
    let isLoading = false;

  
    async function handleLogin() {
      isLoading = true;

      try {
          const response = await loginUser(username, password);
          if (response && response.data) {
              // Store the token in localStorage
              localStorage.setItem('token', response.data);
              console.log('Login successful:', response.message);

              // Redirect to the dashboard page
              window.location.href = '/dashboard';
              } else {
              // Handle login error
              console.error('Login failed:', response.message);
          }
        
      } catch (error) {
        console.error('An error occurred:', error);
      }
      finally {
        isLoading = false
      }
      
    }
  
    function redirectToRegister() {
      goto('/register');
    }
  </script>

  <div>
    <LoadingScreen {isLoading} />
  
    <form on:submit|preventDefault={handleLogin} class="max-w-md mx-auto mt-10 p-6 titanium-gradient rounded-lg titanium-shadow">
      <h2 class="text-2xl font-bold mb-6 text-white">Login</h2>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-white">Username:</label>
        <input 
          type="text" 
          id="username" 
          bind:value={username} 
          class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5568] focus:ring-opacity-50 sm:text-sm"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-white">Password:</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password} 
          class="mt-1 block w-full px-3 py-2 titanium-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#4A5568] focus:ring-opacity-50 sm:text-sm"
        />
      </div>
      <div class="flex items-center justify-between">
        <button 
          type="submit" 
          class="px-4 py-2 purple-titanium-button text-white rounded-md focus:outline-none purple-glow transition-all duration-200 titanium-shadow"
        >
          Login
        </button>
        <button 
          type="button" 
          on:click={redirectToRegister} 
          class="text-purple-300 hover:text-purple-100 transition-colors duration-200"
        >
          Register
        </button>
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
  