<script>
	/** @type string */
	export let published;

	/** @type string */
	export let next;

	import Tweet from '$lib/components/tweet.svelte';
</script>

<Tweet {published}>
	<slot />
</Tweet>

{#if next}
	<p><a href="/status/{next}">Next</a></p>
{/if}

<style>
	p {
		margin-block-start: var(--size-5);
	}
</style>
