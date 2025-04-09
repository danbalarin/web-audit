#import "../../template/lib.typ": abbr

== Future Development

The application, in its current state, is useable, although it has some limitations.
There is room for improvement, as mentioned in the previous section, but there are also features that could be added.

With the #abbr.a("AI") on it's rise, there is also a great potential to use the AI in this application.
One example would be the implementation of the not found page detection.
As the application needs to support websites in all languages and custom phrasings, simple translation would not suffice.
For example, the Netflix error page (@netflix) doesn't contain the text _"not found"_ or any of that matter, so simple translation would fail.

#figure(image("images/netflix.png"), caption: [Netflix not found page]) <netflix>

Another great usage of #abbr.a("AI") would be a summary of an audit.
With correct prompts and data processing, the application could be able to provide a document that summarises the current problems and highlights the good parts.
It could also summarise the difference between two or more audits, making it a great tool for development agencies to show their impact and progress over time.
