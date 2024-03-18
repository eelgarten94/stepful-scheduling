import { CoachDashboard } from '@/Components/CoachDashboard/CoachDashboard'
import PageProvider from '@/Components/PageProvider'
import { sortSlots } from '@/utils/date'
import { fetchCoachSlots, getCompletedCalls } from '@/utils/fetch'
import React from 'react'

export default async function CoachDash({ params }: { params: { coachId: string } }) {
  const coachSlots = sortSlots((await fetchCoachSlots(params.coachId)).filter(slot => !slot.isCompleted))
  const completedCalls = (await getCompletedCalls(params.coachId)).sort((a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf())

  return (
    <PageProvider>
      <CoachDashboard coachId={params.coachId} coachSlots={coachSlots} completedCalls={completedCalls} />
    </PageProvider>)
}