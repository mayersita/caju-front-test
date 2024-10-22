/// <reference types="cypress" />

describe('New User Page', () => {
  beforeEach(() => {
    cy.visit(' http://192.168.1.26:3001/#/new-user'); 
  });

  it('should load the form and submit a new user', () => {
    cy.get('input[placeholder="Preencha o nome completo"]').type('João da Silva');
    cy.get('input[placeholder="Preencha o e-mail"]').type('joao@example.com');
    cy.get('input[placeholder="000.000.000-00"]').type('09816516403');
    cy.get('input[type="date"]').type('2023-01-01');
    
    cy.contains('Cadastrar').click();

    cy.contains('Confirmar').click({ force: true });
    
    // Verifique se o Snackbar apareceu após o envio
    cy.contains('Usuário adicionado com sucesso!').should('be.visible');
  });
});
