export class EventEmitter<TEvents extends Record<string, unknown>> {
  private _listeners: Record<keyof TEvents, Array<(...args: any[]) => void>> =
    {} as Record<keyof TEvents, Array<(...args: any[]) => void>>;
  constructor() {}

  on<TKey extends keyof TEvents>(
    event: TKey,
    listener: (payload: TEvents[TKey]) => void
  ) {
    if (!this._listeners[event]) {
      this._listeners[event] = [] as Array<(...args: any[]) => void>;
    }
    this._listeners[event].push(listener);

    return () => {
      this._listeners[event] = this._listeners[event].filter(
        (l) => l !== listener
      );
    };
  }

  emit<TKey extends keyof TEvents>(event: TKey, payload: TEvents[TKey]) {
    if (!this._listeners[event]) {
      this._listeners[event] = [] as Array<(...args: any[]) => void>;
    }
    this._listeners[event].forEach((listener) => listener(payload));
  }
}
