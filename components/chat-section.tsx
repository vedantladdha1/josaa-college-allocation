"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chatOptions = [
  {
    category: "Application Process",
    questions: [
      "How do I register for JOSAA counselling?",
      "What documents are required for JOSAA registration?",
      "What is the fee for JOSAA counselling?",
      "How can I pay the JOSAA registration fee?",
      "Can I change my personal details after registration?",
    ],
  },
  {
    category: "Seat Allotment",
    questions: [
      "How does the seat allotment process work?",
      "What is the significance of different rounds in JOSAA?",
      "How can I check my seat allotment result?",
      "What happens if I don't accept the allotted seat?",
      "Can I participate in multiple rounds of counselling?",
    ],
  },
  {
    category: "Choice Filling",
    questions: [
      "How do I fill my choices for colleges and programs?",
      "Can I modify my choices after submission?",
      "What is the last date for choice filling?",
      "How many choices can I fill?",
      "What strategy should I use for choice filling?",
    ],
  },
  {
    category: "Technical Issues",
    questions: [
      "I'm facing issues with the JOSAA portal. What should I do?",
      "How can I reset my password?",
      "What to do if I made a mistake in my application?",
      "The website is not loading. How can I proceed?",
      "I'm unable to upload my documents. What should I do?",
    ],
  },
  {
    category: "Eligibility & Criteria",
    questions: [
      "What are the eligibility criteria for JOSAA counselling?",
      "How is the All India Rank (AIR) calculated?",
      "What is the minimum percentage required for admission?",
      "Are there any age restrictions for JOSAA counselling?",
      "Can foreign nationals participate in JOSAA counselling?",
    ],
  },
  {
    category: "Document Verification",
    questions: [
      "What documents are required for physical verification?",
      "When and where does document verification take place?",
      "What happens if I'm unable to produce all required documents?",
      "Can I submit provisional certificates?",
      "Is there a specific format for affidavits or certificates?",
    ],
  },
  {
    category: "Fee Payment",
    questions: [
      "What are the fee payment modes available?",
      "When do I need to pay the admission fee?",
      "Is there a different fee structure for different categories?",
      "What happens if I fail to pay the fee on time?",
      "Are there any additional charges apart from the tuition fee?",
    ],
  },
  {
    category: "Seat Withdrawal",
    questions: [
      "How can I withdraw from the allotted seat?",
      "What is the last date for seat withdrawal?",
      "Will I get a refund if I withdraw my seat?",
      "Can I participate in further rounds after withdrawing?",
      "What happens to my seat if I don't report to the allotted institute?",
    ],
  },
  {
    category: "Special Rounds",
    questions: [
      "What are special rounds in JOSAA counselling?",
      "Who can participate in special rounds?",
      "How are seats allocated in special rounds?",
      "Can I change my choices during special rounds?",
      "What happens if I don't get a seat in special rounds?",
    ],
  },
  {
    category: "Category & Quota",
    questions: [
      "What are the different categories and quotas in JOSAA?",
      "How does the reservation system work in JOSAA?",
      "Can I change my category after registration?",
      "What is the difference between Home State and Other State quota?",
      "How are seats distributed among different categories?",
    ],
  },
  {
    category: "Institute Specific Queries",
    questions: [
      "How can I find information about specific institutes?",
      "What are the differences between IITs, NITs, and IIITs?",
      "Are there any institute-specific eligibility criteria?",
      "How can I compare different institutes?",
      "What factors should I consider while choosing an institute?",
    ],
  },
  {
    category: "Post-Admission Process",
    questions: [
      "What should I do after getting admission through JOSAA?",
      "When does the academic session typically start?",
      "How can I apply for hostel accommodation?",
      "Are there any orientation programs for new students?",
      "What documents should I carry when reporting to the institute?",
    ],
  },
]

const responses = {
  "How do I register for JOSAA counselling?":
    "To register for JOSAA counselling, visit the official JOSAA website and click on the 'New Candidate Registration' button. Follow the steps to create your account and complete the registration process.",
  "What documents are required for JOSAA registration?":
    "For JOSAA registration, you typically need your JEE Main/Advanced admit card, Class 10th and 12th mark sheets, category certificate (if applicable), and a valid photo ID. Always check the official JOSAA website for the most up-to-date list of required documents.",
  "What is the fee for JOSAA counselling?":
    "The JOSAA counselling fee varies depending on your category. For the most accurate and current information, please visit the official JOSAA website or contact their helpdesk.",
  "How does the seat allotment process work?":
    "Seat allotment in JOSAA is based on your JEE rank, the choices you've filled, and the available seats. The system allocates seats to candidates with better ranks first, moving down the rank list until all seats are filled or all candidates are considered.",
  "What is the significance of different rounds in JOSAA?":
    "JOSAA conducts multiple rounds to ensure maximum seat occupancy. In each round, candidates can either accept their allotted seat, wait for a better option in the next round, or withdraw from the process. This allows for dynamic seat allocation based on vacancies and candidate preferences.",
  "How can I check my seat allotment result?":
    "To check your seat allotment result, log in to your JOSAA account during the allotment period. Navigate to the 'Seat Allotment Result' section to view your result. Make sure to check after each round of allotment.",
  "How do I fill my choices for colleges and programs?":
    "Log in to your JOSAA account and go to the 'Choice Filling' section. Here, you can select colleges and programs in order of your preference. You can add, remove, or reorder your choices before the deadline.",
  "Can I modify my choices after submission?":
    "Yes, you can modify your choices until the choice filling deadline. Log in to your JOSAA account, go to the 'Choice Filling' section, and make the necessary changes. Always save and lock your choices before the deadline.",
  "What is the last date for choice filling?":
    "The last date for choice filling varies each year. For the most accurate information, please check the official JOSAA website or the counselling schedule provided in your JOSAA account.",
  "I'm facing issues with the JOSAA portal. What should I do?":
    "If you're facing technical issues, try clearing your browser cache and cookies, or use a different browser. If the problem persists, contact the JOSAA helpdesk for assistance.",
  "How can I reset my password?":
    "To reset your password, go to the JOSAA login page and click on the 'Forgot Password' link. Follow the instructions to reset your password using your registered email or mobile number.",
  "What to do if I made a mistake in my application?":
    "If you've made a mistake in your application, contact the JOSAA helpdesk immediately. Depending on the nature of the mistake and the current stage of the counselling process, they will guide you on the possible corrective actions.",
  "How can I pay the JOSAA registration fee?":
    "You can typically pay the JOSAA registration fee online through the official JOSAA portal using various payment gateways such as debit cards, credit cards, net banking, etc.  Refer to the official website for the most up-to-date payment methods.",
  "Can I change my personal details after registration?":
    "Generally, you cannot change your personal details after registration.  If you find an error, contact the JOSAA helpdesk immediately for assistance.",
  "What happens if I don't accept the allotted seat?":
    "If you don't accept your allotted seat within the stipulated time, you will forfeit your chance for that round and may not be considered for subsequent rounds.  You will need to reapply in the next cycle if available.",
  "Can I participate in multiple rounds of counselling?":
    "Yes, you can participate in multiple rounds of JOSAA counselling, provided you meet the eligibility criteria and have not withdrawn from the process.",
  "How many choices can I fill?":
    "The number of choices you can fill varies each year. Check the official JOSAA website or your JOSAA account for the exact number of choices allowed.",
  "What strategy should I use for choice filling?":
    "Develop a choice filling strategy based on your preferences, considering factors like your AIR, branch preferences, college preferences, and location preferences.  Prioritize your choices strategically.",
  "The website is not loading. How can I proceed?":
    "If the JOSAA website is not loading, try checking your internet connection, clearing your browser cache and cookies, or trying a different browser. If the issue persists, contact the JOSAA helpdesk.",
  "I'm unable to upload my documents. What should I do?":
    "If you are unable to upload your documents, ensure the files are in the correct format and size as specified by JOSAA.  If the problem persists, contact the JOSAA helpdesk for assistance.",
  "What are the eligibility criteria for JOSAA counselling?":
    "Eligibility criteria for JOSAA counselling are based on your performance in JEE Main/Advanced and other specified criteria.  Refer to the official JOSAA website for the most up-to-date eligibility requirements.",
  "How is the All India Rank (AIR) calculated?":
    "The All India Rank (AIR) is calculated based on your normalized scores in JEE Main/Advanced. The exact calculation method is determined by the JOSAA authorities and is available on their official website.",
  "What is the minimum percentage required for admission?":
    "The minimum percentage required for admission varies depending on the college, branch, and category.  Check the specific admission requirements of the colleges you are interested in.",
  "Are there any age restrictions for JOSAA counselling?":
    "There may be age restrictions for certain programs or colleges.  Refer to the specific admission requirements of the colleges you are interested in.",
  "Can foreign nationals participate in JOSAA counselling?":
    "The participation of foreign nationals in JOSAA counselling is subject to specific rules and regulations.  Check the official JOSAA website for details.",
  "What documents are required for physical verification?":
    "Please refer to the official JOSAA website for the most up-to-date list of documents required for physical verification.",
  "When and where does document verification take place?":
    "The time and location for document verification will be specified in your admission letter or on the official JOSAA website.",
  "What happens if I'm unable to produce all required documents?":
    "If you cannot produce all required documents, your admission may be delayed or cancelled. Contact the JOSAA helpdesk for assistance.",
  "Can I submit provisional certificates?":
    "The acceptance of provisional certificates depends on the specific institute's policies. Check with the institute directly.",
  "Is there a specific format for affidavits or certificates?":
    "Refer to the official JOSAA website or your admission letter for specific format requirements for affidavits or certificates.",
  "What are the fee payment modes available?":
    "Fee payment modes typically include online payment gateways, debit cards, credit cards, and net banking. Check the official JOSAA website for the most up-to-date options.",
  "When do I need to pay the admission fee?":
    "The deadline for admission fee payment will be specified in your admission letter or on the official JOSAA website.",
  "Is there a different fee structure for different categories?":
    "Yes, there might be a different fee structure for different categories. Check the official JOSAA website for details.",
  "What happens if I fail to pay the fee on time?":
    "Failure to pay the fee on time may lead to the cancellation of your admission. Contact the JOSAA helpdesk for assistance.",
  "Are there any additional charges apart from the tuition fee?":
    "There might be additional charges such as hostel fees, examination fees, or other miscellaneous charges. Check the official JOSAA website or your admission letter for details.",
  "How can I withdraw from the allotted seat?":
    "The process for withdrawing from an allotted seat will be outlined in your admission letter or on the official JOSAA website.",
  "What is the last date for seat withdrawal?":
    "The last date for seat withdrawal will be specified in your admission letter or on the official JOSAA website.",
  "Will I get a refund if I withdraw my seat?":
    "Refund policies vary. Check the official JOSAA website or your admission letter for details on refunds.",
  "Can I participate in further rounds after withdrawing?":
    "Your eligibility for further rounds after withdrawing depends on the JOSAA rules and regulations. Check the official website for details.",
  "What happens to my seat if I don't report to the allotted institute?":
    "If you don't report to the allotted institute by the deadline, your seat may be forfeited.",
  "What are special rounds in JOSAA counselling?":
    "Special rounds are conducted to fill any remaining vacant seats after the regular rounds of counselling.",
  "Who can participate in special rounds?":
    "Eligibility for special rounds is determined by JOSAA and may depend on factors such as rank and availability of seats.",
  "How are seats allocated in special rounds?":
    "Seats are allocated in special rounds based on the available seats and the preferences of the participating candidates.",
  "Can I change my choices during special rounds?":
    "The possibility of changing choices during special rounds depends on the JOSAA guidelines for that year.",
  "What happens if I don't get a seat in special rounds?":
    "If you don't get a seat in special rounds, your counselling process for that year is concluded.",
  "What are the different categories and quotas in JOSAA?":
    "JOSAA follows the reservation policy of the Government of India.  Details of categories and quotas are available on the official JOSAA website.",
  "How does the reservation system work in JOSAA?":
    "The reservation system in JOSAA is based on the government's reservation policy, allocating seats to different categories based on pre-defined percentages.",
  "Can I change my category after registration?":
    "Generally, you cannot change your category after registration. Contact the JOSAA helpdesk immediately if you find an error.",
  "What is the difference between Home State and Other State quota?":
    "Home State quota reserves seats for candidates from the state where the institute is located, while Other State quota is for candidates from other states.",
  "How are seats distributed among different categories?":
    "Seats are distributed among different categories according to the government's reservation policy.  Details are available on the official JOSAA website.",
  "How can I find information about specific institutes?":
    "You can find information about specific institutes on their respective websites or through the JOSAA website.",
  "What are the differences between IITs, NITs, and IIITs?":
    "IITs, NITs, and IIITs are different types of engineering institutes with varying levels of prestige, specializations, and admission criteria.",
  "Are there any institute-specific eligibility criteria?":
    "Yes, some institutes may have additional eligibility criteria beyond the general JOSAA requirements.",
  "How can I compare different institutes?":
    "You can compare different institutes based on various factors such as ranking, faculty, research opportunities, location, and specializations.",
  "What factors should I consider while choosing an institute?":
    "Consider factors like your academic interests, career goals, location preferences, institute reputation, and available resources.",
  "What should I do after getting admission through JOSAA?":
    "After getting admission, carefully review your admission letter, pay the required fees, and follow the instructions for reporting to the institute.",
  "When does the academic session typically start?":
    "The academic session typically starts in July or August. Check your admission letter for the exact date.",
  "How can I apply for hostel accommodation?":
    "Hostel accommodation application procedures are usually outlined in the admission letter or on the institute's website.",
  "Are there any orientation programs for new students?":
    "Most institutes conduct orientation programs for new students. Check with your institute for details.",
  "What documents should I carry when reporting to the institute?":
    "Carry all the documents mentioned in your admission letter, including your academic certificates, identity proof, and fee receipts.",
}

export function ChatSection() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedQuestion, setSelectedQuestion] = useState("")
  const [response, setResponse] = useState("")

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedQuestion("")
    setResponse("")
  }

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question)
    setResponse(
      responses[question] ||
        "We don't have a specific answer for this question. Please contact JOSAA for more information.",
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Chat Assistance</h2>
      <Card>
        <CardHeader>
          <CardTitle>Select a Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {chatOptions.map((option) => (
              <Button
                key={option.category}
                onClick={() => handleCategorySelect(option.category)}
                variant={selectedCategory === option.category ? "default" : "outline"}
              >
                {option.category}
              </Button>
            ))}
          </div>
          {selectedCategory && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Select a Question</h3>
              <div className="space-y-2">
                {chatOptions
                  .find((option) => option.category === selectedCategory)
                  ?.questions.map((question) => (
                    <Button
                      key={question}
                      onClick={() => handleQuestionSelect(question)}
                      variant={selectedQuestion === question ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      {question}
                    </Button>
                  ))}
              </div>
            </div>
          )}
          {response && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Answer</h3>
              <p className="bg-gray-100 p-4 rounded">{response}</p>
            </div>
          )}
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              For more detailed information or specific queries, please{" "}
              <a
                href="https://josaa.nic.in/webinfo/Page/Page?PageId=1&LangId=P"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                contact JOSAA
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

