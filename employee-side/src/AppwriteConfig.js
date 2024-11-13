// src/AppwriteConfig.js
import { Client, Account, Databases, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6730b45700166cf7792a');         // Your Appwrite project ID

// Initialize the Appwrite services
export const account = new Account(client);    // For authentication
export const databases = new Databases(client); // For interacting with the database

export { ID };
