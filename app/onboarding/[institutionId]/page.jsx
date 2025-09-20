"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import loginImage from "@/public/ellipses.png";

export default function OnboardingPage({ searchParams }) {
  const [step, setStep] = useState(1)


  // Step 1 - Institution
  const [institution, setInstitution] = useState({
    name:searchParams?.institutionName || "",
    email: searchParams?.email || "",
    address: "",
    location: "",
    phone: "",
    website: "",
    logo: null 
  })

  // Step 2 - Super Admin
  const [admin, setAdmin] = useState({
    name: "",
    email: institution.email,
    document: "",
    role: "",
    password: "",
    confirmPassword: "",
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = () => {
    // 🚀 Here we’d send institution + admin + plan data to backend
    console.log({  institution, admin, chosenPlan })
  }

  const [chosenPlan, setChosenPlan] = useState("basic")

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-500 to-blue-950">
   <Image src={loginImage} className="absolute left-0 bottom-0 w-1/2 h-auto z-10 animate-zoom-in duration-300 delay-500" alt="background ellipses"/>
    <h1 className='text-white font-semibold text-4xl tracking-widest text-left p-4'>DUCTU</h1>
    <div className="relative max-w-3xl mx-auto flex flex-col  p-8 space-y-4 z-20">
      <h2 className="text-3xl text-white">Registro y configuración de la institución</h2>
      {step === 1 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">Paso 1: Información de la Institución </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nombre Instituticion</Label>
              <Input value={institution.name} onChange={e => setInstitution({...institution, name:e.target.value})}  />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={institution.email} onChange={e => setInstitution({...institution, email:e.target.value})}   />
            </div>
            <div>
              <Label>Dirección</Label>
              <Input value={institution.address} onChange={e => setInstitution({ ...institution, address: e.target.value })} />
            </div>
            <div>
              <Label>Ubicacion - Ciudad</Label>
              <Input value={institution.location} onChange={e => setInstitution({ ...institution, location: e.target.value })} />
            </div>
            <div>
              <Label>Telefono</Label>
              <Input value={institution.phone} onChange={e => setInstitution({ ...institution, phone: e.target.value })} />
            </div>
            <div>
              <Label>Pagina Web</Label>
              <Input value={institution.website} onChange={e => setInstitution({ ...institution, website: e.target.value })} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" onChange={e => setInstitution({ ...institution, logo: e.target.files?.[0] || null })} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end ">
            <Button className={"bg-blue-500 hover:bg-blue-900 text-white  cursor-pointer"} onClick={handleNext}>Siguiente  <span class="icon-[iconamoon--arrow-right-6-circle-duotone] transition-all duration-300"></span></Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">Paso 2: Creación de Super Administrador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nombre Completo</Label>
              <Input value={admin.name} onChange={e => setAdmin({ ...admin, name: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={admin.email} onChange={e => setAdmin({ ...admin, email: e.target.value })} />
            </div>
            <div>
              <Label>Document de Identidad</Label>
              <Input value={admin.document} onChange={e => setAdmin({ ...admin, document: e.target.value })} />
            </div>
            <div>
              <Label>Role / Posicion</Label>
              <Input value={admin.role} onChange={e => setAdmin({ ...admin, role: e.target.value })} />
            </div>
            <div>
              <Label>Contraseña</Label>
              <Input type="password" value={admin.password} onChange={e => setAdmin({ ...admin, password: e.target.value })} />
            </div>
            <div>
              <Label>Confirmar Contraseña</Label>
              <Input type="password" value={admin.confirmPassword} onChange={e => setAdmin({ ...admin, confirmPassword: e.target.value })} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className={"cursor-pointer"} onClick={handlePrev} > <span class="icon-[iconamoon--arrow-left-6-circle-duotone] transition-all duration-300"></span> Anterior</Button>
            <Button className={"bg-blue-500 hover:bg-blue-900 text-white  cursor-pointer"} onClick={handleNext}>Siguiente  <span class="icon-[iconamoon--arrow-right-6-circle-duotone] transition-all duration-300"></span></Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">Paso 3: Escoge un Plan Mensual</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: "basic", name: "Basico", price: "$29/mo", features: ["Hasta 50 Estudiantes", "Soporte via Email"] },
              { id: "standard", name: "Estandard", price: "$59/mo", features: ["Hasta 200 Estudiantes", "Prioridad en Soporte"] },
              { id: "premium", name: "Premium", price: "$99/mo", features: ["Sin limitacion de estudaintes", "Soporte Dedicado"] },
            ].map(plan => (
              <Card
                key={plan.id}
                className={`cursor-pointer border-2 ${chosenPlan === plan.id ? "border-blue-500" : "border-muted"}`}
                onClick={() => setChosenPlan(plan.id)}
                >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-lg font-semibold">{plan.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-1">
                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
             <Button variant="outline" className={"cursor-pointer"} onClick={handlePrev} > <span class="icon-[iconamoon--arrow-left-6-circle-duotone] transition-all duration-300"></span> Anterior</Button>
             <Button className={"bg-blue-500 hover:bg-blue-900 text-white  cursor-pointer"} onClick={handleSubmit}> Terminar  <span class="icon-[lets-icons--done-ring-round-duotone]"></span></Button>
          </CardFooter>
        </Card>
      )}
    </div>
    </div>
  )
}
