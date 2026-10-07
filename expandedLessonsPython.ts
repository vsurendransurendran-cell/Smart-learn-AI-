import { CodeLesson } from '../types';

export const EXPANDED_PYTHON_LESSONS: CodeLesson[] = [
  {
    id: 'py-exp-1',
    title: 'Decorators with Arguments & @functools.wraps',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Master higher-order function wrappers that accept configuration parameters while preserving original metadata.',
    concepts: ['Three-tier closure nesting', 'functools.wraps metadata preservation', 'Preserving __name__ and __doc__', 'Execution profiling wrapper'],
    starterCode: `import functools
import time

def repeat(num_times):
    def decorator_repeat(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat

@repeat(num_times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Guido")
print(f"Function name preserved: {greet.__name__}")`,
    expectedOutput: 'Hello, Guido!\nHello, Guido!\nHello, Guido!\nFunction name preserved: greet',
    explanation: 'Decorators with parameters require a three-layer nested closure. functools.wraps copies the docstrings and function name from the wrapped function to avoid breaking inspection.',
    bugChallenge: {
      title: 'Missing wraps Docstring Loss',
      description: 'Without @functools.wraps, introspection tools and documentation generators report the wrapper name instead of the decorated function.',
      buggyCode: `def my_logger(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@my_logger\ndef compute_tax(val): return val * 0.2\n\n# BUG: prints 'wrapper' instead of 'compute_tax'\nprint(compute_tax.__name__)`,
      solutionCode: `import functools\n\ndef my_logger(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs)\n    return wrapper\n\n@my_logger\ndef compute_tax(val): return val * 0.2\n\nprint(compute_tax.__name__)`,
      hint: 'Decorate wrapper with @functools.wraps(func)',
      bugExplanation: '@functools.wraps copies __name__, __doc__, and __annotations__ from func to wrapper.'
    }
  },
  {
    id: 'py-exp-2',
    title: 'Context Managers & contextlib.contextmanager',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Implement robust resource management using generator-based context managers and __enter__/__exit__ protocols.',
    concepts: ['Context management protocol', 'Yield-based resource handling', 'Guaranteed cleanup via finally', 'Suppressing exceptions in __exit__'],
    starterCode: `from contextlib import contextmanager
import time

@contextmanager
def execution_timer(label):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = (time.perf_counter() - start) * 1000
        print(f"[{label}] Execution completed in {elapsed:.2f}ms")

with execution_timer("Array Allocation"):
    data = [x ** 2 for x in range(100_000)]
print(f"Created {len(data)} squared items")`,
    expectedOutput: '[Array Allocation] Execution completed in\nCreated 100000 squared items',
    explanation: '@contextlib.contextmanager turns a generator into a context manager where code before yield acts as __enter__ and the finally block acts as __exit__.',
    bugChallenge: {
      title: 'Uncaught Exception Resource Leak',
      description: 'The file handle is not properly closed when an exception occurs inside the generator body.',
      buggyCode: `from contextlib import contextmanager\n\n@contextmanager\ndef fake_db_lock():\n    print("Acquired Lock")\n    yield\n    print("Released Lock") # BUG: skipped if error thrown!`,
      solutionCode: `from contextlib import contextmanager\n\n@contextmanager\ndef fake_db_lock():\n    print("Acquired Lock")\n    try:\n        yield\n    finally:\n        print("Released Lock")`,
      hint: 'Wrap the yield in a try...finally block.',
      bugExplanation: 'Exceptions in the with-block are re-raised at yield; without try/finally, cleanup is bypassed.'
    }
  },
  {
    id: 'py-exp-3',
    title: 'Asyncio Tasks, Gather & Semaphore Rate Limiting',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Coordinate concurrent coroutines with asyncio.gather while enforcing concurrency caps using Semaphore.',
    concepts: ['AsyncIO event loop', 'asyncio.Semaphore concurrency gating', 'asyncio.gather batching', 'Cooperative multitasking'],
    starterCode: `import asyncio

async def fetch_worker(worker_id, sem):
    async with sem:
        print(f"Worker {worker_id} acquired slot")
        await asyncio.sleep(0.01)
        print(f"Worker {worker_id} finished")
        return worker_id * 10

async def main():
    sem = asyncio.Semaphore(2) # Limit to 2 concurrent workers
    tasks = [fetch_worker(i, sem) for i in range(4)]
    results = await asyncio.gather(*tasks)
    print("All tasks finished:", results)

asyncio.run(main())`,
    expectedOutput: 'Worker 0 acquired slot\nWorker 1 acquired slot\nAll tasks finished: [0, 10, 20, 30]',
    explanation: 'asyncio.Semaphore prevents resource exhaustion by bounding how many coroutines can enter an execution block concurrently.',
    bugChallenge: {
      title: 'Blocking I/O in Async Loop Trap',
      description: 'Calling time.sleep inside an async function blocks the entire single-threaded event loop.',
      buggyCode: `import asyncio, time\n\nasync def bad_task():\n    time.sleep(1) # BUG: blocks entire event loop!\n    return 42`,
      solutionCode: `import asyncio\n\nasync def bad_task():\n    await asyncio.sleep(0.01)\n    return 42`,
      hint: 'Use await asyncio.sleep instead of time.sleep.',
      bugExplanation: 'time.sleep is synchronous and halts the entire OS thread; asyncio.sleep yields control back to the event loop.'
    }
  },
  {
    id: 'py-exp-4',
    title: 'Dataclasses, default_factory & Frozen Immutability',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Simplify domain modeling with modern @dataclass, field default factories, and frozen immutability.',
    concepts: ['@dataclass decorator', 'frozen=True immutable records', 'field(default_factory=list)', '__post_init__ validation'],
    starterCode: `from dataclasses import dataclass, field
from typing import List

@dataclass(frozen=True)
class StudentRecord:
    id: int
    name: str
    skills: List[str] = field(default_factory=list)

rec = StudentRecord(101, "Anya", ["Python", "Rust"])
print(f"Student: {rec.name}, Skills: {rec.skills}")
# rec.name = "Modified"  # Would raise FrozenInstanceError`,
    expectedOutput: 'Student: Anya, Skills: [\'Python\', \'Rust\']',
    explanation: 'dataclasses automatically generate __init__, __repr__, and __eq__. default_factory prevents mutable default argument traps.',
    bugChallenge: {
      title: 'Mutable Default Argument in Dataclass',
      description: 'Using [] directly as a field default raises ValueError in dataclasses.',
      buggyCode: `from dataclasses import dataclass\n\n@dataclass\nclass Inventory:\n    items: list = [] # BUG: mutable default not allowed!`,
      solutionCode: `from dataclasses import dataclass, field\n\n@dataclass\nclass Inventory:\n    items: list = field(default_factory=list)`,
      hint: 'Use field(default_factory=list) for mutable defaults.',
      bugExplanation: 'Dataclasses reject mutable collections as default literals to avoid shared instance mutation.'
    }
  },
  {
    id: 'py-exp-5',
    title: 'Custom Iterators & Multi-Stage Generator Pipelines',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Chain memory-efficient streaming generators with yield from to process millions of records with constant RAM.',
    concepts: ['Iterator protocol (__iter__ & __next__)', 'Generator expressions', 'Streaming pipelines', 'yield from delegation'],
    starterCode: `def num_stream(limit):
    for i in range(1, limit + 1):
        yield i

def filter_evens(stream):
    for num in stream:
        if num % 2 == 0:
            yield num

def square_stream(stream):
    for num in stream:
        yield num ** 2

# Connect the pipeline
pipeline = square_stream(filter_evens(num_stream(10)))
print("Pipeline output:", list(pipeline))`,
    expectedOutput: 'Pipeline output: [4, 16, 36, 64, 100]',
    explanation: 'Generator pipelines compute values lazily one item at a time (O(1) memory footprint), streaming data without loading full lists into RAM.',
    bugChallenge: {
      title: 'Generator Exhaustion Trap',
      description: 'Attempting to iterate over a generator a second time yields an empty sequence.',
      buggyCode: `gen = (x * 2 for x in range(3))\nlist1 = list(gen)\nlist2 = list(gen) # BUG: list2 is []!`,
      solutionCode: `def make_gen(): return (x * 2 for x in range(3))\nlist1 = list(make_gen())\nlist2 = list(make_gen())`,
      hint: 'Generators are single-pass iterators; re-create the generator to iterate again.',
      bugExplanation: 'Once a generator raises StopIteration, its internal frame is exhausted and cannot be rewound.'
    }
  },
  {
    id: 'py-exp-6',
    title: 'Metaclasses & __init_subclass__ Registry',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Implement automated plugin registries and schema validation using Python modern __init_subclass__ hook.',
    concepts: ['Metaclass mechanics', '__init_subclass__ alternative', 'Automated plugin registration', 'Class construction interception'],
    starterCode: `class PluginBase:
    registry = {}

    def __init_subclass__(cls, plugin_name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        name = plugin_name or cls.__name__.lower()
        cls.registry[name] = cls
        print(f"Registered plugin: '{name}' -> {cls.__name__}")

class JsonExporter(PluginBase, plugin_name="json"):
    def export(self): return "{'format': 'json'}"

class CsvExporter(PluginBase, plugin_name="csv"):
    def export(self): return "col1,col2"

print("Available Plugins:", list(PluginBase.registry.keys()))`,
    expectedOutput: 'Registered plugin: \'json\' -> JsonExporter\nRegistered plugin: \'csv\' -> CsvExporter\nAvailable Plugins: [\'json\', \'csv\']',
    explanation: '__init_subclass__ provides a clean, Pythonic alternative to metaclasses for intercepting subclass creation and building plugin catalogs.',
    bugChallenge: {
      title: 'Missing super().__init_subclass__ Call',
      description: 'Failing to propagate kwargs to super().__init_subclass__ breaks cooperative multiple inheritance.',
      buggyCode: `class Base:\n    def __init_subclass__(cls, **kwargs):\n        pass # BUG: ignores cooperative chain!`,
      solutionCode: `class Base:\n    def __init_subclass__(cls, **kwargs):\n        super().__init_subclass__(**kwargs)`,
      hint: 'Always invoke super().__init_subclass__(**kwargs).',
      bugExplanation: 'Calling super().__init_subclass__ ensures mixins and parent classes in the MRO receive their configuration.'
    }
  },
  {
    id: 'py-exp-7',
    title: 'Advanced Type Annotations: TypeVar, Generic & ParamSpec',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Build type-safe reusable abstractions and decorators using typing.TypeVar and ParamSpec.',
    concepts: ['TypeVar generics', 'Generic[T] classes', 'ParamSpec for decorator type preservation', 'Callable[[...], R] annotations'],
    starterCode: `from typing import TypeVar, Generic, List

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def peek(self) -> T:
        return self._items[-1]

int_stack = Stack[int]()
int_stack.push(10)
int_stack.push(20)
print(f"Popped from typed stack: {int_stack.pop()}")`,
    expectedOutput: 'Popped from typed stack: 20',
    explanation: 'TypeVar enables static analysis tools like mypy to enforce type consistency across parameters and return values without runtime overhead.',
    bugChallenge: {
      title: 'Unbound TypeVar Error',
      description: 'Instantiating a TypeVar without generic class inheritance causes static type checker failures.',
      buggyCode: `from typing import TypeVar\nT = TypeVar('T')\nclass Container: # BUG: Missing Generic[T]\n    def __init__(self, val: T): self.val = val`,
      solutionCode: `from typing import TypeVar, Generic\nT = TypeVar('T')\nclass Container(Generic[T]):\n    def __init__(self, val: T): self.val = val`,
      hint: 'Inherit from Generic[T] in the class definition.',
      bugExplanation: 'Generic classes must inherit from typing.Generic parameterized with the TypeVar instances they use.'
    }
  },
  {
    id: 'py-exp-8',
    title: 'Memory Optimization with __slots__ & sys.getsizeof',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Eliminate the dynamic __dict__ overhead on millions of class instances to reduce RAM usage by up to 60%.',
    concepts: ['__slots__ attribute', 'Bypassing __dict__ and __weakref__', 'Memory profiling with sys.getsizeof', 'Attribute access speedup'],
    starterCode: `import sys

class StandardPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class SlottedPoint:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

std_pt = StandardPoint(10, 20)
slot_pt = SlottedPoint(10, 20)

print("Standard point has __dict__:", hasattr(std_pt, '__dict__'))
print("Slotted point has __dict__:", hasattr(slot_pt, '__dict__'))
print(f"Slotted point values: x={slot_pt.x}, y={slot_pt.y}")`,
    expectedOutput: 'Standard point has __dict__: True\nSlotted point has __dict__: False\nSlotted point values: x=10, y=20',
    explanation: '__slots__ tells CPython to allocate a fixed-size descriptor array instead of a dictionary for instance attributes, drastically saving memory.',
    bugChallenge: {
      title: 'Slotted Subclass Dict Re-creation Bug',
      description: 'A subclass of a slotted class inadvertently re-creates __dict__ if it does not declare its own __slots__.',
      buggyCode: `class Parent:\n    __slots__ = ('a',)\nclass Child(Parent):\n    pass # BUG: re-introduces __dict__!\nc = Child()\nprint(hasattr(c, '__dict__'))`,
      solutionCode: `class Parent:\n    __slots__ = ('a',)\nclass Child(Parent):\n    __slots__ = ('b',)\nc = Child()\nprint(hasattr(c, '__dict__'))`,
      hint: 'Define __slots__ in every subclass in the hierarchy.',
      bugExplanation: 'Subclasses inherit parent slots, but Python adds a __dict__ to subclasses unless they explicitly define __slots__.'
    }
  },
  {
    id: 'py-exp-9',
    title: 'Structural Pattern Matching (match / case)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Deconstruct complex dictionaries, tuples, and objects cleanly using Python 3.10+ pattern matching.',
    concepts: ['match / case syntax', 'Sequence & mapping patterns', 'Guard expressions (if clause)', 'Wildcard _ capture'],
    starterCode: `def process_command(event):
    match event:
        case {"action": "move", "direction": dir, "speed": s} if s > 100:
            return f"Sprint {dir} at high velocity {s}km/h"
        case {"action": "move", "direction": dir}:
            return f"Normal walk towards {dir}"
        case {"action": "jump", "height": h}:
            return f"Jump {h} meters"
        case _:
            return "Unknown command"

print(process_command({"action": "move", "direction": "North", "speed": 150}))
print(process_command({"action": "move", "direction": "South"}))
print(process_command({"action": "jump", "height": 2.5}))`,
    expectedOutput: 'Sprint North at high velocity 150km/h\nNormal walk towards South\nJump 2.5 meters',
    explanation: 'Structural pattern matching inspects data shapes and extracts sub-values directly in match branches with optional guard conditions.',
    bugChallenge: {
      title: 'Wildcard Ordering Bug',
      description: 'Placing the wildcard _ case before specific patterns causes subsequent cases to become unreachable dead code.',
      buggyCode: `def test(val):\n    match val:\n        case _: return "Catch all"\n        case 1: return "One" # BUG: unreachable!`,
      solutionCode: `def test(val):\n    match val:\n        case 1: return "One"\n        case _: return "Catch all"`,
      hint: 'Move case _: to the very end of the match block.',
      bugExplanation: 'Case clauses are evaluated in top-to-bottom order; wildcard matches anything unconditionally.'
    }
  },
  {
    id: 'py-exp-10',
    title: 'Multiprocessing & ProcessPoolExecutor for CPU-Bound Work',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Bypass the Global Interpreter Lock (GIL) to utilize all CPU hardware cores for parallel computation.',
    concepts: ['Global Interpreter Lock (GIL)', 'ProcessPoolExecutor pool', 'IPC serialization with pickle', 'Chunksize batching'],
    starterCode: `from concurrent.futures import ProcessPoolExecutor
import math

def compute_heavy_factorials(n):
    return sum(math.factorial(i) for i in range(n))

data = [15, 16, 17, 18]
# In sandbox, emulate pool mapping
results = [compute_heavy_factorials(x) for x in data]
print("Computed parallel sum of factorials:", len(results))`,
    expectedOutput: 'Computed parallel sum of factorials: 4',
    explanation: 'ProcessPoolExecutor spawns separate OS worker processes, each with its own Python interpreter and GIL, achieving true multicore execution.',
    bugChallenge: {
      title: 'Pickling Lambda in Process Pool Bug',
      description: 'Passing non-top-level functions or lambdas into ProcessPoolExecutor raises a PicklingError.',
      buggyCode: `from concurrent.futures import ProcessPoolExecutor\n# BUG: lambdas cannot be pickled across processes\n# pool.map(lambda x: x*2, [1, 2, 3])`,
      solutionCode: `def double(x): return x * 2\n# Top-level named functions can be safely pickled and dispatched`,
      hint: 'Use a top-level named function instead of a lambda.',
      bugExplanation: 'Python multiprocessing relies on pickle; lambdas lack a distinct top-level import path and fail serialization.'
    }
  },
  {
    id: 'py-exp-11',
    title: 'Sockets & Low-Level TCP Client-Server Networking',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Communicate across network boundaries using the BSD socket API and structured byte buffers.',
    concepts: ['socket.AF_INET & SOCK_STREAM', 'Three-way handshake', 'Byte encoding & decoding', 'Buffer chunking'],
    starterCode: `import socket

# Create loopback socket pair representation
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket family:", client.family.name)
print("Socket type:", client.type.name)
client.close()
print("Socket successfully bound and closed.")`,
    expectedOutput: 'Socket family: AF_INET\nSocket type: SOCK_STREAM\nSocket successfully bound and closed.',
    explanation: 'Sockets provide the operating system transport interface for TCP/IP streams, requiring explicit binary payload encoding (utf-8).',
    bugChallenge: {
      title: 'String Instead of Bytes in Socket Send Bug',
      description: 'Passing str directly to socket.send() raises TypeError in Python 3.',
      buggyCode: `import socket\n# sock.send("GET / HTTP/1.1") # BUG: TypeError!`,
      solutionCode: `import socket\n# sock.send(b"GET / HTTP/1.1") or sock.send("GET /".encode('utf-8'))`,
      hint: 'Encode strings to bytes before sending.',
      bugExplanation: 'Python 3 separates str (Unicode) from bytes (raw 8-bit octets); sockets only transmit raw bytes.'
    }
  },
  {
    id: 'py-exp-12',
    title: 'Regular Expressions with Named Groups & re.VERBOSE',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Construct readable, self-documenting regular expressions using re.VERBOSE and named capture groups.',
    concepts: ['re.compile with re.VERBOSE', 'Named groups (?P<name>pattern)', 'groupdict() extraction', 'Substitution with backreferences'],
    starterCode: `import re

log_pattern = re.compile(r"""
    ^
    (?P<ip>[\\d\\.]+)\\s+       # Client IP
    \\[(?P<timestamp>[^\\]]+)\\]\\s+ # Timestamp
    "(?P<method>[A-Z]+)\\s+    # HTTP Verb
    (?P<path>\\S+)"\\s+         # Request URI
    (?P<status>\\d{3})         # HTTP Code
""", re.VERBOSE)

sample_log = '192.168.1.1 [15/Sep/2026:10:00:00] "GET /api/v1/users" 200'
match = log_pattern.match(sample_log)
if match:
    data = match.groupdict()
    print(f"IP: {data['ip']}, Method: {data['method']}, Status: {data['status']}")`,
    expectedOutput: 'IP: 192.168.1.1, Method: GET, Status: 200',
    explanation: 're.VERBOSE allows whitespace and comments inside regex strings, transforming cryptic pattern tokens into maintainable engineering code.',
    bugChallenge: {
      title: 'Raw String Escaping Omission Bug',
      description: 'Omitting the r prefix in regex strings causes Python string parser to interpret backslashes as escape characters.',
      buggyCode: `import re\n# BUG: "\\d+" without raw prefix might escape unexpectedly\npat = re.compile("\d+")`,
      solutionCode: `import re\npat = re.compile(r"\d+")`,
      hint: 'Always prefix regex literals with r to denote raw strings.',
      bugExplanation: 'Without r"", backslashes are first processed by Python string escape rules before reaching the regex engine.'
    }
  },
  {
    id: 'py-exp-13',
    title: 'Binary Data Processing with struct & memoryview',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Pack and unpack binary network protocols and file headers with zero-copy memory buffers.',
    concepts: ['struct.pack & struct.unpack', 'Format characters (!I, 4s, f)', 'Zero-copy slicing with memoryview', 'Endianness byte ordering'],
    starterCode: `import struct

# Format: ! (network endian), I (uint32 length), 4s (4 chars magic), H (uint16 code)
fmt = "!I4sH"
magic = b"PKT1"
packet = struct.pack(fmt, 1024, magic, 200)

print(f"Packed bytes length: {len(packet)} bytes")
unpacked = struct.unpack(fmt, packet)
print(f"Unpacked: length={unpacked[0]}, magic={unpacked[1].decode()}, code={unpacked[2]}")`,
    expectedOutput: 'Packed bytes length: 10 bytes\nUnpacked: length=1024, magic=PKT1, code=200',
    explanation: 'The struct module packs Python values into C structs represented as bytes objects, essential for binary wire formats and IoT telemetry.',
    bugChallenge: {
      title: 'Endianness Mismatch Bug',
      description: 'Using native endianness (@) instead of network standard (!) produces corrupt integers across different CPU architectures.',
      buggyCode: `import struct\n# data = struct.pack("I", 1) # BUG: architecture-dependent!`,
      solutionCode: `import struct\ndata = struct.pack("!I", 1) # Network big-endian guaranteed`,
      hint: 'Use the ! prefix for network protocols.',
      bugExplanation: '! guarantees big-endian format conforming to RFC network standard regardless of host CPU architecture.'
    }
  },
  {
    id: 'py-exp-14',
    title: 'High-Performance Math & Vectorization Concepts',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Understand cache locality and vectorized array operations versus standard Python loops.',
    concepts: ['Vectorization principles', 'Contiguous memory layout', 'CPU SIMD registers', 'O(N) loop overhead vs C speed'],
    starterCode: `import time

# Vectorized simulation with array operations
def simulate_vector_add(a, b):
    # Pure Python simulation of element-wise SIMD
    return [x + y for x, y in zip(a, b)]

vec_a = list(range(1000))
vec_b = list(range(1000, 2000))
result = simulate_vector_add(vec_a, vec_b)
print(f"Processed {len(result)} items. First: {result[0]}, Last: {result[-1]}")`,
    expectedOutput: 'Processed 1000 items. First: 1000, Last: 2998',
    explanation: 'Vectorized computing delegates iteration to pre-compiled C/Fortran routines that utilize CPU vector extensions (AVX/NEON).',
    bugChallenge: {
      title: 'Python List Multiplication Trap',
      description: 'Using [0] * 5 creates shallow reference repetitions instead of independent memory allocations when nested.',
      buggyCode: `matrix = [[0] * 3] * 3\nmatrix[0][0] = 99 # BUG: modifies column 0 for all rows!`,
      solutionCode: `matrix = [[0] * 3 for _ in range(3)]\nmatrix[0][0] = 99`,
      hint: 'Use list comprehension for outer dimensions.',
      bugExplanation: 'The * operator on lists copies references; nested lists become three pointers to the identical inner list.'
    }
  },
  {
    id: 'py-exp-15',
    title: 'Weak References with weakref to Prevent Cycles',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Build memory-safe caches and observer patterns using weak references that allow the garbage collector to reclaim memory.',
    concepts: ['Reference counting in CPython', 'Cyclic reference garbage collector', 'weakref.ref & weakref.WeakValueDictionary', 'Dead object callbacks'],
    starterCode: `import weakref

class CacheItem:
    def __init__(self, name):
        self.name = name

item = CacheItem("Temporary Token")
r = weakref.ref(item)

print(f"Referenced item: {r().name}")
del item # Remove strong reference
print(f"After deletion, weak reference resolves to: {r()}")`,
    expectedOutput: 'Referenced item: Temporary Token\nAfter deletion, weak reference resolves to: None',
    explanation: 'Weak references point to an object without increasing its reference count, preventing memory leaks in bidirectional graph relationships.',
    bugChallenge: {
      title: 'Weakref on Primitive Type Failure',
      description: 'Attempting to create a weak reference to built-in types like int or str raises a TypeError.',
      buggyCode: `import weakref\n# r = weakref.ref(42) # BUG: TypeError: cannot create weak reference to 'int'`,
      solutionCode: `import weakref\nclass Box: pass\nb = Box()\nr = weakref.ref(b)`,
      hint: 'Weakref requires user-defined instances or collections.',
      bugExplanation: 'Built-in value types omit the __weakref__ slot for memory efficiency and do not support weak referencing.'
    }
  },
  {
    id: 'py-exp-16',
    title: 'Custom Exceptions & Exception Chaining (raise from)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Design descriptive application domain exceptions and preserve root causes using Python raise from syntax.',
    concepts: ['Custom exception hierarchies', 'raise ... from ... chaining', '__cause__ and __context__ attributes', 'Fail-fast exception handling'],
    starterCode: `class DatabaseError(Exception):
    """Base exception for persistence errors."""
    pass

class RecordNotFoundError(DatabaseError):
    def __init__(self, table, record_id):
        super().__init__(f"Record {record_id} not found in table '{table}'")

try:
    try:
        raise KeyError("user_999")
    except KeyError as raw_err:
        raise RecordNotFoundError("users", 999) from raw_err
except RecordNotFoundError as custom_err:
    print(f"Caught: {custom_err}")
    print(f"Original root cause: {type(custom_err.__cause__).__name__}")`,
    expectedOutput: 'Caught: Record 999 not found in table \'users\'\nOriginal root cause: KeyError',
    explanation: 'Exception chaining via raise ... from links error instances in the __cause__ attribute, preserving diagnostic stack traces for post-mortems.',
    bugChallenge: {
      title: 'Swallowing Traceback with Bare Raise',
      description: 'Raising a new exception without from suppresses the original root cause context in tracebacks.',
      buggyCode: `try:\n    1 / 0\nexcept ZeroDivisionError:\n    raise RuntimeError("Math error") # BUG: Root cause suppressed!`,
      solutionCode: `try:\n    1 / 0\nexcept ZeroDivisionError as err:\n    raise RuntimeError("Math error") from err`,
      hint: 'Add from err to the raise statement.',
      bugExplanation: 'Chaining with from explicitly attributes causality to the underlying system error.'
    }
  },
  {
    id: 'py-exp-17',
    title: 'CFFI & ctypes: Calling Native C Libraries',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Invoke compiled C functions directly from Python without writing C extension boilerplate.',
    concepts: ['ctypes foreign function interface', 'C data type mappings (c_int, c_char_p)', 'Memory safety boundaries', 'Dynamic library loading'],
    starterCode: `import ctypes

# Access C runtime abs function via ctypes
try:
    # Use standard ctypes primitive
    val = ctypes.c_int(-42)
    print("ctypes initialized integer:", val.value)
    val.value = 100
    print("Mutated ctypes integer value:", val.value)
except Exception as e:
    print("ctypes error:", e)`,
    expectedOutput: 'ctypes initialized integer: -42\nMutated ctypes integer value: 100',
    explanation: 'ctypes provides C compatible data types and allows calling functions in DLLs or shared libraries (.so / .dylib).',
    bugChallenge: {
      title: 'Missing argtypes Declaration Bug',
      description: 'Calling C functions without defining argtypes causes undefined memory reads when passing pointers or 64-bit integers.',
      buggyCode: `import ctypes\n# func.restype = ctypes.c_int\n# BUG: func(42) might corrupt stack if 64-bit int expected!`,
      solutionCode: `import ctypes\n# func.argtypes = [ctypes.c_int64]\n# func.restype = ctypes.c_int64`,
      hint: 'Always configure both argtypes and restype on foreign C functions.',
      bugExplanation: 'Explicit argument types allow ctypes to cast Python primitives into correct machine register sizes.'
    }
  },
  {
    id: 'py-exp-18',
    title: 'Structured JSON Logging with logging.LoggerAdapter',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Standardize telemetry and request tracing across microservices with structured JSON log formatters.',
    concepts: ['logging module hierarchy', 'Custom LogRecord formatters', 'LoggerAdapter contextual enrichment', 'Correlation IDs'],
    starterCode: `import json
import logging

class StructuredLogHandler(logging.Handler):
    def emit(self, record):
        log_payload = {
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "request_id": getattr(record, 'request_id', 'none')
        }
        print(json.dumps(log_payload))

logger = logging.getLogger("api_gateway")
logger.setLevel(logging.INFO)
logger.addHandler(StructuredLogHandler())

# Add contextual log record
extra_data = {'request_id': 'req-984a-f821'}
logger.info("Payment processed successfully", extra=extra_data)`,
    expectedOutput: '{"level": "INFO", "message": "Payment processed successfully", "module":',
    explanation: 'Structured logging outputs machine-readable JSON that cloud log aggregators (CloudWatch, Datadog, BigQuery) can index and filter instantly.',
    bugChallenge: {
      title: 'String Interpolation in Logger Bug',
      description: 'Using f-strings in logger calls evaluates string formatting even when the log level is disabled.',
      buggyCode: `import logging\n# BUG: computes heavy format even if DEBUG disabled\nlogging.debug(f"Computed matrix: {sum(range(1_000_000))}")`,
      solutionCode: `import logging\n# Lazy format evaluation only occurs if log level is active\nlogging.debug("Computed count: %s", 42)`,
      hint: 'Use %s parameters rather than inline f-strings for deferred evaluation.',
      bugExplanation: 'Lazy parameter passing avoids expensive string concatenations when the message is filtered out by log levels.'
    }
  },
  {
    id: 'py-exp-19',
    title: 'Unit Testing & Parametrized Fixtures with pytest',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Write robust, clean unit tests using pytest parametrization and setup/teardown test fixtures.',
    concepts: ['pytest.fixture scopes', '@pytest.mark.parametrize', 'Assertion introspection', 'Mocking side effects'],
    starterCode: `# Simulation of parametrized testing logic
def calculate_grade(score):
    if score >= 90: return "A"
    if score >= 80: return "B"
    return "C"

test_cases = [
    (95, "A"),
    (85, "B"),
    (72, "C")
]

all_passed = True
for score, expected in test_cases:
    actual = calculate_grade(score)
    assert actual == expected, f"Failed for {score}: expected {expected}, got {actual}"
    print(f"PASS: score {score} -> grade {actual}")

print("All test suites verified successfully!")`,
    expectedOutput: 'PASS: score 95 -> grade A\nPASS: score 85 -> grade B\nPASS: score 72 -> grade C\nAll test suites verified successfully!',
    explanation: 'Parametrization runs the same test logic against dozens of boundary input matrices without duplicating assertion code.',
    bugChallenge: {
      title: 'Fixture Scope Mutation Leak',
      description: 'Using a session-scoped mutable fixture without teardown allows tests to corrupt state for subsequent tests.',
      buggyCode: `@pytest.fixture(scope="session")\ndef shared_list():\n    return [] # BUG: tests mutate and pollute each other!`,
      solutionCode: `@pytest.fixture(scope="function")\ndef isolated_list():\n    return [] # Fresh instance per test function`,
      hint: 'Use scope="function" to isolate test fixtures.',
      bugExplanation: 'Function-scoped fixtures guarantee test hermeticity and prevent ordering-dependent test flakiness.'
    }
  },
  {
    id: 'py-exp-20',
    title: 'CPython Abstract Syntax Tree (AST) Inspection',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Inspect, parse, and analyze Python source code programmatically using the built-in ast module.',
    concepts: ['ast.parse source translation', 'AST Node Visitors (ast.NodeVisitor)', 'Static analysis & linter design', 'Bytecode compilation'],
    starterCode: `import ast

code_sample = """
def add(a, b):
    return a + b
"""

tree = ast.parse(code_sample)

class FunctionLister(ast.NodeVisitor):
    def visit_FunctionDef(self, node):
        print(f"Found Function: '{node.name}' with {len(node.args.args)} argument(s)")
        self.generic_visit(node)

visitor = FunctionLister()
visitor.visit(tree)
print("AST Root Type:", type(tree).__name__)`,
    expectedOutput: 'Found Function: \'add\' with 2 argument(s)\nAST Root Type: Module',
    explanation: 'The ast module exposes the grammar tree generated during Python tokenization, allowing you to build custom static linters and code transformers.',
    bugChallenge: {
      title: 'Missing generic_visit Traversal Bug',
      description: 'Omitting self.generic_visit(node) inside an AST visitor method terminates recursive traversal of child nodes.',
      buggyCode: `class MyVisitor(ast.NodeVisitor):\n    def visit_ClassDef(self, node):\n        print(node.name)\n        # BUG: forgets self.generic_visit(node), ignoring inner methods!`,
      solutionCode: `class MyVisitor(ast.NodeVisitor):\n    def visit_ClassDef(self, node):\n        print(node.name)\n        self.generic_visit(node)`,
      hint: 'Call self.generic_visit(node) to traverse children.',
      bugExplanation: 'Without generic_visit, child AST nodes nested inside classes or functions are silently skipped.'
    }
  }
];
