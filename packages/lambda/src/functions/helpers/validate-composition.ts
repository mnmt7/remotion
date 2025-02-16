import type {
	ChromiumOptions,
	LogLevel,
	openBrowser,
	RemotionServer,
} from '@remotion/renderer';
import {RenderInternals} from '@remotion/renderer';
import type {VideoConfig} from 'remotion';
import type {Await} from '../../shared/await';
import {executablePath} from './get-chromium-executable-path';

type ValidateCompositionOptions = {
	serveUrl: string;
	composition: string;
	browserInstance: Await<ReturnType<typeof openBrowser>>;
	inputProps: Record<string, unknown>;
	envVariables: Record<string, string>;
	timeoutInMilliseconds: number;
	chromiumOptions: ChromiumOptions;
	port: number | null;
	forceHeight: number | null;
	forceWidth: number | null;
	logLevel: LogLevel;
	server: RemotionServer | undefined;
};

export const validateComposition = async ({
	serveUrl,
	composition,
	browserInstance,
	inputProps,
	envVariables,
	timeoutInMilliseconds,
	chromiumOptions,
	port,
	forceHeight,
	forceWidth,
	logLevel,
	server,
}: ValidateCompositionOptions): Promise<VideoConfig> => {
	const {metadata: comp} = await RenderInternals.internalSelectComposition({
		id: composition,
		puppeteerInstance: browserInstance,
		inputProps,
		envVariables,
		timeoutInMilliseconds,
		chromiumOptions,
		port,
		browserExecutable: executablePath(),
		serveUrl,
		logLevel,
		indent: false,
		onBrowserLog: null,
		server,
	});

	return {
		...comp,
		height: forceHeight ?? comp.height,
		width: forceWidth ?? comp.width,
		defaultProps: comp.defaultProps,
		props: comp.props,
	};
};
