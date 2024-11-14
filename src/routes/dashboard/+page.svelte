<script lang="ts">

    import { onMount } from 'svelte';
    import { user_get_donation_programs } from '$lib/api';
    import  Modal  from '../Modal.svelte';
    import Timer from '../Timer.svelte';

    import LoadingScreen from '../LoadingScreen.svelte';

    let donationPrograms : any[] = [];
    let isLoading = false;
    onMount(async () => {
        await fetchItems();
        
    });

    async function fetchItems() {
        isLoading = true;
        const response = await user_get_donation_programs();
        if (response && response.data){
          donationPrograms = response.data;
          donationPrograms = donationPrograms.filter(donationProgram => donationProgram.status === "active");
        }
        isLoading = false;
    }

  </script>

  <LoadingScreen {isLoading} />
  
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {#each donationPrograms as program}
        <div class="program-item">
        <div class="bg-white shadow-md rounded-lg p-6 text-center custom-bg">         
          <h3 class="text-xl font-semibold mb-2">{program.program_name}</h3>
          <p class="text-gray-700">Description : {program.description}</p>
          <p class="text-gray-700">Amount: ${program.amount}</p>
          <Timer endDateString={program.end_date} />
        </div>
        </div>
      {/each}
    </div>
  </div>

  <style>
    .program-item {
      background: linear-gradient(135deg, #5c5c5c 0%, #ff5517 100%);
      padding: 10px;
      border-radius: 5px;
      transition: background 0.3s ease;
    }
  
    .program-item:hover {
      background: linear-gradient(135deg, #3c3d58 0%, #ff0022 100%);
    }
    .custom-bg {
    background: linear-gradient(135deg, #f6f6f6 0%, #e0e0e0 100%);
  }
  </style>
  