const snippets = [
    {
      id: 1,
      title: "Snippet 1",
      methodName:"isValidProjectName",
      code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isValidProjectName</span>(<span class="type">String</span> name) {
    <span class="keyword">if</span> (name == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">if</span> (name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#startsWith-java.lang.String-')">startsWith</a>(<span class="string">"."</span>)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">if</span> ((name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>() < <span class="number">1</span>) || (name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>() > MAX_NAME_LENGTH)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i < name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#length--')">length</a>(); i++) {
        <span class="type">char</span> c = name.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#charAt-int-')">charAt</a>(i);
        <span class="keyword">if</span> (!Character.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Character.html#isLetterOrDigit-char-')">isLetterOrDigit</a>(c) && !VALID_NAME_SET.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/util/Set.html#contains-java.lang.Object-')">contains</a>(c)) {
            <span class="keyword">return</span> <span class="literal">false</span>;
        }
    }
    <span class="keyword">return</span> <span class="literal">true</span>;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>This method takes a project name and validates it based on several criteria.</p>`,
      comprehensibility: `<p>Clear method/final variable names make it easier to understand. Also, the clear logic separation of the conditional statements makes it easier to follow.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Checks that the project name is valid: it is not null, does not start with ., is within length, is alphanumeric, and contains allowed characters.</p>`,
      comprehensibility: `<p>This one is easy to understand: the logic is simple and the identifiers helped me understand what the method is doing.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This is a string validation method implementing the follow rules:<br>
          – the input must be nonnull<br>
          – the input must not start with a dot<br>
          – the input must not be the empty string<br>
          – the input must be shorter than or equal to the MAX_NAME_LENGTH constant<br>
          – each character must be a letter/digit or in VALID_NAME_SET</p>`,
      comprehensibility: `<p>The method is a straightforward set of tests against the string. These kinds of tests are common in validation logic. The name \`VALID_NAME_EST\` and the method name, combined with the string operations being performed, make the purpose obvious. The method uses simple string conditions to check most of the properties; the only ones that are more complex are the character properties, which are contained in a simple loop. So, structurally, the method is also easy to understand</p>`
    }
  ]
          },
          {
            id: 2,
            title: "Snippet 2",
            methodName:"isRemote",
            code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isRemote</span>(<span class="type">URI</span> uri) {
    <span class="keyword">if</span> (<span class="function">isFilesystemPath</span>(uri)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="type">String</span> scheme = uri.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/net/URI.html#getScheme--')">getScheme</a>();
    <span class="keyword">if</span> (scheme == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">switch</span> (scheme) {
        <span class="keyword">case</span> <span class="string">"file"</span>:
        <span class="keyword">case</span> <span class="string">"jar"</span>:
            <span class="keyword">return</span> <span class="literal">false</span>;
        <span class="keyword">default</span>:
            <span class="keyword">break</span>;
    }
    <span class="keyword">return</span> <span class="literal">true</span>;
}
`,responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>This method takes a URI and checks if it is a local reference or not.</p>`,
      comprehensibility: `<p>Meaningful method name (including clear internal method invocation names) and a switch statement with simple logic make it easier to understand.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>It checks that the given URI is remote. If the URI is a file system path, does not have a scheme, or the scheme is file/jar, it is not remote; otherwise it is.</p>`,
      comprehensibility: `<p>Easy to understand: easy logic, identifiers helped. It's harder than Snippet 1 due to unclear isFilesystemPath and URI scheme.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This method validates a URI according to a set of rules. The URI is valid (and the method returns true) iff:<br>
        * the uri isn't a filesystem path<br>
        * the uri has a nonnull \`Scheme\`<br>
        * the uri's scheme is something other than "file" or "jar"<br><br>
        Based on the method name, I think that means that the goal of the method is to check if the URI requires network access to reach.</p>`,
      comprehensibility: `<p>It's pretty easy to understand. \`isRemote\` and \`isFilesystemPath\` have pretty obvious meanings, and the \`scheme\` check later on is also simple enough. There are some subtleties here (how do we know that "jar" and "file" are the only URI schemes that are not remote? I think that's domain knowledge...), but overall the purpose is clear and easy to understand from the code's structure</p>`
    }
  ]
              
          },
          {
            id: 3,
            title: "Snippet 3",
            methodName:"isMachineTypeDefined",
            code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isMachineTypeDefined</span>(<span class="type">short</span> type) {
    <span class="keyword">if</span> (type == IMAGE_FILE_MACHINE_UNKNOWN) {
        <span class="comment">// Unsupported machine type</span>
        <span class="keyword">return</span> <span class="literal">false</span>;
    }
    <span class="keyword">for</span> (<span class="type">Field</span> field : CoffMachineType.<span class="function">class</span>.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Class.html#getDeclaredFields--')">getDeclaredFields</a>()) {
        <span class="keyword">if</span> (!field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#isSynthetic--')">isSynthetic</a>()) {
            <span class="type">int</span> modifiers = field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#getModifiers--')">getModifiers</a>();
            <span class="keyword">if</span> (<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Modifier.html#isFinal-int-')">Modifier.isFinal</a>(modifiers) && <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Modifier.html#isStatic-int-')">Modifier.isStatic</a>(modifiers)) {
                <span class="keyword">try</span> {
                    <span class="keyword">if</span> (field.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html#getShort-java.lang.Object-')">getShort</a>(<span class="literal">null</span>) == type) {
                        <span class="keyword">return</span> <span class="literal">true</span>;
                    }
                } <span class="keyword">catch</span> (<span class="type">IllegalAccessException</span> e) {
                    <span class="keyword">continue</span>;
                }
            }
        }
    }
    <span class="keyword">return</span> <span class="literal">false</span>;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Checks whether a given machine type is a CoffMachineType.</p>`,
      comprehensibility: `<p>Relatively hard due to unfamiliarity with CoffMachineType. Weird usage of getter with argument.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Verifies if machine type is defined and one of the CoffMachineType constants.</p>`,
      comprehensibility: `<p>Understandable via reflection, but unclear what a synthetic field is. Harder if unfamiliar with constants.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This snippet searches the fields of the \`CoffMachineType\` class for one whose \`getShort\` method returns a value equal to the input short. If any such value is found, the snippet returns true; otherwise, it returns false. It also returns false if the input matches a constant (\`IMAGE_FILE_MACHINE_UNKNOWN\`). These shorts seem to represent something specific, but it's not clear what from the snippet itself.</p>`,
      comprehensibility: `<p>The use of Java's reflective features to read the class literal of \`CoffMachineType\` is relatively complex, and makes it a bit hard to understand the purpose of the method. I also don't really understand what \`type\` is actually supposed to represent - it seems to be a fake enumeration of some kind, but the actual specification can't be discerned from what we can see. So, I think this snippet is fairly difficult to understand.</p>`
    }
  ]
            
          },
          {
            id: 4,
            title: "Snippet 4",
            methodName:"indexOfIgnoreCase",
code: `<span class="keyword">public static</span> <span class="type">int</span> <span class="function">indexOfIgnoreCase</span>(<span class="type">CharSequence</span> str, <span class="type">CharSequence</span> searchStr, <span class="type">int</span> startPos) {
    <span class="keyword">if</span> (str == <span class="literal">null</span> || searchStr == <span class="literal">null</span>) {
        <span class="keyword">return</span> INDEX_NOT_FOUND;
    }
    <span class="keyword">if</span> (startPos < <span class="number">0</span>) {
        startPos = <span class="number">0</span>;
    }
    <span class="type">int</span> searchStrLen = searchStr.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>();
    <span class="type">int</span> endLimit = str.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>() - searchStrLen + <span class="number">1</span>;
    <span class="keyword">if</span> (startPos > endLimit) {
        <span class="keyword">return</span> INDEX_NOT_FOUND;
    }
    <span class="keyword">if</span> (searchStrLen == <span class="number">0</span>) {
        <span class="keyword">return</span> startPos;
    }
    <span class="keyword">for</span> (<span class="type">int</span> i = startPos; i < endLimit; i++) {
        <span class="keyword">if</span> (<span class="function">regionMatches</span>(str, <span class="literal">true</span>, i, searchStr, <span class="number">0</span>, searchStrLen)) {
            <span class="keyword">return</span> i;
        }
    }
    <span class="keyword">return</span> INDEX_NOT_FOUND;
}`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Finds the starting position of a query string inside a string, starting from a given index.</p>`,
      comprehensibility: `<p>Clear identifiers and simple conditionals make it easier.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Searches for searchStr in str from startPos using case-insensitive comparison.</p>`,
      comprehensibility: `<p>Harder due to unfamiliarity with regionMatches; identifiers help.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This snippet searches a given string for a substring that matches a "search string", starting at a fixed start position and going to the end. If it finds such a substring, it returns the index where it starts; if not, it returns the \`INDEX_NOT_FOUND\` constant. The \`startPos\` is assumed to be zero if a negative \`startPos\` is provided.<br><br>The name suggests that it ignores case, but I don't see anything in the logic that obviously implements that part. However, the \`true\` being passed to \`regionMatches\` isn't explained at all, so that might control it?</p>`,
      comprehensibility: `<p>The structure is mostly easy to follow: there is some validation logic (lines 2 to 15) followed by the main search (lines 16–18). This method is basically a wrapper around \`regionMatches\`, which I'm not intimately familiar with. However, I gather just from looking at how it's used here that it 1) takes a surprisingly large number of parameters, and 2) doesn't check that its parameters are valid. That suggests that it's an optimized implementation, and so this wrapper exists to make sure that it's not misused. The validation logic is easy to understand, but figuring out <em>why</em> is a bit trickier: I had to do some thinking about why \`regionMatches\` is being called the way that it is.</p>`
    }
  ]
  
          },              
          {
            id: 5,
            title: "Snippet 5",
            methodName:"deleteRecursively",
            code: `
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">deleteRecursively</span>(@Nullable <span class="type">Path</span> root) <span class="keyword">throws</span> <span class="type">IOException</span> {
    <span class="keyword">if</span> (root == <span class="literal">null</span>) <span class="keyword">return</span> <span class="literal">false</span>;
    <span class="keyword">if</span> (!<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#exists-java.nio.file.Path-java.nio.file.LinkOption...-')">Files.exists</a>(root)) <span class="keyword">return</span> <span class="literal">false</span>;

    <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#walkFileTree-java.nio.file.Path-java.nio.file.FileVisitor-')">Files.walkFileTree</a>(root, <span class="keyword">new</span> <span class="type">SimpleFileVisitor</span>&lt;&gt;() {
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">visitFile</span>(<span class="type">Path</span> file, <span class="type">BasicFileAttributes</span> attrs) <span class="keyword">throws</span> <span class="type">IOException</span> {
            <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#delete-java.nio.file.Path-')">Files.delete</a>(file);
            <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">postVisitDirectory</span>(<span class="type">Path</span> dir, <span class="type">IOException</span> exc) <span class="keyword">throws</span> <span class="type">IOException</span> {
            <a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/nio/file/Files.html#delete-java.nio.file.Path-')">Files.delete</a>(dir);
            <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
    });

    <span class="keyword">return</span> <span class="literal">true</span>;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Recursively deletes all files and directories under a given root path.</p>`,
      comprehensibility: `<p>Harder due to unclear postVisitDirectory. Assumes dir is Path object passed from FileVisitor.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Recursively deletes a path using a visitor. Returns true if successful.</p>`,
      comprehensibility: `<p>Easy; familiar with visitor pattern; identifiers help clarify.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This snippet implements recursive deletion with force (\`rm -rf\`) on the input \`Path\`. It returns true if the root is nonnull and exists, regardless of the outcome of the deletion.</p>`,
      comprehensibility: `<p>This was easy <em>for me</em> to understand, but it required domain-specific knowledge of how Java handles file system operations that I <em>do</em> have: I immediately recognized the structure of the \`walkFileTree\` call with the anonymous visitor, and knew that I only needed to look at the names of the overridden methods and their bodies (i.e., lines 8 and 13) to figure out what the method does.</p>`
    }
  ]              
      },
      {
        id: 6,
        title: "Snippet 6",
        methodName:"encodedLength",
        code: `
<span class="keyword">public static</span> <span class="type">int</span> <span class="function">encodedLength</span>(<span class="type">CharSequence</span> sequence) {
    <span class="comment">// Optimized implementation</span>
    <span class="type">int</span> utf16Length = sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#length--')">length</a>();
    <span class="type">int</span> utf8Length = utf16Length;
    <span class="type">int</span> i = <span class="number">0</span>;

    <span class="keyword">while</span> (i < utf16Length && sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#charAt-int-')">charAt</a>(i) < <span class="literal">0x80</span>) {
        i++;
    }

    <span class="keyword">for</span> (; i < utf16Length; i++) {
        <span class="type">char</span> c = sequence.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html#charAt-int-')">charAt</a>(i);
        <span class="keyword">if</span> (c < <span class="literal">0x800</span>) {
            utf8Length += ((<span class="literal">0x7f</span> - c) >>> <span class="number">31</span>);
        } <span class="keyword">else</span> {
            utf8Length += <span class="function">encodedLengthGeneral</span>(sequence, i);
            <span class="keyword">break</span>;
        }
    }

    <span class="keyword">if</span> (utf8Length < utf16Length) {
        <span class="keyword">throw new</span> <span class="type">IllegalArgumentException</span>(
            <span class="string">"UTF-8 length does not fit in int: "</span> + (utf8Length + (<span class="literal">1L</span> << <span class="number">32</span>)));
    }

    <span class="keyword">return</span> utf8Length;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Returns UTF-8 encoded length of a character sequence.</p>`,
      comprehensibility: `<p>Easy to follow due to identifier names and separated logic.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Calculates UTF8 length of a sequence.</p>`,
      comprehensibility: `<p>Hard due to encoding/bits; needed to Google concepts.</p>`
    }, 
    {
      id: 3,
      participant: "Martin",
      summary: `<p>This snippet seems to be an optimized implementation of computing the length of a character sequence if it were to be represented as UTF-8. It also contains a check for overflow that causes it to fail if the resulting answer doesn't make sense, that enforces the following invariant: UTF-8 lengths are always longer than or equal to UTF-16 lengths (which is assumed to be the input encoding).</p>`,
      comprehensibility: `<p>This snippet is a bit tricky for me to understand, because it requires some domain knowledge of UTF-8 vs UTF-16 that I don't have, and because it performs some operations that are tough to decipher based on that domain knowledge (e.g., the shift on line 14). That said, the <em>overall</em> purpose is pretty clear. But, I am not confident that I understand <em>why</em> each line must be the way that it is: I would need to go have a look at the difference between how Java represents UTF-8 vs UTF-16 encodings to actually understand this code line-by-line.</p>`
    }
  ]         
      },
      {
        id: 7,
        title: "Snippet 7",
        methodName:"lowestPositiveRoot",
        code: `
<span class="keyword">public static</span> <span class="type">float</span> <span class="function">lowestPositiveRoot</span>(<span class="type">float</span> a, <span class="type">float</span> b, <span class="type">float</span> c) {
    <span class="type">float</span> det = b * b - <span class="number">4</span> * a * c;
    <span class="keyword">if</span> (det < <span class="number">0</span>) <span class="keyword">return</span> <span class="type">Float</span>.NaN;

    <span class="type">float</span> sqrtD = (<span class="type">float</span>)<span class="type">Math</span>.<a href="#" class="standard-method function" onclick="openJavadocModal('https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html#sqrt-double-')">sqrt</a>(det);
    <span class="type">float</span> invA = <span class="number">1</span> / (<span class="number">2</span> * a);
    <span class="type">float</span> r1 = (-b - sqrtD) * invA;
    <span class="type">float</span> r2 = (-b + sqrtD) * invA;

    <span class="keyword">if</span> (r1 > r2) {
        <span class="type">float</span> tmp = r2;
        r2 = r1;
        r1 = tmp;
    }

    <span class="keyword">if</span> (r1 > <span class="number">0</span>) <span class="keyword">return</span> r1;
    <span class="keyword">if</span> (r2 > <span class="number">0</span>) <span class="keyword">return</span> r2;
    <span class="keyword">return</span> <span class="type">Float</span>.NaN;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Takes three floats and returns the lowest positive root.</p>`,
      comprehensibility: `<p>Misleading method name; unclear logic despite trying dummy values.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Uses quadratic formula to return smallest positive root.</p>`,
      comprehensibility: `<p>Easy after remembering formula; logic is clear with basic math review.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>Quadratic formula; returns \`Float.NaN\` if it fails. If there are two roots, only returns the positive one. If both roots are positive, it returns the smaller of the two.</p>`,
      comprehensibility: `<p>The snippet calls back to grade school math pretty aggressively (e.g., through naming its parameters \`a\`, \`b\`, and \`c\`), and that makes it easier to understand the overall purpose by recognizing the quadratic formula. The swap block (lines 10–14) is also an easily-recognizable pattern to swap via a temporary variable. Overall, then, this is a relatively straightfor</p>`
    }
  ]
          
      },
      {
        id: 8,
        title: "Snippet 8",
        methodName:"atan2",
        code: `
<span class="keyword">public static</span> <span class="type">float</span> <span class="function">atan2</span>(<span class="type">float</span> y, <span class="type">float</span> x) {
    <span class="type">float</span> n = y / x;

    <span class="keyword">if</span> (n != n)
        n = (y == x ? <span class="number">1f</span> : <span class="number">-1f</span>);
    <span class="keyword">else if</span> (n - n != n - n)
        x = <span class="number">0f</span>;

    <span class="keyword">if</span> (x > <span class="number">0</span>)
        <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n);
    <span class="keyword">else if</span> (x < <span class="number">0</span>) {
        <span class="keyword">if</span> (y >= <span class="number">0</span>) <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n) + PI;
        <span class="keyword">return</span> <span class="function">atanUnchecked</span>(n) - PI;
    } <span class="keyword">else if</span> (y > <span class="number">0</span>)
        <span class="keyword">return</span> x + HALF_PI;
    <span class="keyword">else if</span> (y < <span class="number">0</span>)
        <span class="keyword">return</span> x - HALF_PI;

    <span class="keyword">return</span> x + y;
}
`, responses: [
    {
      id: 1,
      participant: "Nadeeshan",
      summary: `<p>Computes the arctangent (atan) of two float inputs.</p>`,
      comprehensibility: `<p>Difficult due to math background required and unclear method purpose.</p>`
    },
    {
      id: 2,
      participant: "Oscar",
      summary: `<p>Possibly computes arctangent of x and y using trig functions.</p>`,
      comprehensibility: `<p>Cryptic math logic; doesn’t recall arctangent well.</p>`
    },
    {
      id: 3,
      participant: "Martin",
      summary: `<p>An implementation of some trigonometric function of x and y? Pretty tough for me to reason about what it's doing, given that I last thought about this kind of trigonometry in like 10th grade. There's some kind of floating point defense going on at the beginning (\`n != n\`? wtf), which I think is there to deal with the singularity when \`x\` is near zero.</p>`,
      comprehensibility: `<p>This snippet is hard to understand. It does some floating point singularity defense (hard to understand unless you're intimately familiar with numerical methods!) in lines 4–7, followed by some kind of trigonometric math in lines 9–19. Its purpose isn't even clear to me, because I don't remember how atan actually works (trig was a long time ago!) or the relevant identities (why is it adding or subtracting pi or pi/2? I don't know). In other words, this snippet requires two kinds of domain-specific expertise to understand that I don't have: numerical methods for floating point and trigonometry.</p>`
    }
  ]
          
      }
    ];
  

