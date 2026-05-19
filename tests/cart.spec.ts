import { test, expect } from '../src/fixtures';

const PRODUCT_ID = 1;      
const QUANTITY = 4;

test.describe('Manipulação de Inventário - Carrinho', () => {
  test('deve adicionar 4 unidades de um produto e validar quantidade e valores no resumo', async ({
    productDetailPage,
    cartPage,
  }) => {
    let productInfo: { name: string; unitPrice: number };

    await test.step(`Navegar para o produto ID ${PRODUCT_ID} e capturar nome e preço`, async () => {
      productInfo = await productDetailPage.addProductWithQuantity(PRODUCT_ID, QUANTITY);

      expect(productInfo.name).toBeTruthy();
      expect(productInfo.unitPrice).toBeGreaterThan(0);
    });

    await test.step('Ir para o carrinho pelo modal de confirmação', async () => {
      await productDetailPage.proceedToCart();
    });

    await test.step('Verificar que o carrinho foi carregado com itens', async () => {
      const isLoaded = await cartPage.isLoaded();
      expect(isLoaded).toBe(true);

      const isEmpty = await cartPage.isEmpty();
      expect(isEmpty).toBe(false);
    });

    await test.step('Validar quantidade, preço unitário e total do produto no carrinho', async () => {
      const row = await cartPage.getRowData(0);
      const expectedTotal = productInfo.unitPrice * QUANTITY;

      expect(row.productName).toBe(productInfo.name);
      expect(row.quantity).toBe(QUANTITY);
      expect(row.unitPrice).toBe(productInfo.unitPrice);
      expect(row.totalPrice).toBe(expectedTotal);
    });

    await test.step('Confirmar que o carrinho contém exatamente 1 produto distinto', async () => {
      const rowCount = await cartPage.getRowCount();
      expect(rowCount).toBe(1);
    });
  });
});
