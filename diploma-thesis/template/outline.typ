#import "@preview/outrageous:0.2.0"
#import "macros.typ": heading-like

#let custom-outline() = {
  show outline.entry: outrageous.show-entry.with(
    ..outrageous.presets.outrageous-toc,
    vspace: (none, none),
    body-transform: (lvl, body, state-key: "outline-figure-numbering-max-width") => {
      let number
      let text
      if(body.has("children")) {
        (number, _, text) = body.children
      } else {
        // number = "  "
        text = body.text
      }
      if(lvl == 1 and number != [1]) {
        v(0.1em)
      }
      
      outrageous.align-helper(
        state-key,
        [#number],
        (max-width, this-width) => box[#v(.4em)#h(calc.max(this-width - 6pt, 0pt))#number #text],
        )
    },
  )
  
  outline(indent: 0em)
  
  pagebreak()
}
