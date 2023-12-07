import { createContext } from "../context";

export type Context = Awaited<ReturnType<typeof createContext>> & {
  /**
   * Used for routine executions, such as local scripts, webhooks, or cron jobs.
   */
  bypassSecurity?: true;
};
