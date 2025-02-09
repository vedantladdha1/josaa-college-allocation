import { ExternalLink } from "lucide-react"

export function OfficialWebsites() {
  const websites = [
    { name: "JOSAA", url: "https://josaa.nic.in" },
    { name: "JEE Main", url: "https://jeemain.nta.nic.in" },
    { name: "JEE Advanced", url: "https://jeeadv.ac.in" },
  ]

  return (
    <footer className="bg-white shadow-md mt-8">
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold mb-4">Official Websites</h3>
        <div className="flex flex-wrap gap-4">
          {websites.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              {site.name}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

