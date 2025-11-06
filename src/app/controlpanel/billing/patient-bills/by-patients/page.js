import Navlink from '@/components/billing/patientBills/Navlink'
import PatientBillsByPatientTable from '@/components/billing/patientBills/PatientBillsByPatientTable'
import React from 'react'

function pages() {
  return (
    <div>
      <Navlink/>
     <PatientBillsByPatientTable/>
    </div>
  )
}

export default pages