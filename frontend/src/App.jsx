import Search from './Search/Search'
import { ThemeProvider } from "@/components/theme-provider"
import { NavMenu } from "@/components/nav-bar"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavMenu />
      <Search />
    </ThemeProvider>
  )
}