import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import MoreSheet from './components/MoreSheet'
import { ToastProvider } from './lib/toast'

import Accueil from './pages/Accueil'
import Recettes from './pages/Recettes'
import RecetteDetail from './pages/RecetteDetail'
import MenuSemaine from './pages/MenuSemaine'
import Composer from './pages/Composer'
import Evenements from './pages/Evenements'
import Contact from './pages/Contact'
import APropos from './pages/APropos'
import Galerie from './pages/Galerie'
import AvisPage from './pages/AvisPage'
import Zone from './pages/Zone'
import Epicerie from './pages/Epicerie'
import Ateliers from './pages/Ateliers'
import BlogListe from './pages/BlogListe'
import BlogArticle from './pages/BlogArticle'
import Faq from './pages/Faq'
import Mentions from './pages/Mentions'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMoreOpen(false)
  }, [pathname])

  return (
    <ToastProvider>
      <div className="app-shell">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/recettes" element={<Recettes />} />
          <Route path="/recettes/:id" element={<RecetteDetail />} />
          <Route path="/menu" element={<MenuSemaine />} />
          <Route path="/composer" element={<Composer />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/avis" element={<AvisPage />} />
          <Route path="/zone" element={<Zone />} />
          <Route path="/epicerie" element={<Epicerie />} />
          <Route path="/ateliers" element={<Ateliers />} />
          <Route path="/blog" element={<BlogListe />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
        <BottomNav moreOpen={moreOpen} onToggleMore={() => setMoreOpen((o) => !o)} />
      </div>
    </ToastProvider>
  )
}
