export interface User {
  id: string
  name: string
  phoneNumber: string
  role: 'student' | 'coach'
}

export interface UserCardProps {
  user: User
  handleClick?: () => void
}

export interface Slot {
  startTime: string
  endTime: string
  coachName: string
  coachId: string
  isBooked: boolean
  id: string
  studentName?: string
  studentPhoneNumber?: string
  coachPhoneNumber?: string
  isCompleted?: string
}

export interface Call {
  startTime: string
  studentName: string
  satisfactionScore: number
  notes: string
}
