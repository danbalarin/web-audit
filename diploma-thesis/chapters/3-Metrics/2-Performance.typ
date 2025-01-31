#import "../../template/lib.typ": abbr

== Performance

@performance already established tools that are often used to measure performance metrics. 
The best tool for this, as already mentioned, is Lighthouse by Google, as it's open source, well-maintained and partly community-driven.
It measures a wide variety of metrics, but we will be focused on a subset, that affects the final performance the most.

=== Time to First Byte (TTFB)<TTFB>

Time to First Byte is a performance metric that measures the duration from the moment a client makes an HTTP request to the first byte of the page being received by the client's browser. 
It encompasses the initial connection stages, including #abbr.s("DNS") lookup, #abbr.s("TCP") connection, #abbr.s("TLS") handshake, and the server processing time required to generate and send the response.

TTFB is crucial because it reflects the responsiveness of a web server and its ability to quickly begin delivering content to users. 
A high TTFB can indicate server-side issues such as slow database queries, inadequate hosting resources, or inefficient backend code. 
While TTFB primarily affects the initial connection phase, delays can impact subsequent loading stages and overall user experience. 
However, it's important to note that a slow TTFB doesn't always mean the entire page will load slowly and vice versa.

The target value of TTFB is under 800 milliseconds, which is considered fast.
On the other hand, anything over 1800 milliseconds is considered slow and should be remediated as soon as possible. @pollard_time_2021

Improving TTFB begins with diagnosing which stages of the initial connection process contribute most to delays.
Using diagnostic tools like Lighthouse or WebPageTest, you can break down TTFB into these components to identify where the bottlenecks occur.

In most cases, the primary contributor to a high TTFB is the server processing time required to build and deliver the requested page. 
Complex pages that require extensive code execution and multiple database queries can slow down server response. 
To address this, consider simplifying the page by removing unnecessary features or functionalities that may not add value to the user but contribute to processing delays. @edgar_speed_2024

Caching is a powerful strategy to reduce server processing time. 
By caching internal resources, you store static versions of pages or results of database queries. 
When a user requests a cached page, the server can deliver the content quickly without re-executing code or database queries. 
It's important to set appropriate cache refresh intervals based on how frequently the content changes to prevent serving stale information.
Concepts like #abbr.a("SSG") and #abbr.a("ISR") are tightly bound to caching.

SSG generates the page in build time, and the static assets can then be hosted on a faster #abbr.a("CDN"), which completely removes computation time on request.
Such static pages include landing pages, login screens, sign-up forms and others.
ISR enables the developers to specify which dynamic routes can be built as static content and then hosted similarly to the SSG.
A prime example of ISR fit is a blog with a dynamic URL specifying different static blog posts.
The computation is made only the first time someone visits the page; all subsequent requests are cached, and the TTFB is significantly lower. @camden_jamstack_2022

Optimising backend code and database queries can also significantly improve TTFB. 
Streamlining code, optimising algorithms, and ensuring efficient database interactions reduce the time the server spends processing requests. 
Techniques such as using indexes on database columns, avoiding subqueries, and utilising efficient join types can speed up query execution. @smith_professional_2013

=== First Contentful Paint (FCP)

#abbr.l("FCP") is a crucial performance metric that measures the time it takes for a browser to render the first piece of content from the #abbr.l("DOM"). 
This content includes text, images, #abbr.a("SVG") elements, or canvas elements that are not white. 
FCP marks when users first perceive the page loading, transitioning from a blank screen to seeing initial page elements.

FCP is significant because it represents the beginning of the user experience on a website. 
Before FCP occurs, visitors are met with a blank screen, unsure if anything is happening. 
A faster FCP assures users that the site is responsive, which can enhance engagement and reduce bounce rates. 
While the content displayed at FCP might not be immediately interactive or meaningful, it signals progress in the page-loading process.

Several factors can influence FCP timings. 
Delays in FCP can result from high network latency, slow server response times (affected by #link(<TTFB>, "TTFB"), or complex rendering tasks due to heavy or unoptimised JavaScript and CSS code.
Reflows, which occur when the browser has to recalculate the layout due to changes in the DOM (like loading images without specified dimensions), can also delay FCP by keeping the browser busy with additional calculations.

Improving FCP involves optimising various aspects of the web page loading process. 
Reducing server response times by enhancing server performance can decrease TTFB, thereby speeding up FCP. 
Minimising HTML, CSS, and JavaScript code helps the browser parse and render the page more efficiently. 
Optimising font loading is also essential; using fallback system fonts can prevent the #abbr.a("FOIT"), where the text remains unseen until custom fonts load and mitigate the #abbr.a("FOUT"), where text appears unstyled before custom fonts are applied.

Efforts to optimise FCP can have a broader impact by improving subsequent performance metrics and overall user satisfaction. 
However, challenges may arise due to platform restrictions or dependencies on third-party scripts, which might limit the extent of feasible optimisations. 
Despite these challenges, focusing on FCP is worthwhile because it enhances the initial user experience, builds trust and encourages users to stay engaged with the website.

According to an article by #cite(<walton_first_2023>, form: "prose"), a FCP under 1.8 seconds is considered good, indicating a fast-loading page that enhances user experience. 
Pages with an FCP between 1.8 seconds and 3 seconds are average but have room for improvement. 
An FCP over 3 seconds is deemed slow and may lead to user frustration or increased bounce rates. 
Data from the HTTP Archive #cite(<noauthor_http_2025>, form: "prose") shows that the median FCP for mobile websites is 3.3 seconds and 2.1 seconds for desktop sites.
This highlights that many websites fall into the slower range and could benefit from optimisation efforts.

// === Time to Interactive

// === Total Blocking Time

// #abbr.l("TBT") is a critical web performance metric measuring the total time between #abbr.s("FCP") and Time to Interactive (TTI), during which the main thread is blocked for long enough to prevent user input responsiveness. 
// In essence, TBT quantifies periods when a webpage appears to be loading but is unresponsive to user interactions, affecting the perceived performance and user experience.

// High TBT values indicate that a webpage takes longer to become interactive, forcing visitors to wait before they can engage with the content. 
// This delay can lead to frustration and a poorer user experience, as interactions may feel sluggish or unresponsive. 
// Reducing TBT can make interactions feel smoother and more fluid, enhancing the overall experience for visitors. 
// Improvements in TBT often lead to better engagement metrics and can positively impact conversion rates, as users are more likely to stay on a site that responds promptly to their inputs.

// Optimising TBT involves minimising long tasks that block the main thread. 
// JavaScript execution time significantly affects TBT, especially when scripts are heavy or inefficient. 
// Tools like WebPageTest, Chrome DevTools or Google Lighthouse can help identify specific scripts or tasks contributing to high TBT by analysing main thread activity.
// Addressing issues such as layout thrashing—where JavaScript repeatedly reads from and writes to the #abbr.a("DOM"), causing excessive layout calculations and repainting can significantly reduce TBT. 
// Simplifying or deferring non-critical JavaScript, batching DOM read and write operations, and optimising code execution can lower TBT.

// In website performance evaluation, TBT serves as a valuable metric for monitoring and improving user experience. 
// While TTI tells us when a page becomes fully interactive, TBT sheds light on the quality of the interaction experience leading up to that point. 
// A lower TBT means fewer disruptions and delays for the user, making the site feel faster and more responsive. 
// Incorporating TBT into regular performance monitoring can help identify potential issues early and guide optimisation efforts to enhance user satisfaction and engagement.

=== Total Requests and Transfer Size 

Total Requests and Transfer Size are fundamental metrics in evaluating a webpage's performance and its impact on user experience. 
Total Requests refers to the total number of files or resources that a browser must request from a server to fully load a webpage. 
These resources include #abbr.s("HTML") files, JavaScript, #abbr.s("CSS"), images, fonts, and other assets. Each request can introduce latency, so a higher number of requests can lead to longer page load times, especially on networks with higher latency or lower bandwidth.

Transfer Size, on the other hand, measures the total amount of data (in bytes) transferred from the server to the browser for all requested files. 
This includes the compressed size of resources, as servers often compress files to reduce Transfer Size before sending them to browsers. 
A larger Transfer Size means more data needs to be downloaded, which can slow down page loading and consume more of a user's data allowance, impacting users on metered or slow connections.
@edgar_speed_2024

Monitoring Total Requests and Transfer Size is crucial because they define the page's size and complexity, directly affecting how quickly a page can be displayed to visitors. 
A sudden increase in either metric might signal that new resources have been added—like large images, additional scripts, or stylesheets—that could negatively impact load times. 
By tracking these metrics over time, developers can identify trends and investigate any spikes to ensure optimal performance.

As for good and bad values, benchmarks can vary depending on the context and the evolving nature of web technology. 
However, statistical data by HTTP Archive #cite(<noauthor_http_2025-1>, form: "prose") provides median values for reference. 
The median number of Total Requests for mobile devices is about 72 files, while for desktop websites, it's around 76 files. 
Regarding Transfer Size, the median for mobile sites is approximately 2,4 MB, and for desktop sites, about 2,7 MB. 
Websites exceeding these medians might experience slower load times, potentially affecting user engagement and retention.

It's important to note that reducing Total Requests and Transfer Size isn't always straightforward or even desirable in all cases. 
With advancements like HTTP/2's multiplexing, more files can sometimes load faster than fewer files because multiple requests can be handled concurrently over a single connection. 
Additionally, certain functionalities, such as interactive features or high-quality media, inherently require more resources. 
For instance, complex web applications or feature-rich shopping carts may require extensive JavaScript and CSS, increasing Total Requests and Transfer Size. 
Simplifying these elements to reduce size might degrade the user experience or remove essential functionality.
@edgar_speed_2024

Therefore, while striving for lower Total Requests and Transfer Size to enhance performance is generally advantageous, these metrics should be balanced against the website's and its users' needs. 
The goal isn't simply to minimise numbers but to optimise the overall user experience without compromising essential features. 
Developers should use these metrics as guides to identify optimisation opportunities, such as compressing files, minifying code, or eliminating unnecessary resources, always considering the potential impact on functionality and user satisfaction.

=== Interaction to Next Paint (INP)

#abbr.l("INP") is a Core Web Vitals metric that measures the responsiveness of a webpage by evaluating how long it takes for the site to display a visual response after a user interaction. 
Specifically, INP assesses the latency between a user's action—such as a click, tap, or key press—and the time when the next paint is rendered, updating the page's visual presentation accordingly.

INP was introduced to provide a more comprehensive understanding of a webpage's interactivity, replacing the previous metric known as #abbr.l("TBT"). 
While TBT measured the time the main thread was blocked and unable to respond to user input, it did not fully capture the user's experience during specific interactions. 
INP addresses this by focusing on the time users wait for a response after each interaction, thus offering a more accurate reflection of real-world interactivity issues.

Good and bad values for INP are categorised based on thresholds that impact user experience. 
As stated in an article by #cite(<wagner_interaction_2024>, form: "prose"), an INP of less than or equal to 200 milliseconds is considered good, indicating that the webpage responds quickly to user interactions, providing a smooth experience. 
An INP between 200 and 500 milliseconds suggests that the responsiveness needs improvement, as users may start to notice delays. 
An INP exceeding 500 milliseconds is deemed poor, highlighting significant delays that can lead to user frustration and negatively affect engagement with the site.

=== Cumulative Layout Shift (CLS)

#abbr.l("CLS") is a Core Web Vitals metric that measures the visual stability of a webpage by quantifying unexpected layout shifts that occur during its life cycle.
These shifts happen when visible elements move from one position to another without user interaction, often disrupting the user experience by causing users to click on the wrong element or lose their place while reading.

CLS calculates a score based on the cumulative effect of all individual layout shifts that occur within specific session windows. 
A session window starts when a layout shift is first detected and includes any additional shifts that happen within a one-second interval. 
If no new shifts occur within this period, the session window closes. 
The CLS score represents the largest sum of layout shifts within any single session window, focusing on the most significant disruptions users might encounter.

Good and bad CLS values are standardised to help developers optimise their websites.
According to an article by #cite(<mihajlija_cumulative_2023>, form: "prose"), a CLS score of 0.1 or less is considered good, indicating minimal unexpected layout shifts and a stable visual experience. 
Scores between 0.1 and 0.25 suggest that the page needs improvement, as users may notice some disruptive shifts. 
A score above 0.25 is considered poor, reflecting significant layout instability that can lead to user frustration.

Improving CLS involves strategies such as reserving space for images, ads, and other dynamic content, avoiding inserting new content above existing content, and optimising resource loading to prevent late-running scripts from causing shifts. 
By focusing on these areas, developers can enhance the visual stability of their web pages, leading to a better user experience.

