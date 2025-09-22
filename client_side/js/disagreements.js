window.DISAGREEMENTS = [
  {
    id: "1",
    title: "Order among indexOfIgnoreCase, lowestPositiveRoot, deleteRecursively",
    "snippet-id": "lowestPositiveRoot",
    htmltext: `
<p>Experts disagreed on the relative order of <code>indexOfIgnoreCase</code>, <code>lowestPositiveRoot</code>, and <code>deleteRecursively</code>.
The crux is how much API/pattern familiarity (e.g., <em>regionMatches</em>, Visitor/File APIs) should influence perceived difficulty.</p>
<ul>
  <li>Martin: <code>indexOfIgnoreCase</code> &gt; <code>lowestPositiveRoot</code>; <code>deleteRecursively</code> near the middle.</li>
  <li>Oscar: <code>lowestPositiveRoot</code> &gt; <code>indexOfIgnoreCase</code>; <code>deleteRecursively</code> harder due to Visitor pattern.</li>
  <li>Nadeeshan: ties between <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code>; notes domain knowledge for <code>deleteRecursively</code>.</li>
</ul>
<p><strong>Goal:</strong> Agree on a clear ordering (or justified ties) for the trio, with an explicit stance on how to weigh API/pattern familiarity vs. local code clarity.</p>
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
<p>Is <code>isRemote</code> distinctly simpler than <code>indexOfIgnoreCase</code> / <code>lowestPositiveRoot</code> / <code>deleteRecursively</code>, or roughly comparable?</p>
<ul>
  <li>Martin & Oscar: put <code>isRemote</code> left (simpler), citing short, direct logic.</li>
  <li>Nadeeshan: ties with <code>indexOfIgnoreCase</code> and <code>lowestPositiveRoot</code> given careful reading.</li>
</ul>
<p><strong>Goal:</strong> Decide whether <code>isRemote</code> should be distinctly left of the trio or tied with some/all of them.</p>
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
