import { CodeLesson } from '../types';

export const EXPANDED_CSHARP_LESSONS: CodeLesson[] = [
  {
    id: 'cs-exp-1',
    title: 'Pattern Matching & Property Patterns (C# 12)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Evaluate complex relational expressions, null checks, and nested property structures cleanly using pattern matching.',
    concepts: ['switch expressions (=>)', 'Property patterns { Status: "Active" }', 'Relational patterns (> and <)', 'Tuple and positional patterns'],
    starterCode: `using System;

public record Order(string Id, decimal Total, bool IsExpedited);

public class Program {
    public static decimal CalculateDiscount(Order order) => order switch {
        { IsExpedited: true, Total: >= 1000m } => 0.20m, // 20% discount
        { Total: >= 500m } => 0.10m,
        { Total: >= 100m } => 0.05m,
        _ => 0.00m
    };

    public static void Main() {
        var bigOrder = new Order("ord-99", 1200m, true);
        Console.WriteLine($"Discount applied: {CalculateDiscount(bigOrder) * 100}%");
    }
}`,
    expectedOutput: 'Discount applied: 20.00%',
    explanation: 'C# pattern matching expressions combine deconstruction, type testing, and relational condition evaluation into concise declarative syntax.',
    bugChallenge: {
      title: 'Missing Discard Pattern in Switch Expression',
      description: 'Omitting the fallback discard pattern `_ =>` in a switch expression throws SwitchExpressionException on unhandled inputs.',
      buggyCode: `string Check(int x) => x switch { 1 => "One" }; // BUG: Throws exception for 2!`,
      solutionCode: `string Check(int x) => x switch { 1 => "One", _ => "Other" };`,
      hint: 'Include `_ =>` as the default fallback branch.',
      bugExplanation: 'Switch expressions must be exhaustive; unhandled cases throw runtime exceptions.'
    }
  },
  {
    id: 'cs-exp-2',
    title: 'Span<T> and Memory<T> for High-Performance Zero-Allocation Slicing',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Slice strings and contiguous memory buffers without allocating heap objects using ref struct Span<T>.',
    concepts: ['ReadOnlySpan<char> string parsing', 'ref struct stack-only limitations', 'Memory<T> for async methods', 'Eliminating GC allocations'],
    starterCode: `using System;

public class Program {
    public static void Main() {
        string header = "Content-Length: 4096";
        ReadOnlySpan<char> span = header.AsSpan();

        int colonIndex = span.IndexOf(':');
        ReadOnlySpan<char> key = span.Slice(0, colonIndex);
        ReadOnlySpan<char> val = span.Slice(colonIndex + 2);

        Console.WriteLine($"Header Key: {key.ToString()}");
        Console.WriteLine($"Header Val: {val.ToString()}");
    }
}`,
    expectedOutput: 'Header Key: Content-Length\nHeader Val: 4096',
    explanation: '`Span<T>` is a stack-only representation of contiguous memory that allows slicing strings or arrays without copying or allocating new heap memory.',
    bugChallenge: {
      title: 'Using Span<T> Inside Async Methods Bug',
      description: 'Using Span<T> across an await boundary is forbidden by the compiler because async state machines reside on the heap.',
      buggyCode: `async Task Process(ReadOnlySpan<char> span) { await Task.Delay(1); } // BUG: ref struct cannot be in async method!`,
      solutionCode: `async Task Process(ReadOnlyMemory<char> memory) { await Task.Delay(1); }`,
      hint: 'Use `Memory<T>` or `ReadOnlyMemory<T>` in async methods.',
      bugExplanation: '`Span<T>` is a `ref struct` that can never live on the heap, which async state machines require.'
    }
  },
  {
    id: 'cs-exp-3',
    title: 'Primary Constructors for Classes and Structs (C# 12)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Declare class parameters directly on the class declaration header for clean dependency injection.',
    concepts: ['Class-level constructor arguments', 'Implicit field capture', 'Initializing base class primary constructors', 'Dependency injection reduction'],
    starterCode: `using System;

public interface ILogger { void Log(string msg); }

public class ConsoleLogger : ILogger {
    public void Log(string msg) => Console.WriteLine($"[LOG] {msg}");
}

// C# 12 Primary Constructor
public class UserService(ILogger logger, string serviceName) {
    public void RegisterUser(string username) {
        logger.Log($"[{serviceName}] Registered user: {username}");
    }
}

public class Program {
    public static void Main() {
        var service = new UserService(new ConsoleLogger(), "AuthCluster");
        service.RegisterUser("Ada");
    }
}`,
    expectedOutput: '[LOG] [AuthCluster] Registered user: Ada',
    explanation: 'Primary constructors in C# 12 eliminate repetitive constructor parameter assignments and boilerplate private readonly fields.',
    bugChallenge: {
      title: 'Accidental Mutable Capture in Primary Constructor Bug',
      description: 'Modifying a primary constructor parameter inside a method changes the captured field value across all methods in that instance.',
      buggyCode: `public class Counter(int count) {\n    public void Inc() { count++; } // Mutates captured field implicitly!\n}`,
      solutionCode: `// Be explicit: prefer private readonly fields if immutability is desired`,
      hint: 'Be mindful that primary constructor parameters are captured as mutable fields unless readonly backing fields are used.',
      bugExplanation: 'The compiler captures primary constructor parameters as private mutable fields if they are mutated.'
    }
  },
  {
    id: 'cs-exp-4',
    title: 'C# Records, with Expressions & Value Equality',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Model immutable data transfer objects with non-destructive mutation via with expressions.',
    concepts: ['record class vs record struct', 'with expression non-destructive cloning', 'Compiler-generated value-based Equals', 'Positional records'],
    starterCode: `using System;

public record ServerNode(string Hostname, int Port, bool IsActive);

public class Program {
    public static void Main() {
        var primary = new ServerNode("prod-db-1", 5432, true);
        
        // Non-destructive mutation: clones primary and updates Port
        var replica = primary with { Port = 5433, Hostname = "prod-db-2" };

        Console.WriteLine($"Primary: {primary.Hostname}:{primary.Port}");
        Console.WriteLine($"Replica: {replica.Hostname}:{replica.Port}");
        Console.WriteLine($"IsActive matches: {primary.IsActive == replica.IsActive}");
    }
}`,
    expectedOutput: 'Primary: prod-db-1:5432\nReplica: prod-db-2:5433\nIsActive matches: True',
    explanation: '`record` types implement value semantics automatically. The `with` expression creates a shallow copy with specified property overrides.',
    bugChallenge: {
      title: 'Mutating Positional Record Property Bug',
      description: 'Attempting to assign a property on a positional record directly triggers a compile-time error because positional properties are init-only.',
      buggyCode: `var r = new ServerNode("host", 80, true);\nr.Port = 81; // BUG: Init-only property cannot be assigned after initialization!`,
      solutionCode: `var r = new ServerNode("host", 80, true);\nvar updated = r with { Port = 81 };`,
      hint: 'Use the `with` expression to create an updated record instance.',
      bugExplanation: 'Positional record properties are declared with `{ get; init; }` and are immutable after creation.'
    }
  },
  {
    id: 'cs-exp-5',
    title: 'Async/Await Internals: SynchronizationContext & ConfigureAwait',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Avoid UI deadlocks and improve ASP.NET Core throughput using ConfigureAwait(false).',
    concepts: ['AsyncStateMachine compiler lowering', 'SynchronizationContext capture', 'ConfigureAwait(false) performance', 'Avoiding .Result and .Wait() deadlocks'],
    starterCode: `using System;
using System.Threading.Tasks;

public class Program {
    public static async Task<string> FetchDataAsync() {
        // ConfigureAwait(false) prevents marshaling continuation back to original context
        await Task.Delay(10).ConfigureAwait(false);
        return "Payload loaded asynchronously";
    }

    public static async Task Main() {
        string data = await FetchDataAsync();
        Console.WriteLine(data);
    }
}`,
    expectedOutput: 'Payload loaded asynchronously',
    explanation: '`ConfigureAwait(false)` instructs the runtime that the continuation does not need to resume on the captured synchronization context, avoiding thread pool deadlocks in library code.',
    bugChallenge: {
      title: 'Blocking on Async Code Deadlock Bug',
      description: 'Calling .Result or .Wait() on a task in a UI or legacy ASP.NET context with a SynchronizationContext deadlocks the application.',
      buggyCode: `string result = FetchDataAsync().Result; // BUG: Deadlock if SynchronizationContext exists!`,
      solutionCode: `string result = await FetchDataAsync();`,
      hint: 'Use `await` all the way up instead of `.Result`.',
      bugExplanation: 'The calling thread blocks waiting for the task, while the continuation waits for the thread to be released.'
    }
  },
  {
    id: 'cs-exp-6',
    title: 'Channels (System.Threading.Channels) for High-Throughput Queues',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Build high-performance, lock-free producer-consumer pipelines that outpace BlockingCollection.',
    concepts: ['Channel.CreateBounded<T>()', 'ChannelReader & ChannelWriter', 'FullMode (Wait, DropOldest, DropWrite)', 'Backpressure management'],
    starterCode: `using System;
using System.Threading.Channels;
using System.Threading.Tasks;

public class Program {
    public static async Task Main() {
        var channel = Channel.CreateBounded<string>(new BoundedChannelOptions(10) {
            FullMode = BoundedChannelFullMode.Wait
        });

        // Producer
        _ = Task.Run(async () => {
            await channel.Writer.WriteAsync("Packet_A");
            await channel.Writer.WriteAsync("Packet_B");
            channel.Writer.Complete();
        });

        // Consumer
        await foreach (var item in channel.Reader.ReadAllAsync()) {
            Console.WriteLine($"Channel consumed: {item}");
        }
    }
}`,
    expectedOutput: 'Channel consumed: Packet_A\nChannel consumed: Packet_B',
    explanation: '`System.Threading.Channels` is an asynchronous, allocation-optimized producer/consumer queue designed for cloud backpressure and microservice event streams.',
    bugChallenge: {
      title: 'Consumer Hanging on Channel That Never Completes Bug',
      description: 'Forgetting to call channel.Writer.Complete() causes the consumer `ReadAllAsync()` loop to hang forever.',
      buggyCode: `// producer finishes without calling channel.Writer.Complete(); consumer hangs!`,
      solutionCode: `channel.Writer.Complete();`,
      hint: 'Call Complete() on the ChannelWriter when production is finished.',
      bugExplanation: '`ReadAllAsync` continues awaiting new items until `Complete()` is signaled.'
    }
  },
  {
    id: 'cs-exp-7',
    title: 'Nullable Reference Types (NRT) & Null-Forgiving Operator (!)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Eliminate NullReferenceException bugs at compile time using C# 8+ nullable annotations (#nullable enable).',
    concepts: ['string vs string? annotation', 'Null-forgiving operator (!)', 'MemberNotNull and NotNullWhen attributes', 'Compiler static flow analysis'],
    starterCode: `#nullable enable
using System;

public class Customer {
    public string Name { get; set; }
    public string? MiddleName { get; set; } // Explicitly nullable

    public Customer(string name) {
        Name = name; // Must be initialized to non-null
    }
}

public class Program {
    public static void Main() {
        var c = new Customer("Grace");
        Console.WriteLine($"Customer: {c.Name}, Middle: {c.MiddleName ?? "N/A"}");
    }
}`,
    expectedOutput: 'Customer: Grace, Middle: N/A',
    explanation: 'Nullable Reference Types treat non-annotated reference types as non-null by default, generating warnings whenever a null dereference is possible.',
    bugChallenge: {
      title: 'Uninitialized Non-Nullable Property Warning',
      description: 'Leaving a non-nullable property unassigned in a constructor triggers a compiler CS8618 warning.',
      buggyCode: `public class Item {\n    public string Title { get; set; } // BUG: CS8618 Non-nullable property uninitialized!\n}`,
      solutionCode: `public class Item {\n    public string Title { get; set; } = string.Empty;\n}`,
      hint: 'Initialize with a default value or mark with `required` in C# 11+.',
      bugExplanation: 'The compiler requires non-nullable properties to have valid values upon constructor exit.'
    }
  },
  {
    id: 'cs-exp-8',
    title: 'LINQ Query Optimization: Deferred Execution & IQueryable',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Understand the difference between IEnumerable in-memory evaluation and IQueryable SQL expression translation.',
    concepts: ['Deferred vs Immediate execution', 'Expression trees (Expression<Func<T, bool>>)', 'N+1 query problem prevention', 'Select projections for memory savings'],
    starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public class Program {
    public static void Main() {
        var numbers = new List<int> { 1, 2, 3, 4, 5, 6 };

        // Deferred execution: query is not executed yet!
        var query = numbers.Where(n => n % 2 == 0).Select(n => n * 10);

        numbers.Add(8); // Mutation before enumeration is observed!

        // Execution happens here upon iteration
        Console.WriteLine("LINQ results: " + string.Join(", ", query));
    }
}`,
    expectedOutput: 'LINQ results: 20, 40, 60, 80',
    explanation: 'LINQ queries use deferred execution via `yield return`. Iteration triggers evaluation, reflecting underlying collection mutations up until that point.',
    bugChallenge: {
      title: 'Multiple Enumeration Performance Trap',
      description: 'Calling .Count() followed by .ToList() or foreach on an expensive query executes the entire query twice.',
      buggyCode: `var query = ExpensiveQuery();\nif (query.Count() > 0) {\n    foreach (var x in query) { ... } // Re-executes entire query!\n}`,
      solutionCode: `var results = ExpensiveQuery().ToList(); // Materialize once\nif (results.Count > 0) {\n    foreach (var x in results) { ... }\n}`,
      hint: 'Materialize the query with `.ToList()` or `.ToArray()` before multiple uses.',
      bugExplanation: 'Deferred queries re-execute each time they are enumerated unless materialized.'
    }
  },
  {
    id: 'cs-exp-9',
    title: 'C# 11+ Required Members & object initializers',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Force callers to initialize mandatory properties during object construction without heavy constructors.',
    concepts: ['required modifier on properties', 'SetsRequiredMembers attribute', 'Clean DTO instantiation', 'Compile-time missing property errors'],
    starterCode: `using System;

public class DatabaseConfig {
    public required string Host { get; init; }
    public required int Port { get; init; }
    public string DatabaseName { get; init; } = "master";
}

public class Program {
    public static void Main() {
        var cfg = new DatabaseConfig {
            Host = "db.production.cluster",
            Port = 5432
        };

        Console.WriteLine($"Connected to {cfg.Host}:{cfg.Port}/{cfg.DatabaseName}");
    }
}`,
    expectedOutput: 'Connected to db.production.cluster:5432/master',
    explanation: 'The `required` modifier forces callers using object initializer syntax `{ ... }` to set that property, catching omissions during compilation.',
    bugChallenge: {
      title: 'Missing Required Member in Object Initializer Bug',
      description: 'Omitting a required property when instantiating the class causes compile-time error CS9035.',
      buggyCode: `var cfg = new DatabaseConfig { Host = "localhost" }; // BUG: Required member 'Port' is not initialized!`,
      solutionCode: `var cfg = new DatabaseConfig { Host = "localhost", Port = 5432 };`,
      hint: 'Include all properties marked with `required`.',
      bugExplanation: '`required` properties cannot be skipped in object initializers.'
    }
  },
  {
    id: 'cs-exp-10',
    title: 'Source Generators in Roslyn: Compile-Time Metaprogramming',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Generate C# source files dynamically during compilation to replace slow reflection with zero-overhead code.',
    concepts: ['IIncrementalGenerator interface', 'SyntaxReceiver & AST parsing', 'Zero runtime reflection overhead', 'Compile-time JSON serialization'],
    starterCode: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Roslyn Source Generator Engine initialized");
        Console.WriteLine("Generates strongly typed serialization and mapping at build time.");
        Console.WriteLine("Zero runtime reflection overhead; 100% Native AOT compatible.");
    }
}`,
    expectedOutput: 'Roslyn Source Generator Engine initialized\nGenerates strongly typed serialization and mapping at build time.\nZero runtime reflection overhead; 100% Native AOT compatible.',
    explanation: 'Source Generators inspect code as it is being compiled and emit new C# source files into the compilation, enabling reflection-free Native AOT compilation.',
    bugChallenge: {
      title: 'Modifying Existing Code with Source Generators Bug',
      description: 'Source Generators can only ADD new code (via partial classes); they can never edit or delete existing user code.',
      buggyCode: `// Attempting to rewrite existing method bodies fails`,
      solutionCode: `// Use partial classes and partial methods to augment behavior`,
      hint: 'Design classes as `partial` to allow source generators to contribute code.',
      bugExplanation: 'Roslyn Source Generators are additive-only to maintain compiler determinism.'
    }
  },
  {
    id: 'cs-exp-11',
    title: 'Native AOT Compilation & Trimming in .NET 8+',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Compile C# directly into native machine code binaries that boot in 5 milliseconds with zero JIT compiler overhead.',
    concepts: ['PublishAot=true compilation', 'IL Trimming and dead code removal', 'Trimming warnings & RequiresUnreferencedCode', 'Self-contained single-file native binaries'],
    starterCode: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Running in Native AOT mode");
        Console.WriteLine("Cold start time: ~8ms");
        Console.WriteLine("Memory footprint: ~12MB RSS");
    }
}`,
    expectedOutput: 'Running in Native AOT mode\nCold start time: ~8ms\nMemory footprint: ~12MB RSS',
    explanation: 'Native AOT compiles IL byte code into platform-specific machine code ahead of time, eliminating the JIT compiler and producing ultra-compact binaries for container microservices.',
    bugChallenge: {
      title: 'Using Dynamic Reflection in Native AOT Bug',
      description: 'Using Type.GetType("DynamicString") or MakeGenericType in Native AOT causes runtime crashes because unused types are trimmed.',
      buggyCode: `Type.GetType(userInput); // BUG: Trimmer might remove this type!`,
      solutionCode: `// Use compile-time typeof() or [DynamicDependency] attributes`,
      hint: 'Avoid unbounded dynamic reflection in Native AOT.',
      bugExplanation: 'The IL trimmer strips metadata and types that cannot be statically proven to be referenced.'
    }
  },
  {
    id: 'cs-exp-12',
    title: 'Asynchronous Streams with IAsyncEnumerable<T> & await foreach',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Stream paginated cloud data chunks asynchronously one item at a time using yield return and await foreach.',
    concepts: ['IAsyncEnumerable<T> interface', 'yield return in async method', 'await foreach consumer loop', 'CancellationToken propagation with [EnumeratorCancellation]'],
    starterCode: `using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class Program {
    public static async IAsyncEnumerable<string> FetchRecordsAsync() {
        for (int i = 1; i <= 3; i++) {
            await Task.Delay(10); // Simulating network latency
            yield return $"Record #{i}";
        }
    }

    public static async Task Main() {
        await foreach (var item in FetchRecordsAsync()) {
            Console.WriteLine($"Streamed: {item}");
        }
    }
}`,
    expectedOutput: 'Streamed: Record #1\nStreamed: Record #2\nStreamed: Record #3',
    explanation: '`IAsyncEnumerable<T>` bridges asynchronous I/O and iterator patterns, enabling client consumers to process streaming chunks as they arrive from network sockets.',
    bugChallenge: {
      title: 'Missing EnumeratorCancellation on Async Stream Token Bug',
      description: 'Passing a CancellationToken into an IAsyncEnumerable method without [EnumeratorCancellation] fails to bind cancellation from await foreach WithCancellation.',
      buggyCode: `async IAsyncEnumerable<int> Stream(CancellationToken ct) { ... } // Token not bound!`,
      solutionCode: `async IAsyncEnumerable<int> Stream([EnumeratorCancellation] CancellationToken ct = default) { ... }`,
      hint: 'Decorate the CancellationToken parameter with `[EnumeratorCancellation]`.',
      bugExplanation: '`[EnumeratorCancellation]` tells the compiler to route the cancellation token passed to `.WithCancellation()` into the method body.'
    }
  },
  {
    id: 'cs-exp-13',
    title: 'Delegates, Events, Action & Func Generics',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Decouple producers and consumers using multicast delegates, Action<T>, and Func<T, TResult>.',
    concepts: ['delegate keyword syntax', 'Action<T> vs Func<T, R>', 'event keyword encapsulation', 'Unsubscribing (-=) to prevent memory leaks'],
    starterCode: `using System;

public class StockTicker {
    public event Action<string, decimal>? PriceChanged;

    public void UpdatePrice(string symbol, decimal price) {
        PriceChanged?.Invoke(symbol, price);
    }
}

public class Program {
    public static void Main() {
        var ticker = new StockTicker();
        ticker.PriceChanged += (sym, val) => Console.WriteLine($"ALERT: {sym} traded at \${val}");

        ticker.UpdatePrice("MSFT", 450.25m);
    }
}`,
    expectedOutput: 'ALERT: MSFT traded at $450.25',
    explanation: 'Delegates are type-safe function pointers that support multicast chaining. The `event` keyword restricts callers so they can only subscribe or unsubscribe.',
    bugChallenge: {
      title: 'Event Handler Memory Leak in Long-Lived Publishers',
      description: 'Subscribing a short-lived subscriber to an event on a long-lived publisher prevents the subscriber from being garbage collected.',
      buggyCode: `// subscriber attaches but never detaches -=; leaked in memory!`,
      solutionCode: `// Always unsubscribe with -= in IDisposable.Dispose()`,
      hint: 'Unsubscribe event handlers in `Dispose()` or use weak event patterns.',
      bugExplanation: 'The publisher delegate maintains a strong reference to the subscriber instance.'
    }
  },
  {
    id: 'cs-exp-14',
    title: 'C# 10+ Global Usings & File-Scoped Namespaces',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Eliminate indentation and repetitive namespace imports across all files in your project.',
    concepts: ['global using directive', 'File-scoped namespace declaration', 'Implicit usings feature', 'Clean code structure'],
    starterCode: `// Demonstration of file-scoped namespace
namespace SmartLearn.Engineering;

using System;

public class SystemStatus {
    public static void Report() => Console.WriteLine("Status: Optimal (File-scoped namespace active)");
}

public class Program {
    public static void Main() {
        SystemStatus.Report();
    }
}`,
    expectedOutput: 'Status: Optimal (File-scoped namespace active)',
    explanation: 'File-scoped namespaces replace wrapping curly braces with a single semicolon line, saving an entire level of indentation across all C# source files.',
    bugChallenge: {
      title: 'Multiple File-Scoped Namespaces in One File Bug',
      description: 'A source file cannot declare more than one file-scoped namespace.',
      buggyCode: `namespace A;\nnamespace B; // BUG: CS8954 A file cannot contain multiple file-scoped namespaces!`,
      solutionCode: `// One namespace per file or use traditional block-scoped namespaces`,
      hint: 'Keep one file-scoped namespace per source file.',
      bugExplanation: 'File-scoped namespaces apply to the entire remaining file content.'
    }
  },
  {
    id: 'cs-exp-15',
    title: 'Interlocked Operations & Volatile Read/Write',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Write high-frequency concurrent counters using Interlocked primitives without entering heavyweight monitors.',
    concepts: ['Interlocked.Increment & Interlocked.Add', 'Interlocked.CompareExchange (CAS)', 'Volatile.Read & Volatile.Write', 'Lock-free thread synchronization'],
    starterCode: `using System;
using System.Threading;

public class Program {
    private static long _requestCount = 0;

    public static void Main() {
        // Atomic thread-safe increment
        Interlocked.Increment(ref _requestCount);
        Interlocked.Add(ref _requestCount, 4);

        long current = Interlocked.Read(ref _requestCount);
        Console.WriteLine($"Interlocked requests counter: {current}");

        // CAS demonstration
        long original = Interlocked.CompareExchange(ref _requestCount, 10, 5);
        Console.WriteLine($"CAS swapped: {_requestCount}");
    }
}`,
    expectedOutput: 'Interlocked requests counter: 5\nCAS swapped: 10',
    explanation: '`Interlocked` methods map directly to hardware bus lock instructions, executing atomic read-modify-write cycles in a few nanoseconds.',
    bugChallenge: {
      title: 'Non-Interlocked Increment on Shared Field Bug',
      description: 'Using ++ on a shared variable across threads causes lost updates due to non-atomic read-modify-write cycles.',
      buggyCode: `_requestCount++; // BUG: Not thread-safe!`,
      solutionCode: `Interlocked.Increment(ref _requestCount);`,
      hint: 'Use `Interlocked.Increment` for concurrent shared counters.',
      bugExplanation: '`++` compiles to three separate instructions: read, increment, write.'
    }
  },
  {
    id: 'cs-exp-16',
    title: 'Generic Math & Static Abstract Interface Members (C# 11)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Write generic algorithms that operate on any numeric type using static virtual and abstract members.',
    concepts: ['static abstract members in interfaces', 'INumber<T> & IBinaryInteger<T>', 'Generic mathematical algorithms', 'Zero boxing numeric calculations'],
    starterCode: `using System;
using System.Numerics;

public class MathUtilities {
    // Works for int, double, float, decimal, BigInteger!
    public static T AddNumbers<T>(T a, T b) where T : INumber<T> {
        return a + b;
    }
}

public class Program {
    public static void Main() {
        int intSum = MathUtilities.AddNumbers(15, 25);
        double doubleSum = MathUtilities.AddNumbers(3.14, 2.71);
        
        Console.WriteLine($"Generic Int Sum: {intSum}");
        Console.WriteLine($"Generic Double Sum: {doubleSum:F2}");
    }
}`,
    expectedOutput: 'Generic Int Sum: 40\nGeneric Double Sum: 5.85',
    explanation: 'Static abstract interface members allow interfaces to define operators (`+`, `-`, `*`), enabling truly generic mathematical algorithms across all numeric types.',
    bugChallenge: {
      title: 'Operator + Not Defined on Unconstrained Generic Bug',
      description: 'Using operator + on an unconstrained type T fails compilation.',
      buggyCode: `T Add<T>(T a, T b) => a + b; // BUG: Operator '+' cannot be applied to operands of type 'T'!`,
      solutionCode: `T Add<T>(T a, T b) where T : INumber<T> => a + b;`,
      hint: 'Constrain T with `where T : INumber<T>`.',
      bugExplanation: 'Operators in C# are static methods; `INumber<T>` exposes them via static abstract interface members.'
    }
  },
  {
    id: 'cs-exp-17',
    title: 'ArrayPool<T> and MemoryPool<T> for Buffer Recycling',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Borrow reusable byte and character arrays from shared memory pools to eliminate GC gen-0 churn.',
    concepts: ['ArrayPool<T>.Shared', 'Rent() and Return() pattern', 'clearArray flag considerations', 'High-throughput networking buffers'],
    starterCode: `using System;
using System.Buffers;

public class Program {
    public static void Main() {
        // Rent an array of at least 1024 elements from shared pool
        byte[] buffer = ArrayPool<byte>.Shared.Rent(1024);
        try {
            buffer[0] = 0xAA;
            buffer[1] = 0xBB;
            Console.WriteLine($"Rented buffer size: {buffer.Length} bytes (at least 1024)");
            Console.WriteLine($"First byte: 0x{buffer[0]:X2}");
        } finally {
            // Always return rented arrays in finally block!
            ArrayPool<byte>.Shared.Return(buffer, clearArray: false);
            Console.WriteLine("Buffer returned to ArrayPool successfully.");
        }
    }
}`,
    expectedOutput: 'Rented buffer size: 1024 bytes (at least 1024)\nFirst byte: 0xAA\nBuffer returned to ArrayPool successfully.',
    explanation: '`ArrayPool<T>` rents pre-allocated arrays, drastically reducing the frequency of garbage collection cycles in high-throughput network applications.',
    bugChallenge: {
      title: 'Accessing Array After Returning to ArrayPool Bug',
      description: 'Reading or writing to an array after calling ArrayPool.Return causes data corruption when another thread rents the same buffer.',
      buggyCode: `ArrayPool<byte>.Shared.Return(buf);\nbuf[0] = 1; // BUG: Use after return corruption!`,
      solutionCode: `// Set reference to null after returning: ArrayPool<byte>.Shared.Return(buf); buf = null!;`,
      hint: 'Never access an array after returning it to the pool.',
      bugExplanation: 'Returned arrays are actively reassigned to other worker threads.'
    }
  },
  {
    id: 'cs-exp-18',
    title: 'Unsafe Code, Pointers & fixed Statement',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Pin managed heap objects in memory to manipulate raw byte pointers directly in unsafe contexts.',
    concepts: ['unsafe keyword and /unsafe compiler flag', 'fixed statement pointer pinning', 'Stackalloc stack arrays', 'Pointer arithmetic in C#'],
    starterCode: `using System;

public class Program {
    public static void Main() {
        int[] numbers = { 10, 20, 30 };

        // Pin the array so the GC does not relocate it
        unsafe {
            fixed (int* ptr = numbers) {
                int* p = ptr;
                Console.WriteLine($"First element via pointer: {*p}");
                p++; // Pointer arithmetic
                Console.WriteLine($"Second element via pointer: {*p}");
            }
        }
    }
}`,
    expectedOutput: 'First element via pointer: 10\nSecond element via pointer: 20',
    explanation: 'The `fixed` statement pins managed heap objects at a fixed memory address, preventing the garbage collector from moving them during pointer operations.',
    bugChallenge: {
      title: 'Holding Pointer Beyond fixed Scope Bug',
      description: 'Using a pointer after its enclosing fixed block exits causes crashes when the GC relocates the array.',
      buggyCode: `int* saved;\nfixed(int* p = arr) { saved = p; }\n*saved = 42; // BUG: Array may have moved!`,
      solutionCode: `fixed(int* p = arr) { *p = 42; } // Access only inside fixed scope`,
      hint: 'Pointers are only valid within the lexical scope of the `fixed` block.',
      bugExplanation: 'The GC can relocate heap objects immediately after the `fixed` block terminates.'
    }
  },
  {
    id: 'cs-exp-19',
    title: 'Custom Attributes & Caller Information Attributes',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Capture calling method names, source file paths, and line numbers automatically without reflection.',
    concepts: ['[CallerMemberName]', '[CallerFilePath] & [CallerLineNumber]', '[CallerArgumentExpression] in C# 10', 'High-performance logging'],
    starterCode: `using System;
using System.Runtime.CompilerServices;

public class Logger {
    public static void Log(
        string message,
        [CallerMemberName] string memberName = "",
        [CallerLineNumber] int line = 0) {
        Console.WriteLine($"[{memberName}:{line}] {message}");
    }
}

public class Program {
    public static void ExecuteTask() {
        Logger.Log("Worker task running...");
    }

    public static void Main() {
        ExecuteTask();
    }
}`,
    expectedOutput: '[ExecuteTask:15] Worker task running...',
    explanation: 'Caller information attributes instruct the compiler to insert caller metadata as literal constants at call sites with zero runtime reflection overhead.',
    bugChallenge: {
      title: 'CallerMemberName Overridden by Explicit Argument',
      description: 'Passing an explicit argument overrides the compiler caller injection.',
      buggyCode: `Logger.Log("msg", "explicit_name"); // Loses automatic caller capture`,
      solutionCode: `Logger.Log("msg"); // Omit optional parameters to enable compiler injection`,
      hint: 'Leave default arguments empty so the compiler can fill in caller details.',
      bugExplanation: 'The compiler only injects caller attributes when the parameter is omitted by the caller.'
    }
  },
  {
    id: 'cs-exp-20',
    title: 'Default Interface Methods (DIM) & API Evolution',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Add new methods to published interfaces without breaking existing third-party implementations.',
    concepts: ['Default method implementations in interfaces', 'Traits in C#', 'Explicit interface implementation requirement', 'Multiple interface inheritance disambiguation'],
    starterCode: `using System;

public interface IGreeter {
    void Greet(string name);
    
    // Default implementation
    void GreetFormal(string name) {
        Console.WriteLine($"Good day, esteemed {name}.");
    }
}

public class CasualGreeter : IGreeter {
    public void Greet(string name) => Console.WriteLine($"Hey, {name}!");
}

public class Program {
    public static void Main() {
        CasualGreeter casual = new CasualGreeter();
        casual.Greet("Anya");

        // Access default interface method via interface reference
        IGreeter greeter = casual;
        greeter.GreetFormal("Anya");
    }
}`,
    expectedOutput: 'Hey, Anya!\nGood day, esteemed Anya.',
    explanation: 'Default interface methods allow API authors to evolve interfaces over time without breaking existing classes that implement the interface.',
    bugChallenge: {
      title: 'Calling Default Interface Method on Concrete Class Reference',
      description: 'Default interface methods are not inherited by the implementing class; calling them on a class variable causes a compile error.',
      buggyCode: `CasualGreeter c = new CasualGreeter();\nc.GreetFormal("Bob"); // BUG: GreetFormal is not a member of CasualGreeter!`,
      solutionCode: `IGreeter g = new CasualGreeter();\ng.GreetFormal("Bob");`,
      hint: 'Cast to the interface type to access default interface methods.',
      bugExplanation: 'Default interface methods are implemented as explicit interface implementations.'
    }
  }
];
