import { CourseDiagnosticQuestion } from '../types';
import { ADDITIONAL_COURSE_DIAGNOSTICS } from './additionalCourseDiagnostics';

export interface CourseDiagnosticAssessment {
  trackId: string;
  trackName: string;
  timeLimitMinutes: number;
  questions: CourseDiagnosticQuestion[];
}

export const COURSE_DIAGNOSTICS: Record<string, CourseDiagnosticAssessment> = {
  'track-python': {
    trackId: 'track-python',
    trackName: 'Python 3 Master Track',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'py-pre-1',
        tier: 'scratch',
        topicKey: 'py-scratch-syntax',
        topicTitle: 'Dynamic Typing & Object References',
        question: 'What is the output of the following Python code snippet regarding mutable list references?',
        codeSnippet: `x = [10, 20]
y = x
y.append(30)
print(x, x is y)`,
        options: [
          '[10, 20], False',
          '[10, 20, 30], True',
          '[10, 20, 30], False',
          '[10, 20], True'
        ],
        correctIndex: 1,
        explanation: 'In Python, assigning y = x copies the pointer to the underlying heap list object. Both x and y refer to the exact same PyListObject, so modifying through y alters x and "x is y" evaluates to True.'
      },
      {
        id: 'py-pre-2',
        tier: 'scratch',
        topicKey: 'py-scratch-comprehensions',
        topicTitle: 'Comprehensions & Scope',
        question: 'Which list comprehension produces a list of squares for all odd integers between 1 and 9 inclusive?',
        codeSnippet: `# Goal: [1, 9, 25, 49, 81]`,
        options: [
          '[n * 2 for n in range(1, 10) if n % 2 != 0]',
          '[n ** 2 for n in range(1, 10) if n % 2 != 0]',
          '[n ** 2 for n in range(1, 9) if n % 2 == 1]',
          '[n * n for n in range(0, 10) if n % 2 != 0]'
        ],
        correctIndex: 1,
        explanation: 'range(1, 10) iterates 1 through 9. "if n % 2 != 0" filters for odd numbers, and "n ** 2" calculates the square.'
      },
      {
        id: 'py-pre-3',
        tier: 'intermediate',
        topicKey: 'py-inter-generators',
        topicTitle: 'Generators & Memory Lazy Evaluation',
        question: 'What is the primary memory advantage of a generator expression over a list comprehension in Python?',
        codeSnippet: `gen = (x * 2 for x in range(10_000_000))
lst = [x * 2 for x in range(10_000_000)]`,
        options: [
          'Generators bypass the Global Interpreter Lock (GIL) automatically.',
          'Generators yield values on-demand one at a time, consuming O(1) memory instead of allocating the entire 10-million element array in RAM.',
          'Generators are compiled directly into C machine code by the interpreter.',
          'Generators prevent any type errors during iteration.'
        ],
        correctIndex: 1,
        explanation: 'Generators evaluate lazily via the iterator protocol (__next__), maintaining only execution frame state in memory (~120 bytes) rather than allocating hundreds of megabytes of RAM.'
      },
      {
        id: 'py-pre-4',
        tier: 'intermediate',
        topicKey: 'py-inter-decorators',
        topicTitle: 'Decorators & Higher-Order Closures',
        question: 'Why should custom Python decorators use "@functools.wraps(fn)" when wrapping a target function?',
        codeSnippet: `from functools import wraps

def audit(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper`,
        options: [
          'It compiles the inner wrapper function to native C code.',
          'It preserves the original function metadata such as __name__, __doc__, and type annotations for introspection and debugging.',
          'It makes the wrapper thread-safe without requiring threading locks.',
          'It forces the decorated function to execute asynchronously.'
        ],
        correctIndex: 1,
        explanation: '@wraps copies the __name__, __doc__, and module attributes from the original function to the wrapper, preventing confusing stack traces and broken introspection.'
      },
      {
        id: 'py-pre-5',
        tier: 'advanced',
        topicKey: 'py-adv-asyncio',
        topicTitle: 'AsyncIO Event Loops & Blocking Calls',
        question: 'What happens if you execute "time.sleep(5)" inside an async coroutine on the main AsyncIO event loop?',
        codeSnippet: `import asyncio, time

async def worker():
    time.sleep(5)  # Blocking call!
    return "done"`,
        options: [
          'AsyncIO automatically moves time.sleep into a background thread pool.',
          'It completely freezes the single-threaded event loop for 5 seconds, stalling all other concurrent tasks from progressing.',
          'It raises an AsyncExecutionError at runtime.',
          'The event loop skips the sleep statement and immediately continues.'
        ],
        correctIndex: 1,
        explanation: 'AsyncIO operates on a single thread. Calling a synchronous blocking function like time.sleep() blocks the OS thread, preventing the event loop from scheduling any pending tasks until sleep completes.'
      },
      {
        id: 'py-pre-6',
        tier: 'advanced',
        topicKey: 'py-adv-memory',
        topicTitle: 'CPython Memory Optimization with __slots__',
        question: 'What is the structural effect of declaring "__slots__ = (\'x\', \'y\')" on a high-frequency Python data class?',
        codeSnippet: `class Node:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
        options: [
          'It makes the class instances strictly immutable.',
          'It replaces the dynamic instance __dict__ with a fixed-size C struct array of pointers, saving ~150 bytes per object and speeding attribute lookup.',
          'It encrypts the object attributes in RAM.',
          'It causes Node instances to be stored in CPU L1 cache exclusively.'
        ],
        correctIndex: 1,
        explanation: 'By default, Python instances allocate an internal dictionary (__dict__) to support arbitrary attribute creation. __slots__ eliminates __dict__, yielding ~40-60% memory reduction in mass-instantiated data models.'
      }
    ]
  },

  'track-cpp': {
    trackId: 'track-cpp',
    trackName: 'Modern C++ Systems Architecture',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'cpp-pre-1',
        tier: 'scratch',
        topicKey: 'cpp-scratch-pointers',
        topicTitle: 'References vs Pointers & Memory Safety',
        question: 'In modern C++, what is a fundamental difference between a reference (int&) and a raw pointer (int*)?',
        codeSnippet: `int a = 10;
int& ref = a;
int* ptr = &a;`,
        options: [
          'References can be re-bound to point to another variable at any time.',
          'A reference cannot be null and cannot be re-seated to refer to a different object after initialization.',
          'Pointers cannot be modified with pointer arithmetic.',
          'References consume double the memory of a 64-bit pointer.'
        ],
        correctIndex: 1,
        explanation: 'A reference is an immutable alias established upon initialization that cannot be null and cannot be re-bound, whereas pointers can be re-assigned, perform arithmetic, or be nullptr.'
      },
      {
        id: 'cpp-pre-2',
        tier: 'scratch',
        topicKey: 'cpp-scratch-raii',
        topicTitle: 'RAII & Deterministic Resource Destruction',
        question: 'What is the core principle of Resource Acquisition Is Initialization (RAII) in C++?',
        codeSnippet: `void process() {
    std::unique_ptr<FileHandle> file = openFile("log.txt");
    // If an exception is thrown here...
}`,
        options: [
          'Resources must be manually freed using free() inside catch blocks.',
          'Resource lifetime is bound to object lifetime: acquisition occurs in the constructor and automatic release occurs in the destructor upon leaving scope.',
          'Memory is collected by a background tracing garbage collector.',
          'All resources must be allocated as global variables.'
        ],
        correctIndex: 1,
        explanation: 'RAII guarantees that stack unwinding invokes destructors automatically when leaving scope (even during exceptions), completely preventing memory and file descriptor leaks.'
      },
      {
        id: 'cpp-pre-3',
        tier: 'intermediate',
        topicKey: 'cpp-inter-move',
        topicTitle: 'Move Semantics & std::move',
        question: 'What does "std::move(v)" actually do at the machine instruction level?',
        codeSnippet: `std::vector<int> a = {1, 2, 3};
std::vector<int> b = std::move(a);`,
        options: [
          'It immediately copies all elements in RAM from a to b.',
          'It is an unconditional cast to an rvalue reference (static_cast<T&&>), signaling to the move constructor to transfer internal buffer pointers without deep-copying heap data.',
          'It zeroes out the CPU register cache.',
          'It deletes variable a from the stack frame.'
        ],
        correctIndex: 1,
        explanation: 'std::move does not move any bytes itself; it performs a static cast to an rvalue reference, enabling the move constructor to take ownership of the dynamic buffer pointers in O(1) time.'
      },
      {
        id: 'cpp-pre-4',
        tier: 'intermediate',
        topicKey: 'cpp-inter-smartptrs',
        topicTitle: 'Smart Pointer Ownership: unique_ptr vs shared_ptr',
        question: 'Why should high-performance systems prefer "std::unique_ptr" over "std::shared_ptr" when single ownership suffices?',
        codeSnippet: `auto p1 = std::make_unique<Data>();
auto p2 = std::make_shared<Data>();`,
        options: [
          'unique_ptr has zero runtime overhead (same size and speed as a raw pointer), whereas shared_ptr incurs atomic reference-counting increments and a control block allocation.',
          'shared_ptr cannot be passed into functions.',
          'unique_ptr allows multiple concurrent owners across threads.',
          'shared_ptr has no destructor.'
        ],
        correctIndex: 0,
        explanation: 'unique_ptr models exclusive zero-overhead ownership. shared_ptr maintains a separate control block with atomic reference count modifications that can degrade multi-core cache performance.'
      },
      {
        id: 'cpp-pre-5',
        tier: 'advanced',
        topicKey: 'cpp-adv-concepts',
        topicTitle: 'C++20 Concepts & Template Constraints',
        question: 'What major advantage do C++20 Concepts provide over traditional SFINAE (std::enable_if)?',
        codeSnippet: `template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<Numeric T>
T calculate(T a, T b) { return a + b; }`,
        options: [
          'They allow templates to run in interpreted mode without compilation.',
          'They provide clear compile-time constraint validation with readable one-line compiler diagnostic messages and faster build times.',
          'They enable runtime reflection on variable names.',
          'They force all types to inherit from a common base class.'
        ],
        correctIndex: 1,
        explanation: 'Concepts formalize type constraints directly in the grammar, replacing cryptic multi-page SFINAE error traces with concise, human-readable compiler messages.'
      },
      {
        id: 'cpp-pre-6',
        tier: 'advanced',
        topicKey: 'cpp-adv-atomics',
        topicTitle: 'Lock-Free Concurrency & Memory Ordering',
        question: 'In high-frequency lock-free architectures, why is "std::memory_order_relaxed" faster than "std::memory_order_seq_cst"?',
        codeSnippet: `std::atomic<int> counter{0};
counter.fetch_add(1, std::memory_order_relaxed);`,
        options: [
          'It disables CPU hardware atomicity.',
          'It guarantees atomicity of the operation without emitting expensive hardware memory bus fences or restricting compiler/CPU instruction reordering.',
          'It locks the entire L3 cache.',
          'It converts multithreaded code into single-threaded execution.'
        ],
        correctIndex: 1,
        explanation: 'Relaxed ordering guarantees atomic modification of that single variable without forcing memory synchronization barriers or serialization across independent CPU store buffers.'
      }
    ]
  },

  'track-rust': {
    trackId: 'track-rust',
    trackName: 'The Rust Engineering Guide',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'rs-pre-1',
        tier: 'scratch',
        topicKey: 'rs-scratch-borrowing',
        topicTitle: 'The Borrow Checker Cardinal Rules',
        question: 'Which statement accurately describes Rust’s fundamental aliasing rule for references?',
        codeSnippet: `let mut data = vec![1, 2, 3];
let r1 = &data;
let r2 = &data;
let r3 = &mut data; // Will this compile?`,
        options: [
          'You may have any number of mutable references as long as they are on the same thread.',
          'At any given point in time, you can have EITHER one mutable reference OR any number of immutable references, but never both simultaneously.',
          'Mutable references automatically clone the underlying vector.',
          'References cannot outlive the main function.'
        ],
        correctIndex: 1,
        explanation: 'The aliasing XOR mutability rule ensures memory safety at compile time: multiple readers (&T) OR exactly one exclusive writer (&mut T), preventing data races and iterator invalidation.'
      },
      {
        id: 'rs-pre-2',
        tier: 'scratch',
        topicKey: 'rs-scratch-ownership',
        topicTitle: 'Move Semantics & Copy Trait',
        question: 'Why does line 3 fail to compile in the following snippet?',
        codeSnippet: `let s1 = String::from("Rust");
let s2 = s1;
println!("{}", s1); // Compiler Error!`,
        options: [
          'Strings cannot be printed with println!.',
          'String does not implement Copy; assignment to s2 transfers ownership (moves the heap pointer), making s1 invalidated.',
          's1 is a mutable variable.',
          'Rust strings cannot exceed 4 characters.'
        ],
        correctIndex: 1,
        explanation: 'String allocates heap memory. When assigned to s2, ownership is moved to avoid double-free errors. Since s1 no longer owns the buffer, the compiler forbids accessing it.'
      },
      {
        id: 'rs-pre-3',
        tier: 'intermediate',
        topicKey: 'rs-inter-lifetimes',
        topicTitle: 'Explicit Lifetime Annotations',
        question: 'What is the purpose of lifetime annotations like <\'a> in Rust function signatures?',
        codeSnippet: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
        options: [
          'They instruct the compiler to keep the variables in RAM for \'a seconds.',
          'They describe the generic relationship between the lifetimes of multiple references so the borrow checker can prove the returned reference will not outlive either input.',
          'They allocate the returned string into the static data segment.',
          'They enforce thread synchronization between callers.'
        ],
        correctIndex: 1,
        explanation: 'Lifetimes are descriptive generic parameters for the borrow checker. They guarantee the caller cannot hold onto the returned reference after either parameter x or y has been dropped.'
      },
      {
        id: 'rs-pre-4',
        tier: 'intermediate',
        topicKey: 'rs-inter-traits',
        topicTitle: 'Zero-Cost Traits & Dynamic Dispatch',
        question: 'What is the performance difference between static dispatch (impl Trait / generics) and dynamic dispatch (Box<dyn Trait>)?',
        codeSnippet: `fn run_static<T: Worker>(w: T) { w.work(); }
fn run_dynamic(w: Box<dyn Worker>) { w.work(); }`,
        options: [
          'Static dispatch monomorphizes code at compile-time enabling inlining with zero runtime cost, while dynamic dispatch uses fat pointers with a vtable lookup and cannot be inlined.',
          'Dynamic dispatch is always faster because it uses less binary disk space.',
          'Static dispatch requires a garbage collector.',
          'Box<dyn Trait> is evaluated by the Python interpreter.'
        ],
        correctIndex: 0,
        explanation: 'Generics are monomorphized: the compiler generates dedicated native functions for each type with direct calls and inlining. dyn Trait incurs indirect branch vtable calls through fat pointers.'
      },
      {
        id: 'rs-pre-5',
        tier: 'advanced',
        topicKey: 'rs-adv-pin',
        topicTitle: 'Pinning & Self-Referential Futures',
        question: 'Why does asynchronous Rust require "Pin<P>" when polling futures?',
        codeSnippet: `// Inside an async state machine:
// Struct contains pointers to its own internal fields!`,
        options: [
          'To prevent the OS from killing the process during idle states.',
          'Because async futures often contain self-referential pointers to local stack variables across await boundaries; Pin guarantees the struct cannot be moved in memory.',
          'To encrypt the future payload before transmitting over WebSockets.',
          'To force the future to execute on CPU core 0.'
        ],
        correctIndex: 1,
        explanation: 'Moving a struct with self-referential pointers in memory invalidates those pointers. Pin ensures the pointee remains at a stable memory address unless it implements Unpin.'
      },
      {
        id: 'rs-pre-6',
        tier: 'advanced',
        topicKey: 'rs-adv-unsafe',
        topicTitle: 'Unsafe Rust & Formal Invariants',
        question: 'Does writing an "unsafe { ... }" block in Rust disable the compiler’s borrow checker?',
        codeSnippet: `unsafe {
    let raw: *const i32 = &10;
    // Does this disable borrow checking for normal references?
}`,
        options: [
          'Yes, unsafe completely turns off all Rust safety checks and acts like C.',
          'No! The borrow checker remains fully active in unsafe blocks; unsafe merely unlocks superpowers like dereferencing raw pointers and calling FFI functions.',
          'Unsafe code can only be written in 32-bit mode.',
          'Unsafe code requires administrator root privileges to run.'
        ],
        correctIndex: 1,
        explanation: 'Unsafe blocks do NOT turn off type checks or borrow checking on safe references. They only permit 5 specific superpowers: dereferencing raw pointers, calling unsafe functions/FFI, implementing unsafe traits, mutating statics, and accessing union fields.'
      }
    ]
  },

  'track-typescript': {
    trackId: 'track-typescript',
    trackName: 'Full-Stack TypeScript Mastery',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'ts-pre-1',
        tier: 'scratch',
        topicKey: 'ts-scratch-narrowing',
        topicTitle: 'Type Narrowing & Discriminated Unions',
        question: 'How does TypeScript discriminate between different types in a tagged union?',
        codeSnippet: `type Action = 
  | { type: 'LOGIN'; username: string } 
  | { type: 'LOGOUT' };

function handle(action: Action) {
  if (action.type === 'LOGIN') {
    console.log(action.username); // Valid!
  }
}`,
        options: [
          'Through runtime reflection on JavaScript prototype chains.',
          'By checking the common literal property (the discriminant "type") in control-flow branches, narrowing the union type automatically.',
          'It compiles to instanceof checks in JavaScript output.',
          'TypeScript sends an RPC request to check the type schema.'
        ],
        correctIndex: 1,
        explanation: 'TypeScript control-flow analysis uses literal discriminant properties (like type: "LOGIN") to eliminate unreachable variants within if/switch branches.'
      },
      {
        id: 'ts-pre-2',
        tier: 'scratch',
        topicKey: 'ts-scratch-utility',
        topicTitle: 'Built-in Utility Types: Partial, Pick & Omit',
        question: 'Which TypeScript utility type creates a new type by selecting a subset of properties from an existing interface?',
        codeSnippet: `interface User {
  id: string;
  name: string;
  email: string;
  hashedPass: string;
}
// Goal: Type with only id and email`,
        options: [
          'Partial<User>',
          'Pick<User, "id" | "email">',
          'Omit<User, "name">',
          'Exclude<User, "hashedPass">'
        ],
        correctIndex: 1,
        explanation: 'Pick<T, K> constructs a type by picking the set of properties K from T. Partial makes all properties optional, while Omit removes specified keys.'
      },
      {
        id: 'ts-pre-3',
        tier: 'intermediate',
        topicKey: 'ts-inter-generics',
        topicTitle: 'Generics & Constrained Type Inference',
        question: 'What does the constraint "T extends { length: number }" enforce in a generic function?',
        codeSnippet: `function logLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}`,
        options: [
          'T must be an Array of numbers.',
          'T can be any type that possesses a numeric "length" property (such as string, Array, or custom objects with length).',
          'T must be a number greater than 0.',
          'T must be an instance of class Length.'
        ],
        correctIndex: 1,
        explanation: 'Generic constraints using "extends" enforce structural subtyping: any argument passed must have at least a property named "length" of type number.'
      },
      {
        id: 'ts-pre-4',
        tier: 'intermediate',
        topicKey: 'ts-inter-zod',
        topicTitle: 'Runtime Validation & Static Type Inference',
        question: 'Why do production TypeScript apps pair Zod schemas with "z.infer<typeof Schema>"?',
        codeSnippet: `import { z } from 'zod';
const UserSchema = z.object({ id: z.string().uuid(), age: z.number().min(18) });
type User = z.infer<typeof UserSchema>;`,
        options: [
          'Because TypeScript types disappear at runtime; Zod validates untrusted external API payloads at runtime while synthesizing matching compile-time types automatically.',
          'Zod speeds up V8 JavaScript execution by 500%.',
          'It prevents database connection drops.',
          'It encrypts local storage keys.'
        ],
        correctIndex: 0,
        explanation: 'TypeScript types are erased during compilation. Zod validates runtime boundaries (HTTP requests, form inputs) and derives TypeScript types automatically, eliminating schema duplication.'
      },
      {
        id: 'ts-pre-5',
        tier: 'advanced',
        topicKey: 'ts-adv-conditional',
        topicTitle: 'Conditional Types & Infer Keyword',
        question: 'What does the "infer" keyword accomplish in TypeScript conditional types?',
        codeSnippet: `type UnboxPromise<T> = T extends Promise<infer U> ? U : T;
type Result = UnboxPromise<Promise<string>>; // What is Result?`,
        options: [
          'Result is Promise<unknown>.',
          'It introduces a type variable "U" to be deduced from the pattern match; here Result resolves to string.',
          'It causes a compilation syntax error.',
          'It forces the Promise to resolve synchronously.'
        ],
        correctIndex: 1,
        explanation: '"infer U" enables pattern matching within conditional types: if T extends Promise<U>, TypeScript extracts the inner resolved type U (in this case, string).'
      },
      {
        id: 'ts-pre-6',
        tier: 'advanced',
        topicKey: 'ts-adv-v8',
        topicTitle: 'V8 JIT Hidden Classes & Monomorphism',
        question: 'How can you keep JavaScript object property access on the V8 JIT "monomorphic fast path"?',
        codeSnippet: `// Fast Path vs Slow Megamorphic Path in V8:`,
        options: [
          'Always initialize object properties in the exact same order in constructors so they share the same hidden class (Shape/Map).',
          'Use the "delete" operator frequently to trim unused properties.',
          'Store all data in global arrays.',
          'Add dynamic properties randomly at runtime.'
        ],
        correctIndex: 0,
        explanation: 'V8 creates hidden classes (Shapes). Initializing properties in identical order allows V8 to reuse the same shape and compile fast inline caches (ICs). Deleting properties transitions to slow dictionary mode.'
      }
    ]
  },

  'track-go': {
    trackId: 'track-go',
    trackName: 'Go for High-Scale Distributed Systems',
    timeLimitMinutes: 8,
    questions: [
      {
        id: 'go-pre-1',
        tier: 'scratch',
        topicKey: 'go-scratch-slices',
        topicTitle: 'Slices vs Arrays & Capacity Headers',
        question: 'What data structure represents a Go slice under the hood in runtime memory?',
        codeSnippet: `s := make([]int, 3, 5)`,
        options: [
          'A linked list of heap-allocated integer nodes.',
          'A 24-byte struct containing a pointer to the backing array, length (len), and capacity (cap).',
          'A hash map indexed by sequential integer keys.',
          'A circular ring buffer.'
        ],
        correctIndex: 1,
        explanation: 'In 64-bit Go, a slice header is a 24-byte value containing: uintptr Data (8 bytes), int Len (8 bytes), and int Cap (8 bytes).'
      },
      {
        id: 'go-pre-2',
        tier: 'scratch',
        topicKey: 'go-scratch-errors',
        topicTitle: 'Explicit Error Handling & wrapping',
        question: 'What is the idiomatic way to wrap an underlying error with contextual information in modern Go (1.13+)?',
        codeSnippet: `if err != nil {
    return fmt.Errorf("failed to fetch user %d: %w", userID, err)
}`,
        options: [
          'Using the "%v" verb in fmt.Printf.',
          'Using "fmt.Errorf" with the "%w" verb, which enables downstream callers to inspect the cause using "errors.Is" or "errors.As".',
          'Throwing a new PanicException.',
          'Catching the error with try-catch blocks.'
        ],
        correctIndex: 1,
        explanation: 'The "%w" verb wraps the original error inside an unwrappable container, allowing errors.Is() and errors.As() to inspect root causes through the error chain.'
      },
      {
        id: 'go-pre-3',
        tier: 'intermediate',
        topicKey: 'go-inter-channels',
        topicTitle: 'Buffered Channels & Deadlock Prevention',
        question: 'What happens when sending to an unbuffered channel "ch <- data" if no goroutine is actively receiving?',
        codeSnippet: `ch := make(chan int)
ch <- 42 // No receiver running!`,
        options: [
          'The data is automatically dropped into a dead-letter queue.',
          'The sending goroutine blocks unconditionally until another goroutine executes "<-ch".',
          'Go spawns a temporary background thread to hold the value.',
          'The program exits with exit code 0.'
        ],
        correctIndex: 1,
        explanation: 'Unbuffered channels are synchronous rendezvous points: sending blocks until a receiver is ready, and receiving blocks until a sender is ready.'
      },
      {
        id: 'go-pre-4',
        tier: 'intermediate',
        topicKey: 'go-inter-context',
        topicTitle: 'Context Cancellation & Deadlines',
        question: 'Why should every distributed Go RPC handler accept "ctx context.Context" as its first parameter?',
        codeSnippet: `func FetchOrder(ctx context.Context, orderID string) (*Order, error)`,
        options: [
          'To pass global configuration strings.',
          'To propagate request deadlines, timeouts, and client cancellation signals down the call tree to stop orphaned background work.',
          'To serialize the function into JSON.',
          'To bypass the Go garbage collector.'
        ],
        correctIndex: 1,
        explanation: 'context.Context allows servers to cancel downstream database queries and microservice RPCs immediately if the upstream client closes their connection or exceeds the timeout deadline.'
      },
      {
        id: 'go-pre-5',
        tier: 'advanced',
        topicKey: 'go-adv-scheduler',
        topicTitle: 'The GMP Concurrency Scheduler Model',
        question: 'In the Go runtime scheduler, what do G, M, and P represent?',
        codeSnippet: `// Go GMP Runtime Architecture:`,
        options: [
          'Garbage collector, Mutex, and Pointers.',
          'Goroutine (user task), Machine (OS kernel thread), and Processor (logical context with local run queue required to execute Go code).',
          'Global variables, Memory heap, and Paging.',
          'Gateway, Microservice, and Proxy.'
        ],
        correctIndex: 1,
        explanation: 'Go uses the GMP model: G is a Goroutine, M is an OS Thread, and P represents a logical Processor (by default GOMAXPROCS) managing a local 256-task run-queue with work-stealing.'
      },
      {
        id: 'go-pre-6',
        tier: 'advanced',
        topicKey: 'go-adv-gc',
        topicTitle: 'Concurrent Tri-Color Mark-Sweep GC',
        question: 'How does Go achieve sub-millisecond Garbage Collection Stop-The-World (STW) pauses even on 32GB heaps?',
        codeSnippet: `// Tri-color mark and sweep with concurrent write barriers:`,
        options: [
          'Go does not use any heap memory.',
          'The GC runs concurrently alongside user goroutines using a write-barrier and tri-color marking, reserving STW pauses only for brief phase transitions (<1ms).',
          'Go pauses the entire operating system for 2 seconds.',
          'Go only frees memory when the server reboots.'
        ],
        correctIndex: 1,
        explanation: 'Go’s GC is concurrent: application goroutines continue processing requests during marking and sweeping. Write barriers track pointer modifications concurrently, slashing STW pauses to microseconds.'
      }
    ]
  },
  ...ADDITIONAL_COURSE_DIAGNOSTICS
};
