import { useState } from "react";
import axios from "axios";

export const usePlayerSearch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlayer = async (riotId: string) => {
    setIsLoading(true);
    setError(null);
    const [gameName, tagLine] = riotId.split("#");
    const apiUrl = `http://3.95.247.155:8000/riotAPI/player`;

    try {
      const response = await axios.get(apiUrl, {
        params: {
          gameName: gameName,
          tagLine: tagLine,
        },
      });
      return response.data;
    } catch (error: any) {
      setError("Failed to fetch player data");
      console.error("Axios error:", error.response);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const searchPuuid = async (puuid: string) => {
    setIsLoading(true);
    setError(null);
    const apiUrl = `http://3.95.247.155:8000/riotAPI/puuid`;

    try {
      const response = await axios.get(apiUrl, {
        params: {
          puuid: puuid,
        },
      });
      return response.data;
    } catch (error: any) {
      setError("Failed to fetch player data");
      console.error("Axios error:", error.response);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, searchPlayer, searchPuuid };
};
