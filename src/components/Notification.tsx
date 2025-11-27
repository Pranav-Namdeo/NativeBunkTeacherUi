import { ArrowLeft, Send, Users, GraduationCap, Building2, ChevronDown } from "lucide-react";
import { useState } from "react";

interface NotificationProps {
  onBack: () => void;
}

export function Notification({ onBack }: NotificationProps) {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "semester" | "branch" | "both">("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [sending, setSending] = useState(false);

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const branches = [
    { id: "cse", name: "Computer Science Engineering" },
    { id: "ece", name: "Electronics & Communication" },
    { id: "me", name: "Mechanical Engineering" },
    { id: "ce", name: "Civil Engineering" },
    { id: "ee", name: "Electrical Engineering" },
    { id: "it", name: "Information Technology" },
  ];

  const handleFilterChange = (filter: "all" | "semester" | "branch" | "both") => {
    setSelectedFilter(filter);
    if (filter === "all") {
      setSelectedSemester("");
      setSelectedBranch("");
    } else if (filter === "semester") {
      setSelectedBranch("");
    } else if (filter === "branch") {
      setSelectedSemester("");
    }
  };

  const getRecipientCount = () => {
    if (selectedFilter === "all") return "All Students";
    if (selectedFilter === "semester" && selectedSemester) {
      return `Semester ${selectedSemester} Students`;
    }
    if (selectedFilter === "branch" && selectedBranch) {
      const branch = branches.find(b => b.id === selectedBranch);
      return `${branch?.name} Students`;
    }
    if (selectedFilter === "both" && selectedSemester && selectedBranch) {
      const branch = branches.find(b => b.id === selectedBranch);
      return `${branch?.name} - Semester ${selectedSemester}`;
    }
    return "Select recipients";
  };

  const handleSendNotification = async () => {
    if (!notificationTitle.trim() || !notificationMessage.trim()) {
      alert("Please enter both title and message");
      return;
    }

    if (selectedFilter === "semester" && !selectedSemester) {
      alert("Please select a semester");
      return;
    }

    if (selectedFilter === "branch" && !selectedBranch) {
      alert("Please select a branch");
      return;
    }

    if (selectedFilter === "both" && (!selectedSemester || !selectedBranch)) {
      alert("Please select both semester and branch");
      return;
    }

    setSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSending(false);
    alert(`Notification sent to ${getRecipientCount()}!`);
    
    // Reset form
    setNotificationTitle("");
    setNotificationMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800">
        <div className="flex items-center px-6 py-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 dark:text-white" />
          </button>
          <h1 className="ml-4 dark:text-white">Send Notification</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6 space-y-6">
        {/* Filter Options */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Select Recipients
          </h2>

          <div className="space-y-3">
            {/* All Students */}
            <label
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFilter === "all"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="filter"
                  checked={selectedFilter === "all"}
                  onChange={() => handleFilterChange("all")}
                  className="w-4 h-4 text-blue-600"
                />
                <div>
                  <div className="font-medium dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    All Students
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Send notification to everyone
                  </p>
                </div>
              </div>
            </label>

            {/* Semester */}
            <label
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFilter === "semester"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="radio"
                  name="filter"
                  checked={selectedFilter === "semester"}
                  onChange={() => handleFilterChange("semester")}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-medium dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Semester
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Send to specific semester
                  </p>
                </div>
              </div>
            </label>

            {/* Semester Dropdown */}
            {selectedFilter === "semester" && (
              <div className="ml-7 relative">
                <button
                  onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <span className={selectedSemester ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                    {selectedSemester ? `Semester ${selectedSemester}` : "Select Semester"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSemesterDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {semesters.map((sem) => (
                      <button
                        key={sem}
                        onClick={() => {
                          setSelectedSemester(sem);
                          setShowSemesterDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedSemester === sem
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            : "dark:text-white"
                        }`}
                      >
                        Semester {sem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Branch */}
            <label
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFilter === "branch"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="radio"
                  name="filter"
                  checked={selectedFilter === "branch"}
                  onChange={() => handleFilterChange("branch")}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-medium dark:text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Branch
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Send to specific branch
                  </p>
                </div>
              </div>
            </label>

            {/* Branch Dropdown */}
            {selectedFilter === "branch" && (
              <div className="ml-7 relative">
                <button
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                  className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <span className={selectedBranch ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                    {selectedBranch
                      ? branches.find((b) => b.id === selectedBranch)?.name
                      : "Select Branch"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showBranchDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => {
                          setSelectedBranch(branch.id);
                          setShowBranchDropdown(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          selectedBranch === branch.id
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                            : "dark:text-white"
                        }`}
                      >
                        {branch.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Semester + Branch Combined */}
            <label
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFilter === "both"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-600"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="radio"
                  name="filter"
                  checked={selectedFilter === "both"}
                  onChange={() => handleFilterChange("both")}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="flex-1">
                  <div className="font-medium dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <Building2 className="w-4 h-4" />
                    Semester + Branch
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Send to specific semester and branch
                  </p>
                </div>
              </div>
            </label>

            {/* Both Dropdowns */}
            {selectedFilter === "both" && (
              <div className="ml-7 space-y-3">
                {/* Semester Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Semester
                  </label>
                  <button
                    onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
                    className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <span className={selectedSemester ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                      {selectedSemester ? `Semester ${selectedSemester}` : "Select Semester"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showSemesterDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {semesters.map((sem) => (
                        <button
                          key={sem}
                          onClick={() => {
                            setSelectedSemester(sem);
                            setShowSemesterDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            selectedSemester === sem
                              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                              : "dark:text-white"
                          }`}
                        >
                          Semester {sem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Branch Dropdown */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Branch
                  </label>
                  <button
                    onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                    className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <span className={selectedBranch ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                      {selectedBranch
                        ? branches.find((b) => b.id === selectedBranch)?.name
                        : "Select Branch"}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showBranchDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {branches.map((branch) => (
                        <button
                          key={branch.id}
                          onClick={() => {
                            setSelectedBranch(branch.id);
                            setShowBranchDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            selectedBranch === branch.id
                              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                              : "dark:text-white"
                          }`}
                        >
                          {branch.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Selected Recipients Display */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-medium">Recipients:</span> {getRecipientCount()}
            </p>
          </div>
        </div>

        {/* Notification Form */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-6">
          <h2 className="text-lg font-medium dark:text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Notification Details
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                placeholder="Enter notification title"
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter notification message"
                rows={6}
                className="w-full px-4 py-3 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Character Count */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{notificationMessage.length} characters</span>
              <span>{notificationTitle.length > 0 && notificationMessage.length > 0 ? "Ready to send" : "Fill in all fields"}</span>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendNotification}
          disabled={sending}
          className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
            sending
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          } text-white`}
        >
          <Send className="w-5 h-5" />
          {sending ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
}
