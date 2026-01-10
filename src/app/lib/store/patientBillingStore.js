// import { fetchPatientBills } from "@/api/patientBillsApi";
// import { create } from "zustand";

// const usePatientBillsStore = create((set) => ({
//   bills: [],
//   page: 1,
//   totalPages: 1,
//   loading: false,

//   fetchBills: async (page = 1) => {
//     set({ loading: true });
//     try {
//       const res = await fetchPatientBills(page);

//       set({
//         bills: res.data.bills,
//         page: res.data.page,
//         totalPages: res.data.totalPages,
//       });
//     } catch (err) {
//       console.error("Fetch bills error:", err);
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default usePatientBillsStore;





// import { create } from "zustand";
// import {
//   fetchPatientBills,
//   fetchPatientBillServiceDetails,
//   fetchPatientBillServices,
// } from "@/api/patientBillsApi";

// const usePatientBillsStore = create((set, get) => ({
//   bills: [],
//   page: 1,
//   totalPages: 1,
//   loading: false,
//   search: "",

//   setSearch: (search) => set({ search }),

//   fetchBills: async (page = 1) => {
//     const { search } = get();
//     set({ loading: true });

//     try {
//       const res = await fetchPatientBills({
//         page,
//         limit: 10,
//         // year: 2025,        // or dynamic if needed
//         // month: "November", // or dynamic
//         search,
//       });

//       set({
//         bills: res.data.bills,
//         page: res.data.page,
//         total: res.data.total,
//         totalPages: res.data.totalPages,
//       });
//     } catch (err) {
//       console.error("Fetch bills error:", err);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   services: [],
//   page: 1,
//   totalPages: 1,
//   loading: false,
//   status: "ALL",
//   patient: "",

//   setStatus: (status) => set({ status }),

//   fetchServices: async ({ patientId, page = 1 }) => {
//     const { status } = get();
//     set({ loading: true });

//     try {
//       const res = await fetchPatientBillServices({
//         patientId,
//         page,
//         limit: 10,
//         status,
//       });

//       set({
//         services: res.data.services,
//         page: res.data.page,
//         totalPages: res.data.totalPages,
//         patient: res.data.patient,
//       });
//     } catch (err) {
//       console.error("Fetch services error:", err);
//     } finally {
//       set({ loading: false });
//     }
//   },

//   details: null,
//   loading: false,
//   error: null,

//   fetchDetails: async (serviceId) => {
//     if (!serviceId) return;

//     set({ loading: true, error: null });

//     try {
//       const res = await fetchPatientBillServiceDetails(serviceId);
// console.log(res);

//       set({
//         details: res.data,
//       });
//     } catch (err) {
//       console.error("Fetch service details error:", err);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default usePatientBillsStore;





import { create } from "zustand";
import {
  fetchPatientBillProducts,
  fetchPatientBills,
  fetchPatientBillsByService,
  fetchPatientBillServiceDetails,
  fetchPatientBillServices,
  getPatientBillsByService,
} from "@/api/patientBillsApi";

const usePatientBillsStore = create((set, get) => ({
  bills: [],
  page: 1,
  totalPages: 1,
  loading: false,
  search: "",

  setSearch: (search) => set({ search }),

  fetchBills: async (page = 1) => {
    const { search } = get();
    set({ loading: true });

    try {
      const res = await fetchPatientBills({
        page,
        limit: 10,
        // year: 2025,        // or dynamic if needed
        // month: "November", // or dynamic
        search,
      });

      set({
        bills: res.data.bills,
        page: res.data.page,
        total: res.data.total,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Fetch bills error:", err);
    } finally {
      set({ loading: false });
    }
  },

  services: [],
  page: 1,
  totalPages: 1,
  loading: false,
  status: "ALL",
  patient: "",

  setStatus: (status) => set({ status }),

  fetchServices: async ({ patientId, page = 1 }) => {
    const { status } = get();
    set({ loading: true });

    try {
      const res = await fetchPatientBillServices({
        patientId,
        page,
        limit: 10,
        status,
      });

      set({
        services: res.data.services,
        page: res.data.page,
        totalPages: res.data.totalPages,
        patient: res.data.patient,
      });
    } catch (err) {
      console.error("Fetch services error:", err);
    } finally {
      set({ loading: false });
    }
  },

  details: null,
  loading: false,
  error: null,

  fetchDetails: async (serviceId) => {
    if (!serviceId) return;

    set({ loading: true, error: null });

    try {
      const res = await fetchPatientBillServiceDetails(serviceId);
console.log(res);

      set({
        details: res.data,
      });
    } catch (err) {
      console.error("Fetch service details error:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },






   bills: [],
  page: 1,
  totalPages: 1,
  loading: false,

  year: 2025,
  month: "December",
  search: "",
  summary:"",

  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setSearch: (search) => set({ search }),

  fetchBillsByService: async (page = 1) => {
    const { year, month, search } = get();

    set({ loading: true });

    try {
      const res = await fetchPatientBillsByService({
        page,
        limit: 10,
        year,
        month,
        search,
      });
console.log(res);

      set({
        bills: res.data.bills,
        summary:res.data.summary,
        page: res.data.page,
        totalPages: res.data.totalPages,
      });
    } catch (err) {
      console.error("Fetch patient bills by date error:", err);
    } finally {
      set({ loading: false });
    }
  },





  products: [],
  productsLoading: false,

  setStatus: (status) => set({ status }),
  fetchProducts: async (patientId) => {
    if (!patientId) return;

    set({ productsLoading: true });

    try {
      const res = await fetchPatientBillProducts(patientId);

      set({
        products: res.data.products,
      });
    } finally {
      set({ productsLoading: false });
    }
  },




}));

export default usePatientBillsStore;





