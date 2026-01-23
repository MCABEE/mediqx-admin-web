import {
  fetchMatchingUsersCountAPI,
  fetchNotificationsAPI,
  sendCustomNotificationAPI,
} from "@/api/notificationApi";
import { create } from "zustand";

/* ===== ENUM VALUES (USED DIRECTLY) ===== */
const STAFF_ROLES = [
  "REGISTERED_NURSE",
  "NURSING_ASSISTANTS",
  "TECHNICIANS",
  "THERAPY",
  "ANCILLARY_PERSONAL",
];

const PATIENT_STATUS = ["ONGOING", "COMPLETED"];
const SUPERVISOR_STATUS = ["ACTIVE", "RESIGNED"];

const useNotificationStore = create((set, get) => ({
  /* ===== STATE ===== */
  staffRoles: [],
  patientStatus: [],
  supervisorStatus: [],

  allStaff: false,
  allPatients: false,
  allSupervisors: false,

  headline: "",
  message: "",

  count: 0,
  loading: false,
  sending: false,
  success: false, // ✅ ADDED

  /* ===== STAFF ===== */
  toggleAllStaff: () => {
    const value = !get().allStaff;
    set({
      allStaff: value,
      staffRoles: value ? STAFF_ROLES : [],
    });
    get().fetchCount();
  },

  toggleStaffRole: (role) => {
    const roles = get().staffRoles.includes(role)
      ? get().staffRoles.filter((r) => r !== role)
      : [...get().staffRoles, role];

    set({
      staffRoles: roles,
      allStaff: roles.length === STAFF_ROLES.length,
    });
    get().fetchCount();
  },

  /* ===== PATIENTS ===== */
  toggleAllPatients: () => {
    const value = !get().allPatients;
    set({
      allPatients: value,
      patientStatus: value ? PATIENT_STATUS : [],
    });
    get().fetchCount();
  },

  togglePatientStatus: (status) => {
    const list = get().patientStatus.includes(status)
      ? get().patientStatus.filter((s) => s !== status)
      : [...get().patientStatus, status];

    set({
      patientStatus: list,
      allPatients: list.length === PATIENT_STATUS.length,
    });
    get().fetchCount();
  },

  /* ===== SUPERVISORS ===== */
  toggleAllSupervisors: () => {
    const value = !get().allSupervisors;
    set({
      allSupervisors: value,
      supervisorStatus: value ? SUPERVISOR_STATUS : [],
    });
    get().fetchCount();
  },

  toggleSupervisorStatus: (status) => {
    const list = get().supervisorStatus.includes(status)
      ? get().supervisorStatus.filter((s) => s !== status)
      : [...get().supervisorStatus, status];

    set({
      supervisorStatus: list,
      allSupervisors: list.length === SUPERVISOR_STATUS.length,
    });
    get().fetchCount();
  },

  /* ===== COUNT API ===== */
  fetchCount: async () => {
    set({ loading: true });
    try {
      const res = await fetchMatchingUsersCountAPI({
        staffRoles: get().staffRoles,
        allStaff: get().allStaff,
        allPatients: get().allPatients,
        patientStatus: get().patientStatus,
        allSupervisors: get().allSupervisors,
        supervisorStatus: get().supervisorStatus,
      });

      set({ count: res.data.data.count });
    } catch (err) {
      console.error("Count error", err);
    } finally {
      set({ loading: false });
    }
  },

  /* ===== MESSAGE ===== */
  setHeadline: (v) => set({ headline: v }),
  setMessage: (v) => set({ message: v }),

  /* ===== SEND API ===== */
  sendNotification: async () => {
    set({ sending: true });

    try {
      await sendCustomNotificationAPI({
        staffRoles: get().staffRoles,
        allStaff: get().allStaff,
        allPatients: get().allPatients,
        patientStatus: get().patientStatus,
        allSupervisors: get().allSupervisors,
        supervisorStatus: get().supervisorStatus,
        headline: get().headline,
        message: get().message,
      });

      // ✅ RESET EVERYTHING AFTER SUCCESS
      set({
        success: true,
        headline: "",
        message: "",
        staffRoles: [],
        patientStatus: [],
        supervisorStatus: [],
        allStaff: false,
        allPatients: false,
        allSupervisors: false,
        count: 0,
      });

      // ✅ AUTO HIDE SUCCESS
      setTimeout(() => set({ success: false }), 2000);

      return true;
    } catch (err) {
      console.error("Send error", err);
      return false;
    } finally {
      set({ sending: false });
    }
  },

  // fetch all notifications

  notifications: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  loading: false,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,

  setYear: (y) => set({ year: y }),
  setMonth: (m) => set({ month: m }),
  setPage: (p) => set({ page: p }),

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const { page, limit, year, month } = get();
      const res = await fetchNotificationsAPI({ page, limit, year, month });

      set({
        notifications: res.data.notifications || [],
        total: res.data.total || 0,
        totalPages: res.data.totalPages || 0,
      });
    } catch (err) {
      console.error("Fetch notifications error", err);
    } finally {
      set({ loading: false });
    }
  },

  clearFilters: () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    set({ year: currentYear, month: currentMonth });
    get().fetchNotifications();
  },
}));

export default useNotificationStore;
