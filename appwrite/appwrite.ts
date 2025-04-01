import { Client, Account, ID, Databases, Storage } from "react-native-appwrite";
import { config } from "./config";

const client = new Client()
  .setProject(config.project)
  .setEndpoint(config.endpoint)
  .setPlatform("ReStatePackage");

// const admin = new Client()
//   .setProject(config.project)
//   .setPlatform("ReStatePackage")
//   .setKey(config.admin);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
