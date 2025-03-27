#import "template/lib.typ": template, revisit, init-code


#show: template.with(
  title: "Website Quality Assurance through Combined Automated and Manual Auditing",
  author: "Bc. Dan Balarin",
  supervisor: "Ing. Jiří Kosek",
  declaration: [Declaration],
  acknowledgements: [Thanks],
  abstract-en: [Abstract],
  keywords-en: [keywords],
  abstract-cs: [Abstrakt],
  keywords-cs: [keywords],
  bibliography-file: "/bibliography.bib",
  study-program: "Knowledge and Web Technologies",
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
