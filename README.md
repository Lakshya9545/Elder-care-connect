# ElderCare Connect

A comprehensive healthcare management and wellness tracking platform designed to empower seniors. ElderCare Connect improves the quality of life for elderly individuals by offering tools for medication tracking, appointment scheduling, emergency contact access, and daily activity monitoring.

## Aim of ElderCare Connect

The aim of ElderCare Connect is to empower seniors by providing an all-in-one digital solution for healthcare management and wellness tracking. It focuses on enhancing senior well-being while enabling caregivers to stay informed, organized, and proactive in supporting their loved ones.

## Problem Statement

As people age, managing health and daily activities becomes increasingly challenging. Many seniors struggle with remembering medications, keeping up with appointments, and ensuring timely emergency responses. Additionally, caregivers often lack a centralized platform to monitor and support senior well-being. ElderCare Connect addresses these issues by offering a user-friendly platform to streamline healthcare management and improve communication between seniors and their caregivers.

## Features

### Frontend (React + Tailwind CSS)

- Modern, responsive design with Tailwind CSS
- Hero section highlighting the platform’s mission to empower seniors
- Dashboard showcasing key metrics like upcoming appointments, medication reminders, and activity logs
- Navigation bar with links to:
  - **Medication Tracking**
  - **Appointments**
  - **Emergency Contacts**
  - **Daily Activity**
- Footer section with:
  - **Contact information**
  - **Quick links** (About Us, FAQ, Support)
  - **Newsletter subscription**

### Backend (Supabase)

- Database schema with tables for:
  - **Users** – Senior profiles and caregiver access
  - **Medications** – Tracks schedules, dosages, and reminders
  - **Appointments** – Manages schedules and notifications
  - **Emergency Contacts** – Stores critical contact details
  - **Activity Logs** – Records daily wellness data
- Row Level Security (RLS) policies for data protection
- User authentication integration for secure access

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Authentication, Row Level Security)

## Screenshots

![image](https://github.com/user-attachments/assets/d43fbfdc-6cd9-41e4-bf54-e3382eafdb5f)
![image](https://github.com/user-attachments/assets/3b53024a-9ebd-4792-a96d-bea4b5c29da3)
![image](https://github.com/user-attachments/assets/1a1a7f85-2c4b-4088-be6c-de20e351d3bc)
![image](https://github.com/user-attachments/assets/9ceacb3a-29b1-407d-887e-448584338530)
![image](https://github.com/user-attachments/assets/6cd13750-73eb-4ad6-b6f7-5c1cb618e6c9)
![image](https://github.com/user-attachments/assets/6f63d3b7-9a65-4e88-b842-b8607ff4112c)


## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Git
- Supabase account

### Step 1: Clone the Repository
    ```bash
    # Clone the repository
    git clone https://github.com/MohammadAman5577/Elder-care-connect.git

    # Navigate to project directory
    cd Elder-care-connect


### Step 2: Environment Setup
    ```bash
    # Copy example environment file
    cp .env.example .env.local

    # Open .env.local and add your environment variables
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_API_URL=your_api_url
### Step 3: Install Dependencies
    ```bash
    # Install project dependencies
    npm install

    # If you prefer using yarn
    yarn install
### Step 4: Database Setup

 1.Create a new project in Supabase
 2.Run the database migrations

     ```bash
     npm run migrate

### Step 5: Start Development Server
      ```bash
      # Start the development server
      npm run dev
      # The server will start on http://localhost:5173
### Step 6: Build for Production
      ```bash
      # Create production build
      npm run build

      # Preview production build
      npm run preview

