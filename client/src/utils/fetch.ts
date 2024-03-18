import { API_BASE_URL } from "@/config/constants"
import { Call, Slot, User } from "@/types/types"

export const fetchCoachSlots = async (coachId: string): Promise<Slot[]> => {
  const resp = await fetch(`${API_BASE_URL}/getSlots/${coachId}`, { cache: 'no-store' })
  const result = await resp.json()
  const slots = result.map((slot: any) => ({
    startTime: slot.start_time,
    coachName: slot.coach_name,
    isBooked: slot.is_booked,
    id: slot.slot_id,
    studentName: slot.student_name,
    studentPhoneNumber: slot.student_phone_number,
    endTime: slot.end_time,
    isCompleted: slot.is_completed
  }))
  return slots
}

export const fetchStudentsList = async (): Promise<User[] | undefined> => {
  try {
    const resp = await fetch(`${API_BASE_URL}/getStudents`)
    const results = await resp.json()
    const students = results.map((st: any) => ({
      id: st.id,
      name: st.name,
      phoneNumber: st.phone_number
    }))
    return students
  } catch (err) {
    console.log(err)
    return undefined
  }

}

export const fetchCoachesList = async (): Promise<User[]> => {
  const resp = await fetch(`${API_BASE_URL}/getCoaches`)
  const results = await resp.json()
  const coaches = results.map((coach: any) => ({
    id: coach.id,
    name: coach.name,
    phoneNumber: coach.phone_number
  }))
  return coaches
}

interface NewSlotValues {
  startTime: Date
  coachId: string
}
export const createCoachSlot = async ({ startTime, coachId }: NewSlotValues): Promise<void> => {
  const reqParams = {
    "start_time": startTime.toISOString(),
    "coach_id": coachId
  }

  await fetch(`${API_BASE_URL}/createSlot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqParams)
  })
}

export const fetchAvailableSlots = async (): Promise<Slot[]> => {
  const resp = await fetch(`${API_BASE_URL}/getSlots`, { cache: 'no-store' })
  const results = await resp.json()
  const slots = results.map((slot: any) => ({
    startTime: slot.start_time,
    coachName: slot.coach_name,
    isBooked: slot.is_booked || false,
    id: slot.slot_id,
    studentName: slot.student_name,
    studentPhoneNumber: slot.student_phone_number,
    endTime: slot.end_time,
    isCompleted: slot.is_completed
  }))
  return slots
}

export const bookSlot = async (slotId: string, studentId: string): Promise<void> => {
  const reqParams = {
    "student_id": studentId
  }

  await fetch(`${API_BASE_URL}/bookSlot/${slotId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqParams)
  })
}

export const getStudentSlots = async (studentId: string): Promise<Slot[]> => {
  const resp = await fetch(`${API_BASE_URL}/getStudentSlots/${studentId}`, { cache: 'no-store' })
  const results = await resp.json()
  const studentSlots = results.map((slot: any) => ({
    startTime: slot.start_time,
    endTime: slot.end_time,
    id: slot.id,
    studentId: slot.student_id,
    coachId: slot.coach_id,
    coachName: slot.coach_name,
    coachPhoneNumber: slot.coach_phone_number,
    isCompleted: slot.is_completed,
    isBooked: slot.is_booked // Should always be true
  }))

  return studentSlots
}


interface RecordCallFeedbackParams {
  notes: string
  slotId?: string
  satisfactionScore: number
}

export const recordCallFeedback = async ({ notes, slotId, satisfactionScore }: RecordCallFeedbackParams): Promise<void> => {
  const reqParams = {
    "satisfaction_score": satisfactionScore,
    "notes": notes
  }

  await fetch(`${API_BASE_URL}/addCallHistory/${slotId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqParams)
  })
}

export const getCompletedCalls = async (coachId: string): Promise<Call[]> => {
  const resp = await fetch(`${API_BASE_URL}/getCalls/${coachId}`, { cache: 'no-store' })
  const results = await resp.json()
  const calls = results.map((call: any) => ({
    startTime: call.start_time,
    studentName: call.student_name,
    notes: call.notes,
    satisfactionScore: call.satisfaction_score
  }))

  return calls
}