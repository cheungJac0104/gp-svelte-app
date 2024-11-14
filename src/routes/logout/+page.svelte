<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { token } from '$lib/stores.js';
  
    onMount(() => {
      // Remove the token
      if (typeof window !== 'undefined') {
      localStorage.removeItem('token'); 
        token.set(''); // Set the token to null in the store
      }
  
      // Redirect to the login page
      goto('/');
    });
  </script>
  
  <p>Logging out...</p>