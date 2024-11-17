<script lang="ts">
    import { onMount } from 'svelte';
    import { generateSecret, generateQRCode, verifyToken } from '$lib/2fa.js';
    import DP_DonationProgram from './DP_DonationProgram.svelte';
    import DP_UserActivity from './DP_UserActivity.svelte';
    import DP_DonationRecord from './DP_DonationRecord.svelte';

  
    let secret: any;
    let qrCodeUrl : any;
    let userToken = '';
    let isAuthenticated = false;
    const SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY

    // State to manage the selected section
    let selectedSection = 'donationProgram';

    function selectSection(section: string) {
        selectedSection = section;
        // You can add logic here to load different components based on the selected section
    }
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

    .titanium-gradient {
      background: linear-gradient(135deg, #4a4d50 0%, #7d8591 25%, #c5c7ca 50%, #7d8591 75%, #4a4d50 100%);
      border: 1px solid rgba(74, 85, 104, 0.2);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }

    .pure-titanium-gradient {
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
  </style>
  
  
  {#if !isAuthenticated}
  <div class="flex flex-col items-center justify-center min-h-screen pure-titanium-gradient">
    <div class="titanium-gradient p-6 rounded-lg shadow-lg">
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
<div class="flex flex-col mb-4 min-h-screen titanium-gradient">
  <div class="pure-titanium-gradient p-6 rounded-lg shadow-lg my-4 mx-2"> <!-- Added m-4 for margin -->
      <h2 class="text-2xl font-bold mb-4 text-gray-600">Admin Page</h2>
      <!-- Admin content goes here -->
      <!-- Selection Menu -->
      <div class="mb-4">
        <div class="flex space-x-4">
            <button 
                on:click={() => selectSection('donationProgram')} 
                class={`px-4 py-2 rounded-lg transition duration-300 ${selectedSection === 'donationProgram' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 hover:from-gray-300 hover:to-gray-500'}`}>
                Donation Program
            </button>
            <button 
                on:click={() => selectSection('userActivity')} 
                class={`px-4 py-2 rounded-lg transition duration-300 ${selectedSection === 'userActivity' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 hover:from-gray-300 hover:to-gray-500'}`}>
                User Activity
            </button>
            <button 
                on:click={() => selectSection('donationRecord')} 
                class={`px-4 py-2 rounded-lg transition duration-300 ${selectedSection === 'donationRecord' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' : 'bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 hover:from-gray-300 hover:to-gray-500'}`}>
                Donation Record
            </button>
        </div>
    </div>

    <!-- Admin content goes here -->
    {#if selectedSection === 'donationProgram'}
        <DP_DonationProgram />
    {:else if selectedSection === 'userActivity'}
        <DP_UserActivity />
    {:else if selectedSection === 'donationRecord'}
        <DP_DonationRecord />
    {/if}
  </div>
</div>
{/if}


  