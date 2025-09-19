window.DISAGREEMENTS = [
  {
    id: "12",
    title: "isRemote vs indexOfIgnoreCase & lowestPositiveRoot",
    "snippet-id": 2,
    htmltext: `In previous rounds, experts disagreed on whether Snippet 2 is distinctly simpler than Snippets 4 and 7, or about the same level.
<ul>
  <li><strong>Martin</strong> and <strong>Oscar</strong> ranked Snippet 2 higher than both 4 and 7, citing short, direct logic without deep API/pattern knowledge.</li>
  <li><strong>Nadeeshan</strong> tied Snippet 2 with 4 and 7, arguing all three are comparably straightforward when read carefully.</li>
</ul>
<p>The disagreement centers on whether Snippet 2’s brevity justifies placing it above 4 and 7, or tying them.</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> We broadly agree. I think it's worth differentiating this snippet from snippet 1, and Oscar and I agree that this one is a little bit trickier. I think Nadeeshan would agree that, if he had to choose between this one and snippet 1, this one is a little more complex. So, I think we'll agree here on Snippet 1 at the bottom, and this one above it.</li>
      <li><strong>Q2:</strong> No.</li>
      <li><strong>Q3:</strong> No.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> Yeah, maybe I'm giving too much importance to understanding the intention of checking the scheme is jar or file to check that the URI is or isn't remote.</li>
      <li><strong>Q2:</strong> yep</li>
      <li><strong>Q3:</strong> yep, need to see the other snippets.</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree with Oscar on snippet 2's URI implementation logic. However, despite that uncertainty, the purpose of the method remains clear to me.</li>
      <li><strong>Q2:</strong> Yes.</li>
      <li><strong>Q3:</strong> I would change rank of snippet 2 -- from rank 1 to 2</li>
    </ul>
  </div>
</details>`
  },
  {
    id: "13",
    title: "indexOfIgnoreCase vs lowestPositiveRoot (and vs isRemote)",
    "snippet-id": 4,
    htmltext: `Experts diverged on whether Snippet 4 should be above, below, or tied with Snippet 7, and whether it is distinct from or tied with Snippet 2. A key point is how much <code>regionMatches</code> (and similar APIs) create real barriers for typical engineers.
<ul>
  <li><strong>Martin</strong> placed 4 above 7, noting <code>regionMatches</code> can be looked up and the rest is straightforward.</li>
  <li><strong>Oscar</strong> placed 4 below 7, concerned unfamiliar APIs may hinder comprehension.</li>
  <li><strong>Nadeeshan</strong> tied 4 with 7, and tied 4 with 2, suggesting comparable difficulty after careful reading.</li>
</ul>
<p>The unresolved issue is whether 4 sits above 7, below 7, or tied; and whether it should be distinct from 2.</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I stand by my round 2 response: this snippet isn't too hard to follow. The only tricky part is <code>regionMatches</code>, and IRL any engineer who's unfamiliar with that would immediately look it up if they wanted to understand this method. I read its Javadoc (https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#regionMatches-int-java.lang.String-int-int-), and it's not that complex.</li>
      <li><strong>Q2:</strong> No.</li>
      <li><strong>Q3:</strong> Yes: I think I agree with Nadeeshan that it could be shifted left, below snippet 8 and maybe snippet 3.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> Tend to agree with Nadeeshan about S4 and S5: S4 doesn't require a lot of specialized knowledge, despite some API calls may be unknown, but S5 requires this knowledge (about visitors), which may make the code look more obscure.</li>
      <li><strong>Q2:</strong> yeah</li>
      <li><strong>Q3:</strong> yeah, I will factor in more the specialized knowledge needed to understand the code</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree on the point that the overall purpose of the code is clear.</li>
      <li><strong>Q2:</strong> From the perspective of a typical software engineer, if one carefully reads the code, I would say the logic behind it is straightforward to understand. Even without documentation for the "regionMatches method", simply examining its parameters makes it relatively easy to infer what the method is supposed to do.</li>
      <li><strong>Q3:</strong> No I would not change the rank of snippet 7.</li>
    </ul>
  </div>
</details>`
  },
  {
    id: "14",
    title: "deleteRecursively vs lowestPositiveRoot",
    "snippet-id": 5,
    htmltext: `Experts disagreed on whether Snippet 5 should be ranked above or below Snippet 7. The crux is how much specialized knowledge of the Java File API and the Visitor pattern should be assumed for typical engineers.
<ul>
  <li><strong>Martin</strong> placed 5 above 7, finding the spec clear and the idiom recognizable once you know the API.</li>
  <li><strong>Oscar</strong> and <strong>Nadeeshan</strong> placed 7 above 5, arguing the Visitor pattern introduces extra difficulty.</li>
</ul>
<p>The question: does clear structure + naming offset pattern/API familiarity, or does that familiarity dominate comprehensibility?</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I think Nadeeshan and I broadly agree on this snippet's comprehensibility: we both see the difficulty with the implementation but agree on the clear spec. Oscar also agrees that the spec is clear, but I think he (like me) is familiar with this Java idiom and so ranks the snippet as very easy. But for a non-expert, I think this would be a bit tricky. So, I prefer the ranking in the middle somewhere, as Nadeeshan and I have it; I think this is definitely trickier to understand than e.g., isRemote or the validation method that I ranked at the bottom.</li>
      <li><strong>Q2:</strong> We all agree on what's there, but not on how to interpret it.</li>
      <li><strong>Q3:</strong> Yes: I'm willing to shift it a bit downwards, but not below snippets 4 and 7.</li>
    </ul>

    <p><strong>Oscar:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I guess the visitor pattern may specialized knowledge that not everybody has, so I may be willing to change my ranking (move the snippet to the right)</li>
      <li><strong>Q2:</strong> yes</li>
      <li><strong>Q3:</strong> yes, see above (Q1)</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree with Martin's comment that understanding Snippet 5 properly requires knowledge of Java's file system handling.</li>
      <li><strong>Q2:</strong> Yes.</li>
      <li><strong>Q3:</strong> Yes I would. From rank 6 to 5. However, I still believe that a person familiar with the Visitor design pattern, as Oscar pointed out, and with specific domain knowledge of Java file handling is required to fully understand the method. Therefore, I think the ranking is valid in this case.</li>
    </ul>
  </div>
</details>`
  },
  {
    id: "15",
    title: "lowestPositiveRoot — central conflicts",
    "snippet-id": 7,
    htmltext: `Snippet 7 sits at the center of multiple disagreements:
<ul>
  <li>Against <strong>4</strong>: Martin has 4 &gt; 7; Oscar has 7 &gt; 4; Nadeeshan ties 4 = 7.</li>
  <li>Against <strong>5</strong>: Martin has 5 &gt; 7; Oscar and Nadeeshan have 7 &gt; 5.</li>
  <li>Against <strong>2</strong>: Martin &amp; Oscar have 2 &gt; 7; Nadeeshan ties 2 = 7.</li>
</ul>
<p>The open questions are: (1) Is 7 clearly harder than 5 (majority view) or not (Martin)? (2) Should 7 be tied with 4 (Nadeeshan) or clearly above/below (Martin/Oscar)? (3) Is 7 distinct from 2 or at the same level?</p>

<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><em>Direct Round 3 comments specifically about Snippet 7 were limited; related reflections came up in discussions of Snippets 4 and 5.</em></p>

    <p><strong>Martin (via S4/S5 reflections):</strong></p>
    <ul>
      <li>On S4: “this snippet isn't too hard to follow ... regionMatches ... not that complex.”</li>
      <li>On S5: “willing to shift it a bit downwards, but not below snippets 4 and 7.”</li>
    </ul>

    <p><strong>Oscar (via S4/S5 reflections):</strong></p>
    <ul>
      <li>On S4 vs S5: “S4 doesn't require a lot of specialized knowledge ... S5 requires [visitor] knowledge, which may make the code look more obscure.”</li>
    </ul>

    <p><strong>Nadeeshan:</strong></p>
    <ul>
      <li><strong>Q1:</strong> I agree on the point that the overall purpose of the code is clear.</li>
      <li><strong>Q2:</strong> From the perspective of a typical software engineer, if one carefully reads the code, I would say the logic behind it is straightforward to understand. Even without documentation for the "regionMatches method", simply examining its parameters makes it relatively easy to infer what the method is supposed to do.</li>
      <li><strong>Q3:</strong> No I would not change the rank of snippet 7.</li>
    </ul>
  </div>
</details>`
  }
];
