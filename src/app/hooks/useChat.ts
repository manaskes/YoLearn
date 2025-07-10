export const sendMessage = async (rawMessage: string): Promise<string> => {
  const GOOGLE_API_KEY = 'AIzaSyAV1kdmNn65R50aE8sYqsxDQ_Pj2PZ1ggg'

  const message = rawMessage.trim()
  if (!message) return '⚠️ Please enter a message.'

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GOOGLE_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    )

    const data = await response.json()

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      '🤖 No reply from Gemini.'
    )
  } catch (error) {
    console.error('[Gemini API Error]', error)
    return '❌ Failed to contact Gemini API.'
  }
}
