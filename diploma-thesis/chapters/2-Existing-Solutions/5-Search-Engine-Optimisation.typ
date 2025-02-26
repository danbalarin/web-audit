#import "../../template/lib.typ": abbr

== Search Engine Optimisation

#abbr.l("SEO") is a fundamental aspect of enhancing a website's visibility and accessibility to users via search engines.
Effective SEO strategies improve organic traffic, increase brand awareness, and ultimately contribute to achieving business objectives. 
Auditing a website's SEO performance is crucial for identifying areas of improvement, ensuring compliance with search engine guidelines, and staying competitive in the digital landscape. 
Numerous existing solutions facilitate SEO auditing without requiring access to the source code, enabling an external assessment of a website's optimisation status.

One of the primary tools for SEO auditing is Google Search Console, a free service provided by Google that helps webmasters monitor, maintain, and troubleshoot their site's presence in Google Search results. 
Although it requires site verification for full access, limited insights can be gleaned without source code access. 
For instance, using the public URL Inspection tool, auditors can check whether a page is indexed, view the rendered HTML, and identify any crawl errors or indexing issues. 
This information is vital for understanding how Google perceives a website and for diagnosing technical SEO problems that may hinder visibility.
@palmer_seo_2022

Screaming Frog SEO Spider is a widely used desktop program that functions as a website crawler, emulating the behaviour of search engine bots. 
By crawling a website, it collects data on various SEO elements, such as title tags, meta descriptions, headings, and status codes. 
It helps identify issues like duplicate content, broken links, missing meta tags, and improper use of directives like robots.txt and canonical tags. 
Its ability to analyse the site's architecture and internal linking structure provides insights into potential improvements in crawlability and user navigation.
@palmer_seo_2022

// Tools like Ahrefs, SEMrush, and Moz Pro offer comprehensive SEO auditing capabilities, combining site crawling with backlink analysis and keyword research.
// These platforms have extensive databases of backlinks and keyword rankings, allowing auditors to assess a website's authority, link profile, and competitive positioning. 
// By analysing inbound links, auditors can identify toxic backlinks that may harm a site's reputation and risk penalties from search engines. 
// Additionally, these tools provide insights into the website's performance in #abbr.pla("SERP"), highlighting keywords where the site ranks and opportunities for content optimisation.

XML Sitemap and robots.txt files play significant roles in guiding search engine crawlers. 
Auditing these files using tools like XML Sitemap Validator and Robots.txt Checker ensures that they are correctly formatted and effectively communicate crawling directives. 
Errors in these files can prevent pages from being indexed or crawled, severely limiting visibility. 
These tools fetch and analyse the files directly from the website, requiring no source code access.

Accessibility, usability and performance, while often considered separately, intersect with SEO. Websites that are accessible and user-friendly and fast tend to have better engagement metrics and may be favoured by search algorithms prioritising user experience. Existing solutions for those areas can be found in @accessibility, @performance and @ui-ux.
