/// <reference types="cypress" />

describe('RegistrationCard Component E2E Test', () => {
  beforeEach(() => {
    // Visit the page onde o RegistrationCard está renderizado
    cy.visit(' http://192.168.1.26:3001/#/dashboard'); // Atualize para a URL correta da sua aplicação
  });

  it('should render the RegistrationCard and interact with buttons', () => {
    // Mock data for the user
    const mockUserData =  {
      id: "1",
      admissionDate: "22/10/2023",
      email: "filipe@caju.com.br",
      employeeName: "Filipe Marins",
      status: "REVIEW",
      cpf: "78502270001"
    }

    // Simular que a página contém o card com os dados do usuário
    cy.get('[data-testid="card"]').as('registrationCard');

    cy.get('@registrationCard').first()
    .contains(mockUserData.employeeName)
    .parents('[data-testid="card"]') // Seleciona o card pai que contém o nome
    .within(() => {
      cy.contains(mockUserData.email);
      cy.contains(mockUserData.admissionDate);
    });

    // Verificar que os botões Aprovar, Reprovar e o ícone de excluir estão presentes
    cy.get('@registrationCard').first().within(() => {
      cy.contains('Reprovar').should('exist');
      cy.contains('Aprovar').should('exist');
      cy.get('[data-testid="delete-icon"]').should('exist');
    });

    // Clicar no botão Aprovar e verificar que a ação correta foi chamada
    cy.get('@registrationCard').first().within(() => {
      cy.contains('Aprovar').click({ force: true });
    });

    // Verificar que a ação foi disparada (exemplo de interceptação de uma API)
    cy.intercept('PUT', '**/registrations/1', (req) => {
      expect(req.body.status).to.equal('APPROVED');
    });

    // Clicar no botão Reprovar e verificar que a ação correta foi chamada
    cy.get('@registrationCard').first().within(() => {
      cy.contains('Reprovar').click({ force: true });
    });

    cy.intercept('PUT', '**/registrations/1', (req) => {
      expect(req.body.status).to.equal('REPROVED');
    });

    // Clicar no ícone de lixeira e verificar que a ação de deletar foi disparada
    cy.get('@registrationCard').first().within(() => {
      cy.get('[data-testid="delete-icon"]').click({ force: true });
    });

    cy.intercept('DELETE', '**/registrations/1', (req) => {
      expect(req.body).to.be.undefined; // Simula que a requisição DELETE foi feita corretamente
    });
  });
});
