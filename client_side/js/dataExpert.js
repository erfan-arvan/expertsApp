const snippets = [
    {
      id: 1,
      title: "Snippet 1",
              code:`
<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isValidProjectName</span>(<span class="type">String</span> name) {
      <span class="keyword">if</span> (name == <span class="literal">null</span>) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">if</span> (name.<span class="function">startsWith</span>(<span class="string">"."</span>)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">if</span> ((name.<span class="function">length</span>() < <span class="number">1</span>) || (name.<span class="function">length</span>() > MAX_NAME_LENGTH)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">for</span> (<span class="type">int</span> i = <span class="number">0</span>; i < name.<span class="function">length</span>(); i++) {
        <span class="type">char</span> c = name.<span class="function">charAt</span>(i);
        <span class="keyword">if</span> (!Character.<span class="function">isLetterOrDigit</span>(c) && !VALID_NAME_SET.<span class="function">contains</span>(c)) {
          <span class="keyword">return</span> <span class="literal">false</span>;
        }
      }
      <span class="keyword">return</span> <span class="literal">true</span>;
    }
      `
          },
          {
            id: 2,
            title: "Snippet 2",
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isRemote</span>(<span class="type">URI</span> uri) {
      <span class="keyword">if</span> (<span class="function">isFilesystemPath</span>(uri)) {
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="type">String</span> scheme = uri.<span class="function">getScheme</span>();
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
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">isMachineTypeDefined</span>(<span class="type">short</span> type) {
      <span class="keyword">if</span> (type == IMAGE_FILE_MACHINE_UNKNOWN) {
        <span class="comment">// Unsupported machine type</span>
        <span class="keyword">return</span> <span class="literal">false</span>;
      }
      <span class="keyword">for</span> (<span class="type">Field</span> field : CoffMachineType.<span class="function">class</span>.<span class="function">getDeclaredFields</span>()) {
        <span class="keyword">if</span> (!field.<span class="function">isSynthetic</span>()) {
          <span class="type">int</span> modifiers = field.<span class="function">getModifiers</span>();
          <span class="keyword">if</span> (<span class="function">Modifier.isFinal</span>(modifiers) && <span class="function">Modifier.isStatic</span>(modifiers)) {
            <span class="keyword">try</span> {
              <span class="keyword">if</span> (field.<span class="function">getShort</span>(<span class="literal">null</span>) == type) {
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
      <span class="type">int</span> searchStrLen = searchStr.<span class="function">length</span>();
      <span class="type">int</span> endLimit = str.<span class="function">length</span>() - searchStrLen + <span class="number">1</span>;
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
    }
    `
          },
          {
            id: 5,
            title: "Snippet 5",
            code: `<span class="keyword">public static</span> <span class="type">boolean</span> <span class="function">deleteRecursively</span>(@Nullable <span class="type">Path</span> root) <span class="keyword">throws</span> <span class="type">IOException</span> {
      <span class="keyword">if</span> (root == <span class="literal">null</span>) <span class="keyword">return</span> <span class="literal">false</span>;
      <span class="keyword">if</span> (!Files.<span class="function">exists</span>(root)) <span class="keyword">return</span> <span class="literal">false</span>;

      Files.<span class="function">walkFileTree</span>(root, <span class="keyword">new</span> <span class="type">SimpleFileVisitor</span>&lt;&gt;() {
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">visitFile</span>(<span class="type">Path</span> file, <span class="type">BasicFileAttributes</span> attrs) <span class="keyword">throws</span> <span class="type">IOException</span> {
          Files.<span class="function">delete</span>(file);
          <span class="keyword">return</span> FileVisitResult.CONTINUE;
        }
        @Override
        <span class="keyword">public</span> <span class="type">FileVisitResult</span> <span class="function">postVisitDirectory</span>(<span class="type">Path</span> dir, <span class="type">IOException</span> exc) <span class="keyword">throws</span> <span class="type">IOException</span> {
          Files.<span class="function">delete</span>(dir);
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
        code: `<span class="keyword">public static</span> <span class="type">int</span> <span class="function">encodedLength</span>(<span class="type">CharSequence</span> sequence) {
  <span class="comment">// Optimized implementation</span>
  <span class="type">int</span> utf16Length = sequence.<span class="function">length</span>();
  <span class="type">int</span> utf8Length = utf16Length;
  <span class="type">int</span> i = <span class="number">0</span>;

  <span class="keyword">while</span> (i < utf16Length && sequence.<span class="function">charAt</span>(i) < <span class="literal">0x80</span>) {
    i++;
  }

  <span class="keyword">for</span> (; i < utf16Length; i++) {
    <span class="type">char</span> c = sequence.<span class="function">charAt</span>(i);
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
        code: `<span class="keyword">public static</span> <span class="type">float</span> <span class="function">lowestPositiveRoot</span>(<span class="type">float</span> a, <span class="type">float</span> b, <span class="type">float</span> c) {
  <span class="type">float</span> det = b * b - <span class="number">4</span> * a * c;
  <span class="keyword">if</span> (det < <span class="number">0</span>) <span class="keyword">return</span> <span class="type">Float</span>.NaN;

  <span class="type">float</span> sqrtD = (<span class="type">float</span>)<span class="type">Math</span>.<span class="function">sqrt</span>(det);
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
        code: `<span class="keyword">public static</span> <span class="type">float</span> <span class="function">atan2</span>(<span class="type">float</span> y, <span class="type">float</span> x) {
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