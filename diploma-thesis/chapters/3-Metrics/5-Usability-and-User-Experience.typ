#import "../../template/lib.typ": abbr

== Usability and User Experience

As already discussed in @ui-ux, it's really hard to objectively measure metrics in this category without access to the gathered information about user retention, heat maps and other metrics that can indicate user satisfaction.

Due to this limitation, we can only opt-in for manual checks that are subjective, but with appropriate guidance of the user, we can try to make the data relevant compared to other data.
The resulting data won't have as much statistical value, but they can be used to compare between different audits.
To make the comparison as fair as possible, other variables need to be isolated.
As user experience is tightly bound to performance due to impacts on responsiveness, the user has to be informed about such correlation in metrics that could be impacted by this factor.

One of the best guides for defining the usability metrics is already mentioned 10 Usability Heuristics for User Interface Design #cite(<nielsen_10_2024>, form: "normal").
It is a set of guidelines for designers on how to make websites more user-friendly.
As this set covers most of the struggles that users might encounter, we will use it as a basis for our metrics in this category.

The only automated metric we can create in this category is the presence of error pages.
Whenever the user navigates to a page that doesn't exist, he should be informed about it in the form of a special page that says why it might've happened and a button for recovery, which, most of the time, is a link to either the homepage or the nearest page in the hierarchy.
Any other way of handling such a situation, like showing the homepage, redirecting to the homepage, or showing the default error page of the hosting server, is invalid, mainly due to the confusion it creates for the user.
