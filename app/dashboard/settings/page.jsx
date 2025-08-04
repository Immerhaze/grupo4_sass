'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Select,SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DUMMY_INSTITUTION_DATA, DUMMY_UPLOAD_HISTORY } from '@/lib/dummyConfigData';

export default function ConfigPage() {
  const [role, setRole] = useState('admin'); // 'admin' | 'profesor' | 'alumno'

  // Estados para simulación de admin
  const [schoolName, setSchoolName] = useState(DUMMY_INSTITUTION_DATA.schoolName);
  const [logoName] = useState(DUMMY_INSTITUTION_DATA.logoName);
  const [primaryColor, setPrimaryColor] = useState(DUMMY_INSTITUTION_DATA.primaryColor);
  const [dates, setDates] = useState(DUMMY_INSTITUTION_DATA.semesterDates);

  // Estados comunes
  const [language, setLanguage] = useState('es');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [password, setPassword] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-sm">
        <Label>Selecciona tipo de usuario</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="profesor">Profesor</SelectItem>
            <SelectItem value="alumno">Estudiante / Apoderado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* VISTA ADMIN */}
      {role === 'admin' && (
        <Tabs defaultValue="institution">
          <TabsList>
            <TabsTrigger value="institution">Institución</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="dates">Fechas clave</TabsTrigger>
            <TabsTrigger value="uploads">Cargas</TabsTrigger>
          </TabsList>

          <TabsContent value="institution">
            <Card>
              <CardHeader><CardTitle>Información institucional</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Label>Nombre del colegio</Label>
                <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                <Label>Logo institucional</Label>
                <Input type="file" />
                {logoName && <p className="text-sm text-muted-foreground">{logoName}</p>}
                <Button>Guardar cambios</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader><CardTitle>Colores y branding</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Label>Color primario</Label>
                <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                <Button>Guardar branding</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dates">
            <Card>
              <CardHeader><CardTitle>Fechas académicas</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Label>Inicio de semestre</Label>
                <Input type="date" value={dates.startSemester} onChange={(e) => setDates({ ...dates, startSemester: e.target.value })} />
                <Label>Fin de semestre</Label>
                <Input type="date" value={dates.endSemester} onChange={(e) => setDates({ ...dates, endSemester: e.target.value })} />
                <Label>Periodo de evaluaciones</Label>
                <Input type="date" value={dates.evaluationPeriod} onChange={(e) => setDates({ ...dates, evaluationPeriod: e.target.value })} />
                <Button>Guardar fechas</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uploads">
            <Card>
              <CardHeader><CardTitle>Historial de cargas masivas</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Responsable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DUMMY_UPLOAD_HISTORY.map((upload) => (
                      <TableRow key={upload.id}>
                        <TableCell>{upload.id}</TableCell>
                        <TableCell>{upload.type}</TableCell>
                        <TableCell>{upload.date}</TableCell>
                        <TableCell>{upload.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* VISTA PROFESOR O ALUMNO */}
      {(role === 'profesor' || role === 'alumno') && (
        <div className="grid gap-6 max-w-xl">
          <Card>
            <CardHeader><CardTitle>Configuración de cuenta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>Cambiar contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
              />
              <Button>Guardar</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preferencias generales</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label>Idioma</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">Inglés</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="notificaciones"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <Label htmlFor="notificaciones">Recibir notificaciones por correo</Label>
              </div>

              <Button>Guardar preferencias</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Términos de uso</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                disabled
                className="text-sm text-muted-foreground"
                value="Al usar este sistema, aceptas los términos de uso de la plataforma educativa. Toda la información está protegida y su uso indebido puede ser sancionado."
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}