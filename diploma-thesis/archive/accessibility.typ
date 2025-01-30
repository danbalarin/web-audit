#import "/template/macros.typ": revisit

== Accessibility

#revisit[
  Main goal of accessibility is to make it reasonably usable for all the people, no matter theirs disabilities.
  We can divide this by the area of disability, hearing, sight (complete loss, impaired sense of color...), reflexes or users with inability to use both mouse and keyboard (due to limb loss for example).
]

=== Motivation

#revisit[
  Some websites have it mandatory to have some level of accessibility.
  It's most of the time government agencies and companies that are somewhat connected to health like hospitals, labs and others.

  Also there is a good motivation to do it without the mandatory requirement.
  According to [WHO](https://www.who.int/news-room/fact-sheets/detail/disability-and-health#:~:text=Key%20facts,1%20in%206%20of%20us.) 1.3 billion people worldwide experience some kind of significant disability.
  That's a 16% of population, so by investing resources into accessibility that could be 16% of new customers.
]

=== Areas to be considered

#revisit[
- Hearing disabilities
	- No loud sounds
	- Sound shouldn't be mandatory, in case it's vital, there HAVE to be subtitles
	- Sound should be mutable
- Sight disabilities
	- Site can be viewed (unbroken) with bigger font size (this will show where devs used px vs rem/em)
	- High contrast ratio (comes from design)
- Slow reflexes
	- As a rule of thumb, site should never use *time limited offers*
		- It's okay if the time span is long enough, but order of seconds is not acceptable
	- No fast moving elements (`prefers-reduced-motion`)
- Navigation by keyboard only
	- Correct order of tab order
	- Correct behavior of complex elements like popups according to WAI-ARIA specs
- General things to consider
	- Correct order of text elements
		- Bad example would be H1 being in DOM tree on the bottom, but moved via CSS to the top. This would cause problems with readers.
	- Usage of semantic HTML tags
	- No unnecessary nesting
	- Usage of aria props (`aria-visible`, `aria-selected`, `aria-label`, `alt`)
		- Check especially for icons, since they are sometimes used without any text context and readers can't really interpret them
		- Also link that would lead to home page with icon of a house should have label of *go to homepage* or something similar, not something like *icon of house*
]