#import "header.typ": last-chapter

#let heading-blocks = (
  none,
  (it) => {
    block(below: 40pt)[
      #set align(left + horizon)
      #set text(25pt, weight: "black", font: "Latin Modern Sans") 
      #smallcaps([#if(it.numbering != none) {[#counter(heading.where(level: 1)).get().at(0).]} #it.body])
    ]
  },
  (it) => {
    block(above: 34pt, below: 28pt)[
      #set align(left + horizon)
      #set text(14pt, weight: "bold", font: "Latin Modern Sans") 
      #smallcaps(it)
    ]
  },
  (it) => {
    block(above: 34pt, below: 24pt)[
      #set align(left + horizon)
      #set text(12pt, weight: "bold", font: "Latin Modern Sans") 
      #smallcaps(it)
    ]
  },
  (it) => {
    block(above: 16pt, below: 9pt)[
      #set align(left + horizon)
      #set text(12pt, weight: "semibold", font: "Latin Modern Sans") 
      #smallcaps(it)
    ]
  },
)
