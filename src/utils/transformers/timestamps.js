import { structureBookDetails } from './text'

export const getTimeInSeconds = (string) =>
  string.split(':')[0] * 60 + Number(string.split(':')[1])

export const structureTimestamps = (timestamps) =>
  timestamps.map((string) => {
    const [stringMatch, timeString, isReference, text] = string.match(
      /^([0-9:]+) (\[?)([^\]]+)(\]?)$/
    )

    const res = {
      text,
      timestamp: getTimeInSeconds(timeString),
      reference: !!isReference ? structureBookDetails(text) : {},
    }

    return res
  })
