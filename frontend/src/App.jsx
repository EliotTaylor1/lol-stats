import { Routes, Route, Outlet } from "react-router"
import Nav from "./Nav/Nav.jsx"
import Footer from "./Footer/Footer.jsx"
import ProfileHeader from "./Profile/ProfileHeader.jsx"
import SearchForm from "./Search/SearchForm.jsx"

function Layout() {
  return (
    <>
      <Nav />
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<SearchForm />} />
          <Route path="/profile/:summonerName" element={<ProfileHeader />} />
        </Route>
      </Routes>
  )
}