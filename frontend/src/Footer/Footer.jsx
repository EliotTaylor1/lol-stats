import './Footer.css'

const d = new Date()

export default function Footer() {
    return (
        <footer>
            <p>Eliot Taylor&copy; - {d.getFullYear()}</p>
            <p><a href="#">Portfolio</a> | <a href="https://github.com/EliotTaylor1">GitHub</a></p>
        </footer>
    )
}