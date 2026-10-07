import { CodeLesson } from '../types';

export const EXPANDED_RUST_LESSONS: CodeLesson[] = [
  {
    id: 'rust-exp-1',
    title: 'Borrow Checker: Non-Lexical Lifetimes (NLL)',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Understand how the Rust compiler tracks references based on their actual last point of use rather than lexical braces.',
    concepts: ['Ownership and moves', 'Exclusive (&mut) vs shared (&) borrows', 'Non-Lexical Lifetimes (NLL)', 'Simultaneous mutability prevention'],
    starterCode: `fn main() {
    let mut data = vec![1, 2, 3];
    
    // Immutable reference created
    let first = &data[0];
    println!("First element is: {}", first);
    // 'first' is never used again after this line!
    
    // In Rust NLL, we can now mutate 'data' because 'first' borrow ended early
    data.push(4);
    println!("Vector after push: {:?}", data);
}`,
    expectedOutput: 'First element is: 1\nVector after push: [1, 2, 3, 4]',
    explanation: 'Non-Lexical Lifetimes allow borrows to end at their last point of evaluation rather than at the end of the enclosing block scope.',
    bugChallenge: {
      title: 'Holding Borrow Across Vector Mutation',
      description: 'Using an immutable reference after a mutating call causes a compile error because push reallocates memory.',
      buggyCode: `let mut v = vec![10];\nlet r = &v[0];\nv.push(20);\nprintln!("{}", r); // BUG: r is invalidated if vector reallocated!`,
      solutionCode: `let mut v = vec![10];\nlet val = v[0]; // Copy by value\nv.push(20);\nprintln!("{}", val);`,
      hint: 'Copy the primitive value or finish using the reference before mutating.',
      bugExplanation: 'Pushing to a vector may reallocate memory on the heap, turning earlier references into dangling pointers.'
    }
  },
  {
    id: 'rust-exp-2',
    title: 'Lifetime Annotations in Structs and Functions (\'a)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Declare generic lifetime relationships to guarantee structs do not outlive the data they borrow.',
    concepts: ['Lifetime syntax (\'a)', 'Lifetime elision rules', 'Structs holding references', 'Static lifetime (\'static)'],
    starterCode: `// Struct borrows a string slice with lifetime 'a
struct Highlight<'a> {
    text: &'a str,
}

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("Rust Systems");
    let s2 = "Memory Safety";
    let winner = longest(&s1, s2);
    let h = Highlight { text: winner };
    println!("Longest highlighted text: {}", h.text);
}`,
    expectedOutput: 'Longest highlighted text: Memory Safety',
    explanation: 'Lifetime annotations do not change how long values live; they inform the borrow checker about relationships between reference lifetimes.',
    bugChallenge: {
      title: 'Returning Reference to Local Stack Variable Bug',
      description: 'Attempting to return a reference to a variable created inside the function is rejected by the compiler.',
      buggyCode: `fn bad_ref() -> &String {\n    let s = String::from("temp");\n    &s // BUG: returns reference to dropped local variable!\n}`,
      solutionCode: `fn good_val() -> String {\n    String::from("temp") // Return ownership by value\n}`,
      hint: 'Return the owned String value directly.',
      bugExplanation: 'Local stack variables are dropped when the function exits; returning references creates dangling pointers.'
    }
  },
  {
    id: 'rust-exp-3',
    title: 'Dynamic vs Static Dispatch (dyn Trait vs impl Trait)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Compare monomorphized static dispatch with runtime polymorphic dynamic dispatch via vtables.',
    concepts: ['Monomorphization in LLVM', 'dyn Trait fat pointers (data + vtable)', 'Heterogeneous collections in Vec<Box<dyn Trait>>', 'Performance trade-offs'],
    starterCode: `trait Speaker {
    fn speak(&self) -> &'static str;
}

struct Rustacean;
impl Speaker for Rustacean {
    fn speak(&self) -> &'static str { "Fearless Concurrency!" }
}

struct Gopher;
impl Speaker for Gopher {
    fn speak(&self) -> &'static str { "Keep it simple and fast." }
}

fn main() {
    // Dynamic dispatch collection
    let speakers: Vec<Box<dyn Speaker>> = vec![
        Box::new(Rustacean),
        Box::new(Gopher),
    ];

    for s in speakers {
        println!("Speaker says: {}", s.speak());
    }
}`,
    expectedOutput: 'Speaker says: Fearless Concurrency!\nSpeaker says: Keep it simple and fast.',
    explanation: '`dyn Trait` uses a 2-word fat pointer containing a data pointer and a pointer to the trait vtable for runtime method lookup.',
    bugChallenge: {
      title: 'Trait Not Object Safe Bug',
      description: 'Traits with methods that return Self or have generic type parameters cannot be used as dyn Trait.',
      buggyCode: `trait Cloneable {\n    fn duplicate(&self) -> Self; // BUG: Not object safe because Self size is unknown at runtime!\n}`,
      solutionCode: `trait Cloneable {\n    fn duplicate(&self) -> Box<dyn Cloneable>;\n}`,
      hint: 'Return Box<dyn Trait> instead of bare Self.',
      bugExplanation: 'Object safety requires that method signatures do not require compile-time knowledge of Self size.'
    }
  },
  {
    id: 'rust-exp-4',
    title: 'Custom Error Hierarchies with thiserror & anyhow',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Construct idiomatic, strongly-typed error enums using the standard std::error::Error trait.',
    concepts: ['Result<T, E> handling', '? operator error propagation', 'Custom Error trait implementation', 'From<T> conversion traits'],
    starterCode: `use std::fmt;

#[derive(Debug)]
enum AppError {
    NotFound(String),
    PermissionDenied,
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::NotFound(res) => write!(f, "Resource '{}' was not found", res),
            AppError::PermissionDenied => write!(f, "Unauthorized access rejected"),
        }
    }
}

impl std::error::Error for AppError {}

fn query_user(id: u32) -> Result<String, AppError> {
    if id == 42 {
        Ok(String::from("Ada Lovelace"))
    } else {
        Err(AppError::NotFound(format!("user_{}", id)))
    }
}

fn main() {
    match query_user(42) {
        Ok(name) => println!("Found: {}", name),
        Err(e) => println!("Error: {}", e),
    }
}`,
    expectedOutput: 'Found: Ada Lovelace',
    explanation: 'Rust treats errors as explicit enum values wrapped in `Result`, avoiding hidden runtime exception handling paths.',
    bugChallenge: {
      title: 'Missing From Implementation with Question Mark Operator',
      description: 'Using ? requires an automatic conversion from the source error into the destination error type.',
      buggyCode: `fn parse_num() -> Result<i32, String> {\n    let val: i32 = "invalid".parse()?; // BUG: parse returns ParseIntError, not String!\n    Ok(val)\n}`,
      solutionCode: `fn parse_num() -> Result<i32, String> {\n    let val: i32 = "invalid".parse().map_err(|e| e.to_string())?;\n    Ok(val)\n}`,
      hint: 'Use .map_err() to convert the error type before applying ?.',
      bugExplanation: '? invokes From::from; without an implementation, the types must match or be explicitly converted.'
    }
  },
  {
    id: 'rust-exp-5',
    title: 'Shared State Concurrency: Arc<Mutex<T>> & RwLock<T>',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Coordinate thread-safe mutable state across OS threads with Atomic Reference Counting and Mutex locks.',
    concepts: ['Arc<T> thread-safe atomic pointer', 'Mutex<T> mutual exclusion', 'RwLock<T> reader-writer lock', 'Poisoning handling and lock guards'],
    starterCode: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..4 {
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

    println!("Final thread-safe count: {}", *counter.lock().unwrap());
}`,
    expectedOutput: 'Final thread-safe count: 4',
    explanation: '`Arc` allows multiple threads to own shared heap data safely, while `Mutex` ensures only one thread can mutate the inner data at a time.',
    bugChallenge: {
      title: 'Using Non-Thread-Safe Rc Across Threads',
      description: 'Passing Rc<T> across thread boundaries causes a compilation error because Rc does not implement Send.',
      buggyCode: `use std::rc::Rc;\n// thread::spawn(move || { let r = rc_clone; }); // BUG: Rc<T> cannot be sent between threads safely!`,
      solutionCode: `use std::sync::Arc;\n// Arc<T> uses atomic instructions and implements Send + Sync`,
      hint: 'Replace `Rc` with `Arc` for multithreaded code.',
      bugExplanation: 'Rc uses non-atomic reference counts which corrupt when incremented concurrently across CPU cores.'
    }
  },
  {
    id: 'rust-exp-6',
    title: 'Concurrency with Crossbeam Channels (MPSC)',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Communicate across threads by message passing rather than sharing memory.',
    concepts: ['mpsc::channel (Multi-Producer Single-Consumer)', 'Bounded vs unbounded channels', 'Channel ownership transfer', 'Worker pool architecture'],
    starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec!["Pkt1", "Pkt2", "Pkt3"];
        for msg in messages {
            tx.send(msg).unwrap();
        }
    });

    let mut received_count = 0;
    for received in rx {
        println!("Received on main thread: {}", received);
        received_count += 1;
    }
    println!("Total packets processed: {}", received_count);
}`,
    expectedOutput: 'Received on main thread: Pkt1\nReceived on main thread: Pkt2\nReceived on main thread: Pkt3\nTotal packets processed: 3',
    explanation: 'Rust channels transfer ownership of sent values to the receiving thread, making data races impossible by construction.',
    bugChallenge: {
      title: 'Channel Sender Kept Open Infinite Hang Bug',
      description: 'Keeping an unused clone of tx alive on the receiving thread causes rx iteration to hang indefinitely.',
      buggyCode: `let (tx, rx) = mpsc::channel();\nlet tx2 = tx.clone();\n// BUG: tx remains alive in main scope; rx.iter() never terminates!`,
      solutionCode: `let (tx, rx) = mpsc::channel();\nlet tx2 = tx.clone();\ndrop(tx); // Close the original sender in main thread`,
      hint: 'Explicitly drop the local tx handle before iterating over rx.',
      bugExplanation: 'Channels only close when all tx sender handles have been dropped.'
    }
  },
  {
    id: 'rust-exp-7',
    title: 'Tokio Async Runtime: Tasks & Cooperative Scheduling',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Drive thousands of lightweight asynchronous tasks concurrently using the Tokio work-stealing multithreaded runtime.',
    concepts: ['Future trait & state machines', 'tokio::spawn lightweight green threads', 'tokio::select! macro', 'Async cancellation tokens'],
    starterCode: `// Conceptual model of Tokio async task execution
async fn async_worker(id: u32) -> u32 {
    id * 100
}

fn main() {
    println!("Tokio runtime initialized");
    let result = 42; // Simulation of await
    println!("Async task completed with status code: {}", result);
}`,
    expectedOutput: 'Tokio runtime initialized\nAsync task completed with status code: 42',
    explanation: 'In Rust, async/await compiles into zero-cost state machines that allocate no heap memory unless explicitly boxed.',
    bugChallenge: {
      title: 'Blocking OS Call in Async Function Bug',
      description: 'Calling synchronous std::fs or std::thread::sleep inside an async task starves other tasks on that worker thread.',
      buggyCode: `// std::thread::sleep(std::time::Duration::from_secs(1)); // BUG: starves async worker thread!`,
      solutionCode: `// tokio::time::sleep(tokio::time::Duration::from_millis(10)).await;`,
      hint: 'Use asynchronous non-blocking runtime functions instead of std equivalents.',
      bugExplanation: 'Async worker threads must yield control cooperatively; blocking the thread freezes all scheduled tasks on that core.'
    }
  },
  {
    id: 'rust-exp-8',
    title: 'Unsafe Rust: Raw Pointers, Dereferencing & FFI',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Step outside the borrow checker safely to interface with hardware registers and C foreign functions.',
    concepts: ['Raw pointers (*const T, *mut T)', 'unsafe blocks & contracts', 'Undefined Behavior in unsafe', 'Safe abstraction wrappers'],
    starterCode: `fn main() {
    let mut num = 42;
    
    // Raw pointers can be created safely
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;

    // Dereferencing raw pointers requires an unsafe block
    unsafe {
        *r2 = 100;
        println!("Value via raw pointer dereference: {}", *r1);
    }
}`,
    expectedOutput: 'Value via raw pointer dereference: 100',
    explanation: 'Unsafe Rust gives superpowers (dereferencing raw pointers, calling foreign functions) while maintaining the invariant that safe code wrapping it remains sound.',
    bugChallenge: {
      title: 'Dereferencing Null Raw Pointer Bug',
      description: 'Dereferencing a null raw pointer causes immediate Undefined Behavior and segmentation faults.',
      buggyCode: `let p: *const i32 = std::ptr::null();\n// unsafe { println!("{}", *p); } // BUG: Undefined Behavior!`,
      solutionCode: `let p: *const i32 = std::ptr::null();\nif !p.is_null() {\n    unsafe { println!("{}", *p); }\n}`,
      hint: 'Always verify !p.is_null() before dereferencing raw pointers in unsafe blocks.',
      bugExplanation: 'The compiler assumes raw pointers are non-null when dereferenced; violating this triggers UB.'
    }
  },
  {
    id: 'rust-exp-9',
    title: 'Interior Mutability: Cell<T> & RefCell<T>',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Mutate data through an immutable reference when needed using single-threaded runtime borrow checking.',
    concepts: ['Cell<T> value copying', 'RefCell<T> dynamic borrow checking', 'borrow() and borrow_mut()', 'Catching borrow violations at runtime'],
    starterCode: `use std::cell::RefCell;

struct Logger {
    msg_count: RefCell<usize>,
}

impl Logger {
    fn new() -> Self {
        Logger { msg_count: RefCell::new(0) }
    }
    // Notice &self is immutable!
    fn log(&self, msg: &str) {
        *self.msg_count.borrow_mut() += 1;
        println!("[LOG #{}] {}", *self.msg_count.borrow(), msg);
    }
}

fn main() {
    let logger = Logger::new();
    logger.log("Application booted");
    logger.log("Connected to database");
}`,
    expectedOutput: '[LOG #1] Application booted\n[LOG #2] Connected to database',
    explanation: '`RefCell<T>` defers the borrow checker rules from compile time to runtime, panicking if two mutable borrows overlap.',
    bugChallenge: {
      title: 'Runtime RefCell Already Borrowed Panic Bug',
      description: 'Holding an active borrow() while calling borrow_mut() panics at runtime.',
      buggyCode: `let c = RefCell::new(10);\nlet r1 = c.borrow();\nlet mut r2 = c.borrow_mut(); // BUG: panics! Already borrowed immutably!`,
      solutionCode: `let c = RefCell::new(10);\n{\n    let r1 = c.borrow();\n} // r1 dropped here\nlet mut r2 = c.borrow_mut();`,
      hint: 'Ensure immutable borrow guards are dropped before requesting borrow_mut.',
      bugExplanation: 'RefCell enforces the aliasing XOR mutability rule dynamically with an internal counter.'
    }
  },
  {
    id: 'rust-exp-10',
    title: 'Operator Overloading with Standard Library Traits',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Implement std::ops traits like Add, Sub, and Index to enable intuitive arithmetic on domain types.',
    concepts: ['std::ops::Add trait', 'Output associated type', 'Implementing Deref for smart wrappers', 'Drop trait for custom cleanup'],
    starterCode: `use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Vector2D {
    x: f64,
    y: f64,
}

impl Add for Vector2D {
    type Output = Self;
    fn add(self, other: Self) -> Self {
        Vector2D { x: self.x + other.x, y: self.y + other.y }
    }
}

fn main() {
    let v1 = Vector2D { x: 1.5, y: 2.0 };
    let v2 = Vector2D { x: 3.0, y: 4.5 };
    let v3 = v1 + v2;
    println!("Resulting Vector2D: x={}, y={}", v3.x, v3.y);
}`,
    expectedOutput: 'Resulting Vector2D: x=4.5, y=6.5',
    explanation: 'Operator overloading in Rust is strictly bounded by traits; you can only overload standard operators by implementing the corresponding std::ops trait.',
    bugChallenge: {
      title: 'Consuming Values During Operator Overload',
      description: 'Implementing Add on Self by value consumes the operand vectors, preventing their subsequent reuse.',
      buggyCode: `// v1 + v2; println!("{:?}", v1); // BUG: v1 was moved into add!`,
      solutionCode: `// Implement Add for &Vector2D to add by reference without moving: impl<'a, 'b> Add<&'b Vector2D> for &'a Vector2D`,
      hint: 'Implement Add for reference types (&Vector2D) to avoid moving values.',
      bugExplanation: 'Functions taking `self` by value take ownership unless implemented for references.'
    }
  },
  {
    id: 'rust-exp-11',
    title: 'Zero-Copy Deserialization with Serde & Bytes',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Borrow string and byte slices directly from the input JSON or binary payload without memory allocation.',
    concepts: ['&\'de str zero-copy deserialization', 'serde::Deserialize trait', 'Cow<\'a, str> (Clone-on-Write)', 'Alloc-free JSON processing'],
    starterCode: `// Conceptual model of Zero-Copy JSON parsing
struct UserPayload<'a> {
    username: &'a str, // Borrowed directly from raw buffer!
    age: u32,
}

fn main() {
    let raw_buffer = "{\"username\": \"ferris\", \"age\": 10}";
    // Parse without allocating new heap memory for username
    let payload = UserPayload {
        username: &raw_buffer[14..20], // Slice reference
        age: 10,
    };
    println!("Deserialized user (zero-copy): {}", payload.username);
}`,
    expectedOutput: 'Deserialized user (zero-copy): ferris',
    explanation: 'Zero-copy deserialization borrows slices directly from the source buffer, eliminating millions of allocations per second in high-throughput network services.',
    bugChallenge: {
      title: 'Escaped Characters Breaking Zero-Copy Slices',
      description: 'A JSON string with escaped characters (e.g. \\n or \\t) cannot be represented as a subslice of the input buffer without unescaping.',
      buggyCode: `// Using &'a str on JSON with \\n escapes fails without allocation`,
      solutionCode: `// Use std::borrow::Cow<'a, str> which borrows clean strings and allocates only when unescaping is required.`,
      hint: 'Use Cow<\'a, str> to handle both borrowed and allocated variants.',
      bugExplanation: 'Escaped characters must be decoded, which alters byte representations and prevents direct slicing.'
    }
  },
  {
    id: 'rust-exp-12',
    title: 'PhantomData & The Type-State Pattern',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Enforce protocol state machines at compile time using zero-sized marker types and PhantomData.',
    concepts: ['Zero Sized Types (ZST)', 'std::marker::PhantomData', 'Compile-time state transition enforcement', 'Invalid state transition prevention'],
    starterCode: `use std::marker::PhantomData;

// State marker types (zero size)
struct Disconnected;
struct Connected;

struct Connection<State> {
    host: String,
    _state: PhantomData<State>,
}

impl Connection<Disconnected> {
    fn new(host: String) -> Self {
        Connection { host, _state: PhantomData }
    }
    fn connect(self) -> Connection<Connected> {
        println!("Connected to {}", self.host);
        Connection { host: self.host, _state: PhantomData }
    }
}

impl Connection<Connected> {
    fn query(&self, sql: &str) {
        println!("Executing on {}: {}", self.host, sql);
    }
}

fn main() {
    let conn = Connection::new(String::from("db.cluster.internal"));
    let connected = conn.connect();
    connected.query("SELECT * FROM users;");
    // conn.query(...); // Rejected at compile time!
}`,
    expectedOutput: 'Connected to db.cluster.internal\nExecuting on db.cluster.internal: SELECT * FROM users;',
    explanation: 'The Type-State pattern leverages the type system to guarantee that methods can only be invoked when the object is in the appropriate lifecycle state.',
    bugChallenge: {
      title: 'Querying Disconnected Connection Bug',
      description: 'Calling query on an unestablished connection should fail during compilation, not crash at runtime.',
      buggyCode: `// let c = Connection::new(...); c.query("SELECT 1;"); // BUG: compile error!`,
      solutionCode: `let c = Connection::new(...).connect(); c.query("SELECT 1;");`,
      hint: 'Transition to the Connected state before invoking query.',
      bugExplanation: 'The method `query` only exists on `Connection<Connected>`, making errors impossible at compile time.'
    }
  },
  {
    id: 'rust-exp-13',
    title: 'Custom Derive Procedural Macros (syn & quote)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Generate boilerplate serialization, builders, and validation code at compile time using Rust token stream macros.',
    concepts: ['proc_macro crate', 'syn AST parsing', 'quote! quasi-quoting syntax', 'Derive macro registration'],
    starterCode: `// Conceptual representation of compile-time macro expansion
fn main() {
    println!("Proc Macro Engine: syn (TokenStream -> AST) -> quote (AST -> TokenStream)");
    println!("Generated code: impl Describe for MyStruct {{ ... }}");
}`,
    expectedOutput: 'Proc Macro Engine: syn (TokenStream -> AST) -> quote (AST -> TokenStream)\nGenerated code: impl Describe for MyStruct { ... }',
    explanation: 'Procedural macros operate on token streams during compilation, parsing Rust grammar into AST nodes with `syn` and generating new code with `quote!`.',
    bugChallenge: {
      title: 'Exporting Procedural Macro from Standard Library Crate Bug',
      description: 'Procedural macros must reside in their own separate crate with proc-macro = true in Cargo.toml.',
      buggyCode: `// Placing #[proc_macro_derive] inside a standard binary crate fails compilation`,
      solutionCode: `// Cargo.toml must declare:\n// [lib]\n// proc-macro = true`,
      hint: 'Declare proc-macro = true in Cargo.toml.',
      bugExplanation: 'The compiler compiles proc-macro crates as host DLLs/shared libraries loaded dynamically by rustc.'
    }
  },
  {
    id: 'rust-exp-14',
    title: 'Memory Layout: repr(C), size_of & Alignment',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Control struct field layout and padding to match C struct layouts for FFI or hardware MMIO registers.',
    concepts: ['Default Rust struct field reordering', '#[repr(C)] layout guarantee', 'std::mem::size_of & align_of', 'Cache line false sharing avoidance'],
    starterCode: `use std::mem::{size_of, align_of};

#[repr(C)]
struct HardwarePacket {
    flags: u8,
    id: u32,
    code: u16,
}

fn main() {
    println!("HardwarePacket size in bytes: {}", size_of::<HardwarePacket>());
    println!("HardwarePacket alignment: {}", align_of::<HardwarePacket>());
}`,
    expectedOutput: 'HardwarePacket size in bytes: 8\nHardwarePacket alignment: 4',
    explanation: 'Rust reorders struct fields by default to minimize padding bytes. `#[repr(C)]` disables reordering to ensure memory compatibility with C ABI.',
    bugChallenge: {
      title: 'FFI Struct Without repr(C) Memory Corruption Bug',
      description: 'Passing a standard Rust struct across C ABI causes memory corruption because field offsets differ between compilers.',
      buggyCode: `struct Packet { a: u8, b: u32 }; // BUG: Rust compiler may swap fields!`,
      solutionCode: `#[repr(C)]\nstruct Packet { a: u8, b: u32 };`,
      hint: 'Add `#[repr(C)]` attribute to foreign-interfacing structs.',
      bugExplanation: '`#[repr(C)]` forces predictable C struct layout matching the target architecture C compiler rules.'
    }
  },
  {
    id: 'rust-exp-15',
    title: 'SIMD Vectorization with std::simd',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Perform 4x, 8x, or 16x parallel numeric calculations in single CPU clock cycles with portable SIMD vectors.',
    concepts: ['Single Instruction Multiple Data (SIMD)', 'f32x4 and u32x8 lane operations', 'Hardware AVX2 & NEON intrinsics', 'Data alignment for vector registers'],
    starterCode: `fn main() {
    // Conceptual SIMD array operation
    let a = [1.0f32, 2.0, 3.0, 4.0];
    let b = [5.0f32, 6.0, 7.0, 8.0];
    let mut result = [0.0f32; 4];
    
    for i in 0..4 {
        result[i] = a[i] * b[i];
    }
    
    println!("Vectorized product lanes: {:?}", result);
}`,
    expectedOutput: 'Vectorized product lanes: [5.0, 12.0, 21.0, 32.0]',
    explanation: 'SIMD instructions load multiple values into 128-bit, 256-bit, or 512-bit registers to compute entire vector operations in single hardware cycles.',
    bugChallenge: {
      title: 'Misaligned Buffer in Native SIMD Load Bug',
      description: 'Loading unaligned pointers into aligned SIMD registers causes CPU hardware faults.',
      buggyCode: `// _mm_load_ps(unaligned_ptr); // BUG: General Protection Fault on x86!`,
      solutionCode: `// Use unaligned load: _mm_loadu_ps(unaligned_ptr); or align buffer with #[repr(align(16))]`,
      hint: 'Ensure buffers are aligned or use unaligned load instructions.',
      bugExplanation: 'Aligned vector load instructions require memory addresses to be multiples of the register width.'
    }
  },
  {
    id: 'rust-exp-16',
    title: 'Atomic Primitives & Lock-Free Data Structures',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Construct lock-free stacks and queues using atomic pointer swap and compare-and-exchange instructions.',
    concepts: ['AtomicPtr and AtomicUsize', 'compare_exchange_weak in retry loops', 'ABA problem prevention', 'Memory orders: Ordering::AcqRel'],
    starterCode: `use std::sync::atomic::{AtomicUsize, Ordering};

struct LockFreeCounter {
    val: AtomicUsize,
}

impl LockFreeCounter {
    fn new() -> Self {
        LockFreeCounter { val: AtomicUsize::new(0) }
    }
    fn increment(&self) -> usize {
        self.val.fetch_add(1, Ordering::SeqCst)
    }
}

fn main() {
    let counter = LockFreeCounter::new();
    counter.increment();
    counter.increment();
    println!("Lock-free count: {}", counter.val.load(Ordering::SeqCst));
}`,
    expectedOutput: 'Lock-free count: 2',
    explanation: 'Lock-free algorithms avoid OS context switches and priority inversion by executing compare-and-swap (CAS) loops directly on CPU registers.',
    bugChallenge: {
      title: 'Relaxed Ordering When Synchronizing Data Bug',
      description: 'Using Ordering::Relaxed to publish a pointer allows the CPU to reorder initialization after the pointer store, exposing uninitialized memory.',
      buggyCode: `// ptr.store(new_ptr, Ordering::Relaxed); // BUG: data write can be reordered after store!`,
      solutionCode: `// ptr.store(new_ptr, Ordering::Release); // Release ensures preceding writes are visible`,
      hint: 'Use Ordering::Release when writing and Ordering::Acquire when reading shared pointers.',
      bugExplanation: 'Release-Acquire pairs enforce a happens-before relationship across threads.'
    }
  },
  {
    id: 'rust-exp-17',
    title: 'Embedded Rust: no_std Environments & Bare Metal',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Write firmware for ARM Cortex-M and RISC-V microcontrollers without an operating system or standard library.',
    concepts: ['#![no_std] attribute', 'core vs std libraries', '#[panic_handler] definition', 'Volatile register reads and writes'],
    starterCode: `// Demonstration of core library utilities usable in #![no_std]
fn main() {
    // core::fmt and core::mem work with zero OS support
    let val: u32 = 0xDEADBEEF;
    let bytes = val.to_be_bytes();
    println!("Raw Big-Endian bytes: {:?}", bytes);
}`,
    expectedOutput: 'Raw Big-Endian bytes: [222, 173, 190, 239]',
    explanation: 'The `core` crate contains the core language features (Option, Result, Iterators, Atomics) without requiring heap allocation or OS syscalls.',
    bugChallenge: {
      title: 'Missing Panic Handler in no_std Binary Bug',
      description: 'Compiling a #![no_std] binary without defining a custom #[panic_handler] causes a linker failure.',
      buggyCode: `// #![no_std]\n// fn main() {} // BUG: error: #[panic_handler] function required, but not found`,
      solutionCode: `// #[panic_handler]\n// fn panic(_info: &core::panic::PanicInfo) -> ! { loop {} }`,
      hint: 'Define a diverging function marked with #[panic_handler].',
      bugExplanation: 'When std is absent, the developer must specify how the hardware responds to panics.'
    }
  },
  {
    id: 'rust-exp-18',
    title: 'Rayon Data Parallelism & Work-Stealing Iterators',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Turn standard sequential iterators into multithreaded work-stealing parallel pipelines by replacing .iter() with .par_iter().',
    concepts: ['rayon::prelude::*', '.par_iter() parallel iterators', 'Fork-join work stealing algorithm', 'Thread pool sizing'],
    starterCode: `fn main() {
    let numbers: Vec<u64> = (1..=1000).collect();
    
    // Sequential representation of parallel reduction
    let sum: u64 = numbers.iter().map(|&x| x * x).sum();
    println!("Sum of squares (Rayon pipeline): {}", sum);
}`,
    expectedOutput: 'Sum of squares (Rayon pipeline): 333833500',
    explanation: 'Rayon uses a work-stealing scheduler where idle CPU cores steal sub-slices of arrays from busy threads, providing near-linear multicore scaling.',
    bugChallenge: {
      title: 'Non-Send Type in Parallel Iterator Closure Bug',
      description: 'Passing closures that capture non-Send variables (like Rc) into .par_iter() causes compilation failure.',
      buggyCode: `// numbers.par_iter().for_each(|n| { let _ = rc.clone(); }); // BUG: Rc cannot be sent between threads!`,
      solutionCode: `// numbers.par_iter().for_each(|n| { let _ = arc.clone(); });`,
      hint: 'Ensure captured items implement Send.',
      bugExplanation: 'Parallel iteration divides work across thread pools; captured data must be Send.'
    }
  },
  {
    id: 'rust-exp-19',
    title: 'Rust WebAssembly (Wasm) & wasm-bindgen',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Compile high-performance Rust algorithms directly into WebAssembly binaries that execute at native speed in browser engines.',
    concepts: ['wasm32-unknown-unknown target', '#[wasm_bindgen] macro', 'JS to Wasm memory sharing', 'Linear memory heap passing'],
    starterCode: `// Representation of wasm-bindgen function export
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => {
            let mut a = 0;
            let mut b = 1;
            for _ in 2..=n {
                let temp = a + b;
                a = b;
                b = temp;
            }
            b
        }
    }
}

fn main() {
    println!("Wasm Exported Fibonacci(10): {}", fibonacci(10));
}`,
    expectedOutput: 'Wasm Exported Fibonacci(10): 55',
    explanation: 'Rust produces small, fast WebAssembly binaries with no garbage collection overhead, making it the premier choice for browser game engines and video processing.',
    bugChallenge: {
      title: 'Passing Complex Non-Wasm Compatible Types Across FFI Bug',
      description: 'Exporting functions with complex generic types across wasm_bindgen boundary fails because WebAssembly linear memory only supports numeric primitives.',
      buggyCode: `// #[wasm_bindgen] pub fn process(map: std::collections::HashMap<u32, String>) {} // BUG!`,
      solutionCode: `// Use serde_wasm_bindgen to serialize complex structs across the boundary.`,
      hint: 'Use `serde_wasm_bindgen` for complex data structures.',
      bugExplanation: 'Wasm FFI only natively exchanges numbers and pointers; complex types require serialization.'
    }
  },
  {
    id: 'rust-exp-20',
    title: 'Writing Safe Abstractions Over C Libraries (Bindgen)',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Auto-generate Rust FFI bindings from C header files and wrap them in idiomatic, RAII-governed safe Rust structs.',
    concepts: ['bindgen CLI tool', 'extern "C" calling convention', 'Opaque struct pointers', 'Drop trait for automatic C resource free'],
    starterCode: `// Safe Rust wrapper over hypothetical C library
struct CResource {
    handle: *mut u8,
}

impl CResource {
    fn new() -> Self {
        println!("Allocated C resource via FFI");
        CResource { handle: 0x1000 as *mut u8 }
    }
}

impl Drop for CResource {
    fn drop(&mut self) {
        println!("Invoked c_free_resource on handle {:?} (No memory leak!)", self.handle);
    }
}

fn main() {
    {
        let _res = CResource::new();
    }
    println!("Resource freed deterministically.");
}`,
    expectedOutput: 'Allocated C resource via FFI\nInvoked c_free_resource on handle 0x1000 (No memory leak!)\nResource freed deterministically.',
    explanation: 'Safe Rust abstractions encapsulate raw C pointers inside structs with `Drop`, providing memory safety while delegating implementation to high-performance C libraries.',
    bugChallenge: {
      title: 'Forgetting Drop Implementation for C Handle Bug',
      description: 'Wrapping a raw C allocation without implementing the Drop trait causes the C heap allocation to leak when the Rust struct goes out of scope.',
      buggyCode: `struct SafeC {\n    ptr: *mut c_void\n    // BUG: missing Drop trait implementation! Memory leaked forever.\n}`,
      solutionCode: `impl Drop for SafeC {\n    fn drop(&mut self) {\n        unsafe { c_free(self.ptr); }\n    }\n}`,
      hint: 'Implement `Drop` to call the C library cleanup function.',
      bugExplanation: 'Rust does not know how to free foreign C memory unless instructed inside `Drop::drop`.'
    }
  }
];
