#import "title-page.typ": title-page
#import "abstract-keywords.typ": abstract-keywords
#import "macros.typ": heading-like, revisit, custom-lorem
#import "outline.typ": custom-outline
#import "headings.typ": heading-blocks

#let template(
  title: "Thesis Title",

  date: "January 2025",

  university: "Prague University of Economics and Business",

  faculty: "Faculty of Informatics and Statistics",

  study-program: "Study Program",

  specialization: "",

  author: "John Doe",

  supervisor: "Ing. John Doe",

  consultant: "",

  city: "Prague",

  lang: "en",

  acknowledgements: none,

  abstract-cs: none,

  keywords-cs: none,

  abstract-en: none,

  keywords-en: none,

  separated-abstracts: false,

  bibliography-file: none,

  body,
) = {
  set document(title: title, author: author)

  set text(size: 11pt, lang: lang, font: "DejaVu Sans", region: "GB")

  set page(
    paper: "a4",

    // margin: (right: 25mm, left: 3cm, top: 25mm, bottom: 25mm),
    margin: (right: 20mm, left: 2cm, top: 25mm, bottom: 25mm)
  )

  set heading(numbering: "1.1.1")

  show heading.where(level: 1): it => {
    heading-blocks.at(1)(it)
  }

  show heading.where(level: 2): it => {
    heading-blocks.at(2)(it)
  }

  show heading.where(level: 3): it => {
    heading-blocks.at(3)(it)
  }

  title-page(
    title: title,
    date: date,
    university: university,
    faculty: faculty,
    study-program: study-program,
    specialization: specialization,
    author: author,
    supervisor: supervisor,
    consultant: consultant,
    city: city,
  )

  set page(
    margin: (right: 25mm, left: 3cm, top: 25mm, bottom: 25mm),
    footer: context [
      #line(length: 100%)
      #h(1fr)
      #counter(page).display(
        "1",
      )
    ])
  
  set align(left)

  if acknowledgements != none [
    #align(bottom, [
      #heading-like([Acknowledgements], level:2)
      #acknowledgements
      #pagebreak()
    ])    
  ]

  abstract-keywords(
    abstract-cs: abstract-cs,
    keywords-cs: keywords-cs,
    abstract-en: abstract-en,
    keywords-en: keywords-en,
    separated-abstracts: separated-abstracts,
  )  

  custom-outline()
  
  
  set par(leading: 1.2em)
  set block(spacing: 1.2em)

  body

  if bibliography != none [
    #bibliography(bibliography-file, style: "american-psychological-association")
  ]
}