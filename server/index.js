const express = require('express')
const app = express();
const cors = require('cors')
const pool = require('./db')

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all coaches - GET
app.get('/getCoaches', async (req, res) => {
  try {
    const coaches = await pool.query("SELECT * FROM users where role='coach' ")
    res.json(coaches.rows)
  } catch (err) {
    console.log(err.message)
  }
})


// Get all students - GET 
app.get('/getStudents', async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM users where role='student' ")
    res.json(students.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// SLOTS 
// Create slot - POST (start_time)
app.post('/createSlot', async (req, res) => {
  try {
    const { start_time, coach_id } = req.body;
    const newSlot = await pool.query('INSERT INTO slots (coach_id, start_time) VALUES($1, $2)', [
      coach_id, start_time
    ])
    res.status(200)
    res.send('Slot successfully added.')
  } catch (err) {
    console.log(err.message);
  }
})

// View slots - coach -- GET 
app.get('/getSlots/:coachId', async (req, res) => {
  try {
    const { coachId } = req.params;
    const coachSlots = await pool.query(`
    SELECT 
    s.id AS slot_id, 
    s.start_time, 
    s.end_time, 
    s.is_booked, 
    s.coach_id, 
    s.is_completed,
    coach.name AS coach_name,
    coach.phone_number AS coach_phone_number,
    s.student_id, 
    student.name AS student_name,
    student.phone_number AS student_phone_number
    FROM slots s
    JOIN users coach ON s.coach_id = coach.id
    LEFT JOIN users student ON s.student_id = student.id
    WHERE s.coach_id = $1`, [coachId])
    res.json(coachSlots.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// View available slots for all coaches -- GET
app.get('/getSlots', async (req, res) => {
  try {
    const allSlots = await pool.query(`SELECT 
    s.id AS slot_id, 
    s.start_time, 
    s.end_time,
    s.coach_id,
    s.is_completed,
    u.name AS coach_name
    FROM slots s
    JOIN users u ON s.coach_id = u.id WHERE is_booked=false`)
    res.json(allSlots.rows)
  } catch (err) {
    console.log(err.message)
  }
})

// Get booked slots for student -- GET 
app.get('/getStudentSlots/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentSlots = await pool.query(`
    SELECT 
    s.id AS slot_id, 
    s.start_time, 
    s.end_time,
    s.coach_id,
    s.is_completed,
    u.name AS coach_name,
    u.phone_number AS coach_phone_number
    FROM slots s
    JOIN users u ON s.coach_id = u.id WHERE student_id=$1`, [studentId])
    res.json(studentSlots.rows)
  } catch (err) {
    console.log(err.message)
  }
})


// BOOKING 
// Book slot -- POST
app.patch('/bookSlot/:slotId', async (req, res) => {
  try {
    const { slotId } = req.params;
    const { student_id } = req.body;
    const slot = await pool.query('UPDATE slots SET is_booked=true, student_id=$2 WHERE id=$1 RETURNING *', [slotId, student_id])
    res.status(200)
    res.send("Slot successfully booked.")
  } catch (err) {
    console.log(err.message)
  }
})

// CALLS 
// Record Feedback -- POST (notes, satisfaction_score)
app.post('/addCallHistory/:slotId', async (req, res) => {
  const client = await pool.connect();
  try {
    const { slotId } = req.params;
    const { notes, satisfaction_score } = req.body;

    await client.query('BEGIN');

    const slotResult = await client.query(
      'SELECT student_id, coach_id FROM slots WHERE id = $1',
      [slotId]
    );

    const { student_id, coach_id } = slotResult.rows[0];

    await client.query(
      'INSERT INTO calls (slot_id, student_id, coach_id, notes, satisfaction_score) VALUES ($1, $2, $3, $4, $5)',
      [slotId, student_id, coach_id, notes, satisfaction_score]
    );
    await client.query(
      'UPDATE slots SET is_completed = TRUE WHERE id = $1',
      [slotId]
    );

    await client.query('COMMIT');

    res.status(200)
    res.send("Call feedback successfully recorded.")
  } catch (err) {
    await client.query('ROLLBACK')
    console.log(err.message)
  } finally {
    client.release()
  }
})

// View past calls -- GET
app.get('/getCalls/:coachId', async (req, res) => {
  try {
    const { coachId } = req.params

    const calls = await pool.query(`
    SELECT 
    c.id AS call_id,
    c.slot_id,
    c.notes,
    c.satisfaction_score,
    s.start_time,
    s.end_time,
    student.name AS student_name
    FROM calls c
    JOIN slots s ON c.slot_id = s.id
    JOIN users coach ON s.coach_id = coach.id
    JOIN users student ON c.student_id = student.id WHERE s.coach_id=$1`, [coachId])
    res.json(calls.rows)
  } catch (err) {
    console.log(err.message)
  }
})

app.listen(5001, () => {
  console.log("server has started on port 5001");
})