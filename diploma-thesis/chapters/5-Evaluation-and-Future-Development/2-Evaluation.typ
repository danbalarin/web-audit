#import "../../template/lib.typ": abbr 

== Evaluation <evaluation>

The audits were conducted in succession, starting with the non-upgraded (further referenced as _old_), then the upgraded (_new_) and lastly (_upgraded_), the upgraded with optimisation plugins.
On the following images they will be displayed in that order from left to right.

#figure(image("images/overview.png"), caption: [Overview]) <overview-screen>

Some changes between different instances can be seen in @overview-screen.
Between old and new, there is not much of a change, except for the performance.
Even a 4% performance change can just be caused by CPU throttling or other effect out of our control, as it's the only category that is not fully deterministic.
No other changes are visible, even though the default theme was upgraded as well.

#figure(image("images/performance.png"), caption: [Performance result]) <performance-screen>

In the @performance-screen we can see the detail of the performance results.
Interestingly, although the final score is better for new and upgraded, nearly all of the metrics are worse.
Several factors cause that; firstly, there is a big improvement in #abbr.a("CLS") metric, which contributes 30% to the final score.
Other marquee changes are in metrics #abbr.a("TTFB"), total requests and transfer size, but these metrics are not included in the final score, as they are only indications of a potential problem and do not pose a problem for the user on their own.
The rest of the changes in metrics are so minimal that it's not noticeable in the final score.

The score is calculated in the same way that Lighthouse calculates it.
Each metric has their own weight, median and 90th percentile provided by the HTTP Archive.
For each metric the score is calculated using the log-normal distribution.
The parameters $mu$ and $sigma$ are calculated as shown in @performance-scoring for $m$ being the median and $p_90$ the 90th percentile.

#figure([
  $$$
  mu=log(m)\
  sigma=abs(log(p_90)-mu)/1.28155
  $$$
], caption: [Performance scoring parameters]) <performance-scoring>

When scores for the metrics is calculated, they are then added together with according weight and final score is calculated. The weights, medians and 90th percentiles are omitted from the thesis, as they are to be changed according to the HTTP Archive statistics in the future.

#figure(image("images/accessibility.png"), caption: [Accessibility result]) <accessibility-screen>

In the @accessibility-screen we can see that there was no change at all between old and new, but there is a big change in upgraded.
This is most likely caused by the Ally - Web Accessibility & Usability plugin, and even with the default settings, it was able to score 100% on WCAG~2.1~AA.
There has been a slight decrease in WCAG~2.0~A and Best practices categories.

#figure(image("images/security.png"), caption: [Security result]) <security-screen>

Although no apparent change was visible in the @overview-screen in the Security category, there is a slight change in the result that can be seen in the @security-screen.
Firstly, SSL Certificate was not tested, as all of the applications were running locally.
For the same reason, the Strict Transport Security header cannot be set and has to fail.
In the upgraded instance, we can see 3 additional technologies that were detected, which are either the plugins or their dependencies.
But more notably, we can see that the version detection failed for WordPress. 
This is a good security feature, as it makes it harder for the attacker to abuse exploits known to certain versions of WordPress.

#figure(image("images/seo.png"), caption: [SEO result]) <seo-screen>

In the @seo-screen we can see that there has been big change in the upgraded, most likely caused by the Yoast SEO plugin.
It automatically fills in the required metadata about the page, but as it cannot generate the preview image, the social media previews are the same.
But even these default values that are relevant to the page can cause a higher ranking in search engine scores.

#figure(image("images/usability.png"), caption: [Usability and User Experience result]) <usability-screen>

Lastly, in the @usability-screen we can observe the only automatically measured metric, the detection of a not found page, failed for the upgraded instance.
After manual control, the website shows the not found page correctly, but the automatic evaluation currently checks only for response status and whether the text contains text 404.
This is a naive implementation of such check that supports websites in different languages without the need for a translation tool.
The user could be informed about this limitation and recommended to do a manual control.
