// @ts-ignore
Cypress.Commands.add('login', () => {
  window.localStorage.setItem('token', "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiREVGQVVMVCJ9LHsiYXV0aG9yaXR5IjoiVVNFUl9NT0RJRlkifSx7ImF1dGhvcml0eSI6IlVTRVJfREVMRVRFIn1dLCJzdWIiOiJiYTgwNGNiOS1mYTE0LTQyYTUtYWZhZi1iZTQ4ODc0MmZjNTQiLCJpYXQiOjE2Nzc3NTkwMTIsImV4cCI6MTY3Nzg1OTAxMiwiaXNzIjoidWsyMjMifQ.ux3wrrw-QKp1FNY7O0qMI6nvz5LrtPrc3-SM8GB5sCA")
  window.localStorage.setItem('user', "{\"id\":\"ba804cb9-fa14-42a5-afaf-be488742fc54\",\"firstName\":\"James\",\"lastName\":\"Bond\",\"email\":\"admin@example.com\",\"password\":\"$2a$12$Erh9KWJf.dx50pIqcG2CouZW3i.Q/35vqpJ.7cD4.Q8RBJ0EWO7j2\",\"roles\":[{\"id\":\"d29e709c-0ff1-4f4c-a7ef-09f656c390f1\",\"name\":\"DEFAULT\",\"authorities\":[{\"id\":\"2ebf301e-6c61-4076-98e3-2a38b31daf86\",\"name\":\"DEFAULT\"}]},{\"id\":\"ab505c92-7280-49fd-a7de-258e618df074\",\"name\":\"USER_MODIFY\",\"authorities\":[{\"id\":\"76d2cbf6-5845-470e-ad5f-2edb9e09a868\",\"name\":\"USER_MODIFY\"}]},{\"id\":\"c6aee32d-8c35-4481-8b3e-a876a39b0c02\",\"name\":\"USER_DELETE\",\"authorities\":[{\"id\":\"21c942db-a275-43f8-bdd6-d048c21bf5ab\",\"name\":\"USER_DELETE\"}]}]}")
})

beforeEach(() => {
  cy.login()
})

describe('Navigate to Admin Homepage', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:3000/login/')

    cy.contains('Sign In')

    cy.get('input[id=email]').type('admin@example.com')
    cy.get('input[id=password]').type('1234')
    cy.get('[id=signIn]').click()
    cy.visit('http://localhost:3000/authHomeAdmin')
  })

  it('Creates a profile', () => {
    cy.visit('http://localhost:3000/authHomeAdmin')

    cy.contains('Admin Homepage')
    cy.contains('Create a Profile').click()

    cy.visit('http://localhost:3000/userprofileedit/')

    cy.get('input[id=age]').type('18')
    cy.get('input[id=profilePictureURL]').type('https://goo.su/logos/logo_blue_white.png')
    cy.get('input[id=address]').type('At Home 123 456')
    cy.contains('Finish').click()
    cy.visit('http://localhost:3000/authHomeAdmin')
  })

  it('See all profiles', () => {
    cy.visit('http://localhost:3000/authHomeAdmin')

    cy.contains('Admin Homepage')
    cy.contains('See all Profiles').click()

    cy.visit('http://localhost:3000/userprofile')

    cy.contains('User: James Bond')
    cy.contains('Back').click()
    cy.visit('http://localhost:3000/authHomeAdmin')
  })

  it('Delete profiles', () => {
    cy.visit('http://localhost:3000/authHomeAdmin')

    cy.contains('Admin Homepage')
    cy.contains('See all Profiles').click()

    cy.visit('http://localhost:3000/userprofile')

    cy.contains('User: James Bond')
    cy.contains('Delete').click()
    !cy.contains('User: James Bond')
    cy.contains('Back').click()
    cy.visit('http://localhost:3000/authHomeAdmin')
  })

  it('Logout', () => {
    cy.visit('http://localhost:3000/authHomeAdmin')

    cy.contains('Admin Homepage')

    cy.contains('Logout').click()
    cy.visit('http://localhost:3000/')

    cy.visit('http://localhost:3000/authHomeAdmin')
    cy.contains('Sign In')
  })

})
