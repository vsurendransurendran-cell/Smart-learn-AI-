import { ProgrammingLanguageTrack } from '../types';

export const ADDITIONAL_PROGRAMMING_TRACKS: ProgrammingLanguageTrack[] = [
  // 5. GO TRACK
  {
    id: 'track-go',
    name: 'Go (Golang)',
    slug: 'go',
    icon: '🐹',
    color: 'from-cyan-600 to-blue-700',
    badge: 'Cloud & Distributed',
    tagline: 'Goroutines, CSP Channels, Garbage-Collected Concurrency, and High-Throughput Microservices.',
    description: 'Master Go from foundational syntax, structs, and interfaces to CSP channels, race detector profiling, runtime scheduler mechanics, and production gRPC microservices.',
    totalModules: 9,
    estimatedHours: 18,
    videoCourse: {
      title: 'Go (Golang) Full Engineering Course: Goroutines to Cloud Native',
      youtubeId: 'YS4e4q9oBaU',
      instructor: 'freeCodeCamp.org & Alex Edwards',
      duration: '6h 30m',
      channel: 'freeCodeCamp.org',
      description: 'Comprehensive Go systems guide covering goroutines, channels, interfaces, memory allocation, context cancellation, and HTTP servers.',
      chapters: [
        { title: 'Go Environment, Tooling & Module Setup', timestamp: '00:00', seconds: 0 },
        { title: 'Basic Types, Slices, Arrays & Maps', timestamp: '30:00', seconds: 1800 },
        { title: 'Structs, Embedding & Implicit Interfaces', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Error Handling (errors.Is/As) & Defer', timestamp: '2:00:00', seconds: 7200 },
        { title: 'Goroutines, CSP Channels & Select', timestamp: '3:10:00', seconds: 11400 },
        { title: 'Context Propagation & HTTP Microservices', timestamp: '4:30:00', seconds: 16200 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Static typing, slice headers, structs, and implicit interfaces.',
        lessons: [
          {
            id: 'go-scratch-1',
            title: '1. Slices, Headers & Backing Arrays',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Understand slice headers containing pointer, length, and capacity, plus growth reallocation.',
            concepts: ['Slice 3-word header', 'Backing array sharing', 'append() capacity doubling', 'make([]T, len, cap)'],
            starterCode: `package main

import "fmt"

func main() {
    s := make([]int, 3, 5)
    s[0], s[1], s[2] = 10, 20, 30
    fmt.Printf("Slice: %v, Len: %d, Cap: %d\\n", s, len(s), cap(s))

    s2 := append(s, 40)
    fmt.Printf("Appended: %v, New Len: %d, Cap: %d\\n", s2, len(s2), cap(s2))
}`,
            expectedOutput: 'Slice: [10 20 30], Len: 3, Cap: 5\nAppended: [10 20 30 40], New Len: 4, Cap: 5',
            explanation: 'In Go, a slice is a lightweight 24-byte struct referencing an underlying array. append() mutates the backing array in-place until capacity is exceeded, then reallocates a doubled buffer.',
            youtubeVideoId: 'YS4e4q9oBaU',
            bugChallenge: {
              title: 'The Shared Backing Array Mutation Hazard',
              description: 'Fix the bug where modifying a sub-slice inadvertently corrupts the original slice data because both share the same backing array.',
              buggyCode: `original := []int{1, 2, 3}\nsub := original[0:2]\nsub[0] = 99 // Mutates original[0]!`,
              fixOptions: [
                'Allocate an independent slice and use copy(sub, original[0:2])',
                'Call defer sub[0] = 1',
                'Cast the slice to a map',
                'Pass original by pointer'
              ],
              correctOptionIndex: 0,
              explanation: 'Sub-slicing a slice creates a new slice header pointing to the same backing array. Use copy() to create an isolated copy.',
              xpReward: 75
            }
          },
          {
            id: 'go-scratch-2',
            title: '2. Struct Embedding & Implicit Interfaces',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'Composition over inheritance and structural interface satisfaction.',
            concepts: ['Struct embedding', 'Implicit interface fulfillment', 'Type assertions', 'io.Reader / io.Writer'],
            starterCode: `package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Greeter struct {
    Name string
}

func (g Greeter) Speak() string {
    return "Hello from " + g.Name
}

func Announce(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    Announce(Greeter{Name: "Gopher"})
}`,
            expectedOutput: 'Hello from Gopher',
            explanation: 'Go uses structural subtyping: any type implementing all methods of an interface automatically satisfies it without explicit implements declarations.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Concurrency & CSP Channels',
        description: 'Goroutines, unbuffered vs buffered channels, and select multiplexing.',
        lessons: [
          {
            id: 'go-inter-1',
            title: '1. Channels, Goroutines & Select Loops',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Share memory by communicating: CSP channel pipelines and non-blocking select.',
            concepts: ['Goroutine lightweight stacks (2KB)', 'Unbuffered channel synchronization', 'Buffered channel capacity', 'select with time.After'],
            starterCode: `package main

import (
    "fmt"
    "time"
)

func worker(id int, ch chan string) {
    time.Sleep(10 * time.Millisecond)
    ch <- fmt.Sprintf("Worker %d finished", id)
}

func main() {
    ch := make(chan string, 2)
    go worker(1, ch)
    go worker(2, ch)

    for i := 0; i < 2; i++ {
        fmt.Println(<-ch)
    }
}`,
            expectedOutput: 'Worker 1 finished\nWorker 2 finished',
            explanation: 'Goroutines run concurrently on M:N multiplexed OS threads. Channels synchronize execution and transfer ownership of values safely.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Systems, Runtime & Concurrency Safety',
        description: 'Context cancellation, sync.Mutex, atomic CAS, and race detector profiling.',
        lessons: [
          {
            id: 'go-adv-1',
            title: '1. Context Propagation & Graceful Cancellation',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Propagate deadlines, cancellation signals, and request-scoped values across RPC boundaries.',
            concepts: ['context.WithTimeout', 'context.Done() channel', 'sync.WaitGroup coordination', 'Go race detector (-race)'],
            starterCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func queryDatabase(ctx context.Context) (string, error) {
    select {
    case <-time.After(50 * time.Millisecond):
        return "Query Results", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    res, err := queryDatabase(ctx)
    if err != nil {
        fmt.Println("Failed:", err)
    } else {
        fmt.Println("Success:", res)
    }
}`,
            expectedOutput: 'Success: Query Results',
            explanation: 'context.Context coordinates cancellation cascades across call graphs and microservices, preventing goroutine leaks.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-go-hard',
      title: 'Go Systems Engineering & Cloud Architecture Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Certified Go Systems Architect',
      accreditationId: 'SL-GOLANG-2026',
      skillsCovered: ['Goroutine Scheduler (GMP)', 'CSP Channels', 'Garbage Collector (Tri-Color)', 'Context Cancellation', 'Race Detector'],
      questions: [
        {
          id: 'go-hard-q1',
          question: 'In the Go runtime scheduler (GMP model), what do G, M, and P represent?',
          options: [
            'Global, Mutex, Process',
            'Goroutine (user task), Machine (OS thread), Processor (logical context holding run queue and cache)',
            'Generic, Method, Package',
            'Garbage collector, Memory manager, Profiler'
          ],
          correctIndex: 1,
          explanation: 'The Go runtime GMP model manages Goroutines (G), OS threads (M), and logical Processors (P == GOMAXPROCS). Work stealing distributes runnable Gs across Ps.',
          subtopic: 'Go Runtime Scheduler'
        },
        {
          id: 'go-hard-q2',
          question: 'What happens when a goroutine sends a value to a nil channel?',
          options: [
            'The value is silently dropped without error',
            'It panics immediately with a runtime error',
            'The send blocks forever (deadlock if no other goroutines run)',
            'It creates a new buffered channel automatically'
          ],
          correctIndex: 2,
          explanation: 'Reading from or sending to a nil channel in Go blocks permanently. Closing a nil channel panics.',
          subtopic: 'Channel Semantics'
        },
        {
          id: 'go-hard-q3',
          question: 'How does Go’s concurrent tri-color mark-and-sweep garbage collector maintain low STW pause times (<1ms)?',
          options: [
            'It uses reference counting and deletes objects immediately',
            'It runs concurrently alongside user goroutines using a write barrier to track live pointer mutations, requiring STW pauses only for tiny phase shifts',
            'It never collects heap memory until process exit',
            'It offloads garbage collection to an external C daemon'
          ],
          correctIndex: 1,
          explanation: 'Go uses a concurrent tri-color mark-and-sweep collector. Write barriers catch mutator pointer modifications concurrently, limiting STW pause times to microseconds.',
          subtopic: 'Go Garbage Collector'
        },
        {
          id: 'go-hard-q4',
          question: 'What does the Go compiler escape analysis do when a local variable pointer is returned from a function?',
          options: [
            'It triggers a compile error for illegal memory access',
            'It promotes the variable allocation from the goroutine stack to the shared runtime heap',
            'It zeroes out the memory address upon return',
            'It clones the pointer into thread-local storage'
          ],
          correctIndex: 1,
          explanation: 'Escape analysis determines if a variable outlives the stack frame of its creating function. If a reference escapes, it is allocated on the heap instead of the stack.',
          subtopic: 'Escape Analysis'
        },
        {
          id: 'go-hard-q5',
          question: 'What is the correct way to detect data races in a Go project during testing?',
          options: [
            'Inspect logs for runtime warnings',
            'Run "go test -race ./..." to compile with ThreadSanitizer instrumentation',
            'Check if mutex lock times exceed 1 millisecond',
            'Use GODEBUG=schedtrace=1000'
          ],
          correctIndex: 1,
          explanation: 'Go includes a built-in race detector powered by ThreadSanitizer. Running "go test -race" instruments memory access sites to detect unsynchronized concurrent reads and writes.',
          subtopic: 'Race Detector'
        }
      ]
    }
  },

  // 6. C++ 20/23 TRACK
  {
    id: 'track-cpp',
    name: 'C++ 20/23',
    slug: 'cpp',
    icon: '⚙️',
    color: 'from-blue-700 to-indigo-900',
    badge: 'High-Performance Systems',
    tagline: 'Zero-Overhead Abstractions, RAII, Modern Move Semantics & Template Metaprogramming.',
    description: 'Master modern C++20/23: RAII, smart pointers, lvalue/rvalue semantics, std::move, compile-time concepts, templates, and low-latency cache-coherent memory layouts.',
    totalModules: 9,
    estimatedHours: 20,
    videoCourse: {
      title: 'Modern C++20 Full Engineering Course: Memory to Templates',
      youtubeId: '18c3MTX0PK0',
      instructor: 'freeCodeCamp.org & The Cherno',
      duration: '5h 45m',
      channel: 'freeCodeCamp.org',
      description: 'Master modern C++20 systems programming: RAII, move semantics, smart pointers, concepts, ranges, and cache-friendly data structures.',
      chapters: [
        { title: 'Compiler Toolchains, CMake & Translation Units', timestamp: '00:00', seconds: 0 },
        { title: 'Pointers, References & RAII Memory Ownership', timestamp: '30:00', seconds: 1800 },
        { title: 'Smart Pointers: std::unique_ptr & std::shared_ptr', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Move Semantics, Rvalues & std::forward', timestamp: '2:10:00', seconds: 7800 },
        { title: 'Templates, SFINAE & C++20 Concepts', timestamp: '3:20:00', seconds: 12000 },
        { title: 'Cache Locality, Concurrency & Atomics', timestamp: '4:30:00', seconds: 16200 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Modern RAII, smart pointers, value semantics, and reference passing.',
        lessons: [
          {
            id: 'cpp-scratch-1',
            title: '1. RAII & Smart Pointers (std::unique_ptr)',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Resource Acquisition Is Initialization (RAII) and zero-cost ownership with unique_ptr.',
            concepts: ['RAII lifetime semantics', 'std::unique_ptr exclusive ownership', 'std::make_unique', 'Destructor deterministic execution'],
            starterCode: `#include <iostream>
#include <memory>

struct Sensor {
    int id;
    Sensor(int i) : id(i) { std::cout << "Sensor " << id << " created\\n"; }
    ~Sensor() { std::cout << "Sensor " << id << " destroyed\\n"; }
};

int main() {
    {
        auto s = std::make_unique<Sensor>(42);
        std::cout << "Using sensor " << s->id << "\\n";
    } // Sensor automatically destroyed here!
    std::cout << "Scope exited safely\\n";
    return 0;
}`,
            expectedOutput: 'Sensor 42 created\nUsing sensor 42\nSensor 42 destroyed\nScope exited safely',
            explanation: 'RAII guarantees that memory and OS handles are freed deterministically when an object goes out of scope, eliminating memory leaks.',
            youtubeVideoId: '18c3MTX0PK0',
            bugChallenge: {
              title: 'The Dangling Raw Pointer Hazard',
              description: 'Find why referencing a stack variable after its enclosing block ends causes undefined behavior.',
              buggyCode: `int* ptr = nullptr;\n{\n    int x = 100;\n    ptr = &x;\n}\nstd::cout << *ptr; // BUG: use-after-scope!`,
              fixOptions: [
                'Allocate x via std::make_unique<int>(100) or keep x in scope',
                'Add const to ptr',
                'Cast ptr to void*',
                'Call std::flush before exit'
              ],
              correctOptionIndex: 0,
              explanation: 'Local stack variables are deallocated when their block exits. Using a pointer to an out-of-scope variable triggers undefined behavior.',
              xpReward: 75
            }
          },
          {
            id: 'cpp-scratch-2',
            title: '2. References, Const Correctness & Values',
            level: 'scratch',
            durationMinutes: 25,
            summary: 'Pass-by-const-reference vs pass-by-value and avoiding unnecessary copy constructor calls.',
            concepts: ['const T& parameter passing', 'Copy constructors', 'Value categories', 'Memory layout of structs'],
            starterCode: `#include <iostream>
#include <string>

void printDetails(const std::string& name, int score) {
    std::cout << "Player: " << name << ", Score: " << score << "\\n";
}

int main() {
    std::string player = "Aria";
    printDetails(player, 950);
    return 0;
}`,
            expectedOutput: 'Player: Aria, Score: 950',
            explanation: 'Passing large non-trivial types by const reference avoids expensive heap copies while guaranteeing immutability.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Move Semantics & Rvalues',
        description: 'std::move, rvalue references (&&), and perfect forwarding.',
        lessons: [
          {
            id: 'cpp-inter-1',
            title: '1. Move Constructors & std::move',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Transfer resource ownership without allocating memory using rvalue references.',
            concepts: ['lvalues vs rvalues', 'Rvalue references (T&&)', 'std::move cast', 'Rule of 5'],
            starterCode: `#include <iostream>
#include <vector>
#include <utility>

int main() {
    std::vector<int> src = {1, 2, 3, 4, 5};
    std::cout << "Src size before move: " << src.size() << "\\n";

    std::vector<int> dst = std::move(src);
    std::cout << "Dst size after move: " << dst.size() << "\\n";
    std::cout << "Src size after move: " << src.size() << "\\n";
    return 0;
}`,
            expectedOutput: 'Src size before move: 5\nDst size after move: 5\nSrc size after move: 0',
            explanation: 'std::move casts an lvalue to an rvalue, allowing vector pointers to be swapped in O(1) time without copying buffer elements.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: C++20 Concepts, Templates & Cache Locality',
        description: 'C++20 concepts, compile-time constraints, and cache-conscious contiguous data layouts.',
        lessons: [
          {
            id: 'cpp-adv-1',
            title: '1. C++20 Concepts & Compile-Time Constraints',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Constrain template parameters with readable C++20 concepts instead of complex SFINAE.',
            concepts: ['template <typename T> requires', 'std::integral concept', 'constexpr evaluation', 'CPU cache line friendliness (std::vector vs linked list)'],
            starterCode: `#include <iostream>
#include <concepts>

template <typename T>
requires std::integral<T>
T addIntegers(T a, T b) {
    return a + b;
}

int main() {
    std::cout << "Sum: " << addIntegers(20, 30) << "\\n";
    return 0;
}`,
            expectedOutput: 'Sum: 50',
            explanation: 'C++20 concepts enforce type constraints at compile time with crystal-clear compiler error diagnostics.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-cpp-hard',
      title: 'C++20/23 Low-Latency & Systems Architecture Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Certified Modern C++ Systems Architect',
      accreditationId: 'SL-CPP-2026',
      skillsCovered: ['RAII', 'Move Semantics', 'C++20 Concepts', 'Cache Line Optimization', 'Smart Pointers'],
      questions: [
        {
          id: 'cpp-hard-q1',
          question: 'What is the primary difference between std::unique_ptr and std::shared_ptr?',
          options: [
            'std::unique_ptr has 8-byte overhead; shared_ptr has no overhead',
            'std::unique_ptr has zero runtime memory overhead beyond a raw pointer and enforces single ownership; std::shared_ptr uses an atomic reference counter in an allocated control block',
            'std::shared_ptr can only be used with primitive types',
            'std::unique_ptr cannot be passed into functions'
          ],
          correctIndex: 1,
          explanation: 'std::unique_ptr is a zero-overhead abstraction with sole ownership. std::shared_ptr incurs atomic reference-counting increments and control-block heap allocations.',
          subtopic: 'Smart Pointers'
        },
        {
          id: 'cpp-hard-q2',
          question: 'What does std::move(x) actually do at runtime?',
          options: [
            'It physically copies the memory from source to destination in RAM',
            'It is purely a compile-time static_cast to an rvalue reference (T&&) without generating any machine code instructions itself',
            'It clears the CPU L1 data cache',
            'It calls free() on x'
          ],
          correctIndex: 1,
          explanation: 'std::move performs no runtime data movement; it unconditionally casts an expression to an rvalue reference, enabling move constructors or move assignment operators to be selected.',
          subtopic: 'Move Semantics'
        },
        {
          id: 'cpp-hard-q3',
          question: 'In modern high-performance C++, why does std::vector<T> consistently outperform std::list<T> even for insertions in middle elements for moderate sizes?',
          options: [
            'std::list uses 64-bit integer keys',
            'std::vector stores elements in contiguous memory, maximizing CPU L1/L2 data cache line prefetching and avoiding pointer-chasing cache misses',
            'std::vector disables bounds checking entirely',
            'std::list requires virtual method table dispatches'
          ],
          correctIndex: 1,
          explanation: 'Modern hardware performance is dominated by memory hierarchy latency. std::vector stores elements contiguously, so CPU prefetchers pull cache lines in advance, while node-based lists cause constant cache misses.',
          subtopic: 'Hardware Cache Locality'
        },
        {
          id: 'cpp-hard-q4',
          question: 'What is the "Rule of 5" in modern C++?',
          options: [
            'Every class must have 5 public methods',
            'If a class defines or deletes a destructor, copy constructor, or copy assignment, it should almost certainly define or delete all 5: Destructor, Copy Constructor, Copy Assignment, Move Constructor, and Move Assignment',
            'A file cannot include more than 5 header files',
            'Functions should take no more than 5 arguments'
          ],
          correctIndex: 1,
          explanation: 'The Rule of 5 dictates that managing a custom resource requires explicitly handling all copy and move operations alongside the destructor.',
          subtopic: 'Resource Management'
        },
        {
          id: 'cpp-hard-q5',
          question: 'What is the purpose of C++20 Concepts?',
          options: [
            'To interpret JavaScript in C++',
            'To specify named compile-time predicates on template parameters, replacing complex SFINAE with readable constraints and clean compiler error messages',
            'To replace the C++ preprocessor',
            'To execute templates on a separate GPU thread'
          ],
          correctIndex: 1,
          explanation: 'C++20 concepts formalize requirements on template arguments at compile time, eliminating convoluted std::enable_if boilerplate.',
          subtopic: 'C++20 Concepts'
        }
      ]
    }
  },

  // 7. KOTLIN TRACK
  {
    id: 'track-kotlin',
    name: 'Kotlin',
    slug: 'kotlin',
    icon: '🟣',
    color: 'from-violet-500 to-purple-800',
    badge: 'Modern Pragmatic',
    tagline: 'Idiomatic Null Safety, Coroutines, Flow, and Multiplatform Architecture.',
    description: 'Master modern Kotlin for JVM, Android, and Multiplatform: null safety, coroutine dispatchers, structured concurrency, and functional extensions.',
    totalModules: 8,
    estimatedHours: 16,
    videoCourse: {
      title: 'Kotlin Programming Full Course: Coroutines & KMP',
      youtubeId: 'F9UC9DY-vIU',
      instructor: 'freeCodeCamp.org',
      duration: '3h 45m',
      channel: 'freeCodeCamp.org',
      description: 'Comprehensive Kotlin guide from basic syntax and null safety to coroutines, Channels, StateFlow, and Kotlin Multiplatform.',
      chapters: [
        { title: 'Kotlin Syntax & Null Safety Basics', timestamp: '00:00', seconds: 0 },
        { title: 'Data Classes & Sealed Hierarchies', timestamp: '22:00', seconds: 1320 },
        { title: 'Functional Extensions & Higher-Order Functions', timestamp: '55:00', seconds: 3300 },
        { title: 'Coroutines & Suspend Functions', timestamp: '1:40:00', seconds: 6000 },
        { title: 'Flow & Reactive Concurrency', timestamp: '2:30:00', seconds: 9000 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Type inference, nullability (`?`), smart casts, and when expressions.',
        lessons: [
          {
            id: 'kt-scratch-1',
            title: '1. Sound Null Safety & Smart Casting',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Eliminate NullPointerExceptions at compile time using safe calls and Elvis operator.',
            concepts: ['Nullable types (T?)', 'Safe call operator (?.)', 'Elvis operator (?:)', 'Smart casting (is)'],
            starterCode: `fun getLength(str: String?): Int {
    return str?.length ?: 0
}

fun main() {
    println("Length of null: " + getLength(null))
    println("Length of 'Kotlin': " + getLength("Kotlin"))
}`,
            expectedOutput: 'Length of null: 0\nLength of \'Kotlin\': 6',
            explanation: 'Kotlin compiler strictly distinguishes nullable types from non-nullable types, catching NPEs at compile time.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Coroutines & Flow',
        description: 'Suspend functions, structured concurrency, and reactive Flow pipelines.',
        lessons: [
          {
            id: 'kt-inter-1',
            title: '1. Coroutines & Structured Concurrency',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Launch non-blocking asynchronous jobs with coroutineScope and Dispatchers.IO.',
            concepts: ['suspend keyword', 'Dispatchers.Default vs IO', 'coroutineScope builder', 'Job cancellation'],
            starterCode: `import kotlinx.coroutines.*

suspend fun fetchData(): String {
    delay(10)
    return "Data payload received"
}

fun main() = runBlocking {
    val result = fetchData()
    println(result)
}`,
            expectedOutput: 'Data payload received',
            explanation: 'Kotlin suspend functions compile into state machines using continuation-passing style (CPS) without blocking operating system threads.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Metaprogramming & KMP',
        description: 'Inlines, reified generics, custom DSLs, and Kotlin Multiplatform memory model.',
        lessons: [
          {
            id: 'kt-adv-1',
            title: '1. Inline Functions & Reified Type Parameters',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Bypass JVM type erasure using inline functions with reified generics.',
            concepts: ['inline functions', 'reified keyword', 'JVM type erasure', 'Type-safe builders DSL'],
            starterCode: `inline fun <reified T> printType(value: Any) {
    if (value is T) {
        println("Match: " + T::class.simpleName)
    } else {
        println("Mismatch")
    }
}

fun main() {
    printType<String>("Hello Kotlin")
    printType<Int>("Hello Kotlin")
}`,
            expectedOutput: 'Match: String\nMismatch',
            explanation: 'The reified modifier instructs the compiler to inline the concrete class token directly at call sites, preserving type information lost to JVM erasure.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-kotlin-hard',
      title: 'Kotlin Coroutines & Multiplatform Advanced Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'JetBrains Certified Kotlin Systems Developer',
      accreditationId: 'SL-KT-2026-COROUTINE',
      skillsCovered: ['Coroutines', 'StateFlow & SharedFlow', 'Reified Generics', 'KMP Memory Model'],
      questions: [
        {
          id: 'kt-hard-q1',
          question: 'How does the Kotlin compiler implement suspend functions under the hood on the JVM?',
          options: [
            'By spawning a new Java Thread for each suspend call',
            'By compiling the function into a state machine that accepts a Continuation parameter (Continuation-Passing Style)',
            'By wrapping all code in synchronized blocks',
            'By invoking native C++ pthread_create'
          ],
          correctIndex: 1,
          explanation: 'Kotlin transforms suspend functions into state machines with a Continuation<T> parameter that stores local variables across suspension points.',
          subtopic: 'Continuation Passing Style'
        },
        {
          id: 'kt-hard-q2',
          question: 'What is the key difference between StateFlow and SharedFlow in Kotlin Coroutines?',
          options: [
            'StateFlow is cold, whereas SharedFlow is hot',
            'StateFlow is a hot flow that always conflates values and retains the latest single state value; SharedFlow can buffer multiple emissions without conflation',
            'StateFlow only works on Android; SharedFlow is multiplatform',
            'SharedFlow requires blocking the caller thread'
          ],
          correctIndex: 1,
          explanation: 'StateFlow is always state-holding and conflated (only emits distinct updates and retains the current value), whereas SharedFlow is an event bus supporting replay buffers.',
          subtopic: 'Reactive Flows'
        }
      ]
    }
  },

  // 8. SWIFT 6 TRACK
  {
    id: 'track-swift',
    name: 'Swift 6',
    slug: 'swift',
    icon: '🦅',
    color: 'from-orange-500 to-amber-700',
    badge: 'Apple Systems',
    tagline: 'Modern Systems Safety, Actors, Async/Await, SwiftUI, and ARC.',
    description: 'Learn Swift 6 complete language specification: memory safety, strict concurrency, actor isolation, protocols, and Automatic Reference Counting.',
    totalModules: 8,
    estimatedHours: 18,
    videoCourse: {
      title: 'Swift 6 Full Course: Concurrency & Safety Masterclass',
      youtubeId: 'comQ1-x2a1Q',
      instructor: 'freeCodeCamp.org',
      duration: '3h 30m',
      channel: 'freeCodeCamp.org',
      description: 'Modern Swift from basics to Swift 6 complete data race safety, actors, protocols, generics, and SwiftUI architecture.',
      chapters: [
        { title: 'Swift Types, Optionals & Control Flow', timestamp: '00:00', seconds: 0 },
        { title: 'Structs vs Classes & Value Semantics', timestamp: '30:00', seconds: 1800 },
        { title: 'Protocols & Generics', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Swift 6 Actors & Data Race Safety', timestamp: '2:10:00', seconds: 7800 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Optionals unwrapping (`if let`, `guard let`), value semantics (structs), and enums.',
        lessons: [
          {
            id: 'swift-scratch-1',
            title: '1. Value Semantics & Optionals',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Understand copy-on-write structs, unwrapping optionals, and pattern matching.',
            concepts: ['Struct value semantics', 'Optional binding (guard let)', 'Copy-On-Write (COW)', 'Enums with associated values'],
            starterCode: `struct User {
    var name: String
    var age: Int
}

var u1 = User(name: "Taylor", age: 24)
var u2 = u1 // Value copy!
u2.name = "Jordan"

print("u1: \\(u1.name), u2: \\(u2.name)")`,
            expectedOutput: 'u1: Taylor, u2: Jordan',
            explanation: 'Swift structs possess pure value semantics; copying creates an independent instance with zero shared memory risk.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Protocols & Concurrency',
        description: 'Protocols, generics, async/await, and ARC memory leak prevention.',
        lessons: [
          {
            id: 'swift-inter-1',
            title: '1. Async/Await & Task Trees',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Cooperative thread pool execution with structured concurrency.',
            concepts: ['async / await keywords', 'Task and TaskGroup', 'Throwing async functions', 'Unowned vs weak references'],
            starterCode: `func fetchMetric() async -> Int {
    return 42
}

Task {
    let value = await fetchMetric()
    print("Metric: \\(value)")
}`,
            expectedOutput: 'Metric: 42',
            explanation: 'Swift structured concurrency executes on a cooperative thread pool, eliminating thread explosion.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Actors & Systems Safety',
        description: 'Swift 6 strict concurrency, Sendable checking, and Global Actors.',
        lessons: [
          {
            id: 'swift-adv-1',
            title: '1. Actors & Data Race Elimination',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Isolate mutable state using Swift Actors with compile-time data race checks.',
            concepts: ['actor keyword', 'Actor isolation', 'Sendable conformance', 'MainActor'],
            starterCode: `actor BankAccount {
    private var balance: Double = 1000.0

    func deposit(amount: Double) {
        balance += amount
    }

    func getBalance() -> Double {
        return balance
    }
}

Task {
    let account = BankAccount()
    await account.deposit(amount: 250.0)
    let bal = await account.getBalance()
    print("Balance: \\(bal)")
}`,
            expectedOutput: 'Balance: 1250.0',
            explanation: 'Actors synchronize access to their mutable state, preventing simultaneous thread access without manual mutex locks.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-swift-hard',
      title: 'Swift 6 Systems & Concurrency Safety Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Apple Ecosystem Certified Swift 6 Systems Architect',
      accreditationId: 'SL-SWIFT-2026-RACEFREE',
      skillsCovered: ['Actors', 'Sendable protocol', 'ARC retain cycles', 'Copy-on-Write'],
      questions: [
        {
          id: 'swift-hard-q1',
          question: 'What is the exact purpose of the Sendable protocol in Swift 6 strict concurrency?',
          options: [
            'To format objects into JSON for network transport',
            'To mark types whose values can safely be passed across concurrency boundaries without causing data races',
            'To allow inheritance from multiple classes',
            'To prevent garbage collection'
          ],
          correctIndex: 1,
          explanation: 'Sendable is a marker protocol indicating that a type is safe to share across concurrent domains (such as value types or thread-safe actors).',
          subtopic: 'Sendable Concurrency'
        }
      ]
    }
  },

  // 9. C# 12 / .NET 8 TRACK
  {
    id: 'track-csharp',
    name: 'C# 12 / .NET 8',
    slug: 'csharp',
    icon: '🟣',
    color: 'from-purple-700 to-indigo-900',
    badge: 'Enterprise Performance',
    tagline: 'Modern High-Performance .NET, LINQ, Async/Await, and Low-Allocation Structs.',
    description: 'From object-oriented foundations to Span<T>, Memory<T>, asynchronous Task pipelines, and high-throughput web APIs on ASP.NET Core.',
    totalModules: 9,
    estimatedHours: 19,
    videoCourse: {
      title: 'C# and .NET 8 Full Course: High Performance Architectures',
      youtubeId: 'gfkTfcpWqAY',
      instructor: 'freeCodeCamp.org',
      duration: '4h 05m',
      channel: 'freeCodeCamp.org',
      description: 'Master modern C# 12 features, primary constructors, collection expressions, pattern matching, async streams, and performance optimization.',
      chapters: [
        { title: 'C# Syntax & Value vs Reference Types', timestamp: '00:00', seconds: 0 },
        { title: 'LINQ & Generics Deep Dive', timestamp: '40:00', seconds: 2400 },
        { title: 'Async/Await & Task Parallel Library', timestamp: '1:30:00', seconds: 5400 },
        { title: 'Span<T> & Memory Optimization', timestamp: '2:40:00', seconds: 9600 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Value types vs reference types, nullable reference types, and pattern matching.',
        lessons: [
          {
            id: 'cs-scratch-1',
            title: '1. Types, Records & Pattern Matching',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Explore value vs reference types, immutable records, and switch expressions.',
            concepts: ['struct vs class', 'record and record struct', 'Switch expressions', 'Nullable reference types'],
            starterCode: `using System;

public record Order(int Id, string Item, decimal Price);

class Program {
    static void Main() {
        var order = new Order(101, "Laptop Stand", 49.99m);
        Console.WriteLine($"Order \{order.Id\}: \{order.Item\} (\$\{order.Price\})");
    }
}`,
            expectedOutput: 'Order 101: Laptop Stand ($49.99)',
            explanation: 'C# records provide synthesized value equality, non-destructive mutation via "with" expressions, and concise primary constructors.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate LINQ & Async',
        description: 'Asynchronous programming with Task/ValueTask and expressive LINQ queries.',
        lessons: [
          {
            id: 'cs-inter-1',
            title: '1. LINQ Pipelines & Asynchronous Tasks',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Construct zero-copy queries with LINQ and avoid deadlock with ConfigureAwait.',
            concepts: ['IEnumerable vs IQueryable', 'Deferred execution', 'Task and ValueTask', 'ConfigureAwait(false)'],
            starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var evensSquared = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .ToList();

        Console.WriteLine(string.Join(", ", evensSquared));
    }
}`,
            expectedOutput: '4, 16, 36, 64, 100',
            explanation: 'LINQ operates on lazy iterators, streaming items one by one without allocating intermediate arrays until materialization.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Systems & Memory Allocation',
        description: 'Low-allocation programming with Span<T>, Memory<T>, and GC internals.',
        lessons: [
          {
            id: 'cs-adv-1',
            title: '1. Span<T> & Zero-Allocation Slicing',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Directly slice contiguous memory on the stack without heap allocations.',
            concepts: ['ref struct and Span<T>', 'ReadOnlySpan<char>', 'Zero-allocation string parsing', 'ArrayPool<T>'],
            starterCode: `using System;

class Program {
    static void Main() {
        string date = "2026-09-15";
        ReadOnlySpan<char> span = date.AsSpan();
        ReadOnlySpan<char> year = span.Slice(0, 4);
        Console.WriteLine($"Year: {year.ToString()}");
    }
}`,
            expectedOutput: 'Year: 2026',
            explanation: 'Span<T> provides a type-safe and memory-safe representation of contiguous memory without allocating new heap strings.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-csharp-hard',
      title: 'C# 12 & .NET 8 High Performance Systems Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Microsoft Certified .NET 8 High-Performance Architect',
      accreditationId: 'SL-DOTNET-2026-PERF',
      skillsCovered: ['Span<T> & Memory<T>', 'GC Generations (Gen 0, 1, 2, LOH)', 'ValueTask', 'Memory Barrier / Volatile'],
      questions: [
        {
          id: 'cs-hard-q1',
          question: 'Why cannot Span<T> be boxed or stored as a field inside a standard class on the managed heap?',
          options: [
            'Because it exceeds 64 bytes in size',
            'Span<T> is declared as a ref struct and must reside strictly on the execution stack to prevent pointing to dead stack frames or unpinned memory',
            'Because the CLR compiler has not implemented class fields for generics',
            'It can be stored in classes if marked static'
          ],
          correctIndex: 1,
          explanation: 'Span<T> is a ref struct whose lifetime is bound to the stack frame, preventing dangling pointers to stack memory.'
        }
      ]
    }
  },

  // 10. RUBY 3 TRACK
  {
    id: 'track-ruby',
    name: 'Ruby 3',
    slug: 'ruby',
    icon: '💎',
    color: 'from-rose-600 to-red-800',
    badge: 'Developer Expressiveness',
    tagline: 'Elegant Developer Happiness, Metaprogramming, Rails, and Fiber Concurrency.',
    description: 'Master Ruby 3 from blocks and duck typing to eigenclasses, metaprogramming, method_missing, and the Fiber Scheduler.',
    totalModules: 8,
    estimatedHours: 16,
    videoCourse: {
      title: 'Ruby Programming Full Course: Modern Ruby 3',
      youtubeId: 't_ispmWmdjY',
      instructor: 'freeCodeCamp.org',
      duration: '3h 15m',
      channel: 'freeCodeCamp.org',
      description: 'Zero to expert guide in Ruby 3: blocks, procs, lambdas, object model, metaprogramming, and concurrency with Ractors and Fibers.',
      chapters: [
        { title: 'Ruby Object Orientation & Syntax', timestamp: '00:00', seconds: 0 },
        { title: 'Blocks, Procs & Lambdas', timestamp: '35:00', seconds: 2100 },
        { title: 'Metaprogramming & Eigenclasses', timestamp: '1:20:00', seconds: 4800 },
        { title: 'Ruby 3 Fibers & Ractors', timestamp: '2:15:00', seconds: 8100 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Pure object-orientation, dynamic typing, blocks, and symbols.',
        lessons: [
          {
            id: 'rb-scratch-1',
            title: '1. Everything is an Object & Blocks',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Understand block iteration (yield), open classes, and symbols.',
            concepts: ['Everything is an Object', 'Blocks and yield', 'Symbols vs Strings', 'Enumerable module'],
            starterCode: `def with_timing
  puts "Starting process..."
  yield if block_given?
  puts "Process finished."
end

with_timing do
  puts "Executing task inside block!"
end`,
            expectedOutput: 'Starting process...\nExecuting task inside block!\nProcess finished.',
            explanation: 'In Ruby, blocks are lightweight closures passed implicitly to methods and invoked with the "yield" keyword.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Object Model',
        description: 'Modules, mixins, procs vs lambdas, and method resolution order (MRO).',
        lessons: [
          {
            id: 'rb-inter-1',
            title: '1. Modules, Mixins & Ancestors Chain',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Compose behavior using include, prepend, and extend.',
            concepts: ['include vs prepend', 'Ancestors chain', 'Procs vs Lambdas', 'Method lookup'],
            starterCode: `module Loggable
  def log(msg)
    puts "[LOG] #{msg}"
  end
end

class Service
  include Loggable
end

Service.new.log("Service operational")`,
            expectedOutput: '[LOG] Service operational',
            explanation: 'Ruby mixins inject modules into the class ancestor hierarchy, enabling modular trait composition without multiple inheritance.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Metaprogramming & Ractors',
        description: 'Eigenclasses, define_method, method_missing, and thread-safe Ractors.',
        lessons: [
          {
            id: 'rb-adv-1',
            title: '1. Metaprogramming & Dynamic Dispatch',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Dynamically define methods and intercept calls at runtime.',
            concepts: ['define_method', 'method_missing & respond_to_missing?', 'Eigenclass (singleton class)', 'Ractor concurrency'],
            starterCode: `class APIClient
  %w[get post delete].each do |verb|
    define_method(verb) do |endpoint|
      "#{verb.upcase} request dispatched to #{endpoint}"
    end
  end
end

client = APIClient.new
puts client.get("/users")
puts client.post("/auth")`,
            expectedOutput: 'GET request dispatched to /users\nPOST request dispatched to /auth',
            explanation: 'define_method constructs instance methods dynamically at runtime, a cornerstone of Rails DSLs.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-ruby-hard',
      title: 'Ruby 3 Metaprogramming & Concurrency Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Ruby Association Certified Master Engineer',
      accreditationId: 'SL-RUBY-2026-METAPROG',
      skillsCovered: ['Eigenclass', 'Ractors & GVL', 'Fiber Scheduler', 'method_missing'],
      questions: [
        {
          id: 'rb-hard-q1',
          question: 'What is a Ractor in Ruby 3, and how does it bypass the Global VM Lock (GVL)?',
          options: [
            'A Ractor is a thread with no memory',
            'Ractor (Ruby Actor) is an actor-model concurrency primitive that isolates memory heaps, allowing truly parallel multi-core execution without GVL contention',
            'A C extension for database queries',
            'A tool for compiling Ruby to bytecode'
          ],
          correctIndex: 1,
          explanation: 'Ractors communicate via message passing and share no mutable state, enabling multi-core execution free of the GVL.'
        }
      ]
    }
  },

  // 11. PHP 8.3 TRACK
  {
    id: 'track-php',
    name: 'PHP 8.3',
    slug: 'php',
    icon: '🐘',
    color: 'from-indigo-600 to-blue-800',
    badge: 'Modern Web Backend',
    tagline: 'Strictly-Typed Web Engineering, Fibers, Attributes, and High-Throughput APIs.',
    description: 'Master modern PHP 8.3+: strict typing, match expressions, constructor property promotion, Fibers for async I/O, and JIT compilation.',
    totalModules: 8,
    estimatedHours: 15,
    videoCourse: {
      title: 'Modern PHP 8.3 Full Course: Clean Architecture',
      youtubeId: 'BUCiSSyIGGU',
      instructor: 'freeCodeCamp.org',
      duration: '3h 30m',
      channel: 'freeCodeCamp.org',
      description: 'From zero to modern PHP 8.3 engineering: strict types, attributes, fibers, PDO, dependency injection, and clean architecture.',
      chapters: [
        { title: 'PHP 8 Types & Constructor Promotion', timestamp: '00:00', seconds: 0 },
        { title: 'Match Expressions & Nullsafe Operator', timestamp: '30:00', seconds: 1800 },
        { title: 'PDO Database & Dependency Injection', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Fibers & Asynchronous I/O in PHP 8', timestamp: '2:15:00', seconds: 8100 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Strict types (`declare(strict_types=1)`), typed properties, and match expressions.',
        lessons: [
          {
            id: 'php-scratch-1',
            title: '1. Strict Typing & Constructor Promotion',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Modern constructor property promotion and typed return values.',
            concepts: ['declare(strict_types=1)', 'Constructor property promotion', 'Match expression', 'Nullsafe operator (?->)'],
            starterCode: `<?php
declare(strict_types=1);

class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $role = 'student'
    ) {}
}

$user = new User(101, 'Elena Vance');
echo "User: " . $user->name . " [" . $user->role . "]";`,
            expectedOutput: 'User: Elena Vance [student]',
            explanation: 'Constructor property promotion in PHP 8 combines field declaration, parameter definition, and assignment in a single concise signature.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Attributes & Design Patterns',
        description: 'Attributes (annotations), dependency injection, and PDO prepared statements.',
        lessons: [
          {
            id: 'php-inter-1',
            title: '1. PHP Attributes & Reflection',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Native metadata decoration with compile-time reflection.',
            concepts: ['#[Attribute]', 'Reflection API', 'Dependency Injection container', 'PDO Security'],
            starterCode: `<?php
#[Attribute]
class Route {
    public function __construct(public string $path) {}
}

class ApiController {
    #[Route('/api/status')]
    public function status(): string {
        return "OK";
    }
}

echo "Attribute registered successfully";`,
            expectedOutput: 'Attribute registered successfully',
            explanation: 'PHP 8 native attributes provide structured, machine-readable metadata natively parsed by the engine without docblock regex parsing.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Fibers & High-Throughput Engines',
        description: 'PHP Fibers, OPcache JIT internals, and asynchronous event loops.',
        lessons: [
          {
            id: 'php-adv-1',
            title: '1. Fibers & Coroutine Concurrency',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Suspendable execution stacks for non-blocking asynchronous PHP frameworks.',
            concepts: ['Fiber class', 'Fiber::suspend() and resume()', 'Event loops in PHP (Revolt/Amp)', 'OPcache JIT'],
            starterCode: `<?php
$fiber = new Fiber(function (): void {
    echo "Fiber started\\n";
    $value = Fiber::suspend('paused');
    echo "Fiber resumed with: $value\\n";
});

$status = $fiber->start();
echo "Main thread saw: $status\\n";
$fiber->resume('continue');`,
            expectedOutput: "Fiber started\nMain thread saw: paused\nFiber resumed with: continue",
            explanation: 'Fibers allow full-stack coroutines in PHP, empowering asynchronous web servers like FrankenPHP and Swoole.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-php-hard',
      title: 'PHP 8.3 Enterprise Architecture & High-Performance Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Zend / PHP Foundation Certified Architect',
      accreditationId: 'SL-PHP-2026-FIBER',
      skillsCovered: ['Fibers', 'OPcache JIT', 'Strict Typing', 'Memory Limits & Garbage Collection'],
      questions: [
        {
          id: 'php-hard-q1',
          question: 'How does PHP 8.3 JIT (Just-In-Time) compilation optimize execution compared to traditional OPcache?',
          options: [
            'It translates PHP directly into HTML',
            'Traditional OPcache stores Zend bytecode in shared memory; JIT translates hot bytecode sections directly into native x86/ARM machine code at runtime',
            'It runs PHP in the browser',
            'It disables garbage collection'
          ],
          correctIndex: 1,
          explanation: 'The PHP JIT compiler analyzes CPU-intensive hot loops in Zend bytecode and compiles them directly into native machine instructions.'
        }
      ]
    }
  },

  // 12. ADVANCED SQL & POSTGRESQL TRACK
  {
    id: 'track-sql',
    name: 'Advanced SQL & PostgreSQL',
    slug: 'sql',
    icon: '🗄️',
    color: 'from-cyan-600 to-blue-900',
    badge: 'Database Core',
    tagline: 'Relational Theory, Window Functions, CTEs, Query Planning, and ACID Isolation.',
    description: 'Master advanced SQL and PostgreSQL: window functions, recursive CTEs, indexing strategies (B-Tree, GIN, BRIN), EXPLAIN ANALYZE, and MVCC internals.',
    totalModules: 8,
    estimatedHours: 17,
    videoCourse: {
      title: 'PostgreSQL Database Engineering Full Masterclass',
      youtubeId: 'qw--VYLpxG4',
      instructor: 'freeCodeCamp.org',
      duration: '4h 10m',
      channel: 'freeCodeCamp.org',
      description: 'Comprehensive relational engineering: normal forms, complex JOINs, window functions, CTEs, query optimization, indexing, and MVCC.',
      chapters: [
        { title: 'Relational Algebra & Normalization', timestamp: '00:00', seconds: 0 },
        { title: 'Advanced JOINs & Aggregations', timestamp: '45:00', seconds: 2700 },
        { title: 'Window Functions (RANK, LAG, LEAD)', timestamp: '1:30:00', seconds: 5400 },
        { title: 'Recursive CTEs & Hierarchical Data', timestamp: '2:15:00', seconds: 8100 },
        { title: 'EXPLAIN ANALYZE & Indexing Internals', timestamp: '3:05:00', seconds: 11100 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Relational schema design, SELECT, complex JOINs, GROUP BY, and subqueries.',
        lessons: [
          {
            id: 'sql-scratch-1',
            title: '1. Relational Joins & Set Aggregations',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Master INNER, LEFT, FULL OUTER joins, and GROUP BY with HAVING filters.',
            concepts: ['INNER vs OUTER JOIN', 'GROUP BY & aggregate functions', 'HAVING vs WHERE', 'Foreign key constraints'],
            starterCode: `-- Query to find total revenue per product category
SELECT 
    p.category,
    COUNT(o.id) AS total_orders,
    SUM(o.amount) AS total_revenue
FROM orders o
INNER JOIN products p ON o.product_id = p.id
GROUP BY p.category
HAVING SUM(o.amount) > 1000
ORDER BY total_revenue DESC;`,
            expectedOutput: 'category | total_orders | total_revenue\nElectronics | 42 | 15890.00',
            explanation: 'WHERE filters rows before aggregation; HAVING filters aggregated groups after the GROUP BY calculation.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Window Functions & CTEs',
        description: 'Window functions (ROW_NUMBER, DENSE_RANK, LAG, LEAD) and Common Table Expressions.',
        lessons: [
          {
            id: 'sql-inter-1',
            title: '1. Window Functions & Partitioning',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Calculate running totals, rankings, and moving averages without group collapses.',
            concepts: ['OVER (PARTITION BY ... ORDER BY ...)', 'ROW_NUMBER vs RANK vs DENSE_RANK', 'LAG and LEAD offsets', 'Running sum frames'],
            starterCode: `SELECT 
    employee_id,
    department,
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
    LAG(salary, 1) OVER (PARTITION BY department ORDER BY salary DESC) as prev_higher_salary
FROM employees;`,
            expectedOutput: '101 | Engineering | 145000 | 1 | NULL\n102 | Engineering | 130000 | 2 | 145000',
            explanation: 'Window functions compute aggregate calculations across a set of table rows while retaining each individual row identity.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Optimization & MVCC',
        description: 'Query planning with EXPLAIN ANALYZE, B-Tree/GIN indexes, and WAL concurrency.',
        lessons: [
          {
            id: 'sql-adv-1',
            title: '1. EXPLAIN ANALYZE & Index Selection',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Diagnose sequential scans, bitmap index scans, and hash joins in the query planner.',
            concepts: ['EXPLAIN (ANALYZE, BUFFERS)', 'B-Tree vs GIN vs BRIN', 'Index-Only Scans', 'PostgreSQL MVCC & VACUUM'],
            starterCode: `EXPLAIN (ANALYZE, BUFFERS)
SELECT u.email, count(t.id)
FROM users u
JOIN transactions t ON u.id = t.user_id
WHERE t.created_at >= '2026-01-01'
GROUP BY u.email;`,
            expectedOutput: 'Hash Join (cost=214.30..845.20 rows=520)\n  Index Scan using idx_tx_created on transactions',
            explanation: 'EXPLAIN ANALYZE actually runs the query, showing real execution time, buffer cache hits, and chosen join algorithms.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-sql-hard',
      title: 'Advanced SQL & PostgreSQL Database Internals Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'PostgreSQL Certified Principal Database Architect',
      accreditationId: 'SL-POSTGRES-2026-MVCC',
      skillsCovered: ['MVCC & Dead Tuples', 'Serializable Snapshot Isolation', 'B-Tree vs GIN', 'Query Costing'],
      questions: [
        {
          id: 'sql-hard-q1',
          question: 'How does PostgreSQL Multi-Version Concurrency Control (MVCC) ensure that readers never block writers and writers never block readers?',
          options: [
            'By placing an exclusive table lock on every SELECT query',
            'By tagging rows with xmin/xmax transaction IDs so each transaction sees a consistent snapshot of data without needing shared read locks',
            'By writing all data directly to an in-memory cache and discarding the disk engine',
            'By disallowing concurrent queries altogether'
          ],
          correctIndex: 1,
          explanation: 'PostgreSQL MVCC tags every row version with xmin (creating transaction) and xmax (deleting/updating transaction), permitting readers to observe valid past versions without locks.',
          subtopic: 'MVCC Architecture'
        }
      ]
    }
  },

  // 13. R FOR DATA SCIENCE TRACK
  {
    id: 'track-r',
    name: 'R for Data Science',
    slug: 'r',
    icon: '📊',
    color: 'from-blue-600 to-slate-800',
    badge: 'Data & Statistics',
    tagline: 'Vectorized Computation, Data Wrangling with Tidyverse, Statistical Inference, and ggplot2.',
    description: 'Master R programming: vectorized arithmetic, data.table, dplyr pipelines, statistical hypothesis testing, and grammar-of-graphics data visualization.',
    totalModules: 8,
    estimatedHours: 15,
    videoCourse: {
      title: 'R Programming for Data Science & Statistics',
      youtubeId: '_V8eKsto3Ug',
      instructor: 'freeCodeCamp.org',
      duration: '3h 10m',
      channel: 'freeCodeCamp.org',
      description: 'End-to-end R course: vector operations, dataframes, tidyverse, data wrangling with dplyr, statistical modeling, and ggplot2.',
      chapters: [
        { title: 'R Primitives & Vectorized Math', timestamp: '00:00', seconds: 0 },
        { title: 'Matrices, Factors & DataFrames', timestamp: '30:00', seconds: 1800 },
        { title: 'Data Wrangling with Dplyr & Tidyverse', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Grammar of Graphics with Ggplot2', timestamp: '2:10:00', seconds: 7800 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Vectorized computing, factors, matrices, and indexing.',
        lessons: [
          {
            id: 'r-scratch-1',
            title: '1. Vectorization & DataFrame Indexing',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Harness vectorized arithmetic and boolean masking in R.',
            concepts: ['Vectors (c())', 'Recycling rule', 'DataFrames', 'Vectorized math'],
            starterCode: `# Vectorized operations without loops
scores <- c(85, 92, 78, 96, 64)
curved <- scores + 5
top_students <- scores[scores >= 90]

print(paste("Curved scores:", paste(curved, collapse = ", ")))
print(paste("Scores >= 90:", paste(top_students, collapse = ", ")))`,
            expectedOutput: '[1] "Curved scores: 90, 97, 83, 101, 69"\n[1] "Scores >= 90: 92, 96"',
            explanation: 'R is fundamentally vectorized: operations like + 5 automatically broadcast across entire arrays at native C speed.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Tidyverse & Modeling',
        description: 'Tidyverse pipelines (`%>%`), dplyr operations, and linear regression.',
        lessons: [
          {
            id: 'r-inter-1',
            title: '1. Dplyr Pipelines & Statistical Modeling',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Filter, mutate, summarize, and fit linear models with lm().',
            concepts: ['Pipes (%>%)', 'group_by and summarize', 'Linear model (lm)', 'broom tidy summary'],
            starterCode: `library(dplyr)

df <- data.frame(
  group = c("A", "A", "B", "B", "C"),
  val = c(10, 20, 15, 25, 30)
)

summary_stats <- df %>%
  group_by(group) %>%
  summarize(mean_val = mean(val))

print(summary_stats)`,
            expectedOutput: 'group mean_val\nA 15\nB 20\nC 30',
            explanation: 'The tidyverse pipe chains data transformations in readable left-to-right pipelines.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Systems & Rcpp',
        description: 'S3/S4 object systems, memory profiling, and high-speed C++ binding with Rcpp.',
        lessons: [
          {
            id: 'r-adv-1',
            title: '1. C++ Acceleration with Rcpp & Memory Profiling',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Accelerate tight loops by embedding compiled C++ functions directly into R.',
            concepts: ['Rcpp integration', 'S3 vs S4 classes', 'Non-standard evaluation', 'pryr memory tracking'],
            starterCode: `library(Rcpp)

cppFunction('
  NumericVector squareVector(NumericVector x) {
    int n = x.size();
    NumericVector res(n);
    for(int i = 0; i < n; ++i) {
      res[i] = x[i] * x[i];
    }
    return res;
  }
')

res <- squareVector(c(2, 4, 6))
print(res)`,
            expectedOutput: '[1] 4 16 36',
            explanation: 'Rcpp seamlessly bridges R objects with high-performance C++ arrays, bypassing interpreter overhead for heavy statistical algorithms.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-r-hard',
      title: 'R Statistical Computing & Tidyverse Master Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Certified R Data Science & Statistical Computing Specialist',
      accreditationId: 'SL-R-2026-STAT',
      skillsCovered: ['Vectorization', 'Rcpp integration', 'Non-standard evaluation', 'S3/S4 Object Systems'],
      questions: [
        {
          id: 'r-hard-q1',
          question: 'What is Non-Standard Evaluation (NSE) in R, and why does tidyverse heavily leverage it?',
          options: [
            'It is a syntax error caused by missing commas',
            'NSE delays expression evaluation and captures code as abstract syntax trees (quosures), allowing users to reference column names directly as bare symbols without quotes',
            'It runs R code inside a sandbox',
            'It disables vectorization'
          ],
          correctIndex: 1,
          explanation: 'Non-Standard Evaluation captures expressions as ASTs using rlang/tidyeval, allowing clean syntax like select(age, salary) instead of df[["age"]].'
        }
      ]
    }
  },

  // 14. DART & FLUTTER TRACK
  {
    id: 'track-dart',
    name: 'Dart & Flutter',
    slug: 'dart',
    icon: '🎯',
    color: 'from-sky-500 to-cyan-800',
    badge: 'Cross-Platform Client',
    tagline: 'Client Engineering, Event Loop, Isolates, and Declarative UI.',
    description: 'Learn Dart 3: sound null safety, class modifiers, patterns, Futures, Streams, Isolates, and high-performance reactive client applications.',
    totalModules: 8,
    estimatedHours: 16,
    videoCourse: {
      title: 'Dart 3 & Flutter Complete Engineering Bootcamp',
      youtubeId: 'Ej_Pcr4uC2Q',
      instructor: 'freeCodeCamp.org',
      duration: '3h 40m',
      channel: 'freeCodeCamp.org',
      description: 'Master Dart 3 language essentials, sound null safety, async/await, streams, Isolates for multi-threading, and reactive state management.',
      chapters: [
        { title: 'Dart 3 Types & Null Safety', timestamp: '00:00', seconds: 0 },
        { title: 'Class Modifiers & Patterns', timestamp: '30:00', seconds: 1800 },
        { title: 'Asynchronous Programming (Futures & Streams)', timestamp: '1:15:00', seconds: 4500 },
        { title: 'Dart Isolates & Concurrency', timestamp: '2:15:00', seconds: 8100 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Sound null safety, records, patterns, and object constructors.',
        lessons: [
          {
            id: 'dart-scratch-1',
            title: '1. Sound Null Safety & Modern Records',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Explore Dart 3 records, pattern destructuring, and compile-time null safety.',
            concepts: ['Sound Null Safety', 'Dart 3 Records', 'Pattern Matching', 'Named parameters with required'],
            starterCode: `(int, String) getUser() {
  return (101, "Marcus");
}

void main() {
  var (id, name) = getUser();
  print("User ID: $id, Name: $name");
}`,
            expectedOutput: 'User ID: 101, Name: Marcus',
            explanation: 'Dart 3 introduces anonymous, immutable aggregate records with pattern destructuring support.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Futures & Streams',
        description: 'Event loop architecture, microtasks, Futures, and reactive Streams.',
        lessons: [
          {
            id: 'dart-inter-1',
            title: '1. Event Loop, Futures & Async Streams',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Understand the Dart event loop queue hierarchy and async* generators.',
            concepts: ['Microtask Queue vs Event Queue', 'Future and async/await', 'StreamController and Stream', 'async* generators'],
            starterCode: `Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    yield i;
  }
}

void main() async {
  await for (final num in countStream(3)) {
    print("Stream emitted: $num");
  }
}`,
            expectedOutput: 'Stream emitted: 1\nStream emitted: 2\nStream emitted: 3',
            explanation: 'async* generates asynchronous streams that deliver items incrementally over time without blocking the UI rendering cycle.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Isolates & FFI',
        description: 'True multi-threading with Dart Isolates, SendPort/ReceivePort, and Native C FFI.',
        lessons: [
          {
            id: 'dart-adv-1',
            title: '1. Isolates & Parallel Actor Concurrency',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Execute CPU-heavy computation on separate native threads with isolated memory.',
            concepts: ['Isolate.spawn()', 'SendPort and ReceivePort', 'Isolate.run() helper', 'Dart FFI native calls'],
            starterCode: `import 'dart:isolate';

int heavyComputation(int n) {
  return n * n;
}

void main() async {
  final result = await Isolate.run(() => heavyComputation(25));
  print("Isolate computed: $result");
}`,
            expectedOutput: 'Isolate computed: 625',
            explanation: 'Dart Isolates each have their own private heap memory and event loop, ensuring zero shared-state data races.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-dart-hard',
      title: 'Dart 3 & Flutter Systems Architecture Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'Google Certified Dart 3 & Flutter Core Architect',
      accreditationId: 'SL-DART-2026-ISOLATE',
      skillsCovered: ['Event Loop & Microtask Queue', 'Isolates', 'Class Modifiers (base, interface, final)', 'Sound Null Safety'],
      questions: [
        {
          id: 'dart-hard-q1',
          question: 'In the Dart runtime event loop, which queue has strict priority over the regular Event Queue?',
          options: [
            'Garbage Collector Queue',
            'Microtask Queue',
            'Socket Buffer Queue',
            'Renderer Queue'
          ],
          correctIndex: 1,
          explanation: 'The Microtask Queue is always processed completely before the event loop pulls the next item from the Event Queue.'
        }
      ]
    }
  },

  // 15. SCALA 3 TRACK
  {
    id: 'track-scala',
    name: 'Scala 3',
    slug: 'scala',
    icon: '🔴',
    color: 'from-red-600 to-rose-900',
    badge: 'Pure Functional + OOP',
    tagline: 'Pure Functional Programming meets Object-Oriented Power with Advanced Type Systems.',
    description: 'Master Scala 3: immutability, pattern matching, given/using contextual abstractions, union & intersection types, and Akka/Pekko actor concurrency.',
    totalModules: 8,
    estimatedHours: 19,
    videoCourse: {
      title: 'Scala 3 Full Course: Functional Programming on the JVM',
      youtubeId: '30UnnfnK4f8',
      instructor: 'freeCodeCamp.org',
      duration: '4h 00m',
      channel: 'freeCodeCamp.org',
      description: 'Zero to expert in Scala 3: functional paradigms, typeclasses with givens, match types, higher-kinded types, and concurrency.',
      chapters: [
        { title: 'Scala 3 New Syntax & Val/Def', timestamp: '00:00', seconds: 0 },
        { title: 'Case Classes & Algebraic Data Types', timestamp: '35:00', seconds: 2100 },
        { title: 'Contextual Abstractions (Given & Using)', timestamp: '1:30:00', seconds: 5400 },
        { title: 'Union Types & Advanced Type System', timestamp: '2:40:00', seconds: 9600 }
      ]
    },
    levels: [
      {
        level: 'scratch',
        title: 'Tier 1: Scratch to Foundations',
        description: 'Significant indentation syntax, immutability, case classes, and enums.',
        lessons: [
          {
            id: 'scala-scratch-1',
            title: '1. Immutability, Case Classes & Enums',
            level: 'scratch',
            durationMinutes: 20,
            summary: 'Explore Scala 3 clean indentation syntax and algebraic data types.',
            concepts: ['Significant indentation', 'case class and copy', 'Scala 3 enums', 'Pattern matching with guards'],
            starterCode: `enum Status:
  case Pending
  case Active(userId: Int)
  case Suspended(reason: String)

def check(s: Status): String = s match
  case Status.Pending => "Awaiting verification"
  case Status.Active(id) => s"User $id is active"
  case Status.Suspended(r) => s"Blocked: $r"

@main def run() =
  println(check(Status.Active(42)))`,
            expectedOutput: 'User 42 is active',
            explanation: 'Scala 3 enums replace verbose sealed trait hierarchies with a clean, concise algebraic data type syntax.'
          }
        ]
      },
      {
        level: 'intermediate',
        title: 'Tier 2: Intermediate Contextual Abstractions',
        description: 'Typeclasses, given instances, using clauses, and extension methods.',
        lessons: [
          {
            id: 'scala-inter-1',
            title: '1. Contextual Abstractions (Givens & Usings)',
            level: 'intermediate',
            durationMinutes: 30,
            summary: 'Modern Scala 3 typeclasses replacing implicit declarations with given/using.',
            concepts: ['given instances', 'using clauses', 'Extension methods', 'Typeclasses'],
            starterCode: `trait Show[A]:
  def show(a: A): String

given Show[Int] with
  def show(a: Int): String = s"IntVal: $a"

def render[A](value: A)(using s: Show[A]): String =
  s.show(value)

@main def run() =
  println(render(100))`,
            expectedOutput: 'IntVal: 100',
            explanation: 'Scala 3 givens and usings provide principled contextual resolution without the ambiguities of legacy implicit defs.'
          }
        ]
      },
      {
        level: 'advanced',
        title: 'Tier 3: Advanced Type Systems & Concurrency',
        description: 'Union & Intersection types, Variance annotations (+T, -T), and Actor concurrency.',
        lessons: [
          {
            id: 'scala-adv-1',
            title: '1. Union, Intersection & Match Types',
            level: 'advanced',
            durationMinutes: 35,
            summary: 'Harness the most sophisticated type system on the JVM.',
            concepts: ['Union types (A | B)', 'Intersection types (A & B)', 'Match types', 'Covariance (+T) vs Contravariance (-T)'],
            starterCode: `type Result = String | Int

def printResult(r: Result): String = r match
  case s: String => s"Text: $s"
  case i: Int => s"Numeric: $i"

@main def run() =
  println(printResult("Success"))
  println(printResult(200))`,
            expectedOutput: 'Text: Success\nNumeric: 200',
            explanation: 'Scala 3 native union types (A | B) allow flexible type expressions without requiring wrapper Either or sealed hierarchies.'
          }
        ]
      }
    ],
    finalAssessment: {
      id: 'exam-scala-hard',
      title: 'Scala 3 Functional Systems & Type Theory Final Assessment',
      durationMinutes: 45,
      passScorePercentage: 80,
      badgeReward: 'EPFL / Lightbend Certified Scala 3 Core Architect',
      accreditationId: 'SL-SCALA-2026-DOTTY',
      skillsCovered: ['Givens & Using clauses', 'Variance (+T / -T)', 'Match Types', 'Akka/Pekko Actor Model'],
      questions: [
        {
          id: 'scala-hard-q1',
          question: 'In Scala 3 type theory, what does covariance (+T) on a generic class Container[+T] guarantee?',
          options: [
            'Container[T] cannot be instantiated',
            'If Dog is a subtype of Animal, then Container[Dog] is safely treated as a subtype of Container[Animal]',
            'Container[T] only accepts primitive types',
            'Container[T] is mutable'
          ],
          correctIndex: 1,
          explanation: 'Covariance (+T) preserves the subtyping direction: Container[Sub] is a valid subtype of Container[Super].'
        }
      ]
    }
  }
];
