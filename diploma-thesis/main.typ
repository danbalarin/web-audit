#import "template/lib.typ": template, revisit, init-code

#import "declaration.typ": declaration
#import "acknowledgements.typ": acknowledgements
#import "abstract.typ": abstract-cs, abstract-en
#import "keywords.typ": keywords-cs, keywords-en

#import "appendices.typ": appendices

#show: template.with(
  title: "Website Quality Assurance through Combined Automated and Manual Auditing",
  author: "Bc. Dan Balarin",
  supervisor: "Ing. Jiří Kosek",
  declaration: declaration,
  acknowledgements: acknowledgements,
  abstract-en: abstract-en,
  keywords-en: keywords-en,
  abstract-cs: abstract-cs,
  keywords-cs: keywords-cs,
  bibliography-file: "/bibliography.bib",
  study-program: "Knowledge and Web Technologies",
  appendices: appendices,
  separated-abstracts: true
)


#init-code()

#include "abbrevations.typ"

#include "chapters/0-Introduction/main.typ"

#pagebreak(weak: true)

#include "chapters/1-Main-Bodies/main.typ"

#pagebreak(weak: true)

#include "chapters/2-Existing-Solutions/main.typ"

#pagebreak(weak: true)

#include "chapters/3-Metrics/main.typ"

#pagebreak(weak: true)

#include "chapters/4-Implementation/main.typ"

#pagebreak(weak: true)

#include "chapters/5-Evaluation-and-Future-Development/main.typ"

#pagebreak(weak: true)

#include "chapters/6-Conclusion/main.typ"
