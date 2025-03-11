import { Link } from 'react-router-dom'

import './Nav.css'

export default function Nav() {
    return (
        <nav>
            <Link className='nav-element' to="/">Summoner Search</Link>
            <Link className='nav-element' to="/match">Match Details</Link>
            <Link className='nav-element' to="/">About</Link>
            <Link className='nav-element last' to="/">Contact</Link>
        </nav>
    )
}