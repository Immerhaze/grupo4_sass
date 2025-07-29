'use client'; // Required for using React Hooks like useState and client-side interactions

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Make sure you have this component installed via shadcn/ui
import Image from 'next/image'; // For optimized image display

// Helper to format the timestamp
const formatPostTimestamp = (isoString) => {
  const date = new Date(isoString);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use AM/PM
  };
  // Format as 'DD-MM-YYYY - HH:MM am/pm'
  return new Intl.DateTimeFormat('es-CL', options).format(date).replace(',', ' -');
};

// Dummy filter options (can be centralized if used across app)
const ALL_FILTER_OPTIONS = {
  'all': { name: 'Todos', description: 'Visible para todos los estudiantes' },
  '1a': { name: '1°A', description: 'Visible solo para 1°A' },
  '2a': { name: '2°A', description: 'Visible solo para 2°A' },
  '3a': { name: '3°A', description: 'Visible solo para 3°A' },
  '4a': { name: '4°A', description: 'Visible solo para 4°A' },
  'teachers': { name: 'Profesores', description: 'Visible solo para profesores' },
  'admins': { name: 'Administradores', description: 'Visible solo para administradores' },
};

export default function PostItem({ post }) {
  // Helper to get display names for visibility groups
  const getVisibilityDisplayNames = (groupIds) => {
    return groupIds.map(id => ALL_FILTER_OPTIONS[id]?.name || id);
  };

  const visibleGroups = getVisibilityDisplayNames(post.visibilityGroups || []);
  const displayGroups = visibleGroups.slice(0, 2); // Show max 2 groups
  const remainingGroupsCount = visibleGroups.length - displayGroups.length;

  return (
    // Main container for the post card
    <div className="w-full max-w-5xl h-auto bg-white flex flex-col rounded-xl border-2 p-4 shadow-sm my-4">

      {/* Post Header Section (Avatar, Name, Date, Visibility) */}
      <div className="w-full min-h-16 max-h-24 flex flex-row items-center justify-between gap-4 pb-4 border-b border-gray-200 mb-4">
        {/* Left Section: Avatar, Name, Role, Date */}
        <div className="flex flex-row items-center gap-4 flex-grow">
          <Avatar className="w-14 h-14 border-2 border-blue-500">
            <AvatarImage src={post.authorAvatar || "https://github.com/shadcn.png"} />
            <AvatarFallback>{post.author?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">
              {post.author} / <span className="text-blue-500 font-semibold">{post.authorRole}</span>
            </h2>
            <h6 className="text-sm text-gray-500 mt-0.5">
              {formatPostTimestamp(post.timestamp)}
            </h6>
          </div>
        </div>

        {/* Right Section: Visibility Icon and Groups (with Tooltip) */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row items-center space-x-1 text-gray-600 cursor-help">
                <span className="icon-[icomoon-free--eye] text-lg"></span>
                <ul className="flex flex-row flex-wrap gap-x-1 text-sm font-medium">
                  {displayGroups.map((group, index) => (
                    <li key={group + index}>{group}{index < displayGroups.length - 1 ? ',' : ''}</li>
                  ))}
                  {remainingGroupsCount > 0 && (
                    <li>{` +${remainingGroupsCount} más`}</li>
                  )}
                </ul>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg max-w-xs">
              <p className="font-semibold mb-1">Visible para:</p>
              <ul className="list-disc list-inside space-y-0.5">
                {visibleGroups.map((group, index) => (
                  <li key={`tooltip-${group}-${index}`}>{group}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Post Content Section */}
      <section className="mb-4">
        <p className="text-lg text-gray-800 break-words whitespace-pre-wrap">
          {post.content}
        </p>
      </section>

      {/* Attachment Section */}
      {post.attachment && (
        <section className="mt-2">
          {post.attachment.type.startsWith('image/') ? (
            // Display for images
            <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={post.attachment.url}
                alt={post.attachment.name}
                width={600} // Example width, adjust as needed or use fill
                height={400} // Example height, adjust as needed or use fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-auto object-contain max-h-[400px]" // object-contain ensures whole image is visible
              />
              <p className="text-sm text-gray-600 mt-2 px-2 pb-2">{post.attachment.name}</p>
            </div>
          ) : (post.attachment.type === 'application/pdf' || post.attachment.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || post.attachment.type === 'application/vnd.ms-excel') ? (
            // Display for PDF or Excel (like WhatsApp)
            <a
              href={post.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200"
            >
              {post.attachment.type === 'application/pdf' && (
                <span className="icon-[material-icon-theme--pdf] text-5xl text-red-500"></span>
              )}
              {(post.attachment.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || post.attachment.type === 'application/vnd.ms-excel') && (
                <span className="icon-[mdi--microsoft-excel] text-5xl text-green-600"></span> // Assuming mdi--microsoft-excel icon
              )}
              <div>
                <h4 className="font-semibold text-base text-gray-800">{post.attachment.name}</h4>
                <p className="text-sm text-gray-500">
                  {post.attachment.type === 'application/pdf' ? 'Documento PDF' : 'Archivo Excel'}
                </p>
              </div>
            </a>
          ) : (
            // Fallback for other file types (if any, showing just name)
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg border border-gray-200">
              <span className="icon-[tabler--file] text-2xl text-gray-500"></span>
              <h4 className="font-semibold text-base text-gray-800">{post.attachment.name}</h4>
            </div>
          )}
        </section>
      )}
    </div>
  );
}