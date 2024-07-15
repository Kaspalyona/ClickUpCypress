import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import {defineConfig} from "cypress";
import config from "cypress.config";
import * as process from "node:process";
const BASE_URL = Cypress.env('base_url') as string;
const teamId = Cypress.env('teamId');
const invalidTeamId = Cypress.env('invalidTeamId')
const randomString = Math.random().toString(36).substring(2, 15);




Given("team_id exists and auth token is valid", () => {
    cy.log('team_id exists and auth token is valid');
})


//possitive get
When("User sends a GET request to get spaces", () => {
    cy.sentRequest('get', `${BASE_URL}/team/${teamId}/space`)
})

//negative get
When("User sends a GET request to with team_id as a string", ()=>{
        cy.sentRequest('get', `${BASE_URL}/team/${invalidTeamId}/space`)
        });

When("User sends a POST request with the body from file {}", (spaceName: string) => {
    cy.fixture(spaceName).then((body) => {
        if (typeof body.name === 'string'){
            body.name = `New space ${randomString}`;
            Cypress.env('createdSpaceName', body.name);
        }
            cy.sentRequest('post', `${BASE_URL}/team/${teamId}/space`, body)
            });
    });

When("User sends a POST request with the body containing the already created name from file {string}", (spaceName: string) => {
    cy.fixture(spaceName).then((body) => {
        body.name = Cypress.env('createdSpaceName')
        cy.sentRequest('post', `${BASE_URL}/team/${teamId}/space`, body)
    });
});

