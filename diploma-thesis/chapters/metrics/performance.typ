#import "/template/macros.typ": revisit

== Performance

#revisit[
  This section focuses on performance metrics, usage of optimization tools etc.
  It is the most "visible" part for the end user, it's easier to notice slow loading rather than improper semantic tags.
]

=== Motivation

#revisit[
  Apart from making the app as easy to access as possible there is a direct correlation between *page load time* and successful conversions.
  The supporting data can be found [here](https://www.cloudflare.com/learning/performance/more/website-performance-conversion-rates/), [here](https://www.portent.com/blog/analytics/research-site-speed-hurting-everyones-revenue.htm) or [here](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-conversion-data/#:~:text=For%20every%20second%20delay%20in,fall%20by%20up%20to%2020%25.).
  And the *page load time* is affected by many factors, mainly internet speed and device performance. 
  This audit will most likely be executed on a high end developer machine with good internet, but not all users have this kind of machine and internet speed.

  According to a survey created by Kinsta #cite(<kinsta_mobile_nodate>) web the percentage of mobile web visitors varies by country, but it ranges between 30-70% and also more and more people relies on mobile data, which most of the time are slower than your average *modem* connection.
  That is the reason why we are not focusing only on the metrics, but the causalities of measured values as well.
]

=== Areas to be considered

#revisit[
  - Time to first byte
  	- Performance of hosting server, should be fine for AWS, GCP, but could be problem with self hosting
  - First contentful paint
  	- Time from the initial request until first content (article, header, buttons, etc) is visible.
  	- This shows problems with unoptimised code or big payloads (js, css, assets)
  - Time to interactive
  	- For basic HTML sites should be equal to FCP
  	- This shows problems with unoptimised code and perhaps problems with hydration.
  		- *Note: Nextjs hydratation problem won't be shown on production, but it slows the performance nonetheless*
  - Image optimization
  	- Next gen formats (webp, avif)
  	- SVG where possible
  - Fonts
  	- Google Fonts always preferred
  	- Self hosted optimisation (remove unused alphabets, use woff2, woff formats)
  - Prefer hosting static assets on CDN
  - Code splitting
  	- Route prefetching on link hover is nice to have
  - SSR/SSG, ISR, CSR and caching  
]
