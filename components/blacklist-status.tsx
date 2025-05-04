"use client"

import { CheckCircle, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface BlacklistStatusProps {
  domain: string
}

export function BlacklistStatus({ domain }: BlacklistStatusProps) {
  // This would be fetched from an API in a real implementation
  const blacklistData = [
    {
      service: "Spamhaus",
      domainStatus: "clean",
      ipStatus: "clean",
      lastChecked: "2023-05-04",
    },
    {
      service: "Barracuda",
      domainStatus: "clean",
      ipStatus: "clean",
      lastChecked: "2023-05-04",
    },
    {
      service: "SORBS",
      domainStatus: "clean",
      ipStatus: "listed",
      lastChecked: "2023-05-04",
    },
    {
      service: "SpamCop",
      domainStatus: "clean",
      ipStatus: "clean",
      lastChecked: "2023-05-04",
    },
    {
      service: "Composite Blocking List",
      domainStatus: "clean",
      ipStatus: "clean",
      lastChecked: "2023-05-04",
    },
  ]

  const getStatusIcon = (status: string) => {
    return status === "clean" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Blacklist Check Results</h3>
          <p className="text-xs text-gray-500">Checking domain {domain} and associated IP addresses</p>
        </div>
        <Button size="sm" variant="outline" className="text-xs">
          Refresh Check
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Blacklist Service</TableHead>
            <TableHead>Domain Status</TableHead>
            <TableHead>IP Status</TableHead>
            <TableHead>Last Checked</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blacklistData.map((item) => (
            <TableRow key={item.service}>
              <TableCell className="font-medium">{item.service}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getStatusIcon(item.domainStatus)}
                  <span className="ml-2 capitalize">{item.domainStatus}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getStatusIcon(item.ipStatus)}
                  <span className="ml-2 capitalize">{item.ipStatus}</span>
                </div>
              </TableCell>
              <TableCell>{item.lastChecked}</TableCell>
              <TableCell>
                {item.domainStatus !== "clean" || item.ipStatus !== "clean" ? (
                  <Button size="sm" variant="outline" className="text-xs">
                    Delist
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
