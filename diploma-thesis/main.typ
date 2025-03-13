#import "template/lib.typ": template, revisit, init-code


#show: template.with(
  title: "Website Quality Assurance through Combined Automated and Manual Auditing",
  author: "Bc. Dan Balarin",
  supervisor: "Ing. Jiří Kosek",
  acknowledgements: [Thanks],
  abstract-en: [Abstract],
  keywords-en: [keywords],
  abstract-cs: [Abstrakt],
  keywords-cs: [keywords],
  bibliography-file: "/bibliography.bib",
  study-program: "Knowledge and Web Technologies"
)

#init-code()

#include "abbrevations.typ"

#include "chapters/0-Introduction/main.typ"

#include "chapters/1-Main-Bodies/main.typ"

#include "chapters/2-Existing-Solutions/main.typ"

#include "chapters/3-Metrics/main.typ"

#include "chapters/4-Implementation/main.typ"

