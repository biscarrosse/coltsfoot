// import adapter from '@sveltejs/adapter-static'; // TODO: it makes inlinse script after build that is not supported in manivest version 3
import adapter from 'sveltekit-adapter-chrome-extension';
// See https://kit.svelte.dev/docs/adapters for more information about adapters.

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		appDir: 'app' // the default _app starting with an underscore would not work in a Chrome extension
	}
};

export default config;
