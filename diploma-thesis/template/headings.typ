#let heading-blocks = (
  none,
  (it) => {
    pagebreak(weak: true)
    block(below: 40pt)[
      #set align(left + horizon)
      #set text(20pt, weight: "black") 
      #smallcaps(it)
    ]
  },
  (it) => {
    block(above: 24pt, below: 16pt)[
      #set align(left + horizon)
      #set text(14pt, weight: "bold") 
      #smallcaps(it)
    ]
  },
  (it) => {
    block(above: 20pt, below: 9pt)[
      #set align(left + horizon)
      #set text(12pt, weight: "bold") 
      #smallcaps(it)
    ]
  },
)
