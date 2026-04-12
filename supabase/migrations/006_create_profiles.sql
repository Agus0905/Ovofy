-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text default 'student',
  nombre text,
  apellido text,
  email text,
  dni text,
  fecha_nacimiento date,
  colegio text,
  barrio text,
  avatar_url text,
  created_at timestamp default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);
