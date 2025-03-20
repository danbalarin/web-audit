#let title-page(
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
) = {
  set align(center)

  set block(spacing: .6em)

  set text(font: "Latin Modern Sans")
  
  text(20pt, university)
  v(4pt)
  text(20pt, faculty) 
  
  block(above: 1fr, below: 2fr, width: 100%, [
    #image("images/FIS_2_logo_2_rgb_EN.svg", width: 50%)
  ])
  
  text(24pt, weight: "extrabold", title, font: "Latin Modern Sans")
  
  v(8mm)
  
  text(24pt, "MASTER THESIS", font: "Latin Modern Sans")
  
  v(8mm)
  
  grid(
    columns: (auto, auto),
    column-gutter: 10pt,
    row-gutter: 4mm,
    align(right, "Study program:"),
    align(left, study-program),
    if specialization.len() > 0 [#align(right, "Specialization:")],
    if specialization.len() > 0 [#align(left, specialization)],
  )
  
  v(8fr)
  
  grid(
    columns: (auto, auto),
    column-gutter: 10pt,
    row-gutter: 4mm,
    align(right, "Author:"),
    align(left, author),
    align(right, "Supervisor:"),
    align(left, supervisor),
    if consultant.len() > 0 [#align(right, "Consultant:")],
    if consultant.len() > 0 [#align(left, consultant)],
  )
  
  v(8mm)
  
  text([#city, #date])
  
  pagebreak()
}