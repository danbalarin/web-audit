#import "../../template/lib.typ": abbr

== Black-Box Auditing

Black-box auditing is a cornerstone technique in website quality assurance, particularly vital when scrutinising web applications without any insight into their internal structures or access to their source code. 
This approach treats the website as an opaque entity, where the internal workings are invisible—akin to viewing the system as a "_black box_". 
Auditors interact with the website solely through its exposed interfaces, just as a typical end-user would, allowing them to evaluate the website's behaviour in response to various inputs and usage scenarios.

The essence of black-box auditing lies in its focus on assessing the external functionalities and performance characteristics of a website. 
By testing the website from the outside, auditors can identify how it responds under different conditions, uncovering issues related to functionality, performance bottlenecks, security vulnerabilities, and compliance with standards and regulations. 
This method is particularly advantageous when the website's internal code is proprietary, inaccessible, or when the audit aims to replicate the real-world experience of end-users and external entities.

=== Methodologies

To conduct a thorough black-box audit, a combination of automated tools and manual testing techniques is employed. 
These methodologies are designed to simulate a wide range of user interactions and system conditions. 
Functional testing verifies that the website's features operate correctly by providing various inputs and observing the outputs. 
This includes testing form submissions, user authentication processes, and navigation flows to ensure all functionalities meet their specified requirements. 
Performance testing evaluates the website's responsiveness and stability under different loads. 
Tools simulate multiple concurrent users to assess how the website performs during peak traffic periods, identifying potential latency issues or crashes that could degrade user experience.

Security testing is another critical component, where auditors attempt to exploit potential vulnerabilities to identify security flaws that could be targeted by malicious actors. 
Techniques such as injection attacks, #abbr.a("XSS"), and broken authentication are tested to ensure robust security defences are in place. 
Accessibility testing assesses the website for compliance with standards like the #link(<WCAG>, "Web Content Accessibility Guidelines (WCAG)"), ensuring usability by individuals with disabilities. 
This involves checking for features such as proper semantic markup, alt text for images, and keyboard navigation support.

A variety of specialised tools are leveraged to automate and enhance the efficiency of black-box audits. 
Automated testing tools like Selenium or Playwright enable auditors to script interactions with the website, automating repetitive testing tasks and simulating complex user behaviours across different browsers and devices. 
Performance analysis tools such as Google Lighthouse, GTmetrix, and WebPageTest provide detailed performance metrics, analysing factors like page load times, rendering speeds, and resource utilisation to identify optimisation opportunities.
Security scanners like #abbr.s("OWASP") #abbr.l("ZAP") and Nessus conduct automated scans to detect common vulnerabilities, providing reports on potential security threats without needing access to the website's codebase. 
Accessibility validators such as WAVE, Axe, and Siteimprove assess the website against accessibility standards, highlighting issues that could impede users with disabilities and suggesting corrective measures. 
Additionally, SEO analysers like Moz and SEMrush evaluate the website's search engine optimisation, analysing elements such as keyword usage, meta tags, and back-link profiles to improve visibility in search engine results.

The primary strength of black-box auditing lies in its ability to evaluate a website from the same perspective as its users and potential attackers. 
By focusing on external interactions, auditors can identify issues that directly impact user experience, ensuring the website is functional, efficient, and accessible to its audience. 
This approach is ideal when source code access is restricted, enabling audits of third-party websites, competitor sites, or products where internal details are confidential. 
Moreover, simulating external attacks allows auditors to uncover vulnerabilities that could be exploited from outside, reinforcing the website's defences against real-world threats.

Despite its benefits, black-box auditing has inherent limitations. 
Without access to internal code or system configurations, some vulnerabilities or issues rooted in the backend logic may remain undetected. 
Automated tools may misidentify issues, either flagging benign elements as problematic (false positives) or missing actual vulnerabilities (false negatives), necessitating careful interpretation of results. 
Furthermore, some system behaviours may not be fully testable from the outside, such as specific error handling routines or internal data processing mechanisms.



