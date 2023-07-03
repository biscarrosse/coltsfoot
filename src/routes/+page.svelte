<script>
	// @ts-nocheck
	// chrome API: https://developer.chrome.com/docs/extensions/reference/i18n/#method-getUILanguage
	let active_tab;
	let ui_lang;

	// TODO:
	// fetch('https://jsonplaceholder.typicode.com/todos/1')
	//   .then(response => response.json())
	//   .then(json => console.log(json))

	const getCurrentTab = async () => {
		let queryOptions = { active: true, lastFocusedWindow: true };
		// `tab` will either be a `tabs.Tab` instance or `undefined`.
		let [tab] = await chrome.tabs.query(queryOptions);

		active_tab = tab;
	};

	const getUILanguage = () => {
		ui_lang = chrome.i18n.getUILanguage();
	};
</script>

<div>
	<button on:click={getCurrentTab}> Reveal current URL </button>
	<button on:click={getUILanguage}>getUILanguage</button>
</div>
{#if active_tab}
	<p>Current Active tab is: {active_tab.title}, {active_tab.url}</p>
	<hr />
{/if}

{#if ui_lang}
	<p>Current UI language is: {ui_lang}</p>
	<hr />
{/if}
