import api from "./axiosInstance";


/* CREATE PRODUCT */
export const createProductAPI = async (payload) => {
  try {
    const res = await api.post("/admin/products", payload);
    return {
      success: true,
      data: res.data.data, // { id }
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Create product failed",
    };
  }
};

/* GENERATE UPLOAD URL */
export const generateFileUploadUrlAPI = async (payload) => {
  try {
    const res = await api.post("/files/upload/generate", payload);
    return { success: true, data: res.data.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Upload URL failed",
    };
  }
};

/* CONFIRM FILE */
export const confirmFileUploadAPI = async (fileId, type) => {
  try {
    const res = await api.patch("/files/upload/confirm", { fileId, type });
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Confirm upload failed",
    };
  }
};





// export const fetchProductsAPI = async ({ page, limit }) => {
//   try {
//     const res = await api.get(
//       `/admin/products?page=${page}&limit=${limit}`
//     );

//     return {
//       success: true,
//       data: res.data.data.products,
//       total: res.data.data.total,
//       page: res.data.data.page,
//       limit: res.data.data.limit,
//       totalPages: res.data.data.totalPages,
//     };
//   } catch (err) {
//     return {
//       success: false,
//       message:
//         err.response?.data?.message || "Failed to fetch products",
//     };
//   }
// };



export const fetchProductsAPI = async ({ page, limit, search }) => {
  try {
    const res = await api.get(
      `/admin/products?page=${page}&limit=${limit}&search=${search || ""}`
    );

    return {
      success: true,
      data: res.data.data.products,
      total: res.data.data.total,
      page: res.data.data.page,
      limit: res.data.data.limit,
      totalPages: res.data.data.totalPages,
    };
  } catch (err) {
    return {
      success: false,
      message:
        err.response?.data?.message || "Failed to fetch products",
    };
  }
};



export const deleteProductAPI = async (productId) => {
  try {
    const res = await api.delete(`/admin/products/${productId}`);
    return res.data; // { success, message }
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to delete product"
    );
  }
};

export const fetchProductBookings = async ({
  page = 1,
  limit = 10,
}) => {
  try {
    const res = await api.get("/admin/products/bookings", {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch product bookings"
    );
  }
};





export const fetchProductBookingDetails = async (patientId) => {
  try {
    const res = await api.get(
      "/admin/products/bookings/details",
      {
        params: {
          productCartId:patientId,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to fetch product booking details"
    );
  }
};
export const updateProductSalesStatus = async (
  productCartId,
  salesStatus
) => {
  try {
    const res = await api.put(
      `/admin/products/bookings/${productCartId}/sales-status`,
      { salesStatus }
    );

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Failed to update sales status"
    );
  }
};
export const updateProduct = async (productId, payload) => {
  try {
    const res = await api.put(
      `/admin/products/${productId}`,
      payload
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to update product"
    );
  }
};



export const updateBillingInfo = async (productCartId, payload) => {
  try {
    const res = await api.put(
      `/admin/products/bookings/${productCartId}/billing-info`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update billing info"
    );
  }
};