== Analysis


To implement the application in a way that is maintainable and extensible, proper analysis is necessary. 
In this analysis, we define main use cases, wireframes, and extension points.

=== Requirements

Requirements can be split into two categories: functional and non-functional.
Functional requirements are related to the application functions and capabilities.
Non-functional requirements specify aspects unrelated to the functions but still relevant to the application, such as ease of setup.

Primary functional requirements for this application include: 
1. Ability to conduct audits. The application will do as many audits as possible automated and guide the user through the audits that can't be automated.
2. Compare audits. The user can select multiple audits of the same website and compare results.
3. Remove failed or unwanted audits.

A secondary functional requirement is providing quick access to the description of metric descriptions, making it easy to understand the impact of any metric.

The non-functional requirements include:
1. Locally running application so that performance audits are not skewed by proximity to tested websites (e.g., by being hosted by the same provider).
2. Easy to setup and use with intuitive navigation and structure.
3. Extensibility for all categories, as metrics may change and evolve.


=== Wireframes

In this section, we cover only the most important wireframes. 
These wireframes address all primary and secondary functional requirements.
All wireframes share the same layout, with the main navigation on the left side and content in the centre.
This enables the users to quickly change pages without going through many links.

In @wireframe-create we see a page for creating projects.
Projects will group audit runs for a specific website.
Users can specify multiple URLs that will be assigned to this specific website.
The URLs are then tested for connection, and if the URL is reachable, the check passes, and the user can proceed to save the project.


#figure(
  caption: "Wireframe of create project page",
  placement: auto,
  image("images/wireframe-create.png"),
) <wireframe-create>

#figure(
  caption: "Wireframe of audit page",
  placement: auto,
  image("images/wireframe-run.png"),
) <wireframe-run>

#figure(
  caption: "Wireframe of knowledge base",
  placement: auto,
  image("images/wireframe-kb.png"),
) <wireframe-kb>


@wireframe-run shows the project detail page, where users can view all previously conducted audits, compare them, or run another one.
This page also offers options to delete audits or the entire project.

The last wireframe, @wireframe-kb, shows the knowledge base layout.
This page contains descriptions of metrics, along with links to related metrics, sources, and further information. 
It aims to provide enough information for basic users to understand a metric's importance without overwhelming detail.