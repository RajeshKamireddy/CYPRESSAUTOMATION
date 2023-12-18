
import {Login} from './PageObjects/LoginPage.js'

describe('POM',() =>{

    //General approach
    it('LoginTestG', () =>{

        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.get("input[placeholder='Username']").type("Admin")
        cy.get("input[placeholder='Password']").type("admin123")
        cy.get("button[type='submit']").click()
        cy.get('.oxd-topbar-header-breadcrumb>h6').should('have.text','Dashboard');

    })


    //Using Page object model 
    it.only('LoginTestPOM', () =>{

        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.fixture('orangehrm').then((data) =>{

            const login =new Login
            login.setUserName(data.username);
            login.setPassword(data.password);
            login.clickSubmit();
            login.verifyLogin();


        })
        

    })

})