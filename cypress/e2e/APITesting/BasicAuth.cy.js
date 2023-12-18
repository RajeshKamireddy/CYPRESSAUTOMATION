describe("Authentication",()=>{

    it("Basic Auth",()=>{

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

//-------------------Digest Auth------------------------
    it("Digest Auth",()=>{

        cy.request({
            method :'GET',
            url : 'https://postman-echo.com/basic-auth',
            auth: {
                username : 'postman',
                password : 'password',
                method: 'digest'
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

    //---------------------API KEY Auth----------------------------

    const APIKEY ="4e67074d9454bdebc4a88a2875e35803";
    it.only("API Key Auth",()=>{

        cy.request({
            method :'GET',
            url : 'https://api.openweathermap.org/data/2.5/weather',
            qs: {
                q : 'Delhi',
                appid : APIKEY//'4e67074d9454bdebc4a88a2875e35803' //API Key and Value
            }
        }).then((response)=>{
            expect(response.status).to.eq(200);
            cy.log("Response Body====>"+JSON.stringify(response.body))
        })
    })



})