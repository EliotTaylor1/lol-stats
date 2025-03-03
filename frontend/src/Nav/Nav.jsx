import { Link } from 'react-router-dom'

import './Nav.css'

export default function Nav() {
    return (
        <nav>
            <Link className='navElement' to="/">Summoner Search</Link>
            <Link className='navElement' to="/match">Match Details</Link>
            <Link className='navElement' to="/">About</Link>
            <Link className='navElement last' to="/">Contact</Link>
        </nav>
    )
}