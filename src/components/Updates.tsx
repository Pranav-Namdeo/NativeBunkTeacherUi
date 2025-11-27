import { ArrowLeft, CheckCircle, Download, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface UpdatesProps {
  onBack: () => void;
}

export function Updates({ onBack }: UpdatesProps) {
  // Mock update status - you can replace this with actual API call
  const [updateAvailable] = useState(false); // Change to true to test update available state
  const currentVersion = "1.2.0";
  const latestVersion = "1.3.0";

  const updateFeatures = [
    "Enhanced attendance tracking with real-time sync",
    "New dark mode improvements",
    "Bug fixes and performance improvements",
    "Added semester-wise student records view",
    "Improved notification system",
  ];

  const handleUpdate = () => {
    // Handle update logic here
    alert("Update functionality will be implemented here!");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-800">
        <div className="flex items-center gap-4 px-6 py-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 dark:text-white" />
          </button>
          <h1 className="dark:text-white">Updates</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {updateAvailable ? (
            // Update Available View
            <div className="space-y-6">
              {/* Update Available Card */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                    <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="dark:text-white mb-2">
                      New Update Available
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Version {latestVersion} is now available. You are currently
                      using version {currentVersion}.
                    </p>
                  </div>
                </div>
              </div>

              {/* What's New */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
                <h3 className="dark:text-white mb-4">What's New</h3>
                <ul className="space-y-3">
                  {updateFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Update Button */}
              <Button
                onClick={handleUpdate}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Update Now
              </Button>

              {/* Release Notes */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800">
                <h3 className="dark:text-white mb-2">Release Notes</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  This update includes several improvements to enhance your
                  experience with LetsBunk.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Current Version
                    </p>
                    <p className="dark:text-white">{currentVersion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Latest Version
                    </p>
                    <p className="dark:text-white">{latestVersion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Release Date
                    </p>
                    <p className="dark:text-white">Nov 25, 2024</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Size</p>
                    <p className="dark:text-white">12.5 MB</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // No Update Available View
            <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>

              <h2 className="dark:text-white mb-3">You're Up to Date!</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                LetsBunk is currently running the latest version {currentVersion}.
                You will be notified when a new update is available.
              </p>

              {/* Current Version Info */}
              <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border dark:border-gray-800 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Current Version
                    </span>
                    <span className="dark:text-white">{currentVersion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Last Checked
                    </span>
                    <span className="dark:text-white">Just now</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Status
                    </span>
                    <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Up to date
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="w-full max-w-md bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-blue-900 dark:text-blue-200 mb-1">
                      Automatic Updates
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      We'll automatically notify you when new updates are
                      available for LetsBunk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
