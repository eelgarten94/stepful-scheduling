import { UserCardProps } from "@/types/types"
import { Button, Box, Typography } from "@mui/material"

export const UserCard: React.FC<UserCardProps> = ({ user, handleClick }) => {

  return (
    <Button sx={{ width: '200px', border: '1px solid white', color: 'white', }} onClick={handleClick}>
      <Box sx={{ borderRadius: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='body1'>{user.name}</Typography>
        <Typography variant="body1"></Typography>
      </Box>
    </Button>
  )
}