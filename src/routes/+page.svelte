<script>
	// @ts-nocheck
	let url;

	async function getCurrentTab() {
		let queryOptions = { active: true, lastFocusedWindow: true };
		// `tab` will either be a `tabs.Tab` instance or `undefined`.
		let [tab] = await chrome.tabs.query(queryOptions);
		return tab;
	}
</script>

<button on:click={getCurrentTab}> Reveal current URL </button>
{#if url}
	<p>Current URL is: {url}</p>
{:else}
	<p>Error getting current tab URL</p>
{/if}
