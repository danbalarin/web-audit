#import "macros.typ": heading-like

#let abstract-keywords(
  abstract-cs: none,
  keywords-cs: none,
  abstract-en: none,
  keywords-en: none,
  separated-abstracts: false,
) = {
  if abstract-cs != none [
      #heading-like([Abstrakt], level: 2)
      #abstract-cs
  ]

  if keywords-cs != none [
      #heading-like([Klíčová slova], level: 2)
      #keywords-cs
  ]

  if separated-abstracts == true and abstract-en != none and abstract-cs != none [
    #pagebreak()
  ]
  
  if abstract-en != none [
      #heading-like([Abstract], level: 2)
      #abstract-en
  ]

  if keywords-en != none [
      #heading-like([Keywords], level: 2)
      #keywords-cs
  ]

  pagebreak()
}