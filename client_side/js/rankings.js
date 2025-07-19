
const participantRankings = [
    {
      id: 1,
      name: "Nadeeshan",
      html: `<div class="participant-section">
    <h3>Nadeeshan</h3>
    <div class="ranking-labels">
      <div class="ranking-label">1 (easiest)</div>
      <div class="ranking-label">2</div>
      <div class="ranking-label">3</div>
      <div class="ranking-label">4</div>
      <div class="ranking-label">5</div>
      <div class="ranking-label">6</div>
      <div class="ranking-label">7</div>
      <div class="ranking-label">8 (hardest)</div>
    </div>
    <div class="ranking-row">
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>
        <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
        <div class="reasoning-point" onclick="compare([1], [2])" style="position: absolute; top: -4px; right: 60px;"></div>
        <div class="tooltip-box" style="position: absolute; top: 25px; right: 10px;">
           Because both of them are equally understandable to me. Has similar LOC, clear and simple logical separation.
        </div>
      </div>
  
      <div class="ranking-slot"></div>
  
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
        <div class="reasoning-point" onclick="compare([4], [3])" style="top: 50px; right: -12px;"></div>
        <div class="tooltip-box" style="top: 60px; right: -160px;">
          💡 <strong>Reason:</strong><br>
          Snippet 3 requires more context understanding than Snippet 4. Also, there is weird syntax in Snippet 3; line 11 takes an argument in a getter, which is not common and passing null looks unnecessary.
        </div>
      </div>
  
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>
        <div class="reasoning-point" onclick="compare([3], [8])" style="top: 50px; right: -12px;"></div>
        <div class="tooltip-box" style="top: 60px; right: -160px;">
          💡 <strong>Reason:</strong><br>
          Snippet 8 requires the mathematical definition of "atan".
        </div>
      </div>
  
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
        <div class="reasoning-point" onclick="compare([8], [5])" style="top: 50px; right: -12px;"></div>
        <div class="tooltip-box" style="top: 60px; right: -160px;">
          💡 <strong>Reason:</strong><br>
          Snippet 5 has a clear logic: delete files/directories recursively. It does not need to have a specific mathematical definition to understand the logic like in Snippet 8.
        </div>
      </div>
  
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>
        <div class="reasoning-point" onclick="compare([5], [6])" style="top: 50px; right: -12px;"></div>
        <div class="tooltip-box" style="top: 60px; right: -160px;">
          💡 <strong>Reason:</strong><br>
          The logic used in Snippet 6's encoding is hard to understand. I do not remember the hexadecimal meaning of 0x8 and 0x7.
        </div>
      </div>
  
      <div class="ranking-slot" style="position: relative;">
        <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>
        <div class="reasoning-point" onclick="compare([6], [7])" style="top: 50px; right: -12px;"></div>
        <div class="tooltip-box" style="top: 60px; right: -160px;">
          💡 <strong>Reason:</strong><br>
          Snippet 7 logic is in contradiction with the method name. I thought it returns the lowest positive root from three numbers, but line 2 is unclear.
        </div>
      </div>
  
      <div class="ranking-slot">
        <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>
      </div>
    </div>
  </div>`
    },
    {
        id: 2,
        name: "Oscar",
        html: `<div class="participant-section">
        <h3>Oscar</h3>
        <div class="ranking-row">
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>
            <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>
            <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>
            <div class="reasoning-point" onclick="compare([1,5], [3])" style="position: absolute; top: -4px; right: 60px;"></div>
            <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 360px;">
                It is hard for me to distinguish which one is easier/harder to understand. They have straightforward logic that I am familiar with, and I don't think the usage of a visitor or nested ifs or loops makes one harder/easier to understand than the others.
            </div>
          </div>
          <div class="ranking-slot"></div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>
            <div class="reasoning-point" onclick="compare([7], [2])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              The reason I ranked Snippet 2 after Snippet 7 is that I am not familiar with a URI's scheme and why implementing that logic (in Snippet 2) is enough to check if it is remote. Snippet 7 is straightforward to understand if we remember/know the quadratic formula.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
          </div>
          <div class="ranking-slot"></div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
            <div class="reasoning-point" onclick="compare([4], [6])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              Snippet 6 is harder to understand for me because I don't know what the bit shifts are doing to check or determine the sequence length in UTF-8. Snippet 4 is easier to understand, despite it being unclear what regionMatches is doing — overall, I understand what the method is doing.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>
            <div class="reasoning-point" onclick="compare([6], [8])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              For obvious reasons, atan2 is harder to understand: I don't remember how atan works, the code contains cryptic instructions and I don't know what atanUnchecked is doing -- also, the identifiers here don't help!
            </div>
          </div>
          <div class="ranking-slot">
            <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
          </div>
        </div>
      </div>`
      }, 
      {
        id: 3,
        name: "Martin",
        html: `<div class="participant-section">
        <h3>Martin</h3>
        <div class="ranking-row">
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-2" onclick="show_snippet(2)">Snippet 2</button>
            <div class="reasoning-point" onclick="compare([2], [1])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 They both implement simple string validation logic. \`isRemote\` has a shorter, simpler set of rules that it implements, so I ranked it lower. However, I don't think either of these are very difficult: both were pretty trivial to write a specification for.
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-1" onclick="show_snippet(1)">Snippet 1</button>
            <div class="reasoning-point" onclick="compare([2], [1])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              There is a big gap between these, in my view. \`isValidProjectName\` is simple string validation, but the other two snippets are implementations of more complex (but reasonably well-known!) algorithms that are pretty easy to recognize. 
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;"></div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-4" onclick="show_snippet(4)">Snippet 4</button>
            <button class="snippet-7" onclick="show_snippet(7)">Snippet 7</button>
            <div class="reasoning-point" onclick="compare([4], [7])" style="position: absolute; top: -4px; right: 60px;"></div>
            <div class="tooltip-box" style="position: absolute; top: 25px; left: 10px; width: 360px;">
              These two snippets are moderately complex string and float algorithms, respectively. I don't differentiate between them, since both are tricky to get right but doing something pretty well understood.
              (prev:Snippets 4, 5, and 7 are pretty similar, in the sense that each implements a well-known algorithm that I immediately recognized. However, all three are pretty complicated algorithms to get right.)
            </div>
            <div class="reasoning-point" onclick="compare([4,7], [5])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              These three snippets are actually pretty similar: all are implementations of some kind of simple specification that's a bit tricky to get right in practice. I'm actually not even confident that \`deleteRecursively\` is correct, though, which is why I ranked it above the other two: the relevant Java APIs are quite confusing and easy to get wrong. I think this implementation might leak a file descriptor?
              (prev:I'm actually not even confident that Snippet 5 is correct, which is why I ranked it above the other two: the relevant Java APIs are quite confusing and easy to get wrong. Snippets 4 and 7 are moderately complex string and float algorithms, respectively. I don't differentiate between them.)
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-5" onclick="show_snippet(5)">Snippet 5</button>
            <div class="reasoning-point" onclick="compare([3], [6])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              \`isMachineTypeDefined\` required me to do true bottom-up reasoning to figure out what it was doing, unlike \`deleteRecursively\`.<br>
              (prev:Then comes Snippet 3: it also required me to reason through it, since it wasn't clear what it was for just from reading through it once. However, it was noticeably easier to figure out what Snippet 3 is doing compared to Snippet 6.)
            </div>
          </div>
          <div class="ranking-slot" style="position: relative;">
            <button class="snippet-3" onclick="show_snippet(3)">Snippet 3</button>
            <div class="reasoning-point" onclick="compare([3], [6])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              Both snippets require bottom-up reasoning. However, \`encodedLength\` requires more domain knowledge to make sense of, since it seems obvious to me that Java programmers should know how the API for the language itself works at a basic level (e.g., "what's a field?" is not a question any Java programmer is going to ask), but \`encodedLength\` requires understanding UTF-8 vs UTF-16, which many Java programmers won't have had to deal with.
            </div>
          </div>
          <div class="ranking-slot">
            <button class="snippet-6" onclick="show_snippet(6)">Snippet 6</button>
            <div class="reasoning-point" onclick="compare([6], [8])" style="top: 50px; right: -12px;"></div>
            <div class="tooltip-box" style="top: 60px; right: -160px;">
              💡 <strong>Reason:</strong><br>
              Both require line-by-line reasoning, but \`atan2\` requires _two_ kinds of domain-specific knowledge (numerical methods + trig) vs just one for \`encodedLength\` (encodings).<br>
              (prev:Snippet 8 is the toughest: it was the only one where I couldn't follow why it was doing what it was doing.<br>
              Snippet 6 is next: it required me to reason through the code "bottom up" to figure out what it's doing.)
            </div>
          </div>
          <div class="ranking-slot">
            <button class="snippet-8" onclick="show_snippet(8)">Snippet 8</button>
          </div>
        </div>
      </div>`
      }   
      
  ];
  