<script lang="ts">
    import { onMount } from 'svelte';
    import { generateSecret, generateQRCode, verifyToken } from '$lib/2fa.js';
    import AdminPage from './AdminPage.svelte';
  
    let secret: any;
    let qrCodeUrl : any;
    let userToken = '';
    let isAuthenticated = false;
    const SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY
  
    onMount(async () => {
      secret = SECRET_KEY;
      // console.log(secret);
      qrCodeUrl = await generateQRCode(secret);
    });
  
    function handleVerify() {
      if (verifyToken(secret, userToken)) {
        isAuthenticated = true;
      } else {
        alert('Invalid token');
      }
    }

    function handleKeydown(event: any) {
    if (event.key === 'Enter') {
      handleVerify();
    }
  }
  </script>

<style>
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.7;
      }
    }
  
    .animate-pulse {
      animation: pulse 2s infinite;
    }
  </style>
  
  
  {#if !isAuthenticated}
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Scan this QR code with your authenticator app</h2>
      <div class="animate-pulse">
        <img src={qrCodeUrl} alt="QR Code" class="mb-4" />
      </div>
      <input 
        type="text" 
        bind:value={userToken} 
        placeholder="Enter the code from your app" 
        class="border border-gray-300 p-2 rounded mb-4 w-full"
        on:keydown={(event) => handleKeydown(event)}
      />
      <button 
        on:click={handleVerify} 
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Verify
      </button>
    </div>
  </div>
{:else}
<div class="flex flex-col mb-4 min-h-screen bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-lg my-4 mx-2"> <!-- Added m-4 for margin -->
      <h2 class="text-2xl font-bold mb-4">Admin Page</h2>
      <!-- Admin content goes here -->
      <AdminPage />
  </div>
</div>
{/if}


  