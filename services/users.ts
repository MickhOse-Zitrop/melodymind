import { axiosInstance } from "./instance";
import { ApiRoutes } from "@/services/constants";
import { AuthorFullInfo } from "@/@types/author-full-info";

export const search = async (query: string): Promise<AuthorFullInfo[]> => {
  return (
    await axiosInstance.get<AuthorFullInfo[]>(ApiRoutes.SEARCH_USERS, {
      params: { query },
    })
  ).data;
};
