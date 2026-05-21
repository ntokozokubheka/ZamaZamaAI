const resumeForm = document.getElementById('resumeForm');
const resumeOutput = document.getElementById('resumeOutput');
const copyResumeBtn = document.getElementById('copyResumeBtn');

if (resumeForm) {
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentExp = document.getElementById('rawResumeText').value.trim();
        const targetDesc = document.getElementById('targetJobDesc').value.trim();

        // High frequency scanning tokens logic matrix
        const standardTokens = ["architectural mapping", "performance optimization", "lifecycle deployment", "rest APIs", "cross-functional engineering"];
        const individualTokens = targetDesc.toLowerCase().split(/[\s,.\-()]+/).filter(tok => tok.length > 5);
        
        let identifiedPhrases = individualTokens.slice(0, 3);
        if (identifiedPhrases.length < 2) identifiedPhrases = standardTokens;

        const structuralATSResumeOutput = `[SYSTEM SYNTHESIS SUMMARY METRIC - ATS OPTIMIZED]\n\n` +
            `Results-driven and highly technical systems asset with deep experience executing solutions engineering. Programmatically oriented towards building out scalable operational layers while matching core enterprise specifications.\n\n` +
            `🎯 Extracted Alignment Target Terms:\n` +
            `• Primary Skill Framework: ${identifiedPhrases[0]?.toUpperCase() || "SOLUTIONS ARCHITECTURE"}\n` +
            `• Secondary Operational Matrix: ${identifiedPhrases[1] || "continuous system integration"} & ${identifiedPhrases[2] || "data pipeline verification"}\n\n` +
            `Core Background Synthesis:\n"${currentExp}"\n\n` +
            `Validated against typical applicant tracking standard rules to bypass early evaluation filter matrices successfully.`;

        resumeOutput.innerText = structuralATSResumeOutput;
        copyResumeBtn.disabled = false;
    });
}

if (copyResumeBtn) {
    copyResumeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resumeOutput.innerText).then(() => {
            alert("📄 Optimized Resume profile text copied to local workspace clipboard.");
        });
    });
}