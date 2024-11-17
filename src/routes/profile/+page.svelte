<script lang="ts">
    import { onMount } from "svelte";


    import LoadingScreen from "../LoadingScreen.svelte";
    import { user_get_donor_profile, user_update_donor_profile } from "$lib/api";

    let isLoading = false;
    // Sample donor data (this would typically come from an API or state management)
    let donor = {
        username: "johndoe",
        name: "John Doe",
        email: "b7m6o@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        type: "",
    };

    let newPassword = '';
    let confirmPassword = '';
    let passwordError = '';

    onMount(async() => {
        fetchDonorData()
    });

    let isEditing = false;

    function toggleEdit() {
        isEditing = !isEditing;
    }

    async function fetchDonorData() {
        isLoading = true;
        const response = await user_get_donor_profile();
        if (response && response.data) {
            donor = response.data;
        }
        isLoading = false;

    }

    async function updateDonor() {
        // Perform any necessary validation on the new password (e.g., minimum length, complexity)

        if(changePassword())
        {
            isLoading = true;
            // Here you would typically send the updated data to your backend
            console.log("Updated donor info:", donor);
            const data = {donor: donor, new_password: newPassword};
            const response = await user_update_donor_profile(data);
            if (response && response.data) {
                donor = response.data;
                alert("Donor updated successfully");
                toggleEdit();
            }
            else
            {
                alert("Failed to update donor");
            }
            isLoading = false;


        }
        
    }

    function validatePassword(password: string) {
        const minLength = 8; // Minimum length requirement
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            length: password.length >= minLength,
            uppercase: hasUppercase,
            lowercase: hasLowercase,
            number: hasNumber,
            specialChar: hasSpecialChar
        };
    }

    function changePassword() {

        if (newPassword === '' && confirmPassword === '') return true; 
        const validationResults = validatePassword(newPassword);
        
        if (Object.values(validationResults).every(Boolean)) {
            if (newPassword === confirmPassword) {
                //console.log("Password changed successfully");
                return true;
            } else {
                passwordError = "Passwords do not match!";
            }
        } else {
            passwordError = "Please ensure all conditions are met.";
        }

        return false;
    }
</script>

<div class="p-4"> 
<LoadingScreen {isLoading} />
<div class="max-w-md mx-auto titanium-gradient shadow-md rounded-lg p-6">
    <h2 class="text-xl font-bold mb-4">Donor Profile</h2>
    
    <form on:submit|preventDefault={updateDonor}>
        <div class="mb-4">
            <label class="block text-gray-700" for="username">UserName</label>
            <input 
                id="username" 
                type="text" 
                bind:value={donor.username} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required />
        </div>
        <div class="mb-4">
            <label class="block text-gray-700" for="name">Name</label>
            <input 
                id="name" 
                type="text" 
                bind:value={donor.name} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700" for="email">Email</label>
            <input 
                id="email" 
                type="email" 
                bind:value={donor.email} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700" for="phone">Phone</label>
            <input 
                id="phone" 
                type="tel" 
                bind:value={donor.phone} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700" for="address">Address</label>
            <textarea 
                id="address" 
                bind:value={donor.address} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required></textarea>
        </div>

        <div class="mb-4">
            <label for="type" class="block text-gray-700">Type:</label>
            <select 
                id="type" 
                bind:value={donor.type} 
                class="mt-1 block w-full border rounded-md p-2" 
                disabled={!isEditing} 
                required>
              <option value="personal">Personal</option>
              <option value="organization">Organization</option>
            </select>
        </div>

        {#if isEditing}
        <div class="mb-4">
            <label class="block text-gray-700" for="new-password">New Password</label>
            <input
                id="new-password"
                type="password"
                bind:value={newPassword}
                class="mt-1 block w-full border rounded-md p-2"
                 />
                {#if newPassword}
                        <div class="mt-1">
                            <p class={`text-sm ${validatePassword(newPassword).length ? 'text-green-500' : 'text-gray-500'}`}>
                                - At least 8 characters
                            </p>
                            <p class={`text-sm ${validatePassword(newPassword).uppercase ? 'text-green-500' : 'text-gray-500'}`}>
                                - At least one uppercase letter
                            </p>
                            <p class={`text-sm ${validatePassword(newPassword).lowercase ? 'text-green-500' : 'text-gray-500'}`}>
                                - At least one lowercase letter
                            </p>
                            <p class={`text-sm ${validatePassword(newPassword).number ? 'text-green-500' : 'text-gray-500'}`}>
                                - At least one number
                            </p>
                            <p class={`text-sm ${validatePassword(newPassword).specialChar ? 'text-green-500' : 'text-gray-500'}`}>
                                - At least one special character
                            </p>
                        </div>
                {/if}
                    
        </div>

        <div class="mb-4">
            <label class="block text-gray-700" for="confirm-password">Confirm Password</label>
            <input
                id="confirm-password"
                type="password"
                bind:value={confirmPassword}
                class="mt-1 block w-full border rounded-md p-2"
                 />
                {#if passwordError && newPassword}
                        <p class="text-red-500 text-sm mt-1">{passwordError}</p>
                    {/if}
        </div>
        {/if}

        <div class="flex justify-between">
            {#if isEditing}
                <button type="submit" class="blue-titanium-button text-white rounded px-4 py-2">Update</button>
            {/if}
            <button type="button" on:click={toggleEdit} class="bg-gray-300 rounded px-4 py-2">
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
        </div>
    </form>
</div>
</div>

<style>
    /* Optional styles to enhance the appearance */
    input, textarea {
        transition: border-color 0.3s;
    }

    input:focus, textarea:focus {
        border-color: linear-gradient(145deg, #805AD5 0%, #6B46C1 50%, #3b82f6 100%); /* Tailwind blue */
        outline: none;
    }

    .blue-titanium-button {
      background: linear-gradient(145deg, #3b82f6 0%, #805AD5 50%, #6B46C1 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    .blue-titanium-button:hover {
      background: linear-gradient(145deg, #805AD5 0%, #6B46C1 50%, #3b82f6 100%);
      transform: translateY(-1px);
    }

    .titanium-gradient {
      background: linear-gradient(
      135deg,
      #ffffff 0%,
      #f0f0f0 45%,
      #e0e0e0 50%,
      #f0f0f0 55%,
      #ffffff 100%
    );
    border: 1px solid rgba(74, 85, 104, 0.2);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
    }
</style>