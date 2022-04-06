// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_URL

export async function getUser(userID) {
  const response = await fetch(`${API_HOST}/index.php/get_user?user_id=${userID}`).catch((err) => {
    return { status: false, message: err }
  })
  const result = await response.json()

  return { status: true, user: result }
}

export default async function handler(req, res) {
  const query = req.query
  const user = await getPosts(query.id)

  res.status(200).json({ user: user })
}
