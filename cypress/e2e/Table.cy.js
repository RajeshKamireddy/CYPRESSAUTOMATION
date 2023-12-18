describe('Handle Tables',()=>{

    beforeEach('Login',()=>{

        cy.visit('https://demo.opencart.com/admin/index.php')
        cy.get("#input-username").type("demo");
        cy.get("#input-password").type("demo")
        cy.get("button[type='submit']").click()

        cy.get(".btn-close").click();

        //customers-->customers

        cy.get("#menu-customer>a").click(); // customers main menu
        cy.get("#menu-customer>ul>li:first-child").click(); // customers sub/child item

    })

    it.skip('Check Number of Rows & Columns',()=>{

        const columns = cy.get('#form-customer > div.table-responsive > table > thead > tr > td').should('have.length','7');
        const rows = cy.get('#form-customer > div.table-responsive > table > tbody> tr').should('have.length','10')

    })

    it.skip('Check cell data from specific Row & Column',()=>{

        cy.get("#form-customer > div.table-responsive > table > tbody> tr:nth-child(2)>td:nth-child(3)").contains("olaola@das.com");
        
    })

    it.skip('Read all the Rows & Columns data in the first page',()=>{

        cy.get('#form-customer > div.table-responsive > table > tbody> tr')
                        .each(($row, index, $rows)=>{

                            cy.wrap($row).within( ()=>{

                                cy.get("td").each(($col, index, $cols)=>{
                                    cy.log($col.text());
                                    console.log($col.text())
                                })
                            })

                        })
        
    })

    it('Pagination',()=>{

        //find total no.of pages
        let totalPages;
        cy.get("div.col-sm-6.text-end").then((e)=>{

            let mytext=e.text(); // Showing 1 to 10 of 5581 (559 Pages)
            totalPages = mytext.substring(mytext.indexOf("(")+1 ,mytext.indexOf("Pages")-1 );
           // cy.log("Total number of pages in a table====> "+totalPages)

        }).then(() => {
            cy.log("Total number of pages in a table====> " + totalPages);

            for(let p=1;p<=totalPages;p++){

                cy.log("Active page is ============================>"+p)
                if(p!=1){
                    cy.get("ul[class='pagination']>li:nth-child("+p+")").click();
                }
                cy.wait(3000);
                cy.get('#form-customer > div.table-responsive > table > tbody> tr')
                            .each(($row, index, $rows)=>{
    
                                cy.wrap($row).within( ()=>{
    
                                    cy.get("td:nth-child(3)").each(($col, index, $cols)=>{
                                        cy.log("Email========>"+$col.text());
                                    })                           
                                 })
    
                            })
    
            }

        });


        
    })




})