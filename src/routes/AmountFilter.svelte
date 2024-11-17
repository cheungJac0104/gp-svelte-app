<script lang="ts">
    export let donationRecords: any[] = [];
    export let filteredRecords: any[] = [];
    let filterCriteria: string = "";
    let filterValue: string = "";


function applyFilter() {
        const value = parseFloat(filterValue);
        if (!isNaN(value)) {
            switch (filterCriteria) {
                case "amountGreaterThan":
                    filteredRecords = donationRecords.filter(
                        (record) => record.amount > value,
                    );
                    break;
                case "amountLessThan":
                    filteredRecords = donationRecords.filter(
                        (record) => record.amount < value,
                    );
                    break;
                case "amountEqualTo":
                    filteredRecords = donationRecords.filter(
                        (record) => record.amount === value,
                    );
                    break;
                default:
                    filteredRecords = [...donationRecords]; // Reset to all records if no valid filter
            }
        } else {
            filteredRecords = [...donationRecords]; // Reset to all records if input is invalid
        }
    }
</script>

<div class="mb-4 flex items-center space-x-4">
    <select bind:value={filterCriteria} class="border rounded-md p-2">
        <option value="amountGreaterThan">Amount Greater Than</option>
        <option value="amountLessThan">Amount Less Than</option>
        <option value="amountEqualTo">Amount Equal To</option>
    </select>
    <input
        type="text"
        bind:value={filterValue}
        placeholder="Enter amount"
        class="border rounded-md p-2"
    />
    <button
        on:click={applyFilter}
        class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
    >
        Apply Filter
    </button>
</div>