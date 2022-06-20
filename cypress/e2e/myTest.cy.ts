/// <reference types="cypress" />

describe('userLoginPageTest', () => {
  it('should be able to visit the grownBy home page', () => {
    cy.visit('/');
    cy.contains('GrownBy').should('be.visible');
  });

  it('should be able to login with valid credentials', () => {
    cy.get('[data-testid="email"]').type('test1@gmail.com');
    cy.get('[data-testid="password"]').type('test1test1');
    cy.get('[data-testid="submit"]').click();
    cy.wait(150);
    cy.contains('Hello 😄, test1@gmail.com').should('be.visible');
    cy.contains('AddFarm +').should('be.visible');
  });

  it('should be able to click addFarm button and move to addFarmPage', () => {
    cy.get('[data-testid="addFarmButton"]').click();
    cy.contains('Add Your Farm').should('be.visible');
  });

  //can change later
  const testFormData = {
    displayName: 'TF',
    name: 'Test Farm',
    phone: '1234567890',
    openHours: '8:00am - 5:00pm',
  };

  it('fill out the form and submit and back to userlogin page with lists updated', () => {
    cy.get('[data-testid="displayName"]').focus().type(testFormData.displayName);
    cy.get('[data-testid="name"]').focus().type(testFormData.name);
    cy.get('[data-testid="phone"]').focus().type(testFormData.phone);
    cy.get('[data-testid="openHours"]').focus().type(testFormData.openHours);
    cy.get('[data-testid="imageButton"]').focus().click();
    //click the add image to choose one photo with 15 seconds.(optional)
    cy.wait(15000);
    cy.get('[data-testid="farmSubmitButton"]').focus().click();
    cy.wait(3000);
    cy.contains(testFormData.displayName).should('be.visible');
    cy.wait(5000);
    //logout
    cy.get('[data-testid="authButton"]').click();
  });
});
