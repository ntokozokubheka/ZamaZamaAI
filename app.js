// --- PILLAR 1: TAB INTERACTION ARCHITECTURE ---
const tabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active-content'));

        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-target')).classList.add('active-content');
    });
});

// --- PILLAR 2: SIMULATED WEB SCRAPER FEED ---
const mockJobsDb = [
    { title: "Graduate Cloud Learnership", company: "Nedbank", location: "Sandton, JHB", link: "https://www.nedbank.co.za/content/nedbank/desktop/xhtml/en/careers.html" },
    { title: "Junior C# / Full-Stack Developer", company: "Entelect", location: "Melrose Arch, JHB", link: "https://www.entelect.co.za/careers/" },
    { title: "Systems Analysis Internship", company: "BCX", location: "Midrand, JHB", link: "https://www.bcx.co.za/careers/" },
    { title: "Graduate Solutions Architecture Program", company: "Standard Bank", location: "Johannesburg CBD", link: "https://sbg.breezy.hr/" }
];

const renderJobFeed = () => {
    const feedContainer = document.getElementById('jobFeedContainer');
    feedContainer.innerHTML = mockJobsDb.map(job => `
        <div class="job-card">
            <div class="job-info">
                <h3>${job.title}</h3>
                <p><strong>${job.company}</strong> — ${job.location}</p>
            </div>
            <a href="${job.link}" target="_blank" class="view-job-link">View Role 🌐</a>
        </div>
    `).join('');
};
renderJobFeed(); // Execute feed population automatically upon launch

// --- PILLAR 3: ATS RESUME PROMPT INTERACTION ENGINE ---
const ingestionForm = document.getElementById('ingestionForm');
const outputContent = document.getElementById('outputContent');
const triggerExportBtn = document.getElementById('triggerExportBtn');
let calculatedResumeText = '';

ingestionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inst = document.getElementById('institution').value;
    const deg = document.getElementById('degree').value;

    calculatedResumeText = `• Engineered a full-stack e-commerce framework utilizing C# and relational SQL Server database architectures, modeled after systems design coursework at ${inst}.
• Optimized indexing paradigms and refactored relational database queries, successfully mitigating application processing latency and stabilizing application throughput for a ${deg} deliverable.`;

    outputContent.innerHTML = calculatedResumeText;
    triggerExportBtn.disabled = false;
});

// --- PILLAR 4: SMART RECRUITER EMAIL DRAFIING ENGINE ---
const emailForm = document.getElementById('emailForm');
const emailOutputContent = document.getElementById('emailOutputContent');
const copyEmailBtn = document.getElementById('copyEmailBtn');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('recruiterName').value || "Hiring Team";
    const company = document.getElementById('companyName').value;
    const role = document.getElementById('roleApplied').value;
    const tone = document.getElementById('emailTone').value;

    let emailDraft = '';
    if (tone === 'formal') {
        emailDraft = `Subject: Application Statement: ${role} - Graduate Inquiry

Dear ${name},

I hope this message finds you well. 

I am writing to formally express my interest in the upcoming ${role} intake at ${company}. Having recently completed my technical curriculum at the University of Johannesburg, I have focused extensively on building scalable backend solutions and optimizing data query performance.

Please find attached my ATS-tailored curriculum vitae for your consideration. I welcome the opportunity to discuss how my academic background can drive technical efficiency within your engineering division.

Warm regards,
[Your Name]`;
    } else {
        emailDraft = `Subject: Passionate Tech Graduate ready for the ${role} challenge!

Hi ${name},

I spotted the ${role} opening at ${company} and knew I had to reach out.

I'm a fresh graduate who loves solving complex backend problems. For my final-year project, I built a C# and SQL e-commerce store from scratch, refactoring query lookups to eliminate database latency. I love pushing code that scales and stays highly performant.

I'd love to jump on a quick call to talk about how I can bring this energy to your development sprints. Check out my optimized CV attached!

Best startup mindsets,
[Your Name]`;
    }

    emailOutputContent.innerText = emailDraft;
    copyEmailBtn.disabled = false;
});

// --- PILLAR 5: RESPONSIBLE AI GATE MODAL HANDLING ---
const ethicalModal = document.getElementById('ethicalModal');
const verificationCheckbox = document.getElementById('verificationCheckbox');
const confirmExportBtn = document.getElementById('confirmExportBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

triggerExportBtn.addEventListener('click', () => { ethicalModal.style.display = 'flex'; });
closeModalBtn.addEventListener('click', () => { ethicalModal.style.display = 'none'; });
verificationCheckbox.addEventListener('change', (e) => { confirmExportBtn.disabled = !e.target.checked; });

confirmExportBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(calculatedResumeText).then(() => {
        alert('🎉 Resume bullet points copied to clipboard.');
        ethicalModal.style.display = 'none';
    });
});

copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailOutputContent.innerText).then(() => {
        alert('✉️ Recruiter outreach email template copied cleanly.');
    });
});