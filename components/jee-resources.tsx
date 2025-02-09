"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink, Youtube, Building, Globe, Smartphone } from "lucide-react"

const resources = [
  {
    id: "youtube",
    title: "YouTube Channels",
    icon: Youtube,
    items: [
      { name: "Physics Galaxy", url: "https://www.youtube.com/c/PhysicsGalaxy74" },
      { name: "Unacademy JEE", url: "https://www.youtube.com/c/UnacademyJEE" },
      { name: "Vedantu JEE", url: "https://www.youtube.com/c/VedantuJEE" },
      { name: "ALLEN Career Institute", url: "https://www.youtube.com/c/ALLENCareerInstituteKOTA" },
      { name: "Mohit Tyagi", url: "https://www.youtube.com/c/MohitTyagi" },
    ],
  },
  {
    id: "coaching",
    title: "Coaching Institutes",
    icon: Building,
    items: [
      { name: "FIITJEE", url: "https://www.fiitjee.com/" },
      { name: "Aakash Institute", url: "https://www.aakash.ac.in/" },
      { name: "Allen Career Institute", url: "https://www.allen.ac.in/" },
      { name: "Resonance", url: "https://www.resonance.ac.in/" },
      { name: "Bansal Classes", url: "https://www.bansal.ac.in/" },
    ],
  },
  {
    id: "online",
    title: "Online Resources",
    icon: Globe,
    items: [
      { name: "NCERT eBooks", url: "https://ncert.nic.in/textbook.php" },
      { name: "JEE Main Official Website", url: "https://jeemain.nta.nic.in/" },
      { name: "JEE Advanced Official Website", url: "https://jeeadv.ac.in/" },
      { name: "Physics Wallah", url: "https://www.physicswallah.com/" },
      { name: "Toppr", url: "https://www.toppr.com/" },
    ],
  },
  {
    id: "apps",
    title: "Mobile Apps",
    icon: Smartphone,
    items: [
      { name: "BYJU'S – The Learning App", platform: "Android & iOS" },
      { name: "Unacademy Learning App", platform: "Android & iOS" },
      { name: "Doubtnut: NCERT IIT JEE NEET", platform: "Android & iOS" },
      { name: "Physics Wallah - JEE & NEET App", platform: "Android & iOS" },
      { name: "Embibe: JEE & NEET Prep App", platform: "Android & iOS" },
    ],
  },
]

export function JeeResources() {
  const [activeSection, setActiveSection] = useState(resources[0].id)

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">JEE Preparation Resources</h1>
        <p className="text-muted-foreground">Explore a curated list of resources to help you prepare for JEE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeSection === resource.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setActiveSection(resource.id)}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <resource.icon className="mr-2 h-5 w-5" />
                {resource.title}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>{resources.find((r) => r.id === activeSection)?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {resources
              .find((r) => r.id === activeSection)
              ?.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.name}</AccordionTrigger>
                  <AccordionContent>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <p>Available on: {item.platform}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

