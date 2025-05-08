// Color utility functions for consistent color coding based on scores
export function getScoreColor(score: number) {
  if (score >= 90) return "text-green-600" // Green for scores 90-100
  if (score >= 70) return "text-green-500" // Light green for scores 70-89
  if (score >= 51) return "text-yellow-500" // Yellow for scores 51-69
  return "text-red-500" // Red for scores ≤ 50
}

// Progress bar colors based on score
export function getProgressColor(score: number) {
  if (score >= 90) return "bg-green-600" // Green for scores 90-100
  if (score >= 70) return "bg-green-500" // Light green for scores 70-89
  if (score >= 51) return "bg-yellow-500" // Yellow for scores 51-69
  return "bg-red-500" // Red for scores ≤ 50
}

// Card background colors based on score
export function getScoreCardColor(score: number) {
  if (score >= 90) return "bg-white border-green-600" // Green border for scores 90-100
  if (score >= 70) return "bg-white border-green-500" // Light green border for scores 70-89
  if (score >= 51) return "bg-white border-yellow-500" // Yellow border for scores 51-69
  return "bg-white border-red-500" // Red border for scores ≤ 50
}

export function getSeverityColor(severity: string) {
  switch (severity) {
    case "high":
      return "bg-white text-red-800 border-red-500"
    case "medium":
      return "bg-white text-orange-800 border-orange-500"
    case "low":
      return "bg-white text-yellow-800 border-yellow-500"
    default:
      return "bg-white text-gray-800 border-gray-500"
  }
}

export function getSeverityBadgeColor(severity: string) {
  switch (severity) {
    case "high":
    case "critical":
      return "bg-white text-red-800 hover:bg-gray-50 border border-red-500"
    case "medium":
    case "warning":
      return "bg-white text-orange-800 hover:bg-gray-50 border border-orange-500"
    case "low":
    case "info":
      return "bg-white text-yellow-800 hover:bg-gray-50 border border-yellow-500"
    default:
      return "bg-white text-gray-800 hover:bg-gray-50 border border-gray-500"
  }
}

export function getSourceBadgeColor(source: string) {
  switch (source) {
    case "Lighthouse":
      return "bg-blue-600 text-white" // Blue for Lighthouse
    case "Puppeteer":
      return "bg-purple-600 text-white" // Purple for Puppeteer
    case "Wappalyzer":
      return "bg-orange-500 text-white" // Orange for Wappalyzer
    case "phpRank":
      return "bg-red-500 text-white" // Red for phpRank
    case "Manual":
      return "bg-gray-700 text-white" // Dark gray for Manual
    default:
      return "bg-gray-500 text-white" // Medium gray for others
  }
}
