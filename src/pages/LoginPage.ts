import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly newUserSignupTitle: Locator;
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;
  private readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newUserSignupTitle = page.locator('h2:has-text("New User Signup!")');
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
  }

  async isLoaded(): Promise<boolean> {
    await this.newUserSignupTitle.waitFor({ state: 'visible' });
    return this.newUserSignupTitle.isVisible();
  }

  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async submitSignup(): Promise<void> {
    await this.signupButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.fillSignupForm(name, email);
    await this.submitSignup();
  }
}
