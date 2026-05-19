import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  private readonly accountCreatedTitle: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountCreatedTitle = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async isLoaded(): Promise<boolean> {
    await this.accountCreatedTitle.waitFor({ state: 'visible', timeout: 10000 });
    return this.accountCreatedTitle.isVisible();
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.accountCreatedTitle.textContent()) ?? '';
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
