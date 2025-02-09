import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { institutes, programs } from "@/lib/collegeData"

export function StrategicChoiceFilling() {
  const [jeeMainRank, setJeeMainRank] = useState("")
  const [jeeAdvancedRank, setJeeAdvancedRank] = useState("")
  const [category, setCategory] = useState("")
  const [homeState, setHomeState] = useState("")
  const [suggestedChoices, setSuggestedChoices] = useState([])

  const handleSimulate = () => {
    let choices = []

    if (jeeMainRank) {
      const nits = institutes.filter((institute) => institute.category === "NIT")
      const nitChoices = nits.flatMap((institute) =>
        programs.map((program) => ({
          institute: institute.name,
          program: program.name,
          chance: Math.random() > 0.5 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
        })),
      )
      choices = [...choices, ...nitChoices]
    }

    if (jeeAdvancedRank) {
      const iits = institutes.filter((institute) => institute.category === "IIT")
      const iitChoices = iits.flatMap((institute) =>
        programs.map((program) => ({
          institute: institute.name,
          program: program.name,
          chance: Math.random() > 0.5 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
        })),
      )
      choices = [...choices, ...iitChoices]
    }

    setSuggestedChoices(choices.sort(() => Math.random() - 0.5).slice(0, 10))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Strategic Choice Filling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Input
            type="number"
            placeholder="Enter your JEE Main rank"
            value={jeeMainRank}
            onChange={(e) => setJeeMainRank(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter your JEE Advanced rank"
            value={jeeAdvancedRank}
            onChange={(e) => setJeeAdvancedRank(e.target.value)}
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="OBC">OBC</SelectItem>
              <SelectItem value="SC">SC</SelectItem>
              <SelectItem value="ST">ST</SelectItem>
              <SelectItem value="EWS">EWS</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Enter your home state" value={homeState} onChange={(e) => setHomeState(e.target.value)} />
          <Button onClick={handleSimulate}>Simulate Choices</Button>
        </div>

        {suggestedChoices.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institute</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Chance of Admission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suggestedChoices.map((choice, index) => (
                  <TableRow key={index}>
                    <TableCell>{choice.institute}</TableCell>
                    <TableCell>{choice.program}</TableCell>
                    <TableCell>{choice.chance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tips for Strategic Choice Filling</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Consider your home state quota for NITs and other state institutions</li>
            <li>Balance between dream colleges and safer options</li>
            <li>Research the placement records and faculty quality of lesser-known institutes</li>
            <li>Don't ignore newer IITs, NITs, and IIITs - they often have excellent facilities and faculty</li>
            <li>Consider branch flexibility - some programs allow easy branch change after first year</li>
            <li>Look into the specializations offered by different institutes in your preferred branch</li>
            <li>Consider factors like location, climate, and campus life while making your choices</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

