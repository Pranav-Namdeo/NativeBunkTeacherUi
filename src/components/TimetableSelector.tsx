import { ChevronDown, GraduationCap, BookOpen, Check, ArrowRight } from "lucide-react";
import { useState } from "react";

interface TimetableSelectorProps {
  onSelect: (branch: string, semester: string) => void;
}

export function TimetableSelector({ onSelect }: TimetableSelectorProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);

  const branches = [
    { id: "cse", name: "Computer Science Engineering", icon: "💻" },
    { id: "ece", name: "Electronics & Communication", icon: "📡" },
    { id: "me", name: "Mechanical Engineering", icon: "⚙️" },
    { id: "ce", name: "Civil Engineering", icon: "🏗️" },
    { id: "ee", name: "Electrical Engineering", icon: "⚡" },
    { id: "it", name: "Information Technology", icon: "🖥️" },
  ];

  const semesters = [
    { id: "1", name: "1st Semester" },
    { id: "2", name: "2nd Semester" },
    { id: "3", name: "3rd Semester" },
    { id: "4", name: "4th Semester" },
    { id: "5", name: "5th Semester" },
    { id: "6", name: "6th Semester" },
    { id: "7", name: "7th Semester" },
    { id: "8", name: "8th Semester" },
  ];

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId);
    setBranchDropdownOpen(false);
  };

  const handleSemesterSelect = (semesterId: string) => {
    setSelectedSemester(semesterId);
    setSemesterDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      onSelect(selectedBranch, selectedSemester);
    }
  };

  const getSelectedBranchName = () => {
    const branch = branches.find((b) => b.id === selectedBranch);
    return branch ? `${branch.icon} ${branch.name}` : "Select Branch";
  };

  const getSelectedSemesterName = () => {
    const semester = semesters.find((s) => s.id === selectedSemester);
    return semester ? semester.name : "Select Semester";
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-6 text-white shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-6 h-6" />
          <h2>Select Timetable</h2>
        </div>
        <p className="text-blue-100 text-sm">
          Choose your branch and semester to view the timetable
        </p>
      </div>

      {/* Branch Selection */}
      <div className="mb-6">
        <label className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Branch</span>
        </label>
        <div className="relative">
          <button
            onClick={() => {
              setBranchDropdownOpen(!branchDropdownOpen);
              setSemesterDropdownOpen(false);
            }}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedBranch
                ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            }`}
          >
            <span
              className={`${
                selectedBranch
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {getSelectedBranchName()}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                branchDropdownOpen ? "rotate-180" : ""
              } ${
                selectedBranch
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
          </button>

          {/* Branch Dropdown */}
          {branchDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 shadow-lg max-h-80 overflow-y-auto">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => handleBranchSelect(branch.id)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0 dark:border-gray-800"
                >
                  <span className="text-2xl">{branch.icon}</span>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 dark:text-white">
                      {branch.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {branch.id.toUpperCase()}
                    </p>
                  </div>
                  {selectedBranch === branch.id && (
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Semester Selection */}
      <div className="mb-6">
        <label className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300">
          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Semester</span>
        </label>
        <div className="relative">
          <button
            onClick={() => {
              setSemesterDropdownOpen(!semesterDropdownOpen);
              setBranchDropdownOpen(false);
            }}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
              selectedSemester
                ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            }`}
          >
            <span
              className={`${
                selectedSemester
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {getSelectedSemesterName()}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                semesterDropdownOpen ? "rotate-180" : ""
              } ${
                selectedSemester
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
          </button>

          {/* Semester Dropdown */}
          {semesterDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700 shadow-lg max-h-80 overflow-y-auto">
              {semesters.map((semester) => (
                <button
                  key={semester.id}
                  onClick={() => handleSemesterSelect(semester.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b last:border-b-0 dark:border-gray-800"
                >
                  <span className="text-gray-900 dark:text-white">
                    {semester.name}
                  </span>
                  {selectedSemester === semester.id && (
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedBranch || !selectedSemester}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        <span>View Timetable</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {(!selectedBranch || !selectedSemester) && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
          Please select both branch and semester to continue
        </p>
      )}
    </div>
  );
}
