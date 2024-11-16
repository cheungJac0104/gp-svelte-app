<script>
    export let searchQuery = '';
    export let hints = '';
</script>

<div class="mb-4">
    <input type="text" bind:value={searchQuery} placeholder={hints} class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
  </div>