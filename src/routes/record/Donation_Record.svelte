<script lang="ts">
    import { onMount } from "svelte";
    import LoadingScreen from "../LoadingScreen.svelte";
    import { user_get_donation_programs, user_get_donations } from "$lib/api";
    import SearchBar from "../SearchBar.svelte";

    let isLoading = false;
    let searchQuery = "";

    // Sample data for demonstration

    let donationRecords: any[] = [];
    onMount(async () => {
        fetchDonationRecords();
    });

    async function fetchDonationRecords() {
        isLoading = true;
        const [get_donations, get_programs] = await Promise.all([
            user_get_donations(),
            user_get_donation_programs(),
        ]);
        if (get_donations.data && get_programs.data) {
            donationRecords = get_donations.data.map((d: any) => {
                let program = get_programs.data.find(
                    (p: any) => p.program_id === d.program_id,
                );
                return {
                    ...d,
                    program_name: program ? program.program_name : "Unknown",
                    program_description: program
                        ? program.description
                        : "Unknown",
                };
            });
        }
        isLoading = false;
    }

    $: filteredDonationRecords = donationRecords.filter((record) => {
        return (
            record.program_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.program_description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            record.amount.toString().includes(searchQuery) ||
            record.date.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


</script>

<div>
    <LoadingScreen {isLoading} />
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Donation Records</h2>
    <SearchBar bind:searchQuery={searchQuery} hints="Search by program name / description / amount / date"/>
    <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr
                class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
                <th class="py-3 px-6 text-left">Donation Program</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-left">Amount</th>
                <th class="py-3 px-6 text-left">Date</th>
            </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
            {#each filteredDonationRecords as record}
                <tr
                    class="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                >
                    <td class="py-3 px-6">{record.program_name}</td>
                    <td class="py-3 px-6">{record.program_description}</td>
                    <td class="py-3 px-6">${record.amount}</td>
                    <td class="py-3 px-6">{record.date}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
