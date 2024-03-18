import { Slot } from "@/types/types"
import React from "react"

interface UseCoachDashboardReturn {
  dialogOpen: boolean
  handleOpenDialog: (slot: Slot) => void
  handleCloseDialog: () => void
  selectedSlot?: Slot
}

export function useCoachDashboard(): UseCoachDashboardReturn {
  const [completeCallDialogOpen, setCompleteCallDialogOpen] = React.useState(false)
  const [selectedSlot, setSelectedSlot] = React.useState<Slot | undefined>()

  const handleOpenDialog = (slot: Slot) => {
    setSelectedSlot(slot)
    setCompleteCallDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setCompleteCallDialogOpen(false)
  }

  return {
    dialogOpen: completeCallDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    selectedSlot
  }
}