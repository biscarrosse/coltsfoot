// removeInlineScript.cjs
const {
	glob
	// globSync,
	// globStream,
	// globStreamSync,
	// Glob,
} = require('glob');

const path = require('path');
const fs = require('fs');

function hash(value) {
	let hash = 5381;
	let i = value.length;
	if (typeof value === 'string') {
		while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
	} else {
		while (i) hash = (hash * 33) ^ value[--i];
	}
	return (hash >>> 0).toString(36);
}

async function removeInlineScript(directory) {
	// console.log('___ is glob: ', glob.glob);
	// console.log('___ is glob 2: ', glob);
	try {
		console.log('Removing Inline Scripts: ');
		//

		const scriptRegx = /<script>([\s\S]+)<\/script>/;
		const files = await glob('**/*.{html}', {
			cwd: directory,
			dot: true,
			aboslute: true
			//filesOnly: true
		});

		console.log('___ FILES: ', files);
		files
			.map((f) => path.join(directory, f))
			.forEach((file) => {
				console.log(`edit file: ${file}`);
				const f = fs.readFileSync(file, { encoding: 'utf-8' });

				const script = f.match(scriptRegx);
				if (script && script[1]) {
					const inlineContent = script[1]
						.replace('__sveltekit', 'const __sveltekit')
						.replace('document.currentScript.parentElement', 'document.body.firstElementChild');
					const fn = `/script-${hash(inlineContent)}.js`;
					const newHtml = f.replace(scriptRegx, `<script type="module" src="${fn}"></script>`);
					fs.writeFileSync(file, newHtml);
					fs.writeFileSync(`${directory}${fn}`, inlineContent);
					console.log(`Inline script extracted and saved at: ${directory}${fn}`);
				}
			});
	} catch (error) {
		console.log('Removing Inline Scripts ERROR: ', error);
	}
}

removeInlineScript(path.resolve(__dirname, 'build'));
