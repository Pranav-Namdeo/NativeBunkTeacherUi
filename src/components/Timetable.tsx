import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pencil, Save, X, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

interface TimetableEntry {
  day: string;
  slots: {
    time: string;
    subject: string;
    teacher: string;
    room: string;
  }[];
}

// Mock timetable data
const timetableData: Record<string, Record<string, TimetableEntry[]>> = {
  "Computer Science": {
    "Semester 1": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
          { time: "10:00 - 11:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "11:00 - 12:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "10:00 - 11:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
          { time: "11:00 - 12:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Engineering Drawing", teacher: "Mr. Desai", room: "Room 104" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "10:00 - 11:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "11:00 - 12:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
          { time: "10:00 - 11:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "11:00 - 12:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "10:00 - 11:00", subject: "Engineering Drawing", teacher: "Mr. Desai", room: "Room 104" },
          { time: "11:00 - 12:00", subject: "Chemistry Lab", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Chemistry Lab", teacher: "Dr. Reddy", room: "Lab 2" },
        ],
      },
    ],
    "Semester 2": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Data Structures", teacher: "Dr. Verma", room: "Lab 1" },
          { time: "10:00 - 11:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "11:00 - 12:00", subject: "Digital Electronics", teacher: "Dr. Malhotra", room: "Room 202" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Environmental Science", teacher: "Mrs. Iyer", room: "Room 203" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Data Structures", teacher: "Dr. Verma", room: "Lab 1" },
          { time: "11:00 - 12:00", subject: "Computer Organization", teacher: "Dr. Joshi", room: "Room 204" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Digital Electronics", teacher: "Dr. Malhotra", room: "Room 202" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Digital Electronics Lab", teacher: "Dr. Malhotra", room: "Lab 4" },
          { time: "10:00 - 11:00", subject: "Digital Electronics Lab", teacher: "Dr. Malhotra", room: "Lab 4" },
          { time: "11:00 - 12:00", subject: "Data Structures", teacher: "Dr. Verma", room: "Lab 1" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "Environmental Science", teacher: "Mrs. Iyer", room: "Room 203" },
          { time: "10:00 - 11:00", subject: "Computer Organization", teacher: "Dr. Joshi", room: "Room 204" },
          { time: "11:00 - 12:00", subject: "Data Structures Lab", teacher: "Dr. Verma", room: "Lab 1" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Data Structures Lab", teacher: "Dr. Verma", room: "Lab 1" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Digital Electronics", teacher: "Dr. Malhotra", room: "Room 202" },
          { time: "11:00 - 12:00", subject: "Computer Organization", teacher: "Dr. Joshi", room: "Room 204" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Environmental Science", teacher: "Mrs. Iyer", room: "Room 203" },
        ],
      },
    ],
  },
  "Electronics": {
    "Semester 1": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Basic Electronics", teacher: "Dr. Rao", room: "Lab 5" },
          { time: "10:00 - 11:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "11:00 - 12:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Engineering Mechanics", teacher: "Mr. Nair", room: "Room 105" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "10:00 - 11:00", subject: "Basic Electronics", teacher: "Dr. Rao", room: "Lab 5" },
          { time: "11:00 - 12:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "10:00 - 11:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "11:00 - 12:00", subject: "Basic Electronics Lab", teacher: "Dr. Rao", room: "Lab 5" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Basic Electronics Lab", teacher: "Dr. Rao", room: "Lab 5" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
          { time: "10:00 - 11:00", subject: "Engineering Mechanics", teacher: "Mr. Nair", room: "Room 105" },
          { time: "11:00 - 12:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Basic Electronics", teacher: "Dr. Rao", room: "Lab 5" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "10:00 - 11:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "11:00 - 12:00", subject: "Engineering Mechanics", teacher: "Mr. Nair", room: "Room 105" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Chemistry Lab", teacher: "Dr. Reddy", room: "Lab 2" },
        ],
      },
    ],
    "Semester 2": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Circuit Theory", teacher: "Dr. Kapoor", room: "Room 205" },
          { time: "10:00 - 11:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "11:00 - 12:00", subject: "Network Analysis", teacher: "Dr. Bose", room: "Room 206" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Circuit Theory", teacher: "Dr. Kapoor", room: "Room 205" },
          { time: "11:00 - 12:00", subject: "Electronic Devices", teacher: "Dr. Menon", room: "Lab 6" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Network Analysis", teacher: "Dr. Bose", room: "Room 206" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Electronic Devices Lab", teacher: "Dr. Menon", room: "Lab 6" },
          { time: "10:00 - 11:00", subject: "Electronic Devices Lab", teacher: "Dr. Menon", room: "Lab 6" },
          { time: "11:00 - 12:00", subject: "Circuit Theory", teacher: "Dr. Kapoor", room: "Room 205" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
          { time: "10:00 - 11:00", subject: "Network Analysis", teacher: "Dr. Bose", room: "Room 206" },
          { time: "11:00 - 12:00", subject: "Circuit Lab", teacher: "Dr. Kapoor", room: "Lab 7" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Circuit Lab", teacher: "Dr. Kapoor", room: "Lab 7" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Electronic Devices", teacher: "Dr. Menon", room: "Lab 6" },
          { time: "11:00 - 12:00", subject: "Network Analysis", teacher: "Dr. Bose", room: "Room 206" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Programming in C", teacher: "Dr. Kumar", room: "Lab 1" },
        ],
      },
    ],
  },
  "Mechanical": {
    "Semester 1": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Engineering Graphics", teacher: "Mr. Desai", room: "Room 301" },
          { time: "10:00 - 11:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "11:00 - 12:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Workshop Practice", teacher: "Mr. Singh", room: "Workshop" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "10:00 - 11:00", subject: "Engineering Graphics", teacher: "Mr. Desai", room: "Room 301" },
          { time: "11:00 - 12:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Physics", teacher: "Dr. Patel", room: "Room 102" },
          { time: "10:00 - 11:00", subject: "Chemistry", teacher: "Dr. Reddy", room: "Lab 2" },
          { time: "11:00 - 12:00", subject: "Workshop Practice", teacher: "Mr. Singh", room: "Workshop" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Workshop Practice", teacher: "Mr. Singh", room: "Workshop" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "English", teacher: "Mrs. Singh", room: "Room 103" },
          { time: "10:00 - 11:00", subject: "Engineering Mechanics", teacher: "Mr. Nair", room: "Room 105" },
          { time: "11:00 - 12:00", subject: "Mathematics I", teacher: "Prof. Sharma", room: "Room 101" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Engineering Graphics", teacher: "Mr. Desai", room: "Room 301" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "10:00 - 11:00", subject: "Physics Lab", teacher: "Dr. Patel", room: "Lab 3" },
          { time: "11:00 - 12:00", subject: "Engineering Mechanics", teacher: "Mr. Nair", room: "Room 105" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Chemistry Lab", teacher: "Dr. Reddy", room: "Lab 2" },
        ],
      },
    ],
    "Semester 2": [
      {
        day: "Monday",
        slots: [
          { time: "9:00 - 10:00", subject: "Thermodynamics", teacher: "Dr. Pillai", room: "Room 302" },
          { time: "10:00 - 11:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "11:00 - 12:00", subject: "Material Science", teacher: "Dr. Chopra", room: "Room 303" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Manufacturing Process", teacher: "Mr. Trivedi", room: "Workshop" },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Thermodynamics", teacher: "Dr. Pillai", room: "Room 302" },
          { time: "11:00 - 12:00", subject: "Strength of Materials", teacher: "Dr. Agarwal", room: "Room 304" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Material Science", teacher: "Dr. Chopra", room: "Room 303" },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 - 10:00", subject: "Manufacturing Lab", teacher: "Mr. Trivedi", room: "Workshop" },
          { time: "10:00 - 11:00", subject: "Manufacturing Lab", teacher: "Mr. Trivedi", room: "Workshop" },
          { time: "11:00 - 12:00", subject: "Thermodynamics", teacher: "Dr. Pillai", room: "Room 302" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 - 10:00", subject: "Strength of Materials", teacher: "Dr. Agarwal", room: "Room 304" },
          { time: "10:00 - 11:00", subject: "Material Science", teacher: "Dr. Chopra", room: "Room 303" },
          { time: "11:00 - 12:00", subject: "Material Lab", teacher: "Dr. Chopra", room: "Lab 8" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Material Lab", teacher: "Dr. Chopra", room: "Lab 8" },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "9:00 - 10:00", subject: "Mathematics II", teacher: "Prof. Gupta", room: "Room 201" },
          { time: "10:00 - 11:00", subject: "Strength of Materials", teacher: "Dr. Agarwal", room: "Room 304" },
          { time: "11:00 - 12:00", subject: "Manufacturing Process", teacher: "Mr. Trivedi", room: "Workshop" },
          { time: "12:00 - 1:00", subject: "Break", teacher: "-", room: "-" },
          { time: "1:00 - 2:00", subject: "Thermodynamics", teacher: "Dr. Pillai", room: "Room 302" },
        ],
      },
    ],
  },
};

const branches = ["Computer Science", "Electronics", "Mechanical"];
const semesters = ["Semester 1", "Semester 2"];

export function Timetable() {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTimetable, setEditedTimetable] = useState<TimetableEntry[] | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<{
    dayIndex: number;
    slotIndex: number;
    slot: { time: string; subject: string; teacher: string; room: string };
  } | null>(null);

  const currentTimetable =
    selectedBranch && selectedSemester
      ? isEditMode && editedTimetable
        ? editedTimetable
        : timetableData[selectedBranch]?.[selectedSemester]
      : null;

  const handleEditClick = () => {
    if (currentTimetable) {
      setEditedTimetable(JSON.parse(JSON.stringify(currentTimetable)));
      setIsEditMode(true);
    }
  };

  const handleSaveChanges = () => {
    if (editedTimetable && selectedBranch && selectedSemester) {
      // In a real app, this would save to backend
      timetableData[selectedBranch][selectedSemester] = editedTimetable;
      setIsEditMode(false);
      setEditedTimetable(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedTimetable(null);
  };

  const handleSlotEdit = (dayIndex: number, slotIndex: number) => {
    if (editedTimetable) {
      setEditingSlot({
        dayIndex,
        slotIndex,
        slot: { ...editedTimetable[dayIndex].slots[slotIndex] },
      });
      setEditDialogOpen(true);
    }
  };

  const handleSlotUpdate = () => {
    if (editingSlot && editedTimetable) {
      const newTimetable = [...editedTimetable];
      newTimetable[editingSlot.dayIndex].slots[editingSlot.slotIndex] = editingSlot.slot;
      setEditedTimetable(newTimetable);
      setEditDialogOpen(false);
      setEditingSlot(null);
    }
  };

  const handleAddSlot = (dayIndex: number) => {
    if (editedTimetable) {
      const newTimetable = [...editedTimetable];
      newTimetable[dayIndex].slots.push({
        time: "2:00 - 3:00",
        subject: "New Subject",
        teacher: "Teacher Name",
        room: "Room Number",
      });
      setEditedTimetable(newTimetable);
    }
  };

  const handleDeleteSlot = (dayIndex: number, slotIndex: number) => {
    if (editedTimetable) {
      const newTimetable = [...editedTimetable];
      newTimetable[dayIndex].slots.splice(slotIndex, 1);
      setEditedTimetable(newTimetable);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Selection Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="dark:text-white">Select Timetable</h2>
          {currentTimetable && !isEditMode && (
            <Button onClick={handleEditClick} size="sm" className="gap-2">
              <Pencil className="w-4 h-4" />
              Edit Timetable
            </Button>
          )}
          {isEditMode && (
            <div className="flex gap-2">
              <Button onClick={handleSaveChanges} size="sm" className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancelEdit}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Branch Selection */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Branch
            </label>
            <Select 
              value={selectedBranch} 
              onValueChange={(value) => {
                setSelectedBranch(value);
                setIsEditMode(false);
                setEditedTimetable(null);
              }}
              disabled={isEditMode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Branch" />
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

          {/* Semester Selection */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Semester
            </label>
            <Select
              value={selectedSemester}
              onValueChange={(value) => {
                setSelectedSemester(value);
                setIsEditMode(false);
                setEditedTimetable(null);
              }}
              disabled={!selectedBranch || isEditMode}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Semester" />
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
        </div>
      </div>

      {/* Timetable Display - Table Format */}
      {currentTimetable ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 dark:bg-blue-700">
                  <th className="px-4 py-3 text-left text-white min-w-[120px]">Time</th>
                  {currentTimetable.map((daySchedule) => (
                    <th key={daySchedule.day} className="px-4 py-3 text-center text-white min-w-[200px]">
                      {daySchedule.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Get all unique time slots */}
                {currentTimetable[0]?.slots.map((_, slotIndex) => (
                  <tr key={slotIndex} className="border-b dark:border-gray-800">
                    <td className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-sm dark:text-gray-300">
                      {currentTimetable[0].slots[slotIndex].time}
                    </td>
                    {currentTimetable.map((daySchedule, dayIndex) => {
                      const slot = daySchedule.slots[slotIndex];
                      const isBreak = slot?.subject === "Break";
                      
                      return (
                        <td
                          key={`${daySchedule.day}-${slotIndex}`}
                          className={`px-4 py-3 ${
                            isBreak
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "bg-blue-50/50 dark:bg-blue-950/20"
                          }`}
                        >
                          {slot ? (
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="dark:text-white truncate">
                                  {slot.subject}
                                </p>
                                {!isBreak && (
                                  <>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                      {slot.teacher}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                                      {slot.room}
                                    </p>
                                  </>
                                )}
                              </div>
                              {isEditMode && (
                                <div className="flex gap-1 flex-shrink-0">
                                  <Button
                                    onClick={() => handleSlotEdit(dayIndex, slotIndex)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteSlot(dayIndex, slotIndex)}
                                    size="sm"
                                    variant="ghost"
                                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-400 dark:text-gray-600 text-sm">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Add Slot Section - Only in Edit Mode */}
          {isEditMode && (
            <div className="border-t dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Add new time slot to:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <Button
                  onClick={() => handleAddSlot(0)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Monday
                </Button>
                <Button
                  onClick={() => handleAddSlot(1)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tuesday
                </Button>
                <Button
                  onClick={() => handleAddSlot(2)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Wednesday
                </Button>
                <Button
                  onClick={() => handleAddSlot(3)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Thursday
                </Button>
                <Button
                  onClick={() => handleAddSlot(4)}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Friday
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-12 shadow-sm border dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Please select both branch and semester to view timetable
          </p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Time Slot</DialogTitle>
            <DialogDescription>
              Make changes to the time slot details.
            </DialogDescription>
          </DialogHeader>
          {editingSlot && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm mb-2">Time</label>
                <Input
                  value={editingSlot.slot.time}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      slot: { ...editingSlot.slot, time: e.target.value },
                    })
                  }
                  placeholder="e.g., 9:00 - 10:00"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Subject</label>
                <Input
                  value={editingSlot.slot.subject}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      slot: { ...editingSlot.slot, subject: e.target.value },
                    })
                  }
                  placeholder="Subject name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Teacher</label>
                <Input
                  value={editingSlot.slot.teacher}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      slot: { ...editingSlot.slot, teacher: e.target.value },
                    })
                  }
                  placeholder="Teacher name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Room</label>
                <Input
                  value={editingSlot.slot.room}
                  onChange={(e) =>
                    setEditingSlot({
                      ...editingSlot,
                      slot: { ...editingSlot.slot, room: e.target.value },
                    })
                  }
                  placeholder="Room number"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false);
                setEditingSlot(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSlotUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}