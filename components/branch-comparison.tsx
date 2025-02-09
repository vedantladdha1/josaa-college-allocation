import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { institutes, programs } from "@/lib/collegeData"

const getBranchDetails = (instituteCode: string, branchCode: string) => {
  const institute = institutes.find((i) => i.code === instituteCode)
  const isIIT = institute?.category === "IIT"
  const isTopIIT = isIIT && Number.parseInt(instituteCode) <= 110 // Assuming top 10 IITs have codes 101-110
  const isTopNIT = !isIIT && Number.parseInt(instituteCode) <= 210 // Assuming top 10 NITs have codes 201-210

  return {
    infrastructure: isIIT ? (isTopIIT ? "Excellent" : "Very Good") : isTopNIT ? "Very Good" : "Good",
    faculty: isIIT ? (isTopIIT ? "World-class" : "Excellent") : isTopNIT ? "Excellent" : "Very Good",
    placements: isIIT ? (isTopIIT ? "Outstanding" : "Excellent") : isTopNIT ? "Excellent" : "Very Good",
    research: isIIT ? (isTopIIT ? "Cutting-edge" : "Advanced") : isTopNIT ? "Advanced" : "Good",
    alumni: isIIT
      ? isTopIIT
        ? "Global leaders"
        : "Industry leaders"
      : isTopNIT
        ? "Industry leaders"
        : "Successful professionals",
  }
}

export function BranchComparison() {
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>(["default", "default"])
  const [selectedBranches, setSelectedBranches] = useState<string[]>(["default", "default"])

  const handleInstituteChange = (index: number, value: string) => {
    const newSelectedInstitutes = [...selectedInstitutes]
    newSelectedInstitutes[index] = value
    setSelectedInstitutes(newSelectedInstitutes)
  }

  const handleBranchChange = (index: number, value: string) => {
    const newSelectedBranches = [...selectedBranches]
    newSelectedBranches[index] = value
    setSelectedBranches(newSelectedBranches)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Branch Comparison Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-6">
          {[0, 1].map((index) => (
            <div key={index} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <Select
                onValueChange={(value) => handleInstituteChange(index, value)}
                value={selectedInstitutes[index] || "default"}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder={`Select Institute ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Select Institute</SelectItem>
                  {institutes.map((institute) => (
                    <SelectItem key={institute.code} value={institute.code}>
                      {institute.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => handleBranchChange(index, value)}
                value={selectedBranches[index] || "default"}
              >
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder={`Select Branch ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Select Branch</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.code} value={program.code}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {selectedInstitutes.every((institute) => institute !== "default") &&
          selectedBranches.every((branch) => branch !== "default") && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Criteria</TableHead>
                  {selectedInstitutes.map((instituteCode, index) => (
                    <TableHead key={instituteCode} className="w-1/3">
                      {institutes.find((i) => i.code === instituteCode)?.name} <br />
                      {programs.find((p) => p.code === selectedBranches[index])?.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {["Infrastructure", "Faculty", "Placements", "Research", "Alumni"].map((criteria) => (
                  <TableRow key={criteria}>
                    <TableCell className="font-medium">{criteria}</TableCell>
                    {selectedInstitutes.map((instituteCode, index) => {
                      const details = getBranchDetails(instituteCode, selectedBranches[index])
                      return (
                        <TableCell key={instituteCode} className="text-center">
                          <span className={`px-2 py-1 rounded ${getColorClass(details[criteria.toLowerCase()])}`}>
                            {details[criteria.toLowerCase()]}
                          </span>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
      </CardContent>
    </Card>
  )
}

function getColorClass(value: string): string {
  switch (value.toLowerCase()) {
    case "excellent":
    case "world-class":
    case "outstanding":
    case "cutting-edge":
    case "global leaders":
      return "bg-green-100 text-green-800"
    case "very good":
    case "advanced":
    case "industry leaders":
      return "bg-blue-100 text-blue-800"
    case "good":
    case "successful professionals":
      return "bg-yellow-100 text-yellow-800"
    default:
      return ""
  }
}

