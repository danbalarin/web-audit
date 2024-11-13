export type UnionToIntersection<U> =
	// biome-ignore lint/suspicious/noExplicitAny: any is needed to prevent circularity
	(U extends any ? (k: U) => void : never) extends (k: infer I) => void
		? I
		: never;
