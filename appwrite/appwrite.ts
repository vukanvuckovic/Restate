import { Client, Account, Databases, Storage } from "react-native-appwrite";
import { config } from "./config";

const client = new Client()
  .setProject(config.project)
  .setEndpoint(config.endpoint)
  .setPlatform("com.vukan.homescope2");

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
