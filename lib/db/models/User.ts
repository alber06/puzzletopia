import db from "../"

const findOne = async (query: any, withoutPassword: boolean = false) => {
  const model = withoutPassword ? db.models.user.scope('withoutPassword') : db.models.user
  const user = await model.findOne({ where: query, raw: true }) as User

  if (!user) return null

  return { ...user, puzzle1Complete: Boolean(user?.puzzle1Complete), puzzle2Complete: Boolean(user?.puzzle2Complete) }
}

const update = async (id: string, data: User) => {
  const user = await db.models.user.update(data, { where: { id } })

  return user
}

const create = async (data: any) => {
  const user = await db.models.user.create(data)

  return user
}

const User = {
  findOne,
  update,
  create
}

export default User