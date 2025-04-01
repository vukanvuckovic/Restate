import { databases, storage } from "../appwrite/appwrite";
import { config } from "@/appwrite/config";
import { ID, Models } from "react-native-appwrite";

const agentNames: string[] = [
  "Scarlett Winters",
  "Isla Blackwood",
  "Lena Cross",
  "Elena Voss",
  "Jade Caldwell",
];

export const seedAgents = async () => {
  try {
    const images = (await storage.listFiles(config.agentImages)).files;
    const agents = (await databases.listDocuments(config.db, config.agents))
      .documents;

    for (let i = 0; i < agents.length; i++) {
      await databases.updateDocument(config.db, config.agents, agents[i].$id, {
        name: agentNames[i],
        image: images[i].$id,
      });
    }

    console.log("finished");
  } catch (error) {
    console.error("Error seeding agents:", error);
  }
};
