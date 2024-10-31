#import "headings.typ": heading-blocks

#let heading-like(body, level: 1) = {
  heading-blocks.at(level)(body)
}

#let revisit(body) = {
  box(
    fill: luma(205),
    outset: (y: 6pt, x: 6pt),
    radius: 2pt
  )[
    #text(fill: color.hsl(0deg, 100%, 47%))[#body]
  ]
}


#let custom-lorem = (number) => {
  revisit[#lorem(number)]
}