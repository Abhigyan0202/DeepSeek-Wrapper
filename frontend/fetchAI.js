
async function fetchAI(){
    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${import.meta.env.API_KEY}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "sarvamai/sarvam-m:free",
        "messages": [
        {
            "role": "user",
            "content": "What is the meaning of life?"
        }
        ]
    })
    });
    return await response.json();
}

console.log(fetchAI());

export default fetchAI;

