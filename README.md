# FormCrafter
[![Live Site](https://img.shields.io/badge/Live%20Site-FormCrafter-blueviolet)](https://formcrafter-kwd8.vercel.app/)
  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-black?logo=github)](https://github.com/Shivankkumar09/Assignment_Hypergro)

## Table of Contents
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Bonus Features Implemented](#bonus-features-implemented)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Package.json Dependencies](#packagejson-dependencies)

## Project Overview
**FormCrafter** is a dynamic, interactive form builder application built with **React Remix** and **TypeScript**. It enables users to build customizable forms using a drag-and-drop interface with various field types and live preview functionality.
This project was developed as an assignment to demonstrate advanced frontend architecture, state management, design thinking, and the ability to build scalable, interactive user interfaces.
🔗 **Live Demo:** [https://assignment-hypergro-kwd8-6n3ldcp9s-shivanks-projects-43c26258.vercel.app/](https://assignment-hypergro-kwd8-6n3ldcp9s-shivanks-projects-43c26258.vercel.app/)

## Features
1. **Reorder Fields via Drag Actions**  
   - Powered by `@dnd-kit` with smooth field reordering
2. **Field Configuration**  
   - Customize labels, placeholders, required flag, help text, and options for applicable fields
3. **Real-Time Form Preview with Validation**  
   - Required fields, min/max length, email/phone regex validation
4. **Responsive Preview Modes**  
   - Switch between desktop, tablet, and mobile previews
5. **Template Loading and Saving**  
   - Load predefined templates  
   - Save forms locally or via API (backend extendable)
6. **Multi-Step Form Functionality**  
   - Multi-step navigation with validations per step  
   - Visual progress indicator
7. **Shareable Form ID Generation**  
   - Generate form IDs for shareable URLs  
   - Public “Form Filler” view for submission  
   - Load forms by ID

### Bonus Features Implemented
- Auto-save form state in localStorage  
- View submitted responses (stored locally)  
- Light/Dark theme toggle

## Tech Stack
- **Framework:** React Remix (TypeScript)  
- **Styling:** Tailwind CSS  
- **State Management:** Redux Toolkit  
- **Drag-and-Drop:** @dnd-kit  
- **Utilities:** React Icons, nanoid, uuid  
- **Build:** Vite, ESLint, PostCSS, Autoprefixer  
- **Runtime:** Node.js (v20+)

## Setup & Installation
```bash
# Clone the repository
git clone https://github.com/Shivankkumar09/FormCrafter.git
cd FormCrafter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
> ⚠️ Node.js v20 or higher is required.

## Usage
- Open the app locally or visit the [Live Demo](https://assignment-hypergro-kwd8-6n3ldcp9s-shivanks-projects-43c26258.vercel.app/)  
- Use "Add Field"   
- Configure field settings  
- Reorder using drag-and-drop  
- Preview the form in real-time  
- Use step-based forms with progress bars  
- Save the form and share the unique link  
- View responses (if creator)  
- Toggle between dark/light mode

## Folder Structure
```
/
├── app/
│   ├── components/      # UI components (FormCard, FieldAdder, etc.)
│   ├── routes/          # Remix route modules
│   ├── store/           # Redux Toolkit store and slices
│   ├── styles/          # Tailwind and global styles
│   └── utils/           # Utility helpers
├── public/              # Static assets
├── build/               # Remix build output
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## Contributing
This project was created as part of an assignment. Contributions are not expected at this time.  
Feel free to open issues for questions or suggestions.

## License
This project is for academic use only and is not under any open source license.  
Contact the author for permission to reuse or adapt.

## Package.json Dependencies
```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/modifiers": "^9.0.0",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@reduxjs/toolkit": "^2.8.2",
    "@remix-run/node": "^2.16.7",
    "@remix-run/react": "^2.16.7",
    "@remix-run/serve": "^2.16.7",
    "isbot": "^4.1.0",
    "nanoid": "^5.1.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.5.0",
    "react-redux": "^9.2.0",
    "uuid": "^11.1.0"
  },
  "devDependencies": {
    "@remix-run/dev": "^2.16.7",
    "@types/react": "^18.2.20",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.7.4",
    "@typescript-eslint/parser": "^6.7.4",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.38.0",
    "eslint-import-resolver-typescript": "^3.6.1",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.1.6",
    "vite": "^6.0.0",
    "vite-tsconfig-paths": "^4.2.1"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

**Thank you for reviewing my assignment project!**  
Feel free to explore the [live demo](https://assignment-hypergro-kwd8-6n3ldcp9s-shivanks-projects-43c26258.vercel.app/) and [source code](https://github.com/Shivankkumar09/Assignment_Hypergro).
