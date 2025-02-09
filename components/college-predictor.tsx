import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { institutes, programs } from "@/lib/collegeData"

export function CollegePredictor() {
  const [jeeMainRank, setJeeMainRank] = useState("")
  const [jeeAdvancedRank, setJeeAdvancedRank] = useState("")
  const [category, setCategory] = useState("")
  const [predictedColleges, setPredictedColleges] = useState([])

  const handlePredict = () => {
    let predictions = []

    if (jeeMainRank) {
      const nits = institutes.filter((institute) => institute.category === "NIT")
      predictions = nits.flatMap((institute) =>
        programs.map((program) => ({
          institute: institute.name,
          program: program.name,
          chance: Math.random() > 0.5 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
        })),
      )
    }

    if (jeeAdvancedRank) {
      const iits = institutes.filter((institute) => institute.category === "IIT")
      const iitPredictions = iits.flatMap((institute) =>
        programs.map((program) => ({
          institute: institute.name,
          program: program.name,
          chance: Math.random() > 0.5 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
        })),
      )
      predictions = [...predictions, ...iitPredictions]
    }

    setPredictedColleges(predictions.sort(() => Math.random() - 0.5).slice(0, 10))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">College Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-6">
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
          <Button onClick={handlePredict}>Predict Colleges</Button>
        </div>

        {predictedColleges.length > 0 && (
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
                {predictedColleges.map((college, index) => (
                  <TableRow key={index}>
                    <TableCell>{college.institute}</TableCell>
                    <TableCell>{college.program}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded ${
                          college.chance === "High"
                            ? "bg-green-100 text-green-800"
                            : college.chance === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {college.chance}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

