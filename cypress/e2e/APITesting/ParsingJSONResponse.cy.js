describe("API Testing",()=>{

     //---------------------------Get Products-------------------------------------
     it("Parsing Json response",()=>{

         cy.request({
            method : 'GET',
            url : 'https://fakestoreapi.com/products',

         }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[0].id).equal(1);
            expect(response.body[0].title).equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
            expect(response.body[0].price).equal(109.95);
            expect(response.body[0].category).equal("men's clothing");
         })

     })


      //---------------------------Sum of product prices-------------------------------------
      it("Sum of product prices",()=>{
        let totalPrice=null;
        cy.request({
           method : 'GET',
           url : 'https://fakestoreapi.com/products',

        }).then((response)=>{
         /* Method-1   
           const len=response.body.length;
           cy.log("========>"+len)
           for(let i=0;i<19;i++){
            totalPrice=totalPrice+response.body[i].price;
           }
           */
          //Method-2
          response.body.forEach((element)=>{
            totalPrice=totalPrice+element.price;  
          })
           cy.log("Total Price of all Products====> "+totalPrice)
        })

    })




})