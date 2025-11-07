# SITS Complaint Management System - Technical Documentation

This document provides a comprehensive overview of the SITS Complaint Management System, covering its technical architecture, development effort, operational flow, and specific use cases for different user roles.

## 1. 🚀 Tech Stack

The application is built with a modern and efficient tech stack, focusing on performance, maintainability, and a rich user experience.

### Frontend
*   **React**: The core JavaScript library for building dynamic and interactive user interfaces.
*   **TypeScript**: Enhances code quality and developer experience by providing static type checking, reducing bugs and improving code readability.
*   **Tailwind CSS**: A utility-first CSS framework used for all styling, enabling rapid and consistent responsive design without writing custom CSS.
*   **Vite**: A modern build tool that provides an extremely fast development server and optimized production builds, significantly improving developer productivity.
*   **Lucide React**: A comprehensive and customizable icon library integrated for all graphical icon needs across the application.
*   **Custom Hooks**: Utilizes custom React hooks like `useSafeLocalStorage` for managing and persisting client-side data.

### Backend
*   **Supabase**: Serves as the primary Backend-as-a-Service (BaaS), handling database operations, authentication, and real-time capabilities. It provides a PostgreSQL database, authentication services, and API generation.
*   **LocalStorage Fallback**: For development convenience or scenarios where Supabase is not configured, the system includes a `localStorage` fallback for storing complaints and feedback data directly in the user's browser.

## 2. ⏱️ Average Time to Build This Website Manually

Estimating the manual build time for a system like this involves various stages, from planning and design to development, testing, and deployment.

*   **Planning & Design (UI/UX, Database Schema)**: 1-2 weeks
*   **Frontend Development (React, TypeScript, Tailwind CSS)**: 3-5 weeks
    *   Component development (forms, dashboards, tables, modals)
    *   State management and data integration
    *   Responsive design implementation
    *   Authentication UI (Login, Signup, Forgot Password)
*   **Backend Integration (Supabase setup, API calls, LocalStorage fallback)**: 1-2 weeks
*   **Testing (Unit, Integration, UI, Responsiveness)**: 1 week
*   **Deployment & Configuration**: 0.5-1 week

**Total Estimated Manual Build Time: Approximately 6-11 weeks (2.5 to 3 months) for a single experienced developer.** This estimate assumes a clear understanding of requirements and minimal scope changes.

## 3. 🌐 How Things Work in the Website

The SITS Complaint Management System operates as a Single Page Application (SPA) with a clear separation of concerns and a state-driven architecture.

*   **Client-Side Rendering**: The entire application is rendered on the client-side using React, providing a fast and interactive user experience.
*   **Internal State-Based Routing**: Navigation within the application is managed using React's `useState` hook (`currentPage`). This means there are no external routing libraries like `react-router-dom`, simplifying the routing logic.
*   **Data Flow**:
    *   **Authentication**: Users (students and admins) log in or sign up. Authentication is handled by checking against a local `users` state, which is persisted in `localStorage`.
    *   **Data Persistence**: Complaint and feedback data are primarily managed through Supabase. If Supabase credentials are not configured or an error occurs, the system gracefully falls back to `localStorage` for data storage, ensuring continuous operation during development or offline use.
    *   **State Management**: `useState` and `useEffect` hooks are used extensively for managing component-level state and synchronizing data with `localStorage` or Supabase.
*   **Component-Based Architecture**: The application is composed of small, reusable React components (e.g., `ComplaintForm`, `Header`, `Sidebar`, `Dashboard`, `Profile`, `SystemSettings`, `Notifications`). This modular approach enhances maintainability and scalability.
*   **Styling**: All visual presentation is handled by Tailwind CSS utility classes, ensuring a consistent and responsive design across various devices.

## 4. 🎯 Use Cases for Client (Student) and Admin

The system provides distinct functionalities tailored to the needs of students and administrators.

### For Students (Client)
*   **Submit Complaints**: Students can easily submit new complaints, providing details such as issue type, subject, and description.
*   **View Public Dashboard**: Access a public-facing dashboard to see overall complaint statistics and recent public complaints, promoting transparency.
*   **Provide Feedback**: Submit ratings and comments on resolved complaints, contributing to the system's continuous improvement.
*   **Track Complaint Status**: While not explicitly shown as a dedicated "My Complaints" page in the current structure, a student would typically be able to view the status of their own submitted complaints.

### For Administrators (Admin)
*   **Dashboard Overview**: Get a quick summary of total, pending, in-progress, and resolved complaints.
*   **Complaint Management**: View, filter, search, and update the status of all submitted complaints from a centralized interface.
*   **Admin Profile Management**: Edit and update their personal and system access information.
*   **System Settings Configuration**: Manage various system-wide settings, including general information, user management policies, notification preferences, security parameters, and database backup configurations.
*   **Generate Reports**: Create and export detailed reports (PDF, Excel, CSV) for analytical purposes and record-keeping.
*   **System Status Monitoring**: Monitor the health and uptime of critical system components like web servers, databases, and network.
*   **Quick Actions**: Access frequently used administrative tasks from a dedicated panel for efficiency.

## 5. 🔄 Sequence of Things

Here's a typical sequence of interactions within the SITS Complaint Management System:

1.  **Access & Authentication**:
    *   A user navigates to the application.
    *   They are presented with a **Login Form**.
    *   New users can navigate to the **Signup Form** to create an account (either as a 'student' or 'admin').
    *   Existing users can log in with their credentials. If forgotten, they can use the **Forgot Password Form**.
    *   Upon successful login, the user's role (`student` or `admin`) determines the available navigation and content.

2.  **Student Workflow**:
    *   After logging in, a student lands on their **Home** dashboard (which might be a simplified view or direct access to the complaint box).
    *   They can navigate to the **Complaint Box** to submit a new complaint.
    *   They can view the **Public Dashboard** to see general statistics.
    *   They can visit the **Feedback Module** to provide feedback on resolved complaints.
    *   They can **Logout**.

3.  **Admin Workflow**:
    *   After logging in, an admin lands on the **Dashboard**, which provides an overview of system statistics and quick actions.
    *   From the sidebar, they can navigate to:
        *   **Admin Profile**: To manage their profile and view their assigned complaints.
        *   **View Complaints**: To see a detailed list of all complaints, filter them, update their statuses, and delete them.
        *   **Generate Report**: To create and download various reports.
        *   **System Settings**: To configure global application settings.
        *   **Quick Actions**: To access frequently used administrative tasks.
        *   **System Status**: To monitor the health of the application's components.
    *   They can **Logout**.

4.  **Data Interaction**:
    *   When a complaint is submitted, it's saved to Supabase (or `localStorage` as a fallback).
    *   When an admin updates a complaint's status, the change is persisted.
    *   When feedback is submitted, it's saved to Supabase (or `localStorage`).
    *   All data displayed in dashboards and reports is fetched from the persistent storage.

5. **Preview**

    