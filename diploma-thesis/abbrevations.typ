#import "template/lib.typ": abbr

#abbr.add-many(
  ("ADA", "Americans with Disabilities Act"),
  ("AJAX", "Asynchronous JavaScript and XML"),
  ("AMP", "Accelerated Mobile Pages"),
  ("API", "Application Programming Interface"),
  ("APM", "Application Performance Monitoring"),
  ("AR", "Augmented Reality"),
  ("WAI-ARIA", "Accessible Rich Internet Applications"),
  // ("ARIA", "Accessible Rich Internet Applications"),
  ("BCP", "Best Current Practice"),
  ("CAPTCHA", "Completely Automated Public Turing test to tell Computers and Humans Apart"),
  ("CD", "Continuous Deployment"),
  ("CDN", "Content Delivery Network"),
  ("CI", "Continuous Integration"),
  ("CI/CD", "Continuous Integration/Continuous Deployment"),
  ("CLI", "Command Line Interface"),
  ("CLS", "Cumulative Layout Shift"),
  ("CMS", "Content Management Systems"),
  ("CSRF", "Cross-Site Request Forgery"),
  ("CSS", "Cascading Style Sheets"),
  ("DDoS", "Distributed Denial of Service"),
  ("DOJ", "Department of Justice"),
  ("DIDs", "Decentralised Identifiers"),
  ("DNS", "Domain Name System"),
  ("FCP", "First Contentful Paint"),
  ("FID", "First Input Delay"),
  ("GCP", "Google Cloud Platform"),
  ("HTML", "HyperText Markup Language"),
  ("HTTP", "Hypertext Transfer Protocol"),
  ("HTTPS", "Hypertext Transfer Protocol Secure"),
  ("ICANN", "Internet Corporation for Assigned Names and Numbers"),
  ("IDE", "Integrated Development Environment"),
  ("IEC", "International Electrotechnical Commission"),
  ("IEEE", "Institute of Electrical and Electronics Engineers"),
  ("IETF", "Internet Engineering Task Force"),
  ("IMAP", "Internet Message Access Protocol"),
  ("IP", "Internet Protocol"),
  ("IPsec", "Internet Protocol Security"),
  ("ISR", "Incremental Server Regeneration"),
  ("ISO", "International Organization for Standardization"),
  ("ISRG", "Internet Security Research Group"),
  ("ITU", "International Telecommunication Union"),
  ("JAWS", "Job Access With Speech"),
  ("LCP", "Largest Contentful Paint"),
  ("MDN", "Mozilla's Developer Network"),
  ("MVC", "Model–View–Controller"),
  ("MVVM", "Model–View–ViewModel"),
  ("NGO", "Non-Governmental Organisation"),
  ("NVDA", "NonVisual Desktop Access"),
  ("OWASP", "Open Web Application Security Project"),
  ("POP", "Post Office Protocol"),
  ("PWA", "Progressive Web App"),
  ("RFC", "Request for Comments"),
  ("RUM", "Real User Monitoring"),
  ("SDG", "Sustainable Development Goals"),
  ("SEO", "Search Engine Optimisation"),
  ("SERP", "Search Engine Result Page"),
  ("SMTP", "Simple Mail Transfer Protocol"),
  ("SSG", "Static Site Generation"),
  ("SSL", "Secure Sockets Layer"),
  ("SVG", "Scalable Vector Graphics"),
  ("TCP", "Transmission Control Protocol"),
  ("TLS", "Transport Layer Security"),
  ("TTFB", "Time to First Byte"),
  ("TTI", "Time To Interactive"),
  ("UI", "User Interface"),
  ("UX", "User Experience"),
  ("VR", "Virtual Reality"),
  ("W3C", "World Wide Web Consortium"),
  ("WAI", "Web Accessibility Initiative"),
  ("Wasm", "WebAssembly"),
  ("WCAG", "Web Content Accessibility Guidelines"),
  ("WCAG", "Web Content Accessibility Guidelines"),
  ("WebRTC", "Web Real-Time Communication"),
  ("XHTML", "Extensible HyperText Markup Language"),
  ("XML", "eXtensible Markup Language"),
  ("XSS", "Cross Site Scripting"),
  ("ZAP", "Zed Attack Proxy"),
)

// const abbrs = `
// `

// const getKey = str => str.replace("(\"", "").split('"')[0]
// const sortFn = (a, b) => getKey(a).localeCompare(getKey(b))
// const sortAbbrs = str => {
//   const lines = abbrs.split('\n').filter(Boolean)
//   return lines.sort(sortFn).join("\n")
// }

// console.log(sortAbbrs(abbrs))