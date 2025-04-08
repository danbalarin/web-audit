#import "@preview/abbr:0.2.3"

#let make-abbrevations() = context {
  let custom-style(short) = {
  	short
  }
  abbr.config(style: it => text(it), space-char: sym.space.nobreak.narrow)

  // abbr.style(custom-style)
}

#let a = abbr.a
#let s = abbr.s
#let l = abbr.l
#let pll = abbr.pll
#let pla = abbr.pla
#let pls = abbr.pls
// #let pls(short) = context {
//   let styleit = state("abbr-style", abbr.style-default).get()
//   [#abbr.s(short)#styleit[s]]
// }
#let add = abbr.add
#let add-many = abbr.make

