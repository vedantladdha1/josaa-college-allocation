"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  User,
  BookOpen,
  CheckSquare,
  Building,
  MessageSquare,
  Grid,
  GitCompare,
  List,
  TrendingUp,
  AlertTriangle,
  Heart,
  Youtube,
  BarChart,
  Search,
  Clock,
  GitBranch,
  Info,
  BookOpenCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import type React from "react"
import { InstituteList } from "@/components/institute-list"
import { UserProvider, useUser } from "@/contexts/UserContext"
import { StudentProfile } from "@/components/student-profile"
import { CollegePreferences } from "@/components/college-preferences"
import { AllotmentResults } from "@/components/allotment-results"
import { OfficialWebsites } from "@/components/official-websites"
import { ChatSection } from "@/components/chat-section"
import { SeatMatrix } from "@/components/seat-matrix"
import { BranchComparison } from "@/components/branch-comparison"
import { CollegeShortlisting } from "@/components/college-shortlisting"
import { CollegePredictor } from "@/components/college-predictor"
import { StrategicChoiceFilling } from "@/components/strategic-choice-filling"
import { CounselingMistakes } from "@/components/counseling-mistakes"
import { DosAndDonts } from "@/components/dos-and-donts"
import { MentalHealthAndYoga } from "@/components/mental-health-and-yoga"
import { JeeStories } from "@/components/jee-stories"
import { JeeResources } from "@/components/jee-resources"
import { PerformanceTracker } from "@/components/performance-tracker"
import { CollegeExamExplorer } from "@/components/college-exam-explorer"
import { FocusMode } from "@/components/focus-mode"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { PersonalityBasedBranchSelector } from "@/components/personality-based-branch-selector"
import { CsabSection } from "@/components/csab-section"
import { JeeSubjectMasteryTracker } from "@/components/jee-subject-mastery-tracker"

interface StudentLayoutProps {
  children: React.ReactNode
}

function StudentLayoutContent() {
  const [activeSection, setActiveSection] = useState("profile")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isProfileComplete, arePreferencesSet } = useUser()
  const router = useRouter()

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: BookOpen },
    { id: "allotment", label: "Allotment Results", icon: CheckSquare },
    { id: "institutes", label: "Institute List", icon: Building },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "seatMatrix", label: "Seat Matrix", icon: Grid },
    { id: "branchComparison", label: "Branch Comparison", icon: GitCompare },
    { id: "collegeShortlisting", label: "College Shortlisting", icon: List },
    { id: "collegePredictor", label: "College Predictor", icon: TrendingUp },
    { id: "strategicChoiceFilling", label: "Strategic Choice Filling", icon: TrendingUp },
    { id: "counselingMistakes", label: "Counseling Mistakes", icon: AlertTriangle },
    { id: "dosAndDonts", label: "Do's and Don'ts", icon: Heart },
    { id: "mentalHealthAndYoga", label: "Mental Health & Yoga", icon: Heart },
    { id: "jeeStories", label: "JEE Stories", icon: BookOpen },
    { id: "jeeResources", label: "JEE Resources", icon: Youtube },
    { id: "performanceTracker", label: "Performance Tracker", icon: BarChart },
    { id: "collegeExamExplorer", label: "College & Exam Explorer", icon: Search },
    { id: "focusMode", label: "Focus Mode", icon: Clock },
    { id: "branchSelector", label: "Branch Selector", icon: GitBranch },
    { id: "csab", label: "CSAB Information", icon: Info },
    { id: "jeeMasteryTracker", label: "JEE Mastery Tracker", icon: BookOpenCheck },
  ]

  useEffect(() => {
    if (!isProfileComplete) {
      setActiveSection("profile")
    } else if (!arePreferencesSet) {
      setActiveSection("preferences")
    }
  }, [isProfileComplete, arePreferencesSet])

  const handleMenuItemClick = (sectionId: string) => {
    if (sectionId === "allotment" && (!isProfileComplete || !arePreferencesSet)) {
      toast({
        title: "Action required",
        description: "Please complete your profile and set your preferences before viewing allotment results.",
        variant: "destructive",
      })
    } else {
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold">JOSAA Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                supabase.auth.signOut()
                router.push("/")
              }}
            >
              Logout
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] flex flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>Navigate through different sections of your dashboard.</SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <ScrollArea className="h-full">
                    <div className="space-y-2 p-4">
                      {menuItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className={cn("w-full justify-start gap-2", activeSection === item.id && "bg-muted")}
                          onClick={() => handleMenuItemClick(item.id)}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden md:block w-64 bg-white shadow-md h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="space-y-2 p-4">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn("w-full justify-start gap-2", activeSection === item.id && "bg-muted")}
                  onClick={() => handleMenuItemClick(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 container mx-auto px-4 py-8 overflow-x-hidden">
          {activeSection === "profile" && <StudentProfile />}
          {activeSection === "preferences" && <CollegePreferences />}
          {activeSection === "allotment" && <AllotmentResults />}
          {activeSection === "institutes" && <InstituteList />}
          {activeSection === "chat" && <ChatSection />}
          {activeSection === "seatMatrix" && <SeatMatrix />}
          {activeSection === "branchComparison" && <BranchComparison />}
          {activeSection === "collegeShortlisting" && <CollegeShortlisting />}
          {activeSection === "collegePredictor" && <CollegePredictor />}
          {activeSection === "strategicChoiceFilling" && <StrategicChoiceFilling />}
          {activeSection === "counselingMistakes" && <CounselingMistakes />}
          {activeSection === "dosAndDonts" && <DosAndDonts />}
          {activeSection === "mentalHealthAndYoga" && <MentalHealthAndYoga />}
          {activeSection === "jeeStories" && <JeeStories />}
          {activeSection === "jeeResources" && <JeeResources />}
          {activeSection === "performanceTracker" && <PerformanceTracker />}
          {activeSection === "collegeExamExplorer" && <CollegeExamExplorer />}
          {activeSection === "focusMode" && <FocusMode />}
          {activeSection === "branchSelector" && <PersonalityBasedBranchSelector />}
          {activeSection === "csab" && <CsabSection />}
          {activeSection === "jeeMasteryTracker" && <JeeSubjectMasteryTracker />}
        </main>
      </div>
      <OfficialWebsites />
    </div>
  )
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <UserProvider>
      <StudentLayoutContent />
    </UserProvider>
  )
}

