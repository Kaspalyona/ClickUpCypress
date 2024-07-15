import {Then} from "@badeball/cypress-cucumber-preprocessor";
import * as inspector from "node:inspector";

Then('User get {string} from body', (value: string) => {
    cy.log(` get ${value} from response body`)
    cy.get<Cypress.Response<Body>>('@obtainedResponse').then((resp: Cypress.Response<Body>) => {
        cy.wrap(String(resp[value])).as(value);
    });
});

Then('Status code is equal {}', (expectedStatusCode: number) => {
    cy.checkStatusCode(expectedStatusCode);
});

Then('Value name in request is equal to name in responce', function() {
    cy.get('@createdName').then((requestName) => {
        cy.get('@obtainedResponse').then((responseBody) => {
            const responseName = responseBody.name; // Отримуємо значення name з відповіді
            expect(responseName).to.eq(requestName); // Порівнюємо з requestName
        });
    });
});
