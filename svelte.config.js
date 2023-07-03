import adapter from '@sveltejs/adapter-static';
// See https://kit.svelte.dev/docs/adapters for more information about adapters.

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		appDir: 'app' // the default _app starting with an underscore would not work in a Chrome extension
	}
};

export default config;
