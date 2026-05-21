import { GoogleGenAI } from "@google/generative-ai";

const chatbotInputForm = document.getElementById('chatbotInputForm');
const chatMessageStream = document.getElementById('chatMessageStream');
const userChatMessageInput = document.getElementById('userChatMessageInput');
const geminiApiKeyInput = document.getElementById('geminiApiKey');
const apiKeyZone = document.getElementById('apiKeyZone');

// Initialize internal application conversation history array wrapper blocks
let discussionContextHistory = [
    {
        role: "user",
        parts: [{ text: "You are an expert technical career coach and mock interviewer named CareerSuite Coach. Keep answers highly professional, actionable, and tailored toward software developers and systems analysts. Keep your output concise, realistic, and structural." }]
    },
    {
        role: "model",
        parts: [{ text: "Understood. System context loaded. Ready to execute career simulation workflows." }]
    }
];

if (chatbotInputForm) {
    chatbotInputForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const apiKey = geminiApiKeyInput.value.trim();
        const promptText = userChatMessageInput.value.trim();
        
        if (!promptText) return;

        if (!apiKey) {
            alert("⚠️ Execution blocked. Please supply a valid Google Gemini API Key inside the control configuration layer.");
            return;
        }

        // Collapse API input layer layout visibility after first use to optimize workspace height properties
        apiKeyZone.style.opacity = "0.6";

        // Append user response block visually to active DOM log element node
        appendChatBubble(promptText, "chat-user");
        userChatMessageInput.value = "";
        chatMessageStream.scrollTop = chatMessageStream.scrollHeight;

        // Append native pending tracking element properties
        const skeletonBubble = appendChatBubble("Analyzing prompt tokens...", "chat-ai");
        chatMessageStream.scrollTop = chatMessageStream.scrollHeight;

        try {
            // Instantiating standard Gemini Engine model configuration metrics inline
            const aiHub = new GoogleGenAI({ apiKey: apiKey });
            const generativeModelEngine = aiHub.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Push current interactive token configuration values straight down into historical tracker layer
            discussionContextHistory.push({
                role: "user",
                parts: [{ text: promptText }]
            });

            const operationResult = await generativeModelEngine.generateContent({
                contents: discussionContextHistory
            });

            const generatedModelOutputText = operationResult.response.text();

            // Strip pending placeholder and replace with authentic generative payload value
            skeletonBubble.innerHTML = `<strong>Coach:</strong> ${generatedModelOutputText}`;
            
            // Sync generated model output token results directly back down into historical conversation tracking loops
            discussionContextHistory.push({
                role: "model",
                parts: [{ text: generatedModelOutputText }]
            });

        } catch (fault) {
            console.error("Gemini Handshake Failure Matrix Error:", fault);
            skeletonBubble.innerHTML = `<span style="color:#ef4444;">❌ Handshake Error. Validate credential authenticity limits or connection integrity paths.</span>`;
        }

        chatMessageStream.scrollTop = chatMessageStream.scrollHeight;
    });
}

function appendChatBubble(messageContent, contextualClass) {
    const componentWrapperBubble = document.createElement('div');
    componentWrapperBubble.className = `chat-bubble ${contextualClass}`;
    
    if (contextualClass === "chat-user") {
        componentWrapperBubble.innerHTML = `<strong>You:</strong> ${messageContent}`;
    } else {
        componentWrapperBubble.innerHTML = messageContent;
    }
    
    chatMessageStream.appendChild(componentWrapperBubble);
    return componentWrapperBubble;
}