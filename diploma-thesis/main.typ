#import "template/lib.typ": template, revisit


#show: template.with(
  title: "Web Audit tool",
  author: "Bc. Dan Balarin",
  acknowledgements: [Thanks],
  abstract-en: [Abstract],
  keywords-en: [keywords],
  abstract-cs: [Abstrakt],
  keywords-cs: [keywords],
  separated-abstracts: true,
)

#cite(<world_health_organization_disability_2023>)

#include "chapters/introduction.typ"

#include "chapters/existing-solutions.typ"

#include "chapters/metrics/_index.typ"
