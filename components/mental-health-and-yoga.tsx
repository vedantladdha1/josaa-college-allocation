import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Youtube, Brain, SpaceIcon as Yoga } from "lucide-react"

export function MentalHealthAndYoga() {
  const sections = [
    {
      title: "Mental Health Tips",
      icon: Heart,
      items: [
        "Maintain a balanced study schedule",
        "Practice mindfulness and meditation",
        "Get adequate sleep",
        "Stay connected with friends and family",
        "Engage in physical activity",
      ],
    },
    {
      title: "Yoga Practices",
      icon: Yoga,
      items: [
        "Surya Namaskar (Sun Salutation)",
        "Pranayama (Breathing exercises)",
        "Padmasana (Lotus Pose)",
        "Shavasana (Corpse Pose)",
        "Vajrasana (Thunderbolt Pose)",
      ],
    },
    {
      title: "Recommended Videos",
      icon: Youtube,
      items: [
        { title: "10-Minute Meditation for Stress", url: "https://www.youtube.com/watch?v=z6X5oEIg6Ak" },
        {
          title: "Yoga for Students - Improve Focus and Concentration",
          url: "https://www.youtube.com/watch?v=WcYE1Wd8qJE",
        },
        { title: "5 Mental Health Tips for Students", url: "https://www.youtube.com/watch?v=8VkxZ7Jz2Vc" },
        { title: "Breathing Exercises for Anxiety", url: "https://www.youtube.com/watch?v=vXZ5l7G6T2I" },
      ],
    },
    {
      title: "Psychology View",
      icon: Brain,
      items: [
        "Understand the Yerkes-Dodson Law",
        "Use the Pomodoro Technique",
        "Practice cognitive restructuring",
        "Utilize the spacing effect",
        "Apply the testing effect",
      ],
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mental Health & Yoga Practices</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                <section.icon className="h-5 w-5 mr-2" />
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      {typeof item === "string" ? (
                        item
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:underline"
                        >
                          <Youtube className="h-4 w-4 mr-2" />
                          <span>{item.title}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

