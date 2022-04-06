// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getStats(userID) {
  const postsCount = await getPostsCount(userID)
  const averageChars = await getAverageChars(userID)
  const monthlyPostsCount = await getMonthlyPostsCount(userID)
  const longestPost = await getLongestPost(userID)

  return { postsCount, averageChars, monthlyPostsCount, longestPost }
}

export async function getPostsCount(userID) {
  const response = await fetch(`${API_HOST}/index.php/get_posts_count?user_id=${userID}`)
  const result = await response.json()

  return result.count
}

export async function getAverageChars(userID) {
  const response = await fetch(`${API_HOST}/index.php/get_average_characters_count?user_id=${userID}`)
  const result = await response.json()

  return result.count
}

export async function getMonthlyPostsCount(userID) {
  const response = await fetch(`${API_HOST}/index.php/get_monthly_posts_count?user_id=${userID}`)
  const result = await response.json()

  return result
}

export async function getLongestPost(userID) {
  const response = await fetch(`${API_HOST}/index.php/get_longest_post?user_id=${userID}`)
  const result = await response.json()

  return result
}

export default async function handler(req, res) {
  const query = req.query
  const postsCount = await getPostsCount(query.id)
  const averageChars = await getAverageChars(query.id)
  const monthlyPostsCount = await getMonthlyPostsCount(query.id)
  const longestPost = await getLongestPost(query.id)

  res.status(200).json({ postsCount, averageChars, monthlyPostsCount, longestPost })
}
