import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { LogOut, KeyRound } from "lucide-react";
import { Separator } from "./ui/separator";

interface TeacherProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeacherProfileDialog({ open, onOpenChange }: TeacherProfileDialogProps) {
  const teacherData = {
    name: "Dr. Sarah Johnson",
    teacherId: "TCH-2024-001",
    email: "sarah.johnson@school.edu",
    profileImage: "https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzMTk4NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
    // Add change password functionality
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add logout functionality
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="sr-only">Teacher Profile</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage your teacher profile information
        </DialogDescription>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* Profile Photo */}
          <div className="relative">
            <ImageWithFallback
              src={teacherData.profileImage}
              alt={teacherData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Teacher Information */}
          <div className="text-center space-y-3 w-full">
            <div>
              <h2 className="dark:text-white">{teacherData.name}</h2>
            </div>

            <div className="space-y-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Teacher ID</p>
                <p className="dark:text-white">{teacherData.teacherId}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="dark:text-white">{teacherData.email}</p>
              </div>
            </div>
          </div>

          <Separator className="w-full" />

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleChangePassword}
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Change Password
            </Button>

            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}