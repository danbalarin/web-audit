#import "../../template/lib.typ": abbr

== Usability and User Experience <ui-ux>

Usability and #abbr.a("UX") are critical components of web quality assurance, profoundly impacting how users interact with a website and perceive its value. 
// TODO source
A website that is easy to navigate, intuitive, and responsive enhances user satisfaction, encourages repeat visits, and drives conversions. 
Conversely, poor usability can lead to frustration, increased bounce rates, and negative brand perception. 
Therefore, auditing usability and UX is essential to identify areas for improvement and ensure that a website meets the needs and expectations of its users. 
Numerous existing solutions facilitate such audits without requiring access to source code, allowing evaluators to assess and enhance the user interface, navigation, content presentation, and overall interaction design from an external perspective.

One fundamental approach to auditing usability and UX is through heuristic evaluation, a method where experts review the website against established usability principles. 
These principles, such as 10 Usability Heuristics for User Interface Design #cite(<nielsen_10_2024>, form: "normal") or the ISO 9241 #cite(<noauthor_iso_2019>, form: "prose") standards, provide a framework for systematically identifying usability issues. 
Tools like the Heuristics Evaluator assist auditors in applying these principles by guiding them through key aspects such as consistency, error prevention, and user control. 
By analysing how the website aligns with these heuristics, auditors can uncover problems like confusing navigation structures, inconsistent design elements, or inadequate feedback mechanisms. 
This method does not require source code access, as it focuses on the user interface and interaction patterns observable during typical use.
@stephanidis_universal_2007

Unfortunately, although there are plenty of areas to consider and many tools that help improve the websites, like session recordings, heat maps, first click analysis, AB testing, etc., none are automatable through API.
Some services provide testers that will check the website, but it's still manual work.
