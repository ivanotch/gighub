// components/landingpage/ActiveJobCard.tsx
import React from 'react';
import Card from '../../../../components/landingpage/Card';
import CardHeader from '../../../../components/landingpage/CardHeader';
import CardFooter from '../../../../components/landingpage/CardFooter';
import Button from '../../../../components/landingpage/Button';

interface ActiveJobCardProps {
  job: {
    id: number;
    imageUrl: string;
    title: string;
    subtitle: string;
    description: string;
    location: string;
    salary: string;
    category: string;
    status: string;
    startDate: string;
    employer: string;
    progress: number;
  };
  onViewDetails: (job: any) => void;
}

function ActiveJobCard({ job, onViewDetails }: ActiveJobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Starting Soon': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return '⚡';
      case 'Starting Soon': return '⏰';
      default: return '📋';
    }
  };

  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
      hover
      onClick={() => onViewDetails(job)}
    >
      {/* Header with Status */}
      <div className="relative">
        <img 
          src={job.imageUrl} 
          alt={job.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
          {getStatusIcon(job.status)} {job.status}
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
                  Employer: {job.employer}
                </span>
              </div>
            </div>
          }
          className="mb-3"
        />

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Progress Bar */}
        {job.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{job.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${job.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            {job.location}
          </div>
          <div>
            Starts: {new Date(job.startDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <CardFooter justify="end" padding="sm">
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(job);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ActiveJobCard;