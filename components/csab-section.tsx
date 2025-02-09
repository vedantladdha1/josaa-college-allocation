"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MultiSelect } from "@/components/ui/multi-select"

export function CsabSection() {
  const [rank, setRank] = useState("")
  const [category, setCategory] = useState("")
  const [quota, setQuota] = useState("")
  const [choices, setChoices] = useState<string[]>([])
  const [riskLevel, setRiskLevel] = useState<"safe" | "moderate" | "high" | "critical" | null>(null)

  const nits = [
    "NIT Trichy",
    "NIT Rourkela",
    "NIT Surathkal",
    "NIT Warangal",
    "MNIT Jaipur",
    "MNNIT Allahabad",
    "NIT Calicut",
    "VNIT Nagpur",
    "NIT Durgapur",
    "SVNIT Surat",
    "NIT Kurukshetra",
    "NIT Silchar",
    "NIT Hamirpur",
    "NIT Jalandhar",
    "NIT Jamshedpur",
    "NIT Patna",
    "NIT Raipur",
    "NIT Agartala",
    "NIT Srinagar",
    "NIT Manipur",
    "NIT Meghalaya",
    "NIT Mizoram",
    "NIT Nagaland",
    "NIT Puducherry",
    "NIT Sikkim",
    "NIT Arunachal Pradesh",
    "NIT Delhi",
    "NIT Goa",
    "NIT Uttarakhand",
    "NIT Andhra Pradesh",
    "NIT Tadepalligudem",
  ]

  const analyzeRisk = () => {
    if (choices.length < 5) {
      setRiskLevel("critical")
    } else if (choices.length < 10) {
      setRiskLevel("high")
    } else if (choices.length < 15) {
      setRiskLevel("moderate")
    } else {
      setRiskLevel("safe")
    }
  }

  const getRiskColor = (risk: string | null) => {
    switch (risk) {
      case "safe":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      case "critical":
        return "bg-red-700"
      default:
        return "bg-gray-300"
    }
  }

  const getRiskMessage = (risk: string | null) => {
    switch (risk) {
      case "safe":
        return "Your choices are well-balanced with safety backups."
      case "moderate":
        return "Good mix, but slightly ambitious. Consider adding more safe options."
      case "high":
        return "Very few safe options. You might lose a seat. Add more backup choices."
      case "critical":
        return "Too few choices. This is extremely risky. Add more options immediately."
      default:
        return "Enter your details and choices to see risk analysis."
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">CSAB (Central Seat Allocation Board)</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold mt-6 mb-4">CSAB Risk Meter</h2>
        <div className="space-y-4 mb-6">
          <Input type="number" placeholder="Enter your rank" value={rank} onChange={(e) => setRank(e.target.value)} />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="OBC-NCL">OBC-NCL</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="EWS">EWS</SelectItem>
            </SelectContent>
          </Select>
          <Select value={quota} onValueChange={setQuota}>
            <SelectTrigger>
              <SelectValue placeholder="Select quota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HS">Home State (HS)</SelectItem>
              <SelectItem value="OS">Other State (OS)</SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-4">
            <MultiSelect
              options={nits.map((nit) => ({ label: nit, value: nit }))}
              selected={choices}
              onChange={setChoices}
              placeholder="Select NITs"
            />
            <div>
              <h3 className="font-semibold mb-2">Selected Choices:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NIT</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {choices.map((choice) => (
                    <TableRow key={choice}>
                      <TableCell>{choice}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setChoices(choices.filter((c) => c !== choice))}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Button onClick={analyzeRisk}>Analyze Risk Based on Selected NITs</Button>
        </div>

        {riskLevel && (
          <Alert className={`mb-6 ${getRiskColor(riskLevel)} text-white`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Risk Level: {riskLevel.toUpperCase()}</AlertTitle>
            <AlertDescription>{getRiskMessage(riskLevel)}</AlertDescription>
          </Alert>
        )}

        <h2 className="text-xl font-semibold mt-6 mb-4">Risk Levels & Color Indicators</h2>
        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>Risk Level</TableHead>
              <TableHead>Meaning</TableHead>
              <TableHead>Example Scenario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">🟢 Safe</TableCell>
              <TableCell>Well-balanced choice list with safety backups.</TableCell>
              <TableCell>Includes top NITs + mid-tier IIITs/GFTIs.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">🟡 Moderate Risk</TableCell>
              <TableCell>Good mix, but slightly ambitious.</TableCell>
              <TableCell>Includes mostly high-cutoff NITs, with 1-2 safe choices.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">🔴 High Risk</TableCell>
              <TableCell>Very few safe options, might lose a seat.</TableCell>
              <TableCell>Only top 5 NITs/IIITs, no backups.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">⚠️ Critical Risk</TableCell>
              <TableCell>Too few choices, extremely risky.</TableCell>
              <TableCell>Only 3-4 choices, all very high cutoffs.</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2 className="text-xl font-semibold mt-6 mb-4">When Does It Trigger a Warning?</h2>
        <ul className="list-disc ml-6 space-y-2 mb-6">
          <li>
            <strong>Too Few Choices Selected:</strong> When a student selects only a handful of colleges.
          </li>
          <li>
            <strong>All Choices Are High-Risk:</strong> When all selected colleges have very high cutoffs.
          </li>
          <li>
            <strong>Ignoring Lower Cutoff Institutes:</strong> When eligible lower-cutoff colleges are not included.
          </li>
          <li>
            <strong>Category Seat Availability Issues:</strong> When choices are in high-demand categories.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">Key Functions of CSAB</h2>
        <h3 className="text-lg font-medium mt-4 mb-2">1. CSAB Special Round</h3>
        <ul className="list-disc ml-6 mt-2 mb-4">
          <li>Conducted after all JoSAA rounds to fill vacant seats in NITs, IIITs, and GFTIs.</li>
          <li>Open to students who didn't get a seat in JoSAA or want better options.</li>
          <li>Requires fresh registration and a separate CSAB fee payment.</li>
          <li>Vacant seat matrix is released before the round begins to help students make informed choices.</li>
        </ul>

        <h4 className="text-md font-medium mt-4 mb-2">Eligibility for CSAB Special Round:</h4>
        <ul className="list-disc ml-6 mt-2 mb-4">
          <li>Candidates who did not get any seat in JoSAA rounds.</li>
          <li>
            Candidates who got a seat but wish to participate for better options (must surrender previous allotment).
          </li>
          <li>Only students eligible for JoSAA (based on JEE Main Rank) can apply.</li>
        </ul>

        <h4 className="text-md font-medium mt-4 mb-2">Key Rules:</h4>
        <ul className="list-disc ml-6 mt-2 mb-4">
          <li>Candidates must fill new choices in CSAB rounds.</li>
          <li>Previous JoSAA seat acceptance doesn't guarantee a seat in CSAB.</li>
          <li>If a candidate gets a seat in CSAB, their previous seat (if any) is canceled.</li>
        </ul>

        <h3 className="text-lg font-medium mt-4 mb-2">2. CSAB Supernumerary Seats for UT Candidates</h3>
        <p className="mt-2 mb-4">
          Certain NITs and IIITs reserve supernumerary (extra) seats for students from Union Territories. This helps
          students from Andaman & Nicobar, Lakshadweep, Daman & Diu, Ladakh, etc.
        </p>

        <h4 className="text-md font-medium mt-4 mb-2">Eligibility:</h4>
        <ul className="list-disc ml-6 mt-2 mb-4">
          <li>Students from designated Union Territories.</li>
          <li>Must have appeared for JEE Mains and meet the minimum cutoff.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">JoSAA vs CSAB – Key Differences</h2>
        <Table className="mt-4 mb-6">
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>JoSAA</TableHead>
              <TableHead>CSAB</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Conducts</TableCell>
              <TableCell>Main counseling for IITs, NITs, IIITs, GFTIs</TableCell>
              <TableCell>Special rounds for NIT+ system (NITs, IIITs, GFTIs)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Institutes Covered</TableCell>
              <TableCell>IITs, NITs, IIITs, GFTIs</TableCell>
              <TableCell>NITs, IIITs, GFTIs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rounds Conducted</TableCell>
              <TableCell>Multiple</TableCell>
              <TableCell>Usually 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eligibility</TableCell>
              <TableCell>Based on JEE Advanced (IITs) & JEE Main (NITs, IIITs)</TableCell>
              <TableCell>Only JEE Main</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Purpose</TableCell>
              <TableCell>Main seat allocation</TableCell>
              <TableCell>Fill vacant seats</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2 className="text-xl font-semibold mt-6 mb-4">Why Participate in CSAB?</h2>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span>Second chance for students who didn't get a seat in JoSAA.</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span>Opportunity to upgrade if you are unsatisfied with the allotted seat.</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span>Seats may remain vacant, giving students a higher chance of admission in top NITs & IIITs.</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span>Lower cutoffs compared to JoSAA due to fewer applicants.</span>
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-4">CSAB Strategy – Tips for Aspirants</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>Check Vacant Seat Matrix carefully before filling choices.</li>
          <li>Don't just focus on top NITs – Many mid-tier NITs have amazing placement records.</li>
          <li>Fill maximum choices to maximize selection chances.</li>
          <li>Compare cutoff trends from previous years before locking preferences.</li>
          <li>Ensure fee payment & document verification to avoid disqualification.</li>
        </ul>
      </CardContent>
    </Card>
  )
}

