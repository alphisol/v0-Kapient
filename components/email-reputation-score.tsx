"use client"

interface EmailReputationScoreProps {
  score: number
}

export function EmailReputationScore({ score }: EmailReputationScoreProps) {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-green-500"
    if (score >= 50) return "text-amber-500"
    return "text-red-500"
  }

  // Determine label based on score
  const getScoreLabel = () => {
    if (score >= 90) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 50) return "Fair"
    return "Poor"
  }

  return (
    <div className="flex items-center">
      <div className={`text-2xl font-bold ${getScoreColor()}`}>{score}</div>
      <div className="ml-2 text-xs text-muted-foreground">
        <div>{getScoreLabel()}</div>
        <div>Reputation Score</div>
      </div>
    </div>
  )
}
