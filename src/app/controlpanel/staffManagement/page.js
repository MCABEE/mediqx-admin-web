import Navlink from "@/components/staffManagement/Navlink";
import React, { Suspense } from "react";
import Table from "@/components/staffManagement/newApplications/Table";

function page() {
  return (
    <div>
      <Navlink />

      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
      {/* <Table /> */}
    </div>
  );
}

export default page;
