// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getPosts(pageNumber, pageLimit) {
  const response = await fetch(`${API_HOST}/index.php/get_posts?page=${pageNumber}&count=${pageLimit}`)
  const result = await response.json()

  return result
}

export async function getPostsCount() {
  const response = await fetch(`${API_HOST}/index.php/get_posts_count`)
  const result = await response.json()

  return result.count
}

export default async function handler(req, res) {
  const query = req.query
  const posts = await getPosts(query.page, query.count)
  const postsCount = await getPostsCount()

  res.status(200).json({ posts: posts, totalCount: postsCount })
}
