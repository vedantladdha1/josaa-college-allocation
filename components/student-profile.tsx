"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

export function StudentProfile() {
  const { profile, setProfile, isProfileComplete } = useUser()
  const [isEditing, setIsEditing] = useState(!isProfileComplete)
  const [emailError, setEmailError] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setProfile({ ...profile, email })
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleUpdate = () => {
    if (isEditing) {
      if (Object.values(profile).every((value) => value !== "" && value !== 0)) {
        setIsEditing(false)
        console.log("Profile updated:", profile)
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        })
      } else {
        toast({
          title: "Incomplete Profile",
          description: "Please fill in all fields before saving.",
          variant: "destructive",
        })
      }
    } else {
      setIsEditing(true)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Student Profile</h2>
      <div className="grid gap-6 p-6 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={handleEmailChange}
              className={`w-full p-2 border rounded-lg ${emailError ? "border-red-500" : ""}`}
              required
              disabled={!isEditing}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              JEE Mains Rank <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={profile.jeeMainsRank}
              onChange={(e) => setProfile({ ...profile, jeeMainsRank: Number(e.target.value) })}
              className="w-full p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              JEE Advanced Rank <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={profile.jeeAdvancedRank}
              onChange={(e) => setProfile({ ...profile, jeeAdvancedRank: Number(e.target.value) })}
              className="w-full p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">JEE Mains Scorecard (Optional)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                // Handle file upload logic here
              }}
              className="w-full p-2 border rounded"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">JEE Advanced Scorecard (Optional)</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                // Handle file upload logic here
              }}
              className="w-full p-2 border rounded"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Photo (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full p-2 border rounded"
              disabled={!isEditing}
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                alt="Profile Preview"
                className="mt-2 w-32 h-32 object-cover rounded-full"
                aria-label="Profile photo preview"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <Select
              value={profile.category}
              onValueChange={(value) => setProfile({ ...profile, category: value })}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="OBC-NCL">OBC-NCL</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="ST">ST</SelectItem>
                <SelectItem value="EWS">EWS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State *</label>
            <Select
              value={profile.state}
              onValueChange={(value) => setProfile({ ...profile, state: value })}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>
            <Select
              value={profile.gender}
              onValueChange={(value) => setProfile({ ...profile, gender: value })}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleUpdate} className="w-full md:w-auto">
          {isEditing ? "Save Profile" : "Edit Profile"}
        </Button>
      </div>
    </div>
  )
}

