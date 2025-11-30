import Navlink from '@/components/billing/patientBills/Navlink'
import PatientBillsByDateTable from '@/components/billing/patientBills/PatientBillsByDateTable'
import React from 'react'

function pages() {
  return (
    <div>
      <Navlink/>
      <PatientBillsByDateTable/>
    </div>
  )
}

export default pages