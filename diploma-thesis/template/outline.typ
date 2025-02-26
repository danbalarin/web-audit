#let custom-outline() = {

  show outline.entry.where(level: 1): it => {
    show repeat: none
    block(above: .3em)
    text(weight: "semibold")[#it]
  }

  
  outline()
  
  pagebreak()
}
