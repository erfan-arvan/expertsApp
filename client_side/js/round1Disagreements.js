window.DISAGREEMENTS = [
  {
    id: "1",
    title: "Disagreement on isValidProjectName",
    "snippet-id": "isValidProjectName",
    htmltext: `
isValidProjectName shows noticeable disagreement across experts, with most placing it in the easiest tier and others rating it slightly or significantly harder.
<br>*Experts A, B, and E all ranked isValidProjectName in Position 1.
<br>– Expert A described it as “simple to understand” with “very clear” method and variable names. They emphasized that short, self-contained methods like this have an obvious purpose and that “the purpose of local variables and called methods is clear,” which makes it belong among the easiest code.
<br>– Expert B also viewed it as one of the simplest methods, praising its well-structured conditions and noting that each check contributes independently to the overall validation. In comparing it to isRemote, they said that “the problem of defining a valid project name is more straightforward than that of defining a URI as local” and that the project-name validator is “very self explanatory,” reinforcing why they consider it strictly easier.
<br>– Expert E likewise considered it very easy, saying that the method signature and the simple sequence of checks made it “pretty easy to understand.” They highlighted that “everything isValidProjectName does is right there in front of you and self-contained,” unlike isRemote, which relies on domain knowledge about URI schemes and an unseen helper.
<br>
<br>*Expert C ranked isValidProjectName slightly harder, in Position 2.
<br>– They found it mostly easy to follow but were unsure why both a letter-or-digit check and a separate valid-character-set check were necessary. They explained that isValidProjectName (and isRemote) requires a bit more domain knowledge to understand the special cases, whereas their easiest methods—indexOfIgnoreCase and deleteRecursively—can be followed line by line without additional assumptions.
<br>
<br>*Expert D placed isValidProjectName much higher, at Position 4.
<br>– They wrote that the method is understandable, but that the initial chain of validations is too long and could be “summarized a little without losing the readability.” They consistently favored code whose naming and structure felt more compact and directly aligned with its purpose, which pushed isValidProjectName outside the easiest tier for them.
<br>
<br>Overall, the disagreement arises from how experts weigh the method's length, redundancy of checks, and the small amount of domain knowledge it assumes. For some, these details are negligible, leaving the method firmly among the easiest; for others, they introduce enough overhead to move it into a slightly or significantly harder tier.
`
  },

  {
    id: "2",
    title: "Disagreement on isRemote",
    "snippet-id": "isRemote",
    htmltext: `
isRemote shows disagreement relative to mid-range snippets, even though most experts view it as generally clear.
<br>*Experts A and D placed isRemote in Position 1.
<br>– Expert A called it “concise,” with explicit and simple method names and “overall, good comprehensibility.” They emphasized that short, self-contained methods like this do not require extensive background knowledge.
<br>– Expert D similarly described the method as “clear and easy to read in its operation,” noting that it has good structure and intuitive flow.
<br>
<br>*Experts B, C, and E placed isRemote in Position 2.
<br>– Expert E still found it “pretty straightforward,” praising the switch statement for organizing the cases clearly. However, when contrasting it with isValidProjectName, they said that isRemote requires reasoning about URI schemes and about the behavior of isFilesystemPath(uri), which is not shown.
<br>– Expert B said isRemote is “not bad” but “not perfect either,” explaining that defining a URI as local vs remote is inherently less straightforward than validating a project name. They also noted that URI is “one of those classes you don’t use every day,” often requiring documentation.
<br>– Expert C questioned why schemes like 'file' and 'jar' were treated as special cases and said understanding these rules “requires more knowledge of the domain.” They contrasted this with indexOfIgnoreCase and deleteRecursively, which they viewed as line-by-line understandable without domain assumptions.
<br>
<br>Overall, these differences reveal a split between experts who see isRemote as very easy and those who believe the method demands additional domain or library knowledge—specifically understanding URI schemes and helper behavior—which elevates its difficulty slightly above the simplest methods.
`
  },

  {
    id: "3",
    title: "Disagreement on isMachineTypeDefined",
    "snippet-id": "isMachineTypeDefined",
    htmltext: `
isMachineTypeDefined is one of the most divisive methods, with experts placing it anywhere from near-easy to the hardest in the set.
<br>*Expert D placed isMachineTypeDefined toward the easy side at Position 2.
<br>– They described it as “clear, concise,” praising how reflection is used in a straightforward way to iterate over constants and check for a match. Even though reflection requires some prior knowledge, they felt the intent remained easy to follow.
<br>
<br>*Expert C placed it in Position 3.
<br>– They said the control flow is understandable but expressed uncertainty about what each field represents and what “isSynthetic” is doing. They noted that the method “requires business knowledge about the domain,” and that using reflection to inspect declared fields is “advanced Java stuff that is not very common.”
<br>
<br>*Expert A placed it in Position 4.
<br>– They wrote that the method is “simple to comprehend for someone familiar with reflection” but still requires specific API knowledge. They viewed it similarly to deleteRecursively in terms of difficulty and noted that both methods require more contextual knowledge than the simplest ones like isValidProjectName.
<br>
<br>*Expert E placed it significantly harder, at Position 6.
<br>– They explained that although the reflective loop is recognizable once you see that it's iterating over constants, the method still relies on understanding modifiers, synthetic vs non-synthetic fields, and why reflection is being used at all. They consistently judged it harder than more linear, mathematical methods like lowestPositiveRoot.
<br>
<br>*Expert B placed isMachineTypeDefined at the extreme hard end (Position 8).
<br>– They called it “difficult to comprehend,” arguing that the name implies a general MachineType check, yet the implementation is tied specifically to CoffMachineType. They also noted that one path always triggers a null-pointer exception. They grouped it with encodedLength and atan2 as “hacky or cryptic” functions full of hidden assumptions and errors requiring significant “mental debugging.”
<br>
<br>Overall, experts disagreed sharply depending on how comfortable they are with reflection, how much domain context they inferred or expected, and how they assessed the clarity and intention behind the method’s structure.
`
  },

  {
    id: "4",
    title: "Disagreement on indexOfIgnoreCase",
    "snippet-id": "indexOfIgnoreCase",
    htmltext: `
indexOfIgnoreCase shows varied difficulty assessments, with experts split between viewing it as one of the easiest methods and placing it solidly in the mid-range.
<br>*Expert C placed indexOfIgnoreCase in Position 1.
<br>– They said it “flowed very naturally,” with each condition playing an obvious role in the search logic. They grouped it with deleteRecursively, explaining that both methods can be followed line by line, with meaningful variable names and straightforward logic.
<br>
<br>*Experts E and D placed indexOfIgnoreCase in Position 3.
<br>– Expert E emphasized that the method's control flow is clear and the earlier return checks are intuitive. They also contrasted it with more complicated methods such as reflection-based ones or UTF-8 encoding, noting that indexOfIgnoreCase is fully self-contained.
<br>– Expert D also described it as structurally clear and readable, though more complex than the very simplest methods.
<br>
<br>*Experts A and B placed it at Position 5.
<br>– Expert A acknowledged that the implementation is generally expected but pointed out naming issues (e.g., “str,” “endLimit”), saying these reduce readability. They felt this pushes the method slightly harder than some reflection-based ones because the naming obscures intent.
<br>– Expert B called the method “ok” but noted that the number of intermediate values and the hand-rolled search logic makes it less transparent than shorter, simpler methods. They said deleteRecursively is easier to follow once one ignores its misleading name, and they argued that lowestPositiveRoot can be easier than indexOfIgnoreCase because the latter is “reinventing the wheel” instead of using built-in substring operations.
<br>
<br>Overall, indexOfIgnoreCase is a clear point of disagreement about what counts as truly easy code: some see it as a straightforward implementation of string search, while others find its naming, intermediate variables, and reinvention of built-in functionality enough to place it in a more effortful mid-range tier.
`
  },

  {
    id: "5",
    title: "Disagreement on lowestPositiveRoot",
    "snippet-id": "lowestPositiveRoot",
    htmltext: `
lowestPositiveRoot shows disagreement about how much mathematical familiarity should influence perceived difficulty.
<br>*Expert B placed lowestPositiveRoot in Position 4.
<br>– They described the method as “alright,” explaining that implementing a well-known quadratic formula makes it easier to follow than methods like indexOfIgnoreCase. Although variable names like “det” and “inv” are not ideal, the mathematical structure is familiar.
<br>
<br>*Expert E placed it in Position 5.
<br>– They noted that once you recognize the flow as a direct translation of how one solves a quadratic equation by hand, the logic becomes easy to track. Still, they acknowledged it requires some mathematical background. They contrasted it with reflection-heavy methods, saying lowestPositiveRoot has a linear and self-contained structure.
<br>
<br>*Experts A, C, and D all placed lowestPositiveRoot at Position 7.
<br>– Expert A wrote “Not good,” highlighting that it requires previous knowledge of the quadratic formula and that abbreviated names like “det,” “sqrtD,” “invA,” “r1,” and “r2” provide no clarity to someone unfamiliar with the math involved.
<br>– Expert C said they were “not familiar enough” with the abbreviations and felt uncertain about the purpose of swapping the roots. They compared it unfavorably to encodedLength, saying lowestPositiveRoot involves “even more complicated math.”
<br>– Expert D similarly argued that the unclear variable names and reliance on unannotated mathematical steps make the method “quite difficult to understand,” even though the underlying idea is just the quadratic formula.
<br>
<br>Overall, lowestPositiveRoot ranges from moderately complex to one of the hardest methods, depending on the expert's mathematical comfort level, expectations about naming clarity, and tolerance for compact representations of formulas.
`
  },

  {
    id: "6",
    title: "Disagreement on atan2",
    "snippet-id": "atan2",
    htmltext: `
atan2 is part of the most contested hardest cluster, with experts sharply divided on its difficulty.
<br>*Experts A and B placed atan2 in Position 8.
<br>– Expert A said that even though names like “atan” and “HALF_PI” hint at trigonometry, “neither the method name nor the local variables shed any light on the purpose of the method.” They described it as “ciphered,” understandable only with prior mathematical knowledge, and criticized its use of magic numbers. They also compared it to encodedLength, arguing that both methods fail to convey their purpose clearly.
<br>– Expert B called the method “terrible,” noting that one of the early branches seems to do nothing and that the final return value does not align with what one expects from an atan2-style computation. They grouped it with encodedLength and isMachineTypeDefined as methods that are “hacky or cryptic,” containing errors or confusing design choices that require heavy mental debugging.
<br>
<br>*Expert E also placed atan2 in Position 8.
<br>– They said understanding it requires reasoning about numerical methods and trigonometry. They contrasted it with encodedLength, saying that even though the UTF-8 code uses tricky bit-level logic, it still has an overall logical structure, whereas atan2 has a much less intuitive flow. They highlighted unusual constructs like “n != n” for NaN detection and quadrant-dependent arithmetic like “x + HALF_PI,” which require reconstructing the intended behavior.
<br>
<br>*Experts C and D placed atan2 in Position 6.
<br>– Expert C criticized the extremely short variable names (“x,” “y,” “n”) and said the early if/else block adjusts values in edge cases without making the purpose clear. They said that at least in isMachineTypeDefined they could infer some logic from the name, whereas atan2 requires specific mathematical or library context. However, they still found it slightly easier than encodedLength, which they described as involving unfamiliar bitwise and UTF-8 concepts.
<br>– Expert D said the overall intention is broadly understandable, but the cryptic naming, lack of braces, and complex control flow make the method harder to parse. They placed it above the most cryptic low-level encoding code but still within the harder tier.
<br>
<br>These differences show that some experts viewed atan2 as opaque without strong numerical-method and trigonometry background, while others judged it slightly more accessible than the trickiest low-level encoding logic but still difficult due to its unconventional flow, naming, and mathematical assumptions.
`
  }
];
