<!-- Modal.svelte -->
<script>
  export let show = false;
  export let title = "";
  export let btn_title = "";
  export let onClose = () => {};
  export let btn_trigger = () => {};
</script>

<button
  class={`fixed inset-0 backdrop-blur-sm bg-black/40 ${show ? "block" : "hidden"}`}
  on:click={onClose}
  aria-label="Close"
></button>

<div
  class={`fixed inset-0 flex items-center justify-center ${show ? "block" : "hidden"}`}
>
  <div
    class="w-full max-w-md p-1 rounded-lg"
    style="background: linear-gradient(135deg, #4a4d50 0%, #7d8591 25%, #c5c7ca 50%, #7d8591 75%, #4a4d50 100%)"
  >
    <div
      class="p-6 rounded-lg"
      style="background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 45%, #e0e0e0 50%, #f0f0f0 55%, #ffffff 100%)"
    >
      <h2 class="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

      <div class="text-gray-700">
        <slot></slot>
      </div>

      <div class="mt-6 flex gap-4 justify-end">
        <button
          class="px-6 py-2 rounded-md text-white shadow-lg transition-all duration-300 transform hover:scale-105"
          on:click={onClose}
          style="background: linear-gradient(135deg, #4a4d50 0%, #7d8591 50%, #4a4d50 100%)"
        >
          Close
        </button>

        <button
          class="px-6 py-2 rounded-md text-white shadow-lg transition-all duration-300 transform hover:scale-105"
          on:click={btn_trigger}
          style="background: linear-gradient(135deg, #2f6b4d 0%, #3a8a64 50%, #2f6b4d 100%)"
        >
          {btn_title}
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  button {
    position: relative;
    overflow: hidden;
  }

  button::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  button:hover::after {
    left: 100%;
  }

  button:active {
    transform: scale(0.95) !important;
  }
</style>
