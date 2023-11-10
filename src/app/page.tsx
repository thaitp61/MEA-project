"use client"
import React from 'react'
import BaseLayout from './components/BaseLayout'
import SupplyForm from './components/sample/supply.from'
import RepairReportItemForm from './components/sample/repair.report.item.form'
import RepairReportForm from './components/sample/repair.report.form'

export default function Home() {
  return (
    <BaseLayout>
      <RepairReportForm />
    </BaseLayout>
  )
}
