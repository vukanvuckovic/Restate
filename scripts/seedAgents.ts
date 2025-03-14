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
    const images = [
      ...Array.from({ length: 5 }).map(
        (_, index) => `@/assets/agents/a${index + 1}.jpg`
      ),
    ];

    for (let i = 0; i < 5; i++) {
      await databases.createDocument(config.db, config.agents, ID.unique(), {
        name: agentNames[i],
        image: images[i],
      });
      console.log("seeded " + (i + 1));
    }

    console.log("finished");
  } catch (error) {
    console.error("Error seeding agents:", error);
  }
};
