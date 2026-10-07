import { CodeLesson } from '../types';

export const EXPANDED_CPP_LESSONS: CodeLesson[] = [
  {
    id: 'cpp-exp-1',
    title: 'RAII & Exception-Safe Resource Management',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Bind operating system file handles, sockets, and memory strictly to object lifetimes to prevent leaks.',
    concepts: ['Resource Acquisition Is Initialization (RAII)', 'Destructors on stack unwinding', 'Deterministic finalization', 'Preventing resource leaks during exceptions'],
    starterCode: `#include <iostream>

class ScopedFile {
private:
    std::string filename;
public:
    ScopedFile(const std::string& name) : filename(name) {
        std::cout << "[RAII] Opened file resource: " << filename << std::endl;
    }
    ~ScopedFile() {
        std::cout << "[RAII] Closed file resource: " << filename << " (Destructor Invoked)" << std::endl;
    }
    void write(const std::string& data) {
        std::cout << "Writing: " << data << std::endl;
    }
};

int main() {
    {
        ScopedFile file("telemetry.log");
        file.write("System status: OK");
    } // file automatically closed here as it leaves scope
    std::cout << "Scope exited successfully." << std::endl;
    return 0;
}`,
    expectedOutput: '[RAII] Opened file resource: telemetry.log\nWriting: System status: OK\n[RAII] Closed file resource: telemetry.log (Destructor Invoked)\nScope exited successfully.',
    explanation: 'RAII guarantees that even if an unhandled exception triggers stack unwinding, destructors for all local objects on the stack are executed deterministically.',
    bugChallenge: {
      title: 'Manual delete Bypassed by Exception Bug',
      description: 'Calling raw delete at the end of a function is bypassed if an exception is thrown before the delete line.',
      buggyCode: `void risky() {\n    int* ptr = new int(42);\n    throw std::runtime_error("Crash!");\n    delete ptr; // BUG: Never executed! Memory leaked.\n}`,
      solutionCode: `void safe() {\n    auto ptr = std::make_unique<int>(42);\n    throw std::runtime_error("Crash!"); // Destructor frees memory automatically!\n}`,
      hint: 'Use std::unique_ptr instead of raw new and delete.',
      bugExplanation: 'Smart pointers use RAII to ensure memory is released upon stack unwinding regardless of how the scope terminates.'
    }
  },
  {
    id: 'cpp-exp-2',
    title: 'Move Semantics, Rvalue References & std::move',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Eliminate expensive deep buffer copies by transferring heap buffer pointers from temporary objects using move constructors.',
    concepts: ['Lvalues vs Rvalues (&&)', 'Move constructor & move assignment', 'std::move cast semantics', 'Stealing heap buffers (O(1) transfer)'],
    starterCode: `#include <iostream>
#include <utility>

class Buffer {
public:
    size_t size;
    int* data;

    Buffer(size_t s) : size(s), data(new int[s]) {
        std::cout << "Allocated buffer of size " << size << std::endl;
    }
    // Move Constructor
    Buffer(Buffer&& other) noexcept : size(other.size), data(other.data) {
        other.data = nullptr; // Steal resource
        other.size = 0;
        std::cout << "Moved buffer (Zero-copy transfer)" << std::endl;
    }
    ~Buffer() {
        delete[] data;
    }
};

int main() {
    Buffer b1(1024);
    Buffer b2 = std::move(b1); // Invoke move constructor
    std::cout << "b2 size: " << b2.size << ", b1 size after move: " << b1.size << std::endl;
    return 0;
}`,
    expectedOutput: 'Allocated buffer of size 1024\nMoved buffer (Zero-copy transfer)\nb2 size: 1024, b1 size after move: 0',
    explanation: 'Move semantics allow passing expensive resources by transferring ownership of the underlying pointer in O(1) time rather than allocating a deep clone.',
    bugChallenge: {
      title: 'Dangling Pointer in Moved-From Object',
      description: 'Failing to set other.data to nullptr in a move constructor causes a catastrophic double-free in the destructor.',
      buggyCode: `Buffer(Buffer&& other) noexcept : size(other.size), data(other.data) {\n    // BUG: other.data still points to memory; double-free on destruction!\n}`,
      solutionCode: `Buffer(Buffer&& other) noexcept : size(other.size), data(other.data) {\n    other.data = nullptr;\n    other.size = 0;\n}`,
      hint: 'Set the donor pointer to nullptr.',
      bugExplanation: 'delete on nullptr is a safe no-op in C++; leaving the original pointer leads to double destruction.'
    }
  },
  {
    id: 'cpp-exp-3',
    title: 'Smart Pointers: std::unique_ptr & std::shared_ptr',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Choose between exclusive single-ownership with std::unique_ptr and shared reference-counted ownership with std::shared_ptr.',
    concepts: ['std::make_unique vs std::make_shared', 'Control block allocation', 'std::weak_ptr for breaking cycles', 'Custom deleters'],
    starterCode: `#include <iostream>
#include <memory>

struct Sensor {
    int id;
    Sensor(int i) : id(i) { std::cout << "Sensor " << id << " created" << std::endl; }
    ~Sensor() { std::cout << "Sensor " << id << " destroyed" << std::endl; }
};

int main() {
    auto u_sensor = std::make_unique<Sensor>(101);
    
    std::shared_ptr<Sensor> s1 = std::make_shared<Sensor>(202);
    std::shared_ptr<Sensor> s2 = s1;
    std::cout << "Sensor 202 Reference Count: " << s1.use_count() << std::endl;
    
    return 0;
}`,
    expectedOutput: 'Sensor 101 created\nSensor 202 created\nSensor 202 Reference Count: 2',
    explanation: 'std::unique_ptr has zero runtime overhead compared to raw pointers. std::shared_ptr uses an atomic reference count control block.',
    bugChallenge: {
      title: 'Cyclic Reference Memory Leak with shared_ptr',
      description: 'Two objects holding std::shared_ptr references to each other will never reach zero ref-count, leaking forever.',
      buggyCode: `struct Node {\n    std::shared_ptr<Node> next;\n    std::shared_ptr<Node> prev; // BUG: Cyclic reference leak!\n};`,
      solutionCode: `struct Node {\n    std::shared_ptr<Node> next;\n    std::weak_ptr<Node> prev; // weak_ptr breaks the cycle!\n};`,
      hint: 'Use std::weak_ptr for back-references.',
      bugExplanation: 'std::weak_ptr observes a shared object without incrementing its strong reference count.'
    }
  },
  {
    id: 'cpp-exp-4',
    title: 'C++20 Concepts & Constraints (requires clauses)',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Replace cryptic SFINAE template errors with clear compile-time constraints using C++20 concepts.',
    concepts: ['concept keyword definition', 'requires clause validation', 'Standard concepts (<concepts>)', 'Clean compiler diagnostic messages'],
    starterCode: `#include <iostream>
#include <concepts>

template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<Numeric T>
T add_numbers(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "Integer sum: " << add_numbers(10, 20) << std::endl;
    std::cout << "Float sum: " << add_numbers(3.14, 2.71) << std::endl;
    // add_numbers("hello", "world"); // Rejected by compiler with clean concept mismatch error!
    return 0;
}`,
    expectedOutput: 'Integer sum: 30\nFloat sum: 5.85',
    explanation: 'C++20 concepts act as predicates evaluated at compile time to constrain template parameters, making template interfaces self-documenting.',
    bugChallenge: {
      title: 'Passing Non-Compliant Type to Constrained Function',
      description: 'Passing a type that does not satisfy the Numeric concept fails compilation.',
      buggyCode: `// add_numbers(std::string("A"), std::string("B")); // BUG: concept mismatch!`,
      solutionCode: `add_numbers(100, 250);`,
      hint: 'Ensure passed arguments satisfy the defined concept requirements.',
      bugExplanation: 'Concepts enforce compile-time verification before template instantiation occurs.'
    }
  },
  {
    id: 'cpp-exp-5',
    title: 'Compile-Time Computation with constexpr & consteval',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Execute complex calculations and lookup tables during compilation to eliminate runtime execution cost.',
    concepts: ['constexpr functions', 'consteval immediate functions', 'std::is_constant_evaluated()', 'Compile-time hash tables'],
    starterCode: `#include <iostream>

consteval unsigned long long factorial(int n) {
    unsigned long long res = 1;
    for (int i = 2; i <= n; ++i) res *= i;
    return res;
}

int main() {
    // Computed 100% by the compiler during build!
    constexpr auto fact10 = factorial(10);
    std::cout << "Compile-time factorial of 10: " << fact10 << std::endl;
    return 0;
}`,
    expectedOutput: 'Compile-time factorial of 10: 3628800',
    explanation: '`consteval` guarantees that a function must evaluate at compile time, guaranteeing zero runtime CPU cycles are spent computing the result.',
    bugChallenge: {
      title: 'Calling consteval with Runtime Variable Bug',
      description: 'Passing a variable whose value is determined at runtime to a consteval function causes a compilation error.',
      buggyCode: `int x = 5;\n// auto val = factorial(x); // BUG: x is not a constant expression!`,
      solutionCode: `constexpr int x = 5;\nauto val = factorial(x);`,
      hint: 'Declare the input variable with constexpr.',
      bugExplanation: 'consteval requires all inputs to be known at compile time.'
    }
  },
  {
    id: 'cpp-exp-6',
    title: 'C++20 Ranges & Views Pipeline',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Compose clean functional data transformation pipelines using the pipe operator without intermediate buffer allocations.',
    concepts: ['std::views::filter and transform', 'Lazy evaluation pipeline (|)', 'Zero heap copy range adaptors', 'std::ranges algorithms'],
    starterCode: `#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Filter evens, square them, take first 3 elements lazily
    auto pipeline = numbers 
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(3);

    std::cout << "Pipeline results: ";
    for (int v : pipeline) {
        std::cout << v << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
    expectedOutput: 'Pipeline results: 4 16 36',
    explanation: 'C++20 ranges views are lazily evaluated non-owning wrappers that compose via Unix-like pipe operators with zero allocation overhead.',
    bugChallenge: {
      title: 'Modifying Underlying Container During View Iteration',
      description: 'Mutating a vector while iterating over a view causes undefined behavior and iterator invalidation.',
      buggyCode: `for (int v : pipeline) {\n    numbers.push_back(v); // BUG: Invalidates vector iterators!\n}`,
      solutionCode: `std::vector<int> results(pipeline.begin(), pipeline.end());`,
      hint: 'Collect view output into a separate container before mutating the source.',
      bugExplanation: 'Views hold references into the source container; reallocation invalidates internal pointers.'
    }
  },
  {
    id: 'cpp-exp-7',
    title: 'Variadic Templates & Fold Expressions',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Process arbitrary numbers of heterogeneous parameters using modern C++17 fold expressions.',
    concepts: ['Template parameter packs (typename... Args)', 'Fold expressions (... + args)', 'Comma operator folds', 'Type-safe logging pipelines'],
    starterCode: `#include <iostream>

template<typename... Args>
auto sum_all(Args... args) {
    return (... + args); // Unary left fold over addition
}

template<typename... Args>
void print_all(Args... args) {
    ((std::cout << args << " "), ...); // Binary fold over comma operator
    std::cout << std::endl;
}

int main() {
    std::cout << "Sum: " << sum_all(1, 2, 3, 4, 5) << std::endl;
    print_all("C++20", "Fold", "Expressions", 2026);
    return 0;
}`,
    expectedOutput: 'Sum: 15\nC++20 Fold Expressions 2026',
    explanation: 'Fold expressions allow unpacking template parameter packs directly using binary operators without tedious recursive template boilerplate.',
    bugChallenge: {
      title: 'Empty Parameter Pack in Binary Fold Bug',
      description: 'Folding over operators without an identity value on an empty parameter pack causes a compiler error.',
      buggyCode: `template<typename... Args>\nauto multiply(Args... args) { return (... * args); }\n// multiply(); // BUG: empty pack with no base value!`,
      solutionCode: `template<typename... Args>\nauto multiply(Args... args) { return (1 * ... * args); }`,
      hint: 'Provide an initial identity value (like 1 for multiplication).',
      bugExplanation: 'Only operators &&, ||, and comma have default empty pack values.'
    }
  },
  {
    id: 'cpp-exp-8',
    title: 'C++20 Coroutines: co_await, co_yield & co_return',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Build stackless coroutines for asynchronous task execution and infinite generator streams.',
    concepts: ['Stackless coroutines', 'Promise type interface (promise_type)', 'co_await suspension points', 'co_yield generators'],
    starterCode: `#include <iostream>

// Conceptual demonstration of C++20 Coroutine State Machine
struct CoroutineState {
    int current_val = 0;
    bool is_done = false;

    int next() {
        current_val += 10;
        if (current_val > 30) is_done = true;
        return current_val;
    }
};

int main() {
    CoroutineState gen;
    std::cout << "Resuming coroutine frame:" << std::endl;
    while (!gen.is_done) {
        std::cout << "Yielded value: " << gen.next() << std::endl;
    }
    std::cout << "Coroutine completed." << std::endl;
    return 0;
}`,
    expectedOutput: 'Resuming coroutine frame:\nYielded value: 10\nYielded value: 20\nYielded value: 30\nYielded value: 40\nCoroutine completed.',
    explanation: 'C++20 coroutines are functions that can suspend execution to be resumed later, storing local state on the heap without maintaining OS thread stacks.',
    bugChallenge: {
      title: 'Dangling Reference in Coroutine Frame Bug',
      description: 'Passing parameters by reference to a coroutine that outlives the caller scope causes use-after-free.',
      buggyCode: `// task async_work(const std::string& ref) { co_await ... } // BUG: ref goes out of scope!`,
      solutionCode: `// task async_work(std::string by_value) { co_await ... }`,
      hint: 'Pass arguments by value so they are safely copied into the coroutine state frame.',
      bugExplanation: 'Coroutines outlive the stack frame of their calling function; references become dangling.'
    }
  },
  {
    id: 'cpp-exp-9',
    title: 'std::jthread & Cooperative Cancellation (std::stop_token)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Manage OS threads safely with automatic joining on destruction and clean cooperative cancellation.',
    concepts: ['std::jthread vs std::thread', 'RAII thread joining', 'std::stop_token & stop_source', 'Preventing std::terminate on scope exit'],
    starterCode: `#include <iostream>
#include <thread>
#include <chrono>

void worker(std::stop_token stoken) {
    std::cout << "Worker started" << std::endl;
    int counter = 0;
    while (!stoken.stop_requested() && counter < 3) {
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
        counter++;
    }
    std::cout << "Worker exiting cooperatively after " << counter << " ticks" << std::endl;
}

int main() {
    {
        std::jthread jt(worker);
        // Automatically signals stop and joins at end of scope!
    }
    std::cout << "Thread joined cleanly" << std::endl;
    return 0;
}`,
    expectedOutput: 'Worker started\nWorker exiting cooperatively after 3 ticks\nThread joined cleanly',
    explanation: 'std::jthread automatically joins upon destruction and supports cooperative cancellation tokens, preventing crashes caused by unjoined std::thread.',
    bugChallenge: {
      title: 'std::thread Termination on Destruction Bug',
      description: 'Leaving a joinable std::thread unjoined or undetached calls std::terminate, crashing the process.',
      buggyCode: `void run() {\n    std::thread t([](){});\n    // BUG: function returns without t.join(); crash!\n}`,
      solutionCode: `void run() {\n    std::jthread t([](){}); // Safe! Automatically joins in destructor.\n}`,
      hint: 'Replace std::thread with std::jthread in C++20.',
      bugExplanation: 'The destructor of std::thread invokes std::terminate if the thread is still joinable.'
    }
  },
  {
    id: 'cpp-exp-10',
    title: 'Atomic Operations & Memory Orders (std::atomic)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Write lock-free concurrent algorithms using atomic primitives and precise hardware memory barriers.',
    concepts: ['std::atomic<T>', 'Memory orderings: relaxed, acquire, release, seq_cst', 'Compare-and-swap (compare_exchange_weak)', 'Hardware cache coherence'],
    starterCode: `#include <iostream>
#include <atomic>

std::atomic<int> counter(0);

void increment() {
    // Atomic fetch-add with relaxed memory ordering
    counter.fetch_add(1, std::memory_order_relaxed);
}

int main() {
    increment();
    increment();
    std::cout << "Atomic counter value: " << counter.load(std::memory_order_seq_cst) << std::endl;
    return 0;
}`,
    expectedOutput: 'Atomic counter value: 2',
    explanation: 'std::atomic prevents data races without OS mutex locks by mapping directly to hardware atomic CPU bus instructions (LOCK CMPXCHG).',
    bugChallenge: {
      title: 'Data Race on Non-Atomic Counter Bug',
      description: 'Using standard ++ on a shared int across threads creates a data race with undefined behavior.',
      buggyCode: `int count = 0; // BUG: Non-atomic increment across threads\n// count++;`,
      solutionCode: `std::atomic<int> count{0};\ncount.fetch_add(1, std::memory_order_relaxed);`,
      hint: 'Use std::atomic<int> for multithreaded counters.',
      bugExplanation: 'Standard ++ compiles to read-modify-write which interleaves across CPU cores without synchronization.'
    }
  },
  {
    id: 'cpp-exp-11',
    title: 'The Rule of Five & The Rule of Zero',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Design classes that manage resources cleanly by properly declaring or defaulting the five special member functions.',
    concepts: ['Destructor, copy ctor, copy assign, move ctor, move assign', '= default and = delete', 'Rule of Zero (prefer std containers)', 'Slicing prevention'],
    starterCode: `#include <iostream>

class ResourceHolder {
public:
    // Rule of Zero: Use smart pointers and standard types, let compiler generate defaults
    std::string name;
    
    ResourceHolder(std::string n) : name(std::move(n)) {}
    ~ResourceHolder() = default;
    ResourceHolder(const ResourceHolder&) = default;
    ResourceHolder& operator=(const ResourceHolder&) = default;
    ResourceHolder(ResourceHolder&&) noexcept = default;
    ResourceHolder& operator=(ResourceHolder&&) noexcept = default;
};

int main() {
    ResourceHolder r1("Database Connection");
    ResourceHolder r2 = std::move(r1);
    std::cout << "Resource moved successfully: " << r2.name << std::endl;
    return 0;
}`,
    expectedOutput: 'Resource moved successfully: Database Connection',
    explanation: 'The Rule of Zero states that classes should avoid declaring any custom copy/move/destructor members by relying on standard RAII wrappers.',
    bugChallenge: {
      title: 'Shallow Copying Raw Pointer Member Bug',
      description: 'Copying an object with a raw pointer member duplicates the pointer address without allocating a new buffer, causing double free.',
      buggyCode: `class Bad {\n    char* buf;\n    Bad() : buf(new char[10]) {}\n    ~Bad() { delete[] buf; }\n    // BUG: Missing copy constructor; compiler generates shallow copy!\n};`,
      solutionCode: `class Good {\n    std::unique_ptr<char[]> buf;\n    // Compiler correctly deletes copy constructor automatically\n};`,
      hint: 'Follow the Rule of Zero using smart pointers or define deep copy constructors.',
      bugExplanation: 'The default copy constructor performs member-wise shallow copies, duplicating pointer values.'
    }
  },
  {
    id: 'cpp-exp-12',
    title: 'Perfect Forwarding with std::forward & Universal References',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Preserve value categories (lvalue vs rvalue) when forwarding arguments through generic template wrappers.',
    concepts: ['Universal (forwarding) references (T&&)', 'Reference collapsing rules', 'std::forward<T> implementation', 'Emplace back efficiency'],
    starterCode: `#include <iostream>
#include <utility>

void process(const std::string& s) {
    std::cout << "Processed Lvalue: " << s << std::endl;
}

void process(std::string&& s) {
    std::cout << "Processed Rvalue: " << s << std::endl;
}

template<typename T>
void relay(T&& arg) {
    process(std::forward<T>(arg)); // Perfectly preserves value category
}

int main() {
    std::string str = "Existing Data";
    relay(str);                 // Lvalue forwarded as Lvalue
    relay(std::string("Temp")); // Rvalue forwarded as Rvalue
    return 0;
}`,
    expectedOutput: 'Processed Lvalue: Existing Data\nProcessed Rvalue: Temp',
    explanation: '`std::forward<T>` uses reference collapsing to cast the argument back to an rvalue reference if and only if it was passed as an rvalue.',
    bugChallenge: {
      title: 'std::move Instead of std::forward in Template Bug',
      description: 'Using std::move on a forwarding reference unconditionally turns lvalues into rvalues, stealing data from caller variables.',
      buggyCode: `template<typename T>\nvoid bad_relay(T&& arg) {\n    process(std::move(arg)); // BUG: steals from lvalues!\n}`,
      solutionCode: `template<typename T>\nvoid good_relay(T&& arg) {\n    process(std::forward<T>(arg));\n}`,
      hint: 'Always use std::forward with forwarding references.',
      bugExplanation: 'std::move always casts to rvalue, which is destructive for caller-owned lvalues.'
    }
  },
  {
    id: 'cpp-exp-13',
    title: 'C++17 std::variant, std::optional & std::visit',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Handle nullable states and type-safe algebraic sum types without void pointers or null pointer exceptions.',
    concepts: ['std::optional<T> value-or-null', 'std::variant<Ts...> type-safe union', 'std::visit with overloaded lambdas', 'Zero dynamic allocation unions'],
    starterCode: `#include <iostream>
#include <optional>
#include <variant>

std::optional<int> parse_port(const std::string& s) {
    if (s == "8080") return 8080;
    return std::nullopt; // No value
}

using Response = std::variant<int, std::string>;

int main() {
    auto port = parse_port("8080");
    if (port.has_value()) {
        std::cout << "Port valid: " << *port << std::endl;
    }

    Response resp = std::string("HTTP 200 OK");
    std::visit([](auto&& arg) {
        std::cout << "Variant payload: " << arg << std::endl;
    }, resp);

    return 0;
}`,
    expectedOutput: 'Port valid: 8080\nVariant payload: HTTP 200 OK',
    explanation: '`std::variant` is a memory-safe tagged union that tracks the currently active type and prevents invalid memory interpretations.',
    bugChallenge: {
      title: 'Unchecked std::optional Dereference Bug',
      description: 'Dereferencing an empty std::optional via * produces undefined behavior.',
      buggyCode: `std::optional<int> opt = std::nullopt;\nint val = *opt; // BUG: Undefined behavior if empty!`,
      solutionCode: `std::optional<int> opt = std::nullopt;\nint val = opt.value_or(0); // Safe fallback default`,
      hint: 'Use .value_or(default) or check .has_value() first.',
      bugExplanation: 'Operator * does not check for engagement; .value() throws std::bad_optional_access.'
    }
  },
  {
    id: 'cpp-exp-14',
    title: 'Custom Memory Allocators & Arena / Memory Pools',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Bypass general-purpose heap fragmentation by allocating memory from contiguous fixed-size arenas.',
    concepts: ['Linear arena allocators', 'Memory pool chunking', 'Cache locality benefits', 'O(1) allocation and reset'],
    starterCode: `#include <iostream>
#include <cstddef>

class SimpleArena {
private:
    char buffer[1024];
    size_t offset = 0;
public:
    void* allocate(size_t bytes) {
        if (offset + bytes > sizeof(buffer)) return nullptr;
        void* ptr = &buffer[offset];
        offset += bytes;
        return ptr;
    }
    void reset() { offset = 0; }
    size_t bytes_used() const { return offset; }
};

int main() {
    SimpleArena arena;
    int* num = static_cast<int*>(arena.allocate(sizeof(int)));
    *num = 42;
    std::cout << "Allocated from arena: " << *num << std::endl;
    std::cout << "Arena memory consumed: " << arena.bytes_used() << " bytes" << std::endl;
    return 0;
}`,
    expectedOutput: 'Allocated from arena: 42\nArena memory consumed: 4 bytes',
    explanation: 'Arena allocators carve chunks sequentially from pre-allocated memory buffers in O(1) time without system kernel malloc overhead.',
    bugChallenge: {
      title: 'Alignment Violation in Custom Allocator Bug',
      description: 'Failing to align allocation offsets to alignof(T) causes hardware bus faults or CPU performance penalties.',
      buggyCode: `void* alloc(size_t s) { void* p = ptr; ptr += s; return p; } // BUG: unaligned!`,
      solutionCode: `// Use std::align to align pointer to proper word boundary`,
      hint: 'Ensure offsets are rounded up to the nearest multiple of alignof(T).',
      bugExplanation: 'CPUs require multi-byte types to be placed at memory addresses divisible by their size.'
    }
  },
  {
    id: 'cpp-exp-15',
    title: 'C++20 Three-Way Comparison (Spaceship Operator <=>) ',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Generate all six comparison operators (<, <=, ==, !=, >, >=) automatically with = default.',
    concepts: ['operator<=> (spaceship)', 'std::strong_ordering vs std::weak_ordering', '= default member generation', 'Lexicographical order'],
    starterCode: `#include <iostream>
#include <compare>

struct Version {
    int major;
    int minor;
    int patch;

    // Automatically synthesizes all six comparison operators!
    auto operator<=>(const Version&) const = default;
};

int main() {
    Version v1{2, 0, 1};
    Version v2{2, 1, 0};

    std::cout << "Is v1 < v2? " << (v1 < v2 ? "Yes" : "No") << std::endl;
    std::cout << "Is v1 == v2? " << (v1 == v2 ? "Yes" : "No") << std::endl;
    return 0;
}`,
    expectedOutput: 'Is v1 < v2? Yes\nIs v1 == v2? No',
    explanation: 'In C++20, defaulting operator<=> performs member-by-member lexicographical comparison, replacing boilerplate operator implementations.',
    bugChallenge: {
      title: 'Missing const Qualifier on Spaceship Operator',
      description: 'Omitting const on operator<=> prevents comparison of const references.',
      buggyCode: `auto operator<=>(const Version&) = default; // BUG: missing trailing const`,
      solutionCode: `auto operator<=>(const Version&) const = default;`,
      hint: 'Add `const` after the parameter list.',
      bugExplanation: 'Comparison operators should not mutate instance state and must be callable on const objects.'
    }
  },
  {
    id: 'cpp-exp-16',
    title: 'Structured Bindings & Deconstructible Types',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Unpack tuples, pairs, structs, and arrays into clean named local variables.',
    concepts: ['auto [a, b, c] syntax', 'Binding by reference (auto& [x, y])', 'Binding map iterators (const auto& [k, v])', 'Tuple protocol customization'],
    starterCode: `#include <iostream>
#include <map>

struct Point3D {
    int x;
    int y;
    int z;
};

int main() {
    Point3D pt{10, 20, 30};
    auto [px, py, pz] = pt; // Structured binding
    std::cout << "Extracted: x=" << px << ", y=" << py << ", z=" << pz << std::endl;

    std::map<std::string, int> scores{{"Alice", 98}, {"Bob", 85}};
    for (const auto& [name, score] : scores) {
        std::cout << name << " -> " << score << std::endl;
    }
    return 0;
}`,
    expectedOutput: 'Extracted: x=10, y=20, z=30\nAlice -> 98\nBob -> 85',
    explanation: 'Structured bindings decompose composite records into designated local identifiers, greatly improving clarity when iterating over associative maps.',
    bugChallenge: {
      title: 'Inadvertent Copy in Structured Binding',
      description: 'Using auto [k, v] instead of const auto& [k, v] makes deep copies of map elements on each iteration.',
      buggyCode: `for (auto [key, val] : large_map) {} // BUG: copies key and value every iteration!`,
      solutionCode: `for (const auto& [key, val] : large_map) {}`,
      hint: 'Use `const auto&` to avoid unnecessary copies.',
      bugExplanation: '`auto` performs value copies; references preserve memory without duplication.'
    }
  },
  {
    id: 'cpp-exp-17',
    title: 'C++20 Bit Manipulation (<bit> library)',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Execute hardware-accelerated bit operations like popcount and endian checking without compiler-specific intrinsics.',
    concepts: ['std::popcount (population count)', 'std::has_single_bit (power of 2 check)', 'std::bit_cast safe type punning', 'std::endian detection'],
    starterCode: `#include <iostream>
#include <bit>
#include <cstdint>

int main() {
    uint32_t val = 0b00010111; // 23 in binary (4 set bits)
    std::cout << "Set bits (popcount): " << std::popcount(val) << std::endl;
    std::cout << "Is 16 a power of 2? " << (std::has_single_bit(16u) ? "Yes" : "No") << std::endl;
    std::cout << "Is 17 a power of 2? " << (std::has_single_bit(17u) ? "Yes" : "No") << std::endl;
    return 0;
}`,
    expectedOutput: 'Set bits (popcount): 4\nIs 16 a power of 2? Yes\nIs 17 a power of 2? No',
    explanation: 'The C++20 `<bit>` header provides portable, constexpr-friendly functions that map directly to hardware CPU bit instructions like POPCNT.',
    bugChallenge: {
      title: 'UB Type Punning with reinterpret_cast Bug',
      description: 'Using reinterpret_cast to read a float bit-pattern as uint32_t violates the strict aliasing rule.',
      buggyCode: `float f = 1.0f;\n// uint32_t bits = *reinterpret_cast<uint32_t*>(&f); // BUG: UB strict aliasing violation!`,
      solutionCode: `float f = 1.0f;\nuint32_t bits = std::bit_cast<uint32_t>(f); // 100% standard legal in C++20!`,
      hint: 'Use std::bit_cast<To>(from).',
      bugExplanation: '`std::bit_cast` safely copies bits without violating strict aliasing rules.'
    }
  },
  {
    id: 'cpp-exp-18',
    title: 'Inline Namespaces & ABI Versioning',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Version enterprise C++ libraries cleanly without breaking backwards compatibility for legacy client code.',
    concepts: ['inline namespace syntax', 'Default namespace resolution', 'ABI symbol mangling', 'Graceful library deprecation'],
    starterCode: `#include <iostream>

namespace Engine {
    namespace v1 {
        void render() { std::cout << "Render v1 (Software Rasterizer)" << std::endl; }
    }
    inline namespace v2 { // Current default
        void render() { std::cout << "Render v2 (Vulkan Hardware Accelerated)" << std::endl; }
    }
}

int main() {
    Engine::render();       // Resolves to v2 by default
    Engine::v1::render();   // Explicit opt-in to legacy v1
    return 0;
}`,
    expectedOutput: 'Render v2 (Vulkan Hardware Accelerated)\nRender v1 (Software Rasterizer)',
    explanation: 'Symbols in an inline namespace are treated as members of the enclosing parent namespace while retaining distinct mangled names for linker compatibility.',
    bugChallenge: {
      title: 'Ambiguous Call with Multiple Inline Namespaces Bug',
      description: 'Marking two namespaces inline with the same function signature causes an ambiguous overload error.',
      buggyCode: `inline namespace v1 { void f(); }\ninline namespace v2 { void f(); } // BUG: call to f() is ambiguous!`,
      solutionCode: `namespace v1 { void f(); }\ninline namespace v2 { void f(); } // Only the current version is inline`,
      hint: 'Only one version should be designated inline at any time.',
      bugExplanation: 'Inline promotes members into the parent namespace; duplicates cause ambiguous resolution.'
    }
  },
  {
    id: 'cpp-exp-19',
    title: 'Template Metaprogramming: SFINAE to std::void_t',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Detect member functions and types on arbitrary classes at compile time before concepts were introduced.',
    concepts: ['Substitution Failure Is Not An Error (SFINAE)', 'std::void_t trick', 'Type traits design', 'Compiler type deduction'],
    starterCode: `#include <iostream>
#include <type_traits>

// Trait to detect if T has a .serialize() method
template<typename T, typename = void>
struct has_serialize : std::false_type {};

template<typename T>
struct has_serialize<T, std::void_t<decltype(std::declval<T>().serialize())>> : std::true_type {};

struct Model { void serialize() {} };
struct RawData {};

int main() {
    std::cout << "Model has serialize: " << has_serialize<Model>::value << std::endl;
    std::cout << "RawData has serialize: " << has_serialize<RawData>::value << std::endl;
    return 0;
}`,
    expectedOutput: 'Model has serialize: 1\nRawData has serialize: 0',
    explanation: '`std::void_t` maps any well-formed type expression to void. If a class lacks the probed member, substitution fails quietly and falls back to the base template.',
    bugChallenge: {
      title: 'Uninstantiable Class in declval Expression',
      description: 'Using T() instead of std::declval<T>() fails if T has private or deleted default constructors.',
      buggyCode: `// decltype(T().serialize()) // BUG: fails if T has no default constructor!`,
      solutionCode: `decltype(std::declval<T>().serialize())`,
      hint: 'Use std::declval<T>() to produce a dummy value without calling constructors.',
      bugExplanation: '`std::declval` allows type introspection inside decltype without invoking constructor code.'
    }
  },
  {
    id: 'cpp-exp-20',
    title: 'Custom Polymorphic Allocators (std::pmr)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Switch container memory allocators at runtime without changing the container C++ type.',
    concepts: ['std::pmr::vector & std::pmr::string', 'std::pmr::memory_resource', 'monotonic_buffer_resource', 'Stack-based buffer optimization'],
    starterCode: `#include <iostream>
#include <vector>
#include <memory_resource>

int main() {
    // Stack-allocated scratchpad buffer (no heap malloc!)
    char stack_buffer[256];
    std::pmr::monotonic_buffer_resource mem_pool(stack_buffer, sizeof(stack_buffer));

    // Vector using stack memory resource
    std::pmr::vector<int> numbers(&mem_pool);
    numbers.push_back(100);
    numbers.push_back(200);

    std::cout << "PMR Vector elements count: " << numbers.size() << std::endl;
    std::cout << "First value: " << numbers[0] << std::endl;
    return 0;
}`,
    expectedOutput: 'PMR Vector elements count: 2\nFirst value: 100',
    explanation: 'PMR (Polymorphic Memory Resources) abstracts allocation behind virtual functions, allowing vectors with identical types to use stack arenas or shared memory pools.',
    bugChallenge: {
      title: 'Container Outliving Memory Resource Bug',
      description: 'Allowing a PMR container to outlive its underlying memory_resource causes use-after-free on destruction.',
      buggyCode: `std::pmr::vector<int> bad_func() {\n    char buf[128];\n    std::pmr::monotonic_buffer_resource pool(buf, sizeof(buf));\n    return std::pmr::vector<int>(&pool); // BUG: pool destroyed at return!\n}`,
      solutionCode: `// The memory_resource must always have a longer lifetime than containers referencing it.`,
      hint: 'Ensure memory_resource scope wraps container scope.',
      bugExplanation: 'The container calls its allocator during destruction; the resource must still exist.'
    }
  }
];
