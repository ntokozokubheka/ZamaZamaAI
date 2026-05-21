import { GoogleGenAI } from "@google/generative-ai";

const plannerForm = document.getElementById('plannerForm');
const plannerOutput = document.getElementById('plannerOutput');
const geminiApiKeyInput = document.getElementById('geminiApiKey');
const apiKeyZone = document.getElementById('apiKeyZone');

if (plannerForm) {
    plannerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const apiKey = geminiApiKeyInput.value.trim();
        const rawNotes = document.getElementById('rawNotesText').value.trim();
        const horizon = document.getElementById('planningHorizon').value;

        if (!apiKey) {
            alert("⚠️ Execution blocked. Please enter a valid Google Gemini API Key in the layout header configuration field.");
            return;
        }

        // Lock UI aesthetic elements slightly during flight pipeline state
        apiKeyZone.style.opacity = "0.6";
        plannerOutput.innerHTML = `<p style="text-align:center; padding-top:10rem; color:var(--primary); font-weight:500;">Parsing notes and optimizing timeline matrix via Gemini API...</p>`;

        // Construct targeted structural instructions to enforce rigid formatting constraints
        const structuralSystemInstruction = 
            `You are an elite productivity system architecture assistant. Analyze the user's raw notes or text input and completely reorganize it. ` +
            `You MUST reply ONLY with valid, clean HTML snippet blocks matching the strict structural design parameters requested. Do not include markdown formatting like \`\`\`html or \`\`\`. Use the exact class names given below.\n\n` +
            `Required output schema layout structure:\n` +
            `<div class="summary-section">` +
            `  <h4>📋 Executive Summary</h4>` +
            `  <p>[Provide a clean, high-density 2-3 sentence summary of the overarching notes]</p>` +
            `</div>` +
            `<div class="matrix-grid">` +
            `  <div class="matrix-card decisions">` +
            `    <h5>Key Decisions & Milestones</h5>` +
            `    <ul><li>[Decision point or major milestone]</li></ul>` +
            `  </div>` +
            `  <div class="matrix-card actions">` +
            `    <h5>Action Items & Deadlines</h5>` +
            `    <ul><li>[Action item] - <strong>[Owner/Deadline if explicit]</strong></li></ul>` +
            `  </div>` +
            `</div>` +
            `<div class="schedule-section">` +
            `  <h4>🗓️ Structured Smart Schedule Plan (${horizon} Horizon)</h4>` +
            `  <!-- Repeat this block for elements inside the horizon (e.g., Day 1/2/3 or Week 1/2/3 or Q1/Q2/Q3 based on the selected horizon: ${horizon}) -->` +
            `  <div class="schedule-block">` +
            `    <div class="schedule-time">[Time increment context, e.g., "Week 1" or "Month 1" or "Q1"]</div>` +
            `    <p>[Aggregated strategic task priorities and urgency adjustments for this block]</p>` +
            `  </div>` +
            `</div>`;

        try {
            const aiHub = new GoogleGenAI({ apiKey: apiKey });
            const generativeModelEngine = aiHub.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await generativeModelEngine.generateContent({
                contents: [
                    { role: "user", parts: [{ text: structuralSystemInstruction }] },
                    { role: "model", parts: [{ text: "System instructions cached. Provide the user context parameters." }] },
                    { role: "user", parts: [{ text: `Target Planning Horizon: ${horizon}\n\nRaw Notes Content:\n"${rawNotes}"` }] }
                ]
            });

            let cleanHtmlPayload = result.response.text().trim();
            
            // Clean up backticks in case the model ignored explicit formatting restrictions
            if (cleanHtmlPayload.startsWith("```")) {
                cleanHtmlPayload = cleanHtmlPayload.replace(/^
```html?/, "").replace(/```$/, "").trim();
            }

            plannerOutput.innerHTML = cleanHtmlPayload;

        } catch (fault) {
            console.error("Gemini Scheduler Processing Error:", fault);
            plannerOutput.innerHTML = `<p style="text-align:center; padding-top:10rem; color:#ef4444;">❌ Handshake aborted. Verify credential variables or local network structural proxies.</p>`;
        }
    });
}