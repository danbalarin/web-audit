#import "../template/lib.typ": abbr, aligned-block

= Analysis of Existing Solutions

Ensuring that these websites are optimised for performance, accessible to all users, secure from threats, and provide a seamless user experience is paramount.
Web auditing tools play a crucial role in this process, offering insights and recommendations to improve various aspects of a website.
This chapter delves into the analysis of existing web auditing solutions, examining their strengths, weaknesses, and the methodologies they employ.
By understanding the current state of web auditing tools, we can identify gaps and opportunities for innovation, ultimately developing a more comprehensive and user-friendly auditing tool.

Google and Mozilla have significantly influenced the web auditing landscape by contributing to open-source tools and industry standards.
Google's Lighthouse, an automated tool for improving the quality of web pages, has set a benchmark for performance, accessibility, and #abbr.a("SEO") audits.
Lighthouse provides detailed reports and actionable insights, making it a popular choice among developers. 
Similarly, Mozilla's Observatory offers a suite of tools for security audits, focusing on identifying vulnerabilities and providing recommendations for enhancing website security.

The open-source nature of these tools has fostered a collaborative environment, encouraging contributions from the developer community and driving continuous improvement.
The transparency and accessibility of these tools have also influenced the development of other auditing solutions, promoting a culture of openness and innovation in web auditing.

== Manual Auditing

Manual auditing involves a hands-on approach where human expertise is employed to evaluate various aspects of a website. 
This method is beneficial for tasks that require subjective judgment, such as assessing the user experience or identifying complex security vulnerabilities. 
Manual audits often involve a checklist of criteria that auditors use to evaluate a website systematically.

One of the critical advantages of manual auditing is its ability to provide nuanced insights that automated tools may overlook. 
For instance, evaluating a website's visual hierarchy and aesthetic appeal is best suited for human auditors. 
However, manual auditing can be time-consuming and prone to human error, making it less efficient for large-scale or frequent audits.


== Automated

Automated auditing leverages software tools to systematically evaluate a website against predefined criteria. 
These tools can quickly analyse large volumes of data and provide detailed reports, making them ideal for routine audits and performance monitoring. 
Automated tools excel in areas such as performance benchmarking, accessibility checks, and identifying common security vulnerabilities.

@lighthouse[Google's Lighthouse] and @observatory[Mozilla's Observatory] are prime examples of automated auditing tools that have gained widespread adoption. 
Lighthouse, for instance, can simulate network conditions and measure performance metrics such as load times and responsiveness. 
On the other hand, Observatory scans websites for security issues and provides recommendations for remediation.

While automated tools offer speed and consistency, they may lack the depth and contextual understanding that manual audits provide. 
Therefore, combining manual and automated auditing strengths, a hybrid approach can offer a more comprehensive evaluation of a website's overall health and performance.

=== Lighthouse
<lighthouse>

As mentioned, Lighthouse is an open-source tool created and maintained by Google initially for their use.
It was later released as a web service and is now provided as a browser extension, #abbr.a("CLI") tool and Node.JS package.

It offers audits in categories very similar to the goals of this thesis, such as performance, accessibility, and security.
It is also extendable by configuration files that offer some level of customisation and via plugins that are more complex but also provide finer control.

#aligned-block(
  figure(
    table(
      columns: (1fr, auto, auto),
      [Capability],[Plugin],[Custom Config],
      [Include your own custom audits],[✅],[✅],
      [Add a custom category],[✅],[✅],
      [Easily shareable and extensible on NPM],[✅],[❌],
      [Semver-stable API],[✅],[❌],
      [Gather custom data from the page (artifacts)],[❌],[✅],
      [Modify core categories],[❌],[✅],
      [Modify config.settings properties],[❌],[✅]
    ),
    caption: [Comparison of Plugin vs Custom Config, @google_google_nodate],
  ),
)

As for performance testing, there is currently no better option on the market, as Lighthouse covers all metrics that can be measured and creates detailed reports, including screenshots.
Within the #abbr.a("CLI") and NodeJS environments they also provide a function to compute median run, making the metrics more accurate and statistically significant.

In the accessibility section, it lacks several tests, as they are not run at all.
One example of such a missing rule is _marquee_ from WCAG 2.2.2, which states that the element `<marquee>` should not be used because it's moving, ergo, hard to click on and distracting. @world_wide_web_consorcium_w3c_web_nodate
This rule has been removed from Lighthouse audit runs because this element is deprecated and should not be used.
However, that doesn't mean it won' be used at all, so complex audits should check on it.

=== HTTP Observatory
<observatory>

Similarly to @lighthouse[Lighthouse], Mozilla's HTTP Observatory is an open-source tool focusing on security audits. 
It offers a robust suite of features to identify and mitigate website vulnerabilities. 
Developed by Mozilla, a renowned open-source software and internet security advocate, Observatory comprehensively analyses a website's security posture, making it an invaluable resource for developers, security professionals, and website owners.

One of the critical strengths of Observatory is its ability to perform in-depth security scans that cover a wide range of potential vulnerabilities. 
The tool evaluates various security aspects, including HTTPS implementation, content security policies, and the presence of security headers. 
By analysing these components, the Observatory generates detailed reports highlighting areas of concern and providing actionable improvement recommendations.
This granular approach ensures that websites are thoroughly scrutinised for security weaknesses, helping to safeguard against common threats such as #abbr.a("XSS"), #abbr.a("CSRF"), and data breaches.

It is released as a website that anyone can visit and request an audit for any website they want to check or in the form of a #abbr.a("CLI") tool.
Unfortunately, there is no native way to run it in a NodeJS environment, but that can be overcome by spawning process that invokes the CLI command.



