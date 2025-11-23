import { MoreVertical } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { TeacherProfileDialog } from "./TeacherProfileDialog";
import { useState } from "react";

export function TeacherHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Teacher Profile */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1544972917-3529b113a469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzMTk4NTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Teacher Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        </button>

        {/* Center: App Name */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 dark:text-white">
          Let's Bunk
        </h1>

        {/* Right: Theme Toggle & Three Dot Menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <MoreVertical className="w-6 h-6 dark:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Records</DropdownMenuItem>
              <DropdownMenuItem>Notification</DropdownMenuItem>
              <DropdownMenuItem>Updates</DropdownMenuItem>
              <DropdownMenuItem>Help and Support</DropdownMenuItem>
              <DropdownMenuItem>FAQs</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TeacherProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </header>
  );
}