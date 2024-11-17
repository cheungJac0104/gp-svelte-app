<script lang="ts">
    import { admin_retrieve_donation_programs, admin_add_donation_program, admin_update_donation_program } from '$lib/api';
    import { onMount } from 'svelte';
    import  Modal  from '../Modal.svelte';
    import SearchBar from '../SearchBar.svelte';

    import LoadingScreen from '../LoadingScreen.svelte';

    let show = false;
    let title = "Add Donation Program";

    let isLoading = false;
    let searchQuery = "";

    let program_name = '';
    let description = '';
    let status = '';
    let start_date = '';
    let end_date = '';
    let amount = 0;

    function openModal() {
      show = true;
    }

    function closeModal() {
      show = false;
      isLoading = false;
    }

    let programs : any[] = [];

    onMount(async () => {
        await fetchItems();
        
    });

    async function fetchItems(){
        const response = await admin_retrieve_donation_programs();
        if (response && response.data)
        {
            programs = await response.data;
            console.log("Programs retrieved");  // Log the retrieved programs for debugging purposes.
        }
    }

    async function addItem() {

        const donation_program = {
            program_name,
            description,
            status,
            start_date,
            end_date,
            amount
        }

        isLoading = true;  // Show loading screen while adding the program.

        
        const response = await admin_add_donation_program(donation_program);
        if (response)
        {
            await fetchItems();
            isLoading = false;
            closeModal();
            console.log("Program added successfully");  // Log the added program for debugging purposes.
            alert("Program added successfully");
        }
        
        
    }

    async function updateItem(index: number) {
        let program = programs[index];
        isLoading = true; // Show loading screen while updating the program

        const response = await admin_update_donation_program(program);
        if (response)
        {
            await fetchItems();
            isLoading = false;
            console.log("Program updated successfully");  // Log the updated program for debugging purposes.
            alert("Program updated successfully");
        }

    }

    $: filteredPrograms = programs.filter(program => 
    program.program_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

</script>


<div class="container mx-auto p-4 border rounded shadow">
    <LoadingScreen {isLoading}/>
    <h1 class="text-2xl font-bold mb-4 text-gray-600">Donation Programs</h1>
    <SearchBar bind:searchQuery={searchQuery} hints="Search by program name / status / description"/>
      
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredPrograms as program, index}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="text" bind:value={program.program_name} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="text" bind:value={program.description} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="date" bind:value={program.start_date} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="date" bind:value={program.end_date} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select bind:value={program.status} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="number" bind:value={program.amount} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" disabled>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" on:click={() => updateItem(index)}>Update</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    <!-- Icon Button for Adding Item -->
    <button on:click={openModal} aria-label="Add Item" class="mt-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 inline-flex items-center">
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
    </button>
    <Modal {show} {title} onClose={closeModal} btn_trigger={addItem} btn_title="Add" >
        <!-- Dynamic content for the modal -->
        <form id="donationProgramForm">
            
            <label class="block mb-2" for="program_name">Program Name:</label>
            <input 
                bind:value={program_name}
                type="text" 
                id="program_name" 
                name="program_name" 
                required 
                class="border rounded w-full p-2 mb-4"
            >

            <label class="block mb-2" for="description">Description:</label>
            <textarea 
                bind:value={description}
                id="description" 
                name="description" 
                required 
                class="border rounded w-full p-2 mb-4"
            ></textarea>

            <label class="block mb-2" for="status">Status:</label>
            <select 
                bind:value={status}
                id="status" 
                name="status" 
                required 
                class="border rounded w-full p-2 mb-4"
            >
                <option value="">Select a status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <label class="block mb-2" for="start_date">Start Date:</label>
            <input 
                bind:value={start_date}
                type="date" 
                id="start_date" 
                name="start_date" 
                required 
                class="border rounded w-full p-2 mb-4"
            >

            <label class="block mb-2" for="end_date">End Date:</label>
            <input 
                bind:value={end_date}
                type="date" 
                id="end_date" 
                name="end_date" 
                required 
                class="border rounded w-full p-2 mb-4"
            >

            <label class="block mb-2" for="amount">Amount:</label>
            <input 
                bind:value={amount}
                type="number" 
                id="amount" 
                name="amount" 
                required 
                class="border rounded w-full p-2 mb-4"
            >
        </form>
    </Modal>
</div>