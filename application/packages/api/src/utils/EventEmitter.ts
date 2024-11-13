export class EventEmitter<TEvents extends Record<string, unknown>> {
	private _listeners = {} as Record<
		keyof TEvents,
		// biome-ignore lint/suspicious/noExplicitAny: this is a generic class
		Array<(...args: any[]) => void>
	>;

	on<TKey extends keyof TEvents>(
		event: TKey,
		listener: (payload: TEvents[TKey]) => void,
	) {
		if (!this._listeners[event]) {
			this._listeners[event] = [];
		}
		this._listeners[event].push(listener);

		return () => {
			this._listeners[event] = this._listeners[event].filter(
				(l) => l !== listener,
			);
		};
	}

	emit<TKey extends keyof TEvents>(event: TKey, payload: TEvents[TKey]) {
		if (!this._listeners[event]) {
			this._listeners[event] = [];
		}
		for (const listener of this._listeners[event]) {
			listener(payload);
		}
	}
}
