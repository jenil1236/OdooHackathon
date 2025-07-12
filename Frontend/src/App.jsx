import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AdminDashboard from './admin/page';
import AnnouncementForm from "./components/AnnouncementForm";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <div className="app-container">
        <AnnouncementForm />
      </div>
    </>
  )
}

export default App
