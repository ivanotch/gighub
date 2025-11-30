// components/landingpage/CompletedJobCard.tsx
import React from 'react';
import Card from '../../../../components/landingpage/Card';
import CardHeader from '../../../../components/landingpage/CardHeader';
import CardFooter from '../../../../components/landingpage/CardFooter';
import Button from '../../../../components/landingpage/Button';

interface CompletedJobCardProps {
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
    completionDate: string;
    employer: string;
    rating: number;
    earnings: string;
  };
  onViewDetails: (job: any) => void;
}

function CompletedJobCard({ job, onViewDetails }: CompletedJobCardProps) {
  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-green-500"
      hover
      onClick={() => onViewDetails(job)}
    >
      {/* Header with Completion Badge */}
      <div className="relative">
        <img 
          src={job.imageUrl} 
          alt={job.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ✅ Completed
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <CardHeader
          title={job.title}
          subtitle={
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold text-lg">{job.earnings}</span>
                <div className="flex items-center text-yellow-500">
                  {'★'.repeat(job.rating)}{'☆'.repeat(5 - job.rating)}
                </div>
              </div>
              <span className="text-gray-600 text-sm">{job.subtitle}</span>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 text-xs bg-blue-50 px-2 py-1 rounded-full">
                  {job.category}
                </span>
                <span className="text-gray-400 text-xs">
                  {job.employer}
                </span>
              </div>
            </div>
          }
          className="mb-3"
        />

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Earnings and Completion Info */}
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-800 font-semibold">Earnings:</span>
            <span className="text-green-600 font-bold">{job.earnings}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Completed:</span>
            <span className="text-gray-600">{new Date(job.completionDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <span className="mr-2">📍</span>
          {job.location}
        </div>
      </div>

      {/* Actions */}
      <CardFooter justify="between" padding="sm">
        <div className="flex items-center text-yellow-500 text-sm">
          Rating: {job.rating}/5
        </div>
        <Button
          variant="outline"
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

export default CompletedJobCard;