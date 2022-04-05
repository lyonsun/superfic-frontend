import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Layout from "../components/layout"

export async function getServerSideProps(context) {
  const { page, count } = context.query
  const pageNumber = page ? parseInt(page) : 1
  const pageLimit = count ? parseInt(count) : 10

  const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://host.docker.internal:8080'

  try {
    const [postsRes, postCountRes] = await Promise.all([
      fetch(`${API_HOST}/index.php/get_posts?page=${pageNumber}&count=${pageLimit}`),
      fetch(`${API_HOST}/index.php/get_posts_count`)
    ])

    const [posts, postCount] = await Promise.all([
      postsRes.json(),
      postCountRes.json(),
    ])

    return {
      props: {
        posts,
        totalCount: postCount,
        pageCount: pageLimit,
        currentPage: pageNumber,
      }
    }
  } catch (error) {
    return {
      props: {
        posts: [],
        totalCount: 0,
        pageCount: 0,
        currentPage: 0,
      }
    }
  }
}

const Home = ({ posts, totalCount, pageCount, currentPage }) => {
  const router = useRouter();

  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1;

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
            posts.map(post => (
              <div key={post.id} className="relative rounded p-6 shadow-lg hover:shadow-xl border-l-8 border-l-indigo-600">
                <div className="mb-4 pb-2 border-b flex justify-between items-center">
                  <p className="text-fuchsia-600 font-bold">{post.user_name}</p>
                  <p className="text-sm text-gray-400">{post.created_time.substring(0, 10)}</p>
                </div>
                <p className="">{post.message}</p>
              </div>
            ))
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
          pageCount={pageCount}
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
          <p className='bg-gray-200 text-gray-700 border-black border-2 rounded max-w-max mx-auto px-1 py-1 md:px-4'>curl -X GET &ldquo;http://localhost:8080/index.php/ping&rdquo;</p>
          <p className='text-sm text-gray-400 mt-2'>Run the command above in your terminal to populate the database.</p>
        </div>
      </Layout>
    )
}

export default Home
