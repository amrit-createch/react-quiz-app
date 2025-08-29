export async function fetchQuestions() {
        const res = await fetch ("https://the-trivia-api.com/api/questions?limit=100")
        const data = await res.json();
        return data;
} 