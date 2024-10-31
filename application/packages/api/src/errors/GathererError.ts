import { BaseGatherer } from "..";

export class GathererError extends Error {
  public args: any[];
  constructor(
    public readonly gathererInstance: BaseGatherer,
    message: string,
    ...args: any[]
  ) {
    super(message);
    this.name = "GathererError";
    this.args = args;
  }
}
