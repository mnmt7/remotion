import {expect, test} from 'vitest';
import {renderStill} from '../render-still';

test('Need to pass valid metadata', async () => {
	await expect(() =>
		renderStill({
			composition: {
				width: NaN,
				height: 1000,
				fps: 30,
				durationInFrames: 30,
				id: 'hithere',
				defaultProps: {},
				props: {},
			},
			frame: 0,
			output: '/file/output.png',
			serveUrl:
				'https://649ea0770f2b6b55f2a5425c--effulgent-pixie-5f5cfb.netlify.app/',
			verbose: false,
		})
	).rejects.toThrow(/not be NaN, but is NaN/);
});

test('Returns buffer in promise result', async () => {
	const {buffer} = await renderStill({
		composition: {
			width: 1000,
			height: 1000,
			fps: 30,
			durationInFrames: 30,
			id: 'react-svg',
			defaultProps: {},
			props: {},
		},
		frame: 0,
		serveUrl:
			'https://649ea0770f2b6b55f2a5425c--effulgent-pixie-5f5cfb.netlify.app/',
		verbose: false,
	});
	expect(buffer?.length).toBeGreaterThan(1000);
});

test('Need to pass valid metadata', async () => {
	await expect(() =>
		renderStill({
			composition: {
				width: 1000,
				height: 1000,
				fps: 30,
				durationInFrames: 30,
				id: 'hithere',
				defaultProps: {},
				props: {},
			},
			frame: 200,
			output: '/file/output.png',
			serveUrl:
				'https://649ea0770f2b6b55f2a5425c--effulgent-pixie-5f5cfb.netlify.app/',
			verbose: false,
		})
	).rejects.toThrow(
		/Cannot use frame 200: Duration of composition is 30, therefore the highest frame that can be rendered is 29/
	);
});

test('Catches invalid image format', () => {
	return expect(() =>
		renderStill({
			composition: {
				width: 1000,
				height: 1000,
				fps: 30,
				durationInFrames: 30,
				id: 'hithere',
				defaultProps: {},
				props: {},
			},
			// @ts-expect-error
			imageFormat: 'jjj',
			frame: 200,
			output: '/file/output.png',
			serveUrl:
				'https://649ea0770f2b6b55f2a5425c--effulgent-pixie-5f5cfb.netlify.app/',
		})
	).rejects.toThrow(
		/Image format should be one of: "png", "jpeg", "pdf", "webp"/
	);
});
