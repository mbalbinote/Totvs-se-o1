import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly signupLoginLink: Locator;
  private readonly loggedInLabel: (firstName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.loggedInLabel = (firstName: string) =>
      page.locator(`a:has-text("Logged in as ${firstName}")`);
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.signupLoginLink.waitFor({ state: 'visible' });
  }

  async goToSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async isLoaded(): Promise<boolean> {
    await this.signupLoginLink.waitFor({ state: 'visible' });
    return this.signupLoginLink.isVisible();
  }

  async isLoggedInAs(firstName: string): Promise<void> {
    await this.loggedInLabel(firstName).waitFor({ state: 'visible', timeout: 8000 });
  }
}
