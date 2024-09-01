'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Send, HelpCircle, Briefcase, FileUp, Eye, CheckCircle, XCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AtsHelperResults() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      if (selectedFile.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(selectedFile)
        setPreviewUrl(fileUrl)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log("File:", file)
    console.log("Job Description:", jobDescription)
  }

  return (
    <TooltipProvider>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Briefcase className="w-8 h-8" />
            Resume Improvement Suggestions
          </CardTitle>
          <CardDescription className="text-lg text-center text-white/90">
            Optimize your resume based on our analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-gradient-to-b from-blue-50 to-purple-50">
          <Tabs defaultValue="suggestions" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="upload">Upload New</TabsTrigger>
            </TabsList>
            <TabsContent value="suggestions">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Improvement Suggestions</CardTitle>
                  <CardDescription>Based on the job description you provided</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Strong Skills Section</h3>
                          <p>Your skills section aligns well with the job requirements. Consider adding more specific technical skills mentioned in the job description.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Work Experience Needs More Detail</h3>
                          <p>Expand on your achievements in previous roles. Use specific metrics and outcomes to demonstrate your impact.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Relevant Education</h3>
                          <p>Your educational background matches the job requirements well. Consider adding any relevant coursework or projects.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Missing Keywords</h3>
                          <p>Include more industry-specific keywords from the job description throughout your resume to improve ATS compatibility.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Clear Formatting</h3>
                          <p>Your resume has a clean, professional layout. Ensure consistent font sizes and styles throughout.</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>Upload New Resume</CardTitle>
                  <CardDescription>Update your resume or job description for a new analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume" className="text-lg font-medium text-gray-700 flex items-center gap-2">
                        <FileUp className="w-5 h-5 text-blue-500" />
                        Upload Your Resume
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        <Label
                          htmlFor="resume"
                          className="flex-1 py-3 px-4 bg-white border-2 border-blue-300 hover:border-blue-500 rounded-md cursor-pointer flex items-center justify-center space-x-2 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-blue-500" />
                          <span className="text-gray-700">{file ? file.name : "Choose file"}</span>
                        </Label>
                        {file && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => {
                                    setFile(null)
                                    setPreviewUrl(null)
                                  }}
                                  className="border-2 border-red-300 hover:border-red-500 text-red-500 hover:text-red-700"
                                >
                                  <FileText className="w-5 h-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove file</p>
                              </TooltipContent>
                            </Tooltip>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="border-2 border-green-300 hover:border-green-500 text-green-500 hover:text-green-700"
                                >
                                  <Eye className="w-5 h-5" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl w-full">
                                <DialogHeader>
                                  <DialogTitle>Resume Preview</DialogTitle>
                                </DialogHeader>
                                {previewUrl ? (
                                  <iframe src={previewUrl} className="w-full h-[70vh]" />
                                ) : (
                                  <div className="flex items-center justify-center h-[70vh] bg-gray-100 text-gray-500">
                                    <p>Preview not available for this file type</p>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Accepted file types: PDF, DOC, DOCX
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobDescription" className="text-lg font-medium text-gray-700 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-500" />
                        Job Description
                      </Label>
                      <Textarea
                        id="jobDescription"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[150px] resize-vertical border-2 border-purple-300 focus:border-purple-500"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105" 
                      disabled={!file || !jobDescription}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Analyze Resume
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-sm text-center text-gray-600 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <p>
              Need help? Contact support at support@example.com or call 1-800-123-4567
            </p>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}