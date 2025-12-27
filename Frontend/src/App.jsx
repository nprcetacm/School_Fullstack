import './App.css'
import HisVisMisPage from './Pages/HisVisMisPage'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import PrincipalMsgPage from './Pages/PrincipalMsgPage'
import Management from './Pages/Management'
import CurriculamPage from './Pages/CurriculamPage'
import NoticeBoardPage from './Pages/NoticeBoardPage'
import PhotoGalleryPage from './Pages/PhotoGalleryPage'
import AchievementsPage from './Pages/AchievementsPage'
import LoginPage from './Pages/LoginPage'
import LibraryPage from './Pages/LibraryPage';
import FacultyPage from './Pages/FacultyPage'
import ClassStructPage from './Pages/ClassStructurePage';

import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Layouts/AdminLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminFaculty from './Pages/Admin/AdminFaculty';
import AdminNotices from './Pages/Admin/AdminNotices';
import AdminGallery from './Pages/Admin/AdminGallery';
import AdminAchievements from './Pages/Admin/AdminAchievements';
import AdminToppers from './Pages/Admin/AdminToppers';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<HisVisMisPage />} />
        <Route path="/principal" element={<PrincipalMsgPage />} />
        <Route path="/wellwisher" element={<Management />} />
        <Route path="/curriculum" element={<CurriculamPage />} />
        <Route path="/noticeboard" element={<NoticeBoardPage />} />
        <Route path="/photos" element={<PhotoGalleryPage />} />
        <Route path='/achievements' element={<AchievementsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/lib" element={<LibraryPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/classstruct" element={<ClassStructPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="toppers" element={<AdminToppers />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
