import { useRouter } from "next/navigation"
import { useTransition } from 'react'

export default function useCoachDashboard(): () => void {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleReload = async () => {
    startTransition(() => {
      router.refresh() // Get updated dataset 
    })
  }
  return handleReload
}