# MediQueue - Transforming Healthcare Experiences

MediQueue brings the human touch back to healthcare waiting rooms across India. By intelligently managing patient flow, we turn stressful waits into respectful experiences. Patients receive accurate wait time estimates on their phones, can plan their visit accordingly, and even complete registration from home. For medical staff, MediQueue provides the organization and insights they need to deliver more attentive care. Our solution transforms both the patient journey and hospital operations, creating a healthcare experience that truly puts people first.

## 🚀 Features

- **Multi-role Dashboards**: Separate dashboards for patients, doctors, nurses, and administrators
- **Patient Queue Management**: Real-time tracking of patient queues with status updates
- **Appointment Scheduling**: Easy appointment request system for patients
- **Emergency Services**: One-click emergency button for direct communication with ambulance and hospital staff
- **Responsive Design**: Fully responsive UI works on all devices (mobile, tablet, desktop)
- **Global State Management**: Patient information synchronized across all components using React Context
- **Indian Localization**: Names, phone numbers, and hospital information tailored for Indian context

## 🖥️ Screenshots

![Patient Dashboard](https://via.placeholder.com/800x400.png?text=Patient+Dashboard)
![Admin Dashboard](https://via.placeholder.com/800x400.png?text=Admin+Dashboard)

## 🛠️ Installation and Setup

### Prerequisites
- Node.js 18.x or later
- npm or Yarn

### Setup Steps
1. Clone the repository
```bash
git clone https://github.com/yourusername/mediQueue-v2.git
cd mediQueue-v2

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your API keys
# - Get a Gemini API key from Google AI Studio
# - Set up EmailJS account and get service/template IDs
# - Generate a random string for NEXTAUTH_SECRET (32+ characters)
# - Add the same value as JWT_SECRET or generate a separate one

# You can generate secure random strings with this command:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Demo Accounts

- **Patient Access**:
  - Username: patient@example.com
  - Password: patient123

- **Doctor Access**:
  - Username: doctor@example.com
  - Password: doctor123

- **Admin Access**:
  - Username: admin@example.com
  - Password: admin123

## 🏗️ Project Structure

```
├── app/                  # Next.js app directory
│   ├── admin/            # Admin dashboard
│   ├── doctor/           # Doctor dashboard
│   ├── patient/          # Patient dashboard
│   ├── staff/            # Staff dashboard
│   ├── components/       # Shared UI components
│   └── api/              # API routes
├── components/           # Global components
│   ├── EmergencyButton/  # Emergency service component
│   └── PatientList/      # Patient queue component
├── context/              # React Context providers
│   └── PatientContext/   # Global patient state management
└── public/               # Static assets
```

## 🚀 Deployment Options

### Render (Recommended)
1. Push code to GitHub
2. Sign up on [Render](https://render.com)
3. Import your GitHub repository
4. Configure as a Web Service:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Environment variables: Add your secret keys (SQLite database is included in the deployment)

### Netlify
1. Push code to GitHub
2. Sign up on [Netlify](https://netlify.com)
3. Import your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

## ✨ Key Features Explained

### Emergency Button
The emergency button provides instant access to emergency services. It's accessible throughout the application as a floating action button, allowing patients to quickly request emergency assistance with their location and contact details.

### Appointment Request System
Patients can request appointments by selecting their preferred department, doctor, date, and time. The form includes validation and immediate feedback, with a confirmation system that notifies patients of their appointment status.

### Global Patient State
The PatientContext provides consistent patient data across all components and pages, ensuring that updates to patient status, appointments, or information are immediately reflected everywhere in the application.

### Responsive Navigation
The responsive navbar adapts to different screen sizes, providing a full menu on desktop and a collapsible menu on mobile devices. This ensures a seamless user experience across all device types.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License
This project is licensed under the MIT License. 