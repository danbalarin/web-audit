#import "@preview/codly:1.2.0": *

#let init-code() = {  
  let icon(codepoint) = {
    box(
      height: 0.8em,
      baseline: 0.05em,
      image(codepoint)
    )
    h(0.1em)
  }

  codly(
    languages: (
      ts: (
        name: "TypeScript",
        icon: icon("images/brand-typescript.svg"),
        // icon: text(font: "tabler-icons", "\u{f5f1}"),
        color: rgb("#3178C6")
      ),
      html: (
        name: "HTML",
        icon: icon("images/brand-html.svg"),
        color: rgb("#F26529")
      ),
      yaml: (
        name: "YAML",
        icon: icon("images/brand-yaml.svg"),
        color: rgb("#CA181D")
      )
    )
  )
}

