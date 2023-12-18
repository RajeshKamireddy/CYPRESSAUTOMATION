/*
Open github->settings->developer options->OAuth2.0 app->New OAuth
Fill all the required fields and click register application button
(Appname:Cypress, HomePageurl:https://abhisoftwaretech.blogspot.com, Authorization callback url: https://abhisoftwaretech.blogspot.com)
Note down client Id and click generate Secret key
client_id = 266a188924e93d132a5c
client_secret = dee25efaca9f24bcc0a27eb1529f33a984f9228d
Hit this url in browser and then note down the code -> Homepageurl + client_id
(https://github.com/login/oauth/authorize?client_id=266a188924e93d132a5c)

Hit this url in Postman with Get request and note down the access token
(https://github.com/login/oauth/access_token?client_id=266a188924e93d132a5c&client_secret=dee25efaca9f24bcc0a27eb1529f33a984f9228d&code=5cf307ee7e47ffdd8893)

Hit this url in Postman with Get request with bearer + access token
(https://api.github.com/user/repos)

*/


describe("Authentication",()=>{

    it.only("Getting Auth code",()=>{

      cy.visit('https://github.com/login/oauth/authorize?client_id=266a188924e93d132a5c')

      cy.get('#login_field').type('rajeshkamireddy63@gmail.com')

     
      cy.get('#password').type('Krlpr@rajesh123')

      cy.get("input[value='Sign in']").click();
      cy.wait(7000);
 cy.get("div[class*='overflowable-contents']>div>ul>li:nth-child(3)>a[href='https://abhisoftwaretech.blogspot.com/2023/01/seleniumjava.html']").click();
 
 cy.wait(10000);
 cy.url().then((url) => {

    cy.log('Current URL1-->: ' + url);

 }).wait(6000);    

    //   cy.url().then((url) => {
    //     cy.log('Current URL: ' + url);
    //  }).wait(6000);


    })




    it("OAuth2.0",()=>{

        cy.request({
            method :'GET',
            url : 'https://postman-echo.com/basic-auth',
            auth: {
                username : 'postman',
                password : 'password'
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.authenticated).equal(true);
            cy.log("Response Body====>"+JSON.stringify(response.body))
        })
    })

//---------------------Bearer Token----------------------------

    const token ="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";
    it("Bearer Token",()=>{

        cy.request({
            method :'GET',
            url : 'https://api.github.com/user/repos',
            headers: {
                Authorization : 'Bearer '+token
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            cy.log("Response Body====>"+JSON.stringify(response.body))
        })
    })




})