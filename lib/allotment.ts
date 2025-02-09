import { type College, type Branch, cutoffScores } from "./collegeData"

interface StudentData {
  name: string
  jeeScore: number
  category: string
  state: string
  gender: string
  preferences: Array<{ college: College; branch: Branch }>
}

export function allocateCollege(studentData: StudentData): { college: College; branch: Branch } | null {
  for (const preference of studentData.preferences) {
    const cutoff = cutoffScores[preference.college.name]?.[preference.branch.name]
    if (cutoff && studentData.jeeScore >= cutoff) {
      return preference
    }
  }
  return null
}

