/* ICXR 2026 committee contacts — left aligned beside each role heading.
 * Place this file beside committeeOR.html, then add before </body>:
 * <script src="committee-emails.js"></script>
 * Updates only existing role headings; all member lists remain untouched.
 */
(function () {
    'use strict';
    const addresses = new Map([
        ['general chairs', 'general@icxr.net'],
        ['program chairs', 'program@icxr.net'],
        ['registration chair', 'icxr@ccf.org.cn'],
        ['registration chairs', 'icxr@ccf.org.cn']
    ]);
    const normalize = text => text.replace(/\s+/g, ' ').trim().toLowerCase();

    function applyCommitteeEmails() {
        if (!document.getElementById('icxr-committee-email-style')) {
            const style = document.createElement('style');
            style.id = 'icxr-committee-email-style';
            style.textContent = `
                .icxr-committee-heading {
                    display: flex;
                    align-items: baseline;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    gap: .35rem 1.5rem; /* 24px between the title and email at a 16px root font size */
                    width: 100%;
                    margin: 1.5rem 0 1rem;
                }
                .icxr-committee-heading > h2 {
                    margin: 0;
                    min-width: 0;
                }
                .icxr-committee-heading > .icxr-committee-email {
                    display: block;
                    margin-left: 0;
                    max-width: 100%;
                    color: #0b2b4f;
                    font-size: 1.25rem;
                    font-weight: 700;
                    font-style: italic;
                    line-height: 1.5;
                    text-align: left;
                    text-decoration: none;
                    overflow-wrap: anywhere;
                }
                .icxr-committee-heading > .icxr-committee-email:hover {
                    color: #2c7da0;
                    text-decoration: underline;
                    text-underline-offset: .2em;
                }
                .icxr-committee-heading > .icxr-committee-email:focus-visible {
                    outline: 2px solid #2c7da0;
                    outline-offset: 4px;
                }
            `;
            document.head.appendChild(style);
        }
        document.querySelectorAll('h2').forEach(heading => {
            const title = heading.textContent.trim();
            const email = addresses.get(normalize(title));
            if (!email) return;

            let row = heading.parentElement;
            if (!row.classList.contains('icxr-committee-heading')) {
                row = document.createElement('div');
                row.className = 'icxr-committee-heading';
                heading.parentNode.insertBefore(row, heading);
                row.appendChild(heading);
            }
            let link = row.querySelector('.icxr-committee-email');
            if (!link) {
                link = document.createElement('a');
                link.className = 'icxr-committee-email';
                row.appendChild(link);
            }
            link.href = 'mailto:' + email;
            link.textContent = email;
            link.setAttribute('aria-label', 'Email ' + title + ': ' + email);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyCommitteeEmails, {once: true});
    } else {
        applyCommitteeEmails();
    }
})();
