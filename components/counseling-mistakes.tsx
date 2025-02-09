import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export function CounselingMistakes() {
  const dosAndDonts = [
    { do: "Fill all available choice options", dont: "Limit yourself to a few choices" },
    { do: "Carefully review your choices before locking", dont: "Rush through the choice filling process" },
    { do: "Consider all factors (placements, location, etc.)", dont: "Focus solely on college brand name" },
    { do: "Stay updated with counseling schedules", dont: "Miss important deadlines" },
    { do: "Understand freeze/float options clearly", dont: "Make hasty decisions on seat acceptance" },
    { do: "Research about lesser-known institutes", dont: "Ignore new IITs or NITs" },
    { do: "Consider branch preferences along with institutes", dont: "Choose only based on institute reputation" },
    { do: "Keep all required documents ready", dont: "Delay document preparation" },
    { do: "Seek guidance from seniors or counselors", dont: "Rely solely on peer pressure or rumors" },
    { do: "Have a backup plan", dont: "Put all eggs in one basket" },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Common Mistakes to Avoid in Counseling</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">Do's</h3>
            <ul className="space-y-2">
              {dosAndDonts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                  <span>{item.do}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-red-600">Don'ts</h3>
            <ul className="space-y-2">
              {dosAndDonts.map((item, index) => (
                <li key={index} className="flex items-start">
                  <XCircle className="mr-2 h-5 w-5 text-red-500 flex-shrink-0 mt-1" />
                  <span>{item.dont}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Additional Tips</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Always keep your login credentials safe and confidential</li>
            <li>Double-check your personal details in the application form</li>
            <li>Understand the fee refund policy before making payments</li>
            <li>Be aware of the seat withdrawal process and its implications</li>
            <li>Keep track of important dates for each counseling round</li>
            <li>Familiarize yourself with the official JOSAA website interface</li>
            <li>Save and take printouts of all important documents and allotment letters</li>
          </ul>
        </div>
        {/*<div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Video: Common Counseling Mistakes</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>*/}
      </CardContent>
    </Card>
  )
}

