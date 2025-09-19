import axios from "axios";

const api = axios.create({
    baseURL: `https://api.scripture.api.bible/v1`,
    headers: {
        "Content-Type": "application/json",
        "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
    }
})

export const fetchBibleData = async () => {
    try {
    const response = await api.get("/bibles/de4e12af7f28f599-01")
    return response 
    } catch (error) {
        
    }
}