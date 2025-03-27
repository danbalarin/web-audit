#import "../../template/lib.typ": abbr

== Search Engine Optimisation

Modern Search Engines like Google, Bing or Duck Duck Go  have their proprietary crawlers that go through websites, indexing and ranking them.
The results are then matched on multiple criteria, including matching text, rank previously assigned by the crawler, user history and profiling and many others.
This means that the concrete formula to increase SEO rank and the chance of appearing higher up in the results is not known, but there are known metrics to influence the rank.

Accessibility, performance, and security are previously mentioned categories that influence the SEO rank.
There are additional criteria that have not been covered by previous chapters, including the presence of meta tags or number of backlinks and their quality.

=== Meta Tags

Meta tags are tags that do not directly impact the content of the websites, but they add additional information to screen readers, search engine crawlers and social media that link to the website.

Standard meta tags include information about the description, keywords or the author.
Those are used in the search engine results and augmented social media links.
#cite(<the_open_web_foundation_open_2010>, form: "prose") introduced a custom protocol to provide more information via meta tags called Open Graph.
This adds information about the type of the content, image and audio preview, locale and others.
X, formerly known as Twitter, introduced a custom set of meta tags just like The Open Web Foundation, only tailored specifically for X.
Those are called Twitter card tags and for backwards compatibility were not renamed after Twitter's rebranding to X.


#figure(
  grid(columns: (1fr, 1fr), gutter: 0.5em, align: horizon, image("assets/facebook-vse.png"), image("assets/facebook-mdn.png")), caption: [Comparison of links on Facebook]
)<comparison-facebook>

#figure(
  grid(columns: (1fr, 1fr), gutter: 0.5em, align: horizon, image("assets/twitter-vse.png"), image("assets/twitter-mdn.png")), caption: [Comparison of links on X]
)<comparison-twitter>


Some information like title, description, or image URL Open Graph fallbacks to Twitter card tags and vice versa, but some are incompatible, so it's recommended to fully fill out both. Examples of differently filled meta tags can be seen on @comparison-facebook and @comparison-twitter.

As seen in the examples, the most important attributes are title, description and image.
Twitter cards use open graph description and image values as a fallback if the appropriate tag is not provided.
Similarly, the open graph uses a fallback from the HTML title and meta tags.
The fallbacks however fall short in case of other types of content than websites.

Twitter cards specify summary card, which is the one on the @comparison-twitter in default and emphasised image variants.
Besides that, it specifies variants for applications and videos, where fallbacks, although similar properties are defined in open graph, won't be used.


#figure(
  kind: "code",
  supplement: "Code",
  caption: [Meta tags on https://www.goodreads.com/book/show/12405622-programming-social-applications],
  ```html
<title>Programming Social Applications: Building Viral Expe…</title>
<meta name="description" content="Read reviews from the world’s …"/>
<meta property="og:type" content="books.book"/>
<meta property="og:site_name" content="Goodreads"/>
<meta property="og:title" content="Programming Social Applicatio…"/>
<meta property="og:image" content="https://images-na.ssl-images-…"/>
<meta property="og:url" content="https://www.goodreads.com/book/…"/>
<meta property="og:description" content="Social networking has m…"/>
<meta name="twitter:card" content="summary"/>
<meta name="twitter:title" content="Programming Social Applicati…"/>
<meta name="twitter:image" content="https://images-na.ssl-images…"/>
<meta name="twitter:description" content="Social networking has …"/>
```
)<goodreads-example>

The open graph, as it's not bound to specific application and it's needs, but rather standard, specifies types like music, video, book, with properties like author, actors, release date and many others. 
@the_open_web_foundation_open_2010

This allows other applications than social media to leverage this information.
For example, academic tools like Zetoro or Mendeley use this information when creating citations.
As can be seen in @goodreads-example, websites like Goodreads implement those meta tags, making it an easy source of citations.

=== Backlinks

Backlinks, also known as inbound links, are hyperlinks from external websites that point to the website under evaluation. The original algorithm employed by Google, known as PageRank, was fundamentally based on backlink counts.
The PageRank algorithm calculates the PageRank of a webpage as the sum of the PageRanks of all pages linking to it, each divided by the total number of outbound links on those pages.

// #figure(
//   $
// "PR"(P_i)=sum_(P_j in M(P_i)) "PR"(P_j)/L(P_j))
// $, caption: [The PageRank algorithm, #cite(<page_method_2006>, form: "prose")],
// )<PageRank>

// The mathematical representation of the PageRank algorithm calculates the PageRank of a webpage as the sum of the PageRanks of all pages linking to it, each divided by the total number of outbound links on those pages.

Unfortunately, there is no cost-free method available to obtain either the PageRank or the number of backlinks for a given website. While implementing such a system is not inherently complex, maintaining it presents significant challenges due to the necessity of web crawlers. These crawlers are computationally and network-intensive and must operate periodically to ensure the data remains current. Due to this limitation, this metric will not be implemented in this thesis but may be incorporated in future work.
