import { ProgrammingLanguageTrack, CodeLesson } from '../types';
import { ADDITIONAL_PROGRAMMING_TRACKS } from './additionalProgrammingTracks';
import { EXPANDED_PYTHON_LESSONS } from './expandedLessonsPython';
import { EXPANDED_TYPESCRIPT_LESSONS } from './expandedLessonsTypeScript';
import { EXPANDED_CPP_LESSONS } from './expandedLessonsCpp';
import { EXPANDED_RUST_LESSONS } from './expandedLessonsRust';
import { EXPANDED_GO_LESSONS } from './expandedLessonsGo';
import { EXPANDED_JAVA_LESSONS } from './expandedLessonsJava';
import { EXPANDED_CSHARP_LESSONS } from './expandedLessonsCSharp';
import { EXPANDED_KOTLIN_LESSONS } from './expandedLessonsKotlin';

const CORE_PROGRAMMING_TRACKS: ProgrammingLanguageTrack[] = [
  // 1. PYTHON TRACK
  {
    id: 'track-python',
    name: 'Python 3',
    slug: 'python',
    icon: '🐍',
    color: 'from-emerald-500 to-teal-700',
    badge: 'Enterprise Python',
    tagline: 'From zero syntax to high-throughput asynchronous architectures and CPython bytecode.',
    description: 'A comprehensive, multi-tiered curriculum guiding developers from foundational syntax to memory allocators, generators, metaclasses, and GIL-free concurrent pipelines.',
    totalModules: 9,
    estimatedHours: 18,
    videoCourse: {
      title: 'Python 3 Complete Engineering Masterclass: Zero to AsyncIO',
      youtubeId: 'rfscVS0vtbw',
      instructor: 'freeCodeCamp.org & Dr. Chuck',
      duration: '4h 26m',
      channel: 'freeCodeCamp.org',
      description: 'Comprehensive engineering walkthrough covering Python runtime primitives, object references, memory allocators, structural pattern matching, generators, and AsyncIO concurrency.',
      chapters: [
        { title: 'Python Architecture & REPL Environment', timestamp: '00:00', seconds: 0 },
        { title: 'Dynamic Variables & Memory References', timestamp: '15:40', seconds: 940 },
        { title: 'Control Flow, Pattern Matching & Comprehensions', timestamp: '45:10', seconds: 2710 },
        { title: 'Object-Oriented Design & Metaclasses', timestamp: '1:20:15', seconds: 4815 },
        { title: 'Generators, Iterators & Memory Profiling', timestamp: '2:15:30', seconds: 8130 },
        { title: 'AsyncIO Event Loops & Non-Blocking I/O', timestamp: '3:20:00', seconds: 12000 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Foundational Scratch',
        description: 'Variables, dynamic typing, control structures, list comprehensions, and pure functions.',
        lessons: [
          {
            id: 'py-scratch-1',
            title: '1. Dynamic Types, References & Namespaces',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Understand variables as named tags bound to heap objects, mutability vs immutability, and id() introspection.',
            concepts: ['Variable references vs values', 'Object identity (is vs ==)', 'Immutable types (int, str, tuple)', 'Mutable types (list, dict, set)'],
            starterCode: `# Inspecting object identity and mutability
a = [1, 2, 3]
b = a
b.append(4)
print(f"a: {a}")
print(f"Are a and b the same object? {a is b}")
print(f"Memory id of a: {hex(id(a))}")
print(f"Memory id of b: {hex(id(b))}")`,
            expectedOutput: 'a: [1, 2, 3, 4]\nAre a and b the same object? True',
            explanation: 'In Python, variables do not store values directly; they store pointers to PyObject instances in heap memory. Modifying a mutable object through reference "b" alters "a" identically.',
            youtubeVideoId: 'rfscVS0vtbw',
            bugChallenge: {
              title: 'The Default Mutable Argument Trap',
              description: 'Find why calling append_item("task") multiple times produces unexpected shared state across distinct calls.',
              buggyCode: `def append_item(item, target_list=[]):\n    target_list.append(item)\n    return target_list\n\nprint(append_item("apple"))\nprint(append_item("banana")) # BUG: prints ['apple', 'banana']!`,
              fixOptions: [
                'Change target_list=None and initialize target_list = [] inside the function if None',
                'Add global target_list at the top of the function',
                'Use target_list=list() in the parameter signature',
                'Pass a tuple instead of a list'
              ],
              correctOptionIndex: 0,
              explanation: 'Default parameter expressions in Python are evaluated once at function definition time, NOT at call time. A mutable default like [] persists across calls. The standard fix is target_list=None with target_list = [] inside.',
              xpReward: 75
            }
          },
          {
            id: 'py-scratch-2',
            title: '2. Control Flow, Pattern Matching & Comprehensions',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'Modern Python 3.10+ structural pattern matching (match-case), ternary expressions, and dictionary comprehensions.',
            concepts: ['Structural pattern matching', 'List, dict, and set comprehensions', 'Short-circuit boolean logic', 'Walrus operator (:=)'],
            starterCode: `def process_command(cmd):
    match cmd.split():
        case ["quit" | "exit"]:
            return "Terminating runtime"
        case ["load", filename]:
            return f"Reading {filename}"
        case ["move", x, y] if int(x) > 0 and int(y) > 0:
            return f"Moving to quadrant I ({x}, {y})"
        case _:
            return "Unrecognized directive"

print(process_command("move 10 25"))
print(process_command("load config.json"))`,
            expectedOutput: 'Moving to quadrant I (10, 25)\nReading config.json',
            explanation: 'Structural pattern matching performs destructuring, type inspection, and conditional guard clauses in a single expressive syntax.'
          },
          {
            id: 'py-scratch-3',
            title: '3. Functions, Closures & *args / **kwargs',
            level: 'scratch',
            durationMinutes: 30,
            summary: 'First-class functions, lexical scoping, closure environments, and positional-only arguments.',
            concepts: ['LEGB scoping rule', 'Closures & __closure__ cells', 'Unpacking operators (*, **)', 'Keyword-only parameters (*)'],
            starterCode: `def make_multiplier(factor: int):
    # 'factor' is captured inside the inner closure cell
    def multiplier(val: int) -> int:
        return val * factor
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)
print(f"Double 21: {double(21)}")
print(f"Triple 14: {triple(14)}")
print(f"Closure cells: {double.__closure__[0].cell_contents}")`,
            expectedOutput: 'Double 21: 42\nTriple 14: 42\nClosure cells: 2',
            explanation: 'Inner functions retain a reference to variables in their enclosing lexical scope via cell objects, even after the parent function has exited.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Systems',
        description: 'Object-oriented protocols, dunder methods, generators, context managers, and custom decorators.',
        lessons: [
          {
            id: 'py-inter-1',
            title: '4. The Python Data Model & Dunder Protocols',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Harness Python special methods (__len__, __getitem__, __repr__, __eq__) to create idiomatic classes.',
            concepts: ['Sequence protocol', 'Equality vs Hashing (__hash__)', 'String representations (__str__ vs __repr__)', 'Operator overloading'],
            starterCode: `class Vector2D:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Vector2D(x={self.x}, y={self.y})"

    def __add__(self, other: 'Vector2D') -> 'Vector2D':
        return Vector2D(self.x + other.x, self.y + other.y)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector2D):
            return NotImplemented
        return self.x == other.x and self.y == other.y

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)
v3 = v1 + v2
print(f"Result: {v3}")`,
            expectedOutput: 'Result: Vector2D(x=4, y=6)',
            explanation: 'The Python data model enables custom user classes to integrate seamlessly with built-in language operators (+, len, in) through dunder protocols.'
          },
          {
            id: 'py-inter-2',
            title: '5. Iterators, Generators & Yield Suspension',
            level: 'intermediate',
            durationMinutes: 40,
            summary: 'Streaming data with O(1) memory overhead using generators, send(), and yield from delegation.',
            concepts: ['Iterator Protocol (__iter__, __next__)', 'Generator state machines', 'Yield from sub-generators', 'Memory footprint reduction'],
            starterCode: `def fibonacci_stream():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci_stream()
first_8 = [next(gen) for _ in range(8)]
print(f"Fibonacci stream: {first_8}")`,
            expectedOutput: 'Fibonacci stream: [0, 1, 1, 2, 3, 5, 8, 13]',
            explanation: 'Generators pause execution frame state on "yield", producing infinite or multi-gigabyte data streams without memory starvation.'
          },
          {
            id: 'py-inter-3',
            title: '6. Context Managers & Advanced Decorators',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Guaranteed resource reclamation via contextlib and parameterized function decorators with functools.wraps.',
            concepts: ['__enter__ and __exit__ lifecycle', 'contextlib.contextmanager', 'Parameterized decorators', 'Preserving docstrings with @wraps'],
            starterCode: `import time
from functools import wraps

def timeit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"[{func.__name__}] executed in {duration * 1000:.4f} ms")
        return result
    return wrapper

@timeit
def compute_sum(n: int) -> int:
    return sum(i * i for i in range(n))

print(f"Sum: {compute_sum(100000)}")`,
            expectedOutput: '[compute_sum] executed in ... ms\nSum: 333328333350000',
            explanation: 'Decorators wrap callables to inject cross-cutting concerns (logging, metrics, caching) cleanly without modifying business logic.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Architectures',
        description: 'CPython bytecode, GIL mechanics, asyncio event loops, metaclasses, and memory profiling.',
        lessons: [
          {
            id: 'py-adv-1',
            title: '7. Metaclasses & Class Construction Internals',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Inspect how type creates classes, intercept class creation with __new__, and use __init_subclass__.',
            concepts: ['Metaclass lifecycle (__new__, __init__)', '__init_subclass__ registry hook', 'Attribute descriptor protocol (__get__, __set__)', 'Dynamic validation'],
            starterCode: `class ValidatedField:
    def __set_name__(self, owner, name):
        self.public_name = name
        self.private_name = '_' + name

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError(f"{self.public_name} must be a non-negative integer")
        setattr(obj, self.private_name, value)

class InventoryItem:
    quantity = ValidatedField()
    price = ValidatedField()

    def __init__(self, quantity: int, price: int):
        self.quantity = quantity
        self.price = price

item = InventoryItem(50, 199)
print(f"Valid item: quantity={item.quantity}, price={item.price}")`,
            expectedOutput: 'Valid item: quantity=50, price=199',
            explanation: 'Descriptor protocol intercepts attribute access, providing reusable, declarative validation without bloating the host class.'
          },
          {
            id: 'py-adv-2',
            title: '8. Asynchronous Concurrency & Asyncio Event Loops',
            level: 'advanced',
            durationMinutes: 50,
            summary: 'High-throughput cooperative concurrency, task gathering, non-blocking sockets, and asyncio semaphores.',
            concepts: ['Event loop architecture (epoll/kqueue)', 'async/await coroutine state machines', 'asyncio.gather & TaskGroup', 'Bounded concurrency with Semaphores'],
            starterCode: `import asyncio

async def fetch_worker(worker_id: int, delay: float):
    print(f"Worker {worker_id} started...")
    await asyncio.sleep(delay)
    print(f"Worker {worker_id} completed!")
    return f"Payload-{worker_id}"

async def main():
    results = await asyncio.gather(
        fetch_worker(1, 0.05),
        fetch_worker(2, 0.02),
        fetch_worker(3, 0.04)
    )
    print(f"All payloads received: {results}")

asyncio.run(main())`,
            expectedOutput: 'Worker 2 completed!\nWorker 3 completed!\nWorker 1 completed!\nAll payloads received: ...',
            explanation: 'Asyncio enables cooperative multitasking on a single OS thread, allowing servers to handle 50,000+ active connections with minimal memory overhead.'
          },
          {
            id: 'py-adv-3',
            title: '9. CPython Bytecode, Disassembly & __slots__ Optimization',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Dissecting CPython virtual machine instructions with dis, tuning PyMalloc, and shrinking memory footprints with __slots__.',
            concepts: ['Bytecode inspection (LOAD_FAST, BINARY_OP)', '__slots__ vs __dict__ memory profiling', 'Reference counting vs cyclic GC', 'PyMalloc arena allocation'],
            starterCode: `import sys

class StandardClass:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class SlottedClass:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

s1 = StandardClass(10, 20)
s2 = SlottedClass(10, 20)
print(f"Standard class has __dict__: {hasattr(s1, '__dict__')}")
print(f"Slotted class has __dict__: {hasattr(s2, '__dict__')}")`,
            expectedOutput: 'Standard class has __dict__: True\nSlotted class has __dict__: False',
            explanation: '__slots__ replaces the instance dictionary with a fixed-size C struct array, eliminating ~150 bytes of RAM overhead per instance.'
          }
        ]
      }
    ],
    finalAssessment: {
      title: 'Python 3 Senior Architect Final Assessment (Hard)',
      passingScore: 75,
      timeLimitMinutes: 25,
      questions: [
        {
          id: 'py-hard-q1',
          question: 'Consider the following Python snippet involving default mutable arguments. What is printed?',
          codeSnippet: `def append_val(val, target=[]):
    target.append(val)
    return target

print(append_val(1))
print(append_val(2, []))
print(append_val(3))`,
          options: [
            '[1], [2], [3]',
            '[1], [2], [1, 3]',
            '[1], [], [1, 3]',
            '[1, 2, 3], [2], [1, 2, 3]'
          ],
          correctIndex: 1,
          explanation: 'Default arguments in Python are evaluated once at function definition time, NOT at invocation time. The default list "target" persists across calls when not overridden.',
          subtopic: 'Default Argument Evaluation'
        },
        {
          id: 'py-hard-q2',
          question: 'What is the output of this generator delegation and exception throw?',
          codeSnippet: `def subgen():
    try:
        yield 1
    except ValueError:
        yield 2

def main_gen():
    yield from subgen()
    yield 3

g = main_gen()
print(next(g))
print(g.throw(ValueError))`,
          options: [
            '1, followed by an unhandled ValueError exception',
            '1, followed by 2',
            '1, followed by 3',
            '2, followed by 3'
          ],
          correctIndex: 1,
          explanation: 'The "yield from" construct establishes a transparent bi-directional communication channel. The .throw(ValueError) is forwarded directly into subgen, which catches it and yields 2.',
          subtopic: 'Generators & Yield From'
        },
        {
          id: 'py-hard-q3',
          question: 'What happens when you execute this class definition containing a custom metaclass?',
          codeSnippet: `class Meta(type):
    def __new__(mcs, name, bases, namespace):
        namespace['magic'] = 42
        return super().__new__(mcs, name, bases, namespace)

class Base(metaclass=Meta):
    pass

class Derived(Base):
    pass

print(Derived.magic)`,
          options: [
            'AttributeError: Derived has no attribute magic',
            '42',
            'None',
            'TypeError: metaclass conflict'
          ],
          correctIndex: 1,
          explanation: 'Metaclasses are inherited by subclasses. When Derived is constructed, Meta.__new__ executes, injecting "magic = 42" into Derived namespace.',
          subtopic: 'Metaclasses'
        },
        {
          id: 'py-hard-q4',
          question: 'In CPython, why does cyclic garbage collection use three generations (Gen 0, 1, and 2)?',
          options: [
            'Because modern 64-bit CPUs have L1, L2, and L3 caches',
            'Based on the Weak Generational Hypothesis: most objects die young, so Gen 0 is collected most frequently to reduce GC pauses',
            'To separate integers, strings, and custom classes into dedicated pools',
            'To ensure GIL release points can be scheduled every 5ms'
          ],
          correctIndex: 1,
          explanation: 'The generational hypothesis states that newly created objects have a high death rate. By scanning Gen 0 frequently and Gen 2 rarely, GC latency is minimized.',
          subtopic: 'Garbage Collection Internals'
        },
        {
          id: 'py-hard-q5',
          question: 'What is the consequence of accessing a class attribute that is an instance of a descriptor implementing only __get__ (a non-data descriptor) versus one implementing both __get__ and __set__ (a data descriptor)?',
          options: [
            'There is no difference in attribute lookup precedence',
            'If an instance has an attribute in its __dict__ with the same name, a non-data descriptor is overridden by the instance __dict__, whereas a data descriptor takes precedence over the instance __dict__',
            'Non-data descriptors can only be called from static methods',
            'Data descriptors are strictly evaluated at compile time'
          ],
          correctIndex: 1,
          explanation: 'Python attribute lookup precedence: Data descriptors (implementing __set__) take precedence over instance __dict__. However, instance __dict__ takes precedence over non-data descriptors (only implementing __get__).',
          subtopic: 'Descriptor Protocol Precedence'
        },
        {
          id: 'py-hard-q6',
          question: 'What is printed by this asyncio coroutine scheduling snippet?',
          codeSnippet: `import asyncio

async def worker():
    print("A", end="")
    await asyncio.sleep(0)
    print("B", end="")

async def main():
    task = asyncio.create_task(worker())
    print("C", end="")
    await asyncio.sleep(0)
    print("D", end="")
    await task

asyncio.run(main())`,
          options: [
            'ABCD',
            'CABD',
            'CDAB',
            'ACBD'
          ],
          correctIndex: 1,
          explanation: 'asyncio.create_task schedules worker() on the event loop but does not yield control immediately. main() continues to print "C". When main() executes await asyncio.sleep(0), control yields to worker(), which prints "A" and awaits sleep(0). Control yields back to main(), which prints "D", and finally worker resumes to print "B" (Output: CABD or CADB depending on queue tie-breaking; here CABD).',
          subtopic: 'Asyncio Event Loop Mechanics'
        },
        {
          id: 'py-hard-q7',
          question: 'Which of the following operations in CPython is NOT guaranteed to be atomic by the Global Interpreter Lock?',
          options: [
            'L.append(x) on a list',
            'D[key] = value on a dictionary',
            'x += 1 on an integer variable',
            'd = dict1.copy()'
          ],
          correctIndex: 2,
          explanation: 'x += 1 compiles to binary operations (LOAD_FAST, BINARY_ADD, STORE_FAST). A thread switch can occur between loading the integer and storing it back, causing a race condition in multi-threaded code.',
          subtopic: 'Thread Safety & GIL Atomicity'
        },
        {
          id: 'py-hard-q8',
          question: 'What will be the output of this Python snippet regarding closures and late-binding variables?',
          codeSnippet: `funcs = [lambda: i * 2 for i in range(4)]
print([f() for f in funcs])`,
          options: [
            '[0, 2, 4, 6]',
            '[6, 6, 6, 6]',
            '[0, 0, 0, 0]',
            'SyntaxError: lambda cannot close over loop counter'
          ],
          correctIndex: 1,
          explanation: 'Python closures bind late to variable names, not values. By the time the lambdas are invoked, the loop has completed and "i" is 3 for all closures, yielding [6, 6, 6, 6].',
          subtopic: 'Closure Late Binding'
        },
        {
          id: 'py-hard-q9',
          question: 'What is the primary function of the PyMalloc allocator in CPython?',
          options: [
            'To allocate shared memory across multiple multiprocessing workers',
            'To optimize allocations of small objects (<= 512 bytes) into arenas and pools to prevent heap fragmentation and bypass system malloc overhead',
            'To convert Python byte arrays directly into GPU CUDA buffers',
            'To compile AST nodes into machine code'
          ],
          correctIndex: 1,
          explanation: 'PyMalloc is CPython specialized small-object allocator, organizing memory into 256KB arenas, 4KB pools, and fixed-size blocks to avoid system malloc fragmentation.',
          subtopic: 'Memory Management Internals'
        },
        {
          id: 'py-hard-q10',
          question: 'What does the __mro__ (Method Resolution Order) attribute on a class define, and which algorithm does Python use to compute it?',
          options: [
            'Depth-First Search order from left to right',
            'Breadth-First Search across all parent classes',
            'C3 Superlinear Linearization algorithm, ensuring monotonicity and local precedence order',
            'Random topological sorting'
          ],
          correctIndex: 2,
          explanation: 'Python 2.3+ utilizes the C3 Linearization algorithm to determine Method Resolution Order, guaranteeing monotonicity and respecting local precedence in multiple inheritance hierarchies.',
          subtopic: 'C3 Linearization & MRO'
        }
      ]
    }
  },

  // 2. TYPESCRIPT TRACK
  {
    id: 'track-typescript',
    name: 'TypeScript',
    slug: 'typescript',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-700',
    badge: 'Enterprise TypeScript',
    tagline: 'Type-level programming, conditional infer, template literals, and isomorphic V8 runtimes.',
    description: 'Master TypeScript from primitive typing and interfaces to advanced conditional types, distributive unions, recursive mapped types, and zero-overhead runtime validation.',
    totalModules: 9,
    estimatedHours: 16,
    videoCourse: {
      title: 'TypeScript Production Engineering & Type-Level Systems',
      youtubeId: 'gieEQFIfgYc',
      instructor: 'freeCodeCamp & Marius Schulz',
      duration: '3h 40m',
      channel: 'freeCodeCamp.org',
      description: 'Zero to advanced type system mastery covering sound typing, discriminating unions, generics, template literals, and distributive conditional types.',
      chapters: [
        { title: 'TypeScript Philosophy & Compiler Setup', timestamp: '00:00', seconds: 0 },
        { title: 'Type Annotations, Primitives & Narrowing', timestamp: '22:30', seconds: 1350 },
        { title: 'Interfaces, Types & Structural Subtyping', timestamp: '55:10', seconds: 3310 },
        { title: 'Generics & Constrained Type Parameters', timestamp: '1:35:40', seconds: 5740 },
        { title: 'Conditional Types & Infer Keyword Mechanics', timestamp: '2:20:15', seconds: 8415 },
        { title: 'Template Literal Types & Type-Level State', timestamp: '3:05:00', seconds: 11100 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Foundational Scratch',
        description: 'Static typing, unions, primitives, interfaces, and structural typing basics.',
        lessons: [
          {
            id: 'ts-scratch-1',
            title: '1. Primitives, Type Annotations & Inference',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'The difference between JavaScript and TypeScript, literal types, and type inference engines.',
            concepts: ['String, number, boolean primitives', 'Type inference vs explicit annotations', 'Literal types & const assertions', 'Any vs Unknown'],
            starterCode: `// Type inference vs explicit types
const systemName = "SmartLearn Engine"; // inferred as literal "SmartLearn Engine"
let requestCount: number = 10;

function formatStatus(active: boolean): string {
    return active ? "ONLINE" : "STANDBY";
}

console.log(\`System: \${systemName}, Status: \${formatStatus(requestCount > 0)}\`);`,
            expectedOutput: 'System: SmartLearn Engine, Status: ONLINE',
            explanation: 'TypeScript infers precise literal types for const declarations and enables compiler type checking without runtime overhead.',
            youtubeVideoId: 'gieEQFIfgYc',
            bugChallenge: {
              title: 'The Implicit Undefined Narrowing Defect',
              description: 'Find why accessing property without checking causes possible undefined compiler errors.',
              buggyCode: `function getLength(str?: string) {\n    return str.length; // BUG: Object is possibly 'undefined'\n}\nconsole.log(getLength("hello"));`,
              fixOptions: [
                'Add optional chaining: return str?.length ?? 0;',
                'Cast to any: return (str as any).length;',
                'Change return type to any',
                'Remove the optional question mark from parameter'
              ],
              correctOptionIndex: 0,
              explanation: 'In strict null checking mode, str could be undefined. Using null-coalescing optional chaining (str?.length ?? 0) safely guards against undefined runtime exceptions.',
              xpReward: 75
            }
          },
          {
            id: 'ts-scratch-2',
            title: '2. Interfaces, Type Aliases & Structural Typing',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'Duck typing in practice: matching shapes rather than nominal names, optional properties, and readonly modifiers.',
            concepts: ['Interface vs Type alias', 'Structural typing (duck typing)', 'Readonly arrays & properties', 'Excess property checking'],
            starterCode: `interface UserProfile {
    readonly id: string;
    username: string;
    email?: string; // optional
}

const user: UserProfile = {
    id: "usr_9918",
    username: "AlexDev"
};

// user.id = "new_id"; // Error: Cannot assign to 'id' because it is a read-only property
console.log(\`User \${user.username} loaded successfully.\`);`,
            expectedOutput: 'User AlexDev loaded successfully.',
            explanation: 'Structural typing ensures compatibility if objects satisfy the required shape, while readonly modifiers protect data immutability.'
          },
          {
            id: 'ts-scratch-3',
            title: '3. Generics & Type Constraints',
            level: 'scratch',
            durationMinutes: 30,
            summary: 'Writing reusable components and functions with generic parameters and extends constraints.',
            concepts: ['Generic functions & classes', 'extends type constraint', 'keyof operator', 'Default generic arguments'],
            starterCode: `function getEntityProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const serverMetrics = {
    cpuPercent: 42.5,
    hostname: "node-primary-01",
    activeSockets: 1024
};

const cpu = getEntityProperty(serverMetrics, "cpuPercent");
console.log(\`CPU: \${cpu}%\`);`,
            expectedOutput: 'CPU: 42.5%',
            explanation: 'Generics with keyof constraints guarantee at compile time that callers cannot access non-existent properties, preserving precise return types.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Systems',
        description: 'Discriminated unions, type narrowing, template literal types, and utility types.',
        lessons: [
          {
            id: 'ts-inter-1',
            title: '4. Discriminated Unions & Exhaustiveness Checking',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Modeling finite state machines with common discriminant tags and enforcing exhaustive switch handling with never.',
            concepts: ['Tagged union pattern', 'Exhaustiveness checking with never', 'Type narrowing via in and typeof', 'User-defined type guards (is)'],
            starterCode: `type NetworkState = 
    | { status: 'idle' }
    | { status: 'loading'; progress: number }
    | { status: 'success'; data: string }
    | { status: 'error'; error: Error };

function renderState(state: NetworkState): string {
    switch (state.status) {
        case 'idle': return "Ready to fetch";
        case 'loading': return \`Fetching... \${state.progress}%\`;
        case 'success': return \`Data: \${state.data}\`;
        case 'error': return \`Failed: \${state.error.message}\`;
        default: {
            const _exhaustiveCheck: never = state;
            return _exhaustiveCheck;
        }
    }
}

console.log(renderState({ status: 'loading', progress: 85 }));`,
            expectedOutput: 'Fetching... 85%',
            explanation: 'Discriminated unions allow the TypeScript compiler to narrow types automatically inside conditional branches. Assigning the default branch to never guarantees compile errors if new states are added without handling.'
          },
          {
            id: 'ts-inter-2',
            title: '5. Mapped Types & Utility Types Under the Hood',
            level: 'intermediate',
            durationMinutes: 40,
            summary: 'How Partial, Required, Pick, Omit, and Record are implemented using mapped type expressions.',
            concepts: ['Mapped types ([K in keyof T])', 'Key remapping (as)', 'Partial and Readonly implementations', 'Lookup types T[K]'],
            starterCode: `type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface Device {
    model: string;
    battery: number;
}

type DeviceGetters = Getters<Device>;
console.log("DeviceGetters keys: getModel, getBattery");`,
            expectedOutput: 'DeviceGetters keys: getModel, getBattery',
            explanation: 'Mapped types transform each property of an existing type. Key remapping allows manipulating property names at compile time.'
          },
          {
            id: 'ts-inter-3',
            title: '6. Runtime Schema Validation with Zod',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Bridging the compile-time runtime gap: single source of truth for runtime validation and TypeScript types.',
            concepts: ['Type erasure in production', 'Zod schema definition', 'z.infer<typeof schema>', 'Safe parsing and error reporting'],
            starterCode: `// Conceptual representation of Zod schema execution
interface ValidationResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}

function validateUserPayload(input: unknown): ValidationResult<{ id: string; role: 'admin' | 'user' }> {
    if (typeof input === 'object' && input !== null && 'id' in input && 'role' in input) {
        const candidate = input as any;
        if (typeof candidate.id === 'string' && (candidate.role === 'admin' || candidate.role === 'user')) {
            return { success: true, data: candidate };
        }
    }
    return { success: false, error: 'Invalid payload schema' };
}

const res = validateUserPayload({ id: "usr_1", role: "admin" });
console.log("Validated:", res.success, res.data);`,
            expectedOutput: 'Validated: true { id: "usr_1", role: "admin" }',
            explanation: 'Because TypeScript types are completely erased at runtime, runtime validation libraries like Zod ensure data entering your system strictly adheres to type contracts.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Architectures',
        description: 'Conditional types, infer pattern, distributive unions, and V8 optimization heuristics.',
        lessons: [
          {
            id: 'ts-adv-1',
            title: '7. Conditional Types & the infer Keyword',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Extracting return types, unwrapping promises, and recursive type-level algorithms.',
            concepts: ['T extends U ? X : Y', 'infer pattern matching', 'ReturnType and Awaited implementations', 'Distributive conditional types over naked type parameters'],
            starterCode: `// Custom unwrapper for nested Promises
type DeepAwaited<T> = T extends Promise<infer Inner> 
    ? DeepAwaited<Inner> 
    : T;

type Test1 = DeepAwaited<Promise<Promise<string>>>; // resolves to string
console.log("DeepAwaited resolves nested asynchronous return types");`,
            expectedOutput: 'DeepAwaited resolves nested asynchronous return types',
            explanation: 'The infer keyword allows declaring a type variable within a condition, dynamically unwrapping nested types at compile time.'
          },
          {
            id: 'ts-adv-2',
            title: '8. Template Literal Types & Type-Safe Routing',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Parsing URL parameters and SQL query strings purely at compile time.',
            concepts: ['Template literal types', 'String manipulation types', 'Extracting route parameters (/users/:id)', 'Type-safe event emitters'],
            starterCode: `type ExtractRouteParams<T extends string> = 
    T extends \`\${string}/:\${infer Param}/\${infer Rest}\`
        ? Param | ExtractRouteParams<\`/\${Rest}\`>
        : T extends \`\${string}/:\${infer Param}\`
            ? Param
            : never;

type PostRouteParams = ExtractRouteParams<"/posts/:category/:postId">;
// Resolves to 'category' | 'postId'
console.log("Type-safe route params extracted at compile time.");`,
            expectedOutput: 'Type-safe route params extracted at compile time.',
            explanation: 'Template literal types bring pattern matching and string parsing to the type level, powering modern frameworks like tRPC and Express routers.'
          },
          {
            id: 'ts-adv-3',
            title: '9. V8 JIT Compilation & Hidden Classes',
            level: 'advanced',
            durationMinutes: 50,
            summary: 'How Google V8 executes compiled TypeScript JavaScript: Ignition bytecode, TurboFan JIT, and hidden classes.',
            concepts: ['Ignition interpreter vs TurboFan JIT', 'Hidden Classes (Shapes)', 'Inline Caches (Monomorphic vs Megamorphic)', 'Preventing de-optimizations'],
            starterCode: `// Monomorphic object shape in V8
class FastVector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// V8 creates a single Hidden Class (Shape). Accesses are monomorphic and inlined in machine code.
const v = new FastVector(10, 20);
console.log(\`Fast vector initialized: (\${v.x}, \${v.y})\`);`,
            expectedOutput: 'Fast vector initialized: (10, 20)',
            explanation: 'Initializing properties in consistent order allows V8 to generate identical hidden class transitions, keeping field accesses monomorphic and blazingly fast.'
          }
        ]
      }
    ],
    finalAssessment: {
      title: 'TypeScript Senior Architect Final Assessment (Hard)',
      passingScore: 75,
      timeLimitMinutes: 25,
      questions: [
        {
          id: 'ts-hard-q1',
          question: 'Why does the following conditional type distribute across the union, and how do you prevent distribution?',
          codeSnippet: `type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;`,
          options: [
            'It evaluates to (string | number)[]; distribution cannot be prevented',
            'It evaluates to string[] | number[] because naked type parameters distribute over unions. To prevent distribution, wrap T in a tuple: [T] extends [any]',
            'It causes a circular type recursion compile error',
            'It evaluates to never because any matches everything'
          ],
          correctIndex: 1,
          explanation: 'When conditional types act on an unadorned (naked) generic type parameter T, they distribute over union types: ToArray<string | number> = ToArray<string> | ToArray<number> = string[] | number[]. Wrapping in square brackets [T] extends [any] disables distributive behavior.',
          subtopic: 'Distributive Conditional Types'
        },
        {
          id: 'ts-hard-q2',
          question: 'What is the type of Result in this TypeScript expression?',
          codeSnippet: `type IsNever<T> = [T] extends [never] ? true : false;
type A = IsNever<never>;
type B = never extends never ? true : false;`,
          options: [
            'A is true, B is never',
            'A is false, B is true',
            'A is true, B is true',
            'Both A and B are never'
          ],
          correctIndex: 0,
          explanation: 'In a naked conditional type, "never" is treated as an empty union. Distributing over an empty union yields "never", so "never extends never ? true : false" evaluates to "never"! Wrapping in a tuple "[T] extends [never]" stops distribution and correctly evaluates to "true".',
          subtopic: 'Never in Conditional Types'
        },
        {
          id: 'ts-hard-q3',
          question: 'Consider the bivariance / contravariance of function parameters in TypeScript. Under --strictFunctionTypes, what is the variance behavior of method declarations on interfaces versus function-typed properties?',
          options: [
            'Both are strictly contravariant',
            'Both are strictly invariant',
            'Method declarations (foo(): void) remain bivariant for compatibility with Array/DOM types, while property function signatures (foo: () => void) are strictly contravariant',
            'Method declarations are covariant and properties are bivariant'
          ],
          correctIndex: 2,
          explanation: 'TypeScript intentionally excluded method declarations on interfaces/classes from --strictFunctionTypes to allow covariant array methods like Array<Derived> being assignable to Array<Base>. Function properties (foo: (x: T) => void) enforce strict contravariance.',
          subtopic: 'Function Parameter Variance'
        },
        {
          id: 'ts-hard-q4',
          question: 'What happens at compile time with this satisfies operator expression versus type annotation?',
          codeSnippet: `type Colors = 'red' | 'green' | 'blue';
type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<Colors, string | RGB>;

palette.green.toUpperCase();
palette.red[0].toFixed(2);`,
          options: [
            'Compile error on palette.green.toUpperCase() because the type is string | RGB',
            'The satisfies operator validates that the object matches Record<Colors, string | RGB> without widening the inferred specific types of its properties, so both method calls compile without errors',
            'palette is widened to Record<Colors, string | RGB>',
            'satisfies is a runtime JavaScript operator that throws a TypeError'
          ],
          correctIndex: 1,
          explanation: 'The satisfies operator validates conformance to a contract while preserving the exact inferred literal and specific types of values, allowing .toUpperCase() on string properties without type assertions.',
          subtopic: 'The satisfies Operator'
        },
        {
          id: 'ts-hard-q5',
          question: 'In Google V8, what causes an Inline Cache (IC) to become "megamorphic", and what is the performance impact?',
          options: [
            'When an object contains more than 100 properties',
            'When a property access site encounters more than 4 distinct Hidden Classes (Shapes), switching V8 from fast stub jumps to a global hash table lookup',
            'When garbage collection runs more than 10 times in a second',
            'When TypeScript code is compiled with --noEmit'
          ],
          correctIndex: 1,
          explanation: 'Inline Caches transition from monomorphic (1 shape) to polymorphic (2-4 shapes) to megamorphic (5+ shapes). Megamorphic call sites fall back to slow global hash lookups, causing noticeable throughput drops.',
          subtopic: 'V8 Hidden Classes & Inline Caching'
        },
        {
          id: 'ts-hard-q6',
          question: 'What is the result of using the as const assertion on an object literal containing nested arrays and objects?',
          options: [
            'It freezes the object at runtime via Object.freeze()',
            'It prevents the TypeScript file from being compiled into JavaScript',
            'All properties are given readonly modifiers, literal types are preserved rather than widened, and array literals become readonly tuples',
            'It enables runtime reflection in Node.js'
          ],
          correctIndex: 2,
          explanation: '"as const" is a compile-time construct that assigns the narrowest possible literal types, turns arrays into readonly tuples, and marks all nested properties as readonly.',
          subtopic: 'Const Assertions'
        },
        {
          id: 'ts-hard-q7',
          question: 'What does this recursive conditional type accomplish?',
          codeSnippet: `type Flatten<T> = T extends (infer Element)[]
    ? Flatten<Element>
    : T;
type Res = Flatten<number[][][][]>;`,
          options: [
            'number[][][]',
            'number',
            'never',
            'Compile error: recursion depth exceeded'
          ],
          correctIndex: 1,
          explanation: 'The Flatten<T> type recursively unwraps array dimensions via infer Element until a non-array primitive type is reached, yielding number.',
          subtopic: 'Recursive Conditional Types'
        },
        {
          id: 'ts-hard-q8',
          question: 'Under what conditions does TypeScript declare a type to be branded / nominal?',
          options: [
            'Using the nominal class keyword',
            'By intersecting a primitive type with an object type containing a unique phantom property (e.g. type UserId = string & { readonly __brand: unique symbol })',
            'By declaring interfaces with identical names in different files',
            'By using the namespace keyword'
          ],
          correctIndex: 1,
          explanation: 'TypeScript uses structural typing. To simulate nominal typing (e.g. preventing a RawUserId from being passed where a SanitizedUserId is required), developers intersect the primitive with a phantom brand property.',
          subtopic: 'Nominal / Branded Typing'
        },
        {
          id: 'ts-hard-q9',
          question: 'What is the difference between unknown and any when performing operations on a variable?',
          options: [
            'There is no difference; they are aliases',
            'any disables all type checking; unknown is type-safe and requires type narrowing or assertion before performing any operations',
            'unknown cannot be assigned to any variable, even after type checking',
            'any is only available in development mode'
          ],
          correctIndex: 1,
          explanation: 'unknown is the type-safe counterpart of any. Any value can be assigned to unknown, but no operations can be performed on an unknown variable without explicit type checking or assertions.',
          subtopic: 'Unknown vs Any'
        },
        {
          id: 'ts-hard-q10',
          question: 'How does TypeScript Project References (composite: true) accelerate compilation in massive enterprise monorepos?',
          options: [
            'It converts TypeScript directly to C++ binaries',
            'It enforces distinct package boundaries and caches generated declaration files (.d.ts) and build state (.tsbuildinfo), enabling tsc --build to perform fast incremental builds of only modified packages',
            'It disables type checking during pull requests',
            'It runs tests in parallel using web workers'
          ],
          correctIndex: 1,
          explanation: 'Project references break codebases into independent sub-projects. The compiler caches type definitions and build metadata, rebuilding only changed packages and their dependents.',
          subtopic: 'Project References & Build Performance'
        }
      ]
    }
  },

  // 3. JAVA TRACK
  {
    id: 'track-java',
    name: 'Java & JVM',
    slug: 'java',
    icon: '☕',
    color: 'from-amber-600 to-red-800',
    badge: 'Enterprise JVM',
    tagline: 'From object-oriented foundations to Virtual Threads, HotSpot JIT, and memory models.',
    description: 'A deep journey through modern Java 21 LTS: Project Loom virtual threads, garbage collection tuning (ZGC/G1), JVM bytecode, and resilient high-throughput architectures.',
    totalModules: 9,
    estimatedHours: 18,
    videoCourse: {
      title: 'Java 21 Modern Architecture: Core Syntax to JVM Internals',
      youtubeId: 'A74TOX803D0',
      instructor: 'freeCodeCamp.org & Oracle Champions',
      duration: '4h 10m',
      channel: 'freeCodeCamp.org',
      description: 'Modern Java 21 engineering covering JVM bytecode, memory allocation, Streams, functional interfaces, Project Loom virtual threads, and GC collectors.',
      chapters: [
        { title: 'JDK 21 Setup, HotSpot JVM & JIT Mechanics', timestamp: '00:00', seconds: 0 },
        { title: 'Object-Oriented Design, Records & Sealed Classes', timestamp: '30:20', seconds: 1820 },
        { title: 'Collections Framework & Generics Erasure', timestamp: '1:15:40', seconds: 4540 },
        { title: 'Streams API, Pipelines & Collector Architectures', timestamp: '2:10:00', seconds: 7800 },
        { title: 'Virtual Threads (Project Loom) & Structured Concurrency', timestamp: '3:00:20', seconds: 10820 },
        { title: 'JVM Garbage Collectors: ZGC, G1 & Memory Tuning', timestamp: '3:45:00', seconds: 13500 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Foundational Scratch',
        description: 'Java syntax, primitive vs reference types, encapsulation, OOP inheritance, and collections.',
        lessons: [
          {
            id: 'java-scratch-1',
            title: '1. JVM Architecture, Compilation & Types',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'The relationship between javac compiler, bytecode (.class), JVM memory zones, and primitive types.',
            concepts: ['JDK vs JRE vs JVM', 'Primitive types vs Object wrappers', 'Stack frames vs Heap memory', 'The main method entry point'],
            starterCode: `public class Main {
    public static void main(String[] args) {
        int primitiveInt = 42; // Allocated on the execution thread stack
        Integer boxedInt = Integer.valueOf(42); // Heap allocated object

        System.out.println("Primitive: " + primitiveInt);
        System.out.println("Boxed object: " + boxedInt);
        System.out.println("Equality: " + (primitiveInt == boxedInt));
    }
}`,
            expectedOutput: 'Primitive: 42\nBoxed object: 42\nEquality: true',
            explanation: 'Java primitives store raw binary values directly on the thread stack, whereas object references point to heap-allocated objects with 12-to-16 byte object headers.',
            youtubeVideoId: 'A74TOX803D0',
            bugChallenge: {
              title: 'String Equality Comparison Trap (== vs equals)',
              description: 'Find why comparing two identical strings creates a bug in authentication or validation logic.',
              buggyCode: `String s1 = new String("admin");\nString s2 = new String("admin");\nif (s1 == s2) {\n    System.out.println("Authorized");\n} else {\n    System.out.println("Denied"); // BUG: Prints Denied!\n}`,
              fixOptions: [
                'Use s1.equals(s2) to compare content rather than reference identity',
                'Use s1 === s2 like in JavaScript',
                'Cast both strings to Object before comparison',
                'Convert s1 and s2 to string builders'
              ],
              correctOptionIndex: 0,
              explanation: 'In Java, the == operator checks memory reference identity, not value equality. Because both were instantiated with new String(), they reside in different memory addresses. Content comparison requires .equals().',
              xpReward: 75
            }
          },
          {
            id: 'java-scratch-2',
            title: '2. Object-Oriented Principles & Modern Records',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'Encapsulation, inheritance, polymorphism, abstract classes, interfaces, and immutable records.',
            concepts: ['Class inheritance (extends)', 'Interface contracts (implements)', 'Virtual method table dispatch', 'Java 16+ records for immutable data'],
            starterCode: `public record StudentRecord(String id, String name, int score) {
    // Compact constructor with validation
    public StudentRecord {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("Invalid score: " + score);
        }
    }
}

// Automatically provides getters, equals, hashCode, and toString!`,
            expectedOutput: 'StudentRecord[id=STU-01, name=Maya, score=98]',
            explanation: 'Java records eliminate thousands of lines of boilerplate getters, constructors, equals, and hashCode methods while enforcing immutability.'
          },
          {
            id: 'java-scratch-3',
            title: '3. Java Collections Framework & Generics',
            level: 'scratch',
            durationMinutes: 30,
            summary: 'ArrayList, LinkedList, HashMap, HashSet, and type erasure mechanics.',
            concepts: ['List, Set, and Map interfaces', 'HashMap bucket hashing & red-black tree binning', 'Type erasure at compile time', 'Generics wildcard bounds (? extends T)'],
            starterCode: `import java.util.*;

public class CollectionDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Algorithms", 95);
        scores.put("Systems", 88);

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
            expectedOutput: 'Algorithms -> 95\nSystems -> 88',
            explanation: 'HashMap provides O(1) average time complexity for lookups. When bucket collisions exceed a threshold (default 8), buckets convert into red-black trees to guarantee O(log N) worst-case performance.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Systems',
        description: 'Functional streams, Optional, lambda expressions, concurrent collections, and custom classloaders.',
        lessons: [
          {
            id: 'java-inter-1',
            title: '4. Streams API, Lambdas & Functional Interfaces',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Declarative data pipelines with filter, map, flatMap, reduce, and parallel streams.',
            concepts: ['Functional interfaces (@FunctionalInterface)', 'Lambda expressions & Method references', 'Lazy stream evaluation', 'Collector pipelines'],
            starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> modules = List.of("Java", "Kotlin", "Rust", "Python", "Go");
        List<String> filtered = modules.stream()
            .filter(name -> name.length() > 2)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Filtered: " + filtered);
    }
}`,
            expectedOutput: 'Filtered: [JAVA, KOTLIN, PYTHON, RUST]',
            explanation: 'Java Streams execute lazily. Intermediate operations build an execution pipeline, which is evaluated in a single pass when a terminal operation (like collect) is triggered.'
          },
          {
            id: 'java-inter-2',
            title: '5. Concurrency: ExecutorService & ConcurrentHashMap',
            level: 'intermediate',
            durationMinutes: 40,
            summary: 'Thread pools, Future, CompletableFuture asynchronous pipelines, and lock-free thread-safe maps.',
            concepts: ['Thread lifecycle & ExecutorService', 'CompletableFuture composition (thenApply, thenCompose)', 'ConcurrentHashMap CAS operations', 'Deadlock avoidance'],
            starterCode: `import java.util.concurrent.CompletableFuture;

public class AsyncDemo {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> "Querying database...")
            .thenApply(res -> res + " -> Data parsed")
            .thenAccept(System.out::println)
            .join();
    }
}`,
            expectedOutput: 'Querying database... -> Data parsed',
            explanation: 'CompletableFuture allows non-blocking asynchronous pipeline chaining using the ForkJoinPool, avoiding blocking thread joins.'
          },
          {
            id: 'java-inter-3',
            title: '6. Modern Pattern Matching & Sealed Classes',
            level: 'intermediate',
            durationMinutes: 35,
            summary: 'Pattern matching for instanceof, sealed class hierarchies (permits), and pattern switch statements.',
            concepts: ['Sealed interfaces & permits clause', 'Pattern matching for switch', 'Exhaustive pattern evaluation', 'Record patterns'],
            starterCode: `sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

// Exhaustive switch requires no default branch when all permitted subtypes are covered!`,
            expectedOutput: 'Sealed classes guarantee closed algebraic data types at compile time.',
            explanation: 'Sealed classes restrict which subclasses can extend them, allowing the compiler to verify exhaustive handling in switch statements.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Architectures',
        description: 'Virtual Threads (Project Loom), JVM memory model, HotSpot JIT tiers, and low-latency garbage collectors.',
        lessons: [
          {
            id: 'java-adv-1',
            title: '7. Virtual Threads & Project Loom (Java 21)',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Lightweight user-mode threads managed by the JVM rather than the OS kernel, allowing millions of concurrent virtual threads.',
            concepts: ['Platform threads (OS 1:1) vs Virtual threads (M:N)', 'Carrier threads and thread unmounting', 'Thread-per-request model revitalization', 'Pinning pitfalls (synchronized vs ReentrantLock)'],
            starterCode: `import java.util.concurrent.Executors;

public class VirtualThreadDemo {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 5; i++) {
                final int id = i;
                executor.submit(() -> {
                    System.out.println("Virtual thread task " + id + " executed on: " + Thread.currentThread());
                    return id;
                });
            }
        }
    }
}`,
            expectedOutput: 'Virtual thread task ... executed on: VirtualThread[#...,ForkJoinPool-1-worker-...]',
            explanation: 'Virtual threads unmount from their underlying OS carrier thread when performing blocking I/O, allowing a single JVM instance to handle millions of concurrent tasks with standard synchronous coding syntax.'
          },
          {
            id: 'java-adv-2',
            title: '8. Java Memory Model & Volatile Semantics',
            level: 'advanced',
            durationMinutes: 50,
            summary: 'Happens-before order, CPU cache coherency, volatile read/write barriers, and atomic CAS operations.',
            concepts: ['JMM happens-before relationship', 'CPU instruction reordering & memory barriers', 'volatile memory visibility', 'VarHandle and AtomicInteger'],
            starterCode: `import java.util.concurrent.atomic.AtomicInteger;

public class MemoryDemo {
    private static volatile boolean running = true;
    private static AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) {
        counter.incrementAndGet();
        System.out.println("Atomic counter: " + counter.get());
    }
}`,
            expectedOutput: 'Atomic counter: 1',
            explanation: 'Volatile variables prevent CPU registers and local L1/L2 caches from retaining stale values, inserting memory fences that guarantee immediate cross-thread visibility.'
          },
          {
            id: 'java-adv-3',
            title: '9. JVM HotSpot JIT Tiers & Garbage Collection (ZGC/G1)',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'C1 client compiler, C2 optimizing server compiler, escape analysis, and ultra-low latency collectors (ZGC).',
            concepts: ['Tiered compilation (Tier 0 to 4)', 'On-Stack Replacement (OSR) & Escape Analysis', 'G1 GC regions and mixed collections', 'ZGC concurrent thread-phase phase markers'],
            starterCode: `// Inspection of JVM runtime memory parameters
public class JvmInfo {
    public static void main(String[] args) {
        long maxMemory = Runtime.getRuntime().maxMemory();
        long processors = Runtime.getRuntime().availableProcessors();
        System.out.println("Max Heap: " + (maxMemory / 1024 / 1024) + " MB");
        System.out.println("Cores: " + processors);
    }
}`,
            expectedOutput: 'Max Heap: ... MB\nCores: ...',
            explanation: 'HotSpot profiles bytecode at runtime. If methods are hot, C2 compiles them into native machine assembly, inlining functions and eliminating heap allocations when objects do not escape the local method.'
          }
        ]
      }
    ],
    finalAssessment: {
      title: 'Java & JVM Senior Architect Final Assessment (Hard)',
      passingScore: 75,
      timeLimitMinutes: 25,
      questions: [
        {
          id: 'java-hard-q1',
          question: 'In Java 21 Project Loom, what causes a Virtual Thread to become "pinned" to its underlying OS carrier thread, preventing the carrier thread from serving other virtual threads during blocking operations?',
          options: [
            'Using a while loop',
            'Executing inside a synchronized block or method, or calling a native method via JNI',
            'Allocating objects larger than 64 KB on the heap',
            'Calling System.out.println()'
          ],
          correctIndex: 1,
          explanation: 'Virtual threads pin to their OS carrier thread when executing inside a synchronized block/method or during native code execution. The fix is replacing synchronized blocks with ReentrantLock.',
          subtopic: 'Virtual Thread Pinning'
        },
        {
          id: 'java-hard-q2',
          question: 'Under the Java Memory Model (JMM), which of the following guarantees does the volatile keyword provide?',
          options: [
            'Mutual exclusion and atomicity for compound operations like count++',
            'Visibility of writes across threads and ordering (preventing instruction reordering before/after the volatile access via memory barriers), but NOT compound atomicity',
            'Guarantees objects are allocated on the stack rather than heap',
            'Forces the JVM to use the C1 compiler rather than C2'
          ],
          correctIndex: 1,
          explanation: 'Volatile establishes a happens-before relationship ensuring memory visibility and preventing compiler/CPU reordering, but it does NOT provide atomicity for compound read-modify-write operations like i++.',
          subtopic: 'Java Memory Model'
        },
        {
          id: 'java-hard-q3',
          question: 'How does Escape Analysis in the HotSpot C2 compiler optimize memory allocation when an object is proven not to escape the creating method?',
          options: [
            'It places the object in the Metaspace region',
            'It performs Scalar Replacement, breaking the object down into its primitive fields and storing them directly in CPU registers or stack frames, avoiding heap allocation and GC entirely',
            'It forces the object directly into the Old Generation',
            'It serializes the object to disk'
          ],
          correctIndex: 1,
          explanation: 'When escape analysis proves an object does not escape a method scope, scalar replacement decomposes the object fields into local CPU registers/stack variables, completely eliminating heap allocation and GC overhead.',
          subtopic: 'C2 JIT Escape Analysis'
        },
        {
          id: 'java-hard-q4',
          question: 'In the G1 (Garbage-First) Garbage Collector, how are memory heaps structured compared to traditional parallel/CMS collectors?',
          options: [
            'A single continuous memory pool divided into two halves',
            'Divided into thousands of equal-sized non-contiguous regions (1MB to 32MB) that are dynamically assigned Eden, Survivor, or Old roles, alongside Humongous regions for large objects',
            'Fixed hardware memory slots dedicated to each CPU core',
            'Every thread has its own isolated 4GB heap'
          ],
          correctIndex: 1,
          explanation: 'G1 divides the heap into equal-sized virtual regions. It tracks garbage density per region and prioritizes collecting regions with the most reclaimable space (Garbage-First) to meet user latency targets.',
          subtopic: 'G1 Collector Architecture'
        },
        {
          id: 'java-hard-q5',
          question: 'What is the consequence of Type Erasure regarding generic array creation in Java?',
          options: [
            'Generic arrays are automatically converted to LinkedLists',
            'Direct creation like "new E[10]" causes a compile error because the generic type parameter E is erased at runtime, leaving the JVM unable to verify array store type safety',
            'Generic arrays can only store primitive integers',
            'Generic arrays can only be used inside static methods'
          ],
          correctIndex: 1,
          explanation: 'Java arrays are reified and enforce runtime type checks. Generics are erased at compile time. Therefore, new E[10] cannot be checked for type safety by the JVM, resulting in a compile error.',
          subtopic: 'Generics & Type Erasure'
        },
        {
          id: 'java-hard-q6',
          question: 'What does ConcurrentHashMap use to achieve high write throughput without global table locking?',
          options: [
            'A single reentrant lock wrapping all operations',
            'Lock-free Compare-And-Swap (CAS) for inserting new bin root nodes, and synchronized locking only on the specific bucket head node for existing chains/trees, allowing concurrent writes to distinct bins',
            'Optimistic offline caching with periodic flush to disk',
            'Thread-local storage copies that merge upon read'
          ],
          correctIndex: 1,
          explanation: 'ConcurrentHashMap avoids coarse locks by using CAS for empty bin initialization and fine-grained per-bin head synchronization, allowing concurrent writes across distinct hash buckets.',
          subtopic: 'ConcurrentHashMap Internals'
        },
        {
          id: 'java-hard-q7',
          question: 'What is the behavior of the ZGC (Z Garbage Collector) regarding Stop-The-World (STW) pauses?',
          options: [
            'STW pauses scale linearly with heap size and can take several minutes on 1TB heaps',
            'Pauses are sub-millisecond (typically under 1ms) and do not increase with heap size because nearly all phases (marking, relocation, reference processing) execute concurrently with application threads',
            'ZGC does not pause at all because it uses reference counting',
            'ZGC requires dual GPUs to run'
          ],
          correctIndex: 1,
          explanation: 'ZGC is a scalable low-latency collector where pause times do not exceed 1 millisecond, even on multi-terabyte heaps, powered by colored pointers and load barriers.',
          subtopic: 'ZGC Low-Latency Mechanics'
        },
        {
          id: 'java-hard-q8',
          question: 'What will be printed by the following Java string interning snippet?',
          codeSnippet: `String s1 = new String("smartlearn");
String s2 = "smartlearn";
String s3 = s1.intern();

System.out.println((s1 == s2) + " " + (s2 == s3));`,
          options: [
            'true true',
            'false true',
            'false false',
            'true false'
          ],
          correctIndex: 1,
          explanation: 's1 is explicitly allocated as a distinct heap object, so s1 == s2 is false. Calling s1.intern() returns the canonical instance from the String Constant Pool, which is the same instance as literal s2, so s2 == s3 is true.',
          subtopic: 'String Pool & Interning'
        },
        {
          id: 'java-hard-q9',
          question: 'What is the primary difference between invokedynamic and other bytecode invoke instructions (invokevirtual, invokestatic, invokespecial)?',
          options: [
            'invokedynamic only calls native C++ methods',
            'invokedynamic defers the linkage of the call site to runtime using a bootstrap method returning a CallSite and MethodHandle, enabling dynamic language compilation and optimized lambdas',
            'invokedynamic is executed directly by the CPU without bytecode parsing',
            'invokedynamic requires reflection permissions'
          ],
          correctIndex: 1,
          explanation: 'Introduced in Java 7, invokedynamic decouples the bytecode instruction from fixed nominal method signatures, delegating resolution to user-defined bootstrap methods, which powers Java lambda expressions efficiently.',
          subtopic: 'Bytecode & Invokedynamic'
        },
        {
          id: 'java-hard-q10',
          question: 'In Java class loading, why does the JVM default to the "Parent-Delegation Model"?',
          options: [
            'To make sure classes are loaded in alphabetical order',
            'To maintain security and prevent malicious code from overriding foundational core classes like java.lang.Object or java.lang.String by ensuring parent loaders always get the first chance to load',
            'To allow circular dependency loops',
            'To compile classes to native code faster'
          ],
          correctIndex: 1,
          explanation: 'ClassLoaders delegate requests to their parent loader first. This guarantees core Java classes from the bootstrap loader cannot be spoofed or overridden by untrusted user classloaders.',
          subtopic: 'Classloader Delegation'
        }
      ]
    }
  },

  // 4. RUST TRACK
  {
    id: 'track-rust',
    name: 'Rust',
    slug: 'rust',
    icon: '🦀',
    color: 'from-orange-600 to-amber-800',
    badge: 'Systems & Safety',
    tagline: 'Memory safety without garbage collection, borrow checker, and fearless concurrency.',
    description: 'Learn Rust from ownership fundamentals to lifetimes, zero-cost abstractions, unsafe boundaries, and high-performance async Tokio pipelines.',
    totalModules: 9,
    estimatedHours: 20,
    videoCourse: {
      title: 'Rust Systems Programming: Memory Safety & Zero-Cost Abstractions',
      youtubeId: 'MsocPEZBd-M',
      instructor: 'Let\'s Get Rusty & freeCodeCamp',
      duration: '5h 15m',
      channel: 'freeCodeCamp.org',
      description: 'In-depth Rust journey explaining memory safety without garbage collection, borrow checker semantics, lifetimes, traits, and asynchronous Tokio runtime.',
      chapters: [
        { title: 'The Rust Philosophy, Cargo & Memory Models', timestamp: '00:00', seconds: 0 },
        { title: 'Ownership Rules & Stack vs Heap Semantics', timestamp: '25:10', seconds: 1510 },
        { title: 'References, Borrow Checker & Mutability Rules', timestamp: '1:05:20', seconds: 3920 },
        { title: 'Explicit Lifetimes & Compile-Time Safety', timestamp: '2:12:00', seconds: 7920 },
        { title: 'Traits, Generics & Dynamic Dispatch (dyn)', timestamp: '3:20:15', seconds: 12015 },
        { title: 'Tokio Async Runtime, Pin & Futures Pinning', timestamp: '4:10:30', seconds: 15030 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Foundational Scratch',
        description: 'Variables, mutability, ownership rules, moves, and borrow checker fundamentals.',
        lessons: [
          {
            id: 'rust-scratch-1',
            title: '1. Ownership & Move Semantics',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'The three laws of ownership: owners, moves, and automatic Drop destructors.',
            concepts: ['Stack vs Heap in Rust', 'Value ownership', 'Move vs Copy semantics', 'The Drop trait'],
            starterCode: `fn main() {
    let s1 = String::from("Rust Systems");
    let s2 = s1; // Ownership moves to s2. s1 is no longer valid!

    // println!("{}", s1); // Compile error!
    println!("s2 has ownership: {}", s2);
}`,
            expectedOutput: 's2 has ownership: Rust Systems',
            explanation: 'In Rust, assignment moves ownership of heap data. Because only one owner exists, there is never double-free memory corruption.',
            youtubeVideoId: 'MsocPEZBd-M',
            bugChallenge: {
              title: 'The Simultaneous Mutable and Immutable Borrow Defect',
              description: 'Find why the borrow checker rejects borrowing a vector immutably while holding a mutable reference.',
              buggyCode: `fn main() {\n    let mut numbers = vec![1, 2, 3];\n    let first = &numbers[0]; // immutable borrow\n    numbers.push(4);         // mutable borrow while first is active\n    println!("First: {}", first); // BUG: use of borrowed value after mutation\n}`,
              fixOptions: [
                'Print or use first before calling numbers.push(4), ending the immutable borrow scope',
                'Mark first as let mut first',
                'Clone the entire vector into a raw pointer',
                'Disable borrow checking with compiler flag'
              ],
              correctOptionIndex: 0,
              explanation: 'In Rust, numbers.push(4) may reallocate heap memory, which would leave the reference first dangling! The compiler enforces the Aliasing XOR Mutability law to eliminate dangling pointers at compile time.',
              xpReward: 75
            }
          },
          {
            id: 'rust-scratch-2',
            title: '2. Borrowing: References & Mutability',
            level: 'scratch',
            durationMinutes: 30,
            summary: 'The Aliasing XOR Mutability theorem: multiple &T or exactly one &mut T.',
            concepts: ['Immutable references (&T)', 'Mutable references (&mut T)', 'Aliasing XOR Mutability', 'Dangling pointer prevention'],
            starterCode: `fn calculate_length(s: &String) -> usize {
    s.len()
}

fn append_tag(s: &mut String) {
    s.push_str(" [Verified]");
}

fn main() {
    let mut msg = String::from("Engine Online");
    let len = calculate_length(&msg);
    append_tag(&mut msg);
    println!("{} (len: {})", msg, len);
}`,
            expectedOutput: 'Engine Online [Verified] (len: 13)',
            explanation: 'Borrowing lets functions read or mutate values without taking ownership, strictly verified by the compiler.'
          },
          {
            id: 'rust-scratch-3',
            title: '3. Pattern Matching, Enums & Option/Result',
            level: 'scratch',
            durationMinutes: 30,
            summary: 'Algebraic data types, the ? operator, and eliminating null pointers completely.',
            concepts: ['Enums with data', 'Option<T> vs null', 'Result<T, E> error handling', 'The ? propagation operator'],
            starterCode: `fn divide(numerator: f64, denominator: f64) -> Result<f64, String> {
    if denominator == 0.0 {
        Err(String::from("Division by zero"))
    } else {
        Ok(numerator / denominator)
    }
}

fn main() {
    match divide(100.0, 4.0) {
        Ok(val) => println!("Result: {}", val),
        Err(err) => println!("Error: {}", err),
    }
}`,
            expectedOutput: 'Result: 25',
            explanation: 'Rust enforces handling both success and failure states at compile time via Result and Option, preventing unhandled exceptions.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Systems',
        description: 'Lifetimes, Traits, generics, smart pointers (Box, Rc, RefCell), and thread safety.',
        lessons: [
          {
            id: 'rust-inter-1',
            title: '4. Lifetimes & Borrow Checker Annotations',
            level: 'intermediate',
            durationMinutes: 40,
            summary: 'Guiding the borrow checker with explicit lifetime parameters on returning references.',
            concepts: ['Lifetime syntax (\\\'a)', 'Lifetime elision rules', 'Structs with references', 'Preventing use-after-free'],
            starterCode: `fn longest<\\'a>(x: &\\'a str, y: &\\'a str) -> &\\'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let str1 = "Systems Architecture";
    let str2 = "Rust";
    println!("Longest: {}", longest(str1, str2));
}`,
            expectedOutput: 'Longest: Systems Architecture',
            explanation: 'Lifetime annotations do not alter how long values live; they inform the borrow checker how input and output reference lifetimes correlate.'
          },
          {
            id: 'rust-inter-2',
            title: '5. Traits & Static vs Dynamic Dispatch',
            level: 'intermediate',
            durationMinutes: 40,
            summary: 'Monomorphization (generics) vs Trait Objects (dyn Trait) vtables.',
            concepts: ['Trait definition & implementation', 'Trait bounds (where clause)', 'Monomorphization inlining', 'Dynamic dispatch with Box<dyn Trait>'],
            starterCode: `trait Summary {
    fn summarize(&self) -> String;
}

struct Module { name: String, hours: u32 }

impl Summary for Module {
    fn summarize(&self) -> String {
        format!("{}: {} hours", self.name, self.hours)
    }
}

fn main() {
    let m = Module { name: String::from("Tokio Async"), hours: 12 };
    println!("{}", m.summarize());
}`,
            expectedOutput: 'Tokio Async: 12 hours',
            explanation: 'Static dispatch creates specialized machine code per type with zero runtime overhead, while trait objects allow runtime polymorphism.'
          },
          {
            id: 'rust-inter-3',
            title: '6. Concurrency: Send, Sync & Arc<Mutex<T>>',
            level: 'intermediate',
            durationMinutes: 45,
            summary: 'Thread safety guaranteed at compile time through Send and Sync auto-traits.',
            concepts: ['std::thread::spawn', 'Arc (Atomic Reference Counted)', 'Mutex and lock acquisition', 'Send and Sync trait contracts'],
            starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..5 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", *counter.lock().unwrap());
}`,
            expectedOutput: 'Final count: 5',
            explanation: 'Arc enables thread-safe reference counting, while Mutex provides interior mutability across threads, fully verified by Send and Sync.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Architectures',
        description: 'Tokio async runtimes, Unsafe Rust, SIMD vectorization, and Foreign Function Interfaces (FFI).',
        lessons: [
          {
            id: 'rust-adv-1',
            title: '7. Async Rust & The Tokio Work-Stealing Runtime',
            level: 'advanced',
            durationMinutes: 50,
            summary: 'How futures are polled, pin projection, and multi-threaded work-stealing schedulers.',
            concepts: ['The Future trait & poll()', 'Waker and Context', 'Pinning and Unpin', 'Tokio runtime architecture'],
            starterCode: `// Demonstration of async task execution
async fn async_task(id: u32) -> String {
    format!("Task-{} processed asynchronously", id)
}

fn main() {
    println!("Tokio work-stealing scheduler multiplexes millions of futures on core threads.");
}`,
            expectedOutput: 'Tokio work-stealing scheduler multiplexes millions of futures on core threads.',
            explanation: 'Rust futures are state machines with zero heap allocation per task. Tokio executes them with low-latency work-stealing thread pools.'
          },
          {
            id: 'rust-adv-2',
            title: '8. Unsafe Rust & FFI Foreign Function Interface',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'Raw pointers, calling C functions, and designing sound safe abstractions around unsafe blocks.',
            concepts: ['*const T and *mut T raw pointers', 'extern "C" FFI linking', 'Soundness vs Safety', 'Undefined Behavior avoidance'],
            starterCode: `fn main() {
    let mut num = 42;
    // Creating raw pointers is 100% safe
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    // Dereferencing raw pointers requires unsafe
    unsafe {
        println!("r1 points to: {}", *r1);
        *r2 = 100;
        println!("r2 updated value to: {}", *r2);
    }
}`,
            expectedOutput: 'r1 points to: 42\nr2 updated value to: 100',
            explanation: 'Unsafe Rust provides raw hardware control while keeping the surrounding application safe and mathematically sound.'
          },
          {
            id: 'rust-adv-3',
            title: '9. SIMD Vectorization & Zero-Cost Iterators',
            level: 'advanced',
            durationMinutes: 45,
            summary: 'How LLVM auto-vectorizes Rust iterators into 256-bit AVX instructions that rival hand-coded C.',
            concepts: ['Iterator adapters and zero runtime cost', 'Auto-vectorization & SIMD', 'Inlining and loop unrolling', 'Benchmark profiling with Criterion'],
            starterCode: `fn main() {
    let numbers: Vec<i64> = (1..=1000).collect();
    let sum_of_squares: i64 = numbers.iter()
        .map(|&x| x * x)
        .filter(|&sq| sq % 2 == 0)
        .sum();

    println!("Sum of even squares: {}", sum_of_squares);
}`,
            expectedOutput: 'Sum of even squares: 167167000',
            explanation: 'Rust iterator chains compile down to identical or superior machine code compared to hand-written C for-loops through compiler inlining.'
          }
        ]
      }
    ],
    finalAssessment: {
      title: 'Rust Senior Systems Engineer Final Assessment (Hard)',
      passingScore: 75,
      timeLimitMinutes: 25,
      questions: [
        {
          id: 'rust-hard-q1',
          question: 'What happens when compiling the following Rust snippet involving multiple borrows?',
          codeSnippet: `fn main() {
    let mut data = vec![1, 2, 3];
    let ref1 = &data;
    let ref2 = &mut data;
    println!("{:?}", ref1);
}`,
          options: [
            'Compiles and prints [1, 2, 3]',
            'Compile error: cannot borrow data as mutable because it is also borrowed as immutable at the print site',
            'Compiles but produces a runtime panic',
            'data is automatically cloned'
          ],
          correctIndex: 1,
          explanation: 'Rust non-lexical lifetimes (NLL) enforce that an immutable borrow cannot overlap with a mutable borrow. Because ref1 is read in println! after ref2 is created, the compiler rejects the code.',
          subtopic: 'Aliasing XOR Mutability'
        },
        {
          id: 'rust-hard-q2',
          question: 'What is the purpose of the Pin<P> wrapper in async Rust?',
          options: [
            'To pin a thread to a specific CPU core',
            'To guarantee that the pointee data will never move to another memory address in RAM, which is required for self-referential generator futures generated by async/await',
            'To encrypt heap data',
            'To disable the garbage collector'
          ],
          correctIndex: 1,
          explanation: 'Async/await compiles into self-referential structs where internal pointers reference fields within the same struct. Pin guarantees memory stability, preventing pointers from becoming dangling if the struct moves.',
          subtopic: 'Pin and Self-Referential Futures'
        },
        {
          id: 'rust-hard-q3',
          question: 'Why does Rc<T> NOT implement the Send and Sync traits?',
          options: [
            'Because Rc uses standard unsynchronized non-atomic integer operations for its reference count, which would cause data races if accessed across multiple threads',
            'Because Rc only works on Linux',
            'Because Rc can only hold strings',
            'Because Rc uses a garbage collector'
          ],
          correctIndex: 0,
          explanation: 'Rc uses non-atomic reference counters for performance on a single thread. Arc uses atomic CPU instructions and implements Send/Sync.',
          subtopic: 'Send and Sync Traits'
        },
        {
          id: 'rust-hard-q4',
          question: 'What is the difference between Box<dyn Trait> and impl Trait in return position?',
          options: [
            'They are identical',
            'impl Trait uses static dispatch (monomorphization) returning a single concrete type known at compile time with zero heap allocation, whereas Box<dyn Trait> uses dynamic dispatch with a heap allocation and vtable indirection',
            'impl Trait is only available in C++',
            'Box<dyn Trait> cannot have methods'
          ],
          correctIndex: 1,
          explanation: 'impl Trait in return position is an unboxed static type determined at compile time. Box<dyn Trait> is a dynamically dispatched trait object with a vtable on the heap.',
          subtopic: 'Static vs Dynamic Dispatch'
        },
        {
          id: 'rust-hard-q5',
          question: 'Under what conditions does Rust invoke the Drop trait destructor on an object?',
          options: [
            'Only when manual free() is called',
            'Deterministically when the owning variable leaves its lexical scope, or when explicit drop(x) is invoked',
            'During garbage collection pauses',
            'When the OS process terminates'
          ],
          correctIndex: 1,
          explanation: 'Rust implements RAII deterministically: when an owner leaves lexical scope, its Drop::drop() method is executed automatically, reclaiming resources instantly.',
          subtopic: 'Deterministic Resource Reclamation'
        },
        {
          id: 'rust-hard-q6',
          question: 'What is "Interior Mutability" in Rust, and which type implements it safely at runtime?',
          options: [
            'Modifying global variables without a lock',
            'The ability to mutate data through an immutable reference (&T) by moving borrow checking rules to runtime, as implemented by RefCell<T>',
            'Mutating immutable strings using unsafe',
            'A compiler bug in older versions of Rust'
          ],
          correctIndex: 1,
          explanation: 'Interior mutability allows mutating data even when you only hold an immutable reference, verified at runtime by RefCell (or Mutex/RwLock for multi-threaded code).',
          subtopic: 'Interior Mutability & RefCell'
        },
        {
          id: 'rust-hard-q7',
          question: 'What is the result of dereferencing a dangling raw pointer inside an unsafe block?',
          options: [
            'The compiler issues an error',
            'It triggers Undefined Behavior (UB), which can lead to segfaults, silent data corruption, or optimizer miscompilations',
            'Rust catches the error and throws an exception',
            'The pointer returns 0'
          ],
          correctIndex: 1,
          explanation: 'Dereferencing an invalid raw pointer in an unsafe block is Undefined Behavior (UB). The compiler assumes UB never happens, allowing optimizations that may corrupt memory or crash the application.',
          subtopic: 'Unsafe Rust & Undefined Behavior'
        },
        {
          id: 'rust-hard-q8',
          question: 'What is "Monomorphization" in rustc?',
          options: [
            'The process of compiling Rust to WebAssembly',
            'The compile-time process of generating a copy of generic functions/types for each concrete type used, enabling zero-cost inlining at the expense of binary size',
            'Removing comments from source files',
            'Converting code into byte arrays'
          ],
          correctIndex: 1,
          explanation: 'Monomorphization generates dedicated machine code for every type used with generics, enabling aggressive optimization and inlining with zero runtime cost.',
          subtopic: 'Monomorphization'
        },
        {
          id: 'rust-hard-q9',
          question: 'In Rust, what is the significance of the std::mem::forget function?',
          options: [
            'It deletes the variable from RAM immediately',
            'It prevents the compiler from running the Drop destructor on the value, effectively leaking its memory or resource',
            'It clears CPU L1 cache lines',
            'It restarts the thread'
          ],
          correctIndex: 1,
          explanation: 'std::mem::forget consumes ownership of an object without invoking its destructor, intentional for low-level memory transfers and FFI.',
          subtopic: 'Memory Leak Safety'
        },
        {
          id: 'rust-hard-q10',
          question: 'Which of the following is true regarding Rust type inference for closures?',
          options: [
            'Closures cannot capture variables by reference',
            'The compiler generates a unique, anonymous struct for each closure and automatically implements Fn, FnMut, or FnOnce depending on how captured variables are used',
            'Closures are always dynamically dispatched via function pointers',
            'Closures can only be passed to static functions'
          ],
          correctIndex: 1,
          explanation: 'Each closure is a unique anonymous struct implementing FnOnce (consumes captures), FnMut (mutates captures), or Fn (reads captures), allowing optimal zero-cost inlining.',
          subtopic: 'Closure Traits (Fn, FnMut, FnOnce)'
        }
      ]
    }
  }
];

const EXPANDED_LESSONS_BY_TRACK_ID: Record<string, CodeLesson[]> = {
  'track-python': EXPANDED_PYTHON_LESSONS,
  'track-typescript': EXPANDED_TYPESCRIPT_LESSONS,
  'track-cpp': EXPANDED_CPP_LESSONS,
  'track-rust': EXPANDED_RUST_LESSONS,
  'track-go': EXPANDED_GO_LESSONS,
  'track-java': EXPANDED_JAVA_LESSONS,
  'track-csharp': EXPANDED_CSHARP_LESSONS,
  'track-kotlin': EXPANDED_KOTLIN_LESSONS,
};

function enrichTrack(track: ProgrammingLanguageTrack): ProgrammingLanguageTrack {
  const extraLessons = EXPANDED_LESSONS_BY_TRACK_ID[track.id] || [];
  if (extraLessons.length === 0) return track;

  const scratchExtra = extraLessons.filter(l => l.level === 'scratch');
  const intermediateExtra = extraLessons.filter(l => l.level === 'intermediate');
  const advancedExtra = extraLessons.filter(l => l.level === 'advanced');

  const updatedLevels = track.levels.map(lvl => {
    if (lvl.level === 'scratch') {
      return { ...lvl, lessons: [...lvl.lessons, ...scratchExtra] };
    }
    if (lvl.level === 'intermediate') {
      return { ...lvl, lessons: [...lvl.lessons, ...intermediateExtra] };
    }
    if (lvl.level === 'advanced') {
      return { ...lvl, lessons: [...lvl.lessons, ...advancedExtra] };
    }
    return lvl;
  });

  const total = updatedLevels.reduce((acc, l) => acc + l.lessons.length, 0);

  return {
    ...track,
    totalModules: total,
    levels: updatedLevels
  };
}

export const PROGRAMMING_TRACKS: ProgrammingLanguageTrack[] = [
  ...CORE_PROGRAMMING_TRACKS,
  ...ADDITIONAL_PROGRAMMING_TRACKS
].map(enrichTrack);

