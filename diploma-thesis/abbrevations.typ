#import "template/lib.typ": abbr

#abbr.add-many(
  ("AJAX", "Asynchronous JavaScript and XML"),
    ("AMP", "Accelerated Mobile Pages"),
    ("API", "Application Programming Interface"),
    ("AR", "Augmented Reality"),
    ("ARIA", "Accessible Rich Internet Applications"),
    ("BCP", "Best Current Practice"),
    ("CAPTCHA", "Completely Automated Public Turing test to tell Computers and Humans Apart"),
    ("CLI", "Command Line Interface"),
    ("CLS", "Cumulative Layout Shift"),
    ("CSRF", "Cross-Site Request Forgery"),
    ("CSS", "Cascading Style Sheets"),
    ("DIDs", "Decentralised Identifiers"),
    ("DNS", "Domain Name System"),
    ("GCP", "Google Cloud Platform"),
    ("HTML", "HyperText Markup Language"),
    ("HTTP", "Hypertext Transfer Protocol"),
    ("ICANN", "Internet Corporation for Assigned Names and Numbers"),
    ("IEC", "International Electrotechnical Commission"),
    ("IEEE", "Institute of Electrical and Electronics Engineers"),
    ("IETF", "Internet Engineering Task Force"),
    ("IMAP", "Internet Message Access Protocol"),
    ("IP", "Internet Protocol"),
    ("IPsec", "Internet Protocol Security"),
    ("ISO", "International Organization for Standardization"),
    ("ISRG", "Internet Security Research Group"),
    ("ITU", "International Telecommunication Union"),
    ("LCP", "Largest Contentful Paint"),
    ("MDN", "Mozilla's Developer Network"),
    ("MVC", "Model–View–Controller"),
    ("MVVM", "Model–View–ViewModel"),
    ("POP", "Post Office Protocol"),
    ("PWA", "Progressive Web App"),
    ("RFC", "Request for Comments"),
    ("SEO", "Search Engine Optimisation"),
    ("SMTP", "Simple Mail Transfer Protocol"),
    ("SVG", "Scalable Vector Graphics"),
    ("TCP", "Transmission Control Protocol"),
    ("TLS", "Transport Layer Security"),
    ("TTI", "Time To Interactive"),
    ("VR", "Virtual Reality"),
    ("W3C", "World Wide Web Consortium"),
    ("WAI", "Web Accessibility Initiative"),
    ("Wasm", "WebAssembly"),
    ("WCAG", "Web Content Accessibility Guidelines"),
    ("WCAG", "Web Content Accessibility Guidelines"),
    ("WebRTC", "Web Real-Time Communication"),
    ("XML", "eXtensible Markup Language"),
    ("XSS", "Cross Site Scripting"),
    ("SDG", "Sustainable Development Goals"),
    ("NGO", "Non-Governmental Organisation"),
    ("DDoS", "Distributed Denial of Service"),
    ("UI", "User Interface"),
    ("XHTML", "Extensible HyperText Markup Language"),
    ("FCP", "First Contentful Paint"),
    ("FID", "First Input Delay"),
    ("OWASP", "Open Web Application Security Project"),
    ("ZAP", "Zed Attack Proxy"),
    ("HTTPS", "Hypertext Transfer Protocol Secure"),
    ("SSL", "Secure Sockets Layer"),
    ("CMS", "Content Management Systems"),
    ("IDE", "Integrated Development Environment")
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