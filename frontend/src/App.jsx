import {Routes, Route, Outlet} from "react-router-dom"
import Nav from "./Nav/Nav.jsx"
import Footer from "./Footer/Footer.jsx"
import Profile from "./Profile/Profile.jsx"
import ProfileSearchForm from "./Search/ProfileSearchForm.jsx"
import MatchDetails from "./Match/MatchDetails/MatchDetails.jsx"
import MatchSearch from "./Match/MatchSearch.jsx"
import './App.css'

function Layout() {
    return (
        <div className="main-container">
            <Nav/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}

export default function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<ProfileSearchForm/>}/>
                <Route path='/match' element={<MatchSearch/>}/>
                <Route path="/profile/:platform/:nameTag" element={<Profile/>}/>
                <Route path="/match/:matchId/details" element={<MatchDetails/>}/>
            </Route>
        </Routes>
    )
}