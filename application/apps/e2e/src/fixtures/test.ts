import { test as baseTest } from "@playwright/test";
import { NewProjectPage } from "../pages/new-project";

type Fixtures = {
  readonly newProjectPage: NewProjectPage;
};

const test = baseTest.extend<Fixtures>({
  newProjectPage: async ({ page }, use) => {
    const newProjectPage = new NewProjectPage(page);
    await use(newProjectPage);
  },
});

export { test };
