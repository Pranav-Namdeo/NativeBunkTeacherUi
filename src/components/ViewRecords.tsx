import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { StudentProfileDialog } from "./StudentProfileDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "left" | "active";
  profileImage: string;
  email: string;
  attendancePercentage: number;
  semester: number;
  branch: string;
  joinTime: Date;
}

// Mock student data for different semesters and branches
const generateStudents = (semester: number, branch: string): Student[] => {
  const branchCode = branch.split(" - ")[0];
  const students = [
    {
      names: ["Aarav Sharma", "Priya Patel", "Rohan Kumar", "Ananya Singh"],
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      ],
      statuses: ["active", "present", "absent", "left"] as const,
    },
    {
      names: ["Vikram Desai", "Sneha Reddy", "Kabir Malhotra", "Diya Gupta"],
      images: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      ],
      statuses: ["present", "active", "present", "active"] as const,
    },
    {
      names: ["Arjun Verma", "Meera Iyer", "Aditya Joshi", "Ishita Nair"],
      images: [
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
      ],
      statuses: ["active", "present", "left", "present"] as const,
    },
  ];

  const result: Student[] = [];
  const groupIndex = (semester - 1) % 3;
  const group = students[groupIndex];

  for (let i = 0; i < group.names.length; i++) {
    result.push({
      id: semester * 1000 + i,
      name: group.names[i],
      rollNo: `${branchCode}${semester}${(i + 1).toString().padStart(3, "0")}`,
      status: group.statuses[i],
      profileImage: group.images[i],
      email: `${group.names[i].toLowerCase().replace(" ", ".")}@college.edu`,
      attendancePercentage: Math.floor(Math.random() * 30) + 70,
      semester,
      branch,
      joinTime: new Date(),
    });
  }

  return result;
};

const getStatusColor = (status: Student["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400";
    case "present":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
    case "absent":
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
    case "left":
      return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

const getStatusLabel = (status: Student["status"]) => {
  switch (status) {
    case "active":
      return "Active";
    case "present":
      return "Present";
    case "absent":
      return "Absent";
    case "left":
      return "Left Early";
    default:
      return "Unknown";
  }
};

interface ViewRecordsProps {
  onBack: () => void;
}

export function ViewRecords({ onBack }: ViewRecordsProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const semesters = [
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
    "Semester 5",
    "Semester 6",
    "Semester 7",
    "Semester 8",
  ];

  const branches = [
    "CS - Computer Science",
    "IT - Information Technology",
    "ECE - Electronics & Communication",
    "EEE - Electrical Engineering",
    "ME - Mechanical Engineering",
    "CE - Civil Engineering",
  ];

  const students =
    selectedSemester && selectedBranch
      ? generateStudents(
          parseInt(selectedSemester.replace("Semester ", "")),
          selectedBranch
        )
      : [];

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

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
          <h1 className="dark:text-white">View Records</h1>
        </div>
      </header>

      {/* Selection Section */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-6 space-y-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Semester Select */}
          <div className="space-y-2">
            <label className="dark:text-gray-300">Select Semester</label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Choose semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester} value={semester}>
                    {semester}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Branch Select */}
          <div className="space-y-2">
            <label className="dark:text-gray-300">Select Branch</label>
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Choose branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Student List */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        {selectedSemester && selectedBranch ? (
          <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="dark:text-white">
                {selectedBranch.split(" - ")[0]} - {selectedSemester}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {students.length} Students
              </p>
            </div>

            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentClick(student)}
                className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <ImageWithFallback
                    src={student.profileImage}
                    alt={student.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Name and Roll */}
                  <div className="flex-1 min-w-0">
                    <p className="dark:text-white truncate">{student.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {student.rollNo}
                    </p>
                  </div>

                  {/* Status and Attendance */}
                  <div className="text-right flex-shrink-0 space-y-1">
                    <Badge className={getStatusColor(student.status)}>
                      {getStatusLabel(student.status)}
                    </Badge>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {student.attendancePercentage}% Attendance
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">
              No Selection Made
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Please select both semester and branch to view student records
            </p>
          </div>
        )}
      </main>

      {/* Student Profile Dialog */}
      <StudentProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        student={selectedStudent}
      />
    </div>
  );
}