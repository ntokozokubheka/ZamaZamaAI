const prepForm = document.getElementById('prepForm');
const prepOutput = document.getElementById('prepOutput');

if (prepForm) {
    prepForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawSpecs = document.getElementById('jobRequirementsSpec').value.trim();

        // Target key identification mapping rules logic
        const lowerCaseInput = rawSpecs.toLowerCase();
        let technicalDomainFocus = "Distributed Systems Execution";
        let targetedBehaviorNode = "Conflict resolution inside parallel dev sprints.";

        if (lowerCaseInput.includes("cloud") || lowerCaseInput.includes("aws") || lowerCaseInput.includes("azure")) {
            technicalDomainFocus = "Cloud Infrastructure Security & Architecture Scaling";
        } else if (lowerCaseInput.includes("react") || lowerCaseInput.includes("javascript") || lowerCaseInput.includes("frontend")) {
            technicalDomainFocus = "State Synchronization, DOM Bottlenecks & Client Rendering Efficiency";
        } else if (lowerCaseInput.includes("database") || lowerCaseInput.includes("sql") || lowerCaseInput.includes("server")) {
            technicalDomainFocus = "Query Optimization, Deadlock Resolution & Schema Migrations";
        }

        prepOutput.innerHTML = `
            <h3 style="margin-bottom:1rem; font-size:1.05rem; color:#0f172a;">🎯 Extracted Strategy Matrix</h3>
            
            <div class="prep-node">
                <h4>🔴 Question 1 (Technical Domain Architecture)</h4>
                <p style="margin-bottom:0.4rem; font-style:italic; color:#475569;">"How do you design for resilience under high workload concurrency relating specifically to ${technicalDomainFocus}?"</p>
                <p><strong>Talking Strategy:</strong> Deploy the STAR pattern. Emphasize tracking input signals, setting structural boundaries, isolating bottlenecks, and checking system health metrics.</p>
            </div>

            <div class="prep-node">
                <h4>🔵 Question 2 (Behavioral & Leadership Execution)</h4>
                <p style="margin-bottom:0.4rem; font-style:italic; color:#475569;">"Tell me about a time you identified an analytical systemic bug late in a release cycle. How did you handle stakeholder updates?"</p>
                <p><strong>Talking Strategy:</strong> Focus heavily on clear visibility. Explain how you minimized code risks, deployed fixes under constraints, and kept communication transparent without missed deadlines.</p>
            </div>
            
            <p style="font-size:0.75rem; color:var(--muted); text-align:center; margin-top:0.5rem;">* Strategy Rule: Base responses around quantitative outcomes (e.g., % processing reduction runtime metrics).</p>
        `;
    });
}