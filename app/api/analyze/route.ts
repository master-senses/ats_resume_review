import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import pdfParse from "pdf-parse";
import docx from 'mammoth';

const openai = new OpenAI({ apiKey: process.env.GPT4O_API_KEY })

export async function POST(req: Request) {
  const formData = await req.formData()
  const resume = formData.get('resume') as File
  const jobPosting = formData.get('jobPosting') as string

  const fileBuffer = await resume.arrayBuffer();
  const fileType = resume.type;

  let resumeText;
  if (fileType === "application/pdf") {
    resumeText = await pdfParse(Buffer.from(fileBuffer)).then(data => data.text);
  } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
             fileType === "application/msword") {
    const { value } = await docx.extractRawText({ buffer: Buffer.from(fileBuffer) });
    resumeText = value;
  } else {
    throw new Error("Unsupported file type");
  }
//   console.log(resumeText)
  
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `You are an advanced Applicant Tracking System (ATS) designed to analyze resumes against job postings. Conduct a comprehensive analysis using the following parameters, ordered from most to least important for the applicant:

    1. **Overall Match Percentage**
    - Calculate an estimated percentage of how well the resume matches the job requirements.
    - Break this down into subcategories (e.g., skills match, experience match, education match).

    2. **Keyword Analysis**
    - Identify key terms and skills from the job posting.
    - List which keywords are present in the resume and which are missing.
    - Provide a keyword match percentage.

    3. **Experience Relevance**
    - Analyze how well the candidate's work experience aligns with the job description.
    - Identify any gaps in employment or experience.

    4. **Skills Assessment**
    - Create a skills matrix comparing required skills to the candidate's proficiencies.

    5. **Areas for Improvement**
    List items that could be enhanced or are missing, each starting with '-'.
    Example: "- Limited experience in [specific area] mentioned in the job posting"

    6. **Specific Recommendations**
    For each area of improvement, provide a concrete suggestion on how to modify the resume.
    Example: "Change 'Familiar with Python' to 'Proficient in Python, with 3+ years of experience in data analysis and automation'"

    7. **Achievements and Metrics**
    - Highlight quantifiable achievements present in the resume.
    - Suggest areas where more specific metrics could be added.

    8. **ATS Compatibility**
        - Check for any formatting issues that might cause problems with ATS parsing.
        - Suggest improvements for better ATS compatibility.

    9. **Positive Feedback**
    List items that align well with the job requirements, each starting with '+'.
    Example: "+ Strong background in [specific skill] that matches the job requirement"

    10. **Education and Certifications**
        - Evaluate the relevance of educational background and certifications to the job requirements.

    11. **Formatting and Layout Analysis**
        - Assess the resume's structure, readability, and professional appearance.
        - Suggest improvements for formatting if necessary.

    12. **Language and Tone Analysis**
        - Evaluate the professional tone and language used in the resume.
        - Suggest improvements for clarity and impact.

    13. **Industry-Specific Requirements**
        - Compare the resume against industry standards for the specific job role.

    14. **Length and Conciseness**
        - Assess if the resume length is appropriate for the candidate's experience level.
        - Suggest areas for concision if needed.

    Provide your analysis in a structured format, using markdown for bold text where appropriate. Ensure your feedback is detailed, constructive, and actionable. When feedback is positive, use a + before the sentence. When feedback is negative, use a - before the sentence.` },
      { role: "user", content: `\n\nJob Posting: ${jobPosting}\n\nResume: ${resumeText}` }
  ]})

  const analysis = response.choices[0].message.content
  console.log(analysis)
  return NextResponse.json({ analysis });
}