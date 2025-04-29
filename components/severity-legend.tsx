export function SeverityLegend() {
  return (
    <div className="mb-6 p-4 border rounded-lg bg-white">
      <h3 className="text-sm font-medium mb-3">Score Legend</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
          <span className="text-xs text-gray-600">Critical (≤ 50)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-xs text-gray-600">Warning (51-69)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs text-gray-600">Good (70-89)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
          <span className="text-xs text-gray-600">Excellent (90-100)</span>
        </div>
      </div>
    </div>
  )
}
