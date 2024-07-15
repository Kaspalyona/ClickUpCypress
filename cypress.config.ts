import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import allureWriter from "@shelex/cypress-allure-plugin/writer";
import dotenv from 'dotenv';
import * as process from "node:process";

// Завантажуємо змінні середовища з .env файлу
dotenv.config();

async function setupNodeEvents(on, config) {
  // Додає плагін для Cucumber
  await addCucumberPreprocessorPlugin(on, config);

  // Підключає плагін для звітів Mochawesome
  require("cypress-mochawesome-reporter/plugin")(on);

  // Підключає Esbuild-препроцесор
  on("file:preprocessor", createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  // Підключає плагін для Allure-звітів
  allureWriter(on, config);

  // Повертає змінений конфігураційний об'єкт
  const cypressDotenv = require('cypress-dotenv');
  config = cypressDotenv(config);

  return config;
}

export default defineConfig({
  projectId: "xw17vy",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    video: false,
    env: {
      token: process.env.TOKEN,
      base_url:  "https://api.clickup.com/api/v2",
      allureReuseAfterSpec: true,
      teamId:  "9015765205",
      invalidTeamId: "Teamka",
      spaces: "/spaces",
      "allure": true
    },
  },
});
