import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { DateDetailsModal } from "./DateDetailsModal";

interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "leave" | null;
  lectures: {
    subject: string;
    time: string;
    duration: number;
    attended: boolean;
  }[];
  totalTime: number;
  attendedTime: number;
  percentage: number;
}

interface Holiday {
  date: string;
  name: string;
  description: string;
  type: "national" | "religious" | "exam" | "academic";
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with actual data
  const holidays: Holiday[] = [
    {
      date: "2024-11-26",
      name: "Constitution Day",
      description: "National holiday celebrating the adoption of the Indian Constitution",
      type: "national",
    },
    {
      date: "2024-11-15",
      name: "Guru Nanak Jayanti",
      description: "Birth anniversary of Guru Nanak Dev Ji",
      type: "religious",
    },
    {
      date: "2024-11-28",
      name: "Mid-Term Examination",
      description: "Mathematics mid-term exam",
      type: "exam",
    },
    {
      date: "2024-11-20",
      name: "Tech Fest",
      description: "Annual technical festival",
      type: "academic",
    },
  ];

  const attendanceData: { [key: string]: AttendanceRecord } = {
    "2024-11-01": {
      date: "2024-11-01",
      status: "present",
      lectures: [
        { subject: "Mathematics", time: "9:00 AM", duration: 60, attended: true },
        { subject: "Physics", time: "10:00 AM", duration: 60, attended: true },
        { subject: "Chemistry", time: "11:00 AM", duration: 60, attended: true },
      ],
      totalTime: 180,
      attendedTime: 180,
      percentage: 100,
    },
    "2024-11-04": {
      date: "2024-11-04",
      status: "absent",
      lectures: [
        { subject: "Mathematics", time: "9:00 AM", duration: 60, attended: false },
        { subject: "Physics", time: "10:00 AM", duration: 60, attended: false },
      ],
      totalTime: 120,
      attendedTime: 0,
      percentage: 0,
    },
    "2024-11-05": {
      date: "2024-11-05",
      status: "present",
      lectures: [
        { subject: "English", time: "9:00 AM", duration: 60, attended: true },
        { subject: "Computer Science", time: "10:00 AM", duration: 60, attended: true },
        { subject: "Chemistry", time: "11:00 AM", duration: 60, attended: false },
      ],
      totalTime: 180,
      attendedTime: 120,
      percentage: 67,
    },
    "2024-11-08": {
      date: "2024-11-08",
      status: "present",
      lectures: [
        { subject: "Mathematics", time: "9:00 AM", duration: 60, attended: true },
        { subject: "Physics", time: "10:00 AM", duration: 60, attended: true },
        { subject: "Chemistry", time: "11:00 AM", duration: 60, attended: true },
        { subject: "English", time: "12:00 PM", duration: 60, attended: true },
      ],
      totalTime: 240,
      attendedTime: 240,
      percentage: 100,
    },
    "2024-11-11": {
      date: "2024-11-11",
      status: "leave",
      lectures: [],
      totalTime: 0,
      attendedTime: 0,
      percentage: 0,
    },
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const formatDateKey = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${year}-${month}-${dayStr}`;
  };

  const getHolidayForDate = (day: number): Holiday | undefined => {
    const dateKey = formatDateKey(day);
    return holidays.find((h) => h.date === dateKey);
  };

  const getAttendanceForDate = (day: number): AttendanceRecord | undefined => {
    const dateKey = formatDateKey(day);
    return attendanceData[dateKey];
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-orange-500";
      case "religious":
        return "bg-red-500";
      case "exam":
        return "bg-purple-500";
      case "academic":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getHolidayTypeIcon = (type: string) => {
    switch (type) {
      case "national":
        return "🏖️";
      case "religious":
        return "🎉";
      case "exam":
        return "📝";
      case "academic":
        return "🎓";
      default:
        return "📅";
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "leave":
        return "bg-yellow-500";
      default:
        return "";
    }
  };

  // Calculate month stats
  const calculateMonthStats = () => {
    let presentDays = 0;
    let absentDays = 0;
    let totalDays = 0;

    Object.values(attendanceData).forEach((record) => {
      const recordDate = new Date(record.date);
      if (
        recordDate.getMonth() === currentDate.getMonth() &&
        recordDate.getFullYear() === currentDate.getFullYear()
      ) {
        if (record.status === "present") presentDays++;
        if (record.status === "absent") absentDays++;
        if (record.status !== "leave" && record.status !== null) totalDays++;
      }
    });

    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    return { presentDays, absentDays, percentage, totalDays };
  };

  const stats = calculateMonthStats();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const holiday = getHolidayForDate(day);
    const attendance = getAttendanceForDate(day);
    const isTodayDate = isToday(day);

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`aspect-square p-1 rounded-lg relative transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
          isTodayDate
            ? "ring-2 ring-blue-600 dark:ring-blue-400"
            : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <span
            className={`text-sm ${
              isTodayDate
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {day}
          </span>

          {/* Holiday indicator */}
          {holiday && (
            <div className="absolute top-0 right-0 text-xs">
              {getHolidayTypeIcon(holiday.type)}
            </div>
          )}

          {/* Attendance status indicator */}
          {attendance && !holiday && (
            <div
              className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${getStatusColor(
                attendance.status
              )}`}
            />
          )}
        </div>
      </button>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 space-y-4">
      {/* Month Stats Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-sm border dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="dark:text-white">
            {monthNames[currentDate.getMonth()]} Stats
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <p className="text-gray-500 dark:text-gray-400 text-xs">Present</p>
            </div>
            <p className="text-green-600 dark:text-green-400">{stats.presentDays}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <p className="text-gray-500 dark:text-gray-400 text-xs">Absent</p>
            </div>
            <p className="text-red-600 dark:text-red-400">{stats.absentDays}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <p className="text-gray-500 dark:text-gray-400 text-xs">Rate</p>
            </div>
            <p className="text-blue-600 dark:text-blue-400">{stats.percentage}%</p>
          </div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800">
        <div className="flex items-center justify-between px-5 py-4 border-b dark:border-gray-800">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 dark:text-white" />
          </button>
          <h3 className="dark:text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 dark:text-white" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs text-gray-500 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">{days}</div>
        </div>

        {/* Legend */}
        <div className="px-5 py-4 border-t dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Legend:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-700 dark:text-gray-300">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-700 dark:text-gray-300">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">Leave</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏖️</span>
              <span className="text-gray-700 dark:text-gray-300">National</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎉</span>
              <span className="text-gray-700 dark:text-gray-300">Religious</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📝</span>
              <span className="text-gray-700 dark:text-gray-300">Exam</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎓</span>
              <span className="text-gray-700 dark:text-gray-300">Academic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Details Modal */}
      {selectedDate && (
        <DateDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={selectedDate}
          holiday={getHolidayForDate(selectedDate.getDate())}
          attendance={getAttendanceForDate(selectedDate.getDate())}
        />
      )}
    </div>
  );
}
