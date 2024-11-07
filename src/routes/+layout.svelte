<script lang="ts">
	import '../app.css';
	let { children } = $props();
  </script>
  
  <div class="flex flex-col min-h-screen">
	<main class="flex-grow">
	  {@render children()}
	</main>
	<footer class="bg-gray-800 text-white py-4">
	  <div class="container mx-auto text-center">
		<p>© 2024 Presented By Hong Kong Homeless Care</p>
	  </div>
	</footer>
  </div>
  