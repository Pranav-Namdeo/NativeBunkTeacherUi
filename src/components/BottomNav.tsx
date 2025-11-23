import { Home, Calendar, Clock } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "timetable", label: "Timetable", icon: Clock },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}