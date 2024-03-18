'use client'
import useHandleReload from "@/app/hooks/useHandleReload";
import { Call, Slot } from "@/types/types";
import { startTimeHasConflicts } from "@/utils/date";
import { createCoachSlot } from "@/utils/fetch";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from 'react';
import { useCoachDashboard } from "./CoachDashboard.hooks";
import { CompleteCallDialog } from "./CompleteCallDialog";

interface CoachDashboardProps {
  coachId: string
  coachSlots: Slot[]
  bookedSlots?: Slot[]
  completedCalls?: Call[]
}

const dropdownHours = new Array(24).fill(0).map((_, i) => `${i}:00:00`)

export const CoachDashboard: React.FC<CoachDashboardProps> = ({ coachId, coachSlots, completedCalls }) => {
  const [displayForm, setDisplayForm] = React.useState(false)
  const [startTime, setStartTime] = React.useState(dropdownHours[0])
  const [helperText, setHelperText] = React.useState('')
  const handleReload = useHandleReload()
  const { dialogOpen, handleOpenDialog, handleCloseDialog, selectedSlot } = useCoachDashboard()

  const handleSubmit = React.useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const today = new Date()
    const date = today.toDateString()
    const newSlotStart = new Date(`${date} ${startTime}`)

    for (let i = 0; i < coachSlots.length; i++) {
      if (startTimeHasConflicts(newSlotStart, coachSlots[i].startTime, coachSlots[i].endTime)) {
        return setHelperText('This appointment time has a conflict, please choose a different time.')
      }
    }

    createCoachSlot({ coachId, startTime: newSlotStart }).then(() => {
      setHelperText('New slot created successfully.')
      handleReload() // Get updated slots upon success
    })
  }, [startTime])

  return (
    <>
      <Box sx={{ width: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '48px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
            {coachSlots.length ? <Typography variant="h5">Coaching slots for {coachSlots[0]?.coachName}: </Typography> :
              <Typography variant="h5">
                No current coaching slots. Please add a slot.
              </Typography>}
            {coachSlots.map((slot: Slot) => (
              <CoachSlotCard {...slot} handleClick={() => handleOpenDialog(slot)} key={slot.id} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {completedCalls && completedCalls.length > 0 && <Typography variant="h5">Completed calls:</Typography>}
            {completedCalls?.map((call, idx) => (
              <CompletedCallCard {...call} key={idx} />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '48px', maxWidth: '200px' }}>
          <Button onClick={() => setDisplayForm(true)} sx={{ border: '1px solid white', height: '48px', width: '200px' }} endIcon={<AddIcon />}>Add new slot</Button>

          <Box>
            {displayForm &&
              <form onSubmit={handleSubmit}>
                <InputLabel id="select-start-time">Start time:</InputLabel>
                <Select onChange={(e) => setStartTime(e.target.value)} value={startTime} fullWidth labelId="select-start-time" id="start-time" sx={{ backgroundColor: 'white', height: '24px' }} >
                  {dropdownHours.map((hour: string) => (
                    <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                  ))}
                </Select>
                <Button fullWidth type="submit" sx={{ borderRadius: '4px', mt: '8px' }}>Submit</Button>
              </form>
            }
          </Box>
          <Typography>{helperText}</Typography>
        </Box>

      </Box>
      <CompleteCallDialog open={dialogOpen} handleClose={handleCloseDialog} selectedSlot={selectedSlot} />
    </>
  )
}


const CoachSlotCard: React.FC<Slot & { handleClick?: () => void }> = ({ startTime, endTime, isBooked, studentName, studentPhoneNumber, handleClick }) => {
  return (
    <Box sx={{ backgroundColor: isBooked ? '#1F9328' : '#A8A023', display: 'flex', flexDirection: 'row', border: '1px solid white', borderRadius: '4px', padding: '16px', width: '400px', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2">Start time: {new Date(startTime).toLocaleString()}</Typography>
        <Typography variant="body2">End time: {new Date(endTime).toLocaleString()}</Typography>
        {!isBooked && <Typography variant="body2">Open</Typography>}
        {isBooked && <Typography variant="body2">Booked by: {studentName}</Typography>}
        {isBooked && <Typography variant="body2">Phone number: {studentPhoneNumber}</Typography>}
      </Box>
      {isBooked && <Button onClick={handleClick}>Add Feedback</Button>}
    </Box>
  )
}

const CompletedCallCard: React.FC<Call> = ({ startTime, studentName, notes, satisfactionScore }) => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid white', borderRadius: '4px', padding: '16px', width: '400px', justifyContent: 'space-between', gap: '4px' }}>
      <Typography variant="body2">Call time: {new Date(startTime).toLocaleString()}</Typography>
      <Typography variant="body2">Student: {studentName}</Typography>
      <Typography variant="body2">Satisfaction score: {satisfactionScore}</Typography>
      <Typography variant="body2">Notes: {notes}</Typography>
    </Box>
  )
}
