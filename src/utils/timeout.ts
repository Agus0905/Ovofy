export function withTimeout<T>(
  promise: Promise<T> | any,
  timeoutMs: number,
  defaultValue: T
): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((resolve) => 
      setTimeout(() => resolve(defaultValue), timeoutMs)
    )
  ])
}

export function withTimeoutError<T>(
  promise: Promise<T> | any,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    )
  ])
}
