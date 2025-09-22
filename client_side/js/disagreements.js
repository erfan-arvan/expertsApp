window.DISAGREEMENTS = [
  {
    id: "1",
    title: "Main Trio Disagreement",
    "snippet-id": "lowestPositiveRoot, indexOfIgnoreCase, deleteRecursively",
    htmltext: `
<p>Experts disagree on the <strong>relative order</strong> of
<code>indexOfIgnoreCase</code>, <code>lowestPositiveRoot</code>, and <code>deleteRecursively</code>.
The tension is how much to weigh <em>API/pattern familiarity</em> (e.g., <code>regionMatches</code>, Visitor/File APIs)
versus <em>local code clarity</em>.</p>

<ul>
  <li><strong>Martin:</strong> <code>indexOfIgnoreCase</code> (3) &lt; <code>deleteRecursively</code> (4) &lt; <code>lowestPositiveRoot</code> (5)</li>
  <li><strong>Oscar:</strong> <code>lowestPositiveRoot</code> (3) &lt; <code>indexOfIgnoreCase</code> (4) &lt; <code>deleteRecursively</code> (5)</li>
  <li><strong>Nadeeshan:</strong> tie at (3) for <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>; <code>deleteRecursively</code> at (4)</li>
</ul>

<p><strong>Goal:</strong> Agree on a clear ordering (or justified ties) for the trio.</p>
<ol>
  <li>Should <code>indexOfIgnoreCase</code> be above, below, or tied with <code>lowestPositiveRoot</code>?</li>
  <li>Where does <code>deleteRecursively</code> belong given the Visitor/File API knowledge it assumes?</li>
  <li>Explicitly: how much should API/pattern familiarity affect the rank vs. local clarity and purpose?</li>
</ol>
<details>
  <summary style="cursor:pointer; font-weight:bold; margin-top:1em;">View Round 3 Reflections</summary>
  <div style="margin-top:0.5em;">
    <p><strong>Highlights:</strong> Martin: “<em>regionMatches</em> isn’t complex once looked up.” Oscar: “Visitor pattern adds real difficulty.” Nadeeshan: “Purpose is clear; careful reading narrows gaps.”</p>
    <a href="round3-reflections.html" target="_blank"
                                rel="noopener noreferrer">read all experts’ reflection answers</a>
  </div>
</details>
`
  },
  {
    id: "2",
    title: "Place isRemote relative to the trio",
    "snippet-id": "isRemote",
    htmltext: `
<p>Is <code>isRemote</code> <strong>distinctly simpler</strong> than the trio
(<code>indexOfIgnoreCase</code>, <code>lowestPositiveRoot</code>, <code>deleteRecursively</code>) or roughly comparable?</p>

<ul>
  <li><strong>Martin:</strong> <code>isRemote</code> at (2), simpler than the trio (3–5)</li>
  <li><strong>Oscar:</strong> <code>isRemote</code> at (2), also simpler than the trio (3–5)</li>
  <li><strong>Nadeeshan:</strong> ties <code>isRemote</code> with <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code> at (3)</li>
</ul>

<p><strong>Goal:</strong> Decide whether <code>isRemote</code> should sit <em>left of</em> the trio (distinctly simpler) or be <em>tied</em> with some/all of them.</p>
<ol>
  <li>Does brevity and direct control flow make <code>isRemote</code> clearly simpler in practice?</li>
  <li>If tied, with which snippet(s) and why? Be explicit about what a “typical engineer” must know.</li>
</ol>

<details>
  <summary style="cursor:pointer; font-weight:bold; margin-top:1em;">View Round 3 Reflections</summary>
  <div style="margin-top:0.5em;">
    <p><strong>Highlights:</strong> Agreement that purpose is clear; debate is about whether brevity alone justifies a lower difficulty rank.</p>     <a href="round3-reflections.html" target="_blank"
                                rel="noopener noreferrer">read all experts’ reflection answers</a>
  </div>
</details>
`
  }
];
