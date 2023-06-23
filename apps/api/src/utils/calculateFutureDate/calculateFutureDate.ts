export const calculateFutureDate = (minutes: number) => {
  const currentTime = new Date().getTime()
  const futureTime = currentTime + minutes * 60000
  return new Date(futureTime).toISOString()
}
