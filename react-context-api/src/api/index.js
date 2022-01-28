const apiKey = process.env.REACT_APP_API_KEY
export const createHeaders = () => {
    return {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
    }
}