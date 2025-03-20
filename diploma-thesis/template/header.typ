#let last-chapter = state("last-chapter")
#let show-header = state("show-header", false)

#let header = context {
  let current = counter(page).get()
  let matches = query(selector(heading.where(level: 1)))
  let has-heading = matches.any(m =>
    counter(page).at(m.location()) == current
  )
  
  let chapter = matches.find(m => counter(page).at(m.location()) == current)

  if(chapter != none) {
    last-chapter.update(chapter)
  }
  if(not has-heading and show-header.get() and last-chapter.get() != none) {
    [
      #pad(bottom: -8pt)[
        #h(1fr)
        #upper()[
          #last-chapter.get().supplement
          #counter(heading.where(level: 1)).get().at(0).
          #last-chapter.get().body        
        ]
        
      ]
      #line(length: 100%)
    ]
  }
}