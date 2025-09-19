window.DISAGREEMENTS = [
  {
    id: "12",
    title: "Snippet 2 vs Snippets 4 and 7",
    "snippet-id": 2,
    htmltext: `
<p><strong>Disagreement:</strong> Martin and Oscar placed Snippet 2 clearly above 4 and 7, while Nadeeshan tied them. The question is whether Snippet 2’s brevity justifies being distinct, or whether it belongs tied with 4 and 7.</p>
<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong> "We broadly agree... Oscar and I agree this one is a little bit trickier than Snippet 1... I think we'll agree here on Snippet 1 at the bottom, and this one above it."</p>
    <p><strong>Oscar:</strong> "Yeah, maybe I'm giving too much importance to checking scheme jar/file... need to see other snippets."</p>
    <p><strong>Nadeeshan:</strong> "I agree with Oscar... despite that uncertainty, the purpose of the method remains clear... I would change rank of Snippet 2 from 1 to 2."</p>
  </div>
</details>`
  },
  {
    id: "13",
    title: "Snippet 4 vs Snippet 7 (and vs Snippet 2)",
    "snippet-id": 4,
    htmltext: `
<p><strong>Disagreement:</strong> Martin: 4 > 7; Oscar: 7 > 4; Nadeeshan: 4 = 7 and also tied 4 with 2. The issue is whether <code>regionMatches</code> creates a barrier or is trivial to resolve, and if Snippet 4 should be distinct from Snippet 2.</p>
<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong> "I stand by my round 2 response: this snippet isn't too hard to follow... only tricky part is regionMatches, and it's not that complex."</p>
    <p><strong>Oscar:</strong> "Tend to agree with Nadeeshan about S4 and S5: S4 doesn't require specialized knowledge, S5 does (visitors)."</p>
    <p><strong>Nadeeshan:</strong> "Overall purpose of the code is clear... parameters of regionMatches make its intent inferable... I would not change Snippet 7 rank."</p>
  </div>
</details>`
  },
  {
    id: "14",
    title: "Snippet 5 vs Snippet 7",
    "snippet-id": 5,
    htmltext: `
<p><strong>Disagreement:</strong> Martin ranked 5 above 7, while Oscar and Nadeeshan ranked 7 above 5. The question is whether reliance on the Visitor pattern makes Snippet 5 harder, or whether clear structure/naming keeps it easier.</p>
<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin:</strong> "Nadeeshan and I agree: spec is clear but implementation depends on API familiarity. For a non-expert, tricky. I prefer middle ranking... definitely trickier than isRemote."</p>
    <p><strong>Oscar:</strong> "Visitor pattern requires specialized knowledge... may move snippet to the right."</p>
    <p><strong>Nadeeshan:</strong> "Understanding Snippet 5 requires Java file system knowledge. I would move it from 6 to 5, but still see domain knowledge as necessary."</p>
  </div>
</details>`
  },
  {
    id: "15",
    title: "Central Role of Snippet 7",
    "snippet-id": 7,
    htmltext: `
<p><strong>Disagreement:</strong> Snippet 7 is in conflict with multiple snippets. Martin: 5 > 7 and 4 > 7; Oscar: 7 > 5 and 7 > 4; Nadeeshan: 7 > 5 and 7 = 4, also tied 2 = 7. The open question is whether 7 should be clearly harder than 5, tied with 4, and/or distinct from 2.</p>
<details>
  <summary style="cursor: pointer; font-weight: bold; margin-top: 1em;">View Round 3 Reflections</summary>
  <div style="margin-top: 0.5em;">
    <p><strong>Martin (via S4/S5):</strong> "RegionMatches is not that complex... willing to shift Snippet 5 downwards, but not below Snippets 4 and 7."</p>
    <p><strong>Oscar (via S4/S5):</strong> "S4 doesn't require much specialized knowledge... S5 does, which makes it look more obscure."</p>
    <p><strong>Nadeeshan:</strong> "Overall purpose is clear... straightforward if read carefully... parameters of regionMatches suggest intent. Would not change Snippet 7 rank."</p>
  </div>
</details>`
  }
];
