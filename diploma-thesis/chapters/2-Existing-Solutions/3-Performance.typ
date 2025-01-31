#import "../../template/lib.typ": abbr

== Performance <performance>

Website performance is a crucial component of web quality assurance, profoundly affecting user experience, engagement, and the overall success of an online presence. 
Users today expect swift and seamless interactions; even slight delays can lead to increased bounce rates and decreased satisfaction. 
According to a study by #cite(<solarwinds_does_2018>, form: "prose"), at 1 second page load time, the bounce rate is approximately 7%; at 4 seconds, it's 24%.
Furthermore, search engines like Google incorporate website performance into their ranking algorithms, making performance optimisation not only a user experience imperative but also a key factor in visibility and competitiveness.

To ensure optimal performance, regular auditing using existing solutions is essential. 
These tools and methodologies are specifically designed to evaluate various aspects of website performance, providing actionable insights for improvement.

One of the most prominent tools for performance auditing is Google Lighthouse, an open-source, automated tool developed by #link(<google>, "Google") to help improve web page quality. 
Lighthouse can be executed within Chrome DevTools, as a Node module, or via the command line. 
It conducts comprehensive audits across several categories, with performance being a primary focus. 
By simulating page loads on mobile devices and throttled network conditions, Lighthouse measures critical metrics such as #abbr.l("FCP"), Time to Interactive #abbr.l("TTI"), Speed Index, and #abbr.l("LCP"). 
These metrics reflect how users perceive loading and interactivity experiences. 
Lighthouse provides a performance score accompanied by detailed diagnostic reports and suggestions for enhancements, enabling developers to identify and address specific areas where performance may lag.

Another vital solution is WebPageTest, a web performance tool that allows for detailed testing from multiple locations around the world using real browsers and simulated user connections. 
It offers granular insights into how a web page loads, showcasing metrics like #abbr.l("TTFB"), Start Render time, and Fully Loaded time. 
WebPageTest generates rich visualisations, including waterfall charts and filmstrips, illustrating the loading sequence of resources. 
This level of detail helps pinpoint bottlenecks such as uncompressed assets, inefficient server responses, or third-party scripts that delay rendering.
@edgar_speed_2024


GTmetrix combines performance analysis with actionable recommendations derived from Google PageSpeed and YSlow rulesets. 
By providing a holistic overview of a website's performance, GTmetrix identifies key issues affecting speed and offers prioritised suggestions for optimisation. 
It also allows for tracking performance over time through monitoring and alerts, enabling developers to observe the impact of changes and detect regressions promptly.
@edgar_speed_2024

Browser-integrated developer tools, such as those in Google Chrome, Mozilla Firefox, and Safari, are indispensable for real-time performance auditing.
The Network panel in these tools displays all network requests, their sizes, and timings, helping identify assets that take the longest to load or block rendering. The Performance panel allows developers to record and analyse the runtime performance of web applications, revealing scripting, rendering, and painting activities. 
By examining these profiles, developers can detect inefficient code, memory leaks, or excessive reflows that degrade performance.

For server-side performance auditing, #abbr.a("APM") solutions like New Relic, Dynatrace, and AppDynamics provide deep insights into backend operations. 
These tools monitor application behaviour, resource utilisation, database queries, and external service calls. 
By tracing transactions end-to-end, APM tools uncover server-side bottlenecks impacting response times and overall user experience. 
They offer detailed analytics and alerting mechanisms, ensuring performance issues are proactively identified and addressed.

// Not Related
// #abbr.l("RUM") complements synthetic testing by collecting performance data from actual users in real time. 
// Solutions such as Google Analytics, New Relic Browser, and Dynatrace RUM gather metrics like page load times, user timing, and interaction responsiveness across diverse user environments. 
// RUM provides a realistic perspective on how users experience a website, accounting for variables like device capabilities, network conditions, and geographic locations. 
// This data helps prioritise optimisation efforts based on real-world impact.

Monitoring third-party content is another critical aspect of performance auditing. 
Tools like Google Lighthouse and WebPageTest have already been mentioned, and they also can visualise all external requests made by a website, highlighting the performance impact of third-party scripts, style sheets, or media.
Since third-party resources can significantly affect load times and are often outside direct control, identifying and managing these dependencies is essential.
Based on the audit findings, developers can decide to defer, async-load, or eliminate non-essential third-party content.

Advanced performance auditing also involves profiling at the code level. 
Tools like Webpack Bundle Analyzer assess the size and composition of JavaScript bundles, helping developers identify unnecessary code bloat or opportunities for code splitting. 
Similarly, Coverage features in browser developer tools highlight unused JavaScript and CSS, suggesting areas where code can be trimmed to reduce load times.

Synthetic Monitoring tools like Catchpoint and Uptrends offer controlled testing environments for more specialised auditing. 
They simulate user interactions from various geographic locations, devices, and network conditions, providing consistent benchmarks for performance. 
These services can monitor specific transactions or user flows, detecting issues like slow database responses or API latency that might not be apparent in standard page load tests.

Moreover, automated testing frameworks like Selenium and Puppeteer can be extended for performance auditing by scripting user interactions and measuring performance metrics during these flows. 
These tools enable customised testing scenarios that reflect actual user behaviour, providing insights into performance during complex transactions or multi-step processes.

Incorporating performance audits into the development workflow is facilitated by integrating tools into #abbr.a("CI/CD") pipelines. 
For instance, Lighthouse CI can be configured to run performance audits automatically during the build process. 
It compares current performance metrics against established baselines or budgets, failing the build if significant regressions are detected. 
This integration ensures that performance remains a gate in the deployment process, maintaining high standards over time.

Finally, staying informed about emerging standards and technologies is crucial for effective performance auditing. 
The adoption of protocols like HTTP/2 or HTTP/3, which leverages new protocol QUIC~(#cite(<iyengar_quic_2021>, form: "year")), which offer performance enhancements through features like multiplexing, improved congestion control or reducing number of handshakes can be assessed using tools like Blackfire.io and Wireshark. 
Auditing whether a website is leveraging these protocols effectively can reveal opportunities for improvements at the network level.
