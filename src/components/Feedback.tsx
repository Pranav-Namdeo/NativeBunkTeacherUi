import { ArrowLeft, Star, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface FeedbackProps {
  onBack: () => void;
}

export function Feedback({ onBack }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { id: "bug", label: "Bug Report", emoji: "🐛" },
    { id: "feature", label: "Feature Request", emoji: "💡" },
    { id: "improvement", label: "Improvement", emoji: "⚡" },
    { id: "compliment", label: "Compliment", emoji: "❤️" },
    { id: "other", label: "Other", emoji: "💬" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setRating(0);
      setFeedbackType("");
      setSubject("");
      setMessage("");
    }, 3000);
  };

  const isFormValid = rating > 0 && feedbackType && subject && message;

  if (isSubmitted) {
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
            <h1 className="dark:text-white">Feedback</h1>
          </div>
        </header>

        {/* Success Message */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="dark:text-white mb-3">Thank You!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your feedback has been submitted successfully. We appreciate your
              input and will review it shortly.
            </p>
            <Button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            >
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
          <h1 className="dark:text-white">Feedback</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-2xl mx-auto px-6 py-6">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white mb-6">
            <h2 className="mb-2">We'd Love Your Feedback!</h2>
            <p className="text-blue-100 text-sm">
              Help us improve LetsBunk by sharing your thoughts, reporting bugs,
              or suggesting new features.
            </p>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Section */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
              <label className="block mb-3 dark:text-white">
                How would you rate your experience?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {rating === 1 && "Poor - We'll work to improve"}
                  {rating === 2 && "Fair - There's room for improvement"}
                  {rating === 3 && "Good - We're getting there"}
                  {rating === 4 && "Very Good - Glad you like it!"}
                  {rating === 5 && "Excellent - Thank you!"}
                </p>
              )}
            </div>

            {/* Feedback Type */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
              <label className="block mb-3 dark:text-white">
                What type of feedback is this?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFeedbackType(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      feedbackType === type.id
                        ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.emoji}</div>
                    <div
                      className={`text-sm ${
                        feedbackType === type.id
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
              <label className="block mb-3 dark:text-white">
                Subject
              </label>
              <Input
                type="text"
                placeholder="Brief summary of your feedback"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              />
            </div>

            {/* Message */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
              <label className="block mb-3 dark:text-white">
                Your Feedback
              </label>
              <Textarea
                placeholder="Please provide detailed feedback. The more information you share, the better we can help!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="dark:bg-gray-950 dark:border-gray-700 dark:text-white resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {message.length} / 500 characters
              </p>
            </div>

            {/* Contact Information (Optional) */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
              <label className="block mb-3 dark:text-white">
                Email Address{" "}
                <span className="text-gray-400 text-sm">(Optional)</span>
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="dark:bg-gray-950 dark:border-gray-700 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                We'll only use this to follow up on your feedback if needed
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>

            {!isFormValid && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Please complete all required fields to submit
              </p>
            )}
          </form>

          {/* Privacy Note */}
          <div className="mt-6 mb-4 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>
              Your feedback is valuable to us. We respect your privacy and will
              never share your information with third parties.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
