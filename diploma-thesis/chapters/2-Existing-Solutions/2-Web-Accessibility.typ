#import "../../template/lib.typ": abbr

== Web Accessibility <accessibility>

Web accessibility is essential to website quality assurance, ensuring that web content is accessible to all users, including those with disabilities. 
Numerous existing solutions have been developed to facilitate the creation and auditing of accessible websites, addressing various aspects of accessibility compliance and user experience. 
These solutions encompass guidelines, automated tools, platforms, and practices that help organisations meet accessibility standards and legal requirements.

At the forefront of these solutions are the #link(<WCAG>, "Web Content Accessibility Guidelines (WCAG)") established by the #link(<W3C>, "World Wide Web Consortium (W3C)"). 
WCAG provides a comprehensive set of recommendations for making web content more accessible, organised under principles that ensure content is perceivable, operable, understandable, and robust. 
The guidelines are stratified into three levels of conformance—A, AA, and AAA—offering a flexible framework for organisations to gauge and improve their accessibility efforts. 
WCAG has become the de facto standard globally, serving as the basis for many national laws and regulations about web accessibility.

Various automated accessibility testing tools have been developed to evaluate compliance with these guidelines. 
Tools such as WAVE (Web Accessibility Evaluation Tool) by WebAIM, Axe by Deque Systems, and Google Lighthouse provide automated assessments of web pages, identifying common accessibility issues. 
These tools analyse page elements for compliance issues like missing alternative text for images, inadequate colour contrast, incorrect use of headings, and improper #abbr.s("ARIA") attributes. 
By highlighting specific elements that violate accessibility principles, these tools enable developers and auditors to identify and address problems quickly. @firth_practical_2024

Browser extensions have become increasingly popular for on-the-fly accessibility testing. 
Extensions like Axe, WAVE, and Accessibility Insights integrate directly into web browsers, allowing users to audit pages as they navigate. 
These tools often provide visual overlays and detailed reports, simplifying the process of identifying accessibility barriers within the live environment. 
They support developers in incorporating accessibility checks into their regular development workflow, promoting a proactive approach to accessibility. @firth_practical_2024

#abbr.l("CMS") and web development frameworks have also integrated accessibility features to support the creation of accessible content from the outset. 
Platforms like WordPress offer plugins such as WP Accessibility and Accessibility Checker, which automatically scan content for accessibility issues and provide recommendations for improvements. 
These plugins help content creators adhere to best practices without requiring deep technical knowledge of accessibility standards. 
Similarly, development frameworks like Material UI prioritise accessible components by default, including proper semantic markup and keyboard navigability, reducing developers' burden to implement these features manually.

Moreover, software development tools and environments have incorporated accessibility linting and validation features. 
#abbr.pll("IDE"), like Visual Studio Code, offers extensions that analyse code for accessibility issues during development. 
These tools provide real-time feedback on code compliance with accessibility standards, allowing developers to rectify issues before the code reaches production. 
Such integrations foster an environment where accessibility is a continuous consideration rather than an afterthought.

Assistive technologies themselves are integral to the landscape of existing solutions. 
Screen readers like #abbr.s("JAWS"), #abbr.s("NVDA"), and VoiceOver enable users with visual impairments to interact with web content through auditory feedback or braille displays. 
For auditors and developers, using these assistive technologies during testing is crucial for understanding how users with disabilities experience their websites. 
Testing with screen readers can reveal issues not detectable by automated tools, such as reading order inconsistencies, unclear link text, and mislabelled form controls.



