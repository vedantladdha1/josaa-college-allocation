"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft } from "lucide-react"

const questions = [
  {
    id: "coding",
    question: "Do you enjoy coding & logic-based problem-solving?",
    options: ["Yes", "Somewhat", "No"],
  },
  {
    id: "electronics",
    question: "Are you interested in electronics & circuit design?",
    options: ["Yes", "Somewhat", "No"],
  },
  {
    id: "mechanical",
    question: "Do you like mechanical structures, engines & robotics?",
    options: ["Yes", "Somewhat", "No"],
  },
  {
    id: "approach",
    question: "Are you more theoretical or hands-on practical?",
    options: ["Theoretical", "Balanced", "Practical"],
  },
  {
    id: "future",
    question: "Do you want to work in research or industry after BTech?",
    options: ["Research", "Both", "Industry"],
  },
  {
    id: "physics_math",
    question: "Do you prefer Physics or Mathematics?",
    options: ["Physics", "Both Equally", "Mathematics"],
  },
  {
    id: "biology",
    question: "Are you interested in biology and its applications?",
    options: ["Yes", "Somewhat", "No"],
  },
  {
    id: "design",
    question: "Do you enjoy design and creative problem-solving?",
    options: ["Yes", "Somewhat", "No"],
  },
]

const branchDescriptions = {
  CSE: "Computer Science and Engineering focuses on the design and development of computer systems and software.",
  ECE: "Electronics and Communication Engineering deals with electronic devices, circuits, and communication systems.",
  ME: "Mechanical Engineering involves the design, manufacturing, and maintenance of mechanical systems.",
  EE: "Electrical Engineering covers the study of electricity, electronics, and electromagnetism.",
  Civil: "Civil Engineering deals with the design, construction, and maintenance of the built environment.",
  ChemE: "Chemical Engineering applies chemistry, physics, and mathematics to chemical and biological processes.",
  AeroE: "Aerospace Engineering focuses on the design and development of aircraft and spacecraft.",
  BioE: "Bioengineering combines engineering principles with biological and medical sciences.",
  MatSci: "Materials Science and Engineering studies the properties and applications of various materials.",
  IndE: "Industrial Engineering optimizes complex systems, processes, and organizations.",
  EnvE: "Environmental Engineering applies scientific and engineering principles to improve the environment.",
  NuclearE: "Nuclear Engineering deals with the application of nuclear processes and radiation.",
}

export function PersonalityBasedBranchSelector() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
  }

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const branchScores = {
      CSE: 0,
      ECE: 0,
      ME: 0,
      EE: 0,
      Civil: 0,
      ChemE: 0,
      AeroE: 0,
      BioE: 0,
      MatSci: 0,
      IndE: 0,
      EnvE: 0,
      NuclearE: 0,
    }

    // Scoring logic based on answers
    if (answers.coding === "Yes") branchScores.CSE += 2
    if (answers.electronics === "Yes") {
      branchScores.ECE += 2
      branchScores.EE += 1
    }
    if (answers.mechanical === "Yes") {
      branchScores.ME += 2
      branchScores.AeroE += 1
    }
    if (answers.approach === "Theoretical") {
      branchScores.CSE += 1
      branchScores.ECE += 1
      branchScores.NuclearE += 1
    } else if (answers.approach === "Practical") {
      branchScores.ME += 1
      branchScores.Civil += 1
      branchScores.ChemE += 1
    }
    if (answers.future === "Research") {
      branchScores.BioE += 1
      branchScores.MatSci += 1
      branchScores.NuclearE += 1
    } else if (answers.future === "Industry") {
      branchScores.CSE += 1
      branchScores.ME += 1
      branchScores.IndE += 1
    }
    if (answers.physics_math === "Physics") {
      branchScores.EE += 1
      branchScores.ME += 1
      branchScores.AeroE += 1
    } else if (answers.physics_math === "Mathematics") {
      branchScores.CSE += 1
      branchScores.MatSci += 1
      branchScores.IndE += 1
    }
    if (answers.biology === "Yes") {
      branchScores.BioE += 2
      branchScores.EnvE += 1
    }
    if (answers.design === "Yes") {
      branchScores.Civil += 1
      branchScores.ME += 1
      branchScores.AeroE += 1
    }

    setResults(branchScores)
    setShowResults(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResults({})
    setShowResults(false)
  }

  const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1])
  const maxScore = Math.max(...Object.values(results))

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Personality-Based Branch Selector</CardTitle>
        <CardDescription>Find the best engineering branch that matches your interests and personality</CardDescription>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <div className="space-y-6">
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
              <RadioGroup onValueChange={handleAnswer} value={answers[questions[currentQuestion].id] || ""}>
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-between">
              <Button onClick={goToPreviousQuestion} disabled={currentQuestion === 0} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={goToNextQuestion} disabled={!answers[questions[currentQuestion].id]}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Your Best-Fit Engineering Branches</h3>
            {sortedResults.slice(0, 5).map(([branch, score], index) => (
              <div key={branch} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{branch}</span>
                  <span className="text-sm text-muted-foreground">{((score / maxScore) * 100).toFixed(0)}% Match</span>
                </div>
                <Progress value={(score / maxScore) * 100} className="w-full" />
                <p className="text-sm text-muted-foreground">{branchDescriptions[branch]}</p>
                {index === 0 && <Badge className="mb-2">Best Match</Badge>}
              </div>
            ))}
            <Button onClick={resetQuiz} className="w-full">
              Retake Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

