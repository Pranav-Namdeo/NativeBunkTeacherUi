import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";

// Mock student data
const mockStudents = [
  { id: 1, name: "Aarav Sharma", rollNo: "CS001", isPresent: true },
  { id: 2, name: "Priya Patel", rollNo: "CS002", isPresent: true },
  { id: 3, name: "Rohan Kumar", rollNo: "CS003", isPresent: false },
  { id: 4, name: "Ananya Singh", rollNo: "CS004", isPresent: true },
  { id: 5, name: "Vikram Desai", rollNo: "CS005", isPresent: false },
  { id: 6, name: "Sneha Reddy", rollNo: "CS006", isPresent: true },
];

export function StudentSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<typeof mockStudents>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredStudents([]);
      return;
    }

    const filtered = mockStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search student by name or roll number..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-6 dark:bg-gray-900 dark:border-gray-800 dark:text-white"
        />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800">
          {filteredStudents.length > 0 ? (
            <div className="divide-y dark:divide-gray-800">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="dark:text-white">{student.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Roll No: {student.rollNo}</p>
                    </div>
                    <Badge
                      variant={student.isPresent ? "default" : "destructive"}
                    >
                      {student.isPresent ? "Present" : "Absent"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No students found
            </div>
          )}
        </div>
      )}
    </div>
  );
}