'use client'

import { Slot } from "@/types/types"
import { Box, Button, Card, Typography } from "@mui/material"
import { useStudentDashboard } from "./StudentDashboard.hooks"

interface StudentDashboardProps {
  coachingSlots: Slot[]
  studentId: string
  bookedSlots?: Slot[]
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ coachingSlots, studentId, bookedSlots }) => {
  const { handleBookSlot } = useStudentDashboard({ studentId })

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="h5">Available slots</Typography>
        {coachingSlots.map((slot, idx) => (
          <StudentSlotCard key={idx}{...slot} handleBookSlot={() => handleBookSlot(slot.id)} />
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="h5"> {bookedSlots && bookedSlots.length > 0 ? 'My Booked Slots' : 'No current booked slots.'}</Typography>
        {bookedSlots?.map((slot, idx) => (
          <StudentSlotCard key={idx} {...slot} />
        ))}
      </Box>

    </Box>
  )

}

const StudentSlotCard: React.FC<Slot & { handleBookSlot?: () => void }> = ({ startTime, coachName, coachPhoneNumber, handleBookSlot }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '400px', border: '1px solid white', borderRadius: '4px', padding: '16px', justifyContent: 'space-between' }}>
      <Box sx={{ flexDirection: 'column' }}>
        <Typography variant="body2">Start time: {new Date(startTime).toLocaleString()}</Typography>
        <Typography variant="body2">Coach: {coachName}</Typography>
        {coachPhoneNumber && <Typography variant="body2">Phone Number: {coachPhoneNumber}</Typography>}
      </Box>
      {handleBookSlot && <Button onClick={handleBookSlot}>Book Slot</Button>}
    </Box>
  )
}