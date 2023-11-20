import { authApi } from "../api/authApi";

export const getEventsFn = async () => {
  return await authApi.get("api/eventos");
};

export const getHotEventsFn = async () => {
  return await authApi.get("api/events/hot");
};

export const getEventBySportFn = async (sportId) => {
  const response = await authApi.get("api/eventos?sportId=" + sportId);
  return response.data;
};

export const getFavoritesEventsFn = async () => {
  return await authApi.get("api/events-favorites");
};

export const changeFavoriteFn = async (sport: string) => {
  const response = await authApi.post("api/favorite-sport", {
    sport_name: sport,
  });
  return response.data;
};
