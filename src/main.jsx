import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FirebaseProvider } from './context/firebase.jsx'
import App from './App.jsx'
import Header from './component/Header.jsx'
import About from './component/About.jsx'
import FAQs from './component/FAQs.jsx'
import Footer from './component/Footer.jsx'
import Dashboard from './component/Dashboard.jsx'
import Lend_cycle from './component/Lend_cycle'
import View_cycle from './component/View_cycle'
import Repair_cycle from './component/Repair_cycle'
import Borrow_cycle from './component/Borrow_cycle'
import { Toaster } from "sonner";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/about' element={<About />} />
          <Route path='/faqs' element={<FAQs />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/lend_cycle' element={<Lend_cycle />} />
          <Route path='/dashboard/view_cycle' element={<View_cycle />} />
          <Route path='/dashboard/repair_cycle' element={<Repair_cycle />} />
          <Route path='/dashboard/borrow_cycle' element={<Borrow_cycle />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>,
)
