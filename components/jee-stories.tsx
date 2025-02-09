import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function JeeStories() {
  const jeeMainsStories = [
    {
      name: "Sneha Pareek",
      year: "2022",
      rank: "AIR 1",
      story:
        "Sneha Pareek from Assam secured AIR 1 in JEE Mains 2022. She emphasized the importance of consistent study and solving previous years' question papers. Sneha believes in understanding concepts thoroughly rather than memorizing formulas.",
    },
    {
      name: "Navneet Kavita",
      year: "2021",
      rank: "AIR 1",
      story:
        "Navneet Kavita from Delhi topped JEE Mains 2021. He stressed the significance of time management and maintaining a balanced approach to all subjects. Navneet also highlighted the role of NCERT textbooks in building a strong foundation.",
    },
  ]

  const jeeAdvancedStories = [
    {
      name: "R K Shishir",
      year: "2022",
      rank: "AIR 1",
      story:
        "R K Shishir from Karnataka secured AIR 1 in JEE Advanced 2022. He attributed his success to consistent practice, focusing on weak areas, and maintaining a positive mindset. Shishir emphasized the importance of quality study over quantity.",
    },
    {
      name: "Mridul Agarwal",
      year: "2021",
      rank: "AIR 1",
      story:
        "Mridul Agarwal from Rajasthan topped JEE Advanced 2021 with a record-breaking score. He stressed the importance of conceptual clarity and regular revision. Mridul also highlighted the role of mock tests in improving time management skills.",
    },
  ]

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>JEE Success Stories</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="jee-mains">
          <TabsList>
            <TabsTrigger value="jee-mains">JEE Mains Stories</TabsTrigger>
            <TabsTrigger value="jee-advanced">JEE Advanced Stories</TabsTrigger>
          </TabsList>
          <TabsContent value="jee-mains">
            <h3 className="text-lg font-semibold mb-4">JEE Mains Toppers</h3>
            {jeeMainsStories.map((story, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-medium">
                  {story.name} - {story.rank} ({story.year})
                </h4>
                <p>{story.story}</p>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="jee-advanced">
            <h3 className="text-lg font-semibold mb-4">JEE Advanced Toppers</h3>
            {jeeAdvancedStories.map((story, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-medium">
                  {story.name} - {story.rank} ({story.year})
                </h4>
                <p>{story.story}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Motivational Message</h3>
          <p className="italic">
            "Success in JEE is not just about intelligence, but about perseverance, dedication, and smart work.
            Remember, every top ranker was once in your shoes. Stay focused, believe in yourself, and keep pushing
            forward. Your hard work will pay off!"
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

