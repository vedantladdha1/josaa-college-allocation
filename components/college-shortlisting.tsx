"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Institute {
  name: string
  city: string
  state: string
  rank: number
  type: "IIT" | "NIT" | "Other"
}

const institutes: Institute[] = [
  { name: "Indian Institute of Technology Madras", city: "Chennai", state: "Tamil Nadu", rank: 1, type: "IIT" },
  { name: "Indian Institute of Technology Delhi", city: "New Delhi", state: "Delhi", rank: 2, type: "IIT" },
  { name: "Indian Institute of Technology Bombay", city: "Mumbai", state: "Maharashtra", rank: 3, type: "IIT" },
  { name: "Indian Institute of Technology Kanpur", city: "Kanpur", state: "Uttar Pradesh", rank: 4, type: "IIT" },
  { name: "Indian Institute of Technology Roorkee", city: "Roorkee", state: "Uttarakhand", rank: 5, type: "IIT" },
  { name: "Indian Institute of Technology Kharagpur", city: "Kharagpur", state: "West Bengal", rank: 6, type: "IIT" },
  { name: "Indian Institute of Technology Guwahati", city: "Guwahati", state: "Assam", rank: 7, type: "IIT" },
  { name: "Indian Institute of Technology Hyderabad", city: "Hyderabad", state: "Telangana", rank: 8, type: "IIT" },
  {
    name: "National Institute of Technology Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    rank: 9,
    type: "NIT",
  },
  { name: "Indian Institute of Technology Indore", city: "Indore", state: "Madhya Pradesh", rank: 14, type: "IIT" },
  {
    name: "Indian Institute of Technology (Banaras Hindu University) Varanasi",
    city: "Varanasi",
    state: "Uttar Pradesh",
    rank: 15,
    type: "IIT",
  },
  { name: "National Institute of Technology Rourkela", city: "Rourkela", state: "Odisha", rank: 16, type: "NIT" },
  {
    name: "Indian Institute of Technology (Indian School of Mines)",
    city: "Dhanbad",
    state: "Jharkhand",
    rank: 17,
    type: "IIT",
  },
  { name: "Indian Institute of Technology Gandhinagar", city: "Gandhinagar", state: "Gujarat", rank: 18, type: "IIT" },
  { name: "Indian Institute of Technology Ropar", city: "Rupnagar", state: "Punjab", rank: 22, type: "IIT" },
  { name: "National Institute of Technology Calicut", city: "Kozhikode", state: "Kerala", rank: 23, type: "NIT" },
  { name: "Indian Institute of Technology Jodhpur", city: "Jodhpur", state: "Rajasthan", rank: 30, type: "IIT" },
  { name: "Indian Institute of Technology Mandi", city: "Mandi", state: "Himachal Pradesh", rank: 33, type: "IIT" },
  {
    name: "Indian Institute of Engineering Science and Technology, Shibpur",
    city: "Howrah",
    state: "West Bengal",
    rank: 35,
    type: "IIT",
  },
  { name: "National Institute of Technology Warangal", city: "Warangal", state: "Telangana", rank: 37, type: "NIT" },
  { name: "National Institute of Technology Silchar", city: "Silchar", state: "Assam", rank: 40, type: "NIT" },
  { name: "Indian Institute of Technology Patna", city: "Patna", state: "Bihar", rank: 41, type: "IIT" },
  {
    name: "Visvesvaraya National Institute of Technology, Nagpur",
    city: "Nagpur",
    state: "Maharashtra",
    rank: 41,
    type: "NIT",
  },
  { name: "National Institute of Technology Durgapur", city: "Durgapur", state: "West Bengal", rank: 43, type: "NIT" },
  { name: "Indian Institute of Technology Bhubaneswar", city: "Bhubaneswar", state: "Odisha", rank: 47, type: "IIT" },
  { name: "National Institute of Technology Delhi", city: "Delhi", state: "Delhi", rank: 51, type: "NIT" },
  { name: "Indian Institute of Technology, Tirupati", city: "Yerpedu", state: "Andhra Pradesh", rank: 59, type: "IIT" },
  { name: "Indian Institute of Technology Jammu", city: "Jammu", state: "Jammu and Kashmir", rank: 67, type: "IIT" },
  { name: "Indian Institute of Technology Palakkad", city: "Palakkad", state: "Kerala", rank: 69, type: "IIT" },
  { name: "National Institute of Technology, Raipur", city: "Raipur", state: "Chhattisgarh", rank: 70, type: "NIT" },
  { name: "National Institute of Technology Meghalaya", city: "Shillong", state: "Meghalaya", rank: 72, type: "NIT" },
  { name: "Indian Institute of Technology Bhilai", city: "Raipur", state: "Chhattisgarh", rank: 81, type: "IIT" },
  {
    name: "National Institute of Technology Srinagar",
    city: "Srinagar",
    state: "Jammu and Kashmir",
    rank: 82,
    type: "NIT",
  },
  { name: "National Institute of Technology Goa", city: "Ponda", state: "Goa", rank: 90, type: "NIT" },
  { name: "National Institute of Technology Agartala", city: "Agartala", state: "Tripura", rank: 91, type: "NIT" },
  { name: "Indian Institute Of Technology Dharwad", city: "Dharwad", state: "Karnataka", rank: 93, type: "IIT" },
  { name: "National Institute of Technology Manipur", city: "Imphal", state: "Manipur", rank: 95, type: "NIT" },
  {
    name: "National Institute of Technology Karnataka, Surathkal",
    city: "Surathkal",
    state: "Karnataka",
    rank: 12,
    type: "NIT",
  },
]

export function CollegeShortlisting() {
  const [keyword, setKeyword] = useState("")
  const [instituteType, setInstituteType] = useState("all")
  const [filteredInstitutes, setFilteredInstitutes] = useState(institutes)

  useEffect(() => {
    const filtered = institutes.filter((institute) => {
      const matchesKeyword =
        keyword === "" ||
        institute.name.toLowerCase().includes(keyword.toLowerCase()) ||
        institute.city.toLowerCase().includes(keyword.toLowerCase()) ||
        institute.state.toLowerCase().includes(keyword.toLowerCase())

      const matchesType = instituteType === "all" || institute.type === instituteType

      return matchesKeyword && matchesType
    })

    setFilteredInstitutes(filtered)
  }, [keyword, instituteType])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>College Filtering Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-4">
          <Input
            placeholder="Search by keyword (name, city, state)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <Select value={instituteType} onValueChange={setInstituteType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Institute Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Institutes</SelectItem>
              <SelectItem value="IIT">IITs</SelectItem>
              <SelectItem value="NIT">NITs</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>NIRF Ranking</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstitutes.map((institute) => (
                <TableRow key={institute.name}>
                  <TableCell>{institute.name}</TableCell>
                  <TableCell>{institute.city}</TableCell>
                  <TableCell>{institute.state}</TableCell>
                  <TableCell>{institute.rank}</TableCell>
                  <TableCell>{institute.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

