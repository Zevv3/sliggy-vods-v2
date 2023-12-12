import { API_KEY } from "../Secrets";

const playistId = "UU686rU5x6L1KoPL5kE9RL4Q";
const url = "https://youtube.googleapis.com/youtube/v3"

export const ytapiCalls = {
    getVideos: async (page="") => {
        const response = await fetch(`${url}/playlistItems?part=snippet,contentDetails,status&playlistId=${playistId}&maxResults=50&pageToken=${page}&key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch playlist data from YouTube')
        }
        return await response.json()
    }
};