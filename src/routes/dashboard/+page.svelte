<script lang="ts">
  import { onMount } from "svelte";
  import { user_get_donation_programs, user_new_donation } from "$lib/api";
  import Modal from "../Modal.svelte";
  import Timer from "../Timer.svelte";

  import LoadingScreen from "../LoadingScreen.svelte";

  let show_program_modal = false;
  let program_modal_title = "";

  let show_donation_modal = false;
  let donation_modal_title = "";

  let donationPrograms: any[] = [];

  let selectedProgram: any;
  let donationAmount = 0;

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

  function open_program_Modal(index: number) {
    show_program_modal = true;
    program_modal_title = "Donate to " + donationPrograms[index].program_name;
    selectedProgram = donationPrograms[index];
  }

  function open_donation_modal() {
    show_donation_modal = true;
    donation_modal_title = "Select the amount you want to donate";
  }

  function close_donation_modal() {
    show_donation_modal = false;
    isLoading = false;
  }

  function close_program_Modal() {
    show_program_modal = false;
    isLoading = false;
  }

  function donate() {
    open_donation_modal();
  }

  function updateAmount(event: any) {
    donationAmount = event.target.value; // Update the donation amount based on the slider
  }

  async function donate_to_program() {
    const donation = {
      program_id: selectedProgram.program_id,
      amount: donationAmount,
      date: new Date().toISOString()
    };
    isLoading = true;
    const response = await user_new_donation(donation);
    if (response.message && response.data) {
      console.log("Donation successful:", response.message);
      alert(response.message);
      fetchItems();
    }
    close_donation_modal();
    close_program_Modal();
  }
</script>

<LoadingScreen {isLoading} />

<div class="p-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {#each donationPrograms as program, index}
      <div
        class="program-item cursor-pointer"
        role="button"
        onclick={() => open_program_Modal(index)}
        onkeydown={(e) => e.key === "Enter" && open_program_Modal(index)}
        tabindex="0"
      >
        <div class="bg-white shadow-md rounded-lg p-6 text-center custom-bg">
          <h3 class="text-xl font-semibold mb-2">{program.program_name}</h3>
          <p class="text-gray-700">Description : {program.description}</p>
          <p class="text-gray-700">Amount: HKD${program.amount}</p>
          <Timer endDateString={program.end_date} />
        </div>
      </div>
    {/each}
  </div>
  <Modal
    show={show_program_modal}
    title={program_modal_title}
    onClose={close_program_Modal}
    btn_trigger={donate}
    btn_title="Donate"
  >
    <!-- Dynamic content for the modal -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-4 custom-mdbg">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Program Details</h3>
      <div class="text-gray-700">
        <p class="mb-2">
          <span class="font-medium">Description:</span>
          {selectedProgram?.description}
        </p>
        <p class="mb-2">
          <span class="font-medium">Amount:</span> ${selectedProgram?.amount}
        </p>
        <p class="mb-2">
          <span class="font-medium">Start Date:</span>
          {selectedProgram?.start_date}
        </p>
        <p class="mb-2">
          <span class="font-medium">End Date:</span>
          {selectedProgram?.end_date}
        </p>
        <p class="mb-2">
          <span class="font-medium">Status:</span>
          {selectedProgram?.status}
        </p>
      </div>
    </div>
  </Modal>

  <Modal
    show={show_donation_modal}
    title={donation_modal_title}
    onClose={close_donation_modal}
    btn_trigger={donate_to_program}
    btn_title="Confirm"
  >
    <!-- Dynamic content for the modal -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-4 custom-mdbg">
      <div class="mb-4">
        <label
          for="donation-amount"
          class="block text-sm font-medium text-gray-700 mb-2">Amount:</label
        >
        <input
          type="number"
          id="donation-amount"
          bind:value={donationAmount}
          min="1"
          class="border custom-bg border-gray-300 rounded-md shadow-sm px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
        />
      </div>

      <div class="mb-4">
        <label
          for="donation-range"
          class="block text-sm font-medium text-gray-700 mb-2"
          >Select Amount:</label
        >
        <input
          type="range"
          id="donation-range"
          min="1"
          max="100000"
          step="1"
          bind:value={donationAmount}
          class="w-full"
          oninput={updateAmount}
        />
        <p class="text-gray-600 mt-2">Selected Amount: HKD${donationAmount}</p>
      </div>
    </div>
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

  .custom-mdbg {
    background: linear-gradient(
      135deg,
      #fafcdd 0%,
      #f0d0d0 45%,
      #e0e0e0 50%,
      #f0d0d0 55%,
      #fafcdd 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }
</style>
