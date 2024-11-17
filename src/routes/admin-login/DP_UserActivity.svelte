<script lang="ts">
    import { admin_get_user_activities, admin_get_user_list } from "$lib/api";
    import { onMount } from "svelte";
    import LoadingScreen from "../LoadingScreen.svelte";
    import SearchBar from "../SearchBar.svelte";

    // Sample user activity data (this would typically come from an API or state management)
    let userActivities : any[] = [];
    let isLoading = false;
    let searchQuery = "";

    onMount(async() => {
        fetchUserActivities();
    });

    async function fetchUserActivities() {
        isLoading = true;
        const [activities, users] = await Promise.all([
            admin_get_user_activities(),
            admin_get_user_list()
        ]);
        if(activities.data && users.data) {
            userActivities = activities.data.map((activity: any) => {
                const user = users.data.find((user: any) => user.donor_id === activity.user_id);
                return {
                    userId: activity.user_id,
                    username: user ? user.username : "Unknown",
                    fullName: user ? user.name : "Unknown",
                    userType: user ? user.type : "Unknown",
                    action: activity.activity,
                    date: activity.timestamp,
                    ipAddress: activity.ip_address,
                };
            });
        }

        isLoading = false;
    }

    $: filteredActivities = userActivities.filter((activity) => {
        return (
            activity.userId.toString().includes(searchQuery) ||
            activity.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.userType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

</script>
<div>
    <LoadingScreen {isLoading} />

<div class="max-w-full mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-gray-600">User Activity Log</h2>
    <SearchBar bind:searchQuery={searchQuery} hints="Search by user ID / username / full name / user type / action / date / IP address"/>
    
    <table class="min-w-full bg-white shadow-md rounded-lg">
        <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th class="py-3 px-6 text-left">User ID</th>
                <th class="py-3 px-6 text-left">User Name</th>
                <th class="py-3 px-6 text-left">Full Name</th>
                <th class="py-3 px-6 text-left">User Type</th>
                <th class="py-3 px-6 text-left">Action</th>
                <th class="py-3 px-6 text-left">Date</th>
                <th class="py-3 px-6 text-left">IP Address</th>
            </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
            {#each filteredActivities as activity}
                <tr class="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                    <td class="py-3 px-6">{activity.userId}</td>
                    <td class="py-3 px-6">{activity.username}</td>
                    <td class="py-3 px-6">{activity.fullName}</td>
                    <td class="py-3 px-6">{activity.userType}</td>
                    <td class="py-3 px-6">{activity.action}</td>
                    <td class="py-3 px-6">{activity.date}</td>
                    <td class="py-3 px-6">{activity.ipAddress}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

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