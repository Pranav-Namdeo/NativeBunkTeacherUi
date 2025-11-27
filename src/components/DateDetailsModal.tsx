import { X, Calendar, CheckCircle, XCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface Holiday {
  date: string;
  name: string;
  description: string;
  type: "national" | "religious" | "exam" | "academic";
}

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

interface DateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  holiday?: Holiday;
  attendance?: AttendanceRecord;
}

export function DateDetailsModal({
  isOpen,
  onClose,
  date,
  holiday,
  attendance,
}: DateDetailsModalProps) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formattedDate = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const getHolidayTypeColor = (type: string) => {
    switch (type) {
      case "national":
        return "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "religious":
        return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "exam":
        return "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "academic":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
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

  const getStatusInfo = (status: string | null) => {
    switch (status) {
      case "present":
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-950",
          label: "Present",
        };
      case "absent":
        return {
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-950",
          label: "Absent",
        };
      case "leave":
        return {
          icon: AlertCircle,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-100 dark:bg-yellow-950",
          label: "On Leave",
        };
      default:
        return {
          icon: Calendar,
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-800",
          label: "No Record",
        };
    }
  };

  const statusInfo = attendance ? getStatusInfo(attendance.status) : getStatusInfo(null);
  const StatusIcon = statusInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="dark:text-white mb-1">
                {date.getDate()}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 dark:text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Holiday Information */}
          {holiday && (
            <div className={`p-4 rounded-lg border ${getHolidayTypeColor(holiday.type)}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getHolidayTypeIcon(holiday.type)}</span>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{holiday.name}</h4>
                  <p className="text-sm opacity-90">{holiday.description}</p>
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-black/20">
                    {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)} Holiday
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Status */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border dark:border-gray-800">
            <h4 className="dark:text-white mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Attendance Status
            </h4>
            <div className={`flex items-center gap-3 p-3 rounded-lg ${statusInfo.bgColor}`}>
              <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
              <div>
                <p className={`font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </p>
                {attendance && attendance.status !== "leave" && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {attendance.attendedTime} / {attendance.totalTime} minutes
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Lecture-wise Breakdown */}
          {attendance && attendance.lectures.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border dark:border-gray-800">
              <h4 className="dark:text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Lecture Breakdown
              </h4>
              <div className="space-y-2">
                {attendance.lectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium dark:text-white">
                        {lecture.subject}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {lecture.time} • {lecture.duration} mins
                      </p>
                    </div>
                    {lecture.attended ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day Summary */}
          {attendance && attendance.status !== "leave" && (
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-lg p-4 text-white">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" />
                <h4>Day Summary</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-100 text-xs mb-1">Total Classes</p>
                  <p className="text-xl">{attendance.lectures.length}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs mb-1">Attended</p>
                  <p className="text-xl">
                    {attendance.lectures.filter((l) => l.attended).length}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs mb-1">Total Time</p>
                  <p className="text-xl">{attendance.totalTime} min</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs mb-1">Attendance %</p>
                  <p className="text-xl">{attendance.percentage}%</p>
                </div>
              </div>
            </div>
          )}

          {/* No Data Message */}
          {!holiday && !attendance && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">
                No data available for this date
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}