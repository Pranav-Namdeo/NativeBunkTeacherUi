import { TeacherHeader } from "./components/TeacherHeader";
import { StudentSearch } from "./components/StudentSearch";
import { BottomNav } from "./components/BottomNav";
import { StudentList } from "./components/StudentList";
import { Timetable } from "./components/Timetable";
import { RandomRingDialog } from "./components/RandomRingDialog";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [randomRingDialogOpen, setRandomRingDialogOpen] = useState(false);

  const handleRandomRing = () => {
    setRandomRingDialogOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <TeacherHeader />
      {activeTab === "home" && <StudentSearch />}
      
      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
        {activeTab === "home" && <StudentList />}
        {activeTab === "calendar" && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Calendar view coming soon...
          </div>
        )}
        {activeTab === "timetable" && <Timetable />}
      </main>
      
      {/* Floating Action Button - Random Ring - Only on Home */}
      {activeTab === "home" && (
        <button
          onClick={handleRandomRing}
          className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40"
          aria-label="Random ring"
        >
          <Bell className="w-6 h-6" />
        </button>
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Random Ring Dialog */}
      <RandomRingDialog 
        open={randomRingDialogOpen} 
        onOpenChange={setRandomRingDialogOpen}
      />
    </div>
  );
}