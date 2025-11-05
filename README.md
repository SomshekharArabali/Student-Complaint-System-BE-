# SITS Complaint Management System

This is a real-time complaint management system designed for educational institutions, providing a transparent and efficient way for students to submit complaints and for administrators to manage and resolve them.

## 🚀 Tech Stack

The project is built using a modern and robust set of technologies:

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly styling components and layouts.
*   **Vite**: A fast build tool that provides an instant development server and optimized production builds.
*   **Lucide React**: A collection of beautiful and customizable open-source icons.
*   **Supabase**: Used for backend services, including database operations, with a fallback to local storage for development or offline scenarios.
*   **useLocalStorage Hook**: A custom React hook for persistent client-side data storage.

## ⚙️ How to Set Up the Project Locally

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd SITS college complaint system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    # or pnpm install
    ```

3.  **Set up Supabase (Optional but Recommended):**
    If you want to use Supabase for persistent data storage (instead of just local storage fallback):
    *   Go to [Supabase](https://supabase.com/) and create a new project.
    *   Find your project's API keys and URL in the Project Settings -> API section.
    *   Create a `.env` file in the root of your project (if it doesn't exist) and add your Supabase credentials:
        ```
        VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```
    *   Ensure your Supabase database has `complaints` and `feedbacks` tables with appropriate schemas matching the `src/types/index.ts` interfaces.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev
    # or pnpm dev
    ```
    The application will typically open in your browser at `http://localhost:5173`.

## 💡 Use Cases

This system is designed to streamline the complaint management process within an educational institution, offering distinct functionalities for both students and administrators:

### For Students:

*   **Submit Complaints**: Easily submit new complaints regarding infrastructure, academic concerns, hostel issues, bullying, or general suggestions.
*   **Track Complaint Status**: Monitor the real-time status of their submitted complaints (Pending, In Progress, Resolved, Closed).
*   **Public Dashboard**: View overall statistics and recent complaints publicly, promoting transparency.
*   **Provide Feedback**: Submit feedback and ratings on resolved complaints, contributing to continuous improvement.

### For Administrators:

*   **Dashboard Overview**: Get a quick glance at total, pending, in-progress, and resolved complaints.
*   **Complaint Management**: View, filter, search, and update the status of all submitted complaints.
*   **Admin Profile**: Manage their personal and system access information.
*   **System Settings**: Configure various aspects of the system, including general info, user management, notifications, security, and database settings.
*   **Generate Reports**: Create and export detailed reports (PDF, Excel, CSV) for analysis and record-keeping.
*   **System Status Monitoring**: Check the health and uptime of various system components.
*   **Quick Actions**: Access frequently used administrative tasks from a centralized panel.

This system aims to foster a more responsive and accountable environment for addressing community concerns.