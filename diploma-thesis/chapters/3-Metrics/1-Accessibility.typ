#import "../../template/lib.typ": abbr

== Accessibility

In @accessibility we have established what tools and methodologies can be used to audit accessibility on a website without access to the source code.
In the case of accessibility, the black-box approach is even better than with access to the source code because our goal is to simulate how other users with disabilities would see it.

=== Versions

WCAG has undergone several iterations to address the evolving nature of web technologies and the diverse needs of users with disabilities. 
The initial version, WCAG 1.0 @w3c_web_1999, was setting the groundwork for web accessibility by providing guidelines primarily focused on HTML-based content. 
However, as web technologies advanced, there was a need for more adaptable guidelines. 
This led to the release of WCAG 2.0 @w3c_web_2008, which offered a technology-agnostic approach based on four core principles: Perceivable, Operable, Understandable, and Robust (collectively known as the POUR principles). WCAG 2.0 aimed to be flexible enough to apply to various technologies beyond HTML.

The #abbr.l("W3C") released WCAG 2.1 @w3c_web_2018, recognising the need to address emerging web practices and technologies. 
This version built upon WCAG 2.0 by adding success criteria focusing on mobile accessibility, low vision, and cognitive and learning disabilities. 
It sought to bridge gaps that had become apparent with the increasing use of mobile devices and the recognition of a broader spectrum of accessibility challenges. 
The most recent iteration, WCAG 2.2, was released as a W3C Recommendation in October 2023 @w3c_web_2023. 
WCAG 2.2 introduces additional success criteria to enhance accessibility for users with cognitive or learning disabilities, users of mobile devices, and users with low vision, further refining and expanding the guidelines to keep pace with technological advancements.

=== Levels

Within each version of WCAG, the success criteria are organised into three conformance levels: Level A, Level AA, and Level AAA. 
Level A represents the minimum level of conformance, addressing the most critical accessibility barriers that can prevent access to content. 
Level AA includes all Level A criteria plus additional criteria that address a broader range of accessibility issues, and it is often the target level for legal and organisational policies. 
Level AAA encompasses all Level A and Level AA criteria, along with the most stringent accessibility requirements, aiming for the highest level of accessibility but recognising that it may not be possible to meet all Level AAA criteria for all types of content. @w3c_understanding_2024

=== Legislation

There are several standards specified by #link(<WCAG>, "Web Content Accessibility Guidelines (WCAG)"), each having three levels of compliance: A, AA and AAA. 
In different jurisdictions, there are different requirements, but for brevity, we will focus on Czech and US legislation.

In Czechia, the requirement for accessibility levels is set by the Act n. 99/2019 Coll., on the Accessibility of Websites and Mobile Applications @noauthor_zakon_2019, which is a transposition of the European Union Directive (EU) 2016/2102 @noauthor_directive_2016 into the Czech legislation. 
It states that institutions in the public sector, including state administration authorities, local self-government units, organisations established by the public authorities (like schools, hospitals or libraries) or other entities fulfilling public functions or services are required to ensure their websites and mobile applications are accessible. 
The required level is harmonised with the European standard EN 301 549 #cite(<noauthor_en_2018>, form: "prose"), which incorporates WCAG 2.1 Level AA. 

In the United States, legal requirements for website accessibility are established through several laws and regulations to prevent discrimination against individuals with disabilities. 
The primary legislation includes the #abbr.l("ADA") and _Section 508 of the Rehabilitation Act_. 
The ADA specifies that state and local government entities, as well as businesses open to the public—such as restaurants, hotels, theatres, retail stores, and others—must ensure that their communications with individuals with disabilities are as effective as communications with others. 
The #abbr.l("DOJ") has indicated that websites of public accommodations should be accessible, and courts have often referenced the #abbr.l("WCAG") in their rulings.
In April 2024, the ADA set compliance dates for local government entities, after which they are required to comply with WCAG 2.1 Level AA. @noauthor_accessibility_2025

The recommended standard is compliance with WCAG 2.0 or 2.1 Level AA.  
Section 508 of the Rehabilitation Act affects federal government agencies, healthcare providers, educational institutions, and other organisations receiving federal funds, requiring compliance with WCAG 2.0 Level A and Level AA. @noauthor_section_1973
