/* eslint-disable no-unused-vars */
export type FastOptions = {
  count?: number;
  onChange?: (options: { speed: number; requestIndex: number }) => void;
  onComplete?: (options: { speed: number }) => void;
  unit?: Unit;
};

export enum Unit {
  Bps = 1,
  KBps = 1000,
  MBps = 1000 * 1000,
}

// TODO: use local endpoint, not only czech one
const BINARY_DATA_API =
  "https://speedtest2.dkm.cz.prod.hosts.ooklaserver.net:8080/download";
const BINARY_DATA_SIZES = [
  50 * Unit.KBps,
  5 * Unit.MBps,
  50 * Unit.MBps,
  100 * Unit.MBps,
  200 * Unit.MBps,
  500 * Unit.MBps,
  1000 * Unit.MBps,
];

export class Fast {
  private onChange: FastOptions["onChange"];
  private onComplete: FastOptions["onComplete"];
  private unit = Unit.MBps;
  private count = 5;
  constructor(options: FastOptions) {
    this.onChange = options.onChange;
    this.onComplete = options.onComplete;
    this.unit = options.unit || this.unit;
    this.count = options.count || this.count;
  }

  getPreciseTargets() {
    return BINARY_DATA_SIZES.slice(0, this.count).map(
      (size) => `${BINARY_DATA_API}?size=${size}&nocache=${Date.now()}`,
    );
  }

  static average(arr: number[]) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  async getSpeed(abortSignal?: AbortSignal) {
    const targets = this.getPreciseTargets();
    const speeds: number[] = [];
    const onProgressFunctor =
      (index: number) => (_progress: number, speed: number) => {
        if (!this.onChange) {
          return;
        }
        const averageSpeed = Fast.average([...speeds, speed]);
        this.onChange({ speed: averageSpeed / this.unit, requestIndex: index });
      };
    let isRunning = true;
    abortSignal?.addEventListener("abort", () => {
      isRunning = false;
    });

    for (let i = 0; i < this.count; i++) {
      if (!isRunning) {
        break;
      }
      const target = targets[i];
      if (!target) {
        break;
      }
      const speed = await Fast.download(
        target,
        onProgressFunctor(i),
        abortSignal,
      );
      speeds.push(speed);
    }

    const average = Fast.average(speeds);
    this.onComplete?.({ speed: average / this.unit });

    return average / this.unit;
  }

  static async download(
    url: string,
    onProgress?: (progress: number, speed: number) => void,
    abortSignal?: AbortSignal,
  ) {
    const start = Date.now();
    const request = await fetch(url, { signal: abortSignal });
    const reader = request.body?.getReader();
    const contentLength = Number(request.headers.get("Content-Length"));

    let receivedLength = 0;
    const chunks = [];
    while (reader) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      if (!onProgress || !contentLength) {
        continue;
      }

      const progress = receivedLength / contentLength;
      const speed = (receivedLength / (Date.now() - start)) * 1000;
      onProgress(progress, speed);
    }

    const speed = (receivedLength / (Date.now() - start)) * 1000;

    return speed;
  }
}
