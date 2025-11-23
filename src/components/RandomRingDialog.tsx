import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Users, Hash } from "lucide-react";

interface RandomRingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RandomRingDialog({ open, onOpenChange }: RandomRingDialogProps) {
  const [selectedOption, setSelectedOption] = useState<"all" | "select" | null>(null);
  const [numberOfStudents, setNumberOfStudents] = useState("");

  const handleConfirm = () => {
    if (selectedOption === "all") {
      // Ring all students
      console.log("Ringing all students");
      // TODO: Implement actual ringing logic
    } else if (selectedOption === "select" && numberOfStudents) {
      // Ring selected number of students
      console.log(`Ringing ${numberOfStudents} students`);
      // TODO: Implement actual ringing logic for selected number
    }
    
    // Reset and close
    setSelectedOption(null);
    setNumberOfStudents("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedOption(null);
    setNumberOfStudents("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Random Ring</DialogTitle>
          <DialogDescription>
            Choose how many students to randomly select for attendance check.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {/* All Students Option */}
          <button
            onClick={() => setSelectedOption("all")}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedOption === "all"
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-500"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedOption === "all"
                    ? "bg-blue-600 dark:bg-blue-600"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Users
                  className={`w-5 h-5 ${
                    selectedOption === "all" ? "text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="dark:text-white">All Students</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ring all students in the class
                </p>
              </div>
            </div>
          </button>

          {/* Select Number Option */}
          <button
            onClick={() => setSelectedOption("select")}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedOption === "select"
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-500"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedOption === "select"
                    ? "bg-blue-600 dark:bg-blue-600"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <Hash
                  className={`w-5 h-5 ${
                    selectedOption === "select" ? "text-white" : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="dark:text-white">Select Number of Students</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose specific number of students
                </p>
              </div>
            </div>
          </button>

          {/* Number Input - Shows when "Select Number" is chosen */}
          {selectedOption === "select" && (
            <div className="pl-4 pt-2">
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Number of students
              </label>
              <Input
                type="number"
                min="1"
                max="50"
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(e.target.value)}
                placeholder="Enter number (e.g., 5)"
                className="w-full"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              !selectedOption ||
              (selectedOption === "select" && (!numberOfStudents || parseInt(numberOfStudents) <= 0))
            }
          >
            Start Random Ring
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
