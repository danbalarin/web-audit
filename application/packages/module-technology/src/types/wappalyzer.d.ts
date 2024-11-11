declare module "wappalyzer" {
  type Headers = object;

  type WappalyzerOptions = {
    debug?: boolean;
    delay?: number;
    headers?: Headers;
    maxDepth?: number;
    maxUrls?: number;
    maxWait?: number;
    recursive?: boolean;
    probe?: boolean;
    proxy?: boolean;
    userAgent?: string;
    htmlMaxCols?: number;
    htmlMaxRows?: number;
    noScripts?: boolean;
    noRedirect?: boolean;
  };

  type Storage = {
    local: object;
    session: object;
  };

  class Wappalyzer {
    constructor(options: WappalyzerOptions);

    public async init(): Promise<void>;

    public async open(
      url: string,
      headers?: Headers,
      storage?: Storage,
    ): Promise<void>;

    public async analyze(): Promise<unknown>;

    public async destroy(): Promise<void>;
  }

  export default Wappalyzer;
}
