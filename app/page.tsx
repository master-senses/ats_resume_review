'use client'
import { useState } from "react"
import { AtsHelperCombined } from "@/components/ats-helper-combined"

export default function Home() {
  const [analysis, setAnalysis] = useState<string | null>(null)

  const handleAnalyze = async (file: File, jobDescription: string) => {
    const formData = new FormData()
    formData.append('resume', file)
    formData.append('jobPosting', jobDescription)

    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    setAnalysis(data.analysis)
    return data.analysis
  }

  return (
    <main className="container mx-auto p-4">
      <AtsHelperCombined onAnalyze={handleAnalyze} initialAnalysis={analysis} />
    </main>
  )
}
