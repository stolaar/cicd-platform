import { AxiosError } from "axios"

export const retryRequest = async <T>(
  cb: () => Promise<T>,
  onFailure?: (err: AxiosError) => Promise<void>,
  retries = 3,
): Promise<T> => {
  try {
    return await cb()
  } catch (err) {
    if (retries === 0) throw err
    if (onFailure) await onFailure(err)
    return await retryRequest(cb, onFailure, retries - 1)
  }
}
