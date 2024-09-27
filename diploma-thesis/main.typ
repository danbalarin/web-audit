#import "template/lib.typ": template, revisit


#show: template.with(
  title: "Web Audit tool",
  author: "Bc. Dan Balarin",
  acknowledgements: [Thanks],
  abstract-en: [Abstract],
  keywords-en: [keywords],
  abstract-cs: [Abstrakt],
  keywords-cs: [keywords],
  bibliography-file: "/bibliography.bib",
)

#include "chapters/introduction.typ"

#include "chapters/existing-solutions.typ"

#include "chapters/metrics/_index.typ"
