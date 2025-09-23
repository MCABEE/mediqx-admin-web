import React,{Suspense} from "react";
import Navlink from "@/components/staffManagement/Navlink";
import Table from "@/components/staffManagement/AllStaff/Table";

const page = () => {
  return (
    <div>
      <Navlink />
      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
    </div>
  );
};

export default page;
