import { sveltekit } from '@sveltejs/kit/vite';
import { optimizeImports } from 'carbon-preprocess-svelte';

const config = {
	plugins: [
		sveltekit({
			preprocess: [optimizeImports()]
		})
	],
	ssr: {
		noExternal: ['@carbon/charts', 'carbon-components']
	}
};

export default config;
