import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-800">JOSAA Seat Allotment System</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
          Streamline your college admission process with our advanced seat allotment system. Check your seat allotment
          based on your JEE score and preferences, following JOSAA norms.
        </p>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Get Started</CardTitle>
            <CardDescription>Access your personalized dashboard</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Link href="/login" className="w-full">
              <Button size="lg" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button size="lg" variant="outline" className="w-full">
                Sign Up
              </Button>
            </Link>
          </CardContent>
        </Card>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Supported Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["General", "OBC-NCL", "SC", "ST", "EWS"].map((category) => (
              <span key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full bg-blue-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 JOSAA Seat Allotment System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

