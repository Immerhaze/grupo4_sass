import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // Ajusta si tu archivo de config está en otro lado
import prisma from '@/lib/prisma'

import GeneralTopDataSection from "./components/GeneralTopDataSection";
import FeedContainer from "./components/feed/FeedContainer";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { institution: true },
  })

  if (!user?.institution?.isActive) {
    return redirect(`/onboarding/${user.institution.id}`)
  }

  return (
    <div className="h-screen w-full flex flex-col ">
      <GeneralTopDataSection />
      <FeedContainer />
    </div>
  )
}
