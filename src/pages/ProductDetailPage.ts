import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductInfo } from '../types/ui';

export type { ProductInfo };

export class ProductDetailPage extends BasePage {
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly quantityInput: Locator;
  private readonly addToCartButton: Locator;
  private readonly cartModalContinue: Locator;
  private readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productPrice = page.locator('.product-information span > span');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');
    this.cartModalContinue = page.locator('.modal-footer button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('.modal-body a[href="/view_cart"]');
  }

  async gotoProduct(productId: number): Promise<void> {
    await this.navigate(`/product_details/${productId}`);
    await this.productName.waitFor({ state: 'visible' });
  }

  async getProductInfo(): Promise<ProductInfo> {
    const name = (await this.productName.textContent()) ?? '';
    const priceText = (await this.productPrice.textContent()) ?? '';
    // Price format: "Rs. 500"
    const unitPrice = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    return { name: name.trim(), unitPrice };
  }

  async setQuantity(qty: number): Promise<void> {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    // Wait for the confirmation modal
    await this.viewCartLink.waitFor({ state: 'visible', timeout: 5000 });
  }

  async proceedToCart(): Promise<void> {
    await this.viewCartLink.click();
  }

  async continueShopping(): Promise<void> {
    await this.cartModalContinue.click();
  }

  async addProductWithQuantity(productId: number, qty: number): Promise<ProductInfo> {
    await this.gotoProduct(productId);
    const info = await this.getProductInfo();
    await this.setQuantity(qty);
    await this.addToCart();
    return info;
  }
}
