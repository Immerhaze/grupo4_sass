// components/UserTableControls.jsx
'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the props interface for clarity
// This is not strictly necessary for JS but good practice for understanding
/**
 * @typedef {object} UserTableControlsProps
 * @property {string} searchTerm
 * @property {(term: string) => void} onSearchChange
 * @property {string} filterRol
 * @property {(rol: string) => void} onFilterRolChange
 * @property {string} filterCourse
 * @property {(course: string) => void} onFilterCourseChange
 * @property {string} filterStatus
 * @property {(status: string) => void} onFilterStatusChange
 * @property {string[]} rolOptions
 * @property {string[]} courseOptions
 * @property {string[]} statusOptions
 * @property {() => void} onRegisterUserClick // Optional: if you have a specific action for this button
 * @property {() => void} onListExcelClick // Optional: if you have a specific action for this button
 */

/**
 * @param {UserTableControlsProps} props
 */
export default function UserTableControls({
  searchTerm,
  onSearchChange,
  filterRol,
  onFilterRolChange,
  filterCourse,
  onFilterCourseChange,
  filterStatus,
  onFilterStatusChange,
  rolOptions,
  courseOptions,
  statusOptions,
  onRegisterUserClick,
  onListExcelClick,
}) {
  return (
    <>
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="icon-[lucide--users-round] text-3xl"></span> {/* Assuming a users icon */}
            Gestión usuarios
        </h2>
        <div className="flex space-x-3">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
            onClick={onRegisterUserClick} // Add onClick handler
          >
            <span className="icon-[lucide--user-plus]"></span> {/* User plus icon */}
            Registrar usuario
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300"
            onClick={onListExcelClick} // Add onClick handler
          >
            <span className="icon-[lucide--file-spreadsheet]"></span> {/* Excel icon */}
            Listar con excel
          </Button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Rol Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Rol: {filterRol} <span className="icon-[lucide--chevron-down]"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {rolOptions.map(option => (
              <DropdownMenuItem key={option} onClick={() => onFilterRolChange(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Curso Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Curso: {filterCourse} <span className="icon-[lucide--chevron-down]"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {courseOptions.map(option => (
              <DropdownMenuItem key={option} onClick={() => onFilterCourseChange(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Estado Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Estado: {filterStatus} <span className="icon-[lucide--chevron-down]"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusOptions.map(option => (
              <DropdownMenuItem key={option} onClick={() => onFilterStatusChange(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Input */}
        <div className="flex items-center relative flex-grow max-w-xs">
          <span className="icon-[lucide--search] absolute left-3 text-gray-400"></span>
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}