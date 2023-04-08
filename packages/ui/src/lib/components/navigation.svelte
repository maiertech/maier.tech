<script>
	import { HamburgerIcon, HomeIcon, resize } from '$lib';

	/**
	 * True if mobile nav is open.
	 * @type {boolean}
	 */
	let open = false;

	function toggle() {
		open = !open;
	}
</script>

<nav
	use:resize={{
		handler: () => {
			open = false;
		}
	}}
>
	<button on:click={() => toggle()}>
		<HamburgerIcon />
	</button>
	<ul class:open>
		<li>
			<a href="/"><HomeIcon /></a>
		</li>
		<li>
			<a href="/elements">Elements</a>
		</li>
		<li>
			<a href="/icons">Icons</a>
		</li>
		<li>
			<a href="/components">Components</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		container-type: inline-size;
	}

	ul {
		display: none;
	}

	.open {
		position: fixed;
		top: 0;
		/* right: 0; */
		/* bottom: 0; */
		left: 0;
		display: flex;
		flex-direction: column;
		background-color: pink;
		padding: 0;
	}

	button {
		width: var(--size-fluid-4);
		background-color: transparent;
		padding: 0;
	}

	@container (min-width: 480px) {
		ul {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-inline: 0;
			gap: var(--size-fluid-2);
		}

		button {
			display: none;
		}
	}

	li {
		list-style: none;
		padding-inline: 0;
		font-size: var(--font-size-fluid-1);
	}

	li:first-child {
		width: var(--size-fluid-3);
	}
</style>
