<header>
	{#if $$slots.logo}
		<div class="logo">
			<slot name="logo" />
		</div>
	{/if}
	<div class="title">
		<slot />
	</div>
	{#if $$slots.nav}
		<div class="nav">
			<slot name="nav" />
		</div>
	{/if}
</header>

<style>
	header {
		display: flex;
		align-items: center;
		gap: var(--size-fluid-1);
	}

	.logo {
		width: var(--size-fluid-4);
	}

	.title {
		font-size: var(--font-size-fluid-2);
		font-weight: var(--font-weight-6);
		white-space: nowrap;
	}

	.nav {
		flex: 1;
	}
</style>
