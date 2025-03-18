declare module "@mdn/mdn-http-observatory" {
	export function scan(hostname: string): Promise<ObservatoryResult>;
	export type ObservatoryResult = {
		scan: {
			algorithmVersion: number;
			grade: string;
			error: null;
			score: number;
			statusCode: number;
			testsFailed: number;
			testsPassed: number;
			testsQuantity: number;
			responseHeaders: Record<string, string>;
		};
		tests: {
			"content-security-policy": ContentSecurityPolicyTest;
			cookies: CookiesTest;
			"cross-origin-resource-sharing": CrossOriginResourceSharingTest;
			redirection: RedirectionTest;
			"referrer-policy": ReferrerPolicyTest;
			"strict-transport-security": StrictTransportSecurityTest;
			"subresource-integrity": SubresourceIntegrityTest;
			"x-content-type-options": XContentTypeOptionsTest;
			"x-frame-options": XFrameOptionsTest;
			"cross-origin-resource-policy": CrossOriginResourcePolicyTest;
		};
	};

	export type ContentSecurityPolicyTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: string | null;
		http: boolean;
		meta: boolean;
		policy: string | null;
		numPolicies: number;
	};

	export type CookiesTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: null;
		sameSite: boolean;
	};

	export type CrossOriginResourceSharingTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: null;
	};
	export type RedirectionTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		destination: string;
		redirects: boolean;
		route: string[];
		statusCode: 200;
	};
	export type ReferrerPolicyTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: null;
		http: boolean;
		meta: boolean;
	};
	export type StrictTransportSecurityTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: string;
		includeSubDomains: boolean;
		maxAge: number;
		preload: boolean;
		preloaded: boolean;
	};

	export type SubresourceIntegrityTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: null;
	};
	export type XContentTypeOptionsTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: string;
	};
	export type XFrameOptionsTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: string;
	};
	export type CrossOriginResourcePolicyTest = {
		expectation: string;
		pass: boolean;
		result: string;
		scoreDescription: string;
		scoreModifier: number;
		data: null;
		http: boolean;
		meta: boolean;
	};
}
