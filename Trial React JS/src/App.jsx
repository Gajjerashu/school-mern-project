import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ---------- Before Login Pages ----------
import Home from "./Pages/BeforeLogin/Home";
import Contact from "./Pages/BeforeLogin/Contact";
import Signup from "./Pages/BeforeLogin/Signup";
import Login from "./Pages/BeforeLogin/Login";
import Admin from "./Pages/BeforeLogin/Admin";


// ---------- After Login Pages ----------
import Home1 from "./Pages/AfterLogin/Home1";
import Academic from "./Pages/AfterLogin/Academics";
import Students from "./Pages/AfterLogin/Students";
import Syllabus from "./Pages/AfterLogin/Syllabus";
import MockTest from "./Pages/AfterLogin/MockTest";
import Fees from "./Pages/AfterLogin/Fees";
import Response from "./Pages/AfterLogin/Response";


// ⭐⭐⭐ Admin Pages ⭐⭐⭐
import AdminDash from "./Pages/AfterAdmin/AdminDash";
import AdminUser from "./Pages/AfterAdmin/AdminUser";
import AdminAdmission from "./Pages/AfterAdmin/AdminAdmission";
import AdminFees from "./Pages/AfterAdmin/AdminFees";
import AdminStudent from "./Pages/AfterAdmin/AdminStudent";
import Info from "./ComponentsAfter/Components11/Info";


// ---------- Detail Pages ----------
import ExcellenceInEducation from "./Pages/DetailPages/ExcellenceInEducation";
import ExpertFaculty from "./Pages/DetailPages/ExpertFaculty";
import ModernFacilities from "./Pages/DetailPages/ModernFacilities";
import ExtracurricularActivities from "./Pages/DetailPages/ExtracurricularActivities";
import DigitalLearning from "./Pages/DetailPages/DigitalLearning";
import ProvenResults from "./Pages/DetailPages/ProvenResults";

// ⭐⭐⭐ Academic Program Pages ⭐⭐⭐
import PrimarySchool from "./Pages/DetailPages/PrimarySchool";
import MiddleSchool from "./Pages/DetailPages/MiddleSchool";
import HighSchool from "./Pages/DetailPages/HighSchool";

// Our School Faculty
import PrimeSchool from "./Pages/DetailPages/PrimeSchool";
import MiddleLevelSchool from "./Pages/DetailPages/MiddleLevelSchool";
import HigherSecondarySchool from "./Pages/DetailPages/HigherSecondarySchool";

// Academic Resources //
import DigitalLibrary from "./Pages/DetailPages/DigitalLibrary";
import ScienceLabs from "./Pages/DetailPages/ScienceLabs";
import ComputerLabs from "./Pages/DetailPages/ComputerLabs";
import OnlineLearning from "./Pages/DetailPages/OnlineLearning";
import ExtraSupport from "./Pages/DetailPages/ExtraSupport";
import CareerGuidance from "./Pages/DetailPages/CareerGuidance";

// Parent Portal //
import Grades from "./Pages/ParentSectionPages/Grades";
import AttendanceTracking from "./Pages/ParentSectionPages/AttendanceTracking";
import Assignment from "./Pages/ParentSectionPages/Assignment";
import TeacherCommunication from "./Pages/ParentSectionPages/TeacherCommunication";
import BusTracking from "./Pages/ParentSectionPages/BusTracking";
import Pay from "./Pages/ParentSectionPages/Pay";

// Import StudentSectionPages components
import AcademicDashboard from './Pages/StudentSectionPages/AcademicDashboard';
import AssignmentTracker from './Pages/StudentSectionPages/AssignmentTracker';
import ClassSchedule from './Pages/StudentSectionPages/ClassSchedule';
import Ebook from './Pages/StudentSectionPages/Ebook';
import Achievements from './Pages/StudentSectionPages/Achievements';
import Preparation from './Pages/StudentSectionPages/Preparation';


import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";


import PayReceive from "./ComponentsAfter/Components10/PayReceive";
import MockTestResults from "./ComponentsAfter/Components11/MockTestResults";
import Prime from "./ComponentsAfter/Components20/Prime";

function App() {
  return (
    <Routes>
      {/* ---------- Before Login Routes ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/Contact" element={<Contact />} />

      {/* ✅ FIXED: Auth Routes matching imports */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />


      {/* ✅ Redirects */}
      <Route path="/Signup" element={<Navigate to="/signup" replace />} />
      <Route path="/Login" element={<Navigate to="/login" replace />} />
      <Route path="/Admin" element={<Navigate to="/admin" replace />} />


      {/* ---------- Detail Pages Routes ---------- */}
      <Route path="/excellence-in-education" element={<ExcellenceInEducation />} />
      <Route path="/expert-faculty" element={<ExpertFaculty />} />
      <Route path="/modern-facilities" element={<ModernFacilities />} />
      <Route path="/extracurricular-activities" element={<ExtracurricularActivities />} />
      <Route path="/digital-learning" element={<DigitalLearning />} />
      <Route path="/proven-results" element={<ProvenResults />} />

      {/* Academic Routes */}
      <Route path="/primary-school" element={<PrimarySchool />} />
      <Route path="/middle-school" element={<MiddleSchool />} />
      <Route path="/high-school" element={<HighSchool />} />

      {/* Faculty Routes */}
      <Route path="/prime-school" element={<PrimeSchool />} />
      <Route path="/middle-level-school" element={<MiddleLevelSchool />} />
      <Route path="/higher-secondary-school" element={<HigherSecondarySchool />} />

      {/* Academic Resources */}
      <Route path="/digital-library" element={<DigitalLibrary />} />
      <Route path="/science-labs" element={<ScienceLabs />} />
      <Route path="/computer-labs" element={<ComputerLabs />} />
      <Route path="/online-learning" element={<OnlineLearning />} />
      <Route path="/extra-support" element={<ExtraSupport />} />
      <Route path="/career-guidance" element={<CareerGuidance />} />

      {/* Parent Portal */}
      <Route path="/grades" element={<Grades />} />
      <Route path="/attendance" element={<AttendanceTracking />} />
      <Route path="/assignments" element={<Assignment />} />
      <Route path="/teacher-communication" element={<TeacherCommunication />} />
      <Route path="/bus-tracking" element={<BusTracking />} />
      <Route path="/pay" element={<Pay />} />

      {/* Student Section Pages Routes */}
      <Route path="/academic-dashboard" element={<AcademicDashboard />} />
      <Route path="/assignment-tracker" element={<AssignmentTracker />} />
      <Route path="/class-schedule" element={<ClassSchedule />} />
      <Route path="/ebook" element={<Ebook />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/preparation" element={<Preparation />} />

      <Route path="/AfterLogin/PayReceive" element={<PayReceive />} />
      <Route path="/AfterLogin/Info" element={<Info />} />
      <Route
        path="/AfterLogin/Syllabus/Primary"
        element={<ProtectedRoute><Syllabus /></ProtectedRoute>}
      />
      <Route
        path="/AfterLogin/Syllabus/Middle"
        element={<ProtectedRoute><Syllabus /></ProtectedRoute>}
      />
      <Route
        path="/AfterLogin/Syllabus/High"
        element={<ProtectedRoute><Syllabus /></ProtectedRoute>}
      />

      <Route path="/MockTestResults" element={<ProtectedRoute><MockTestResults /></ProtectedRoute>} />


      // Add this route in the routes section (after Fees route)
      <Route
        path="/payment-receipt"
        element={
          <ProtectedRoute>
            <PayReceive />
          </ProtectedRoute>
        }
      />


      {/* ---------- After Login Routes ---------- */}
      <Route
        path="/AfterLogin/Home1"
        element={
          <ProtectedRoute>
            <Home1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/Academics"
        element={
          <ProtectedRoute>
            <Academic />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/Students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/Syllabus"
        element={
          <ProtectedRoute>
            <Syllabus />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/MockTest"
        element={
          <ProtectedRoute>
            <MockTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/Fees"
        element={
          <ProtectedRoute>
            <Fees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/AfterLogin/Response"
        element={
          <ProtectedRoute>
            <Response />
          </ProtectedRoute>
        }
      />


      <Route
        path="/AfterAdmin/AdminDash"
        element={
          <ProtectedAdminRoute>
            <AdminDash />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/AfterAdmin/AdminUser"
        element={
          <ProtectedAdminRoute>
            <AdminUser />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/AfterAdmin/AdminAdmission"
        element={
          <ProtectedAdminRoute>
            <AdminAdmission />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/AfterAdmin/AdminStudent"
        element={
          <ProtectedAdminRoute>
            <AdminStudent />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/AfterAdmin/AdminFees"
        element={
          <ProtectedAdminRoute>
            <AdminFees />
          </ProtectedAdminRoute>
        }
      />

      {/* ---------- Redirect unknown routes ---------- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
