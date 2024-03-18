CREATE DATABASE stepful_scheduling; 

CREATE TABLE users( 
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  role VARCHAR(10) CHECK (role IN ('coach', 'student')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  coach_id INTEGER NOT NULL,
  student_id INTEGER NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coach_id) REFERENCES users(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

CREATE INDEX idx_slots_on_start_time_and_coach_id ON slots(start_time, coach_id);

CREATE TABLE calls (
    id SERIAL PRIMARY KEY,
    slot_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    coach_id INTEGER NOT NULL,
    satisfaction_score INTEGER CHECK (satisfaction_score BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (slot_id) REFERENCES slots(id),
    FOREIGN KEY (student_id) REFERENCES users(id)
    FOREIGN KEY (coach_id) REFERENCES users(id)
);

CREATE INDEX idx_calls_on_student_id_and_slot_id ON calls(student_id, slot_id);
