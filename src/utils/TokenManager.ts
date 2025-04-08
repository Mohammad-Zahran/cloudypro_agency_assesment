import axios from "axios";

let accessToken: string ;
let tokenExpiry: number | null = null;

const TOKEN_URL = "https://testproject.cloudypro.online/get-access-token.php";

export const getValidSpotifyToken = async (): Promise<string> => {
  const now = Math.floor(Date.now() / 1000); 

  if (!accessToken || !tokenExpiry || now >= tokenExpiry) {
    try {
      const response = await axios.get(TOKEN_URL);
      if (response.data?.success) {
        accessToken = response.data.data.access_token;
        tokenExpiry = now + response.data.data.expires_in - 60; 
        return accessToken;
      } else {
        throw new Error("Invalid token response structure");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  }

  return accessToken;
};
