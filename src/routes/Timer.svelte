<script lang="ts">
    import { onMount } from "svelte";
    export let endDateString: string;

    let days: number;
    let hours: number;
    let minutes: number;
    let seconds: number;

    $: endDate = new Date(endDateString);

    function calculateTimeLeft() {
        const now = new Date();
        const timeDifference = endDate.getTime() - now.getTime();

        if (timeDifference < 0) {
            // If the end date is in the past, set all time values to zero
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

            // Optionally, you can display a message or take other actions
            console.log("The countdown has ended.");
        } else {
            // Calculate the time remaining
            days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            minutes = Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
            );
            seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        }
    }

    // Set up interval when component mounts
    let interval: ReturnType<typeof setInterval>;

    onMount(() => {
        calculateTimeLeft(); // Initial calculation
        interval = setInterval(calculateTimeLeft, 1000);

        // Cleanup on component destroy
        return () => {
            clearInterval(interval);
        };
    });
</script>

<div
    class="backdrop-blur-sm text-gray-400 px-4 py-2 font-sans flex items-end justify-center h-full"
>
    <div class="flex gap-2">
        <div class="font-medium">
            <span class="text-gray-400">{days}</span> days
            <span class="text-gray-400">{hours}</span>:
            <span class="text-gray-400">{minutes}</span>:
            <span class="text-gray-400">{seconds}</span>
        </div>
    </div>
</div>
