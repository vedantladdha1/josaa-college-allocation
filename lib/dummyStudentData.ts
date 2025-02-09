import { institutes, programs } from "./collegeData"

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

const firstNames = [
  "Aarav",
  "Aditi",
  "Arjun",
  "Anaya",
  "Dhruv",
  "Diya",
  "Ishaan",
  "Isha",
  "Kabir",
  "Kavya",
  "Neha",
  "Nikhil",
  "Priya",
  "Rahul",
  "Riya",
  "Rohan",
  "Sanya",
  "Shaan",
  "Tanvi",
  "Vihaan",
]

const lastNames = [
  "Patel",
  "Sharma",
  "Singh",
  "Kumar",
  "Gupta",
  "Desai",
  "Shah",
  "Mehta",
  "Joshi",
  "Verma",
  "Rao",
  "Reddy",
  "Nair",
  "Menon",
  "Pillai",
  "Das",
  "Bose",
  "Banerjee",
  "Chatterjee",
  "Mukherjee",
]

const generateRandomName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

export interface Student {
  id: number
  name: string
  jeeMainsRank: number
  jeeAdvancedRank: number
  category: string
  state: string
  gender: string
  preferences: Array<{ institute: (typeof institutes)[number]; program: (typeof programs)[number] }>
}

export const generateDummyStudents = (count: number): Student[] => {
  const categories = ["General", "OBC-NCL", "SC", "ST", "EWS"]
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]
  const genders = ["Male", "Female", "Other"]

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: generateRandomName(),
    jeeMainsRank: randomInt(1, 50000),
    jeeAdvancedRank: randomInt(1, 20000),
    category: categories[randomInt(0, categories.length - 1)],
    state: states[randomInt(0, states.length - 1)],
    gender: genders[randomInt(0, genders.length - 1)],
    preferences: generatePreferences(),
  }))
}

const generatePreferences = () => {
  const preferenceCount = randomInt(5, 15)
  const shuffledInstitutes = [...institutes].sort(() => 0.5 - Math.random())
  const shuffledPrograms = [...programs].sort(() => 0.5 - Math.random())

  return Array.from({ length: preferenceCount }, (_, i) => ({
    institute: shuffledInstitutes[i % shuffledInstitutes.length],
    program: shuffledPrograms[i % shuffledPrograms.length],
  }))
}

export const dummyStudents = generateDummyStudents(1000)

