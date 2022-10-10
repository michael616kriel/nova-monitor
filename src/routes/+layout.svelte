<script>
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts/styles.css';
	import "carbon-components-svelte/css/g80.css";
	import { Header, HeaderNav, HeaderNavItem, Content } from 'carbon-components-svelte';
	let isSideNavOpen = true;
</script>

<Header company="Nova" platformName="System Monitor" bind:isSideNavOpen>
	<HeaderNav>
		<HeaderNavItem href="/" text="Monitor" />
		<HeaderNavItem href="/system" text="System" />
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
