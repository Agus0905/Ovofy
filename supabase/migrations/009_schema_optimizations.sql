-- Migration 009: Schema Optimizations and New Features Support

-- 1. Ensure courses has is_active (it was present in initial migration but adding guard)
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='is_active') THEN
    ALTER TABLE courses ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- 2. Enhance enrollments with tracking and matching data
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS enrolled_at timestamptz DEFAULT now();
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS match_score integer DEFAULT 0; -- Affinement score 0-100

-- 3. Normalize university data types (Convert text to arrays)
-- We use USING clause to split existing comma-separated strings into actual Postgres arrays
ALTER TABLE universities 
  ALTER COLUMN scholarships TYPE text[] USING string_to_array(scholarships, ','),
  ALTER COLUMN strengths TYPE text[] USING string_to_array(strengths, ',');

-- 4. Create Quiz Results table for vocational persistence
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  answers jsonb NOT NULL, -- Raw answers for future re-analysis
  career_matches jsonb NOT NULL, -- Array of objects: [{"carrera": "Derecho", "score": 95}, ...]
  created_at timestamptz DEFAULT now()
);

-- 5. Create Achievements table for gamification
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'first_enrollment', 'course_completed', 'quiz_perfect_match', etc.
  metadata jsonb, -- Flexible field for badge images or specific details
  awarded_at timestamptz DEFAULT now()
);

-- 6. Security: Enable RLS and set Policies
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Quiz Results Policies
CREATE POLICY "Students can view own quiz results" 
  ON quiz_results FOR SELECT 
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own quiz results" 
  ON quiz_results FOR INSERT 
  WITH CHECK (student_id = auth.uid());

-- Achievements Policies
CREATE POLICY "Everyone can view achievements" 
  ON achievements FOR SELECT 
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_student_id ON quiz_results(student_id);
CREATE INDEX IF NOT EXISTS idx_achievements_student_id ON achievements(student_id);
