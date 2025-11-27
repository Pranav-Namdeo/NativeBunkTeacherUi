import { Users, Activity, CheckCircle, XCircle, LogOut } from "lucide-react";

interface FilterButtonsProps {
  selectedFilter: "all" | "active" | "present" | "absent" | "left";
  onFilterChange: (filter: "all" | "active" | "present" | "absent" | "left") => void;
  counts: {
    all: number;
    active: number;
    present: number;
    absent: number;
    left: number;
  };
}

export function FilterButtons({ selectedFilter, onFilterChange, counts }: FilterButtonsProps) {
  const filters = [
    { 
      id: "all" as const, 
      label: "All", 
      icon: Users,
      color: "blue",
      count: counts.all
    },
    { 
      id: "active" as const, 
      label: "Active", 
      icon: Activity,
      color: "green",
      count: counts.active
    },
    { 
      id: "present" as const, 
      label: "Present", 
      icon: CheckCircle,
      color: "blue",
      count: counts.present
    },
    { 
      id: "absent" as const, 
      label: "Absent", 
      icon: XCircle,
      color: "red",
      count: counts.absent
    },
    { 
      id: "left" as const, 
      label: "Left Early", 
      icon: LogOut,
      color: "orange",
      count: counts.left
    },
  ];

  const getButtonStyles = (filterId: string, color: string) => {
    const isSelected = selectedFilter === filterId;
    
    const baseStyles = "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg transition-all font-medium text-sm";
    
    if (isSelected) {
      switch (color) {
        case "blue":
          return `${baseStyles} bg-blue-600 dark:bg-blue-500 text-white shadow-md`;
        case "green":
          return `${baseStyles} bg-green-600 dark:bg-green-500 text-white shadow-md`;
        case "red":
          return `${baseStyles} bg-red-600 dark:bg-red-500 text-white shadow-md`;
        case "orange":
          return `${baseStyles} bg-orange-600 dark:bg-orange-500 text-white shadow-md`;
        default:
          return `${baseStyles} bg-gray-600 dark:bg-gray-500 text-white shadow-md`;
      }
    } else {
      return `${baseStyles} bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border dark:border-gray-800 hover:border-${color}-400 dark:hover:border-${color}-600 hover:bg-${color}-50 dark:hover:bg-${color}-950`;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={getButtonStyles(filter.id, filter.color)}
            >
              <Icon className="w-4 h-4" />
              <span className="whitespace-nowrap">{filter.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedFilter === filter.id 
                  ? "bg-white/20" 
                  : "bg-gray-100 dark:bg-gray-800"
              }`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
