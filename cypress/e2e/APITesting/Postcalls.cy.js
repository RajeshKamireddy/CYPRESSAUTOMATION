describe("api testing", ()=>{

it("Approach1-Hard coded Json object", ()=>{

    const requestBody={
        tourist_name: "Rajesh2",
        tourist_email: "raje65@gmail.com",
        tourist_location: "Vij1"
    }

    cy.request({

        method :'POST',
        url : 'http://restapi.adequateshop.com/api/Tourist',
        body : requestBody

    })
    .then((response)=>{

         expect(response.status).to.eq(201)
        expect(response.body.tourist_name).to.eq("Rajesh1")
        expect(response.body.tourist_email).to.eq("raje64@gmail.com")
        expect(response.body.tourist_location).to.eq("Vij1")
        
        //Print entire Response body
        cy.log("Response Body======>"+ JSON.stringify(response.body)) //it will print entire response body

    })
})

//-------------------------------------------------------------------------------------------------
    it.only("Approach2-Dynamically generating Json object", ()=>{

        const requestBody={
            tourist_name: Math.random().toString(36).substring(2,10),
            tourist_email: Math.random().toString(36).substring(2,10)+"@gmail.com",
            tourist_location: "Vij1"
        }
    
        cy.request({
    
            method :'POST',
            url : 'http://restapi.adequateshop.com/api/Tourist',
            body : requestBody
    
        })
        .then((response)=>{
    
             expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location)

            //Validating properties of body
            expect(response.body).has.property('tourist_email',requestBody.tourist_email)
            expect(response.body).to.have.property('tourist_name',requestBody.tourist_name)
            
            //Print entire Response body
            cy.log("Response Body======>"+ JSON.stringify(response.body)) 
            ////Print particular property from Response body
            cy.log("Property Value======>"+ JSON.stringify(response.body.tourist_name)) 
    
        })


    })

//-------------------------------------------------------------------------------------------------
    it("Approach3 - Using Fixture", ()=>{

        cy.fixture('tourist').then((data)=>{

            const requestBody = data;

        cy.request({
    
            method :'POST',
            url : 'http://restapi.adequateshop.com/api/Tourist',
            body : requestBody
    
        })
        .then((response)=>{
    
             expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            
            //Print entire Response body
            cy.log("Response Body======>"+ JSON.stringify(response.body)) //it will print entire response body
    
        })

    })


    })


 })
