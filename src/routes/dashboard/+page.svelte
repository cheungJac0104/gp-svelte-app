<script lang="ts">
  import { onMount } from "svelte";
  import { user_get_donation_programs } from "$lib/api";
  import Modal from "../Modal.svelte";
  import Timer from "../Timer.svelte";

  import LoadingScreen from "../LoadingScreen.svelte";

  let show = false;
  let title = "Add Donation Program";

  let donationPrograms: any[] = [];
  let isLoading = false;
  onMount(async () => {
    await fetchItems();
  });

  async function fetchItems() {
    isLoading = true;
    const response = await user_get_donation_programs();
    if (response && response.data) {
      donationPrograms = response.data;
      donationPrograms = donationPrograms.filter(
        (donationProgram) => donationProgram.status === "active",
      );
    }
    isLoading = false;
  }

  function openModal() {
    show = true;
  }

  function closeModal() {
    show = false;
    isLoading = false;
  }

  function donate(){

  }
</script>

<LoadingScreen {isLoading} />

<div class="p-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {#each donationPrograms as program}
      <div class="program-item cursor-pointer"
      role="button"
      onclick={() => openModal()} 
      onkeydown={(e) => e.key === 'Enter' && openModal()}
      tabindex="0"
       >
        <div class="bg-white shadow-md rounded-lg p-6 text-center custom-bg">
          <h3 class="text-xl font-semibold mb-2">{program.program_name}</h3>
          <p class="text-gray-700">Description : {program.description}</p>
          <p class="text-gray-700">Amount: ${program.amount}</p>
          <Timer endDateString={program.end_date} />
        </div>
      </div>
    {/each}
  </div>
  <Modal {show} {title} onClose={closeModal} btn_trigger={donate} btn_title="Donate" >
    <!-- Dynamic content for the modal -->
</Modal>
</div>

<style>
  .program-item {
    background: linear-gradient(
      135deg,
      #4a4d50 0%,
      #7d8591 25%,
      #c5c7ca 50%,
      #7d8591 75%,
      #4a4d50 100%
    );
    padding: 10px;
    border-radius: 5px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .program-item:hover {
    background: linear-gradient(
      135deg,
      #5c6063 0%,
      #8e97a3 25%,
      #d8dadd 50%,
      #8e97a3 75%,
      #5c6063 100%
    );
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
