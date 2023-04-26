export const getPuzzleData = async (type: string): Promise<APIResponse> => {
  const res = await fetch(`/api/puzzles/${type}`)
  const data = await res.json()

  return { data, requestOk: res.ok}
}

export const solvePuzzle = async (type: string, solutionData: any): Promise<APIResponse> => {
  const res = await fetch(`/api/puzzles/${type}/solve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(solutionData)
  })
  const data = await res.json()

  return { data, requestOk: res.ok }
}