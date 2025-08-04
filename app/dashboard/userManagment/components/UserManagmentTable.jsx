// components/UserManagementTable.jsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider, // This should wrap the entire table or parent component
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '@/components/ui/button';

// Import the new sub-component
import UserTableControls from './UserTableControls';
import ImportUsersModal from './ImportUsersModal';


// Import your dummy data (ensure it's updated to use arrays for 'curso')
import { DUMMY_USERS } from '@/public/dummydata';
import RegisterUserModal from './RegisterUserForm';


// Helper for pagination (same as before)
const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export default function UserManagementTable() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRol, setFilterRol] = useState('Todos');
  const [filterCourse, setFilterCourse] = useState('Todos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7 ;

  const rolOptions = useMemo(() => ['Todos', ...new Set(DUMMY_USERS.map(user => user.rol))], []);
  // IMPORTANT: For courseOptions, we need to flatten all unique courses from the arrays
  const courseOptions = useMemo(() => {
    const allCourses = DUMMY_USERS.flatMap(user => user.curso || []); // Ensure 'curso' is an array or empty array
    return ['Todos', ...new Set(allCourses)];
  }, []);
  const statusOptions = useMemo(() => ['Todos', ...new Set(DUMMY_USERS.map(user => user.estado))], []);

  const filteredUsers = useMemo(() => {
    setCurrentPage(1);
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.id.includes(searchTerm);

      const matchesRol = filterRol === 'Todos' || user.rol === filterRol;

      // Adjusting matchesCourse logic for array of courses
      const matchesCourse = filterCourse === 'Todos' ||
                            (user.curso && user.curso.includes(filterCourse));

      const matchesStatus = filterStatus === 'Todos' || user.estado === filterStatus;

      return matchesSearch && matchesRol && matchesCourse && matchesStatus;
    });
  }, [users, searchTerm, filterRol, filterCourse, filterStatus]);


  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = useMemo(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [filteredUsers, currentPage, usersPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginationNumbers = useMemo(() => {
    const pagesToShow = 5;
    const pages = [];

    if (totalPages > 0) {
      pages.push(1);
    }

    // Logic for ellipsis and page numbers (your original logic, seems okay for pagination)
    if (currentPage > pagesToShow / 2 + 1 && totalPages > pagesToShow) {
      pages.push('...');
    }

    let startPage = Math.max(2, currentPage - Math.floor(pagesToShow / 2) + 1);
    let endPage = Math.min(totalPages - 1, currentPage + Math.floor(pagesToShow / 2) - 1);

    if (startPage <= endPage) {
        if (totalPages > pagesToShow && startPage > 2) {
            startPage = Math.max(2, currentPage - Math.floor(pagesToShow / 2) + (totalPages - currentPage < Math.floor(pagesToShow / 2) ? (pagesToShow - (totalPages - currentPage)) : 0));
        }
        if (totalPages > pagesToShow && endPage < totalPages - 1) {
             endPage = Math.min(totalPages - 1, currentPage + Math.floor(pagesToShow / 2) - (currentPage <= Math.floor(pagesToShow / 2) + 1 ? (Math.floor(pagesToShow / 2) - currentPage + 1) : 0));
        }

        for (let i = startPage; i <= endPage; i++) {
            if (!pages.includes(i)) pages.push(i);
        }
    }


    if (currentPage < totalPages - pagesToShow / 2 && totalPages > pagesToShow && !pages.includes(totalPages)) {
      pages.push('...');
    }

    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);




 const handleListExcel = () => {
  setIsImportModalOpen(true);
};

  const handleRegisterUser = (newUser) => {
  console.log('User registered:', newUser);
  alert(`User ${newUser.name} registered!`);

  // Optional: Add to user list immediately (for demo purposes)
  setUsers(prev => [...prev, newUser]);
};

  return (
    // TooltipProvider should wrap the highest common ancestor where tooltips are used.
    // Placing it here ensures all tooltips within UserManagementTable work.
    <>
    <TooltipProvider>
      <div className="p-6 bg-[#F9FAFB] shadow-md w-full h-screen mx-auto">
        <UserTableControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterRol={filterRol}
          onFilterRolChange={setFilterRol}
          filterCourse={filterCourse}
          onFilterCourseChange={setFilterCourse}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          rolOptions={rolOptions}
          courseOptions={courseOptions}
          statusOptions={statusOptions}
          onRegisterUserClick={() => setShowRegisterModal(true)}
          onListExcelClick={handleListExcel}
        />

        {/* Users Table */}
        <div className=" bg-white overflow-x-auto border-2  p-4 rounded-xl  shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Curso(s)</TableHead> {/* Updated header */}
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  // Ensure user.curso is an array, default to empty if undefined
                  const userCourses = user.curso || [];
                  const displayCourses = userCourses.slice(0, 2); // Show max 2 courses
                  const remainingCoursesCount = userCourses.length - displayCourses.length;

                  return (
                    <TableRow key={user.id + user.name}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.rol}</TableCell>
                      <TableCell>{user.cargo}</TableCell>
                      <TableCell>
                        {userCourses.length > 0 ? (
                          <Tooltip delayDuration={300}> {/* Add delay for better UX */}
                            <TooltipTrigger asChild>
                              {/* The div below is the actual trigger for the tooltip */}
                              <div className="flex flex-row items-center space-x-1 text-gray-600 cursor-help">
                                {/* Only show eye icon if there are multiple courses and some are hidden */}                                <ul className="flex flex-row flex-wrap gap-x-1 text-sm font-medium">
                                  {/* Display up to 2 courses */}
                                  {displayCourses.map((course, index) => (
                                    <li key={course + index}>{course}{index < displayCourses.length - 1 ? ',' : ''}</li>
                                  ))}
                                  {/* Show "+X más" if there are more courses */}
                                  {remainingCoursesCount > 0 && (
                                    <li className="text-blue-600">{`, +${remainingCoursesCount} más`}</li>
                                  )}
                                </ul>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-800 text-white text-sm p-2 rounded-md shadow-lg max-w-xs">
                              <p className="font-semibold mb-1">Cursos:</p> {/* Changed title */}
                              <ul className="list-disc list-inside space-y-0.5">
                                {/* List all courses in the tooltip */}
                                {userCourses.map((course, index) => (
                                  <li key={`tooltip-${course}-${index}`}>{course}</li>
                                ))}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span className="text-gray-400">-</span> // Display a dash if no courses
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${user.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.estado}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="icon-[lucide--more-horizontal] h-4 w-4"></span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => alert(`Ver ${user.name}`)}>Ver</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`Editar ${user.name}`)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => alert(`Eliminar ${user.name}`)} className="text-red-600">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-gray-500"> {/* Adjusted colspan */}
                    No se encontraron usuarios.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage > 1}
              className={`${currentPage > 1 ? "bg-blue-950 text-white" : "text-gray-400"} cursor-pointer`}
            />
            {paginationNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                    className={`${page === currentPage && "bg-blue-950 text-white"} cursor-pointer`}
                    >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage < totalPages}
              className={`${currentPage < totalPages ? "bg-blue-950 text-white" : "text-gray-400"} cursor-pointer`}
              />
          </PaginationContent>
        </Pagination>
      </div>
      </TooltipProvider>
      <RegisterUserModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegisterUser}
       />
       <ImportUsersModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(fileName) => alert(`Imported users from ${fileName}`)}/>
      </>
  );
}