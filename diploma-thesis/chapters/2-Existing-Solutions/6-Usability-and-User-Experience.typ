#import "../../template/lib.typ": abbr

== Usability and User Experience <ui-ux>

Usability and #abbr.a("UX") are critical components of web quality assurance, profoundly impacting how users interact with a website and perceive its value. 
// TODO source
A website that is easy to navigate, intuitive, and responsive enhances user satisfaction, encourages repeat visits, and drives conversions. 
Conversely, poor usability can lead to frustration, increased bounce rates, and negative brand perception. 
Therefore, auditing usability and UX is essential to identify areas for improvement and ensure that a website meets the needs and expectations of its users. 
Numerous existing solutions facilitate such audits without requiring access to source code, allowing evaluators to assess and enhance the user interface, navigation, content presentation, and overall interaction design from an external perspective.

One fundamental approach to auditing usability and UX is through heuristic evaluation, a method where experts review the website against established usability principles. 
// TODO source
These principles, such as Nielsen's Ten Usability Heuristics or the ISO 9241 standards, provide a framework for systematically identifying usability issues. 
Tools like the Heuristics Evaluator assist auditors in applying these principles by guiding them through key aspects such as consistency, error prevention, and user control. 
By analysing how the website aligns with these heuristics, auditors can uncover problems like confusing navigation structures, inconsistent design elements, or inadequate feedback mechanisms. 
This method does not require source code access, as it focuses on the user interface and interaction patterns observable during typical use.

Unfortunately, although there is a plenty of areas to consider and many tools that help with improving of the websites, like session recordings, heat maps, first click analysis, AB testing etc. none are automatable through some API.
There are some services that provide testers that will check the website, but it's still manual work.
