import { test, expect } from '../src/fixtures';
import { generateUserData } from '../src/utils/dataFactory';

test.describe('Registro de Novo Usuário', () => {
  test('deve registrar um novo usuário com sucesso e exibir "ACCOUNT CREATED!"', async ({
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
  }) => {
    const user = generateUserData();
 
    await test.step('Navegar até a página inicial', async () => {
      await homePage.goto();
      await expect(homePage.isLoaded()).resolves.toBe(true);
    });

    await test.step('Acessar a página de Signup/Login', async () => {
      await homePage.goToSignupLogin();
      await expect(loginPage.isLoaded()).resolves.toBe(true);
    });

    await test.step(`Preencher nome "${user.name}" e e-mail "${user.email}"`, async () => {
      await loginPage.signup(user.name, user.email);
    });

    await test.step('Verificar abertura do formulário de detalhes da conta', async () => {
      await expect(signupPage.isLoaded()).resolves.toBe(true);
    });

    await test.step('Preencher informações da conta e endereço', async () => {
      await signupPage.registerUser(user);
    });

    await test.step('Validar mensagem de sucesso "ACCOUNT CREATED!"', async () => {
      const isCreated = await accountCreatedPage.isLoaded();
      expect(isCreated).toBe(true);

      const message = await accountCreatedPage.getSuccessMessage();
      expect(message.trim().toUpperCase()).toBe('ACCOUNT CREATED!');
    });

    await test.step('Clicar em Continue e confirmar usuário logado', async () => {
      await accountCreatedPage.clickContinue();
      await homePage.isLoggedInAs(user.firstName);
    });
  });
});
