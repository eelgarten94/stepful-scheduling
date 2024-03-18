import useHandleReload from "@/app/hooks/useHandleReload"
import { bookSlot } from "@/utils/fetch"

interface UseStudentDashboardProps {
  studentId: string
}

interface UseStudentDashboardReturn {
  handleBookSlot: (slotId: string) => void
}

export function useStudentDashboard({ studentId }: UseStudentDashboardProps): UseStudentDashboardReturn {
  const handleReload = useHandleReload()

  const handleBookSlot = async (slotId: string) => {
    try {
      await bookSlot(slotId, studentId).then(() => {
        handleReload()
      })
    } catch (err) {
      console.log("Failed to book available slot")
    }
  }

  return { handleBookSlot }
}