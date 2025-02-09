"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ExternalLink, Download, Target, Home, Users, Repeat } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const institutes = [
  { id: "iitb", name: "IIT Bombay" },
  { id: "iitd", name: "IIT Delhi" },
  { id: "iitm", name: "IIT Madras" },
  { id: "iitk", name: "IIT Kanpur" },
  { id: "iitkgp", name: "IIT Kharagpur" },
  { id: "iitr", name: "IIT Roorkee" },
  { id: "iitg", name: "IIT Guwahati" },
  { id: "iith", name: "IIT Hyderabad" },
  { id: "iiti", name: "IIT Indore" },
  { id: "iitbhu", name: "IIT (BHU) Varanasi" },
  { id: "iitbbs", name: "IIT Bhubaneswar" },
  { id: "iitgn", name: "IIT Gandhinagar" },
  { id: "iitj", name: "IIT Jodhpur" },
  { id: "iitp", name: "IIT Patna" },
  { id: "iitrpr", name: "IIT Ropar" },
  { id: "iitmandi", name: "IIT Mandi" },
  { id: "iitbh", name: "IIT Bhilai" },
  { id: "iitgoa", name: "IIT Goa" },
  { id: "iitjmu", name: "IIT Jammu" },
  { id: "iitdh", name: "IIT Dharwad" },
  { id: "iitpkd", name: "IIT Palakkad" },
  { id: "iittirup", name: "IIT Tirupati" },
  { id: "nitc", name: "NIT Calicut" },
  { id: "nitt", name: "NIT Tiruchirappalli" },
  { id: "nitw", name: "NIT Warangal" },
  { id: "nits", name: "NIT Surathkal" },
  { id: "nitr", name: "NIT Rourkela" },
  // Add more NITs as needed
]

const branches = [
  { id: "cse", name: "Computer Science and Engineering" },
  { id: "ece", name: "Electronics and Communication Engineering" },
  { id: "me", name: "Mechanical Engineering" },
  { id: "ee", name: "Electrical Engineering" },
  { id: "ce", name: "Civil Engineering" },
  { id: "che", name: "Chemical Engineering" },
  { id: "ae", name: "Aerospace Engineering" },
  { id: "be", name: "Bioengineering" },
  { id: "mse", name: "Materials Science and Engineering" },
  { id: "ie", name: "Industrial Engineering" },
  { id: "env", name: "Environmental Engineering" },
  { id: "ne", name: "Nuclear Engineering" },
]

const categories = [
  "OPEN",
  "OBC-NCL",
  "SC",
  "ST",
  "EWS",
  "OPEN (PwD)",
  "OBC-NCL (PwD)",
  "SC (PwD)",
  "ST (PwD)",
  "EWS (PwD)",
]

export function SeatMatrix() {
  const [selectedInstitute, setSelectedInstitute] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [year, setYear] = useState("2023")

  // Generate dummy data for seat matrix
  const generateSeatMatrixData = () => {
    const totalSeats = Math.floor(Math.random() * 30) + 30 // Random number between 30 and 60
    let remainingSeats = totalSeats

    return categories.map((category, index) => {
      let seats
      if (index === categories.length - 1) {
        seats = remainingSeats
      } else {
        seats = Math.max(1, Math.floor(Math.random() * Math.min(remainingSeats, 15))) // Ensure at least 1 seat
        remainingSeats -= seats
      }
      return { category, seats }
    })
  }

  const seatMatrixData = generateSeatMatrixData()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">JoSAA Seat Matrix & Allocation Rules</h1>
      <p className="text-lg mb-6">
        Understand seat allocation rules, quotas, and category-wise distribution in IITs, NITs, IIITs, and GFTIs.
      </p>

      <Card className="mb-8 w-full">
        <CardHeader>
          <CardTitle>JOSAA Seat Matrix and Allocation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Seat Matrix</h3>
          <p className="mb-4">
            The JOSAA seat matrix is a comprehensive document that provides details about the available seats in various
            programs across all participating institutes. It includes information such as:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Institute-wise seat distribution</li>
            <li>Program-wise seat allocation</li>
            <li>Category-wise seat reservation</li>
            <li>Gender-wise seat distribution (including supernumerary seats for female candidates)</li>
            <li>Seats reserved for PwD (Persons with Disabilities) candidates</li>
          </ul>
          <p className="mb-4">
            The seat matrix is usually released before the start of the counselling process and may be updated before
            each round of seat allocation.
          </p>

          <h3 className="text-lg font-semibold mb-4">Allocation Rules</h3>
          <p className="mb-4">JOSAA follows a specific set of rules for seat allocation:</p>
          <ol className="list-decimal pl-5 mb-4">
            <li>
              <strong>Merit-based Allocation:</strong> Seats are allocated based on the candidate's All India Rank (AIR)
              in JEE Main or JEE Advanced, as applicable.
            </li>
            <li>
              <strong>Choice Priority:</strong> The system considers the choices filled by the candidate in order of
              preference.
            </li>
            <li>
              <strong>Category Consideration:</strong> Candidates are first considered for General category seats, then
              for their respective reserved category if applicable.
            </li>
            <li>
              <strong>Multiple Rounds:</strong> The allocation process happens in multiple rounds to ensure maximum seat
              occupancy.
            </li>
            <li>
              <strong>Seat Acceptance and Reporting:</strong> Candidates must accept the allocated seat and report to
              the allotted institute within the specified timeframe.
            </li>
            <li>
              <strong>Upgradation:</strong> Candidates can opt for upgradation in subsequent rounds if they accept the
              currently allotted seat.
            </li>
          </ol>

          <p className="mb-4">
            For the most up-to-date and detailed information, always refer to the official JOSAA website and brochure.
          </p>

          <Button asChild>
            <a href="https://josaa.nic.in" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Visit Official JOSAA Website <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-8 w-full">
        <CardHeader>
          <CardTitle>How Seat Allocation Works in JoSAA</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start">
              <Target className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Category-Based Allocation:</strong> General, OBC-NCL, SC, ST, EWS, and PwD reservations as per
                government norms.
              </div>
            </li>
            <li className="flex items-start">
              <Home className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Home State (HS) vs Other State (OS) Quota:</strong> Applies only to NITs, IIITs, and GFTIs. 50%
                seats are reserved for HS candidates, 50% for OS. IITs do not have state quotas.
              </div>
            </li>
            <li className="flex items-start">
              <Users className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Female-Only Seats:</strong> Some institutes have reserved seats for female candidates to improve
                gender ratio.
              </div>
            </li>
            <li className="flex items-start">
              <Users className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Gender-Neutral Seats:</strong> Available to all candidates irrespective of gender.
              </div>
            </li>
            <li className="flex items-start">
              <Repeat className="mr-2 h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <strong>Category Upgradation:</strong> If a reserved seat remains vacant, it is offered to a
                lower-reserved category (SC → ST, OBC → General, etc.).
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8 w-full">
        <CardHeader>
          <CardTitle>Frequently Asked Questions (FAQs)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Home State (HS) vs Other State (OS) quota in NITs?</AccordionTrigger>
              <AccordionContent>
                NITs offer 50% of their seats to students from the state where the institute is located (HS quota). The
                remaining 50% go to students from other states (OS quota).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the female-only quota work?</AccordionTrigger>
              <AccordionContent>
                To improve gender diversity, some IITs/NITs reserve seats exclusively for female candidates. These seats
                are separate from gender-neutral seats.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if seats remain vacant in a category?</AccordionTrigger>
              <AccordionContent>
                If reserved seats remain unfilled, they may be allotted to the next eligible category (e.g., SC → ST,
                OBC → General). IITs follow different rules compared to NITs and IIITs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Important Links & Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                <Download className="mr-2 h-4 w-4" /> Latest JoSAA Seat Matrix PDF
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" /> Previous Year Opening & Closing Ranks
              </a>
            </li>
            <li>
              <a
                href="https://josaa.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Official JoSAA Website
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="w-full mt-8">
        <CardHeader>
          <CardTitle>Seat Matrix</CardTitle>
          <CardDescription>View and analyze the seat distribution across various categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
              <SelectTrigger>
                <SelectValue placeholder="Select Institute" />
              </SelectTrigger>
              <SelectContent>
                {institutes.map((institute) => (
                  <SelectItem key={institute.id} value={institute.id}>
                    {institute.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="2000"
              max="2099"
            />
            <Button className="w-full">View Seat Matrix</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Number of Seats</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seatMatrixData.map((row) => (
                <TableRow key={row.category}>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.seats}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Seat Conversion Rules Guide</CardTitle>
              <CardDescription>Understanding how seats are converted across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">General</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>Reserved Categories (SC/ST/OBC)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Female-Only</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>Gender-Neutral</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Home State (HS)</span>
                  <ArrowRight className="h-4 w-4" />
                  <span>Other State (OS) in NITs</span>
                </div>
              </div>

              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>If Unfilled, Converted To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>SC/ST</TableCell>
                    <TableCell>General Category</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Female-Only</TableCell>
                    <TableCell>Gender-Neutral</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HS Quota (NITs)</TableCell>
                    <TableCell>OS Quota</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

