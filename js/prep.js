const prepForm = document.getElementById('prepForm');
const prepOutput = document.getElementById('prepOutput');

if (prepForm) {
    prepForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const apiKey = sessionStorage.getItem('gemini_api_key');
        const rawSpecs = document.getElementById('jobRequirementsSpec').value.trim();

        // 1. Visual Loading State
        prepOutput.innerHTML = `<p class="empty-state">Running semantic analysis models...</p>`;

        // 2. Simple Keyword / Domain Mapping Logic
        const lowerCaseInput = rawSpecs.toLowerCase();
        let technicalDomainFocus = "Distributed Systems Execution";

        if (lowerCaseInput.includes("cloud") || lowerCaseInput.includes("aws") || lowerCaseInput.includes("azure")) {
            technicalDomainFocus = "Cloud Infrastructure Security & Architecture Scaling";
        } else if (lowerCaseInput.includes("react") || lowerCaseInput.includes("javascript") || lowerCaseInput.includes("frontend")) {
            technicalDomainFocus = "State Synchronization & Rendering Efficiency";
        } else if (lowerCaseInput.includes("database") || lowerCaseInput.includes("sql") || lowerCaseInput.includes("server")) {
            technicalDomainFocus = "Query Optimization & Schema Migrations";
        }

        // 3. Construct System Prompt Instruction Core
        const promptText = `
            You are an expert technical interviewer. Review the provided job specifications text and extract 1 Technical Question and 1 Behavioral Question.
            
            Format your entire response using this clean HTML layout (Do not wrap your output in markdown code blocks like \`\`\`html, output pure raw HTML tags directly):

            <h3 style="margin-bottom:1rem; font-size:1.05rem; color:#f8fafc;">🎯 Extracted Strategy Matrix</h3>
            
            <div class="prep-node" style="margin-bottom: 1.5rem;">
                <h4 style="color: #ef4444; margin-bottom: 0.25rem;">🔴 Question 1 (Technical Domain: ${technicalDomainFocus})</h4>
                <p style="margin-bottom:0.4rem; font-style:italic; color:#94a3b8;">[Insert custom technical question based on the job details]</p>
                <p><strong style="color:#f8fafc;">Talking Strategy:</strong> [Provide concise, tactical talking points to bring up in the answer]</p>
            </div>

            <div class="prep-node" style="margin-bottom: 1.5rem;">
                <h4 style="color: #3b82f6; margin-bottom: 0.25rem;">🔵 Question 2 (Behavioral Execution)</h4>
                <p style="margin-bottom:0.4rem; font-style:italic; color:#94a3b8;">[Insert a behavioral question relevant to this technical environment]</p>
                <p><strong style="color:#f8fafc;">Talking Strategy:</strong> [Provide concise talking strategy points mapping to the STAR technique]</p>
            </div>

            Job Specifications:
            ${rawSpecs}
        `;

        // 4. API Request Network Transaction
        try {
            const endpoint = `[https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$](https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$){apiKey}`;
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: promptText }] }]
                })
            });

            if (!response.ok) throw new Error(`Server Response Status: ${response.status}`);

            const data = await response.json();
            let rawHtmlOutput = data.candidates[0].content.parts[0].text;
            
            // Clean up any rogue code block indicators safely without complex regex traps
            rawHtmlOutput = rawHtmlOutput.replace(/```html/gi, '').replace(/```/g, '').trim();

            // Render output elements directly to display panel
            prepOutput.innerHTML = rawHtmlOutput;

        } catch (error) {
            console.error("Processing Exception Trace:", error);
            prepOutput.innerHTML = `
                <div class="prep-node" style="border-color: #ef4444; padding: 1rem; border-left: 4px solid #ef4444;">
                    <h4 style="color:#ef4444; margin-bottom: 0.5rem;">❌ Processing Halted</h4>
                    <p style="color:#94a3b8; font-size: 0.95rem;">Failed to connect to the Gemini API runtime. Check that your API key is correct and active.</p>
                </div>
            `;
        }
    });
}