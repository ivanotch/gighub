// components/landingpage/CanceledJobCard.tsx
import React from 'react';
import Card from '../../../../components/landingpage/Card';
import CardHeader from '../../../../components/landingpage/CardHeader';
import CardFooter from '../../../../components/landingpage/CardFooter';
import Button from '../../../../components/landingpage/Button';

interface CanceledJobCardProps {
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
    cancelDate: string;
    employer: string;
    reason: string;
  };
  onViewDetails: (job: any) => void;
}

function CanceledJobCard({ job, onViewDetails }: CanceledJobCardProps) {
  return (
    <Card 
      className="w-full max-w-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-red-500 opacity-80"
      hover
      onClick={() => onViewDetails(job)}
    >
      {/* Header with Canceled Badge */}
      <div className="relative">
        <img 
          src={job.imageUrl} 
          alt={job.title}
          className="w-full h-40 object-cover rounded-t-lg grayscale"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ❌ Canceled
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <CardHeader
          title={job.title}
          subtitle={
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-gray-500 line-through font-bold text-lg">{job.salary}</span>
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

        {/* Cancelation Info */}
        <div className="bg-red-50 rounded-lg p-3 mb-4">
          <div className="flex items-start text-sm">
            <span className="text-red-600 font-semibold mr-2">Reason:</span>
            <span className="text-red-700">{job.reason}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-gray-600">Canceled:</span>
            <span className="text-gray-600">{new Date(job.cancelDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-sm">
          <span className="mr-2">📍</span>
          {job.location}
        </div>
      </div>

      {/* Actions */}
      <CardFooter justify="end" padding="sm">
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

export default CanceledJobCard;