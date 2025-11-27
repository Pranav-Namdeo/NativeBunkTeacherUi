import { ArrowLeft, Mail, Phone, MessageCircle, Book, Video, FileText, HelpCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface HelpAndSupportProps {
  onBack: () => void;
}

export function HelpAndSupport({ onBack }: HelpAndSupportProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const quickHelpCards = [
    {
      icon: Book,
      title: "User Guide",
      description: "Learn how to use all features",
      color: "blue",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      color: "purple",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Browse technical docs",
      color: "green",
    },
    {
      icon: HelpCircle,
      title: "FAQs",
      description: "Find quick answers",
      color: "orange",
    },
  ];

  const faqs = [
    {
      question: "How do I mark attendance for students?",
      answer: "You can mark attendance by viewing the student list on the home tab. Each student card shows their current status (Active, Present, Absent, or Left Early). Click on any student to view their detailed profile and attendance history.",
    },
    {
      question: "How does the Random Ring feature work?",
      answer: "The Random Ring feature (bell icon) allows you to randomly select a student from your class. Click the floating bell button on the home screen, and the system will randomly pick a student for you to call upon.",
    },
    {
      question: "Can I view attendance records by semester and branch?",
      answer: "Yes! Click on the three-dot menu and select 'View Records'. You can then filter students by selecting a specific semester and branch from the dropdown menus.",
    },
    {
      question: "How do I switch between light and dark mode?",
      answer: "Click the theme toggle button (sun/moon icon) located in the header next to the three-dot menu. The app will instantly switch between light and dark themes.",
    },
    {
      question: "What do the different student status badges mean?",
      answer: "Active (Green): Student is currently in class. Present (Blue): Student has been marked present. Absent (Red): Student has not joined the class. Left Early (Orange): Student left before the class ended.",
    },
    {
      question: "How can I search for a specific student?",
      answer: "Use the search bar below the header on the home tab. You can search for students by their name or roll number.",
    },
    {
      question: "Can I see how long a student has been in class?",
      answer: "Yes, each student card displays a timer showing how long they have been in the class since they joined.",
    },
    {
      question: "How do I update my teacher profile?",
      answer: "Click on your profile picture in the top-left corner of the header to view and edit your profile information.",
    },
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@letsbunk.edu",
      action: "Send Email",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+1 (555) 123-4567",
      action: "Call Now",
      color: "green",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Available 24/7",
      action: "Start Chat",
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400";
      case "purple":
        return "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400";
      case "green":
        return "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400";
      case "orange":
        return "bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-800">
        <div className="flex items-center gap-4 px-6 py-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 dark:text-white" />
          </button>
          <h1 className="dark:text-white">Help & Support</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white">
            <h2 className="mb-2">How can we help you?</h2>
            <p className="text-blue-100 text-sm mb-4">
              Search our knowledge base or contact our support team
            </p>
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-gray-500 border-0"
            />
          </div>

          {/* Quick Help Cards */}
          <div>
            <h3 className="dark:text-white mb-4">Quick Help</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickHelpCards.map((card, index) => (
                <button
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow text-left"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${getColorClasses(
                      card.color
                    )} flex items-center justify-center mb-3`}
                  >
                    <card.icon className="w-6 h-6" />
                  </div>
                  <p className="dark:text-white text-sm mb-1">{card.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {card.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          <div>
            <h3 className="dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            {filteredFaqs.length > 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="px-6 hover:no-underline">
                        <span className="text-left dark:text-white">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-sm border dark:border-gray-800 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Contact Support Section */}
          <div>
            <h3 className="dark:text-white mb-4">Contact Support</h3>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm border dark:border-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${getColorClasses(
                        option.color
                      )} flex items-center justify-center flex-shrink-0`}
                    >
                      <option.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="dark:text-white mb-1">{option.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {option.value}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                    >
                      {option.action}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
            <h3 className="dark:text-white mb-4">Additional Resources</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-gray-700 dark:text-gray-300">
                  Terms of Service
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-gray-700 dark:text-gray-300">
                  Privacy Policy
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-gray-700 dark:text-gray-300">
                  Community Guidelines
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <span className="text-gray-700 dark:text-gray-300">
                  Report a Bug
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm pb-4">
            <p>LetsBunk Teacher Panel v1.2.0</p>
            <p className="text-xs mt-1">© 2024 LetsBunk. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
