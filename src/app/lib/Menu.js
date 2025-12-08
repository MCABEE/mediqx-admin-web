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
    hasSubmenu: true,
    link: "/controlpanel/staffManagement",
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
    hasSubmenu: true,
    link: "/controlpanel/data-manager/billing/payment-structure",
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
    ]
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
    link: "/controlpanel/referral-management/staff-referrals",
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
      //  {
      //   id: "8-4",
      //   name: "Products Data",
      //   link: "",
      // }, {
      //   id: "8-5",
      //   name: "Medical Data",
      //   link: "",
      // },
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
    link: "/controlpanel/user-access-management/manage-co-admin",
  },
];
