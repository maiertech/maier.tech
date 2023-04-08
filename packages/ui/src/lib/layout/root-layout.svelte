<script>
	import { Container } from '$lib';
</script>

<div class="wrapper">
	{#if $$slots.header}
		<div class="header">
			<slot name="header" />
		</div>
	{/if}

	<div class="main">
		<Container>
			<slot />
		</Container>
	</div>

	{#if $$slots.footer}
		<div class="footer">
			<slot name="footer" />
		</div>
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--size-fluid-4);
		min-height: 100vh;
	}

	.header {
		flex-shrink: 0;
	}

	.main {
		flex: 1;
		max-width: 80rem;
		margin-inline: auto;
	}

	.footer {
		flex-shrink: 0;
	}
</style>
