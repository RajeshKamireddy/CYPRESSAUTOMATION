// Install xml2js library using this command npm install xml2js

const xml2js = require('xml2js');
const parser = new xml2js.Parser({explicitArray: false});

describe("XML Parsing",()=>{

    const xmlPayload = "<Pet><id>0</id><Category><id>0</id><name>Rabit1</name></Category><name>Jimmy</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag></tags><status>available</status></Pet>"
    let petId=null;
    let petName=null;

    before("Adding Pet",()=>{

        cy.request({
            method : 'POST',
            url : 'https://petstore.swagger.io/v2/pet',
            body : xmlPayload,
            headers : {
                'Content-Type' : 'application/xml',
                'Accept' : 'application/xml'
                 }
        }).then((response)=>{
        //    cy.log("Body====>"+JSON.stringify(response.body))
            expect(response.status).equal(200);
            parser.parseString(response.body,(err,result)=>{
                petId=result.Pet.id;
                petName=result.Pet.name;
                cy.log("PetId====>"+petId);
                cy.log("PetName====>"+petName);
                cy.log("Body====>"+JSON.stringify(result.Pet))
            })


        })

    })

//--------------Get a Pet----------------------
    it("Getting Pet",()=>{

        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/pet/'+petId,
            headers : {
                'Content-Type' : 'application/xml',
                'Accept' : 'application/xml'
                 }
        }).then((response)=>{
            expect(response.status).equal(200);
            parser.parseString(response.body,(err,result)=>{
                expect(result.Pet.id).equal(petId);
                expect(result.Pet.name).equal(petName);
            })

        })

    })






























})