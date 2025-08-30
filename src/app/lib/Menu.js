export const menus = [
  {
    id: 0,
    name: "Home",
    hasSubmenu: false,
    link: "/controlpanel/dashboard",
  },
  {
    id: 1,
    name: "Staff Management (HR)",
    hasSubmenu: false,
    link: "/controlpanel/staffManagement",
  },

  {
    id: 2,
    name: "Service Bookings",
    hasSubmenu: false,
    link: "/controlpanel/caseBooking/newBooking",
    // link: "videoUpdates",
  },
  {
    id: 3,
    name: "Cases",
    hasSubmenu: false,
    link: "/controlpanel/cases",
  },
  {
    id: 4,
    name: "Patient Management",
    hasSubmenu: false,
    link: "/controlpanel/patient-management",
  },
  {
    id: 5,
    name: "Billing",
    hasSubmenu: false,
    //link: "profileReports",
  },
  {
    id: 6,
    name: "Agent Management",
    hasSubmenu: false,
    link: "/controlpanel/agentManagement/newAgentRequest",
  },
  {
    id: 7,
    name: "Referrals Management",
    hasSubmenu: false,
    link: "/controlpanel/referral-management/all-referrals",
  },
  {
    id: 8,
    name: "Data Manager",
    hasSubmenu: true,
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
       {
        id: "8-4",
        name: "Products Data",
        link: "",
      }, {
        id: "8-5",
        name: "Medical Data",
        link: "",
      },
    ],
  },
  {
    id: 9,
    name: "Notifications",
    hasSubmenu: false,
    //link: "profileReports",
  },
  {
    id: 10,
    name: "Product Management",
    hasSubmenu: false,
    //link: "profileReports",
  },
  {
    id: 11,
    name: "Ledger Management",
    hasSubmenu: false,
    //link: "profileReports",
  },
  {
    id: 12,
    name: "Rating & Review",
    hasSubmenu: false,
    //link: "profileReports",
  },
  {
    id: 13,
    name: "User Access Management",
    hasSubmenu: false,
    //link: "profileReports",
  },
];
