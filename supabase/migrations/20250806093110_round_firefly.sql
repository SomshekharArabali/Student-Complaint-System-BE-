/*
  # Create complaints and feedbacks tables

  1. New Tables
    - `complaints`
      - `id` (text, primary key)
      - `name` (text, nullable)
      - `rollNumber` (text, nullable) 
      - `issueType` (text, not null)
      - `subject` (text, not null)
      - `description` (text, not null)
      - `dateSubmitted` (text, not null)
      - `status` (text, not null, default 'Pending')
      - `profileImage` (text, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, nullable)
    
    - `feedbacks`
      - `id` (text, primary key)
      - `complaintId` (text, not null)
      - `rating` (integer, not null)
      - `comment` (text, not null)
      - `submittedBy` (text, not null)
      - `submittedAt` (text, not null)
      - `dateSubmitted` (text, not null)
      - `helpful` (integer, default 0)
      - `notHelpful` (integer, default 0)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (read/write)
*/

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id text PRIMARY KEY,
  name text,
  rollNumber text,
  issueType text NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  dateSubmitted text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  profileImage text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id text PRIMARY KEY,
  complaintId text NOT NULL,
  rating integer NOT NULL,
  comment text NOT NULL,
  submittedBy text NOT NULL,
  submittedAt text NOT NULL,
  dateSubmitted text NOT NULL,
  helpful integer DEFAULT 0,
  notHelpful integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Create policies for complaints
CREATE POLICY "Anyone can read complaints"
  ON complaints
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert complaints"
  ON complaints
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update complaints"
  ON complaints
  FOR UPDATE
  TO public
  USING (true);

-- Create policies for feedbacks
CREATE POLICY "Anyone can read feedbacks"
  ON feedbacks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert feedbacks"
  ON feedbacks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update feedbacks"
  ON feedbacks
  FOR UPDATE
  TO public
  USING (true);