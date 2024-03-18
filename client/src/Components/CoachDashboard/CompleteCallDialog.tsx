import useHandleReload from "@/app/hooks/useHandleReload"
import { Slot } from "@/types/types"
import { recordCallFeedback } from "@/utils/fetch"
import { Box, Button, Dialog, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React from 'react'

interface CompleteCallDialogProps {
  open: boolean
  handleClose: () => void
  selectedSlot?: Slot
}

const dropdownItems = new Array(5).fill(0).map((_, i) => i + 1)

export const CompleteCallDialog: React.FC<CompleteCallDialogProps> = ({ open, handleClose, selectedSlot }) => {
  const [satisfactionScore, setSatisfactionScore] = React.useState(dropdownItems[0])
  const [notes, setNotes] = React.useState('')
  const handleReload = useHandleReload()

  const handleSubmit = React.useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await recordCallFeedback({ slotId: selectedSlot?.id, notes, satisfactionScore }).then(() => {
        handleReload()
        handleClose()
      })
    } catch (err) {
      console.log(err)
    }
  }, [notes, satisfactionScore])

  // reset notes and satisfaction score
  const handleResetAndClose = () => {
    handleClose()
    setNotes('')
    setSatisfactionScore(dropdownItems[0])
  }

  return (
    <Dialog fullScreen={false} open={open} onClose={handleResetAndClose} PaperProps={{
      sx: { width: '400px', padding: '48px', border: '1px solid white', borderRadius: '4px', backgroundColor: 'black' }
    }}>
      <Box sx={{ color: 'white', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Box>
          <Typography variant="h5">Add Call Feedback</Typography>
          <Typography variant="body1">Student: {selectedSlot?.studentName}</Typography>
          {selectedSlot?.startTime && <Typography variant="body2">Call time: {new Date(selectedSlot?.startTime).toLocaleString()}</Typography>}
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <InputLabel id="select-satisfaction-score" sx={{ mr: '8px' }}>Satisfaction score:</InputLabel>
              <Select onChange={(e) => setSatisfactionScore(Number(e.target.value))}
                value={satisfactionScore}
                labelId="select-satisfaction-score"
                id="satisfaction-score"
                sx={{ backgroundColor: 'white', height: '24px' }}>
                {dropdownItems.map((score) => (
                  <MenuItem key={score} value={score}>{score}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="notes-text">Notes:</InputLabel>
              <TextField fullWidth rows={4} multiline value={notes} onChange={(e) => setNotes(e.target.value)} id="notes-text" placeholder="Notes" sx={{ backgroundColor: 'white', color: 'black' }} InputLabelProps={{ color: 'primary' }} />
            </Box>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  )
}