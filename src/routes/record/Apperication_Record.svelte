<script lang="ts">
    const applicationRecords = [
        { id: 1, name: 'Application 1', status: 'Approved' },
        { id: 2, name: 'Application 2', status: 'Pending' },
    ];
</script>

<div>
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Appreciation Records</h2>
            <ul class="bg-white shadow-md rounded-lg p-4">
                {#each applicationRecords as record}
                    <li class="mb-2 border-b last:border-b-0 pb-2">
                        Application ID: {record.id}, Name: {record.name}, Status: {record.status}
                    </li>
                {/each}
            </ul>
</div>