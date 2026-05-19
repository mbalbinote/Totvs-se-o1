import { test, expect } from '@playwright/test';
import { ProductsListResponse, Product } from '../src/types/api';

const ENDPOINT = '/api/productsList';

test.describe('API – GET /api/productsList', () => {
  let response: ProductsListResponse;

  test.beforeAll(async ({ request }) => {
    const res = await request.get(ENDPOINT);

    expect(res.status(), `HTTP status deve ser 200`).toBe(200);

    response = await res.json() as ProductsListResponse;
  });

  test('responseCode no body deve ser 200', () => {
    expect(response.responseCode).toBe(200);
  });

  test('a lista de produtos não deve estar vazia', () => {
    expect(response.products).toBeDefined();
    expect(Array.isArray(response.products)).toBe(true);
    expect(response.products.length).toBeGreaterThan(0);
  });

  test('cada produto deve ter campos obrigatórios não nulos', () => {
    response.products.forEach((product: Product, index: number) => {
      const context = `produto[${index}] (id: ${product.id})`;

      expect(product.id, `${context} → id`).toBeDefined();
      expect(product.id, `${context} → id não nulo`).not.toBeNull();
      expect(typeof product.id, `${context} → id deve ser number`).toBe('number');

      expect(product.name, `${context} → name`).toBeDefined();
      expect(product.name, `${context} → name não nulo`).not.toBeNull();
      expect(product.name.trim(), `${context} → name não vazio`).not.toBe('');

      expect(product.price, `${context} → price`).toBeDefined();
      expect(product.price, `${context} → price não nulo`).not.toBeNull();
      expect(product.price.trim(), `${context} → price não vazio`).not.toBe('');

      expect(product.brand, `${context} → brand`).toBeDefined();
      expect(product.brand, `${context} → brand não nulo`).not.toBeNull();
      expect(product.brand.trim(), `${context} → brand não vazio`).not.toBe('');

      expect(product.category, `${context} → category`).toBeDefined();
      expect(product.category, `${context} → category não nulo`).not.toBeNull();

      expect(product.category.category, `${context} → category.category`).toBeDefined();
      expect(product.category.category.trim(), `${context} → category.category não vazio`).not.toBe('');

      expect(product.category.usertype, `${context} → category.usertype`).toBeDefined();
      expect(product.category.usertype.usertype, `${context} → category.usertype.usertype`).toBeDefined();
      expect(product.category.usertype.usertype.trim(), `${context} → category.usertype.usertype não vazio`).not.toBe('');
    });
  });

  test('cada produto deve ter preço no formato esperado (Rs. NNN)', () => {
    const pricePattern = /^Rs\.\s*\d+$/;
    response.products.forEach((product: Product, index: number) => {
      expect(
        product.price,
        `produto[${index}] "${product.name}" → price fora do formato esperado: "${product.price}"`
      ).toMatch(pricePattern);
    });
  });

  test('ids dos produtos devem ser únicos', () => {
    const ids = response.products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
