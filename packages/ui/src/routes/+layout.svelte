<script>
	import { BrandIcon, Header, Navigation, RootLayout } from '$lib';
	import '$lib/app.css';
</script>

<RootLayout>
	<svelte:fragment slot="header">
		<Header>
			<svelte:fragment slot="logo">
				<BrandIcon />
			</svelte:fragment>
			Thilo Maier
			<svelte:fragment slot="nav">
				<Navigation />
			</svelte:fragment>
		</Header>
	</svelte:fragment>
	<slot />
</RootLayout>
