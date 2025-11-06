

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import {
//   createManySpecializations,
//   createManyQualifications,
//   createManyWorkingDepartments,
//   createManySkills,
// } from "@/api/professionalsApi";

// const useProfessionalsStore = create(
//   persist(
//     (set, get) => ({
//       specializations: [""],
//       qualifications: [""],
//       workingDepartments: [""],
//       skills: [""],

//       isLoading: false,
//       error: null,
//       success: false,

//       setSpecializationValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.specializations];
//           arr[idx] = value;
//           return { specializations: arr };
//         }),
//       addSpecializationField: () =>
//         set((state) => ({ specializations: [...state.specializations, ""] })),

//       setQualificationValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.qualifications];
//           arr[idx] = value;
//           return { qualifications: arr };
//         }),
//       addQualificationField: () =>
//         set((state) => ({ qualifications: [...state.qualifications, ""] })),

//       setWorkingDepartmentValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.workingDepartments];
//           arr[idx] = value;
//           return { workingDepartments: arr };
//         }),
//       addWorkingDepartmentField: () =>
//         set((state) => ({ workingDepartments: [...state.workingDepartments, ""] })),

//       setSkillValue: (idx, value) =>
//         set((state) => {
//           const arr = [...state.skills];
//           arr[idx] = value;
//           return { skills: arr };
//         }),
//       addSkillField: () => set((state) => ({ skills: [...state.skills, ""] })),

//       // New: reset all inputs to one empty string each
//       resetInputs: () =>
//         set({
//           specializations: [""],
//           qualifications: [""],
//           workingDepartments: [""],
//           skills: [""],
//           error: null,
//           success: false,
//           isLoading: false,
//         }),

//       saveAllCategories: async (category) => {
//         set({ isLoading: true, error: null, success: false });
//         try {
//           const {
//             specializations,
//             qualifications,
//             workingDepartments,
//             skills,
//           } = get();

//           const filteredSpecializations = specializations
//             .filter((s) => s.trim() !== "")
//             .map((s) => ({ specialization: s.trim(), category }));

//           const filteredQualifications = qualifications
//             .filter((q) => q.trim() !== "")
//             .map((q) => ({ qualification: q.trim(), category }));

//           const filteredWorkingDepartments = workingDepartments
//             .filter((w) => w.trim() !== "")
//             .map((w) => ({ workingDepartment: w.trim(), category }));

//           const filteredSkills = skills
//             .filter((sk) => sk.trim() !== "")
//             .map((sk) => ({ skill: sk.trim(), category }));

//           if (
//             filteredSpecializations.length === 0 &&
//             filteredQualifications.length === 0 &&
//             filteredWorkingDepartments.length === 0 &&
//             filteredSkills.length === 0
//           ) {
//             set({ error: "Please enter at least one entry." });
//             set({ isLoading: false });
//             return;
//           }

//           const promises = [];
//           if (filteredSpecializations.length > 0)
//             promises.push(createManySpecializations(filteredSpecializations));
//           if (filteredQualifications.length > 0)
//             promises.push(createManyQualifications(filteredQualifications));
//           if (filteredWorkingDepartments.length > 0)
//             promises.push(createManyWorkingDepartments(filteredWorkingDepartments));
//           if (filteredSkills.length > 0)
//             promises.push(createManySkills(filteredSkills));

//           await Promise.all(promises);

//           set({
//             success: true,
//             specializations: [""],
//             qualifications: [""],
//             workingDepartments: [""],
//             skills: [""],
//             error: null,
//           });
//         } catch (error) {
//           set({
//             error: error.message || "Failed to save data.",
//             success: false,
//           });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       resetSuccess: () => set({ success: false }),
//     }),
//     {
//       name: "professionals-storage",
//       partialize: (state) => ({
//         specializations: state.specializations,
//         qualifications: state.qualifications,
//         workingDepartments: state.workingDepartments,
//         skills: state.skills,
//       }),
//     }
//   )
// );

// export default useProfessionalsStore;






// import { create } from "zustand";
// import {
//   createManySpecializations,
//   createManyQualifications,
//   createManyWorkingDepartments,
//   createManySkills,
// } from "@/api/professionalsApi";

// const useProfessionalsStore = create((set, get) => ({
//   specializations: [""],
//   qualifications: [""],
//   workingDepartments: [""],
//   skills: [""],

//   isLoading: false,
//   error: null,
//   success: false,

//   setSpecializationValue: (idx, value) =>
//     set((state) => {
//       const arr = [...state.specializations];
//       arr[idx] = value;
//       return { specializations: arr };
//     }),
//   addSpecializationField: () =>
//     set((state) => ({ specializations: [...state.specializations, ""] })),

//   setQualificationValue: (idx, value) =>
//     set((state) => {
//       const arr = [...state.qualifications];
//       arr[idx] = value;
//       return { qualifications: arr };
//     }),
//   addQualificationField: () =>
//     set((state) => ({ qualifications: [...state.qualifications, ""] })),

//   setWorkingDepartmentValue: (idx, value) =>
//     set((state) => {
//       const arr = [...state.workingDepartments];
//       arr[idx] = value;
//       return { workingDepartments: arr };
//     }),
//   addWorkingDepartmentField: () =>
//     set((state) => ({
//       workingDepartments: [...state.workingDepartments, ""],
//     })),

//   setSkillValue: (idx, value) =>
//     set((state) => {
//       const arr = [...state.skills];
//       arr[idx] = value;
//       return { skills: arr };
//     }),
//   addSkillField: () => set((state) => ({ skills: [...state.skills, ""] })),

//   resetInputs: () =>
//     set({
//       specializations: [""],
//       qualifications: [""],
//       workingDepartments: [""],
//       skills: [""],
//       error: null,
//       success: false,
//       isLoading: false,
//     }),

//   resetSuccess: () => set({ success: false }),
//   resetError: () => set({ error: null }),

//   saveAllCategories: async (category) => {
//     set({ isLoading: true, error: null, success: false });
//     try {
//       const { specializations, qualifications, workingDepartments, skills } = get();

//       // Filter and remove duplicates using Set
//       const filteredSpecializations = Array.from(
//         new Set(
//           specializations
//             .filter((s) => s.trim() !== "")
//             .map((s) => s.trim())
//         )
//       ).map((s) => ({ specialization: s, category }));

//       const filteredQualifications = Array.from(
//         new Set(
//           qualifications
//             .filter((q) => q.trim() !== "")
//             .map((q) => q.trim())
//         )
//       ).map((q) => ({ qualification: q, category }));

//       const filteredWorkingDepartments = Array.from(
//         new Set(
//           workingDepartments
//             .filter((w) => w.trim() !== "")
//             .map((w) => w.trim())
//         )
//       ).map((w) => ({ workingDepartment: w, category }));

//       const filteredSkills = Array.from(
//         new Set(
//           skills.filter((sk) => sk.trim() !== "").map((sk) => sk.trim())
//         )
//       ).map((sk) => ({ skill: sk, category }));

//       if (
//         filteredSpecializations.length === 0 &&
//         filteredQualifications.length === 0 &&
//         filteredWorkingDepartments.length === 0 &&
//         filteredSkills.length === 0
//       ) {
//         set({ error: "Please enter at least one entry.", isLoading: false });
//         return;
//       }

//       const promises = [];
//       if (filteredSpecializations.length > 0)
//         promises.push(createManySpecializations(filteredSpecializations));
//       if (filteredQualifications.length > 0)
//         promises.push(createManyQualifications(filteredQualifications));
//       if (filteredWorkingDepartments.length > 0)
//         promises.push(createManyWorkingDepartments(filteredWorkingDepartments));
//       if (filteredSkills.length > 0)
//         promises.push(createManySkills(filteredSkills));

//       await Promise.all(promises);

//       set({
//         success: true,
//         specializations: [""],
//         qualifications: [""],
//         workingDepartments: [""],
//         skills: [""],
//         error: null,
//       });
//     } catch (error) {
//       set({
//         error: error.message || "Failed to save data.",
//         success: false,
//       });
//     } finally {
//       set({ isLoading: false });
//     }
//   },
// }));

// export default useProfessionalsStore;




import { create } from "zustand";
import {
  createManySpecializations,
  createManyQualifications,
  createManyWorkingDepartments,
  createManySkills,
} from "@/api/professionalsApi";

const useProfessionalsStore = create((set, get) => ({
  specializations: [""],
  qualifications: [""],
  workingDepartments: [""],
  skills: [""],

  isLoading: false,
  error: null,
  success: false,

  // Backend duplicates only
  backendDuplicates: {
    specializations: [],
    qualifications: [],
    workingDepartments: [],
    skills: [],
  },

  setSpecializationValue: (idx, value) =>
    set((state) => {
      const arr = [...state.specializations];
      arr[idx] = value;
      return { specializations: arr };
    }),
  addSpecializationField: () =>
    set((state) => ({ specializations: [...state.specializations, ""] })),

  setQualificationValue: (idx, value) =>
    set((state) => {
      const arr = [...state.qualifications];
      arr[idx] = value;
      return { qualifications: arr };
    }),
  addQualificationField: () =>
    set((state) => ({ qualifications: [...state.qualifications, ""] })),

  setWorkingDepartmentValue: (idx, value) =>
    set((state) => {
      const arr = [...state.workingDepartments];
      arr[idx] = value;
      return { workingDepartments: arr };
    }),
  addWorkingDepartmentField: () =>
    set((state) => ({ workingDepartments: [...state.workingDepartments, ""] })),

  setSkillValue: (idx, value) =>
    set((state) => {
      const arr = [...state.skills];
      arr[idx] = value;
      return { skills: arr };
    }),
  addSkillField: () => set((state) => ({ skills: [...state.skills, ""] })),

  resetInputs: () =>
    set({
      specializations: [""],
      qualifications: [""],
      workingDepartments: [""],
      skills: [""],
      error: null,
      success: false,
      isLoading: false,
      backendDuplicates: {
        specializations: [],
        qualifications: [],
        workingDepartments: [],
        skills: [],
      },
    }),
  resetSuccess: () => set({ success: false }),
  resetError: () => set({ error: null }),

  saveAllCategories: async (category) => {
    set({ isLoading: true, error: null, success: false });

    const duplicates = {
      specializations: [],
      qualifications: [],
      workingDepartments: [],
      skills: [],
    };

    try {
      const { specializations = [], qualifications = [], workingDepartments = [], skills = [] } = get();

      const filteredSpecializations = specializations
        .filter((s) => s.trim() !== "")
        .map((s) => ({ specialization: s.trim(), category }));

      const filteredQualifications = qualifications
        .filter((q) => q.trim() !== "")
        .map((q) => ({ qualification: q.trim(), category }));

      const filteredWorkingDepartments = workingDepartments
        .filter((w) => w.trim() !== "")
        .map((w) => ({ workingDepartment: w.trim(), category }));

      const filteredSkills = skills
        .filter((sk) => sk.trim() !== "")
        .map((sk) => ({ skill: sk.trim(), category }));

      if (
        filteredSpecializations.length === 0 &&
        filteredQualifications.length === 0 &&
        filteredWorkingDepartments.length === 0 &&
        filteredSkills.length === 0
      ) {
        set({ error: "Please enter at least one entry.", isLoading: false });
        return;
      }

      const promises = [];
      if (filteredSpecializations.length > 0)
        promises.push(createManySpecializations(filteredSpecializations));
      if (filteredQualifications.length > 0)
        promises.push(createManyQualifications(filteredQualifications));
      if (filteredWorkingDepartments.length > 0)
        promises.push(createManyWorkingDepartments(filteredWorkingDepartments));
      if (filteredSkills.length > 0)
        promises.push(createManySkills(filteredSkills));

      await Promise.all(promises);

      // Reset state on success
      set({
        success: true,
        specializations: [""],
        qualifications: [""],
        workingDepartments: [""],
        skills: [""],
        error: null,
        backendDuplicates: {
          specializations: [],
          qualifications: [],
          workingDepartments: [],
          skills: [],
        },
      });
    } catch (err) {
      console.log("API Error:", err);

      const responseData = err.response?.data;

      // Only store backend duplicates
      if (responseData?.error?.details?.duplicates) {
        responseData.error.details.duplicates.forEach((dup) => {
          const field = dup.field;
          const value = dup.value.toLowerCase();
          if (field === "specialization") duplicates.specializations.push(value);
          if (field === "qualification") duplicates.qualifications.push(value);
          if (field === "workingDepartment") duplicates.workingDepartments.push(value);
          if (field === "skill") duplicates.skills.push(value);
        });
      }

      set({
        error: responseData?.message || err.message || "Failed to save data.",
        success: false,
        backendDuplicates: duplicates,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useProfessionalsStore;
