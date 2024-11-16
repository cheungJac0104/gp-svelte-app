<script lang="ts">
    import AppericationRecord from "./Apperication_Record.svelte";
    import DonationRecord from "./Donation_Record.svelte";

    // State to track the selected record type
    let selectedRecord = 'donation'; // Default to donation records

    // Function to change the selected record type
    function changeRecord(type : string) {
        selectedRecord = type;
    }
</script>

<div class="flex h-screen bg-gray-100 p-2">
    <!-- Sidebar -->
    <div class="w-1/6 custom-bg border-titanium shadow-lg p-6 h-full">
        <h2 class="font-bold text-xl mb-4 text-gray-800">Records</h2>
        <ul>
            <li class="mb-2">
                <button on:click={() => changeRecord('donation')} class="bg-gradient-titanium w-full text-left p-3 hover:bg-indigo-500 hover:text-gray-700 rounded transition duration-200">
                    Donation Records
                </button>
            </li>
            <li>
                <button on:click={() => changeRecord('appreciation')} class="bg-gradient-titanium w-full text-left p-3 hover:bg-indigo-500 hover:text-gray-700 rounded transition duration-200">
                    Appreciation Records
                </button>
            </li>
        </ul>
    </div>

    <!-- Content Area -->
    <div class="w-5/6 p-6">
        {#if selectedRecord === 'donation'}
            <DonationRecord></DonationRecord>
        {:else if selectedRecord === 'appreciation'}
            <AppericationRecord></AppericationRecord>
        {/if}
    </div>
</div>

<style>
    /* Optional styles for better appearance */
    button {
        transition: background-color 0.2s;
    }
    .bg-gradient-titanium {
        background: linear-gradient(135deg, 
            #d7d9db 0%, 
            #c0c2c4 16.67%,  
            #8e8e91 50%, 
            #c0c2c4 83.33%, 
            #d7d9db 100%);
    }

    .border-titanium {
        border: 5px solid #5b5a5a;
        border-radius: 8px; /* Optional: for rounded corners */
    }

    /* Optional: Add a shadow effect for a more realistic look */
    .shadow-lg {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .custom-bg {
    background: linear-gradient(
      135deg,
      #ffffff 0%,
      #f0f0f0 45%,
      #e0e0e0 50%,
      #f0f0f0 55%,
      #ffffff 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

</style>
