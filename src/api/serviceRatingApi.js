import api from "./axiosInstance";

/**
 * GET Service Ratings
 * /v1/admin/service-ratings/ratings?page=1&limit=10
 */
export const getServiceRatings = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/admin/service-ratings/ratings?page=${page}&limit=${limit}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  return response.data.data;
};


export const getServiceRatingsByServiceId = async (serviceId) => {
  const response = await api.get(
    `/admin/service-ratings/services/${serviceId}/ratings`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  return response.data.data;
};


export const replyToServiceRating = async ({
  serviceId,
  ratingId,
  reply,
}) => {
  const response = await api.put(
    `/admin/service-ratings/services/${serviceId}/ratings/${ratingId}/reply`,
    { reply },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};