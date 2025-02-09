import type { Student } from "./dummyStudentData"
import { institutes, programs, seatMatrix, type Round } from "./collegeData"

export interface AllotmentResult {
  student: Student
  instituteCode: string
  programCode: string
  category: string
  round: Round
}

export function performAllotment(students: Student[], round: Round): AllotmentResult[] {
  const allotments: AllotmentResult[] = []
  const availableSeats = JSON.parse(JSON.stringify(seatMatrix)) // Deep copy

  // Sort students by JEE Mains rank
  const sortedStudents = [...students].sort((a, b) => a.jeeMainsRank - b.jeeMainsRank)

  for (const student of sortedStudents) {
    let isAllotted = false
    for (const preference of student.preferences) {
      const seat = availableSeats.find(
        (s) =>
          s.instituteCode === preference.institute.code &&
          s.programCode === preference.program.code &&
          (s.category === "AI" || s.category === student.category) &&
          s.openingRank <= student.jeeMainsRank &&
          s.closingRank >= student.jeeMainsRank,
      )

      if (seat) {
        allotments.push({
          student,
          instituteCode: preference.institute.code,
          programCode: preference.program.code,
          category: seat.category,
          round,
        })

        // Remove the allocated seat
        const seatIndex = availableSeats.indexOf(seat)
        availableSeats.splice(seatIndex, 1)

        isAllotted = true
        break // Stop looking for preferences for this student
      }
    }

    // If student wasn't allotted in this round, carry forward previous allotment
    if (!isAllotted) {
      const previousAllotment = allotments.find((a) => a.student.id === student.id)
      if (previousAllotment) {
        allotments.push({ ...previousAllotment, round })
      }
    }
  }

  return allotments
}

export function calculateCutoffs(allotments: AllotmentResult[]): Record<string, Record<string, number>> {
  const cutoffs: Record<string, Record<string, number>> = {}

  for (const allotment of allotments) {
    const key = `${allotment.instituteCode}-${allotment.programCode}`
    if (!cutoffs[key]) {
      cutoffs[key] = {}
    }
    if (!cutoffs[key][allotment.category] || allotment.student.jeeMainsRank > cutoffs[key][allotment.category]) {
      cutoffs[key][allotment.category] = allotment.student.jeeMainsRank
    }
  }

  return cutoffs
}

