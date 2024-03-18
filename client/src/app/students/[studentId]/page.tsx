import PageProvider from "@/Components/PageProvider";
import { StudentDashboard } from "@/Components/StudentDashboard/StudentDashboard";
import { sortSlots } from "@/utils/date";
import { fetchAvailableSlots, getStudentSlots } from "@/utils/fetch";

export default async function StudentDash({ params }: { params: { studentId: string } }) {
  const availableSlots = sortSlots((await fetchAvailableSlots()).filter(slot => !slot.isCompleted))
  const bookedSlots = sortSlots((await getStudentSlots(params.studentId)).filter(slot => !slot.isCompleted))

  return (
    <PageProvider>
      <StudentDashboard studentId={params.studentId} coachingSlots={availableSlots} bookedSlots={bookedSlots} />
    </PageProvider>
  )

}