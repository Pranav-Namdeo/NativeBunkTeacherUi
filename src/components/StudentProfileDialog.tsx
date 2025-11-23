import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface StudentProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
}

export function StudentProfileDialog({
  open,
  onOpenChange,
  student,
}: StudentProfileDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
          <DialogDescription>
            View student information and attendance details
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Profile Photo */}
          <ImageWithFallback
            src={student.profileImage}
            alt={student.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
          />

          {/* Student Information */}
          <div className="w-full space-y-4">
            {/* Name */}
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Name</p>
              <p className="dark:text-white mt-1">{student.name}</p>
            </div>

            {/* Enrollment Number */}
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Enrollment Number
              </p>
              <p className="dark:text-white mt-1">{student.rollNo}</p>
            </div>

            {/* Email */}
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
              <p className="dark:text-white mt-1 break-all">{student.email}</p>
            </div>

            {/* Attendance Percentage */}
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Attendance Percentage
              </p>
              <div className="mt-2">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-950">
                  <span className="text-blue-700 dark:text-blue-400">
                    {student.attendancePercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
