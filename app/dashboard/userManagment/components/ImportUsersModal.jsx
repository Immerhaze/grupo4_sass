'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

export default function ImportUsersModal({ open, onClose, onImport }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // Fake preview data for simulation
    setPreviewData([
      ['ID', 'Name', 'Role', 'Status'],
      ['U1001', 'Alice Torres', 'Student', 'Active'],
      ['U1002', 'Carlos Mendez', 'Teacher', 'Inactive'],
      ['U1003', 'Laura Díaz', 'Admin', 'Active'],
      ['U1004', 'Sofía Ruiz', 'Student', 'Active'],
      ['U1005', 'Jorge Zapata', 'Teacher', 'Inactive'],
    ]);
  };

  const simulateImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      onImport?.(selectedFile?.name || 'Simulated Import');
      onClose();
      setSelectedFile(null);
      setPreviewData([]);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className={"text-blue-950"}>Import Users from Excel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input type="file" accept=".xlsx, .csv, .txt" onChange={handleFileChange} />

          {previewData.length > 0 && (
            <ScrollArea className="max-h-64 border rounded-md p-2 text-sm">
              <table className="w-full">
                <thead>
                  <tr className="font-semibold">
                    {previewData[0].map((header, idx) => (
                      <th key={idx} className="px-2 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1).map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="px-2 py-1">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              onClick={simulateImport}
              disabled={!selectedFile || isImporting}
              className="bg-blue-600 text-white"
            >
              {isImporting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Importing...
                </>
              ) : (
                'Import Users'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
