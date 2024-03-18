'use client'
import { User } from '@/types/types'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UserCard } from './UserCard'


interface StudentsViewProps {
  students?: User[]
}
export const StudentsView: React.FC<StudentsViewProps> = ({ students }) => {
  const router = useRouter()

  const handleClick = React.useCallback((id: string) => {
    router.push(`/students/${id}`)
  }, [router])

  return <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
    <Typography variant='h5'>Choose a student:</Typography>
    {students?.map((student) => (
      <UserCard user={student} key={student.name} handleClick={() => handleClick(student.id)} />
    ))}
  </Box>
}

