import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { StudentProfileDialog } from "./StudentProfileDialog";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "left" | "active";
  profileImage: string;
  joinTime: Date;
  email: string;
  attendancePercentage: number;
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNo: "CS001",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    joinTime: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    email: "aarav.sharma@college.edu",
    attendancePercentage: 92,
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNo: "CS002",
    status: "present",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    joinTime: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    email: "priya.patel@college.edu",
    attendancePercentage: 88,
  },
  {
    id: 3,
    name: "Rohan Kumar",
    rollNo: "CS003",
    status: "absent",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    joinTime: new Date(Date.now() - 0 * 60000),
    email: "rohan.kumar@college.edu",
    attendancePercentage: 65,
  },
  {
    id: 4,
    name: "Ananya Singh",
    rollNo: "CS004",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    joinTime: new Date(Date.now() - 32 * 60000), // 32 minutes ago
    email: "ananya.singh@college.edu",
    attendancePercentage: 95,
  },
  {
    id: 5,
    name: "Vikram Desai",
    rollNo: "CS005",
    status: "left",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    joinTime: new Date(Date.now() - 60 * 60000), // 60 minutes ago
    email: "vikram.desai@college.edu",
    attendancePercentage: 78,
  },
  {
    id: 6,
    name: "Sneha Reddy",
    rollNo: "CS006",
    status: "present",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    joinTime: new Date(Date.now() - 28 * 60000), // 28 minutes ago
    email: "sneha.reddy@college.edu",
    attendancePercentage: 90,
  },
  {
    id: 7,
    name: "Kabir Malhotra",
    rollNo: "CS007",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    joinTime: new Date(Date.now() - 22 * 60000), // 22 minutes ago
    email: "kabir.malhotra@college.edu",
    attendancePercentage: 85,
  },
  {
    id: 8,
    name: "Diya Gupta",
    rollNo: "CS008",
    status: "present",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    joinTime: new Date(Date.now() - 38 * 60000), // 38 minutes ago
    email: "diya.gupta@college.edu",
    attendancePercentage: 93,
  },
  {
    id: 9,
    name: "Arjun Verma",
    rollNo: "CS009",
    status: "active",
    profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
    joinTime: new Date(Date.now() - 12 * 60000), // 12 minutes ago
    email: "arjun.verma@college.edu",
    attendancePercentage: 87,
  },
  {
    id: 10,
    name: "Meera Iyer",
    rollNo: "CS010",
    status: "present",
    profileImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
    joinTime: new Date(Date.now() - 50 * 60000), // 50 minutes ago
    email: "meera.iyer@college.edu",
    attendancePercentage: 91,
  },
  {
    id: 11,
    name: "Aditya Joshi",
    rollNo: "CS011",
    status: "left",
    profileImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    joinTime: new Date(Date.now() - 55 * 60000), // 55 minutes ago
    email: "aditya.joshi@college.edu",
    attendancePercentage: 72,
  },
  {
    id: 12,
    name: "Ishita Nair",
    rollNo: "CS012",
    status: "present",
    profileImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    joinTime: new Date(Date.now() - 20 * 60000), // 20 minutes ago
    email: "ishita.nair@college.edu",
    attendancePercentage: 89,
  },
];

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

function StudentItem({ student, onClick }: { student: Student; onClick: () => void }) {
  const [elapsedTime, setElapsedTime] = useState("00:00");

  useEffect(() => {
    if (student.status === "absent") {
      setElapsedTime("00:00");
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - student.joinTime.getTime()) / 1000);
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      setElapsedTime(
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [student.joinTime, student.status]);

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border dark:border-gray-800 hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-center gap-4">
        {/* Left: Profile Image */}
        <ImageWithFallback
          src={student.profileImage}
          alt={student.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />

        {/* Middle: Name and Status */}
        <div className="flex-1 min-w-0">
          <p className="dark:text-white truncate">{student.name}</p>
          <Badge className={`mt-1 ${getStatusColor(student.status)}`}>
            {getStatusLabel(student.status)}
          </Badge>
        </div>

        {/* Right: Timer */}
        <div className="text-right flex-shrink-0">
          <p className="text-gray-900 dark:text-white tabular-nums">
            {elapsedTime}
          </p>
        </div>
      </div>
    </button>
  );
}

export function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="dark:text-white">Students Attending</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {mockStudents.filter((s) => s.status === "active" || s.status === "present").length} /{" "}
          {mockStudents.length} Present
        </p>
      </div>

      {mockStudents.map((student) => (
        <StudentItem 
          key={student.id} 
          student={student} 
          onClick={() => handleStudentClick(student)}
        />
      ))}

      <StudentProfileDialog 
        open={isProfileOpen} 
        onOpenChange={setIsProfileOpen}
        student={selectedStudent}
      />
    </div>
  );
}