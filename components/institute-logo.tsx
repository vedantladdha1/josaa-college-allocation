import Image from "next/image"

interface InstituteLogoProps {
  name: string
  category: string
}

export function InstituteLogo({ name, category }: InstituteLogoProps) {
  const logoUrl =
    category === "IIT" ? "/iit-logo.png" : category === "NIT" ? "/nit-logo.png" : "/default-institute-logo.png"

  return (
    <div className="w-8 h-8 mr-2">
      <Image src={logoUrl || "/placeholder.svg"} alt={`${name} logo`} width={32} height={32} className="rounded-full" />
    </div>
  )
}

