// @ts-ignore
  Cypress.Commands.add('login', () => {
    window.localStorage.setItem('token', "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwZDhmYTQ0Yy01NGZkLTRjZDAtYWNlOS0yYTdkYTU3OTkyZGUiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiREVGQVVMVCJ9XSwiaWF0IjoxNjc3NzY1NDg5LCJleHAiOjE2Nzc4NjU0ODksImlzcyI6InVrMjIzIn0.BytdZpJjcrsSdhDsQSeZjPZAV5DeygFi5Y6um2vIrU0")
    window.localStorage.setItem('user', "{\"id\":\"0d8fa44c-54fd-4cd0-ace9-2a7da57992de\",\"firstName\":\"Tyler\",\"lastName\":\"Durden\",\"email\":\"user@example.com\",\"password\":\"$2a$12$Erh9KWJf.dx50pIqcG2CouZW3i.Q/35vqpJ.7cD4.Q8RBJ0EWO7j2\",\"roles\":[{\"id\":\"d29e709c-0ff1-4f4c-a7ef-09f656c390f1\",\"name\":\"DEFAULT\",\"authorities\":[{\"id\":\"2ebf301e-6c61-4076-98e3-2a38b31daf86\",\"name\":\"DEFAULT\"}]}]}")
  })

  beforeEach(() => {
    cy.login()
  })

  describe('Navigate to User Homepage', () => {
    it('Visits the login page', () => {
      cy.visit('http://localhost:3000/login/')

      cy.contains('Sign In')

      cy.get('input[id=email]').type('user@example.com')
      cy.get('input[id=password]').type('1234')
      cy.get('[id=signIn]').click()
      cy.visit('http://localhost:3000/authHomeUser')
    })

    it('Creates a profile', () => {
      cy.visit('http://localhost:3000/authHomeUser')

      cy.contains('User Homepage')
      cy.contains('Create a Profile').click()

      cy.visit('http://localhost:3000/userprofileedit/')

      cy.get('input[id=age]').type('22')
      cy.get('input[id=profilePictureURL]').type('https://goo.su/logos/logo_blue_white.png')
      cy.get('input[id=address]').type('At Home 456 789')
      cy.contains('Finish').click()
      cy.visit('http://localhost:3000/authHomeUser')
    })

    it('Edit profile', () => {
      cy.visit('http://localhost:3000/authHomeUser')

      cy.contains('User Homepage')
      cy.contains('Edit Profile').click()

      cy.visit('http://localhost:3000/userprofileedit/0d8fa44c-54fd-4cd0-ace9-2a7da57992de')

      cy.contains('User: Tyler Durden')
      cy.get('input[id=age]').type('33')
      cy.get('input[id=profilePictureURL]').type('https://www.google.com/imgres?imgurl=https%3A%2F%2Frepository-images.githubusercontent.com%2F229502199%2Fb215ce00-31b0-11ea-9b32-78ed64ea5120&imgrefurl=https%3A%2F%2Fgithub.com%2Fash-jc-allen%2Fshort-url&tbnid=cu8G6R78KAVD_M&vet=12ahUKEwjk1uDBuL39AhWH_rsIHdyVDRsQMygMegUIARDyAQ..i&docid=9yCRlBL2fv0LvM&w=1280&h=640&q=image%20short%20url&ved=2ahUKEwjk1uDBuL39AhWH_rsIHdyVDRsQMygMegUIARDyAQ')
      cy.get('input[id=address]').type('At Home 333 333')

      cy.contains('Save').click()
      cy.visit('http://localhost:3000/authHomeUser')
    })

    it('Logout', () => {
      cy.visit('http://localhost:3000/authHomeUser')

      cy.contains('User Homepage')

      cy.contains('Logout').click()
      cy.visit('http://localhost:3000/')

      cy.visit('http://localhost:3000/authHomeUser')
      cy.contains('Sign In')
    })
})