import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../utils/dataFactory';

export type Gender = 'Mr' | 'Mrs';

export class SignupPage extends BasePage {
  private readonly mrRadio: Locator;
  private readonly mrsRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly daySelect: Locator;
  private readonly monthSelect: Locator;
  private readonly yearSelect: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly offersCheckbox: Locator;

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;

  private readonly createAccountButton: Locator;
  private readonly accountInfoTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.mrRadio = page.locator('#id_gender1');
    this.mrsRadio = page.locator('#id_gender2');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daySelect = page.locator('[data-qa="days"]');
    this.monthSelect = page.locator('[data-qa="months"]');
    this.yearSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.offersCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.accountInfoTitle = page.locator('h2:has-text("Enter Account Information")');
  }

  async isLoaded(): Promise<boolean> {
    await this.accountInfoTitle.waitFor({ state: 'visible' });
    return this.accountInfoTitle.isVisible();
  }

  async selectGender(gender: Gender): Promise<void> {
    if (gender === 'Mr') {
      await this.mrRadio.check();
    } else {
      await this.mrsRadio.check();
    }
  }

  async fillAccountInfo(user: UserData): Promise<void> {
    await this.selectGender(user.gender);
    await this.passwordInput.fill(user.password);
    await this.daySelect.selectOption(user.birthDay);
    await this.monthSelect.selectOption(user.birthMonth);
    await this.yearSelect.selectOption(user.birthYear);
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
  }

  async fillAddressInfo(user: UserData): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.address1Input.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async fillAllInfo(user: UserData): Promise<void> {
    await this.fillAccountInfo(user);
    await this.fillAddressInfo(user);
  }

  async submit(): Promise<void> {
    await this.createAccountButton.click();
  }

  async registerUser(user: UserData): Promise<void> {
    await this.fillAllInfo(user);
    await this.submit();
  }
}
