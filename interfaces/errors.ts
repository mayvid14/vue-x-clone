/**
 * Generic interface for errors in the App
 */
export interface XError<T> {
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: T
  cause?: unknown
}
