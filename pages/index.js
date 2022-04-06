import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from "../components/layout"

import { getPosts, getPostsCount } from './api/posts'

const Home = () => {
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const { query } = router

  const pageNumber = query.page ? parseInt(query.page) : 1
  const pageCount = query.count ? parseInt(query.count) : 10

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts(pageNumber, pageCount)
      setPosts(posts)
    }

    const fetchPostsCount = async () => {
      const postsCount = await getPostsCount()
      setTotalCount(postsCount)
    }

    fetchPosts()
    fetchPostsCount()
  }, [pageNumber, pageCount])

  // Handle pagination
  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;
    currentQuery.count = pageCount;

    router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }

  return posts.length > 0 ?
    (
      <Layout>
        <h1 className="text-4xl my-8 border-b">All Posts</h1>

        <div className="posts flex flex-col gap-8 mb-10">
          {
            posts.map(post => {
              return (
                <div key={post.id} className="relative rounded p-6 shadow-lg hover:shadow-xl border-l-8 border-l-indigo-600">
                  <div className="mb-4 pb-2 border-b flex justify-between items-center">
                    <p className="text-fuchsia-600 font-bold">{post.user_name}</p>
                    <p className="text-sm text-gray-400">{post.created_time.substring(0, 10)}</p>
                  </div>
                  <p className="">{post.message}</p>
                </div>
              )
            })
          }
        </div>

        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          containerClassName={'pagination mb-10 flex justify-center items-center gap-4 text-md'}
          pageLinkClassName={'page-item px-2 md:px-4 py-1 md:py-2 hover:bg-indigo-700 hover:text-white'}
          activeLinkClassName={'active bg-indigo-600 text-white font-bold hover:bg-indigo-700'}
          breakClassName={'break-me'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={totalCount / pageCount}
          onPageChange={paginationHandler}
        />
      </Layout>
    ) :
    (
      <Layout>
        <h1 className="text-4xl my-8 border-b">All Posts</h1>
        <div className='not-found text-center'>
          <Image src='/images/not-found.png' width={500} height={500} objectFit="contain" alt='posts not found' />
          <p className='text-2xl text-gray-400 mb-8'>No Posts Found</p>
        </div>
      </Layout>
    )
}

export default Home
