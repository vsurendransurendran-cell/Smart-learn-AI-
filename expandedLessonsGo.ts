import { CodeLesson } from '../types';

export const EXPANDED_GO_LESSONS: CodeLesson[] = [
  {
    id: 'go-exp-1',
    title: 'Context Propagation: WithCancel, WithTimeout & Values',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Coordinate request cancellation, deadlines, and trace IDs across distributed microservices using context.Context.',
    concepts: ['context.Background() vs context.TODO()', 'context.WithTimeout cancellation cascades', 'ctx.Done() channel select', 'Context value safety with private keys'],
    starterCode: `package main

import (
	"context"
	"fmt"
	"time"
)

func processRequest(ctx context.Context) {
	select {
	case <-time.After(10 * time.Millisecond):
		fmt.Println("Request completed successfully")
	case <-ctx.Done():
		fmt.Println("Request cancelled:", ctx.Err())
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel() // Good practice to release resources

	processRequest(ctx)
}`,
    expectedOutput: 'Request completed successfully',
    explanation: 'Go context propagates cancellation signals down the call tree, preventing abandoned backend requests from wasting server memory and CPU.',
    bugChallenge: {
      title: 'Missing defer cancel() Resource Leak',
      description: 'Failing to invoke the cancel function returned by context.WithTimeout leaks timers until the timeout expires.',
      buggyCode: `ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)\n// BUG: cancel is ignored, leaking context timer goroutine!`,
      solutionCode: `ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)\ndefer cancel()`,
      hint: 'Always defer the cancel function returned by WithTimeout or WithCancel.',
      bugExplanation: 'The internal timer attached to WithTimeout continues running unless explicitly terminated via cancel().'
    }
  },
  {
    id: 'go-exp-2',
    title: 'Buffered vs Unbuffered Channels & Deadlock Prevention',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Understand CSP synchronization: unbuffered rendezvous handoffs versus buffered asynchronous message queues.',
    concepts: ['make(chan T) rendezvous semantics', 'make(chan T, capacity) asynchronous queues', 'Fatal error: all goroutines are asleep (deadlock)', 'len() and cap() on channels'],
    starterCode: `package main

import "fmt"

func main() {
	// Buffered channel holding up to 2 items without blocking sender
	ch := make(chan string, 2)
	ch <- "Message A"
	ch <- "Message B"

	fmt.Printf("Channel buffer usage: %d/%d\\n", len(ch), cap(ch))
	fmt.Println("Received:", <-ch)
	fmt.Println("Received:", <-ch)
}`,
    expectedOutput: 'Channel buffer usage: 2/2\nReceived: Message A\nReceived: Message B',
    explanation: 'Sending on an unbuffered channel blocks until another goroutine receives from it. Buffered channels only block when their capacity is saturated.',
    bugChallenge: {
      title: 'Unbuffered Send on Single Goroutine Deadlock Bug',
      description: 'Sending into an unbuffered channel on the main thread without a concurrent receiver triggers an immediate runtime deadlock.',
      buggyCode: `ch := make(chan int)\nch <- 42 // BUG: Deadlock! Sender blocks forever waiting for receiver.\nfmt.Println(<-ch)`,
      solutionCode: `ch := make(chan int, 1)\nch <- 42 // Buffered channel accepts 1 value without blocking\nfmt.Println(<-ch)`,
      hint: 'Provide a buffer capacity or spawn a goroutine to read from the channel.',
      bugExplanation: 'An unbuffered channel requires both sender and receiver to be ready at the same instant.'
    }
  },
  {
    id: 'go-exp-3',
    title: 'Sync.WaitGroup & ErrGroup for Concurrent Worker Pools',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Coordinate worker pools and aggregate errors across dozens of goroutines using sync.WaitGroup and errgroup.Group.',
    concepts: ['sync.WaitGroup Add, Done, Wait', 'Passing wg by pointer', 'errgroup.Group first-error propagation', 'Graceful shutdown coordination'],
    starterCode: `package main

import (
	"fmt"
	"sync"
)

func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("Worker %d completed work\\n", id)
}

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go worker(i, &wg)
	}

	wg.Wait()
	fmt.Println("All workers finished executing")
}`,
    expectedOutput: 'Worker 1 completed work\nWorker 2 completed work\nWorker 3 completed work\nAll workers finished executing',
    explanation: 'sync.WaitGroup provides counter-based synchronization, blocking `wg.Wait()` until all worker goroutines invoke `wg.Done()`.',
    bugChallenge: {
      title: 'Passing sync.WaitGroup by Value Bug',
      description: 'Passing a WaitGroup by value copies its internal state; workers modify a local copy, causing wg.Wait() to deadlock.',
      buggyCode: `func worker(id int, wg sync.WaitGroup) { // BUG: wg is passed by value!\n    defer wg.Done()\n}`,
      solutionCode: `func worker(id int, wg *sync.WaitGroup) {\n    defer wg.Done()\n}`,
      hint: 'Pass the pointer `*sync.WaitGroup`.',
      bugExplanation: 'Sync primitives must never be copied after first use because they rely on internal mutexes and counters.'
    }
  },
  {
    id: 'go-exp-4',
    title: 'Select Statement with Default for Non-Blocking Operations',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Use select with a default branch to poll channels or drop packets without blocking worker threads.',
    concepts: ['Multi-channel select multiplexing', 'Non-blocking read/write via default clause', 'Channel timeouts with time.After', 'Random branch selection on simultaneous readiness'],
    starterCode: `package main

import "fmt"

func main() {
	messages := make(chan string, 1)

	// Non-blocking try-receive
	select {
	case msg := <-messages:
		fmt.Println("Received:", msg)
	default:
		fmt.Println("No message available immediately; continuing execution")
	}

	messages <- "Urgent Alert"

	select {
	case msg := <-messages:
		fmt.Println("Second try received:", msg)
	default:
		fmt.Println("Still nothing")
	}
}`,
    expectedOutput: 'No message available immediately; continuing execution\nSecond try received: Urgent Alert',
    explanation: 'A select statement blocks until one of its cases can proceed. When a default clause is present, it executes immediately if no channel is ready.',
    bugChallenge: {
      title: 'Infinite Busy-Wait Loop in Select with Default',
      description: 'Placing a select with a default inside an unthrottled for-loop burns 100% CPU on that core.',
      buggyCode: `for {\n    select {\n    case msg := <-ch: process(msg)\n    default: // BUG: spins CPU at 100%!\n    }\n}`,
      solutionCode: `for msg := range ch {\n    process(msg)\n}`,
      hint: 'Range over the channel or use blocking select without default when waiting.',
      bugExplanation: 'A non-blocking select in an unbounded loop continuously polls, consuming full processor capacity.'
    }
  },
  {
    id: 'go-exp-5',
    title: 'Go 1.18+ Generics: Type Parameters & Constraints',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Write type-safe data structures like stacks, maps, and generic slices without resorting to interface{}.',
    concepts: ['[T any] type parameter syntax', 'comparable constraint for map keys', 'Custom type sets with ~ operator', 'Generic slice algorithms (Filter, Map)'],
    starterCode: `package main

import "fmt"

// Generic Map function operating on any slice type
func MapSlice[T any, R any](input []T, transform func(T) R) []R {
	result := make([]R, len(input))
	for i, val := range input {
		result[i] = transform(val)
	}
	return result
}

func main() {
	nums := []int{1, 2, 3, 4}
	squared := MapSlice(nums, func(n int) int { return n * n })
	fmt.Println("Squared items:", squared)

	words := []string{"go", "lang"}
	lengths := MapSlice(words, func(s string) int { return len(s) })
	fmt.Println("Word lengths:", lengths)
}`,
    expectedOutput: 'Squared items: [1 4 9 16]\nWord lengths: [2 4]',
    explanation: 'Go generics provide compile-time type safety and allow the compiler to optimize machine code without boxing values into interface pointers.',
    bugChallenge: {
      title: 'Using any as Map Key Constraint Bug',
      description: 'Using `any` as the constraint for a map key produces a compiler error because maps require equality comparison.',
      buggyCode: `func MakeMap[K any, V any]() map[K]V { // BUG: K is not comparable!\n    return make(map[K]V)\n}`,
      solutionCode: `func MakeMap[K comparable, V any]() map[K]V {\n    return make(map[K]V)\n}`,
      hint: 'Constrain the key parameter K to `comparable`.',
      bugExplanation: 'Map keys must support the == and != operators, represented by the built-in `comparable` constraint.'
    }
  },
  {
    id: 'go-exp-6',
    title: 'sync.Mutex & sync.RWMutex: Guarding Critical Sections',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Prevent data races when accessing shared structs using mutual exclusion locks.',
    concepts: ['sync.Mutex Lock & Unlock', 'defer mu.Unlock() pattern', 'sync.RWMutex (RLock for multiple readers)', 'Data race detector (-race flag)'],
    starterCode: `package main

import (
	"fmt"
	"sync"
)

type SafeCounter struct {
	mu    sync.RWMutex
	count map[string]int
}

func (c *SafeCounter) Inc(key string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count[key]++
}

func (c *SafeCounter) Value(key string) int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return c.count[key]
}

func main() {
	counter := SafeCounter{count: make(map[string]int)}
	counter.Inc("page_views")
	counter.Inc("page_views")

	fmt.Println("Page Views count:", counter.Value("page_views"))
}`,
    expectedOutput: 'Page Views count: 2',
    explanation: '`sync.RWMutex` allows concurrent reading by multiple goroutines while requiring exclusive access for write mutations, optimizing read-heavy workloads.',
    bugChallenge: {
      title: 'Concurrent Map Read and Map Write Panic',
      description: 'Reading and writing to a standard Go map concurrently without a mutex triggers an unrecoverable fatal runtime crash.',
      buggyCode: `m := make(map[string]int)\ngo func() { m["a"] = 1 }()\ngo func() { _ = m["a"] }() // BUG: fatal error: concurrent map read and map write!`,
      solutionCode: `var mu sync.RWMutex\nm := make(map[string]int)\ngo func() { mu.Lock(); m["a"] = 1; mu.Unlock() }()\ngo func() { mu.RLock(); _ = m["a"]; mu.RUnlock() }()`,
      hint: 'Protect map access with a sync.Mutex or sync.RWMutex.',
      bugExplanation: 'Go maps are not thread-safe by design; concurrent mutations corrupt hash buckets and crash the runtime.'
    }
  },
  {
    id: 'go-exp-7',
    title: 'Sync.Pool: Reusing Heavy Buffers to Reduce GC Pressure',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Recycle allocated byte slices and buffers to reduce garbage collection pause times in high-throughput network engines.',
    concepts: ['sync.Pool New allocator', 'Get() and Put() lifecycle', 'GC clearing of pool items', 'Memory reuse patterns'],
    starterCode: `package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufferPool = sync.Pool{
	New: func() any {
		// Allocate a new 1KB buffer if pool is empty
		return new(bytes.Buffer)
	},
}

func formatMessage(user string) string {
	buf := bufferPool.Get().(*bytes.Buffer)
	buf.Reset() // Always reset before reuse!
	defer bufferPool.Put(buf)

	buf.WriteString("User: ")
	buf.WriteString(user)
	return buf.String()
}

func main() {
	msg1 := formatMessage("Alice")
	msg2 := formatMessage("Bob")
	fmt.Println(msg1)
	fmt.Println(msg2)
}`,
    expectedOutput: 'User: Alice\nUser: Bob',
    explanation: '`sync.Pool` caches temporary objects across goroutines. Objects in the pool are automatically reclaimed by the GC when memory pressure increases.',
    bugChallenge: {
      title: 'Forgetting buf.Reset() on Reused Buffer',
      description: 'Reusing a buffer from sync.Pool without resetting its length appends new data to stale bytes from previous requests.',
      buggyCode: `buf := bufferPool.Get().(*bytes.Buffer)\n// BUG: forgot buf.Reset(); previous strings remain in buffer!\nbuf.WriteString("Hello")`,
      solutionCode: `buf := bufferPool.Get().(*bytes.Buffer)\nbuf.Reset()\nbuf.WriteString("Hello")`,
      hint: 'Always call `buf.Reset()` before writing to a recycled buffer.',
      bugExplanation: 'Buffers retrieved from `sync.Pool` retain their existing slice data and length until explicitly cleared.'
    }
  },
  {
    id: 'go-exp-8',
    title: 'Atomic Package (sync/atomic): Lock-Free Counters',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Perform lock-free 64-bit integer increments and pointer swaps using CPU hardware atomic instructions.',
    concepts: ['atomic.Int64 / atomic.Uint64 in Go 1.19+', 'atomic.AddInt64 and LoadInt64', 'CompareAndSwap (CAS)', 'atomic.Value for hot-reloading configurations'],
    starterCode: `package main

import (
	"fmt"
	"sync/atomic"
)

func main() {
	var requestsCount atomic.Uint64

	// Lock-free atomic increment
	requestsCount.Add(1)
	requestsCount.Add(5)

	fmt.Println("Processed requests count:", requestsCount.Load())

	// Compare and Swap demonstration
	swapped := requestsCount.CompareAndSwap(6, 10)
	fmt.Println("CAS swap succeeded:", swapped)
	fmt.Println("New request count:", requestsCount.Load())
}`,
    expectedOutput: 'Processed requests count: 6\nCAS swap succeeded: true\nNew request count: 10',
    explanation: '`sync/atomic` methods translate directly into CPU LOCK bus instructions, achieving synchronization with zero OS mutex overhead.',
    bugChallenge: {
      title: '64-Bit Alignment Bug on 32-Bit Systems',
      description: 'In legacy Go, accessing non-64-bit aligned variables with atomic.AddInt64 crashes on ARM 32-bit platforms.',
      buggyCode: `// var count int64; atomic.AddInt64(&count, 1) // Risky on 32-bit architectures without alignment!`,
      solutionCode: `var count atomic.Int64 // Go 1.19+ types guarantee 64-bit alignment automatically\ncount.Add(1)`,
      hint: 'Use the new `atomic.Int64` type from Go 1.19+.',
      bugExplanation: 'Modern `atomic.Type` structs enforce required 64-bit boundary alignment across all target architectures.'
    }
  },
  {
    id: 'go-exp-9',
    title: 'Modern Error Handling: errors.Is, errors.As & %w Wrapping',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Wrap errors with context using fmt.Errorf("%w") and inspect nested error trees without string matching.',
    concepts: ['fmt.Errorf("%w", err) error wrapping', 'errors.Is for sentinel equality', 'errors.As for custom error type extraction', 'Unwrap() method protocol'],
    starterCode: `package main

import (
	"errors"
	"fmt"
)

var ErrNotFound = errors.New("resource not found")

func fetchRecord(id int) error {
	return fmt.Errorf("database query failed for id %d: %w", id, ErrNotFound)
}

func main() {
	err := fetchRecord(42)

	if errors.Is(err, ErrNotFound) {
		fmt.Println("Detected specific sentinel error: ErrNotFound!")
		fmt.Println("Full formatted error message:", err)
	}
}`,
    expectedOutput: 'Detected specific sentinel error: ErrNotFound!\nFull formatted error message: database query failed for id 42: resource not found',
    explanation: '`%w` creates a wrapped error chain. `errors.Is` recursively traverses the chain calling `Unwrap()`, replacing fragile string parsing checks.',
    bugChallenge: {
      title: 'Using %v Instead of %w Breaks errors.Is Bug',
      description: 'Formatting an error with %v or %s converts it to a plain string, discarding the error wrapping link.',
      buggyCode: `return fmt.Errorf("failed: %v", ErrNotFound) // BUG: %v loses error chain; errors.Is fails!`,
      solutionCode: `return fmt.Errorf("failed: %w", ErrNotFound)`,
      hint: 'Use the `%w` verb to wrap errors.',
      bugExplanation: '`%w` creates a struct implementing `Unwrap() error`; `%v` discards the underlying error interface.'
    }
  },
  {
    id: 'go-exp-10',
    title: 'Reflect Package & Deep Equal Inspection',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Inspect struct tags, field types, and dynamic values at runtime using the reflect package.',
    concepts: ['reflect.TypeOf and reflect.ValueOf', 'reflect.DeepEqual comparison', 'Reading struct tags (\`json:"name"\`)', 'Dynamically setting struct fields with CanSet()'],
    starterCode: `package main

import (
	"fmt"
	"reflect"
)

type Config struct {
	Host string \`env:"HOST" default:"localhost"\`
	Port int    \`env:"PORT" default:"8080"\`
}

func main() {
	c := Config{Host: "0.0.0.0", Port: 9000}
	t := reflect.TypeOf(c)

	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		tag := field.Tag.Get("env")
		def := field.Tag.Get("default")
		fmt.Printf("Field: %s | Env: %s | Default: %s\\n", field.Name, tag, def)
	}
}`,
    expectedOutput: 'Field: Host | Env: HOST | Default: localhost\nField: Port | Env: PORT | Default: 8080',
    explanation: 'Go reflection inspects types and struct tags at runtime, powering JSON unmarshaling and ORM libraries like GORM and sqlx.',
    bugChallenge: {
      title: 'Passing Non-Pointer to reflect.ValueOf for Mutation Bug',
      description: 'Attempting to call Value.Set() on a value passed without a pointer panics with "reflect: reflect.Value.Set using unaddressable value".',
      buggyCode: `val := reflect.ValueOf(42)\n// val.SetInt(100) // BUG: panics because value is not addressable!`,
      solutionCode: `x := 42\nval := reflect.ValueOf(&x).Elem()\nval.SetInt(100)`,
      hint: 'Pass a pointer and call `.Elem()` to obtain an addressable reflect.Value.',
      bugExplanation: 'Only values with known memory addresses can be mutated through reflection.'
    }
  },
  {
    id: 'go-exp-11',
    title: 'Go Scheduler: GMP Model & Preemption',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Understand how Goroutines (G), OS Threads (M), and Processors (P) achieve 100,000+ concurrent tasks.',
    concepts: ['G (Goroutine), M (OS Machine Thread), P (Logical Processor)', 'Work-stealing run queues', 'Asynchronous preemption (signal-based in Go 1.14+)', 'Syscall handoff mechanics'],
    starterCode: `package main

import (
	"fmt"
	"runtime"
)

func main() {
	numCPU := runtime.NumCPU()
	maxProcs := runtime.GOMAXPROCS(0)
	numGoroutines := runtime.NumGoroutine()

	fmt.Printf("System CPUs: %d\\n", numCPU)
	fmt.Printf("Active GOMAXPROCS (P count): %d\\n", maxProcs)
	fmt.Printf("Current Running Goroutines (G count): %d\\n", numGoroutines)
}`,
    expectedOutput: 'System CPUs:\nActive GOMAXPROCS (P count):\nCurrent Running Goroutines (G count):',
    explanation: 'The Go runtime multiplexes N goroutines onto M OS threads across P logical processors using work-stealing and network poller integration (epoll/kqueue).',
    bugChallenge: {
      title: 'Tight Loop Starving Scheduler in Older Go Runtimes',
      description: 'In Go <1.14, a tight for-loop without function calls could starve the scheduler indefinitely.',
      buggyCode: `// for {} // Starved OS thread in old non-preemptive runtimes!`,
      solutionCode: `// Modern Go uses OS signals (SIGURG) to preempt tight loops automatically`,
      hint: 'Modern Go preempts cooperatively and via OS signals.',
      bugExplanation: 'Go 1.14 introduced asynchronous signal-based preemption, interrupting long-running loops.'
    }
  },
  {
    id: 'go-exp-12',
    title: 'Memory Profiling with pprof & Escape Analysis',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Analyze why variables escape to the heap using go build -gcflags="-m" to reduce garbage collection overhead.',
    concepts: ['Stack vs Heap allocation', 'Escape analysis compiler mechanics', 'Returning pointers causing heap escape', 'Benchmarking with testing.B'],
    starterCode: `package main

import "fmt"

type Point struct {
    X, Y int
}

// Stack allocated: Does not escape because it is returned by value
func createStackPoint() Point {
    return Point{X: 10, Y: 20}
}

func main() {
    pt := createStackPoint()
    fmt.Printf("Stack Point initialized: (%d, %d)\\n", pt.X, pt.Y)
}`,
    expectedOutput: 'Stack Point initialized: (10, 20)',
    explanation: 'When the Go compiler cannot prove a variable will not be referenced after its enclosing function returns, it moves the allocation from stack to heap.',
    bugChallenge: {
      title: 'Passing Pointers to fmt.Println Forces Heap Escape',
      description: 'fmt.Println takes interface{} arguments, which forces referenced variables to escape to heap memory.',
      buggyCode: `// x := 10; fmt.Println(&x) // Forces x to escape to heap!`,
      solutionCode: `// Pass by value for primitives: fmt.Println(x)`,
      hint: 'Boxed interface parameters force heap allocation.',
      bugExplanation: 'The runtime must allocate memory on the heap to wrap pointers into empty interface descriptors.'
    }
  },
  {
    id: 'go-exp-13',
    title: 'Production HTTP Middleware & Request Chaining',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Construct reusable HTTP middleware for logging, rate limiting, and recovery using the http.Handler decorator pattern.',
    concepts: ['http.Handler & http.HandlerFunc', 'Middleware chaining function type', 'ResponseWriter wrapper for capturing HTTP status', 'Panic recovery with recover()'],
    starterCode: `package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
)

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("[AUDIT] %s %s\\n", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

func HelloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello from SmartLearn Go API!")
}

func main() {
	handler := LoggingMiddleware(http.HandlerFunc(HelloHandler))
	req := httptest.NewRequest("GET", "/api/v1/health", nil)
	w := httptest.NewRecorder()

	handler.ServeHTTP(w, req)
	fmt.Println("Response Code:", w.Code)
}`,
    expectedOutput: '[AUDIT] GET /api/v1/health\nResponse Code: 200',
    explanation: 'Middleware wraps `http.Handler` instances, executing pre-processing logic, passing control down the chain via `next.ServeHTTP()`, and handling post-processing.',
    bugChallenge: {
      title: 'Double WriteHeader Call Warning Bug',
      description: 'Calling w.WriteHeader() multiple times logs "http: superfluous response.WriteHeader call" warning.',
      buggyCode: `w.WriteHeader(http.StatusOK)\nw.WriteHeader(http.StatusBadRequest) // BUG: superfluous call!`,
      solutionCode: `if err != nil {\n    w.WriteHeader(http.StatusBadRequest)\n    return\n}\nw.WriteHeader(http.StatusOK)`,
      hint: 'Only call WriteHeader once per HTTP response.',
      bugExplanation: 'Once the HTTP status header line is written to the network socket, it cannot be changed.'
    }
  },
  {
    id: 'go-exp-14',
    title: 'IO Streaming with io.Reader, io.Writer & io.TeeReader',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Stream megabytes of data through pipelines using standard Go streaming interfaces without loading files entirely into memory.',
    concepts: ['io.Reader & io.Writer interfaces', 'io.Copy chunked buffer transfer', 'io.TeeReader data duplication', 'io.LimitReader safety caps'],
    starterCode: `package main

import (
	"bytes"
	"fmt"
	"io"
	"strings"
)

func main() {
	source := strings.NewReader("Streamed high-volume telemetry packet\\n")
	var destination bytes.Buffer

	// Copy data without loading entire payload into RAM at once
	bytesCopied, err := io.Copy(&destination, source)
	if err != nil {
		fmt.Println("Error copying:", err)
		return
	}

	fmt.Printf("Streamed %d bytes successfully\\n", bytesCopied)
	fmt.Print("Destination buffer content: ", destination.String())
}`,
    expectedOutput: 'Streamed 38 bytes successfully\nDestination buffer content: Streamed high-volume telemetry packet',
    explanation: '`io.Reader` and `io.Writer` are ubiquitous in Go; `io.Copy` allocates a reusable 32KB buffer to stream data between sockets and files with minimal memory overhead.',
    bugChallenge: {
      title: 'Ignoring io.EOF as Normal Stream Termination Bug',
      description: 'Treating io.EOF as an unexpected fatal error breaks standard streaming loops.',
      buggyCode: `n, err := reader.Read(buf)\nif err != nil { panic(err) } // BUG: panics when reaching end of file!`,
      solutionCode: `n, err := reader.Read(buf)\nif err == io.EOF { break }\nif err != nil { panic(err) }`,
      hint: 'Check `if err == io.EOF` to break stream reading gracefully.',
      bugExplanation: '`io.EOF` signals normal completion of the stream rather than a network or disk failure.'
    }
  },
  {
    id: 'go-exp-15',
    title: 'Graceful Server Shutdown & Signal Handling (os/signal)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Intercept SIGINT/SIGTERM to drain active in-flight HTTP connections before shutting down the container.',
    concepts: ['signal.Notify signal subscription', 'syscall.SIGINT & syscall.SIGTERM', 'http.Server.Shutdown(ctx) connection draining', 'Kubernetes termination grace period'],
    starterCode: `package main

import (
	"context"
	"fmt"
	"time"
)

func simulateServerDrain() {
	fmt.Println("Received SIGTERM from orchestrator")
	fmt.Println("Initiating graceful shutdown (draining in-flight requests)...")
	
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	// Drain active requests simulation
	time.Sleep(10 * time.Millisecond)
	select {
	case <-ctx.Done():
		fmt.Println("Shutdown deadline exceeded")
	default:
		fmt.Println("All connections drained successfully. Exiting cleanly.")
	}
}

func main() {
	simulateServerDrain()
}`,
    expectedOutput: 'Received SIGTERM from orchestrator\nInitiating graceful shutdown (draining in-flight requests)...\nAll connections drained successfully. Exiting cleanly.',
    explanation: 'Calling `server.Shutdown()` stops accepting new HTTP connections and waits for active connections to finish before exiting, preventing dropped requests during deployments.',
    bugChallenge: {
      title: 'Using os.Exit(0) Without Draining Connections Bug',
      description: 'Calling os.Exit terminates the process immediately, abruptly killing in-flight requests and skipping deferred cleanup functions.',
      buggyCode: `// on SIGTERM: os.Exit(0) // BUG: drops in-flight connections immediately!`,
      solutionCode: `// server.Shutdown(ctx) drains connections and runs deferred cleanup before exit`,
      hint: 'Use `server.Shutdown(ctx)` instead of `os.Exit`.',
      bugExplanation: '`os.Exit` bypasses deferred functions and forcibly closes open network sockets.'
    }
  },
  {
    id: 'go-exp-16',
    title: 'Custom JSON Marshaling & TextUnmarshaler',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Control serialization formats by implementing json.Marshaler, json.Unmarshaler, and encoding.TextMarshaler.',
    concepts: ['json.Marshaler interface', 'json.Unmarshaler interface', 'Custom timestamp formatting', 'Hiding sensitive fields'],
    starterCode: `package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

type UpperString string

func (u UpperString) MarshalJSON() ([]byte, error) {
	return json.Marshal(strings.ToUpper(string(u)))
}

type User struct {
	Name  UpperString \`json:"name"\`
	Email string      \`json:"email"\`
}

func main() {
	u := User{Name: "ada lovelace", Email: "ada@science.org"}
	data, _ := json.Marshal(u)
	fmt.Println(string(data))
}`,
    expectedOutput: '{"name":"ADA LOVELACE","email":"ada@science.org"}',
    explanation: 'Implementing `MarshalJSON` allows custom formatting such as uppercase conversion, ISO timestamp normalization, or masking sensitive PII values.',
    bugChallenge: {
      title: 'Infinite Recursion in Custom MarshalJSON Bug',
      description: 'Calling json.Marshal on the custom type inside its own MarshalJSON triggers infinite recursive calls and stack overflow.',
      buggyCode: `func (u UpperString) MarshalJSON() ([]byte, error) {\n    return json.Marshal(u) // BUG: Infinite recursion!\n}`,
      solutionCode: `func (u UpperString) MarshalJSON() ([]byte, error) {\n    return json.Marshal(string(u)) // Cast to primitive underlying type\n}`,
      hint: 'Cast to the underlying primitive type before calling json.Marshal.',
      bugExplanation: 'Passing the custom type calls its own `MarshalJSON` method recursively until stack space is exhausted.'
    }
  },
  {
    id: 'go-exp-17',
    title: 'Atomic Pointers & Value Types (sync/atomic.Pointer)',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Hot-reload routing tables and configuration maps concurrently without read lock contention.',
    concepts: ['atomic.Pointer[T] in Go 1.19+', 'Atomic pointer swap', 'Zero-contention reads for hot config', 'Copy-on-write pattern'],
    starterCode: `package main

import (
	"fmt"
	"sync/atomic"
)

type Config struct {
	MaxConnections int
	FeatureFlag    bool
}

func main() {
	var currentConfig atomic.Pointer[Config]

	initial := &Config{MaxConnections: 100, FeatureFlag: false}
	currentConfig.Store(initial)

	fmt.Println("Initial Max Connections:", currentConfig.Load().MaxConnections)

	// Hot reload configuration atomically
	updated := &Config{MaxConnections: 500, FeatureFlag: true}
	currentConfig.Store(updated)

	fmt.Println("Updated Max Connections:", currentConfig.Load().MaxConnections)
	fmt.Println("Updated Feature Flag:", currentConfig.Load().FeatureFlag)
}`,
    expectedOutput: 'Initial Max Connections: 100\nUpdated Max Connections: 500\nUpdated Feature Flag: true',
    explanation: '`atomic.Pointer[T]` enables copy-on-write architectures where readers read pointers concurrently with zero locks while writers swap in new pointer instances atomically.',
    bugChallenge: {
      title: 'Mutating Loaded Pointer In-Place Bug',
      description: 'Modifying the struct pointed to by an atomic pointer in-place creates a data race with concurrent readers.',
      buggyCode: `cfg := currentConfig.Load()\ncfg.MaxConnections = 999 // BUG: Data race with concurrent readers!`,
      solutionCode: `newCfg := *currentConfig.Load()\nnewCfg.MaxConnections = 999\ncurrentConfig.Store(&newCfg)`,
      hint: 'Clone the struct, mutate the copy, and store the new pointer atomically.',
      bugExplanation: 'Atomic pointers protect the pointer itself, not the memory it points to; mutations require copy-on-write.'
    }
  },
  {
    id: 'go-exp-18',
    title: 'Table-Driven Unit Testing & Subtests (t.Run)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Write structured, maintainable Go tests using anonymous struct tables and isolated subtests.',
    concepts: ['Table-driven test slices', 't.Run(name, func(t *testing.T))', 't.Parallel() concurrent test runs', 'Clean failure isolation'],
    starterCode: `package main

import (
	"fmt"
	"strings"
)

func Slugify(input string) string {
	return strings.ToLower(strings.ReplaceAll(strings.TrimSpace(input), " ", "-"))
}

func main() {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{"Single word", "Hello", "hello"},
		{"Multiple words with spaces", "Go Programming Language", "go-programming-language"},
		{"Trimming whitespace", "  Cloud Native  ", "cloud-native"},
	}

	for _, tt := range tests {
		actual := Slugify(tt.input)
		if actual == tt.expected {
			fmt.Printf("PASS: %s -> %s\\n", tt.name, actual)
		} else {
			fmt.Printf("FAIL: %s (got %s, want %s)\\n", tt.name, actual, tt.expected)
		}
	}
}`,
    expectedOutput: 'PASS: Single word -> hello\nPASS: Multiple words with spaces -> go-programming-language\nPASS: Trimming whitespace -> cloud-native',
    explanation: 'Table-driven testing is the standard Go idiom for unit testing, making it easy to add new edge cases without repeating test boilerplate.',
    bugChallenge: {
      title: 'Loop Variable Capture in t.Parallel() Bug',
      description: 'In Go <1.22, running subtests in parallel without rebinding tt causes all subtests to test only the last slice element.',
      buggyCode: `for _, tt := range tests {\n    t.Run(tt.name, func(t *testing.T) {\n        t.Parallel()\n        // BUG: In older Go, tt refers to loop variable!\n    })\n}`,
      solutionCode: `for _, tt := range tests {\n    tt := tt // Rebind for closure (standard fix before Go 1.22)\n    t.Run(tt.name, func(t *testing.T) { t.Parallel() })\n}`,
      hint: 'Rebind the loop variable inside the loop body (or use Go 1.22+).',
      bugExplanation: 'Before Go 1.22, loop variables were reused across iterations, causing closures to capture the final value.'
    }
  },
  {
    id: 'go-exp-19',
    title: 'Embedding Structs & Interfaces (Composition over Inheritance)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Compose behavior cleanly by embedding structs and interfaces without class hierarchies.',
    concepts: ['Anonymous struct embedding', 'Inner field method promotion', 'Overriding promoted methods', 'Interface embedding'],
    starterCode: `package main

import "fmt"

type BaseEntity struct {
	ID        string
	CreatedAt string
}

func (b BaseEntity) Summary() string {
	return fmt.Sprintf("ID: %s (Created: %s)", b.ID, b.CreatedAt)
}

type UserAccount struct {
	BaseEntity // Embedded struct
	Username   string
	Role       string
}

func main() {
	u := UserAccount{
		BaseEntity: BaseEntity{ID: "usr-100", CreatedAt: "2026-09-15"},
		Username:   "alex_dev",
		Role:       "Admin",
	}

	// Promoted method and field access
	fmt.Println("User ID (promoted):", u.ID)
	fmt.Println("Summary (promoted method):", u.Summary())
	fmt.Println("Username:", u.Username)
}`,
    expectedOutput: 'User ID (promoted): usr-100\nSummary (promoted method): ID: usr-100 (Created: 2026-09-15)\nUsername: alex_dev',
    explanation: 'Go favors composition over inheritance. Fields and methods of embedded anonymous structs are promoted to the outer struct automatically.',
    bugChallenge: {
      title: 'Ambiguous Selector Collision with Multiple Embedded Structs',
      description: 'Embedding two structs that declare the same field name causes a compile-time "ambiguous selector" error if accessed directly.',
      buggyCode: `type A struct { Name string }\ntype B struct { Name string }\ntype C struct { A; B }\n// c.Name // BUG: ambiguous selector!`,
      solutionCode: `// Disambiguate by accessing through the embedded type: c.A.Name or c.B.Name`,
      hint: 'Specify the embedded struct name to resolve the ambiguity.',
      bugExplanation: 'When multiple embedded types have matching identifiers at the same depth, explicit selection is required.'
    }
  },
  {
    id: 'go-exp-20',
    title: 'Cgo Basics: Calling C Functions from Go',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Interface with legacy native C shared libraries using Go built-in Cgo toolchain.',
    concepts: ['import "C" pseudo-package', 'Cgo preamble comments', 'C.CString and C.free memory management', 'Cgo call overhead and thread pinning'],
    starterCode: `package main

import "fmt"

// Conceptual demonstration of Cgo memory handling
func main() {
	fmt.Println("Cgo integration interface loaded")
	fmt.Println("Cgo bridges Go garbage-collected memory with C malloc/free heaps")
	fmt.Println("Rule: Always call C.free(unsafe.Pointer(cstr)) for C.CString allocations")
}`,
    expectedOutput: 'Cgo integration interface loaded\nCgo bridges Go garbage-collected memory with C malloc/free heaps\nRule: Always call C.free(unsafe.Pointer(cstr)) for C.CString allocations',
    explanation: 'Cgo lets Go packages call C code. Strings converted via `C.CString` allocate memory on the C heap and must be freed explicitly using `C.free`.',
    bugChallenge: {
      title: 'Memory Leak with C.CString Omitted Free Bug',
      description: 'Converting Go strings to C.CString without calling C.free leaks C heap memory outside the purview of the Go GC.',
      buggyCode: `cstr := C.CString("hello")\n// BUG: forgot defer C.free(unsafe.Pointer(cstr))!`,
      solutionCode: `cstr := C.CString("hello")\ndefer C.free(unsafe.Pointer(cstr))`,
      hint: 'Always defer C.free on C.CString pointers.',
      bugExplanation: 'The Go garbage collector does not track memory allocated by the C library malloc.'
    }
  }
];
