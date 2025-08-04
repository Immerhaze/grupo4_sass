'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function RegisterUserModal({ open, onClose, onRegister }) {
  // 📌 Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    rol: '',
    cargo: '',
    cursos: [],
    estado: 'Activo',
  });

  // 📌 Lista fija de roles y estados (puedes hacerlos dinámicos después)
  const roles = ['Estudiante', 'Profesor', 'Administrador'];
  const estados = ['Activo', 'Inactivo'];

  // 🧠 useEffect para limpiar formulario cuando se abre/cierra
  useEffect(() => {
    if (!open) {
      setFormData({
        name: '',
        id: '',
        rol: '',
        cargo: '',
        cursos: [],
        estado: 'Activo',
      });
    }
  }, [open]);

  // 🧠 Manejador para campos individuales
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // 🧠 Enviar formulario
  const handleSubmit = () => {
    // Validación básica
    if (!formData.name || !formData.id || !formData.rol) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }
    onRegister(formData); // función pasada desde el padre
    onClose(); // cerrar el modal
  };

  const formLabelColor="text-blue-500"

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl space-y-4">
        <DialogHeader>
          <DialogTitle className={"text-blue-950"}>Registrar nuevo usuario</DialogTitle>
          <DialogDescription>
            Completa la información básica del usuario para agregarlo a la plataforma.
          </DialogDescription>
        </DialogHeader>
       <ScrollArea className="space-y-6 max-h-[70vh] pr-2">
          {/* Nombre */}
          <div className="flex flex-col gap-2 mb-4">
            <Label className={formLabelColor}>Nombre completo *</Label> 
            <Input
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Ej. Juan Pérez"
            />
          </div>

          {/* ID */}
          <div className="flex flex-col gap-2 mb-4">
            <Label className={formLabelColor}>ID o Documento *</Label>
            <Input
              value={formData.id}
              onChange={e => handleChange('id', e.target.value)}
              placeholder="Ej. 11223344"
            />
          </div>

          {/* Rol */}
          <div className="flex flex-col gap-2 mb-4">
            <Label className={formLabelColor}>Rol *</Label>
            <Select value={formData.rol} onValueChange={val => handleChange('rol', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(rol => (
                  <SelectItem key={rol} value={rol}>{rol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cargo */}
          <div className="flex flex-col gap-2 mb-4">
            <Label className={formLabelColor}>Cargo</Label>
            <Input
              value={formData.cargo}
              onChange={e => handleChange('cargo', e.target.value)}
              placeholder="Ej. Coordinador"
            />
          </div>

          {/* Estado */}
          <div className="flex flex-col gap-2 mb-4">
            <Label className={formLabelColor}>Estado</Label>
            <Select value={formData.estado} onValueChange={val => handleChange('estado', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {estados.map(e => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
