import Link from "next/link"
import { useRouter } from "next/router"

const Header = () => {
    const router = useRouter()

    return (
        <header className="header bg-indigo-700 text-white flex items-center shadow-md shadow-indigo-400">
            <Link href="/">
                <a className="header__brand p-4 uppercase text-lg md:text-2xl italic">
                    Superfic
                </a>
            </Link>

            <ul className="h-full flex items-center">
                <li className={router.pathname === "/" ? " underline underline-offset-4" : ""}>
                    <Link href="/">
                        <a className="p-4">Posts</a>
                    </Link>
                </li>
                <li className={router.pathname === "/dashboard" ? " underline underline-offset-4" : ""}>
                    <Link href="/dashboard">
                        <a className="p-4">Dashboard</a>
                    </Link>
                </li>
            </ul>
        </header >
    )
}

export default Header