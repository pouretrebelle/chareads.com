import { structureBookDetails } from './text'

export const getTimeInSeconds = (text: string): number =>
  Number(text.split(':')[0]) * 60 + Number(text.split(':')[1])

interface Timestamp {
  text: string
  timestamp: number
  reference: object
}

export const structureTimestamps = (timestamps: string[]): Timestamp[] =>
  timestamps.map((string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [stringMatch, timeString, isReference, text] = string.match(
      /^([0-9:]+) (\[?)([^\]]+)(\]?)$/
    )

    const res = {
      text,
      timestamp: getTimeInSeconds(timeString),
      reference: isReference ? structureBookDetails(text) : {},
    }

    return res
  })
