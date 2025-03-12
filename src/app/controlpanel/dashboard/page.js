import ActiveStaff from '@/components/dashboard/ActiveStaff'
import NewStaffApplications from '@/components/dashboard/NewStaffApplications'
import PatientBookings from '@/components/dashboard/PatientBookings'
import Payments from '@/components/dashboard/Payments'
import TodayCases from '@/components/dashboard/TodayCases'
import TotalAgents from '@/components/dashboard/TotalAgents'
import React from 'react'

const page = () => {
  return (
    <div className='pb-12'>
        <PatientBookings/>
        <div className='pt-8'>
        <TodayCases/>
        </div>
      <div className='flex mt-8 gap-8'>
        <NewStaffApplications/>
        <ActiveStaff/>
      </div>
      <div className='flex mt-8 gap-8'>

        <Payments/>
        <TotalAgents/>
      </div>
      
    </div>
  )
}

export default page