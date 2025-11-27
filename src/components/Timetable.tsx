import { Clock, MapPin, Calendar, Grid, RefreshCw, Loader2, Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface TimetableProps {
  branch: string;
  semester: string;
  onChangeSelection: () => void;
}

interface Period {
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  isBreak: boolean;
}

interface DaySchedule {
  day: string;
  periods: Period[];
}

export function Timetable({ branch, semester, onChangeSelection }: TimetableProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [viewMode, setViewMode] = useState<"day" | "week">("day");
  const [timetableData, setTimetableData] = useState<DaySchedule[]>([]);
  const [originalTimetableData, setOriginalTimetableData] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<{ day: string; index: number } | null>(null);
  const [editForm, setEditForm] = useState<Period>({
    periodNumber: 1,
    startTime: "",
    endTime: "",
    subject: "",
    room: "",
    isBreak: false,
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Set current day on mount
    const today = getCurrentDay();
    setSelectedDay(today);
    
    // Simulate API call to fetch timetable
    fetchTimetable();
  }, [branch, semester]);

  const getCurrentDay = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = new Date().getDay();
    const today = dayNames[dayIndex];
    
    // If it's Sunday, default to Monday
    if (today === "Sunday") return "Monday";
    return today;
  };

  const fetchTimetable = async () => {
    setLoading(true);
    
    // Simulate API call - Replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data based on branch and semester
    const mockData: DaySchedule[] = [
      {
        day: "Monday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Data Structures", room: "CS-101", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Algorithms", room: "CS-102", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "12:15", subject: "Database Systems", room: "CS-103", isBreak: false },
          { periodNumber: 4, startTime: "12:15", endTime: "01:15", subject: "Operating Systems", room: "CS-104", isBreak: false },
          { periodNumber: 0, startTime: "01:15", endTime: "02:00", subject: "Lunch Break", room: "", isBreak: true },
          { periodNumber: 5, startTime: "02:00", endTime: "03:00", subject: "Computer Networks", room: "CS-105", isBreak: false },
          { periodNumber: 6, startTime: "03:00", endTime: "04:00", subject: "Software Engineering", room: "CS-106", isBreak: false },
        ],
      },
      {
        day: "Tuesday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Web Development", room: "CS-201", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Machine Learning", room: "CS-202", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "12:15", subject: "Data Structures", room: "CS-101", isBreak: false },
          { periodNumber: 4, startTime: "12:15", endTime: "01:15", subject: "Algorithms", room: "CS-102", isBreak: false },
          { periodNumber: 0, startTime: "01:15", endTime: "02:00", subject: "Lunch Break", room: "", isBreak: true },
          { periodNumber: 5, startTime: "02:00", endTime: "04:00", subject: "DS Lab", room: "Lab-1", isBreak: false },
        ],
      },
      {
        day: "Wednesday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Database Systems", room: "CS-103", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Operating Systems", room: "CS-104", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "12:15", subject: "Computer Networks", room: "CS-105", isBreak: false },
          { periodNumber: 4, startTime: "12:15", endTime: "01:15", subject: "Software Engineering", room: "CS-106", isBreak: false },
          { periodNumber: 0, startTime: "01:15", endTime: "02:00", subject: "Lunch Break", room: "", isBreak: true },
          { periodNumber: 5, startTime: "02:00", endTime: "03:00", subject: "Web Development", room: "CS-201", isBreak: false },
          { periodNumber: 6, startTime: "03:00", endTime: "04:00", subject: "Machine Learning", room: "CS-202", isBreak: false },
        ],
      },
      {
        day: "Thursday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Data Structures", room: "CS-101", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Algorithms", room: "CS-102", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "12:15", subject: "Database Systems", room: "CS-103", isBreak: false },
          { periodNumber: 4, startTime: "12:15", endTime: "01:15", subject: "Operating Systems", room: "CS-104", isBreak: false },
          { periodNumber: 0, startTime: "01:15", endTime: "02:00", subject: "Lunch Break", room: "", isBreak: true },
          { periodNumber: 5, startTime: "02:00", endTime: "04:00", subject: "OS Lab", room: "Lab-2", isBreak: false },
        ],
      },
      {
        day: "Friday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Computer Networks", room: "CS-105", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Software Engineering", room: "CS-106", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "12:15", subject: "Web Development", room: "CS-201", isBreak: false },
          { periodNumber: 4, startTime: "12:15", endTime: "01:15", subject: "Machine Learning", room: "CS-202", isBreak: false },
          { periodNumber: 0, startTime: "01:15", endTime: "02:00", subject: "Lunch Break", room: "", isBreak: true },
          { periodNumber: 5, startTime: "02:00", endTime: "03:00", subject: "Project Work", room: "CS-301", isBreak: false },
          { periodNumber: 6, startTime: "03:00", endTime: "04:00", subject: "Seminar", room: "Auditorium", isBreak: false },
        ],
      },
      {
        day: "Saturday",
        periods: [
          { periodNumber: 1, startTime: "09:00", endTime: "10:00", subject: "Data Structures", room: "CS-101", isBreak: false },
          { periodNumber: 2, startTime: "10:00", endTime: "11:00", subject: "Algorithms", room: "CS-102", isBreak: false },
          { periodNumber: 0, startTime: "11:00", endTime: "11:15", subject: "Break", room: "", isBreak: true },
          { periodNumber: 3, startTime: "11:15", endTime: "01:15", subject: "Network Lab", room: "Lab-3", isBreak: false },
        ],
      },
    ];

    setTimetableData(mockData);
    setOriginalTimetableData(mockData);
    setLoading(false);
  };

  const getBranchName = (branchId: string) => {
    const branches: { [key: string]: string } = {
      cse: "Computer Science Engineering",
      ece: "Electronics & Communication",
      me: "Mechanical Engineering",
      ce: "Civil Engineering",
      ee: "Electrical Engineering",
      it: "Information Technology",
    };
    return branches[branchId] || branchId.toUpperCase();
  };

  const isCurrentPeriod = (period: Period): boolean => {
    if (selectedDay !== getCurrentDay()) return false;
    
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const [startHour, startMin] = period.startTime.split(":").map(Number);
    const [endHour, endMin] = period.endTime.split(":").map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getSelectedDaySchedule = () => {
    return timetableData.find(d => d.day === selectedDay);
  };

  const getDayShort = (day: string) => {
    return day.substring(0, 3);
  };

  const handleEnterEditMode = () => {
    setEditMode(true);
    setOriginalTimetableData(JSON.parse(JSON.stringify(timetableData)));
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setTimetableData(originalTimetableData);
    setEditingPeriod(null);
  };

  const handleSaveChanges = async () => {
    // Simulate API call to save changes
    await new Promise(resolve => setTimeout(resolve, 500));
    setEditMode(false);
    setEditingPeriod(null);
    // In real app, make API call here
    alert("Timetable updated successfully!");
  };

  const handleEditPeriod = (day: string, index: number) => {
    const daySchedule = timetableData.find(d => d.day === day);
    if (daySchedule) {
      setEditingPeriod({ day, index });
      setEditForm({ ...daySchedule.periods[index] });
    }
  };

  const handleDeletePeriod = (day: string, index: number) => {
    const updatedData = timetableData.map(d => {
      if (d.day === day) {
        return {
          ...d,
          periods: d.periods.filter((_, i) => i !== index)
        };
      }
      return d;
    });
    setTimetableData(updatedData);
  };

  const handleAddPeriod = (day: string) => {
    const daySchedule = timetableData.find(d => d.day === day);
    if (daySchedule) {
      const maxPeriod = Math.max(...daySchedule.periods.filter(p => !p.isBreak).map(p => p.periodNumber), 0);
      setEditingPeriod({ day, index: -1 });
      setEditForm({
        periodNumber: maxPeriod + 1,
        startTime: "",
        endTime: "",
        subject: "",
        room: "",
        isBreak: false,
      });
    }
  };

  const handleSavePeriod = () => {
    if (!editingPeriod) return;

    const updatedData = timetableData.map(d => {
      if (d.day === editingPeriod.day) {
        if (editingPeriod.index === -1) {
          // Add new period
          return {
            ...d,
            periods: [...d.periods, editForm].sort((a, b) => {
              const aTime = parseInt(a.startTime.replace(":", ""));
              const bTime = parseInt(b.startTime.replace(":", ""));
              return aTime - bTime;
            })
          };
        } else {
          // Edit existing period
          return {
            ...d,
            periods: d.periods.map((p, i) => i === editingPeriod.index ? editForm : p)
          };
        }
      }
      return d;
    });

    setTimetableData(updatedData);
    setEditingPeriod(null);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">Loading timetable...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 space-y-4">
      {/* Selection Info Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Selected Timetable
            </p>
            <h3 className="dark:text-white text-sm">
              {getBranchName(branch)} - Semester {semester}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {!editMode ? (
              <>
                <button
                  onClick={handleEnterEditMode}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={onChangeSelection}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Mode Banner */}
      {editMode && (
        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border-2 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <Edit className="w-4 h-4" />
            <p className="text-sm font-medium">
              Edit Mode Active - You can now modify, add, or delete periods
            </p>
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex gap-2 bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm border dark:border-gray-800">
        <button
          onClick={() => setViewMode("day")}
          className={`flex-1 py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
            viewMode === "day"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Day View</span>
        </button>
        <button
          onClick={() => setViewMode("week")}
          className={`flex-1 py-2 px-4 rounded-md transition-all flex items-center justify-center gap-2 ${
            viewMode === "week"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span className="text-sm">Week View</span>
        </button>
      </div>

      {/* Day Navigation */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {days.map((day) => {
            const isToday = day === getCurrentDay();
            const isSelected = day === selectedDay;
            
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                    : isToday
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800"
                }`}
              >
                <div className="text-xs mb-1">
                  {isToday && !isSelected && "Today"}
                  {isSelected && "Selected"}
                  {!isToday && !isSelected && <span className="opacity-0">-</span>}
                </div>
                <div className="font-medium">{getDayShort(day)}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day View */}
      {viewMode === "day" && (
        <div className="space-y-3">
          {getSelectedDaySchedule()?.periods.map((period, index) => {
            const isCurrent = isCurrentPeriod(period);
            
            if (period.isBreak) {
              return (
                <div
                  key={index}
                  className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-800"
                >
                  <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-400">
                    <span className="text-xl">☕</span>
                    <div>
                      <p className="font-medium">{period.subject}</p>
                      <p className="text-xs opacity-75">
                        {period.startTime} - {period.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`rounded-lg p-4 border-2 transition-all ${
                  isCurrent
                    ? "bg-green-50 dark:bg-green-950 border-green-500 dark:border-green-600 shadow-lg"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isCurrent
                          ? "bg-green-500 dark:bg-green-600 text-white"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      <span className="font-bold">{period.periodNumber}</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${isCurrent ? "text-green-900 dark:text-green-100" : "dark:text-white"}`}>
                        {period.subject}
                      </h4>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {period.startTime} - {period.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCurrent && !editMode && (
                      <span className="bg-green-500 dark:bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium animate-pulse">
                        Now
                      </span>
                    )}
                    {editMode && (
                      <>
                        <button
                          onClick={() => handleEditPeriod(selectedDay, index)}
                          className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePeriod(selectedDay, index)}
                          className="p-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{period.room}</span>
                </div>
              </div>
            );
          })}
          
          {/* Add Period Button */}
          {editMode && (
            <button
              onClick={() => handleAddPeriod(selectedDay)}
              className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Period</span>
            </button>
          )}
        </div>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-3 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                    Period
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className={`px-4 py-3 text-center text-xs font-medium border-r last:border-r-0 dark:border-gray-700 ${
                        day === getCurrentDay()
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div>{getDayShort(day)}</div>
                      {day === getCurrentDay() && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Today</div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-800">
                {Array.from({ length: 6 }, (_, periodIndex) => {
                  const periodNum = periodIndex + 1;
                  
                  return (
                    <tr key={periodNum} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="sticky left-0 z-10 bg-white dark:bg-gray-900 px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border-r dark:border-gray-700">
                        P{periodNum}
                      </td>
                      {days.map((day) => {
                        const daySchedule = timetableData.find(d => d.day === day);
                        const period = daySchedule?.periods.find(
                          p => p.periodNumber === periodNum
                        );
                        
                        if (!period) {
                          return (
                            <td
                              key={day}
                              className={`px-2 py-3 text-center text-xs text-gray-400 dark:text-gray-600 border-r last:border-r-0 dark:border-gray-800 ${
                                editMode ? "cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950" : ""
                              }`}
                              onDoubleClick={() => editMode && handleAddPeriod(day)}
                              title={editMode ? "Double-click to add period" : ""}
                            >
                              -
                            </td>
                          );
                        }

                        const isCurrent = isCurrentPeriod(period) && day === selectedDay;
                        const periodIndex = daySchedule.periods.findIndex(p => p.periodNumber === periodNum);

                        return (
                          <td
                            key={day}
                            className={`px-2 py-3 text-center text-xs border-r last:border-r-0 dark:border-gray-800 ${
                              isCurrent
                                ? "bg-green-100 dark:bg-green-950"
                                : ""
                            } ${
                              editMode ? "cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950" : ""
                            }`}
                            onDoubleClick={() => editMode && handleEditPeriod(day, periodIndex)}
                            title={editMode ? "Double-click to edit period" : ""}
                          >
                            <div className="font-medium text-gray-900 dark:text-white mb-0.5">
                              {truncateText(period.subject, 10)}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                              {period.room}
                            </div>
                            {isCurrent && (
                              <div className="mt-1">
                                <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                  Now
                                </span>
                              </div>
                            )}
                            {editMode && (
                              <div className="mt-1 opacity-0 hover:opacity-100 transition-opacity">
                                <span className="text-blue-600 dark:text-blue-400 text-xs">
                                  ✎
                                </span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {/* Break Row */}
                <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                  <td className="sticky left-0 z-10 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 text-sm font-medium text-yellow-700 dark:text-yellow-400 border-r dark:border-yellow-800">
                    Break
                  </td>
                  {days.map((day) => (
                    <td
                      key={day}
                      className="px-2 py-2 text-center text-xs text-yellow-700 dark:text-yellow-400 border-r last:border-r-0 dark:border-yellow-800"
                    >
                      <span className="text-lg">☕</span>
                      <div className="text-xs mt-0.5">11:00-11:15</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Current Time Info */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border dark:border-blue-800">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Clock className="w-4 h-4" />
          <p className="text-sm">
            Current time: <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
          </p>
        </div>
      </div>

      {/* Edit/Add Period Modal */}
      {editingPeriod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium dark:text-white">
                  {editingPeriod.index === -1 ? "Add New Period" : "Edit Period"}
                </h3>
                <button
                  onClick={() => setEditingPeriod(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Period Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Period Number
                  </label>
                  <input
                    type="number"
                    value={editForm.periodNumber}
                    onChange={(e) => setEditForm({ ...editForm, periodNumber: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={editForm.subject}
                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Data Structures"
                  />
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={editForm.startTime}
                      onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                      className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={editForm.endTime}
                      onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                      className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Room */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room/Lab
                  </label>
                  <input
                    type="text"
                    value={editForm.room}
                    onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                    className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., CS-101"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSavePeriod}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Period
                </button>
                <button
                  onClick={() => setEditingPeriod(null)}
                  className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}