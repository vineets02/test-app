import React from "react"
import { useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0]

  const referenceNum = seachQuery.get("reference")
  return (
    <div>
      PaymentSuccess
      <div> Reference No.{referenceNum}</div>
    </div>
  )
}

export default PaymentSuccess
