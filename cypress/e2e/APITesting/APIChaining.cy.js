describe("API Chaining",()=>{

    const auth_token = '249613fc7774d77673c442d539040431bfc08dbfa8f9b0050a5d77196a99b65a'
    let random = Math.random().toString(36).substring(2);

    it("Creating user",()=>{
        //Body for creating User
        const requestBody = {
                name: "Rajesh"+random,
                email: "Rajesh"+random+"@gmail.com",
                gender: "male",
                status: "active"
            }
        ////Body for Updating User
        const newRequestBody = {
                name: "Chinnu"+random,
                email: "Chinnu"+random+"@gmail.com",
                gender: "Female",
                status: "active"
            }
        //Creating user
        cy.request({
            method :'POST',
            url : 'https://gorest.co.in/public/v2/users',
            body : requestBody,
            headers : {
                'Authorization' : "Bearer "+auth_token
            }
        }).then((response)=>{
            expect(response.status).to.eq(201);
            expect(response.body.name).equal(requestBody.name);
            cy.log("Response Body====>"+JSON.stringify(response.body))
            const userId = response.body.id;
            //Updating Particular User details
            cy.request({
                method :'PUT',
                url : 'https://gorest.co.in/public/v2/users/'+userId,
                body : newRequestBody,
                headers : {
                    'Authorization' : "Bearer "+auth_token
                }
        })
            }).then((response)=>{
                expect(response.status).to.eq(200);
                expect(response.body.name).equal(newRequestBody.name);
                cy.log("Response Body====>"+JSON.stringify(response.body))
                const userId = response.body.id;
                //Deleting Particular user
                cy.request({
                    method :'DELETE',
                    url : 'https://gorest.co.in/public/v2/users/'+userId,
                    headers : {
                        'Authorization' : "Bearer "+auth_token
                    }
                }).then((response)=>{

                    expect(response.status).to.eq(204);
                    cy.log("Response Body====>"+JSON.stringify(response.body))
                })
             })
                


    })
})