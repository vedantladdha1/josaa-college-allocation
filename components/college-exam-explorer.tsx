"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const exams = [
  {
    name: "BITSAT",
    fullName: "Birla Institute of Technology and Science Admission Test",
    eligibility: "12th pass with PCM, 75% in PCM (65% for Goa/Hyderabad campus)",
    syllabus: "Physics, Chemistry, Mathematics, English, Logical Reasoning",
    examDates: "June-July (tentative)",
    difficulty: "High",
    admissionChances: "Moderate",
    applicationLink: "https://www.bitsadmission.com/",
    mockTestLink: "https://www.embibe.com/exams/bitsat-mock-test/",
    examPattern: "Computer-based online test, 3 hours duration, 150 questions",
    typeOfPaper: "Multiple Choice Questions (MCQs)",
    institutesAccepting: "BITS Pilani, BITS Goa, BITS Hyderabad",
    whyTakeExam:
      "BITSAT offers admission to prestigious BITS campuses, known for high-quality education and excellent placements.",
  },
  {
    name: "VITEEE",
    fullName: "Vellore Institute of Technology Engineering Entrance Examination",
    eligibility: "12th pass with PCM, minimum 60% in PCM",
    syllabus: "Physics, Chemistry, Mathematics, English",
    examDates: "April-May (tentative)",
    difficulty: "Moderate",
    admissionChances: "Good",
    applicationLink: "https://viteee.vit.ac.in/",
    mockTestLink: "https://www.embibe.com/search/Test?q=viteee",
    examPattern: "Computer-based online test, 2.5 hours duration, 125 questions",
    institutesAccepting: "VIT Vellore, VIT Chennai, VIT Bhopal, VIT Amaravati",
  },
  {
    name: "WBJEE",
    fullName: "West Bengal Joint Entrance Examination",
    eligibility: "12th pass with PCM, minimum 45% in PCM",
    syllabus: "Physics, Chemistry, Mathematics",
    examDates: "April-May (tentative)",
    difficulty: "Moderate to High",
    admissionChances: "Good for West Bengal residents",
    applicationLink: "https://wbjeeb.nic.in/",
    mockTestLink: "https://www.embibe.com/search/Test?q=wbjee",
    examPattern: "Offline (pen and paper) test, 4 hours duration, 200 questions",
    institutesAccepting: "Various engineering colleges in West Bengal, including Jadavpur University, IIESTs, and NITs",
  },
]

export function CollegeExamExplorer() {
  const [activeTab, setActiveTab] = useState(exams[0].name)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">College & Exam Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 gap-4 mb-6">
            {exams.map((exam) => (
              <TabsTrigger key={exam.name} value={exam.name} className="w-full">
                {exam.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {exams.map((exam) => (
            <TabsContent key={exam.name} value={exam.name}>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{exam.fullName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Eligibility" content={exam.eligibility} />
                  <InfoCard title="Syllabus" content={exam.syllabus} />
                  <InfoCard title="Exam Dates" content={exam.examDates} />
                  <InfoCard title="Difficulty Level" content={exam.difficulty} />
                  <InfoCard title="Admission Chances" content={exam.admissionChances} />
                  <InfoCard title="Exam Pattern" content={exam.examPattern} />
                  {exam.typeOfPaper && <InfoCard title="Type of Paper" content={exam.typeOfPaper} />}
                  <InfoCard title="Institutes Accepting Scores" content={exam.institutesAccepting} />
                </div>
                {exam.whyTakeExam && <InfoCard title={`Why take ${exam.name}?`} content={exam.whyTakeExam} />}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button asChild>
                    <a href={exam.applicationLink} target="_blank" rel="noopener noreferrer">
                      Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={exam.mockTestLink} target="_blank" rel="noopener noreferrer">
                      Free Mock Tests on Embibe <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm">{content}</p>
    </div>
  )
}

