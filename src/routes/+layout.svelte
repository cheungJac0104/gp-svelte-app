<script lang="ts">
	import '../app.css';
	import { token } from '$lib/stores.js';
	let { children } = $props();



  </script>
  
  <div class="flex flex-col min-h-screen">
	<header class="bg-gray-800 text-white py-4">
		<div class="container mx-auto flex justify-between items-center">
			<a href="/" class="text-lg font-bold">HKHC</a>
			<nav class="space-x-4">
				{#if $token}
                    <a href="/dashboard" class="hover:text-gray-400">Dashboard</a>
                    <a href="/profile" class="hover:text-gray-400">Profile</a>
                    <a href="/logout" class="hover:text-gray-400">Logout</a>
                {:else}
                    <a href="/admin-login" class="hover:text-gray-400">Admin Login</a>
                {/if}
			</nav>
		</div>
	</header>
	<main class="flex-grow">
	  {@render children()}
	</main>
	<footer class="bg-gray-800 text-white py-4">
	  <div class="container mx-auto text-center">
		<p>© 2024 Presented By Hong Kong Homeless Care</p>
	  </div>
	</footer>
  </div>
  