"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { institutes, programs, rounds, type Round } from "@/lib/collegeData"
import { dummyStudents } from "@/lib/dummyStudentData"
import { performAllotment, calculateCutoffs, type AllotmentResult } from "@/lib/allotmentLogic"

export default function ParentDashboard() {
  const [selectedRound, setSelectedRound] = useState<Round>(rounds[0])
  const [allotmentResults, setAllotmentResults] = useState<AllotmentResult[]>([])
  const [cutoffs, setCutoffs] = useState<Record<string, Record<string, number>>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategory, setSearchCategory] = useState<"name" | "college" | "state" | "category" | "round">("name")

  useEffect(() => {
    const results: AllotmentResult[] = []
    for (let i = 0; i <= rounds.indexOf(selectedRound); i++) {
      const roundResults = performAllotment(
        i === 0 ? dummyStudents : results.filter((r) => r.round === rounds[i - 1]).map((r) => r.student),
        rounds[i],
      )
      results.push(...roundResults)
    }
    setAllotmentResults(results)
    setCutoffs(calculateCutoffs(results))
  }, [selectedRound])

  const filteredResults = allotmentResults.filter((result) => {
    const searchLower = searchTerm.toLowerCase()
    switch (searchCategory) {
      case "name":
        return result.student.name.toLowerCase().includes(searchLower)
      case "college":
        return institutes
          .find((i) => i.code === result.instituteCode)
          ?.name.toLowerCase()
          .includes(searchLower)
      case "state":
        return result.student.state.toLowerCase().includes(searchLower)
      case "category":
        return result.student.category.toLowerCase().includes(searchLower)
      case "round":
        return result.round.toLowerCase().includes(searchLower)
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <Card className="w-full max-w-6xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Seat Allotment Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-4">
            <Select onValueChange={(value) => setSelectedRound(value as Round)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select round" />
              </SelectTrigger>
              <SelectContent>
                {rounds.map((round) => (
                  <SelectItem key={round} value={round}>
                    {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSearchCategory(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="college">College</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="round">Round</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`Search by ${searchCategory}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <Button onClick={() => setSearchTerm("")}>Clear</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Round</TableHead>
                <TableHead>Candidate Name</TableHead>
                <TableHead>JEE (Main) Rank</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Allotted Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.round}</TableCell>
                  <TableCell>{result.student.name}</TableCell>
                  <TableCell>{result.student.jeeMainsRank}</TableCell>
                  <TableCell>{result.student.category}</TableCell>
                  <TableCell>{result.student.state}</TableCell>
                  <TableCell>{institutes.find((i) => i.code === result.instituteCode)?.name}</TableCell>
                  <TableCell>{programs.find((p) => p.code === result.programCode)?.name}</TableCell>
                  <TableCell>{result.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Cutoff Ranks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institute</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>AI</TableHead>
                <TableHead>OBC-NCL</TableHead>
                <TableHead>SC</TableHead>
                <TableHead>ST</TableHead>
                <TableHead>EWS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(cutoffs).map(([key, categories]) => {
                const [instituteCode, programCode] = key.split("-")
                return (
                  <TableRow key={key}>
                    <TableCell>{institutes.find((i) => i.code === instituteCode)?.name}</TableCell>
                    <TableCell>{programs.find((p) => p.code === programCode)?.name}</TableCell>
                    <TableCell>{categories["AI"] || "-"}</TableCell>
                    <TableCell>{categories["OBC-NCL"] || "-"}</TableCell>
                    <TableCell>{categories["SC"] || "-"}</TableCell>
                    <TableCell>{categories["ST"] || "-"}</TableCell>
                    <TableCell>{categories["EWS"] || "-"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

