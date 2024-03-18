'use client'
import { API_BASE_URL } from "@/config/constants"
import { Box, Typography } from "@mui/material"
import React from "react"
import { UserCard } from "./UserCard"
import { useRouter } from "next/navigation"
import { User } from "@/types/types"

interface CoachesViewProps {
  coaches: User[]
}

export const CoachesView: React.FC<CoachesViewProps> = ({ coaches }) => {
  const router = useRouter()

  const handleClick = React.useCallback((id: string) => {
    router.push(`/coaches/${id}`)
  }, [router])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
      <Typography variant='h5'>Choose a coach:</Typography>
      {coaches.map((coach) => (
        <UserCard user={coach} key={coach.name} handleClick={() => handleClick(coach.id)} />
      ))}
    </Box>
  )
}