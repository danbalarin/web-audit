#import "../../template/lib.typ": abbr

== Performance

@performance already established tools that are often used to measure performance metrics. 
The best tool for this, as already mentioned, is Lighthouse by Google, as it's open source, well-maintained and partly community-driven.
It measures a wide variety of metrics, but we will be focused on a subset, that affects the final performance the most.

=== Time to First Byte (TTFB)

Time to First Byte is a performance metric that measures the duration from the moment a client makes an HTTP request to the first byte of the page being received by the client's browser. 
It encompasses the initial connection stages, including #abbr.s("DNS") lookup, #abbr.s("TCP") connection, #abbr.s("TLS") handshake, and the server processing time required to generate and send the response.

TTFB is crucial because it reflects the responsiveness of a web server and its ability to quickly begin delivering content to users. 
A high TTFB can indicate server-side issues such as slow database queries, inadequate hosting resources, or inefficient backend code. 
While TTFB primarily affects the initial connection phase, delays can impact subsequent loading stages and overall user experience. 
However, it's important to note that a slow TTFB doesn't always mean the entire page will load slowly and vice versa.

The target value of TTFB is under 800ms, which is considered fast.
On the other hand, anything over 1800ms is considered slow and should be remediated as soon as possible. @pollard_time_2021

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

=== First Contentful Paint

=== Total Blocking Time

=== Total Requests and Transfer Size

=== Cumulative Layout Shift

=== Interaction to Next Paint

https://web.dev/articles/inp


