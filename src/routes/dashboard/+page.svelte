<script lang="ts">
    let donationPrograms = [
      { id: 1, name: "Homeless Children Program", amount: 1000 },
      { id: 2, name: "Education for All", amount: 5000 },
      { id: 3, name: "Healthcare Support", amount: 3000 },
    ];
  </script>
  
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {#each donationPrograms as program}
        <div class="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold mb-2">{program.name}</h3>
          <p class="text-gray-700">Amount: ${program.amount}</p>
        </div>
      {/each}
    </div>
  </div>
  