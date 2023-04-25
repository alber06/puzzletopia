import db from ".."

const findOne = async (query: any) => {
  const session = await db.models.session.findOne({ where: query, raw: true })

  return session
}

const Session = {
  findOne
}

export default Session