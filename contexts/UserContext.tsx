import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Institute, Program } from "@/lib/collegeData"
import { supabase } from "@/lib/supabase"

interface UserContextType {
  profile: {
    name: string
    email: string
    jeeMainsRank: number
    jeeAdvancedRank: number
    category: string
    state: string
    gender: string
  }
  setProfile: React.Dispatch<React.SetStateAction<UserContextType["profile"]>>
  preferences: Array<{ institute: Institute; program: Program }>
  setPreferences: React.Dispatch<React.SetStateAction<UserContextType["preferences"]>>
  isProfileComplete: boolean
  arePreferencesSet: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserContextType["profile"]>({
    name: "",
    email: "",
    jeeMainsRank:"",
    jeeAdvancedRank: "",
    category: "",
    state: "",
    gender: "",
  })

  const [preferences, setPreferences] = useState<UserContextType["preferences"]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: session } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError)
        } else if (profileData) {
          setProfile(profileData)
        }

        const { data: preferencesData, error: preferencesError } = await supabase
          .from("preferences")
          .select("preferences")
          .eq("id", session.user.id)
          .single()

        if (preferencesError) {
          console.error("Error fetching preferences:", preferencesError)
        } else if (preferencesData) {
          setPreferences(preferencesData.preferences)
        }
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const updateProfile = async () => {
      const { data: session } = await supabase.auth.getSession()
      if (session?.user) {
        const { error } = await supabase.from("profiles").upsert({ id: session.user.id, ...profile })

        if (error) console.error("Error updating profile:", error)
      }
    }

    updateProfile()
  }, [profile])

  useEffect(() => {
    const updatePreferences = async () => {
      const { data: session } = await supabase.auth.getSession()
      if (session?.user) {
        const { error } = await supabase.from("preferences").upsert({ id: session.user.id, preferences })

        if (error) console.error("Error updating preferences:", error)
      }
    }

    updatePreferences()
  }, [preferences])

  const isProfileComplete = Object.values(profile).every((value) => value !== "" && value !== 0)
  const arePreferencesSet = preferences.length > 0

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        preferences,
        setPreferences,
        isProfileComplete,
        arePreferencesSet,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

