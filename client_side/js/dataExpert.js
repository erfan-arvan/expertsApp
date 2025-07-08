const snippets = [
    {
      id: 1,
      title: "Snippet 1",
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
    },
    {
      id: 4,
      participant: "ChatGPT",
      summary: `<p>This method, isValidProjectName, checks whether a given string is a valid project name based on several criteria:<br><br>
              It must not be null.<br>
              It must not start with a dot (.).<br>
              Its length must be between 1 and a maximum defined by MAX_NAME_LENGTH.<br>
              Every character in the name must be either a letter, digit, or a member of the VALID_NAME_SET.<br><br>
              If all these conditions are met, it returns true; otherwise, it returns false.</p>`,
      comprehensibility: `<p>This snippet is easy to understand due to the following factors:<br><br>
              Descriptive naming: The method name isValidProjectName clearly conveys its purpose.<br>
              Straightforward logic: The checks are simple, sequential, and follow an intuitive order of validation (null check → format check → length check → character check).<br>
              Readable structure: Each condition is isolated in a separate if block, avoiding nesting and making the logic easy to follow.<br>
              Familiar constructs: Uses standard Java constructs and well-known classes like Character.</p>`
    }
  ]
  
          },
          {
            id: 2,
            title: "Snippet 2",
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
`            
          },
          {
            id: 3,
            title: "Snippet 3",
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
`            
          },
          {
            id: 4,
            title: "Snippet 4",
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
}`
          },              
          {
            id: 5,
            title: "Snippet 5",
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
`            
      },
      {
        id: 6,
        title: "Snippet 6",
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
`        
      },
      {
        id: 7,
        title: "Snippet 7",
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
`        
      },
      {
        id: 8,
        title: "Snippet 8",
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
`        
      }
    ];
  