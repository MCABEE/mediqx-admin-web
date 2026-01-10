// export const menus = [
//   {
//     id: 0,
//     name: "Home",
//     hasSubmenu: false,
//     link: "/controlpanel/dashboard",
//   },
//   {
//     id: 1,
//     name: "Staff Management (HR)",
//     hasSubmenu: true,
//     link: "/controlpanel/staffManagement",
//     submenu: [
//       {
//         id: "1-1",
//         name: "Supervisors",
//         link: "/controlpanel/staffManagement/supervisor/supervisor-active",
//       },
//        {
//         id: "1-2",
//         name: "Healthcare Staff",
//         link: "/controlpanel/staffManagement",
//       },
     
//     ],
//   },

//   {
//     id: 2,
//     name: "Service Bookings",
//     hasSubmenu: false,
//     link: "/controlpanel/caseBooking/newBooking",
//     // link: "videoUpdates",
//   },
//   {
//     id: 3,
//     name: "Cases",
//     hasSubmenu: false,
//     link: "/controlpanel/cases",
//   },
//   {
//     id: 4,
//     name: "Patient Management",
//     hasSubmenu: false,
//     link: "/controlpanel/patient-management",
//   },
//   {
//     id: 5,
//     name: "Billing",
//     hasSubmenu: true,
//     link: "/controlpanel/data-manager/billing/payment-structure",
//      submenu: [
//       {
//         id: "5-1",
//         name: "Payment Structure",
//         link: "/controlpanel/billing/payment-structure",
//       },
//       {
//         id: "5-2",
//         name: "Patient Bills",
//         link: "/controlpanel/billing/patient-bills/by-dates",
//       },
//       {
//         id: "5-3",
//         name: "Staff Payments",
//         link: "/controlpanel/billing/staff-payments",
//       },
//     ]
//   },
//   {
//     id: 6,
//     name: "Agent Management",
//     hasSubmenu: false,
//     link: "/controlpanel/agentManagement/newAgentRequest",
//   },
//   {
//     id: 7,
//     name: "Referrals Management",
//     hasSubmenu: false,
//     link: "/controlpanel/referral-management/staff-referrals",
//   },
//   {
//     id: 8,
//     name: "Data Manager",
//     hasSubmenu: true,
//     submenu: [
//       {
//         id: "8-1",
//         name: "General Data",
//         link: "/controlpanel/data-manager/general-data/languages/add-languages",
//       },
//       {
//         id: "8-2",
//         name: "Patient Data",
//         link: "/controlpanel/data-manager/patient-data/services/add-services",
//       },
//       {
//         id: "8-3",
//         name: "Professionals Data",
//         link: "/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses",
//       },
//       //  {
//       //   id: "8-4",
//       //   name: "Products Data",
//       //   link: "",
//       // }, {
//       //   id: "8-5",
//       //   name: "Medical Data",
//       //   link: "",
//       // },
//     ],
//   },
//   {
//     id: 9,
//     name: "Notifications",
//     hasSubmenu: false,
//     link: "/controlpanel/notifications/custom-notifications",
//   },
//   {
//     id: 10,
//     name: "Product Management",
//     hasSubmenu: false,
//     link:"/controlpanel/product-management/manage-products",
  
//   },
//   {
//     id: 11,
//     name: "Ledger Management",
//     hasSubmenu: false,
//     //link: "profileReports",
//   },
//   {
//     id: 12,
//     name: "Rating & Review",
//     hasSubmenu: false,
//     link: "/controlpanel/rating-and-review",
//   },
//   {
//     id: 13,
//     name: "User Access Management",
//     hasSubmenu: false,
//     link: "/controlpanel/user-access-management/manage-co-admin",
//   },
// ];






















export const menus = [
  {
    id: 0,
    name: "Home",
    link: "/controlpanel/dashboard",
    hasSubmenu: false,
    permission: null, // ✅ visible to all
  },
  {
    id: 1,
    name: "Staff Management (HR)",
    hasSubmenu: true,
    permission: "STAFF_MANAGEMENT",
    submenu: [
      {
        id: "1-1",
        name: "Supervisors",
        link: "/controlpanel/staffManagement/supervisor/supervisor-active",
      },
      {
        id: "1-2",
        name: "Healthcare Staff",
        link: "/controlpanel/staffManagement",
      },
    ],
  },
  {
    id: 2,
    name: "Service Bookings",
    link: "/controlpanel/caseBooking/newBooking",
    hasSubmenu: false,
    permission: "SERVICE_BOOKINGS",
  },
  {
    id: 3,
    name: "Cases",
    link: "/controlpanel/cases",
    hasSubmenu: false,
    permission: "CASES",
  },
  {
    id: 4,
    name: "Patient Management",
    link: "/controlpanel/patient-management",
    hasSubmenu: false,
    permission: "PATIENT_MANAGEMENT",
  },
  {
    id: 5,
    name: "Billing",
    hasSubmenu: true,
    permission: "BILLING",
    submenu: [
      {
        id: "5-1",
        name: "Payment Structure",
        link: "/controlpanel/billing/payment-structure",
      },
      {
        id: "5-2",
        name: "Patient Bills",
        link: "/controlpanel/billing/patient-bills/by-dates",
      },
      {
        id: "5-3",
        name: "Staff Payments",
        link: "/controlpanel/billing/staff-payments",
      },
    ],
  },
  {
    id: 6,
    name: "Agent Management",
    link: "/controlpanel/agentManagement/newAgentRequest",
    hasSubmenu: false,
    permission: "AGENT_MANAGEMENT",
  },
  {
    id: 7,
    name: "Referrals Management",
    link: "/controlpanel/referral-management/staff-referrals",
    hasSubmenu: false,
    permission: "REFERRAL_MANAGEMENT",
  },
  {
    id: 8,
    name: "Data Manager",
    hasSubmenu: true,
    permission: "DATA_MANAGER",
    submenu: [
      {
        id: "8-1",
        name: "General Data",
        link: "/controlpanel/data-manager/general-data/languages/add-languages",
      },
      {
        id: "8-2",
        name: "Patient Data",
        link: "/controlpanel/data-manager/patient-data/services/add-services",
      },
      {
        id: "8-3",
        name: "Professionals Data",
        link: "/controlpanel/data-manager/professionals-data/reg-nurses/add-reg-nurses",
      },
    ],
  },
  {
    id: 9,
    name: "Notifications",
    link: "/controlpanel/notifications/custom-notifications",
    hasSubmenu: false,
    permission: "NOTIFICATIONS",
  },
  {
    id: 10,
    name: "Product Management",
    link: "/controlpanel/product-management/manage-products",
    hasSubmenu: false,
    permission: "PRODUCT_MANAGEMENT",
  },
  {
    id: 11,
    name: "Ledger Management",
    link: "/controlpanel/ledger-management/bookings",
    hasSubmenu: false,
    permission: "LEDGER_MANAGEMENT",
  },
  {
    id: 12,
    name: "Rating & Review",
    link: "/controlpanel/rating-and-review",
    hasSubmenu: false,
    permission: "RATING_REVIEW",
  },
  {
    id: 13,
    name: "User Access Management",
    link: "/controlpanel/user-access-management/manage-co-admin",
    hasSubmenu: false,
    permission: "USER_ACCESS_MANAGEMENT",
  },
  {
    id: 14,
    name: "Ambulances",
    link: "/controlpanel/ambulances/new-listing",
    hasSubmenu: false,
    permission: "RATING_REVIEW",
  },
];
