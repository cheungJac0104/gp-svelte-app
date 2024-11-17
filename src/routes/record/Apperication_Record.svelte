<script lang="ts">
    import { onMount } from "svelte";
    import LoadingScreen from "../LoadingScreen.svelte";
    import {
        user_get_donation_programs,
        user_get_donations,
        user_get_acknowledgements,
    } from "$lib/api";
    import SearchBar from "../SearchBar.svelte";

    let isLoading = false;
    let searchQuery = "";

    let appreciationRecords: any[] = [];
    onMount(async () => {
        fetchAppreciationRecords();
    });

    async function fetchAppreciationRecords() {
        isLoading = true;
        const [get_acknowledgements, get_programs, get_donations] =
            await Promise.all([
                user_get_acknowledgements(),
                user_get_donation_programs(),
                user_get_donations(),
            ]);
        if (
            get_acknowledgements.data &&
            get_programs.data &&
            get_donations.data
        ) {
            appreciationRecords = get_acknowledgements.data.map((ack: any) => {
                let donation = get_donations.data.map((donation: any) => {
                    let program = get_programs.data.find(
                        (p: any) => p.program_id === donation.program_id,
                    );
                    return {
                        ...donation,
                        program_name: program
                            ? program.program_name
                            : "Unknown",
                        program_description: program
                            ? program.description
                            : "Unknown",
                    };
                });

                donation = donation.find(
                    (donation: any) => donation.donation_id === ack.donation_id,
                );

                // Format the date as needed
                ack.date = new Date(ack.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                });

                return {
                    ...ack,
                    program_name: donation?.program_name,
                    program_description: donation?.program_description,
                    status: ack.message ? "Approved" : "Pending for donateees",
                };
            });
        }
        isLoading = false;
    }

    $: filterAppreciationRecords = appreciationRecords.filter((record) => {
        return (
            record.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.program_description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            record.program_name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            record.date?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
</script>

<div>
    <LoadingScreen {isLoading} />
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Appreciation Records</h2>
    <SearchBar bind:searchQuery hints="Search by apperciation value" />
    <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr
                class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
                <th class="py-3 px-6 text-left">Donation Program</th>
                <th class="py-3 px-6 text-left">Description</th>
                <th class="py-3 px-6 text-left">Status</th>
                <th class="py-3 px-6 text-left">Date</th>
            </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
            {#each filterAppreciationRecords as record}
                <tr
                    class="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                >
                    <td class="py-3 px-6">{record.program_name}</td>
                    <td class="py-3 px-6">{record.program_description}</td>
                    <td class="py-3 px-6">{record.status}</td>
                    <td class="py-3 px-6">{record.date}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
