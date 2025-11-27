import { TeacherHeader } from "./components/TeacherHeader";
import { StudentSearch } from "./components/StudentSearch";
import { BottomNav } from "./components/BottomNav";
import { StudentList } from "./components/StudentList";
import { Timetable } from "./components/Timetable";
import { TimetableSelector } from "./components/TimetableSelector";
import { Calendar } from "./components/Calendar";
import { RandomRingDialog } from "./components/RandomRingDialog";
import { ViewRecords } from "./components/ViewRecords";
import { Notification } from "./components/Notification";
import { Updates } from "./components/Updates";
import { HelpAndSupport } from "./components/HelpAndSupport";
import { Feedback } from "./components/Feedback";
import { Bell } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [randomRingDialogOpen, setRandomRingDialogOpen] = useState(false);
  const [showViewRecords, setShowViewRecords] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const [showHelpAndSupport, setShowHelpAndSupport] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const handleRandomRing = () => {
    setRandomRingDialogOpen(true);
  };

  const handleViewRecords = () => {
    setShowViewRecords(true);
  };

  const handleBackFromRecords = () => {
    setShowViewRecords(false);
  };

  const handleNotification = () => {
    setShowNotification(true);
  };

  const handleBackFromNotification = () => {
    setShowNotification(false);
  };

  const handleUpdates = () => {
    setShowUpdates(true);
  };

  const handleBackFromUpdates = () => {
    setShowUpdates(false);
  };

  const handleHelpAndSupport = () => {
    setShowHelpAndSupport(true);
  };

  const handleBackFromHelpAndSupport = () => {
    setShowHelpAndSupport(false);
  };

  const handleFeedback = () => {
    setShowFeedback(true);
  };

  const handleBackFromFeedback = () => {
    setShowFeedback(false);
  };

  const handleTimetableSelect = (branch: string, semester: string) => {
    setSelectedBranch(branch);
    setSelectedSemester(semester);
  };

  const handleChangeTimetableSelection = () => {
    setSelectedBranch(null);
    setSelectedSemester(null);
  };

  // Show Feedback page
  if (showFeedback) {
    return <Feedback onBack={handleBackFromFeedback} />;
  }

  // Show Help and Support page
  if (showHelpAndSupport) {
    return <HelpAndSupport onBack={handleBackFromHelpAndSupport} />;
  }

  // Show Updates page
  if (showUpdates) {
    return <Updates onBack={handleBackFromUpdates} />;
  }

  // Show Notification page
  if (showNotification) {
    return <Notification onBack={handleBackFromNotification} />;
  }

  // Show View Records page
  if (showViewRecords) {
    return <ViewRecords onBack={handleBackFromRecords} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <TeacherHeader 
        onViewRecords={handleViewRecords}
        onNotification={handleNotification}
        onUpdates={handleUpdates}
        onHelpAndSupport={handleHelpAndSupport}
        onFeedback={handleFeedback}
      />
      {activeTab === "home" && <StudentSearch />}
      
      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
        {activeTab === "home" && <StudentList />}
        {activeTab === "calendar" && <Calendar />}
        {activeTab === "timetable" && !selectedBranch && !selectedSemester && (
          <TimetableSelector onSelect={handleTimetableSelect} />
        )}
        {activeTab === "timetable" && selectedBranch && selectedSemester && (
          <Timetable
            branch={selectedBranch}
            semester={selectedSemester}
            onChangeSelection={handleChangeTimetableSelection}
          />
        )}
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