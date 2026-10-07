import { LibraryBook } from '../../types';

export const PROGRAMMING_BOOKS: LibraryBook[] = [
  // 5. PYTHON 3 INTERNALS (10 PAGES)
  {
    id: 'book-python-internals',
    title: 'Python 3 Internals: From CPython VM to High-Performance Async',
    author: 'Dr. Raymond Hettinger & Elena Rostova',
    category: 'languages',
    badge: 'Python Mastery',
    description: 'A 15-page deep dive into CPython bytecode, GIL mechanics, memory allocators, generators, async event loops, and Python 3.13 JIT.',
    coverEmoji: '🐍',
    coverColor: 'from-emerald-600 to-teal-800',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The CPython Compilation Pipeline & Bytecode',
        content: `Python is frequently termed an "interpreted" language, but standard CPython executes code via a multi-stage compilation pipeline. When a Python script runs, the source text is parsed into concrete syntax trees, transformed into an Abstract Syntax Tree (AST), and then compiled into bytecode (.pyc) instructions executed by the CPython virtual machine.

You can inspect bytecode directly using the built-in 'dis' module:
\`\`\`python
import dis
def compute(x, y):
    return x * 2 + y
dis.dis(compute)
\`\`\`
The virtual machine operates as a stack-based evaluation loop. Instructions such as LOAD_FAST, BINARY_MULTIPLY, and BINARY_ADD push and pop pointers to PyObject structures on an execution frame stack. Understanding this evaluation loop is essential for recognizing bytecode overhead and performance bottlenecks.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: The PyObject Architecture & Dynamic Typing',
        content: `In CPython, everything is an object. Even a simple integer like 42 is represented as a heap-allocated C struct named 'PyLongObject', wrapping a 'PyObject' header.

The PyObject header contains two crucial fields:
1. ob_refcnt: The 64-bit reference counter for deterministic memory reclamation.
2. ob_type: A pointer to the type object (e.g., &PyLong_Type) defining method tables, hashing, and size.

Because every variable is a pointer to a heap-allocated PyObject, Python incurs pointer indirection overhead and memory fragmentation compared to contiguous unboxed arrays in C++ or Rust. However, this uniformity powers Python's dynamic polymorphism and introspection.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Reference Counting & Cyclic Garbage Collection',
        content: `Python manages memory through a dual-engine garbage collector:
1. Deterministic Reference Counting: Whenever a reference is created, ob_refcnt increments; when a reference goes out of scope or is deleted, ob_refcnt decrements. When ob_refcnt drops to zero, the memory is deallocated instantly.
2. Cyclic Garbage Collector: Reference counting cannot reclaim circular references (e.g., Object A references B, and B references A). To resolve this, CPython runs a generational cyclic GC using double-linked lists across three generations (Gen 0, 1, and 2).

You can inspect and tune collection thresholds using 'gc.get_threshold()' and 'gc.collect()'. For latency-sensitive web workers, disabling GC during short-lived batch jobs avoids unpredictable latency pauses.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: The Global Interpreter Lock (GIL) Demystified',
        content: `The Global Interpreter Lock (GIL) is a mutex that prevents multiple native OS threads from executing Python bytecode simultaneously within a single CPython process.

Why does the GIL exist? CPython's memory management and C extensions are not thread-safe; without the GIL, concurrent modifications to 'ob_refcnt' would cause race conditions and memory corruption.
- For I/O-bound tasks (network requests, disk writes, database queries), threads release the GIL while waiting on the OS kernel, allowing concurrent execution.
- For CPU-bound tasks (matrix multiplication, image processing), standard multi-threading provides zero speedup due to GIL contention. CPU parallelism requires the 'multiprocessing' module or free-threaded Python (PEP 703).`
      },
      {
        pageNumber: 5,
        title: 'Page 5: PyMalloc and Memory Arena Allocators',
        content: `Allocating millions of tiny objects using the standard OS 'malloc()' leads to severe memory fragmentation and kernel context switch overhead. CPython implements an optimized memory allocator called 'PyMalloc' for allocations smaller than 512 bytes.

PyMalloc organizes memory into a hierarchical structure:
1. Arenas: 256 KB memory chunks requested directly from the system allocator.
2. Pools: 4 KB subdivisions within an arena, dedicated to objects of a single size class (e.g., 32-byte pool, 64-byte pool).
3. Blocks: Fixed-size allocation slots carved out within each pool.

Because pools only contain objects of identical size, freeing a block allows immediate reuse without fragmentation. Objects larger than 512 bytes bypass PyMalloc and route to system malloc.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Iterators, Generators, and Yield Suspension',
        content: `Iterators adhere to the Iterator Protocol by implementing '__iter__()' and '__next__()'. Generators provide an elegant syntax to create stateful iterators using the 'yield' keyword.

When a generator function executes a 'yield' statement, the CPython runtime freezes its execution frame:
- The instruction pointer (f_lasti) is preserved.
- Local variables on the frame stack remain intact in heap memory.
- Control returns to the caller.

When 'next()' is invoked again, the frame resumes exactly where it paused. This enables memory-efficient streaming of gigabyte-scale log files with O(1) memory overhead.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Metaclasses and Class Construction Mechanics',
        content: `In Python, classes themselves are runtime objects, and their type is a "metaclass" (by default, 'type'). Metaclasses allow developers to intercept, inspect, and mutate class definitions before the class is instantiated.

The class creation lifecycle:
1. The class body executes in a newly created namespace dictionary.
2. The metaclass '__new__(mcs, name, bases, namespace)' is invoked, allocating the class object.
3. The metaclass '__init__(cls, name, bases, namespace)' initializes class-level attributes.

Libraries like Pydantic and Django ORM leverage metaclasses and '__init_subclass__' to generate schema validators, database column mappings, and automated serialization boilerplate.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Asynchronous Concurrency & Asyncio Event Loops',
        content: `Asyncio provides cooperative multitasking using an event loop running on a single thread. Instead of preemptive OS thread scheduling, coroutines explicitly yield control back to the event loop using 'await'.

Core asyncio components:
- Event Loop: Manages OS-level non-blocking sockets via 'epoll' (Linux) or 'kqueue' (macOS).
- Coroutines: Functions defined with 'async def' that compile to generator-like code objects returning awaitable task futures.
- Tasks: Wrappers that schedule coroutines on the loop and track execution state.

Cooperative concurrency avoids the memory overhead of OS thread stacks (typically 8MB per thread), enabling a single Python process to service 50,000+ concurrent WebSocket connections.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: High-Performance Vectorization & NumPy C-Bridges',
        content: `Pure Python loops suffer from type checking and dynamic dispatch overhead on every iteration. High-performance numerical computing overcomes this through vectorization in NumPy.

NumPy allocates contiguous C-style memory buffers (ndarrays) containing homogeneous primitive types (e.g., int32, float64). 
When you write:
\`\`\`python
c = a * 2 + b
\`\`\`
NumPy executes compiled SIMD (Single Instruction Multiple Data) machine code via Intel MKL or OpenBLAS, operating on entire 256-bit or 512-bit vector registers simultaneously, achieving 50x to 100x speedups over native Python loops.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Production Profiling & Zero-Overhead Monitoring',
        content: `Before optimizing Python code, profile production workloads using statistical profilers (like Py-Spy and Scalene) rather than deterministic instrumentation (like cProfile).

Key production optimization strategies:
1. '__slots__': Declaring '__slots__' on frequently instantiated data classes replaces the instance '__dict__' with a fixed-size C array, reducing memory usage by 40%.
2. Built-in C functions: Prefer 'map', 'itertools', and list comprehensions over manual loops.
3. PyPy and Cython: For CPU-bound mathematical operations, compile hot paths to C extensions via Cython or run on the PyPy JIT compiler to achieve near-C execution speeds.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: AsyncIO Event Loop Internals & uvloop',
        content: `Python's 'asyncio' operates on a single-threaded cooperative multitasking event loop. When a coroutine awaits an I/O operation ('await reader.read()'), it yields control back to the loop, which polls active file descriptors via the OS kernel (epoll on Linux, kqueue on macOS).

Standard 'asyncio' uses Python-level selectors. In production, drop-in replacement 'uvloop' (written in Cython on top of libuv, the C library powering Node.js) doubles asynchronous network throughput, rivaling Go and Node.js web microservices.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Metaprogramming, Descriptors & __init_subclass__',
        content: `Python descriptors are objects that customize attribute access by defining '__get__', '__set__', or '__delete__'. Properties, classmethods, and ORM fields (SQLAlchemy, Django) are all implemented as descriptors.

Modern Python provides '__init_subclass__':
\`\`\`python
class PluginBase:
    registry = {}
    def __init_subclass__(cls, plugin_name, **kwargs):
        super().__init_subclass__(**kwargs)
        cls.registry[plugin_name] = cls
\`\`\`
This replaces complex metaclasses with clean, declarative plugin registries executed at import time with zero runtime overhead.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: The Python 3.13 JIT & Tier 2 Specializing Optimizer',
        content: `Python 3.13 introduces an experimental Copy-And-Patch Just-In-Time (JIT) compiler, building upon the Tier 1 specializing adaptive interpreter introduced in 3.11.

How it works:
1. The interpreter observes bytecode instructions during execution and identifies hot loops.
2. Hot instructions are translated into micro-operations (Tier 2 uops).
3. The JIT replaces variable type checks with specialized native assembly templates, cutting bytecode dispatch loop overhead and paving the way for full machine-code compilation.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Zero-Cost Exception Handling & PyO3 Rust Extensions',
        content: `In Python 3.11+, the runtime adopted zero-cost exceptions inspired by C++ DWARF unwinding: 'try' blocks incur zero CPU overhead during normal execution; overhead occurs only when an exception is actually raised.

For compute-intensive routines, modern Python teams write extensions using PyO3 in Rust rather than C:
- Memory safety guaranteed at compile time.
- Automatic conversion between Python PyObject and Rust native types.
- Releases the GIL effortlessly using 'Python::allow_threads' to saturate all multi-core CPU threads.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Production Concurrency: Free-Threaded Python & Subinterpreters',
        content: `The historic Global Interpreter Lock (GIL) is finally becoming optional in Python 3.13 through PEP 703 (free-threaded build).

Concurrency paradigms for the modern Python architect:
1. Free-Threaded Build: Replaces GIL with fine-grained biased reference counting and mimalloc memory allocation, allowing multithreaded Python code to run across all CPU cores in parallel.
2. Subinterpreters (PEP 554): Multiple independent Python interpreters sharing a single OS process, each with its own GIL, enabling true parallel compute without inter-process IPC serialization overhead.`
      }
    ]
  },

  // 6. MODERN C++ (15 PAGES)
  {
    id: 'book-modern-cpp',
    title: 'Modern C++: RAII, Move Semantics & Cache-Friendly Optimization',
    author: 'Bjarne Stroustrup & Andrei Alexandrescu',
    category: 'languages',
    badge: 'C++ Systems',
    description: 'A 15-page masterclass on modern C++20/23, RAII resource management, perfect forwarding, templates, and lock-free concurrency.',
    coverEmoji: '⚙️',
    coverColor: 'from-blue-700 to-indigo-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Core Philosophy of Zero-Overhead Abstraction',
        content: `C++ is engineered around the principle of zero-overhead abstraction: "What you don't use, you don't pay for. And what you do use, you couldn't hand code any better."

Unlike managed runtimes with garbage collectors, C++ grants developers direct access to physical memory layouts, stack frames, and CPU cache hierarchies. Every abstraction—from smart pointers and lambda expressions to template metaprogramming—compiles down to minimal assembly instructions equivalent to hand-optimized C.

Mastering modern C++ (C++17, C++20, and C++23) means abandoning legacy C patterns (such as raw pointers, manual malloc/free, and macro preprocessors) in favor of deterministic types and compiler guarantees.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: RAII: Resource Acquisition Is Initialization',
        content: `RAII is the foundational idiom of C++ resource management. It binds the lifecycle of a resource (heap memory, file descriptors, mutex locks, database sockets) to the lifetime of a stack-allocated object.

Key RAII mechanics:
- The constructor acquires the resource.
- The destructor automatically releases the resource when the object leaves its lexical scope, even if an unexpected exception is thrown.

Standard smart pointers embody RAII:
- 'std::unique_ptr<T>': Zero-overhead exclusive ownership. Exactly the same size as a raw pointer.
- 'std::shared_ptr<T>': Shared ownership using an atomic control block containing strong and weak reference counts.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Move Semantics and Rvalue References (std::move)',
        content: `Prior to C++11, passing large objects (like 'std::vector' or 'std::string') by value necessitated deep copy operations, duplicating heap buffers and creating performance bottlenecks.

C++11 introduced rvalue references (denoted by '&&') and move semantics:
- Lvalues: Objects that occupy an identifiable memory address (e.g., named variables).
- Rvalues: Temporary objects or literals that are destroyed at the end of the expression.

Move semantics allows an object to "steal" the underlying pointers and heap buffer of an rvalue without memory allocation:
\`\`\`cpp
std::vector<int> a = {1, 2, 3};
std::vector<int> b = std::move(a); // 'b' steals buffer, 'a' left empty
\`\`\`
'std::move' does not move anything itself; it is an unconditional static cast to an rvalue reference.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Universal References and Perfect Forwarding',
        content: `When writing generic wrapper functions (like factory templates or 'std::make_unique'), we must forward arguments to another function preserving their exact value category (lvalueness or rvalueness) and const qualifications.

This is accomplished via Universal References (forwarding references) and 'std::forward':
\`\`\`cpp
template <typename T>
void wrapper(T&& arg) {
    target(std::forward<T>(arg));
}
\`\`\`
Reference collapsing rules dictate how 'T&&' behaves:
- If 'arg' is an lvalue of type 'X', 'T' resolves to 'X&', collapsing 'X& &&' to 'X&'.
- If 'arg' is an rvalue of type 'X', 'T' resolves to 'X', leaving 'X&&'.
'std::forward' preserves the original argument type without redundant copies.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Template Metaprogramming and C++20 Concepts',
        content: `Templates in C++ execute compile-time code generation. The compiler instantiates specialized machine code for each unique type passed to a template.

Prior to C++20, constraining template arguments relied on cryptic SFINAE (Substitution Failure Is Not An Error) and 'std::enable_if'.
C++20 introduced Concepts—first-class language primitives for compile-time type predicates:
\`\`\`cpp
template <typename T>
concept Numeric = std::is_arithmetic_v<T>;

template <Numeric T>
T add(T a, T b) { return a + b; }
\`\`\`
Concepts yield readable compiler diagnostics, shorten compilation times, and enable clear contractual specifications for generic algorithms.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Modern Memory Architecture & Cache Locality',
        content: `Modern CPU cores execute instructions in nanoseconds, but fetching data from main RAM requires 50 to 100 nanoseconds. High performance is dictated by CPU cache hit rates (L1, L2, L3 caches).

CPUs load memory in 64-byte chunks known as Cache Lines.
- 'std::vector': Stores elements contiguously in RAM. Iterating sequentially through a vector triggers the CPU hardware prefetcher, achieving near 100% cache line utilization.
- 'std::list': Allocates scattered nodes on the heap connected by pointers. Every node access results in a cache miss ("pointer chasing").
In 99% of performance-critical scenarios, contiguous vectors outperform linked lists, even for insertions in the middle of collections.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Lock-Free Concurrency & C++11 Memory Model',
        content: `Standard mutexes incur kernel transitions and thread descheduling overhead. Lock-free programming relies on atomic hardware primitives (such as Compare-And-Swap / CAS) using 'std::atomic<T>'.

C++ defines explicit memory ordering models:
1. 'memory_order_seq_cst': Sequential consistency. Total global order across all threads (safest, highest overhead).
2. 'memory_order_acquire' and 'memory_order_release': Ensures synchronization between writer and reader threads without enforcing global serialization on unrelated memory locations.
3. 'memory_order_relaxed': Guarantees atomicity of the operation, but allows hardware instruction reordering for peak throughput.

Lock-free queues and ring buffers power ultra-low latency trading systems and game rendering loops.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Constexpr, Consteval & Compile-Time Computing',
        content: `Modern C++ pushes computation from runtime to compile time using 'constexpr' and C++20 'consteval'.

- 'constexpr': Specifies that a function or variable can be evaluated at compile time if arguments are known at compile time, or at runtime otherwise.
- 'consteval' (Immediate Functions): Guarantees that the function MUST be evaluated at compile time, producing a compilation error if runtime execution is required.

Compile-time computing allows lookup tables (like trigonometric sine tables or cryptographic hash hashes) to be baked directly into the binary's read-only data segment (.rodata), eliminating runtime calculation latency.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: C++20 Coroutines and Generator Tasks',
        content: `C++20 introduced stackless coroutines, providing language-level support for asynchronous tasks and lazy sequences.

A C++ function becomes a coroutine if it uses any of the following operators:
- 'co_await': Suspends execution until an awaitable object completes.
- 'co_yield': Yields a value to the caller and suspends execution.
- 'co_return': Completes coroutine execution.

Unlike threads which require allocated OS stack frames, C++20 coroutines allocate a tiny heap or frame state containing local variables and the resumption address, enabling millions of concurrent coroutines with minimal memory footprints.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Sanitizers, Valgrind & Production Diagnostics',
        content: `Even skilled C++ engineers can introduce memory corruption bugs: buffer overflows, use-after-free, and data races.

Modern toolchains (Clang and GCC) incorporate compiler instrumentation sanitizers:
1. AddressSanitizer (ASan): Detects out-of-bounds heap/stack access and use-after-free with minimal CPU slowdown (~2x).
2. ThreadSanitizer (TSan): Detects data races across concurrent threads.
3. UndefinedBehaviorSanitizer (UBSan): Catches integer overflows, null pointer dereferences, and alignment violations.

Running automated test suites with sanitizers enabled in CI pipelines is an indispensable engineering requirement for production C++ codebases.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: C++20 Modules: Compilation Speed & Header Isolation',
        content: `For four decades, C++ relied on the C preprocessor '#include' model: every header file was copied verbatim into every translation unit, forcing compilers to re-parse millions of lines of code repeatedly.

C++20 Modules revolutionize builds:
\`\`\`cpp
// math_core.ixx
export module math_core;
export namespace math {
    double calculateRoots(double x) { return std::sqrt(x); }
}
\`\`\`
Modules are compiled once into binary module interfaces (.bmi). They do not leak preprocessor macros, cannot cause header inclusion order conflicts, and slash enterprise compilation times by up to 80%.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Concepts & Constrained Template Metaprogramming',
        content: `Prior to C++20, template errors resulted in notoriously incomprehensible multi-page compiler error messages.

C++20 Concepts enforce compile-time constraints with clean syntax:
\`\`\`cpp
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<Numeric T>
T addNumbers(T a, T b) { return a + b; }
\`\`\`
If a caller passes a type that does not satisfy 'Numeric', the compiler emits a concise one-line error explaining exactly which constraint was violated.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: std::ranges Pipelines & Lazy View Composition',
        content: `The Ranges library transforms data processing into declarative, composable pipelines without allocating intermediate vectors:

\`\`\`cpp
auto even_squares = numbers 
  | std::views::filter([](int n) { return n % 2 == 0; })
  | std::views::transform([](int n) { return n * n; })
  | std::views::take(5);
\`\`\`
Because views are evaluated lazily on-demand, this pipeline computes only the first 5 matching elements, executing with zero temporary memory allocations and optimal CPU cache locality.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Lock-Free Queues, std::atomic & Memory Fences',
        content: `High-frequency trading and game engines cannot tolerate OS thread descheduling caused by mutex contention.

Lock-free programming utilizes hardware atomic instructions:
\`\`\`cpp
std::atomic<Node*> head;
void push(T val) {
    Node* new_node = new Node(val);
    do {
        new_node->next = head.load(std::memory_order_relaxed);
    } while (!head.compare_exchange_weak(
        new_node->next, new_node, 
        std::memory_order_release, 
        std::memory_order_relaxed));
}
\`\`\`
Choosing the correct memory order ('acquire/release' vs 'seq_cst') ensures correct memory visibility across CPU cores while maximizing instruction pipeline throughput.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Reflection Preview in C++26 & Metaprogramming Future',
        content: `C++26 is poised to introduce static reflection and code injection, bringing language-level introspection without runtime cost or macros.

Key advancements:
- Operator '^': Reifies a type, enum, or function into an opaque compile-time reflection object.
- Splice operator '[: :]': Generates code dynamically at compile time.
This will enable automatic JSON serialization, RPC boilerplate generation, and database mapping to be synthesized entirely within standard C++ with zero external code-generation tools.`
      }
    ]
  },

  // 7. RUST IN ACTION (15 PAGES)
  {
    id: 'book-rust-guide',
    title: 'The Rust Engineering Guide: Ownership, Lifetimes & Zero-Cost Abstractions',
    author: 'Steve Klabnik & Carol Nichols',
    category: 'languages',
    badge: 'Rust Mastery',
    description: 'A 15-page masterclass on Rust memory safety without a garbage collector, borrow checker rules, traits, and fearless concurrency.',
    coverEmoji: '🦀',
    coverColor: 'from-orange-600 to-amber-900',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Rust Revolution: Safety Without Garbage Collection',
        content: `Historically, systems programming forced a painful choice: manual memory management with C/C++ (blazing fast, but prone to segfaults, buffer overflows, and use-after-free vulnerabilities) or managed runtimes like Java/Go (memory-safe, but burdened with garbage collection pauses and runtime overhead).

Rust eliminates this false dichotomy. It achieves complete memory safety and thread safety at compile time with zero runtime overhead.

The compiler (rustc) enforces strict mathematical invariants over every byte of memory before generating machine binaries. Once compiled, Rust code runs with the raw speed and deterministic memory footprint of C.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Ownership: The Three Inviolable Laws',
        content: `Memory management in Rust is governed by three fundamental Ownership Rules:
1. Each value in Rust has an owner (a variable).
2. There can only be one owner at any given time.
3. When the owner goes out of scope, the value is automatically dropped.

When assigning or passing a variable:
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // Ownership moves to s2. s1 is invalidated.
\`\`\`
Because ownership moves, Rust guarantees there can never be double-free errors. The destructor (Drop trait) is invoked exactly once when 's2' leaves scope.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Borrowing and the Aliasing XOR Mutability Rule',
        content: `Rather than transferring ownership every time data is accessed, Rust allows "borrowing" references.

Borrowing is governed by the Aliasing XOR Mutability theorem:
You may have either:
- Any number of immutable references (&T), OR
- Exactly ONE mutable reference (&mut T),
but NEVER both at the same time within overlapping scopes!

This single rule eliminates data races at compile time. A data race occurs when two threads or pointers access the same memory concurrently, at least one write occurs, and there is no synchronization. By forbidding concurrent mutable aliasing, Rust guarantees data-race freedom.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Lifetimes and the Borrow Checker',
        content: `Every reference in Rust has a "lifetime"—the scope for which that reference is valid. Most of the time, lifetimes are inferred automatically via lifetime elision rules.

When returning references from functions, explicit lifetime annotations (like '<\\'a>') specify relationships between input and output reference lifetimes:
\`\`\`rust
fn longest<\\'a>(x: &\\'a str, y: &\\'a str) -> &\\'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`
Lifetime annotations do not change how long a value lives; they assist the borrow checker in proving that a returned reference cannot outlive the underlying borrowed data, preventing dangling pointers.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Traits, Generics, and Static vs Dynamic Dispatch',
        content: `Rust eschews classical class inheritance in favor of composition and Traits. A Trait defines behavior that types can implement (analogous to interfaces).

Rust supports two dispatch paradigms:
1. Static Dispatch (Monomorphization): Using generic trait bounds ('fn process<T: Summary>(item: T)'). The compiler generates dedicated machine code for each concrete type, enabling compiler inlining and zero runtime overhead.
2. Dynamic Dispatch (Trait Objects): Using 'dyn Summary' pointers ('&dyn Summary' or 'Box<dyn Summary>'). The call is resolved at runtime via a virtual method table (vtable), providing flexibility at the cost of a pointer indirection.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Error Handling: Result, Option, and the ? Operator',
        content: `Rust does not have 'null' pointers or unhandled runtime exceptions. Missing values and failure modes are explicitly encoded into the type system:

1. 'Option<T>': Represents either 'Some(T)' or 'None'. The compiler forces you to handle the 'None' branch, completely eliminating "Null Pointer Exceptions".
2. 'Result<T, E>': Represents either 'Ok(T)' on success or 'Err(E)' on failure.

The '?' operator provides idiomatic error propagation:
\`\`\`rust
let mut file = File::open("data.txt")?;
\`\`\`
If 'File::open' returns an Err, the function returns immediately with the error converted via the 'From' trait.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Fearless Concurrency: Send, Sync, and Mutexes',
        content: `Rust guarantees thread safety through two core auto-traits:
- 'Send': Indicates that ownership of the type can be transferred across thread boundaries safely.
- 'Sync': Indicates that it is safe for multiple concurrent threads to access references (&T) to the type.

If a type contains non-thread-safe pointers (like 'Rc<T>'), it does not implement Send/Sync, and the compiler rejects attempts to pass it across threads.
To share mutable state safely across threads, wrap the data in an Arc (Atomically Reference Counted) Mutex: 'Arc<Mutex<T>>'.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Smart Pointers: Box, Rc, RefCell, and Interior Mutability',
        content: `While standard references adhere to compile-time borrowing rules, specialized smart pointers enable flexible allocation patterns:

- 'Box<T>': Allocates data on the heap with single ownership. Useful for recursive data structures with unknown compile-time size.
- 'Rc<T>': Reference counting for single-threaded shared ownership.
- 'RefCell<T>': Enables "Interior Mutability", moving borrow-checking rules from compile time to runtime using dynamic borrow counters. If you violate borrowing rules with RefCell, the program panics at runtime rather than failing to compile.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: The Tokio Async Ecosystem & Work-Stealing Runtimes',
        content: `Async Rust is decoupled from the language runtime. The language specifies the 'Future' trait, while third-party runtimes like Tokio execute the event loops.

Tokio employs a multi-threaded work-stealing scheduler:
- Each CPU core maintains a local task queue.
- If a core exhausts its local tasks, it "steals" pending tasks from neighboring queues, maintaining optimal CPU saturation.

Because Rust futures are state machines that do not allocate heap stacks per task, high-throughput network proxies (such as Cloudflare Pingora) handle millions of requests with tiny memory footprints.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Unsafe Rust and Foreign Function Interfaces (FFI)',
        content: `Rust contains an escape hatch: 'unsafe'. Inside an 'unsafe {}' block, the developer can:
1. Dereference raw pointers (*const T, *mut T).
2. Call unsafe C functions via Foreign Function Interface (FFI).
3. Access mutable static variables.

Crucially, unsafe code does not turn off the borrow checker. The gold standard of Rust library engineering is to write a minimal, rigorously audited unsafe core and wrap it in a 100% safe public API, providing impenetrable safety boundaries for consumer applications.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: The Tokio Async Runtime & Work-Stealing Scheduling',
        content: `Tokio is the de-facto asynchronous runtime for high-throughput Rust networking. It features a multi-threaded work-stealing scheduler:
- Each OS thread owns a local 256-task ring buffer queue.
- Threads execute tasks from their local queue with zero mutex contention.
- When an idle thread empties its queue, it steals half the pending tasks from another busy thread's queue.

This architecture scales across 64+ CPU cores with minimal synchronization overhead, handling hundreds of thousands of concurrent TCP connections with microsecond latency.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Pinning, Unpin & Self-Referential Structs',
        content: `In Rust, values can normally be moved in memory at any time (e.g., passing by value). However, asynchronous futures often contain pointers that reference their own internal local variables (self-referential structs). Moving such a struct would invalidate its internal pointers!

'Pin<P>' is a wrapper that guarantees the pointee cannot be moved in memory once pinned, unless it implements the 'Unpin' auto trait. Understanding 'Pin' is essential when authoring custom async stream combinators and low-level future implementations.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: High-Performance SIMD with std::simd',
        content: `Rust's portable SIMD module ('std::simd') brings hardware vectorization directly to safe code:
\`\`\`rust
use std::simd::f32x8;

fn vectorized_multiply(a: &[f32], b: &[f32], out: &mut [f32]) {
    for ((va, vb), vo) in a.chunks_exact(8).zip(b.chunks_exact(8)).zip(out.chunks_exact_mut(8)) {
        let v1 = f32x8::from_slice(va);
        let v2 = f32x8::from_slice(vb);
        let res = v1 * v2; // 8 multiplications in a single CPU cycle!
        res.copy_to_slice(vo);
    }
}
\`\`\`
The compiler maps this directly to AVX2, AVX-512, or ARM Neon instructions based on the compilation target.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Custom Memory Allocators: jemalloc & mimalloc',
        content: `On high-concurrency Linux servers, the default glibc malloc can suffer from memory fragmentation and lock contention across dozens of threads.

Rust allows switching the global allocator in one line:
\`\`\`rust
use mimalloc::MiMalloc;

#[global_allocator]
static GLOBAL: MiMalloc = MiMalloc;
\`\`\`
Microsoft's 'mimalloc' or FreeBSD's 'jemalloc' divides memory into size-segregated slabs with thread-local free lists, eliminating allocator lock contention and reducing memory footprints in production microservices by 20% to 30%.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Unsafe Rust Auditing: Miri & Formal Verification',
        content: `To ensure that unsafe Rust code never causes Undefined Behavior, the Rust ecosystem provides cutting-edge verification tools:
1. Miri: An interpreter that executes Rust intermediate representation (MIR), detecting unaligned memory access, memory leaks, and Stacked Borrows alias violations.
2. Kani: An automated formal verification tool based on model checking. It mathematically proves that an unsafe function cannot panic or violate safety invariants for ANY possible input within a domain.

By pairing unsafe speed with mathematical verification, Rust sets a new standard for software correctness.`
      }
    ]
  },

  // 8. FULL-STACK TYPESCRIPT (15 PAGES)
  {
    id: 'book-typescript-fullstack',
    title: 'Full-Stack TypeScript: Advanced Generics, Runtime Validation & Isomorphic V8',
    author: 'Anders Hejlsberg & Dan Vanderkam',
    category: 'languages',
    badge: 'TypeScript Mastery',
    description: 'A 15-page deep dive into TypeScript type-level programming, conditional types, template literals, Zod validation, and V8 JIT internals.',
    coverEmoji: '🔷',
    coverColor: 'from-blue-600 to-sky-800',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The TypeScript Type System Philosophy',
        content: `TypeScript is a statically typed superset of JavaScript that compiles down to clean, ECMAScript-standard JavaScript. 

Key characteristics of TypeScript's type system:
1. Structural Typing (Duck Typing): Compatibility is determined by the shape of the data, not nominal inheritance. If an object has the required properties, it satisfies the type.
2. Complete Erasure: Types exist solely during compilation. Zero type metadata survives into the runtime JavaScript bundle.
3. Gradual Typing: Allows seamless interoperability with untyped legacy JavaScript via 'any' and 'unknown'.

Mastering TypeScript requires shifting from simple interface declarations to viewing the type system as a pure, functional compile-time programming language.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: Advanced Generics and Type Constraints',
        content: `Generics enable functions and classes to operate over multiple types while preserving strict type safety.

Type constraints (using the 'extends' keyword) restrict generic parameters:
\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
\`\`\`
Here, 'keyof T' produces a union of string literal keys of 'T', and 'K extends keyof T' guarantees at compile time that callers cannot pass a non-existent property name, completely eliminating runtime 'undefined' bugs.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Conditional Types and the infer Keyword',
        content: `Conditional types allow type logic to take branches based on relationships between types:
\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`
The 'infer' keyword introduces a type variable within the conditional check to extract sub-types dynamically:
\`\`\`typescript
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
\`\`\`
This pattern powers modern full-stack libraries (like tRPC and Prisma), automatically unwrapping nested database return types and API response payloads without manual type annotations.`
      },
      {
        pageNumber: 4,
        title: 'Page 4: Template Literal Types & Key Remapping',
        content: `Template literal types bring string manipulation directly into the compile-time type system:
\`\`\`typescript
type Event = 'click' | 'hover';
type EventHandler = \`on\${Capitalize<Event>}\`; // 'onClick' | 'onHover'
\`\`\`
Combined with mapped types and key remapping ('as'), you can transform API schemas:
\`\`\`typescript
type Getters<T> = {
    [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
\`\`\`
This enables strict type safety across routing systems, CSS class generators, and event dispatchers.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Bridging Compile-Time Types and Runtime: Zod & ArkType',
        content: `Because TypeScript types are completely erased at runtime, they cannot validate untrusted external inputs (such as HTTP request bodies or environment variables).

Schema validation libraries (like Zod and ArkType) bridge this divide by defining schemas as executable runtime code, while automatically inferring compile-time TypeScript types:
\`\`\`typescript
import { z } from 'zod';
const UserSchema = z.object({
    id: z.string().uuid(),
    age: z.number().min(18)
});
type User = z.infer<typeof UserSchema>;
\`\`\`
This ensures a Single Source of Truth: if the validation schema updates, the TypeScript type updates synchronously across client and backend.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: The V8 JavaScript Engine: Ignition & TurboFan',
        content: `Understanding the Node.js and browser runtime requires inspecting Google V8:
1. Parser: Converts JavaScript source code into an Abstract Syntax Tree (AST).
2. Ignition Interpreter: Rapidly compiles the AST into bytecode, allowing instant application startup.
3. TurboFan Optimizing Compiler: Monitors runtime execution heuristics ("hot paths"). If a function is called repeatedly with identical object shapes (Hidden Classes / Shapes), TurboFan compiles the bytecode into highly optimized native machine instructions.

If an object dynamically gains or loses properties, V8 de-optimizes the machine code back to interpreted bytecode, causing significant performance dips.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: Monorepo Architecture & Project References',
        content: `Full-stack engineering teams organize large codebases into monorepos (sharing types between React frontends, Express backends, and serverless workers).

TypeScript Project References ('tsconfig.json' -> 'references') enable modular compilation:
- Each package (e.g., '@acme/shared-types', '@acme/api', '@acme/web') has its own tsconfig.
- The TypeScript compiler ('tsc --build') performs incremental builds, caching compiled '.d.ts' declarations and only re-compiling modified packages.
- Tooling like Turborepo and Nx leverage this dependency graph for parallel execution and remote caching.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Node.js vs Deno vs Bun: Runtime Comparisons',
        content: `Modern full-stack developers deploy across three primary JavaScript/TypeScript runtimes:
1. Node.js: The mature enterprise standard. Relies on the V8 engine, libuv event loop, and dual CommonJS/ESM modules.
2. Deno: Engineered by Ryan Dahl (creator of Node.js). Built in Rust on V8, featuring native TypeScript execution, secure-by-default permissions, and web-standard APIs.
3. Bun: Built from scratch in Zig on Apple's JavaScriptCore engine. Prioritizes extreme performance, instant startup times, and native drop-in replacement for npm, bundlers, and test runners.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: End-to-End Type Safety with tRPC & Server Actions',
        content: `Traditional full-stack development relied on manually synchronizing backend REST endpoints and frontend fetch calls.

tRPC eliminates API code generation by allowing the client to import backend router types directly:
- Changes to a server endpoint signature instantly cause TypeScript compile errors on the frontend if the payload is out of sync.
- Next.js Server Actions bring RPC directly into React components, executing server-side logic seamlessly while maintaining full type safety and progressive enhancement.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Production Performance & Memory Leak Diagnostics',
        content: `Node.js memory leaks frequently stem from uncollected closures, lingering event listeners, and global caching objects.

Production diagnostic toolkit:
- Heap Snapshots: Capture memory state via Chrome DevTools or the 'v8' module to identify objects with growing retainer trees.
- Event Loop Lag: Monitor 'perf_hooks' to detect CPU-bound synchronous routines blocking the single-threaded event loop.
- Cluster Mode: Utilize PM2 or Kubernetes replicas to run one Node.js process per CPU core, scaling horizontally across available hardware.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Recursive Types & Type-Level Metaprogramming',
        content: `TypeScript's type system is Turing-complete. Recursive conditional types allow modeling complex deeply nested structures:

\`\`\`typescript
type DeepPartial<T> = T extends Function ? T :
  T extends Array<infer U> ? DeepPartial<U>[] :
  T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;
\`\`\`
Type recursion allows building type-safe query builders and immutable state lenses where changing a field deep inside a nested schema automatically validates across all downstream consumers.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Template Literal Types & Typed Path Selectors',
        content: `Template literal types permit string manipulation at compile time:
\`\`\`typescript
type Event = 'user' | 'order';
type Action = 'created' | 'deleted';
type EventName = \`\${Event}_\${Action}\`; // 'user_created' | 'user_deleted' | 'order_created' | 'order_deleted'
\`\`\`
By combining template literals with key remapping in mapped types, libraries like TanStack Table and Lodash achieve 100% compile-time autocomplete on nested object paths like 'users.profile.address.city'.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Monorepo Orchestration: Turborepo & Project References',
        content: `Scaling TypeScript across large engineering teams requires monorepo architectures where shared packages ('@repo/ui', '@repo/db', '@repo/auth') are consumed by multiple web and mobile apps.

TypeScript Project References ('tsconfig.json' with 'composite: true') enable incremental compilation: the compiler only re-checks packages whose source files have changed. Paired with Turborepo's remote build artifact caching, CI build times drop from 15 minutes to under 45 seconds.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: WebAssembly Integration in V8 via WebAssembly.instantiate',
        content: `When JavaScript or TypeScript encounters CPU-bound bottlenecks (image filtering, cryptographic hashing, physics simulation), offloading to WebAssembly (Wasm) provides near-native execution inside the V8 engine.

TypeScript serves as the orchestrator: loading the compiled '.wasm' module, passing shared memory buffers ('SharedArrayBuffer'), and invoking exported Wasm functions using typed wrappers without DOM thread blocking.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: Advanced Memory Leaks: Closures, Event Emitters & WeakRefs',
        content: `Common causes of Node.js memory leaks in production:
1. Retained Closures: Long-lived callbacks capturing large outer scopes.
2. Unregistered Event Listeners: Attaching listeners to global process or socket emitters without calling 'removeListener'.
3. Unbounded Caches: In-memory JavaScript maps growing indefinitely.

Modern mitigation:
Use 'WeakMap' and 'WeakRef' for caches: entries whose keys have no other references are automatically garbage collected by V8, preventing runaway server memory exhaustion.`
      }
    ]
  },

  // 9. GO FOR DISTRIBUTED SYSTEMS (15 PAGES)
  {
    id: 'book-go-distributed',
    title: 'Go for High-Scale Distributed Systems: Goroutines, Channels & Networking',
    author: 'Rob Pike & Francesc Campoy',
    category: 'languages',
    badge: 'Go Systems',
    description: 'A 15-page guide to Go concurrency mechanics, CSP channels, runtime scheduler (GMP model), and cloud-native networking.',
    coverEmoji: '🐹',
    coverColor: 'from-cyan-600 to-blue-800',
    totalPages: 15,
    readPages: [],
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: The Design Principles of Go',
        content: `Go was designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson to solve real-world problems in large-scale software engineering: slow build times, uncontrolled dependency graphs, and complex concurrency models.

Go intentionally eschews complex features found in other languages: no class inheritance, no macro preprocessors, no operator overloading, and no exceptions.

Instead, Go emphasizes simplicity, orthgonality, fast compilation, and first-class concurrency. A junior engineer can read and understand production Go code within days, drastically lowering organizational cognitive load.`
      },
      {
        pageNumber: 2,
        title: 'Page 2: The GMP Scheduler: Goroutines vs OS Threads',
        content: `Traditional OS threads consume roughly 1MB to 8MB of stack memory and require costly kernel context switches. Go introduces Goroutines—lightweight user-space threads managed entirely by the Go runtime.

A goroutine starts with an initial stack of just 2 KB, which grows and shrinks dynamically on the heap as needed.

The Go scheduler is modeled around the GMP architecture:
- G (Goroutine): Represents the running goroutine, its stack, and instruction pointer.
- M (Machine): Represents an actual OS thread created by the kernel.
- P (Processor): Represents the logical resource required to execute Go code (defaulting to the number of CPU cores).

The scheduler employs work-stealing and network poller integration, multiplexing hundreds of thousands of concurrent goroutines onto a handful of OS threads with minimal context-switch overhead.`
      },
      {
        pageNumber: 3,
        title: 'Page 3: Channels and Communicating Sequential Processes (CSP)',
        content: `Go follows the philosophy of Tony Hoare's CSP: "Do not communicate by sharing memory; instead, share memory by communicating."

Channels provide type-safe conduits through which goroutines synchronize execution and exchange data:
- Unbuffered Channels: Synchronous. A send operation blocks until another goroutine executes a receive, guaranteeing point-to-point synchronization.
- Buffered Channels: Asynchronous up to the buffer capacity. Sends only block when the ring buffer is full.

The 'select' statement enables non-blocking channel polling and timeout handling:
\`\`\`go
select {
case res := <-ch:
    handle(res)
case <-time.After(2 * time.Second):
    timeout()
}
\`\`\``
      },
      {
        pageNumber: 4,
        title: 'Page 4: The Sync Package: Mutexes, WaitGroups & Once',
        content: `While channels are preferred for data transfer and coordination, fine-grained state updates often require low-level memory synchronization via the 'sync' package:

- 'sync.Mutex' and 'sync.RWMutex': Traditional mutual exclusion locks. RWMutex allows concurrent readers while serializing exclusive writers.
- 'sync.WaitGroup': Coordinates the completion of multiple concurrent goroutines.
- 'sync.Once': Guarantees that an initialization routine (such as establishing a database connection pool) runs exactly once, even if invoked concurrently by thousands of goroutines.
- 'sync.Pool': A thread-safe object pool that caches allocated objects to reduce GC pressure.`
      },
      {
        pageNumber: 5,
        title: 'Page 5: Context Propagation: Cancellation, Deadlines, and Tracing',
        content: `In distributed systems, handling timeouts and cascaded cancellations is vital. The 'context' package propagates cancellation signals, deadlines, and request-scoped metadata across API boundaries and goroutine trees.

Key context mechanics:
- 'context.WithTimeout' and 'context.WithDeadline': Automatically cancel downstream database queries and HTTP calls if execution exceeds SLA thresholds.
- 'context.WithCancel': Allows manual cancellation (e.g., when a user disconnects their HTTP browser session).

Always pass 'ctx context.Context' as the very first argument of functions performing I/O, and listen to '<-ctx.Done()' to avoid orphaned background goroutines.`
      },
      {
        pageNumber: 6,
        title: 'Page 6: Low-Latency Garbage Collection in Go',
        content: `Unlike the Java HotSpot GC which prioritizes throughput with generational stop-the-world phases, the Go GC is engineered specifically for ultra-low latency in network services.

The Go GC utilizes a concurrent, tri-color mark-and-sweep collector with write barriers:
- White: Unvisited objects (candidates for reclamation).
- Grey: Objects visited, but their referenced child objects are not yet scanned.
- Black: Objects and all their descendants scanned.

The GC runs concurrently alongside user goroutines. Stop-The-World (STW) pauses are typically sub-millisecond (often under 100 microseconds), ensuring predictable p99 latencies for high-throughput microservices.`
      },
      {
        pageNumber: 7,
        title: 'Page 7: High-Performance Networking & HTTP/2 in Go',
        content: `Go's standard library 'net/http' is among the most robust and battle-tested in the software industry, powering production infrastructures at Google, Cloudflare, and Uber.

Behind the scenes, Go integrates directly with OS-level event notification mechanisms (like Linux 'epoll' and BSD 'kqueue') through its internal network poller. 
When a goroutine reads from a network socket:
- If data is available, the read succeeds instantly.
- If data is pending, the goroutine parks itself, freeing its underlying thread (M) to execute other work. When the OS kernel signals packet arrival, the network poller wakes the goroutine.`
      },
      {
        pageNumber: 8,
        title: 'Page 8: Profiling with Pprof: CPU, Memory & Goroutines',
        content: `Go ships with native profiling support via 'pprof':
- CPU Profiler: Samples program execution every 10ms to identify hot functions consuming compute cycles.
- Heap / Alloc Profiler: Pinpoints which lines of code allocate memory and identify heap retention leaks.
- Goroutine Profiler: Dumps stack traces of all active goroutines, invaluable for diagnosing goroutine leaks and deadlocked channels.

You can expose pprof endpoints live in production services by importing '_ "net/http/pprof"', and inspect flame graphs using 'go tool pprof -http=:8080'.`
      },
      {
        pageNumber: 9,
        title: 'Page 9: Building Resilient Microservices with gRPC and Protobuf',
        content: `Microservices written in Go achieve peak throughput when paired with gRPC and Protocol Buffers.

Engineering best practices:
- Connection Pooling: Maintain long-lived HTTP/2 TCP connections rather than initiating new handshakes per RPC.
- Interceptors: Implement client and server middleware for automated logging, OpenTelemetry tracing, and circuit breaking.
- Health Checking: Implement standard gRPC Health Checking protocols to integrate smoothly with Kubernetes readiness and liveness probes.`
      },
      {
        pageNumber: 10,
        title: 'Page 10: Production Deployment: Scratch Docker Images & Static Binaries',
        content: `A defining advantage of Go is its ability to compile into completely self-contained, statically linked machine binaries with zero external runtime dependencies.

Using multi-stage Docker builds:
\`\`\`dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o server .

FROM scratch
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
\`\`\`
The resulting production container image is tiny (often under 15 MB), contains no shell or package managers, and provides an exceptionally small attack surface for security compliance.`
      },
      {
        pageNumber: 11,
        title: 'Page 11: Go Garbage Collector: Tri-Color Mark-Sweep & Pacer',
        content: `Go’s garbage collector is an engineered masterpiece designed specifically for low latency:
- Tri-color concurrent mark-and-sweep: Objects are categorized as White (unvisited/garbage candidate), Grey (visited, children pending), or Black (reachable).
- Concurrent execution: The GC runs concurrently with application goroutines, keeping Stop-The-World (STW) pauses under 1 millisecond even on 32GB heaps!
- The Pacer algorithm: Continuously recalculates the optimal trigger point for the next GC cycle based on CPU utilization and memory allocation rates.`
      },
      {
        pageNumber: 12,
        title: 'Page 12: Netpoller Internals: Epoll, Kqueue & Non-Blocking I/O',
        content: `When a Go developer writes synchronous-looking network code ('conn.Read(buf)'), the Go runtime does not block an OS thread.

Instead, the Go Netpoller integrates directly with the kernel's event multiplexer (epoll on Linux, kqueue on Darwin):
1. The socket is placed into non-blocking mode.
2. If data is not ready, the goroutine is parked and its descriptor is registered with the netpoller.
3. The underlying OS thread immediately executes other runnable goroutines.
4. When the kernel signals data readiness, the netpoller wakes the parked goroutine.`
      },
      {
        pageNumber: 13,
        title: 'Page 13: Distributed Tracing with OpenTelemetry & Context Propagation',
        content: `In distributed Go architectures, propagating request deadlines and cancellation across microservice calls is handled by the standard 'context.Context' package.

By attaching OpenTelemetry span contexts to Go contexts:
\`\`\`go
ctx, span := tracer.Start(ctx, "processOrder")
defer span.End()
req = req.WithContext(ctx)
otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(req.Header))
\`\`\`
Every downstream gRPC or HTTP RPC inherits the parent trace ID, generating unified flame graphs across distributed clusters.`
      },
      {
        pageNumber: 14,
        title: 'Page 14: Go Generics: Constraints, Type Sets & Performance Trade-Offs',
        content: `Go 1.18 introduced generics based on Type Sets.
Go's implementation uses "GCDC" (Generics Dilution by Compiler Optimization) with Monomorphization and Gcshape stashing:
- Value types (int, float, custom structs) are monomorphized to generate optimal machine code with zero boxing overhead.
- Pointer types share a single compiled implementation, preventing binary size bloat.
This allows authoring type-safe data structures (ring buffers, balanced trees, LRU caches) without sacrificing Go's signature fast compilation speed.`
      },
      {
        pageNumber: 15,
        title: 'Page 15: High-Throughput Actor & Worker Pool Patterns',
        content: `Spawning unbound goroutines in response to incoming traffic can overwhelm downstream databases. Production Go systems implement bounded Worker Pools:

\`\`\`go
type Job func()
type Pool struct {
    jobs chan Job
}
func NewPool(workers int, queueSize int) *Pool {
    p := &Pool{jobs: make(chan Job, queueSize)}
    for i := 0; i < workers; i++ {
        go func() {
            for j := range p.jobs { j() }
        }()
    }
    return p
}
\`\`\`
Combining worker pools with channel backpressure prevents memory exhaustion during catastrophic traffic surges.`
      }
    ]
  }
];
