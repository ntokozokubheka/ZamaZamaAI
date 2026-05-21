const outreachForm = document.getElementById('outreachForm');
const emailOutput = document.getElementById('emailOutput');
const copyEmailBtn = document.getElementById('copyEmailBtn');

if (outreachForm) {
    outreachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const enterprise = document.getElementById('companyName').value.trim();
        const role = document.getElementById('jobTitle').value.trim();
        let pointOfContact = document.getElementById('contactName').value.trim();

        if (!pointOfContact) {
            pointOfContact = "Hiring Team Elite";
        }

        const standardDraftTemplate = `Subject: Inquiry: Technical Application Alignment - ${role} Node\n\n` +
            `Dear ${pointOfContact},\n\n` +
            `I am writing to formally establish a point of contact regarding the active ${role} pipeline within ${enterprise}.\n\n` +
            `With a strong academic background in Mathematics and Informatics, combined with hands-on systems development experience, I design solutions that map cleanly to core product infrastructure targets. Having analyzed the operational parameters of ${enterprise}, I am eager to introduce my skillset into your production runtime.\n\n` +
            `I have attached my parser-optimized technical profile for your review and would appreciate the opportunity to discuss how my development capabilities align with your pipeline milestones.\n\n` +
            `Thank you for your time, consideration, and systemic resource coordination.\n\n` +
            `Kind regards,\n` +
            `[Your Name]\n` +
            `Software Developer & Systems Analyst`;

        emailOutput.innerText = standardDraftTemplate;
        copyEmailBtn.disabled = false;
    });
}

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailOutput.innerText).then(() => {
            alert("✉️ Outreach communication string successfully stored to local clipboard.");
        });
    });
}