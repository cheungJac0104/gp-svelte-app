<!-- Modal.svelte -->
<script>
    export let show = false;
    export let title = "";
    export let onClose = () => {};
    export let onAdd = () => {};
  </script>
  
  <button class={`fixed inset-0 bg-gray-800 bg-opacity-75 ${show ? 'block' : 'hidden'}`} on:click={onClose} aria-label="Close"></button>
  <div class={`fixed inset-0 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">{title}</h2>
      <div>
        <slot></slot> <!-- Slot for dynamic content -->
      </div>
      <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" on:click={onClose}>Close</button>
      <button class="mt-4 bg-green-500 text-white px-4 py-2 rounded" on:click={onAdd}>Add</button>
    </div>
  </div>