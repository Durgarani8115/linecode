# User Profile Assignment (lcassignment)

## Project Overview

This is a React-based web application for creating and managing a user profile. The app features a modern UI built with Tailwind CSS and includes the following functionality:

- **User Profile Form:** Collects user details such as name, email, phone, date of birth, address, LinkedIn, GitHub, skills, education, and career objective.
- **Session Storage:** Saves form data to sessionStorage for persistence during the session.
- **PDF Generation:** Allows users to generate a PDF of their profile using jsPDF and jsPDF-AutoTable.
- **Form Actions:** Users can save, clear, or export their profile as a PDF.
- **Responsive Design:** The UI is responsive and styled with Tailwind CSS and custom styles.

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/) (for fast development and build)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd lcassignment
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
This will launch the app at [http://localhost:5173](http://localhost:5173) (default Vite port).

### Building for Production
To build the app for production:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Preview Production Build
To preview the production build locally:
```bash
npm run preview
```

## Project Structure
- `src/` — Main source code (components, styles, assets)
- `public/` — Static files (favicon,logo, etc.)
- `package.json` — Project metadata and scripts

## License
This project is for assignment/demo purposes. 