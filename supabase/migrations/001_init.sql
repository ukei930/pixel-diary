-- Create diary_entries table used by the app
create table if not exists public.diary_entries (
  id bigserial primary key,
  created_at timestamptz default now(),
  date text,
  content text,
  mood text,
  visibility text,
  image text,
  author_name text,
  author_picture text,
  author_email text
);
