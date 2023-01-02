<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ul>
	{#each data.tweets as id}
		<li><a href="/status/{id}">{id}</a></li>
	{/each}
</ul>
