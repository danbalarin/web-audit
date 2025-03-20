#let custom-outline() = {

  show outline: it => {
    it
  }

  show outline.entry: it => {
    block(above: .2em)
    it
  }

  show outline.entry.where(level: 1): it => {
    show repeat: none
    block(above: .8em)
    text(weight: "semibold")[#it]
  }

  
  outline(title: [#heading("Content")])
  
  pagebreak()
}
