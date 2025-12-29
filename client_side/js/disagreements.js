window.DISAGREEMENTS = [
  {
    id: "1",
    title: "Disagreement on indexOfIgnoreCase and deleteRecursively",
    "snippet-id": "indexOfIgnoreCase",
    htmltext: `
indexOfIgnoreCase and deleteRecursively are among the most divisive methods in Round 2, with experts disagreeing on whether they belong to the easiest tier or clearly in the mid-range.
<br>
<br>*Expert C grouped indexOfIgnoreCase and deleteRecursively together at Position 1.
<br>– They explained that both methods are easy to follow line by line, with meaningful variable and method names and clear error cases. In their view, “the business logic is straightforward based on the method name/signature,” and both snippets reflect how they would naturally implement such functionality.
<br>
<br>*Expert A grouped indexOfIgnoreCase, deleteRecursively, and isMachineTypeDefined together at Position 4.
<br>– They argued that although the intent of these methods is understandable, all require specific prior knowledge. For indexOfIgnoreCase, they pointed to unclear naming such as <code>str</code> and <code>endLimit</code>, and noted that the ignore-case behavior is implicit rather than explicit. For deleteRecursively, they emphasized that familiarity with the visitor pattern is required to fully follow the logic.
<br>
<br>*Expert D placed deleteRecursively at Position 4 and indexOfIgnoreCase at Position 5.
<br>– They felt both methods are readable but unnecessarily complicated relative to the problems they solve. In particular, they noted that indexOfIgnoreCase performs repeated validations and lacks centralized error handling, making it feel more complex than expected.
<br>
<br>*Expert B split the two, placing deleteRecursively at Position 3 and indexOfIgnoreCase at Position 4.
<br>– They argued that deleteRecursively benefits from familiar Java APIs and expressive visitor method names, whereas indexOfIgnoreCase requires more “mental compilation” due to intermediate variables and reimplementing functionality that could be delegated to built-in string operations.
<br>
<br>*Expert E placed indexOfIgnoreCase at Position 3 and deleteRecursively at Position 4.
<br>– They emphasized that indexOfIgnoreCase has more moving parts and requires reasoning about bounds and helper methods like <code>regionMatches</code>, while deleteRecursively requires understanding how <code>Files.walkFileTree</code> drives control flow externally.
<br>
<br>Overall, experts disagreed on whether these snippets are immediately readable implementations of familiar patterns or API-heavy methods that require prior knowledge and careful tracing. Even after reflection, no clear convergence emerged.
`
  },

  {
    id: "2",
    title: "Disagreement on isMachineTypeDefined",
    "snippet-id": "isMachineTypeDefined",
    htmltext: `
isMachineTypeDefined remains divisive due to differing tolerance for reflection and domain-specific assumptions.
<br>
<br>*Expert D placed isMachineTypeDefined at Position 3.
<br>– They described the method as “clear, concise,” and praised its use of Java’s native reflection facilities to shorten the logic. In their view, the control flow is simpler than methods that rely on mathematical reasoning or low-level encoding logic.
<br>
<br>*Expert C also placed it at Position 3, but for different reasons.
<br>– They emphasized that while the logic is guessable, the method “requires business knowledge about the domain” and uses “advanced Java stuff that is not very common,” such as inspecting declared fields via reflection.
<br>
<br>*Expert A placed isMachineTypeDefined at Position 4.
<br>– They wrote that the method is “simple to comprehend for someone familiar with reflection,” noting that the for-each loop over declared fields simplifies the intention. However, they still considered it harder than the simplest snippets due to the prerequisite API knowledge.
<br>
<br>*Expert E placed the method significantly harder, at Position 6.
<br>– They acknowledged that the reflective pattern becomes understandable once recognized, but stressed that understanding why reflection is used, what synthetic fields are, and how static final filtering contributes to correctness requires additional mental effort and domain context.
<br>
<br>*Expert B originally ranked the snippet very hard, but revised their understanding after reading other experts’ feedback.
<br>– They acknowledged that some concerns (such as a suspected null-pointer exception) were incorrect and stated they would now consider ranking it slightly easier. Despite this, they continued to group it with other cryptic methods and did not view it as easy.
<br>
<br>Overall, disagreement persisted because experts weighed recognizable reflective patterns against the cognitive cost of hidden domain assumptions differently. Reflection familiarity, rather than code length or control-flow complexity, dominated judgments of difficulty.
`
  },

  {
    id: "3",
    title: "Disagreement on lowestPositiveRoot",
    "snippet-id": "lowestPositiveRoot",
    htmltext: `
lowestPositiveRoot reveals a split between experts who emphasize mathematical familiarity and those who prioritize naming clarity and self-documentation.
<br>
<br>*Experts A and C placed lowestPositiveRoot near the hardest end, at Position 7.
<br>– Expert A argued that variable names like <code>det</code>, <code>sqrtD</code>, <code>invA</code>, <code>r1</code>, and <code>r2</code> “mean nothing” without prior knowledge of the quadratic formula, making both the purpose and implementation difficult to grasp.
<br>– Expert C similarly cited discomfort with the abbreviations and uncertainty about why the roots are swapped, describing it as “even more complicated math” than other difficult snippets.
<br>
<br>*Expert D placed the method at Position 6.
<br>– They agreed that unclear variable names and reliance on mathematical background significantly increase difficulty, even though the underlying algorithm is standard.
<br>
<br>*Experts B and E placed lowestPositiveRoot in the mid-range, at Position 5.
<br>– Expert B initially struggled but revised their assessment after realizing the snippet implements the quadratic formula, noting that mathematical familiarity substantially reduced the perceived complexity.
<br>– Expert E argued that once the formula is recognized, the method becomes linear and predictable, with difficulty stemming more from math familiarity than from code structure.
<br>
<br>Overall, disagreement centered on whether difficulty should reflect required background knowledge or structural clarity once that knowledge is present. Even after reflection, experts did not fully converge, making this snippet a clear boundary case.
`
  }
];
