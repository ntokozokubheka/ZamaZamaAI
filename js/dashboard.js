const jobSearchForm = document.getElementById('jobSearchForm');
const jobResultsStream = document.getElementById('jobResultsStream');

if (jobSearchForm) {
    jobSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = document.getElementById('jobTitleInput').value.trim().toLowerCase();
        
        jobResultsStream.innerHTML = `<p style="text-align:center; padding-top:6rem; color:var(--primary); font-size:0.9rem;">Indexing live job feeds via API...</p>`;

        // Fetching engineering/tech dataset from public registry verified on index
        fetch('https://jobicy.com/api/v2/remote-jobs?count=50&industry=engineering')
            .then(res => {
                if(!res.ok) throw new Error("API handshake rejected.");
                return res.json();
            })
            .then(data => {
                if (!data.jobs || data.jobs.length === 0) {
                    jobResultsStream.innerHTML = `<p class="empty-state">No live feeds available from remote network clusters.</p>`;
                    return;
                }

                const filtered = data.jobs.filter(job => 
                    job.jobTitle.toLowerCase().includes(keyword) || 
                    job.companyName.toLowerCase().includes(keyword)
                );

                if (filtered.length === 0) {
                    jobResultsStream.innerHTML = `<p class="empty-state">Zero job metrics matched token criteria: "${keyword}"</p>`;
                    return;
                }

                jobResultsStream.innerHTML = filtered.map(job => `
                    <div class="job-item">
                        <h4 style="color:var(--primary); margin-bottom:0.25rem;">${job.jobTitle}</h4>
                        <p style="font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">🏢 ${job.companyName} — <span style="font-weight:normal; color:var(--muted);">${job.jobGeo}</span></p>
                        <p style="font-size:0.75rem; color:var(--muted); margin-bottom:0.5rem;">Published: ${job.pubDate}</p>
                        <a href="${job.url}" target="_blank" rel="noopener noreferrer" class="job-link">View Job Spec ↗</a>
                    </div>
                `).join('');
            })
            .catch(err => {
                console.error(err);
                jobResultsStream.innerHTML = `<p style="text-align:center; padding-top:6rem; color:#ef4444; font-size:0.9rem;">Network error connection refused. Verification failure.</p>`;
            });
    });
}