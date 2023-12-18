describe("API Testing",()=>{

    let authToken=null;
    let orderId=null;
    let requestBody=null;

    before("Creating access token",()=>{

        cy.request({
            method : 'POST',
            url : 'https://simple-books-api.glitch.me/api-clients/',
            headers : {
                        'Content-Type' : 'application/json'
                         },
            body : {
                clientName : "Test",
                clientEmail : Math.random().toString(36).substring(2,10)+"@gmail.com"
                     }

         }).then((response)=>{
             authToken = response.body.accessToken
            cy.log("TOKEN===>"+authToken);
         })


     })

//---------------------------Submit an Order-------------------------------------
     it("Submit an Order",()=>{

        requestBody={
            bookId : 1,
            customerName : Math.random().toString(36).substring(2,10)
                }

         cy.request({
            method : 'POST',
            url : 'https://simple-books-api.glitch.me/orders/',
            headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer '+authToken
                         },
            body : requestBody

         }).then((response)=>{
            expect(response.status).to.eq(201);
            expect(response.body.created).equal(true);
            orderId= response.body.orderId
            cy.log("Response Body===>"+JSON.stringify(response.body));
            cy.log("Order Id===>"+orderId);
         })

     })

     //---------------------------Get an Order-------------------------------------
     it("Get an Order",()=>{

         cy.request({
            method : 'GET',
            url : 'https://simple-books-api.glitch.me/orders/'+orderId,
            headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer '+authToken
                         },
            cookies : {
                        'cookieName' : 'mycookie'
                        }

         }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.bookId).equal(requestBody.bookId);
            expect(response.body.customerName).equal(requestBody.customerName);
            expect(response.body.id).equal(orderId);
             cy.log("Response Body===>"+JSON.stringify(response.body));
         })

     })




})