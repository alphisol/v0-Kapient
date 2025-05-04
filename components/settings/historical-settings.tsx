"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HistoricalSettings() {
  const [activeTab, setActiveTab] = useState("dns")
  const [itemsPerPage, setItemsPerPage] = useState("20")
  const [currentPage, setCurrentPage] = useState(1)

  // Sample date range - in a real app, this would be a date picker
  const dateRange = "4 Apr - 4 May 2025"

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Historical Settings</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-kapient-gray">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Setting</span>
          <span className="mx-2">›</span>
          <span className="text-kapient-blue">
            {activeTab === "dns"
              ? "DNS Report"
              : activeTab === "server"
                ? "Server Report"
                : activeTab === "security"
                  ? "Security Report"
                  : "Web Content"}
          </span>
        </div>
        <div className="text-sm text-kapient-blue">{dateRange}</div>
      </div>

      <Tabs defaultValue="dns" onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full min-w-[600px] grid grid-cols-4">
            <TabsTrigger value="dns">DNS Report</TabsTrigger>
            <TabsTrigger value="server">Server Report</TabsTrigger>
            <TabsTrigger value="security">Security Report</TabsTrigger>
            <TabsTrigger value="web">Web Content</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dns" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">DNS Report</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Update
              </Button>
              <Button variant="outline" size="sm">
                New
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Old Value</TableHead>
                  <TableHead>New Value</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No data found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show items</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-16 h-9 sm:h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-9 sm:h-8 px-4"
              >
                Prev
              </Button>
              <Button variant="default" size="sm" className="bg-kapient-blue hover:bg-kapient-blue/90 h-9 sm:h-8 px-4">
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-9 sm:h-8 px-4"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="server" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Server Report</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Update
              </Button>
              <Button variant="outline" size="sm">
                New
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Response Code</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No data found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show items</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-16 h-9 sm:h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-9 sm:h-8 px-4"
              >
                Prev
              </Button>
              <Button variant="default" size="sm" className="bg-kapient-blue hover:bg-kapient-blue/90 h-9 sm:h-8 px-4">
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-9 sm:h-8 px-4"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Security Report</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Update
              </Button>
              <Button variant="outline" size="sm">
                New
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No data found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show items</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-16 h-9 sm:h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-9 sm:h-8 px-4"
              >
                Prev
              </Button>
              <Button variant="default" size="sm" className="bg-kapient-blue hover:bg-kapient-blue/90 h-9 sm:h-8 px-4">
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-9 sm:h-8 px-4"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="web" className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Web Content</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Update
              </Button>
              <Button variant="outline" size="sm">
                New
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No data found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Show items</span>
              <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                <SelectTrigger className="w-16 h-9 sm:h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="h-9 sm:h-8 px-4"
              >
                Prev
              </Button>
              <Button variant="default" size="sm" className="bg-kapient-blue hover:bg-kapient-blue/90 h-9 sm:h-8 px-4">
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                className="h-9 sm:h-8 px-4"
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
