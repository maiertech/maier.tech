<script>
	import Icon from '$lib/components/icon-twitter.svelte';

	/** @type string */
	export let name = 'Thilo Maier';

	/** @type string*/
	export let username = 'maiertech';

	/** @types string */
	export let published;
</script>

<article>
	<main>
		<header>
			<span class="name">{name}</span>
			<span class="username">
				<span class="icon"><Icon /></span>
				<span>{username}</span>
			</span>
			<time datetime={published}
				>{new Intl.DateTimeFormat('en-US', {
					dateStyle: 'medium',
					timeZone: 'UTC'
				}).format(new Date(published))}
			</time>
		</header>
		<slot />
	</main>
</article>

<style>
	header {
		display: inline-flex;
		gap: var(--size-2);
		align-items: center;
		margin-block-end: var(--size-3);
	}

	.username {
		display: inline-flex;
		align-items: center;
	}

	.name {
		font-weight: var(--font-weight-7);
	}

	.icon {
		width: var(--size-4);
	}

	time {
		white-space: nowrap;
		font-size: var(--font-size-0);
		font-weight: var(--font-weight-6);
		background-color: var(--surface-3);
		border-radius: var(--radius-round);
		padding: var(--size-1) var(--size-2);
	}
</style>
