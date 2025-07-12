<<<<<<< HEAD
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

>>>>>>> d6d7f9f08ba8ad570f7e2d9fa492b83b83424ea5
