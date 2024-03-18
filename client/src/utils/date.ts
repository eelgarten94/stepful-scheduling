import { Slot } from "@/types/types"

export const startTimeHasConflicts = (startTime: Date, rangeStart: string, rangeEnd: string): boolean => {
  const rangeStartDate = new Date(rangeStart)
  const rangeEndDate = new Date(rangeEnd)

  if (startTime >= rangeStartDate && startTime < rangeEndDate) return true
  return false
}

export const sortSlots = (slots: Slot[]): Slot[] => {
  return slots.sort((a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf())
}