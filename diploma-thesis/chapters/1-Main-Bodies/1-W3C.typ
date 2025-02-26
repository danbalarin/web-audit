#import "../../template/lib.typ": abbr

== World Wide Web Consortium <W3C>

The #abbr.a("W3C") is the principal international organisation that develops and maintains open standards for the World Wide Web.
According to #cite(<w3c_our_2024>, form: "prose"), "W3C brings together global stakeholders to develop open standards which enable a world wide web that connects and empowers humanity".
They achieve this through three pillars: Web for All (Accessibility and Internationalisation), Web of Trust (Security and Privacy) and Web on Everything (Interoperability and Device independence).

The W3C has developed numerous standards that form the core technologies of the Web.
Some of the most significant include #abbr.a("HTML"), #abbr.a("CSS"), #abbr.a("XML"), #abbr.a("SVG"), #abbr.a("WAI-ARIA"), and #abbr.a("WebRTC").

In context of this thesis the most important one is WAI-ARIA, or Accessible Rich Internet Applications.
It is a set of attributes that define ways to make web content and web applications more accessible to people with disabilities. 
By enhancing the semantics of web content, ARIA improves usability for assistive technologies, such as screen readers, thereby improving the user experience for individuals with impairments. @nurthen_wai-aria_2006

=== Web Accessibility Initiative <WAI>

A significant aspect of the W3C's work is the #abbr.a("WAI"), which develops strategies, guidelines, and resources to make the Web accessible to people with disabilities. 
According to a study by the World Health Organisation #cite(<world_health_organization_disability_2023>, form: "prose"), approximately 1 billion people worldwide suffer from some kind of disability.
That's approximately 16% of the population, and WAI tries to help such people by contributing to all layers of web development, including content, browsers, and assistive technologies.

<WCAG>
At the heart of WAI's efforts are the #abbr.a("WCAG"), providing comprehensive recommendations for making web content more accessible. 
These guidelines assist developers in creating websites that are perceivable, operable, understandable, and robust.

Perceivability requires that information be presented in ways users can perceive, such as providing text alternatives for non-text content and allowing content to be adaptable and presented in different ways.
Operability mandates that user interface components and navigation must be usable, which involves making all functionality available from a keyboard and providing users enough time to read and use content.
Understandability focuses on ensuring that information and the operation of the user interface are clear, including making text readable and predictable navigation patterns and robustness necessitates that content be robust enough to be interpreted reliably by assistive technologies and future user agents. 

Features such as captioned videos, clear navigation structures, and readable text benefit everyone, not just those with disabilities.
Additionally, search engines favour websites that are accessible and provide quality content, potentially improving search rankings and increasing visibility.
Auditing a website against WCAG criteria involves evaluating content, design, and functionality to identify and remedy accessibility barriers, thereby improving the site's inclusivity and performance.

// === Validation and Testing Tools

// The W3C provides a suite of validation and testing tools instrumental in website auditing. 
// The Markup Validation Service checks the syntax of web documents written in formats like HTML and #abbr.s("XHTML") to ensure they conform to W3C standards, helping developers identify and correct errors in markup that could affect website performance and compatibility.

// The CSS Validation Service @philippe_le_hegaret_w3c_2009 validates CSS style sheets for correctness and compatibility, ensuring that styles render consistently across different browsers and devices.
// WAI offers a range of evaluation tools to help assess the accessibility of websites, including automated checkers and assistive technology simulators that replicate how users with disabilities experience web content. 
// Additionally, the Accessibility Conformance Testing (ACT) Rules (#cite(<fiers_accessibility_2024>, form: "year")) provide a framework for developing and documenting test rules for accessibility checks. 
// Employing these tools allows developers and auditors to identify issues early in the development process, reducing the cost and effort required for remediation and ensuring a higher quality end product.

// === Emerging Technologies and Future Directions

// The W3C continues to explore and standardise emerging web technologies to keep pace with the evolving digital landscape. 
// WebAssembly is one such technology that serves as a binary instruction format for a stack-based virtual machine, allowing developers to run high-performance applications on the Web at near-native speed without the need for plugins. 
// @w3c_webassembly_working_group_webassembly_2017

// The WebXR Device API (#cite(<jones_webxr_2024>, form: "year")) provides support for #abbr.a("VR") and #abbr.a("AR") devices, allowing developers to create immersive experiences that blend the physical and digital worlds within web applications. 
// This opens up new possibilities for education, entertainment, and simulations accessible through standard web technologies. 

// #abbr.a("DIDs") represent a new type of identifier that enables verifiable, decentralised digital identities. 
// DIDs enhance privacy and security on the Web by allowing individuals and organisations to have greater control over their personal data and authentication processes without relying on centralised authorities. 
// By staying at the forefront of such technological advancements, the W3C ensures that the Web remains a vibrant platform for innovation, capable of adapting to new paradigms and user expectations. 
// @sporny_decentralized_2022

// === Impact on Web Development and Quality Assurance
// Adherence to W3C standards significantly influences web development practices and quality assurance processes. 
// By following these standards, developers contribute to a more uniform and predictable web environment, reducing development time and costs associated with cross-browser compatibility issues. 
// Standards encapsulate industry best practices, encouraging the creation of efficient, secure, and maintainable code that adheres to established guidelines.

// Incorporating W3C standards into auditing checklists helps ensure that websites meet established benchmarks for performance, security, and user experience. 
// This systematic approach to quality assurance enhances the reliability and trustworthiness of web applications. 
// Furthermore, with a stable foundation provided by these standards, developers can focus on creating innovative features and services without the need to reinvent underlying technologies, fostering creativity and advancement in web development.
