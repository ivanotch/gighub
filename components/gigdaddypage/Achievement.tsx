"use client";

import React, { useState } from "react";
import { Trophy, X, Award, Calendar } from "lucide-react";

interface AchievementProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  unlocked: boolean;
  dateUnlocked: string | null;
  onToggle?: (id: number, unlocked: boolean) => void;
  isEditing?: boolean;
}

const Achievement: React.FC<AchievementProps> = ({
  id,
  title,
  description,
  imageUrl,
  unlocked,
  dateUnlocked,
  onToggle,
  isEditing = false
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle && isEditing) {
      onToggle(id, !unlocked);
    }
  };

  return (
    <>
      <div className="relative">
        <div
          className={`relative w-full h-full min-h-[200px] cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            unlocked
              ? "border-yellow-400 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              : "border-gray-300 grayscale opacity-70"
          }`}
          onClick={() => setShowDetails(true)}
        >
          {/* Achievement Image */}
          <div className="w-full h-full aspect-square">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/500x500/${
                  unlocked ? "4ade80/ffffff" : "9ca3af/ffffff"
                }?text=${encodeURIComponent(title)}`;
              }}
            />
          </div>

          <div className="absolute top-2 right-2">
            <div className={`p-1.5 rounded-full ${unlocked ? "bg-yellow-500" : "bg-gray-500"}`}>
              {unlocked ? (
                <Trophy className="w-4 h-4 text-white" />
              ) : (
                <X className="w-4 h-4 text-white" />
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className={`font-semibold ${unlocked ? "text-white" : "text-gray-300"}`}>
              {title}
            </h3>
          </div>

          {isEditing && onToggle && (
            <div className="absolute top-2 left-2 flex gap-1">
              <button
                onClick={handleToggle}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  unlocked
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {unlocked ? "Lock" : "Unlock"}
              </button>
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <Trophy className={`w-5 h-5 ${unlocked ? "text-yellow-500" : "text-gray-400"}`} />
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/500x500/${
                      unlocked ? "4ade80/ffffff" : "9ca3af/ffffff"
                    }?text=${encodeURIComponent(title)}`;
                  }}
                />
              </div>

              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  unlocked
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {unlocked ? (
                    <>
                      <Award className="w-4 h-4 mr-1" />
                      Unlocked
                    </>
                  ) : (
                    "Locked"
                  )}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-gray-600">{description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Requirements</h4>
                <ul className="text-gray-600 list-disc pl-5 space-y-1">
                  {description.includes("training") && (
                    <li>Complete required training modules</li>
                  )}
                  <li>Demonstrate proficiency in related skills</li>
                  <li>Complete minimum number of jobs in this category</li>
                  <li>Maintain high rating in related services</li>
                </ul>
              </div>

              {unlocked && dateUnlocked && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Unlocked on {dateUnlocked}</span>
                </div>
              )}

              {unlocked && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-1">Benefits</h4>
                  <ul className="text-yellow-700 text-sm list-disc pl-5">
                    <li>Increased visibility in job searches</li>
                    <li>Higher earning potential</li>
                    <li>Access to premium jobs</li>
                    <li>Trust badge on profile</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Achievement;