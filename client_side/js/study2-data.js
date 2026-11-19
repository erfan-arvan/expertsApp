/*
 * Study 2 snippets and questions (DRAFT: taken from the IRB protocol appendix; not final).
 *
 * How to edit:
 *  - Write code as plain Java text; the page adds highlighting and line numbers.
 *  - Each snippet has two versions, "A" and "B". Which of them is the high- or
 *    low-verifiability version is recorded ONLY in ServerApp/study2-version-key.json,
 *    never here, so participants cannot tell from the page source.
 *  - "javadoc" maps a method name (or "Receiver.method") to a Javadoc URL; calls to
 *    that method in the code become clickable links.
 *  - Snippet ids must stay stable once data collection starts, and must match the
 *    ids in ServerApp/study2-version-key.json.
 *  - Bump STUDY2_DATA_VERSION whenever snippets or questions change; it is saved
 *    with every submission.
 */

const STUDY2_DATA_VERSION = 'draft-2026-11-18';

const JD = 'https://docs.oracle.com/javase/8/docs/api/';
const JD_STRING = {
  equals: JD + 'java/lang/String.html#equals-java.lang.Object-',
  isEmpty: JD + 'java/lang/String.html#isEmpty--',
  lastIndexOf: JD + 'java/lang/String.html#lastIndexOf-int-',
  indexOf: JD + 'java/lang/String.html#indexOf-int-',
  length: JD + 'java/lang/String.html#length--',
  charAt: JD + 'java/lang/String.html#charAt-int-',
  startsWith: JD + 'java/lang/String.html#startsWith-java.lang.String-',
  endsWith: JD + 'java/lang/String.html#endsWith-java.lang.String-',
  substring: JD + 'java/lang/String.html#substring-int-int-'
};

// Practice snippet: the sample method from the first study (with Math.min, so the
// tutorial has a Javadoc link to show); same interface as the real tasks; not analyzed.
const STUDY2_PRACTICE = {
  id: 'practice',
  code: `
public static int addPositive(int a, int b) {
  if (Math.min(a, b) < 0) {
    return -1;
  }
  return a + b;
}`,
  question: {
    text: 'What value does the method return when called with addPositive(3, -2)?',
    assumptions: [
      'Here might be some extra information about the snippet.',
      'For example, clarifying assumptions.'
    ]
  },
  expectedAnswer: '-1',
  javadoc: {
    'Math.min': JD + 'java/lang/Math.html#min-int-int-'
  }
};

const STUDY2_SNIPPETS = [
  {
    id: 's1',
    methodName: 'isMatchGlobPattern',
    versions: {
      A: `
public static boolean isMatchGlobPattern(String pattern, String value) {
    if ("*".equals(pattern)) {
        return true;
    }
    if (pattern == null || pattern.isEmpty()) {
        return value == null || value.isEmpty();
    }
    if (value == null || value.isEmpty()) {
        return false;
    }

    int i = pattern.lastIndexOf('*');
    // doesn't find "*"
    if (i == -1) {
        return value.equals(pattern);
    }
    // "*" is at the end
    else if (i == pattern.length() - 1) {
        return value.startsWith(pattern.substring(0, i));
    }
    // "*" is at the beginning
    else if (i == 0) {
        return value.endsWith(pattern.substring(i + 1));
    }
    // "*" is in the middle
    else {
        String prefix = pattern.substring(0, i);
        String suffix = pattern.substring(i + 1);
        return value.startsWith(prefix) && value.endsWith(suffix);
    }
}`,
      B: `
public static boolean isMatchGlobPattern(String pattern, String value) {
    if ("*".equals(pattern)) {
        return true;
    }
    if (StringUtils.isEmpty(pattern) && StringUtils.isEmpty(value)) {
        return true;
    }
    if (StringUtils.isEmpty(pattern) || StringUtils.isEmpty(value)) {
        return false;
    }

    int i = pattern.lastIndexOf('*');
    // doesn't find "*"
    if (i == -1) {
        return value.equals(pattern);
    }
    // "*" is at the end
    else if (i == pattern.length() - 1) {
        return value.startsWith(pattern.substring(0, i));
    }
    // "*" is at the beginning
    else if (i == 0) {
        return value.endsWith(pattern.substring(i + 1));
    }
    // "*" is in the middle
    else {
        String prefix = pattern.substring(0, i);
        String suffix = pattern.substring(i + 1);
        return value.startsWith(prefix) && value.endsWith(suffix);
    }
}`
    },
    question: {
      text: 'What value does the method return when called with pattern = "get*Name" and value = "getUserId"?',
      assumptions: []
    },
    javadoc: {
      ...JD_STRING,
      'StringUtils.isEmpty': 'https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html#isEmpty(java.lang.CharSequence)'
    }
  },
  {
    id: 's2',
    methodName: 'getFlags',
    versions: {
      A: `
public final static List<String> getFlags(int flags) {
    List<String> list = new ArrayList<>();
    Field[] fields = MachHeaderFlags.class.getDeclaredFields();
    for (Field field : fields) {
        if (field.getName().startsWith("MH_")) {
            try {
                Integer value = (Integer) field.get(null);
                if ((flags & value) != 0) {
                    list.add(field.getName().substring("MH_".length()));
                }
            }
            catch (Exception e) {
                // do nothing
            }
        }
    }
    return list;
}`,
      B: `
public final static List<String> getFlags(int flags) {
    List<String> list = new ArrayList<>();
    Field[] fields = MachHeaderFlags.class.getDeclaredFields();
    for (Field field : fields) {
        String name = field.getName();
        if (name.startsWith("MH_")) {
            try {
                Integer value = (Integer) field.get(null);
                if ((flags & value) != 0) {
                    list.add(name.substring("MH_".length()));
                }
            }
            catch (Exception e) {
                // do nothing
            }
        }
    }
    return list;
}`
    },
    question: {
      text: 'What value does the method return when called with flags = 5?',
      assumptions: [
        'MachHeaderFlags declares exactly three fields, all public static final int: MH_NOUNDEFS = 0x1, MH_INCRLINK = 0x2, and MH_DYLDLINK = 0x4',
        'getDeclaredFields() returns the fields in this order',
        'No exceptions are thrown'
      ]
    },
    javadoc: {
      startsWith: JD_STRING.startsWith,
      substring: JD + 'java/lang/String.html#substring-int-',
      length: JD_STRING.length,
      getDeclaredFields: JD + 'java/lang/Class.html#getDeclaredFields--',
      getName: JD + 'java/lang/reflect/Field.html#getName--',
      get: JD + 'java/lang/reflect/Field.html#get-java.lang.Object-',
      add: JD + 'java/util/List.html#add-E-'
    }
  },
  {
    id: 's3',
    methodName: 'getFormatedInstructionObjects',
    versions: {
      A: `
private static String[] getFormatedInstructionObjects(Object[] objs) {
    if (objs == null) {
        return null;
    }
    HashSet<String> set = new HashSet<String>();
    for (Object element : objs) {
        if (element instanceof Scalar) {
            Scalar scalar = (Scalar) element;
            set.add("const:" + scalar.toString());
        }
        else if (element instanceof Register) {
            Register reg = (Register) element;
            set.add(reg.toString());
        }
        else if (element instanceof Address) {
            Address addr = (Address) element;
            set.add(addr.toString(true));
        }
    }
    String[] list = set.toArray(new String[set.size()]);
    Arrays.sort(list, OBJSTRING_COMPARATOR);
    return list;
}`,
      B: `
private static String[] getFormatedInstructionObjects(Object[] objs) {
    if (objs == null) {
        return null;
    }
    HashSet<String> set = new HashSet<String>();
    for (Object element : objs) {
        if (element instanceof Scalar) {
            Scalar scalar = (Scalar) element;
            set.add("const:" + scalar.toString());
        }
        else if (element instanceof Register) {
            Register reg = (Register) element;
            set.add(reg.toString());
        }
        else if (element instanceof Address) {
            Address addr = (Address) element;
            set.add(addr.toString(true));
        }
    }
    String[] list = new String[set.size()];
    set.toArray(list);
    Arrays.sort(list, OBJSTRING_COMPARATOR);
    return list;
}`
    },
    question: {
      text: 'What value does the method return when called with objs = { s, r, a }, where s is a Scalar, r is a Register, and a is an Address?',
      assumptions: [
        's.toString() returns "0x10"',
        'r.toString() returns "EAX"',
        'a.toString(true) returns "ram:00401000"',
        'OBJSTRING_COMPARATOR orders strings the same way as String.compareTo'
      ]
    },
    javadoc: {
      add: JD + 'java/util/HashSet.html#add-E-',
      size: JD + 'java/util/HashSet.html#size--',
      toArray: JD + 'java/util/AbstractCollection.html#toArray-T:A-',
      'Arrays.sort': JD + 'java/util/Arrays.html#sort-T:A-java.util.Comparator-'
    }
  },
  {
    id: 's4',
    methodName: 'fetchAllStoredFileGroups',
    versions: {
      A: `
@Override
Stream<HoodieFileGroup> fetchAllStoredFileGroups(String partition) {
  List<HoodieFileGroup> fileGroups = partitionToFileGroupsMap.get(partition);
  if (fileGroups == null || fileGroups.isEmpty()) {
    LOG.warn("Partition: {} is not available in store", partition);
    return Stream.empty();
  }
  return new ArrayList<>(partitionToFileGroupsMap.get(partition)).stream();
}`,
      B: `
@Override
Stream<HoodieFileGroup> fetchAllStoredFileGroups(String partition) {
  List<HoodieFileGroup> fileGroups = partitionToFileGroupsMap.get(partition);
  if (fileGroups == null || fileGroups.isEmpty()) {
    LOG.warn("Partition: {} is not available in store", partition);
    return Stream.empty();
  }
  return new ArrayList<>(fileGroups).stream();
}`
    },
    question: {
      text: 'What value does the method return when called with partition = "2026/01"?',
      assumptions: [
        'partitionToFileGroupsMap maps "2026/01" to a list containing two file groups, fg1 and fg2, in that order',
        'No other thread modifies partitionToFileGroupsMap while the method runs'
      ]
    },
    javadoc: {
      get: JD + 'java/util/Map.html#get-java.lang.Object-',
      isEmpty: JD + 'java/util/List.html#isEmpty--',
      'Stream.empty': JD + 'java/util/stream/Stream.html#empty--',
      stream: JD + 'java/util/Collection.html#stream--'
    }
  },
  {
    id: 's5',
    methodName: 'collectBounds',
    versions: {
      A: `
default Object[] collectBounds(B box) {
    List<Dimension<?, P, B>> dims = getDimensions();
    Object[] result = new Object[dims.size() * 2];
    Iterator<Dimension<?, P, B>> it = dims.iterator();
    for (int j = 0; j + 1 < result.length; j += 2) {
        Dimension<?, P, B> d = it.next();
        result[j] = d.lower(box);
        result[j + 1] = d.upper(box);
    }
    return result;
}`,
      B: `
default Object[] collectBounds(B box) {
    List<Dimension<?, P, B>> dims = getDimensions();
    Object[] result = new Object[dims.size() * 2];
    for (int i = 0; i < dims.size(); i++) {
        Dimension<?, P, B> d = dims.get(i);
        result[i * 2] = d.lower(box);
        result[i * 2 + 1] = d.upper(box);
    }
    return result;
}`
    },
    question: {
      text: 'What value does the method return when called with box = b?',
      assumptions: [
        'getDimensions() returns a list of two dimensions, x and y, in that order',
        'x.lower(b) returns 0 and x.upper(b) returns 10',
        'y.lower(b) returns 5 and y.upper(b) returns 20'
      ]
    },
    javadoc: {
      size: JD + 'java/util/List.html#size--',
      get: JD + 'java/util/List.html#get-int-',
      iterator: JD + 'java/util/List.html#iterator--',
      next: JD + 'java/util/Iterator.html#next--'
    }
  }
];

window.STUDY2_DATA_VERSION = STUDY2_DATA_VERSION;
window.STUDY2_PRACTICE = STUDY2_PRACTICE;
window.STUDY2_SNIPPETS = STUDY2_SNIPPETS;
