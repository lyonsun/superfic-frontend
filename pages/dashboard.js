import { useEffect, useState } from 'react'

import Layout from "../components/layout"

import { getUser } from './api/users'
import { getStats } from './api/stats'

const Dashboard = () => {
    const [overlay, setOverlay] = useState('visible')
    const [logout, setLogout] = useState('hidden')
    const [postsCount, setPostsCount] = useState(0)
    const [monthlyPostsCount, setMonthlyPostsCount] = useState([])
    const [averageChars, setAverageChars] = useState(0)
    const [longestPost, setLongestPost] = useState([])

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    useEffect(() => {
        // TODO: check if user is logged in

        // get statistics data
        const statsData = localStorage.getItem('stats')

        if (statsData) {
            setOverlay('hidden')
            setLogout('visible')

            const stats = JSON.parse(statsData)

            setPostsCount(stats.postsCount)
            setMonthlyPostsCount(stats.monthlyPostsCount)
            setAverageChars(stats.averageChars)
            setLongestPost(stats.longestPost)
        } else {
            // TODO: handle no data exception
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('stats')
        setPostsCount(0)
        setMonthlyPostsCount([])
        setAverageChars(0)
        setLongestPost([])
        setOverlay('visible')
        setLogout('hidden')
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const inputUserID = e.target.userID.value

        if (!inputUserID) {
            alert('Please enter your user ID')
            return
        }

        const userData = await getUser(inputUserID)

        if (userData.status === false) {
            alert(userData.message)
            return
        }

        const user = userData.user

        if (!user) {
            alert('User ID not found')
            return
        }

        const stats = await getStats(user.id)

        localStorage.setItem('stats', JSON.stringify(stats))
        setOverlay('hidden')
        setLogout('visible')

        setPostsCount(stats.postsCount)
        setMonthlyPostsCount(stats.monthlyPostsCount)
        setAverageChars(stats.averageChars)
        setLongestPost(stats.longestPost)
    }

    return (
        <Layout>
            <div className="page-header my-8 border-b flex justify-between items-center">
                <h1 className="text-4xl">Dashboard</h1>
                <button className={`btn-logout ${logout} bg-indigo-600 text-white text-xs font-bold p-2 rounded flex items-center justify-center gap-2 hover:bg-indigo-700`} onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>

            <div className="data-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="total-posts p-4 border-l-8 border-l-indigo-600 rounded shadow-md">
                    <div className="mb-4 pb-4 text-xl md:text-2xl">The number of posts you made in total</div>
                    <div className="text-xl md:text-2xl text-fuchsia-600">{postsCount}</div>
                </div>
                <div className="average-chars p-4 border-l-8 border-l-indigo-600 rounded shadow-md">
                    <div className="mb-4 pb-4 text-xl md:text-2xl">Average number of characters of your posts</div>
                    <div className="text-xl md:text-2xl text-fuchsia-600">{averageChars}</div>
                </div>
                <div className="monthly-total-posts p-4 border-l-8 border-l-indigo-600 rounded shadow-md md:col-span-2">
                    <div className="mb-4 pb-4 text-xl md:text-2xl">The number of posts you made every month</div>
                    <div className="text-xl md:text-2xl text-fuchsia-600">
                        {monthlyPostsCount.map((data) => {
                            return (
                                <div key={data.month} className="grid grid-cols-2 items-center gap-4 p-2 border-b last-of-type:border-b-0">
                                    <div className="text-xl md:text-2xl text-fuchsia-600">{months[data.month - 1]}</div>
                                    <div className="text-xl md:text-2xl text-fuchsia-600">{data.count}</div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="longest-post p-4 border-l-8 border-l-indigo-600 rounded shadow-md md:col-span-2">
                    <div className="mb-4 pb-4 text-xl md:text-2xl">Longest post you have ever made</div>
                    <div className="mb-4">{longestPost.message}</div>
                    <div className="flex justify-end items-center gap-4">
                        <div className="text-fuchsia-600 font-bold">{longestPost.user_name}</div>
                        <div className="text-gray-400 italic">{longestPost.created_time ? longestPost.created_time.substring(0, 10) : ''}</div>
                    </div>
                </div>
            </div>

            <div className={`overlay ${overlay} fixed top-[60px] left-0 right-0 bottom-[52px] bg-gray-400 bg-opacity-90`}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-white rounded w-72 sm:w-96 shadow-2xl shadow-gray-400">
                        <div className="login-header p-6 text-center bg-indigo-600 text-white shadow-xl">
                            <div className="text-2xl uppercase font-bold">Superfic</div>
                        </div>
                        <form onSubmit={handleLogin} className="p-8">
                            <label htmlFor="user-id" className="font-bold">User ID</label>
                            <input type="text" name="userID" id="user-id" className="w-full border rounded p-2 mb-8" placeholder="HINT: user_1" />
                            <button className="w-full bg-indigo-600 text-white font-bold p-2 rounded flex items-center justify-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </button>
                        </form>
                        <div className="px-8 text-gray-400 text-xs italic mb-8">To view your dashboard data, you will need to login.</div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Dashboard