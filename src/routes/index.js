import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../components/login/login.component';
import AdminPage from '../components/admin/admin.component'// Đảm bảo đường dẫn đến AdminPage đúng như bạn đã cấu trúc

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
};

export default MainRoutes;
