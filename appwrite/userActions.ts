import { Alert } from "react-native";
import { account, databases } from "./appwrite";
import { ID, OAuthProvider, Query } from "react-native-appwrite";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { config } from "./config";
import { User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await account.get();
    const result = await databases.listDocuments(config.db, config.users, [
      Query.equal("email", response.email),
    ]);
    return (result.documents[0] as User) ?? null;
  } catch {
    return null;
  }
}

export async function login(): Promise<User | null> {
  try {
    const redirectUri = makeRedirectUri({ scheme: "myapp", preferLocalhost: true });
    const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    if (!response) {
      Alert.alert("Failed to log in.", "Try again later.");
      return null;
    }

    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      Alert.alert("Failed to log in.", "Try again later.");
      return null;
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      Alert.alert("Failed to log in.", "Try again later.");
      return null;
    }

    const session = await account.createSession(userId, secret);
    if (!session) {
      Alert.alert("Failed to create a session.", "Try again later.");
      return null;
    }

    const authUser = await account.get();
    const existing = await databases.listDocuments(config.db, config.users, [
      Query.equal("email", authUser.email),
    ]);

    if (existing.total === 0) {
      await databases.createDocument(config.db, config.users, ID.unique(), {
        name: authUser.name,
        email: authUser.email,
      });
    }

    return getCurrentUser();
  } catch {
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    await account.deleteSession("current");
    return true;
  } catch {
    return false;
  }
}

export async function updateUser(
  userInfo: { name?: string; email?: string; phone?: string },
  userId: string
): Promise<User | null> {
  try {
    const result = await databases.updateDocument(
      config.db,
      config.users,
      userId,
      userInfo
    );
    return result as User;
  } catch {
    return null;
  }
}
