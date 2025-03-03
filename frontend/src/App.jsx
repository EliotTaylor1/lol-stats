import {Routes, Route, Outlet} from "react-router-dom"
import Nav from "./Nav/Nav.jsx"
import Footer from "./Footer/Footer.jsx"
import Profile from "./Profile/Profile.jsx"
import SearchForm from "./Search/SearchForm.jsx"
import MatchDetails from "./Match/MatchDetails.jsx"
import MatchSearch from "./Match/MatchSearch.jsx"

function Layout() {
    return (
        <>
            <Nav/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default function App() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={<SearchForm/>}/>
                <Route path='/match' element={<MatchSearch/>}/>
                <Route path="/profile/:platform/:nameTag" element={<Profile/>}/>
                <Route path="/match/:matchId/details" element={<MatchDetails/>}/>
            </Route>
        </Routes>
    )
}