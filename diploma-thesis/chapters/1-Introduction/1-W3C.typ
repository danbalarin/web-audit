#import "../../template/lib.typ": abbr

=== World Wide Web Consortium <W3C>

The #abbr.a("W3C") is the principal international organisation that develops and maintains open standards for the World Wide Web.
Founded in 1994 by Sir Tim Berners-Lee, the inventor of the Web, the W3C is dedicated to leading the Web to its full potential by establishing protocols and guidelines that ensure its long-term growth and universal accessibility.

The W3C's mission is to create a rich interactive environment on the Web by fostering open standards that promote interoperability, accessibility, internationalisation, and device independence.
Interoperability ensures that web technologies work uniformly across different platforms, devices, and applications, allowing for consistent user experiences regardless of the technology being used. 
Accessibility focuses on making the Web usable for people with diverse abilities, including those with disabilities, thereby broadening the inclusivity and reach of web content and services. 
Internationalisation provides support for different languages and cultural conventions, making the Web truly global and accommodating users worldwide and device independence allows web content and applications to be accessible from any device, including desktops, mobile phones, and assistive technologies, ensuring that users can access the Web regardless of their hardware.

By collaborating with member organisations, full-time staff, and the global web community, the W3C strives to build consensus around web technologies, fostering innovation while maintaining stability and compatibility.

==== Key Standards and Specifications

The W3C has developed numerous standards that form the core technologies of the Web.
Some of the most significant include #abbr.a("HTML"), #abbr.a("CSS"), #abbr.a("XML"), #abbr.a("SVG"), #abbr.a("ARIA"), and #abbr.a("WebRTC").

HTML is the standard markup language for creating web pages and web applications. 
The latest version, HTML5, introduces new elements and #abbr.pls("API") for more dynamic and rich content, enhancing interactivity and multimedia capabilities.
CSS is a style sheet language used for describing the presentation of a document written in HTML or XML. 
It enables the separation of content and design, facilitating maintenance and flexibility by allowing developers to control layout, colours, fonts, and overall visual aesthetics separately from the markup. 
XML is a flexible text format used for structuring and transporting data, underpinning many web services and applications by providing a standard method for accessing and manipulating structured information.

SVG, an XML-based vector image format for two-dimensional graphics, supports interactivity and animation, allowing for scalable, high-quality graphics that can be styled and scripted. 
This contributes to rich graphical user interfaces and responsive designs that enhance user engagement.

ARIA, or Accessible Rich Internet Applications, is a set of attributes that define ways to make web content and web applications more accessible to people with disabilities. 
By enhancing the semantics of web content, ARIA improves usability for assistive technologies, such as screen readers, thereby improving the user experience for individuals with impairments.

WebRTC is a collection of communications protocols and APIs that enable real-time voice, text, and video communication capabilities in web browsers and mobile applications. 
It facilitates direct peer-to-peer communication without the need for plugins or additional software, opening up possibilities for interactive applications like video conferencing, file sharing, and live streaming within the browser environment.

These standards ensure that web technologies are open, free, and accessible to all, fostering innovation and reducing barriers to entry.

==== Web Accessibility Initiative <WAI>

A significant aspect of the W3C's work is the #abbr.a("WAI"), which develops strategies, guidelines, and resources to make the Web accessible to people with disabilities. 
WAI addresses all layers of web development, including content, browsers, and assistive technologies.

<WCAG>
At the heart of WAI's efforts are the #abbr.a("WCAG"), providing comprehensive recommendations for making web content more accessible. 
These guidelines assist developers in creating websites that are perceivable, operable, understandable, and robust.

Perceivability requires that information be presented in ways users can perceive, such as providing text alternatives for non-text content and allowing content to be adaptable and presented in different ways.
Operability mandates that user interface components and navigation must be usable, which involves making all functionality available from a keyboard and providing users enough time to read and use content.
Understandability focuses on ensuring that information and the operation of the user interface are clear, including making text readable and predictable navigation patterns and robustness necessitates that content be robust enough to be interpreted reliably by assistive technologies and future user agents.

The current version, WCAG 2.2, published in October 2023, builds upon previous versions by extending accessibility guidance for navigation, drag and drop features, and adds rules for #abbr.s("CAPTCHA") checks with drag and drop.

Compliance with WCAG is essential during website auditing for several critical reasons.
From a legal standpoint, many countries have enacted laws requiring websites to be accessible to people with disabilities, and non-compliance can result in legal action and penalties.
Beyond legal obligations, ensuring accessibility expands the audience reach, as accessible websites can be used by a wider range of users, including those with temporary disabilities, older users, and individuals in challenging environments.

Moreover, accessibility features often enhance the overall user experience for all users.
Features such as captioned videos, clear navigation structures, and readable text benefit everyone, not just those with disabilities.
Additionally, search engines favour websites that are accessible and provide quality content, potentially improving search rankings and increasing visibility.
Auditing a website against WCAG criteria involves evaluating content, design, and functionality to identify and remedy accessibility barriers, thereby improving the site's inclusivity and performance.

==== Validation and Testing Tools

The W3C provides a suite of validation and testing tools that are instrumental in website auditing. 
The Markup Validation Service checks the syntax of web documents written in formats like HTML and #abbr.s("XHTML") to ensure they conform to W3C standards, helping developers identify and correct errors in markup that could affect website performance and compatibility.

// TODO source
The CSS Validation Service validates CSS style sheets for correctness and compatibility, ensuring that styles render consistently across different browsers and devices. 
// TODO source
WAI offers a range of evaluation tools to help assess the accessibility of websites, including automated checkers and assistive technology simulators that replicate how users with disabilities experience web content. 
// TODO source
Additionally, the Accessibility Conformance Testing (ACT) Rules provide a framework for developing and documenting test rules for accessibility checks. 
Employing these tools allows developers and auditors to identify issues early in the development process, reducing the cost and effort required for remediation and ensuring a higher quality end product.

==== Internationalisation and Multilingual Support

// TODO source
Recognising the global nature of the Web, the W3C places significant emphasis on internationalisation to ensure that web technologies are accessible and usable worldwide. 
The Internationalisation Activity works to make the use and creation of web technologies independent of language, script, or culture.
This involves developing guidelines for the proper support of international features in web technologies, providing educational materials and resources for developers to implement internationalisation best practices, and collaborating with communities around the world to understand regional needs and challenges.

By addressing issues such as character encoding, text directionality, date and time formats, and language identification, the W3C ensures that web content can be accurately presented and interacted with by users across different languages and cultural contexts. 
Internationalisation is critical for making the Web truly global, enabling users to access and contribute to web content in their native languages and scripts.

==== Emerging Technologies and Future Directions
The W3C continues to explore and standardise emerging web technologies to keep pace with the evolving digital landscape. 
WebAssembly is one such technology, serving as a binary instruction format for a stack-based virtual machine, which allows developers to run high-performance applications on the Web at near-native speed without the need for plugins. 
This expands the capabilities of web applications, enabling complex computational tasks and games to run efficiently in the browser.

The WebXR Device API provides support for #abbr.a("VR") and #abbr.a("AR") devices, allowing developers to create immersive experiences that blend the physical and digital worlds within web applications. 
This opens up new possibilities for education, entertainment, and simulations accessible through standard web technologies.

//TODO source https://www.w3.org/TR/did-core/
#abbr.a("DIDs") represent a new type of identifier that enables verifiable, decentralised digital identities. 
DIDs enhance privacy and security on the Web by allowing individuals and organisations to have greater control over their personal data and authentication processes without relying on centralised authorities. 
By staying at the forefront of such technological advancements, the W3C ensures that the Web remains a vibrant platform for innovation, capable of adapting to new paradigms and user expectations.

==== Impact on Web Development and Quality Assurance
Adherence to W3C standards significantly influences web development practices and quality assurance processes. 
By following these standards, developers contribute to a more uniform and predictable web environment, reducing development time and costs associated with cross-browser compatibility issues. 
Standards encapsulate industry best practices, encouraging the creation of efficient, secure, and maintainable code that adheres to established guidelines.

Incorporating W3C standards into auditing checklists helps ensure that websites meet established benchmarks for performance, security, and user experience. 
This systematic approach to quality assurance enhances the reliability and trustworthiness of web applications. 
Furthermore, with a stable foundation provided by these standards, developers can focus on creating innovative features and services without the need to reinvent underlying technologies, fostering creativity and advancement in web development.
