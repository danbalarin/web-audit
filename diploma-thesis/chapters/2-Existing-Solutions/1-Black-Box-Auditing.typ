#import "../../template/lib.typ": abbr

== Black-Box Auditing

Black-box auditing is a cornerstone technique in website quality assurance, particularly vital when scrutinising web applications without any insight into their internal structures or access to their source code. 
This approach treats the website as an opaque entity, where the internal workings are invisible—akin to viewing the system as a "_black box_". 
Auditors interact with the website solely through its exposed interfaces, just as a typical end-user would, allowing them to evaluate its behaviour in response to various inputs and usage scenarios.

The essence of black-box auditing lies in its focus on assessing a website's external functionalities and performance characteristics. 
By testing the website from the outside, auditors can identify how it responds under different conditions, uncovering issues related to functionality, performance bottlenecks, security vulnerabilities, and compliance with standards and regulations. 
This method is particularly advantageous when the website's internal code is proprietary or inaccessible or when the audit aims to replicate the real-world experience of end-users and external entities.
@dustin_implementing_2009

=== Methodologies

A combination of automated tools and manual testing techniques is employed to conduct a thorough black-box audit.
These methodologies are designed to simulate a wide range of user interactions and system conditions. 

Accessibility testing assesses the website for compliance with standards like the #link(<WCAG>, "Web Content Accessibility Guidelines (WCAG)"), ensuring usability by individuals with disabilities. 
This involves checking for features such as proper semantic markup, alt text for images, and keyboard navigation support.
Accessibility validators such as WAVE, Axe, and Siteimprove assess the website against accessibility standards, highlighting issues that could impede users with disabilities and suggesting corrective measures. 

Performance testing evaluates the website's responsiveness and stability under different loads. 
Tools simulate multiple concurrent users to assess how the website performs during peak traffic periods, identifying potential latency issues or crashes that could degrade the user experience.
Analysis tools such as Google Lighthouse, GTmetrix, and WebPageTest provide detailed performance metrics, analysing factors like page load times, rendering speeds, and resource utilisation to identify optimisation opportunities.

Security testing is another critical component, where auditors attempt to exploit potential vulnerabilities to identify security flaws that malicious actors could target. 
Techniques such as injection attacks, #abbr.a("XSS"), and broken authentication are tested to ensure robust security defences are in place. 
Security scanners like #abbr.s("OWASP") #abbr.l("ZAP") and Nessus conduct automated scans to detect common vulnerabilities, providing reports on potential security threats without needing access to the website's codebase. 

Automated testing tools like Selenium or Playwright enable auditors to script interactions with the website, automating repetitive testing tasks and simulating complex user behaviours across different browsers and devices. 
Additionally, SEO analysers like Moz and SEMrush evaluate the website's search engine optimisation, analysing elements such as keyword usage, meta tags, and back-link profiles to improve visibility in search engine results.

The primary strength of black-box auditing lies in its ability to evaluate a website from the same perspective as its users and potential attackers. 
By focusing on external interactions, auditors can identify issues directly impacting user experience, ensuring the website is functional, efficient, and accessible to its audience. 
This approach is ideal when source code access is restricted, enabling audits of third-party websites, competitor sites, or products where internal details are confidential. 
Moreover, simulating external attacks allows auditors to uncover vulnerabilities that could be exploited from outside, reinforcing the website's defences against real-world threats.

Despite its benefits, black-box auditing has inherent limitations. 
Some vulnerabilities or issues rooted in the backend logic may remain undetected without access to internal code or system configurations.
Automated tools may misidentify issues and flag benign elements as problematic (false positives) or missing actual vulnerabilities (false negatives), necessitating careful interpretation of results. 
Furthermore, some system behaviours, such as specific error handling routines or internal data processing mechanisms, may not be fully testable from the outside.




