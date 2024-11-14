// stores.js
import { writable } from 'svelte/store';

function TokenStore() {
  let storedToken = '';
  if (typeof window !== 'undefined') {
    storedToken = localStorage.getItem('token') || '';
  }
    const { subscribe, set, update } = writable(storedToken);
  
    return {
      subscribe,
      set: (/** @type {string} */ value) => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('token', value);
        }
        set(value);
      },
      update
    };
  }
  
  export const token = TokenStore();
