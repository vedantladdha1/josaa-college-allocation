"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { institutes, programs, type Institute, type Program } from "@/lib/collegeData"

export default function CollegePreferences() {
  const router = useRouter()
  const [preferences, setPreferences] = useState<Array<{ institute: Institute | null; program: Program | null }>>([
    { institute: null, program: null },
  ])

  const addPreference = () => {
    setPreferences([...preferences, { institute: null, program: null }])
  }

  const handlePreferenceChange = (index: number, field: "institute" | "program", value: string) => {
    const newPreferences = [...preferences]
    if (field === "institute") {
      newPreferences[index].institute = institutes.find((c) => c.code === value) || null
    } else {
      newPreferences[index].program = programs.find((b) => b.code === value) || null
    }
    setPreferences(newPreferences)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    // For now, we'll just move to a result page
    router.push("/allotment-result")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Institute and Program Preferences</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {preferences.map((pref, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor={`institute-${index}`}>Institute</Label>
                  <select
                    id={`institute-${index}`}
                    value={pref.institute?.code || ""}
                    onChange={(e) => handlePreferenceChange(index, "institute", e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Institute</option>
                    {institutes.map((institute) => (
                      <option key={institute.code} value={institute.code}>
                        {institute.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor={`program-${index}`}>Program</Label>
                  <select
                    id={`program-${index}`}
                    value={pref.program?.code || ""}
                    onChange={(e) => handlePreferenceChange(index, "program", e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program.code} value={program.code}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <Button type="button" onClick={addPreference} variant="outline">
              Add Another Preference
            </Button>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Preferences
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

