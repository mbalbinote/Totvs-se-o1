import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartRowData } from '../types/ui';

export type { CartRowData };

export class CartPage extends BasePage {
  private readonly cartTable: Locator;
  private readonly cartRows: Locator;
  private readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async goto(): Promise<void> {
    await this.navigate('/view_cart');
    await this.cartTable.waitFor({ state: 'visible' });
  }

  async isLoaded(): Promise<boolean> {
    await this.cartTable.waitFor({ state: 'visible', timeout: 10000 });
    return this.cartTable.isVisible();
  }

  async isEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async getRowCount(): Promise<number> {
    return this.cartRows.count();
  }

  private parsePrice(text: string): number {
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  async getRowData(rowIndex = 0): Promise<CartRowData> {
    const row = this.cartRows.nth(rowIndex);

    const productName = (await row.locator('.cart_description h4 a').textContent()) ?? '';
    const unitPriceText = (await row.locator('.cart_price p').textContent()) ?? '';
    const quantityText = (await row.locator('.cart_quantity button').textContent()) ?? '';
    const totalPriceText = (await row.locator('.cart_total .cart_total_price').textContent()) ?? '';

    return {
      productName: productName.trim(),
      unitPrice: this.parsePrice(unitPriceText),
      quantity: parseInt(quantityText.trim(), 10),
      totalPrice: this.parsePrice(totalPriceText),
    };
  }

  async getAllRows(): Promise<CartRowData[]> {
    const count = await this.getRowCount();
    const rows: CartRowData[] = [];
    for (let i = 0; i < count; i++) {
      rows.push(await this.getRowData(i));
    }
    return rows;
  }
}
