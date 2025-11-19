import { getEnv } from "@/helpers/getEnv";

export const getNotifications = async (userId) => {
  if (!userId) {
    return [];
  }

  const res = await fetch(
    `${getEnv("VITE_API_BASE_URL")}/notifications/${userId}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.message || "Unable to load notifications at the moment.";
    throw new Error(message);
  }

  return data;
};
