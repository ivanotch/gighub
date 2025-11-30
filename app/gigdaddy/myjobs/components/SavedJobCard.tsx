// components/landingpage/SavedJobCard.tsx
import React from 'react';
import Card from '../../../../components/landingpage/Card';
import CardHeader from '../../../../components/landingpage/CardHeader';
import CardFooter from '../../../../components/landingpage/CardFooter';
import Button from '../../../../components/landingpage/Button';

interface SavedJobCardProps {
  job: {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    description: string;
    location: string;
    salary: string;
    category: string;
    postedDate: string;
    savedDate: string;
  };
  onApply: (job: any) => void;
  onRemove: (job: any) => void;
  onViewDetails: (job: any) => void;
}

function SavedJobCard({ job, onApply, onRemove, onViewDetails }: SavedJobCardProps) {
  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      hover
      onClick={() => onViewDetails(job)}
    >
      {/* Header with Save Indicator */}
      <div className="relative">
        <img 
          src={job.imageUrl} 
          alt={job.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          💾 Saved
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <CardHeader
          title={job.title}
          subtitle={
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-green-600 font-bold text-lg">{job.salary}</span>
              <span className="text-gray-600 text-sm">{job.subtitle}</span>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded-full">
                  {job.category}
                </span>
                <span className="text-gray-400 text-xs">
                  Saved: {new Date(job.savedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          }
          className="mb-3"
        />

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="mr-2">📍</span>
          {job.location}
        </div>

        <div className="text-xs text-gray-400 mb-4">
          Posted: {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>

      {/* Actions */}
      <CardFooter justify="between" padding="sm">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(job);
          }}
        >
          Remove
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SavedJobCard;