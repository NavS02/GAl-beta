import { faq } from './galData'

export function getSmartReply(userInput) {
  const input = userInput.toLowerCase().trim()
  let bestMatch = null
  let bestScore = 0

  for (const item of faq) {
    for (const variation of item.question) {
      const score = similarity(input, variation.toLowerCase())
      if (score > bestScore) {
        bestScore = score
        bestMatch = item.answer
      }
    }
  }

  return bestScore > 0.2
    ? bestMatch
    : "Mi dispiace, non ho capito bene. Puoi riformulare la domanda?"
}

function similarity(a, b) {
  const aWords = a.split(/\s+/)
  const bWords = b.split(/\s+/)
  const shared = aWords.filter(word => bWords.includes(word)).length
  return shared / Math.max(aWords.length, bWords.length)
}
