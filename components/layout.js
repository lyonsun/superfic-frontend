import Header from "./header"
import Head from "next/head"
import Footer from "./footer"

const Layout = ({ children }) => {
    return (
        <div className="h-full min-h-screen flex flex-col">
            <Head>
                <title>Superfic</title>
                <meta name="author" content="Liang Sun <sunly917@gmail.com>" />
                <meta name="description" content="The future of social networking." />
            </Head>

            <Header />
            <main className="flex-1 h-full flex flex-col container mx-auto px-4">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout