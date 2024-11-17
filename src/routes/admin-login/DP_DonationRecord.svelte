<script lang="ts">
    import {
        admin_get_donations,
        admin_get_user_list,
        admin_retrieve_donation_programs,
        admin_send_appreciation_email,
    } from "$lib/api";
    import { onMount } from "svelte";
    import LoadingScreen from "../LoadingScreen.svelte";
    import SearchBar from "../SearchBar.svelte";
    import AmountFilter from "../AmountFilter.svelte";
    import Modal from "../Modal.svelte";

    // Sample donation record data
    let donationRecords: any[] = [];

    let isLoading: boolean = false;

    let searchQuery: string = "";

    let show = false;
    let title = "";
    let selectedRecord : any;
    let message = "";

    onMount(async () => {
        await fetchDonationRecords();
    });

    function openModal(donorName: string, record: any) {
        show = true;
        title = `TO : ${donorName}<br>Send Appreciation Email`;
        selectedRecord = record;
    }

    function closeModal() {
        show = false;
    }

    async function fetchDonationRecords() {
        isLoading = true;
        const [donations, programs, users] = await Promise.all([
            admin_get_donations(),
            admin_retrieve_donation_programs(),
            admin_get_user_list(),
        ]);

        if (donations.data && programs.data && users.data) {
            donationRecords = donations.data.map((donation: any) => {
                const program = programs.data.find(
                    (program: any) =>
                        program.program_id === donation.program_id,
                );
                const user = users.data.find(
                    (user: any) => user.donor_id === donation.donor_id,
                );

                return {
                    ...donation,
                    program_name: program ? program.program_name : "Unknown",
                    program_description: program
                        ? program.description
                        : "Unknown",
                    donorName: user ? user.name : "Unknown",
                    donorEmail: user ? user.email : "Unknown",
                };
            });
        }

        isLoading = false;
    }

    $: filteredRecords = [...donationRecords]; // Start with all records
    $: queriedRecords = donationRecords.filter((activity) =>
        [
            "donation_id",
            "program_name",
            "program_description",
            "donorName",
            "date",
        ].some((key) =>
            activity[key]
                .toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
        ),
    );

    $: nestedRecords = filteredRecords
        .filter((a) =>
            queriedRecords.some((b) => a.donation_id === b.donation_id),
        )
        .map((a) => ({
            ...a,
            ...queriedRecords.find((b) => a.donation_id === b.donation_id),
        }));

    

    async function sendAppreciationEmail() {
        isLoading = true;
        // Logic to send appreciation email
        console.log("Sending appreciation email...");

        const data = {
            ack_id : selectedRecord.ack_id,
            donation_id : selectedRecord.donation_id,
            ack_message : message,
            amount: selectedRecord.amount,
            donorEmail: selectedRecord.donorEmail,
            donorName: selectedRecord.donorName,
            program_name: selectedRecord.program_name
        };

        console.log("Selected Record:", data);
        const response = await admin_send_appreciation_email(data);
        if(response)
        {
            console.log("Appreciation email sent successfully.");
            alert("Sending appreciation email...");
            await fetchDonationRecords();
        }
        isLoading = false;
        closeModal();
    }
</script>

<div>
    <LoadingScreen {isLoading} />

    <div class="max-w-full mx-auto p-6">
        <h2 class="text-2xl font-bold mb-4 text-gray-600">Donation Records</h2>

        <!-- Filter Section -->
        <AmountFilter  bind:donationRecords={donationRecords} bind:filteredRecords={filteredRecords} />

        <SearchBar
            bind:searchQuery
            hints="Search by donation ID / program name / description / donor name / date"
        />

        <table class="min-w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr
                    class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
                >
                    <th class="py-3 px-6 text-left">Donation ID</th>
                    <th class="py-3 px-6 text-left">Program Name</th>
                    <th class="py-3 px-6 text-left">Program Description</th>
                    <th class="py-3 px-6 text-left">Donated Amount</th>
                    <th class="py-3 px-6 text-left">Donor Name</th>
                    <th class="py-3 px-6 text-left">Date</th>
                    <th class="py-3 px-6 text-left">Action</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                {#each nestedRecords as record, index}
                    <tr
                        class="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                    >
                        <td class="py-3 px-6">{record.donation_id}</td>
                        <td class="py-3 px-6">{record.program_name}</td>
                        <td class="py-3 px-6">{record.program_description}</td>
                        <td class="py-3 px-6">${record.amount}</td>
                        <td class="py-3 px-6">{record.donorName}</td>
                        <td class="py-3 px-6">{record.date}</td>
                        {#if !record.ack_message}
                        <td class="py-3 px-6">
                            <button
                                on:click={() =>
                                    openModal(record.donorName, nestedRecords[index])}
                                class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
                            >
                                Send Appreciation Email
                            </button>
                        </td>
                        {:else}
                        <td class="py-3 px-6">
                            <span class="text-green-500">Approved</span>
                        </td>
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <Modal show={show} {title} onClose={closeModal} btn_title="Send" btn_trigger={sendAppreciationEmail}> 
         <!-- Content for the modal -->
         <div class="p-4">
            <label for="message" class="block text-gray-700 mb-2">Message:</label>
            <textarea 
                id="message" 
                bind:value={message} 
                rows="4" 
                class="border rounded-md p-2 w-full" 
                placeholder="Type your appreciation message here..."></textarea>
        </div>
    </Modal>
</div>

<style>
    /* Optional styles to enhance the appearance */
    table {
        border-collapse: collapse;
    }

    th {
        border-bottom: 2px solid #e2e8f0; /* Tailwind gray */
    }

    td {
        border-bottom: 1px solid #e2e8f0; /* Tailwind gray */
    }
</style>
