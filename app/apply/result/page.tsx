"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { allocateCollege } from "@/lib/allotment"
import type { College, Branch } from "@/lib/collegeData"

// This would typically come from your backend or state management
const dummyStudentData = {
  name: "John Doe",
  jeeScore: 245,
  category: "General",
  state: "Maharashtra",
  gender: "Male",
  preferences: [
    {
      college: { id: 1, name: "IIT Bombay", type: "IIT" },
      branch: { id: 1, name: "Computer Science and Engineering" },
    },
    { college: { id: 2, name: "IIT Delhi", type: "IIT" }, branch: { id: 1, name: "Computer Science and Engineering" } },
    { college: { id: 1, name: "IIT Bombay", type: "IIT" }, branch: { id: 2, name: "Electrical Engineering" } },
  ],
}

export default function Result() {
  const [allotment, setAllotment] = useState<{ college: College; branch: Branch } | null>(null)

  useEffect(() => {
    const result = allocateCollege(dummyStudentData)
    setAllotment(result)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Allotment Result</CardTitle>
        </CardHeader>
        <CardContent>
          {allotment ? (
            <>
              <p className="text-lg mb-4">
                Congratulations! Based on your JEE score and preferences, you have been allotted:
              </p>
              <p className="text-xl font-semibold mb-2">College: {allotment.college.name}</p>
              <p className="text-xl font-semibold">Branch: {allotment.branch.name}</p>
            </>
          ) : (
            <p className="text-lg text-red-600">
              Unfortunately, based on your JEE score and preferences, no allocation could be made at this time.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

