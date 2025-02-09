import { useState, useEffect } from "react"
import { institutes as allInstitutes } from "@/lib/collegeData"

export function useInstitutes() {
  const [institutes, setInstitutes] = useState(allInstitutes)

  useEffect(() => {
    // Filter only IITs and NITs
    const filteredInstitutes = allInstitutes.filter(
      (institute) => institute.category === "IIT" || institute.category === "NIT",
    )
    setInstitutes(filteredInstitutes)
  }, [])

  return institutes
}

