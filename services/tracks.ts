import { TrackFullInfo } from "@/lib/find-tracks";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "@/services/constants";

export const search = async (query: string): Promise<TrackFullInfo[]> => {
  return (
    await axiosInstance.get<TrackFullInfo[]>(ApiRoutes.SEARCH_TRACKS, {
      params: { query },
    })
  ).data;
};
