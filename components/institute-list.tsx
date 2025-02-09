import { institutes } from "@/lib/collegeData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"

export function InstituteList() {
  const iits = institutes.filter((institute) => institute.category === "IIT")
  const nits = institutes.filter((institute) => institute.category === "NIT")
  const others = institutes.filter((institute) => !["IIT", "NIT"].includes(institute.category))

  const renderInstituteTable = (instituteList) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Website</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {instituteList.map((institute) => (
          <TableRow key={institute.code}>
            <TableCell>{institute.code}</TableCell>
            <TableCell>{institute.name}</TableCell>
            <TableCell>{institute.category}</TableCell>
            <TableCell>
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                Official Website
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Indian Institutes of Technology (IITs)</CardTitle>
        </CardHeader>
        <CardContent>{renderInstituteTable(iits)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>National Institutes of Technology (NITs)</CardTitle>
        </CardHeader>
        <CardContent>{renderInstituteTable(nits)}</CardContent>
      </Card>

      {others.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Institutes</CardTitle>
          </CardHeader>
          <CardContent>{renderInstituteTable(others)}</CardContent>
        </Card>
      )}
    </div>
  )
}

