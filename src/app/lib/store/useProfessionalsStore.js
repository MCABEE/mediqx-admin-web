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

//       // Setters and add field actions
//       setSpecializationValue: (idx, value) => {
//         set((state) => {
//           const arr = [...state.specializations];
//           arr[idx] = value;
//           return { specializations: arr };
//         });
//       },
//       addSpecializationField: () =>
//         set((state) => ({ specializations: [...state.specializations, ""] })),

//       setQualificationValue: (idx, value) => {
//         set((state) => {
//           const arr = [...state.qualifications];
//           arr[idx] = value;
//           return { qualifications: arr };
//         });
//       },
//       addQualificationField: () =>
//         set((state) => ({ qualifications: [...state.qualifications, ""] })),

//       setWorkingDepartmentValue: (idx, value) => {
//         set((state) => {
//           const arr = [...state.workingDepartments];
//           arr[idx] = value;
//           return { workingDepartments: arr };
//         });
//       },
//       addWorkingDepartmentField: () =>
//         set((state) => ({ workingDepartments: [...state.workingDepartments, ""] })),

//       setSkillValue: (idx, value) => {
//         set((state) => {
//           const arr = [...state.skills];
//           arr[idx] = value;
//           return { skills: arr };
//         });
//       },
//       addSkillField: () =>
//         set((state) => ({ skills: [...state.skills, ""] })),

//       // Save all categories
//       saveAllCategories: async () => {
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
//             .map((s) => ({ specialization: s.trim(), category: "REG_NURSES" }));

//           const filteredQualifications = qualifications
//             .filter((q) => q.trim() !== "")
//             .map((q) => ({ qualification: q.trim(), category: "REG_NURSES" }));

//           const filteredWorkingDepartments = workingDepartments
//             .filter((w) => w.trim() !== "")
//             .map((w) => ({ workingDepartment: w.trim(), category: "REG_NURSES" }));

//           const filteredSkills = skills
//             .filter((sk) => sk.trim() !== "")
//             .map((sk) => ({ skill: sk.trim(), category: "REG_NURSES" }));

//           // Throw if all are empty
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
//           set({ error: error.message || "Failed to save categories.", success: false });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       resetSuccess: () => set({ success: false }),
//     }),
//     {
//       name: "professionals-storage",
//       partialize: (state) => ({
//         // specializations: state.specializations,
//         // qualifications: state.qualifications,
//         // workingDepartments: state.workingDepartments,
//         // skills: state.skills,
//         // isLoading: state.isLoading,
//         // error: state.error,
//         // success: state.success,
//       }),
//     }
//   )
// );

// export default useProfessionalsStore;












import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createManySpecializations,
  createManyQualifications,
  createManyWorkingDepartments,
  createManySkills,
} from "@/api/professionalsApi";

const useProfessionalsStore = create(
  persist(
    (set, get) => ({
      specializations: [""],
      qualifications: [""],
      workingDepartments: [""],
      skills: [""],

      isLoading: false,
      error: null,
      success: false,

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

      // New: reset all inputs to one empty string each
      resetInputs: () =>
        set({
          specializations: [""],
          qualifications: [""],
          workingDepartments: [""],
          skills: [""],
          error: null,
          success: false,
          isLoading: false,
        }),

      saveAllCategories: async (category) => {
        set({ isLoading: true, error: null, success: false });
        try {
          const {
            specializations,
            qualifications,
            workingDepartments,
            skills,
          } = get();

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
            set({ error: "Please enter at least one entry." });
            set({ isLoading: false });
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

          set({
            success: true,
            specializations: [""],
            qualifications: [""],
            workingDepartments: [""],
            skills: [""],
            error: null,
          });
        } catch (error) {
          set({
            error: error.message || "Failed to save data.",
            success: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      resetSuccess: () => set({ success: false }),
    }),
    {
      name: "professionals-storage",
      partialize: (state) => ({
        specializations: state.specializations,
        qualifications: state.qualifications,
        workingDepartments: state.workingDepartments,
        skills: state.skills,
      }),
    }
  )
);

export default useProfessionalsStore;
