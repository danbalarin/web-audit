#import "../../template/lib.typ": abbr

=== Google

Google is a multinational technology company that has significantly influenced the development of the World Wide Web through its search engine, advertising platforms, and a wide array of web-based services and tools. 
Founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University, Google has grown to become one of the most influential entities in shaping how information is accessed, distributed, and utilised on the Internet. 
The company's innovations have profoundly impacted web development practices, user experience, and the overall digital landscape.

// TODO source citation
Google's mission is "to organise the world's information and make it universally accessible and useful". 
This mission drives the company's efforts to develop technologies and services that enhance how people find, share, and interact with information online. 
By focusing on user-centric design and leveraging advanced algorithms, Google aims to deliver relevant and efficient solutions that improve everyday life.

The company's objectives extend beyond search to include advancements in cloud computing, artificial intelligence, machine learning, advertising, and mobile technologies. 
Google invests heavily in research and development to push the boundaries of what is possible, striving to innovate and improve efficiency, accessibility, and user engagement across its product and service offerings.

==== Contributions to Web Standards and Development

Google has played a pivotal role in advancing web standards and technologies, actively participating in organisations like the #link(<W3C>, "World Wide Web Consortium") and the #link(<IETF>, "Internet Engineering Task Force"). 
By collaborating on the development of open standards, Google promotes interoperability, innovation, and a robust web ecosystem.

// TODO source
One of Google's significant contributions is the development of the Chrome web browser, launched in 2008. 
Chrome has been influential in shaping modern web technologies by supporting and promoting new web standards and features. 
It serves as a platform for experimenting with innovative technologies that eventually become part of the broader web environment. 
Chrome's built-in functionality and frequent updates have accelerated the adoption of HTML5, CSS3, and other modern web standards.

Google has also developed the V8 JavaScript engine, which enhances the performance of web applications by compiling JavaScript to native machine code before execution.
This advancement has improved the speed and efficiency of client-side scripting, enabling more complex and interactive web applications. 
V8 is open-source and used not only in Chrome but also in server-side environments like Node.js, broadening its impact on web development.

In the domain of web protocols, Google has been instrumental in the development and promotion of HTTP/2 and HTTP/3, working to improve web performance through reduced latency and enhanced resource utilisation. 
// TODO source quic at google vs ietf
QUIC, a transport layer network protocol initially developed by Google, forms the basis for HTTP/3 and introduces improvements in connection management and security. These efforts have led to faster and more secure web experiences for users worldwide.

Furthermore, Google has contributed to the development of #abbr.pll("PWA"), which are web applications that use modern web capabilities to deliver app-like experiences to users. 
PWAs leverage technologies such as service workers and manifest files to provide offline functionality, push notifications, and the ability to install web apps on devices. 
This approach bridges the gap between web and native applications, offering improved user engagement without the need for app store distribution.

==== Impact on Web Development Tools and Frameworks

To facilitate the development of high-quality web applications, Google has created numerous tools, frameworks, and resources widely adopted by developers. 
One of the most prominent is Angular, a TypeScript-based open-source web application framework. 
Angular simplifies development and testing by providing a comprehensive framework for building dynamic, client-side applications. 
It supports #abbr.a("MVC") and #abbr.a("MVVM") architectures, enhancing productivity and consistency in web application development.

Google's Material Design is another influential contribution, providing a design language that blends principles of good design with innovation in technology and science. 
Material Design offers guidelines and components that help developers create intuitive and aesthetically pleasing user interfaces, ensuring consistency across different devices and platforms. 
By standardising design elements, Material Design enhances usability and user experience.

The company also offers the #abbr.a("GCP"), providing scalable infrastructure and services for web hosting, data storage, machine learning, and more.
GCP enables developers to build, test, and deploy web applications efficiently, leveraging Google's infrastructure and suite of tools.
Services like Google App Engine, Compute Engine, and Kubernetes Engine support various development needs, from serverless architectures to container orchestration.

==== Web Performance and Optimisation Initiatives

Recognising the importance of web performance in user experience, Google has initiated several projects and tools aimed at improving website speed and efficiency. 
// TODO  source
Google PageSpeed Insights is a tool that analyses the content of a web page and provides suggestions to enhance performance. 
It evaluates key performance metrics such as #abbr.a("FCP") and #abbr.a("LCP"), offering actionable recommendations for optimisation.

// TODO  source
Google has introduced the concept of Core Web Vitals, a set of specific factors that Google considers important in a webpage's overall user experience. 
Core Web Vitals focus on aspects like loading performance, interactivity, and visual stability, measured through metrics such as #abbr.a("LCP"), #abbr.a("FID"), and #abbr.a("CLS").
These metrics guide developers in delivering a high-quality user experience on the web and have been integrated into Google's search ranking algorithms, emphasising their significance.

In addition, Google promotes the use of #abbr.a("AMP"), an open-source initiative that aims to improve the performance of web content on mobile devices. 
AMP provides a framework for creating fast-loading mobile pages by restricting certain HTML, CSS, and JavaScript features and leveraging streamlined resources.
This approach enhances user experience on mobile devices, reduces bounce rates, and can improve visibility in search results.

==== Search Engine Optimisation and Guidelines

As the operator of the world's most popular search engine, Google plays a crucial role in shaping #abbr.a("SEO") practices. 
The company provides extensive guidelines for webmasters to help improve their site's visibility and ranking in Google Search results. 
These guidelines emphasise the importance of creating valuable content, ensuring mobile-friendliness, maintaining secure connections via #abbr.s("HTTPS"), and adhering to web standards.

Google's Search Console is a free service that helps website owners monitor, maintain, and troubleshoot their site's presence in Google Search results. 
It provides insights into how Google indexes websites, reports on search traffic data, and identifies issues related to indexing, mobile usability, and security. 
By using Search Console, developers and site owners can optimise their sites for better performance and visibility.

By defining best practices for SEO and providing tools for analysis and improvement, Google influences how websites are developed and maintained. 
The emphasis on user experience, relevance, and technical excellence encourages practices that enhance accessibility and satisfaction for users.

==== Web Accessibility Initiatives

Google is committed to making the web accessible to everyone, including people with disabilities. 
The company supports accessibility standards and provides resources to help developers create accessible web applications. 
// TODO change to lighthouse
Google's Accessibility Developer Tools, such as the Accessibility Audit feature in Chrome DevTools, offer features for inspecting and improving the accessibility of web applications. 
These tools help developers identify issues related to ARIA (Accessible Rich Internet Applications) attributes, colour contrast, keyboard navigation, and screen reader compatibility.

Furthermore, Google contributes to accessibility by implementing features in its products and services that adhere to guidelines such as the #link(<WCAG>, "Web Content Accessibility Guidelines"). 
For instance, Google Docs includes features like screen reader support and voice typing, enhancing accessibility for users with visual or motor impairments. 
By prioritising accessibility in its offerings and providing tools for developers, Google promotes inclusivity and equal access to information.

==== Security and Privacy Measures

Security and privacy are fundamental aspects of Google's approach to web development. 
The company advocates for secure communication protocols, such as HTTPS, and provides tools to facilitate the adoption of #abbr.s("SSL")/#abbr.s("TLS") certificates. 
//TODO source lets encrypt
Through initiatives like Let's Encrypt, a free, automated, and open certificate authority co-founded by the #abbr.a("ISRG") and supported by Google, the company encourages widespread use of encryption on the web.

Google's Safe Browsing service protects users by identifying and warning about dangerous websites and downloads. 
Integrated into web browsers like Chrome, Firefox, and Safari, Safe Browsing helps safeguard users from malware, phishing, and other security threats. 
By maintaining an up-to-date list of unsafe sites and alerting users, Google enhances overall web security.

Additionally, Google provides developers with security tools and frameworks to help identify vulnerabilities in web applications. 
Services like Cloud Security Scanner for applications running on Google Cloud Platform help detect common web application vulnerabilities, including #abbr.a("XSS") and mixed content issues. 
Google's reCAPTCHA service also helps protect websites from spam and abuse by distinguishing between human and automated access.

==== Open Source Contributions

Google is a strong proponent of open-source software, contributing to numerous projects that benefit the web development community. 
// TODO source
Projects like TensorFlow, an open-source machine learning library, enable developers to incorporate advanced AI capabilities into web applications.
TensorFlow supports both research and production environments, facilitating innovation in fields like computer vision, natural language processing, and predictive analytics.

The company also maintains Lighthouse, an open-source, automated tool for improving the performance, quality, and correctness of web applications. 
Lighthouse audits web pages for performance, accessibility, progressive web app features, SEO, and more, providing developers with detailed reports and recommendations. 
By integrating with tools like Chrome DevTools and PageSpeed Insights, Lighthouse helps developers iteratively enhance their web applications.

Google's Flutter is another significant open-source project, a #abbr.s("UI") toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. 
Flutter enables developers to create expressive and flexible user interfaces with native performance, expanding possibilities for cross-platform development.

By open-sourcing many of its projects, Google fosters collaboration and innovation within the global developer community, accelerating the advancement of web technologies and enabling shared progress.

==== Influence on Mobile Web and Android

Google's influence extends significantly into the mobile web space, primarily through the Android operating system. 
Android, an open-source platform developed by Google, powers a substantial proportion of the world's mobile devices. 
This prevalence has implications for web development, as developers must consider Android's capabilities and user base when designing mobile web experiences.

Google encourages the development of mobile-friendly websites and applications, offering tools and guidelines to optimise web content for mobile devices. 
The company's emphasis on mobile-first indexing in search ranking underscores the importance of mobile optimisation in achieving visibility and engagement. 
// TODO source
Google provides resources like the Mobile-Friendly Test to help developers assess and improve the mobile responsiveness of their websites.

Additionally, initiatives like Firebase, Google's mobile and web application development platform, offer developers a suite of tools and infrastructure to build, improve, and grow applications. 
Firebase includes services for real-time databases, authentication, hosting, machine learning, and analytics, simplifying the development process and enhancing application capabilities.


