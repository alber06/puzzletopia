export const getProfile = async (username: string): Promise<APIResponse> => {
  const res = await fetch(`/api/profiles/${username}`)
  const data = await res.json()

  return { data, requestOk: res.ok }
}
