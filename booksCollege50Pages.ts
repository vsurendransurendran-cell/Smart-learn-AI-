import { LibraryBook, LibraryPage } from '../../types';

// Helper to construct 50 comprehensive academic pages for Computer Systems
const generateSystemsPages = (): LibraryPage[] => {
  const topics = [
    // Unit 1: Foundations (Pages 1-10)
    { num: 1, title: 'Introduction to Computer Systems & The Hardware-Software Interface', 
      content: `Computer systems bridge theoretical computation and physical silicon. A modern computer system consists of hardware (CPU, registers, caches, main memory, buses, and I/O devices) orchestrated by an operating system kernel. Programs written in high-level languages like C, Rust, or Java must undergo compilation, assembly, and linking to transform human-readable logic into binary machine code instructions (opcodes and operands) executable by the processor.

Key Takeaways for College Students:
1. The Abstraction Stack: Transistors -> Logic Gates -> Microarchitecture -> Instruction Set Architecture (ISA) -> Operating System -> Runtime/Compiler -> Application.
2. The Von Neumann Architecture: Shared memory for both instructions and data, connected to the CPU via memory buses.
3. System Buses: Address bus, data bus, and control bus orchestrate transfers between the processor, memory controllers, and peripheral devices.` },
    { num: 2, title: 'Information Representation: Bits, Bytes, and Integers',
      content: `Computers represent all information as sequences of bits (binary digits 0 and 1). Eight bits form a byte, the smallest addressable unit of memory. 

Integer representations:
- Unsigned Integers: B2U(X) = sum(x_i * 2^i).
- Signed Integers (Two's Complement): B2T(X) = -x_{w-1} * 2^{w-1} + sum_{i=0}^{w-2} x_i * 2^i. Two's complement provides a unique representation for zero and enables the same ALU addition circuitry to handle both positive and negative integers.

Integer Arithmetic & Overflow:
In a w-bit integer system, arithmetic addition wraps modulo 2^w. Unsigned overflow occurs when the carry bit out of the most significant bit is 1. Signed overflow occurs when adding two positive numbers yields a negative result, or adding two negative numbers yields a positive result. Software vulnerabilities frequently arise from unchecked integer overflows.` },
    { num: 3, title: 'Floating-Point Representation & IEEE 754 Standard',
      content: `The IEEE 754 standard defines floating-point representation as: V = (-1)^s * M * 2^E.
Components:
1. Sign bit (s): Determines positive (0) or negative (1).
2. Exponent (exp): Encodes the exponent E, biased by 2^{k-1} - 1 (127 for single precision, 1023 for double precision).
3. Significand / Mantissa (frac): Encodes precision M in range [1.0, 2.0) for normalized values.

Categories of Floating-Point Values:
- Normalized: Exponent is neither all 0s nor all 1s. Implicit leading bit is 1.
- Denormalized: Exponent is all 0s. Implicit leading bit is 0, providing gradual underflow near zero.
- Special Values: Exponent all 1s. If frac == 0, represents +/- Infinity (e.g. 1.0/0.0). If frac != 0, represents NaN (Not a Number, e.g. sqrt(-1)).

Caution in Systems Code: Floating-point addition is non-associative due to rounding: (a + b) + c != a + (b + c).` },
    { num: 4, title: 'Machine-Level Representation of Programs: x86-64 and ARM64',
      content: `The Instruction Set Architecture (ISA) serves as the contract between software and hardware. In x86-64 (CISC architecture with variable-length instructions from 1 to 15 bytes), the CPU provides 16 general-purpose 64-bit registers: %rax, %rbx, %rcx, %rdx, %rsi, %rdi, %rbp, %rsp, and %r8 through %r15.

Instruction Classes:
- Data Movement: movq Source, Dest (operands can be immediate, register, or memory).
- Addressing Modes: Imm(Rb, Ri, S) computes effective address as: Imm + Reg[Rb] + (Reg[Ri] * S), where scale S in {1, 2, 4, 8}.
- Arithmetic & Logical: leaq (Load Effective Address, often used for fast pointer arithmetic and integer multiplications), addq, subq, imulq, xorq, shlq, sarq.` },
    { num: 5, title: 'Condition Codes, Control Flow, and Branch Prediction',
      content: `The CPU maintains condition code registers updated automatically by arithmetic operations:
- CF (Carry Flag): Detects unsigned overflow.
- ZF (Zero Flag): Set when the result is 0.
- SF (Sign Flag): Set when result is negative (MSB is 1).
- OF (Overflow Flag): Detects signed two's complement overflow.

Instructions cmpq b, a computes a - b and sets flags without saving the arithmetic result. Jump instructions (jmp, je, jne, jl, jg) alter the instruction pointer %rip based on flags.

Hardware Branch Prediction:
Modern deep pipelines execute 15-20 stages. When encountering a conditional jump, the CPU cannot wait for the condition to evaluate. Branch Target Buffers (BTB) and Two-Level Adaptive Predictors speculate on branch direction. A misprediction incurs a 15-20 cycle pipeline flush penalty.` },
    { num: 6, title: 'Procedures, The Call Stack, and Calling Conventions',
      content: `The x86-64 System V AMD64 ABI governs how functions call one another:
1. Argument Passing: The first 6 integer/pointer arguments are passed in registers: %rdi, %rsi, %rdx, %rcx, %r8, %r9. Excess arguments are pushed onto the stack.
2. Return Value: Returned in %rax (and %rdx if 128-bit).
3. Stack Discipline: The stack grows downward toward lower memory addresses. %rsp points to the top stack item.
4. Call / Ret: 'call label' pushes the return address (%rip + next instruction) onto the stack and jumps. 'ret' pops the return address into %rip.
5. Callee-Saved vs Caller-Saved: %rbx, %rbp, %r12-%r15 are callee-saved (a function must preserve their values before returning). All other registers are caller-saved.` },
    { num: 7, title: 'Data Layout: Arrays, Structs, Unions, and Alignment',
      content: `Memory layout rules in C/C++:
- Arrays: Contiguously allocated blocks. An array T A[N] occupies N * sizeof(T) bytes. A[i] is located at address: Base + i * sizeof(T).
- Structs: Fields are ordered sequentially. The compiler inserts padding bytes to satisfy alignment requirements.
- Alignment Rule: A primitive data type of size K bytes must have an address that is a multiple of K. For example, a 64-bit pointer (8 bytes) must be aligned to an address divisible by 8.
- Struct Packing Optimization: Declare struct fields in descending order of size (8-byte pointers first, then 4-byte ints, then 2-byte shorts, then 1-byte chars) to minimize wasted internal padding.
- Unions: All fields share the same memory location, with size equal to the largest field.` },
    { num: 8, title: 'Buffer Overflow Attacks and Stack Protection Defenses',
      content: `Buffer overflows occur when an application writes beyond allocated array boundaries into adjacent memory on the stack.

Vulnerability Anatomy:
Historically, functions like gets(), strcpy(), and sprintf() do not check bounds. An attacker supplies input exceeding the buffer, overwriting saved registers and the saved return address (%rip). When the function executes 'ret', the CPU jumps to shellcode injected by the attacker or into existing libc functions (Return-to-libc / ROP).

Modern Compiler & OS Defenses:
1. Stack Canaries: Compilers place a random canary value between local buffers and the saved return address. Before returning, the function verifies canary integrity.
2. ASLR (Address Space Layout Randomization): The kernel randomizes stack, heap, and library base addresses on every program execution.
3. NX / DEP (No-Execute / Data Execution Prevention): Marks stack and heap memory pages as non-executable.` },
    { num: 9, title: 'Linking: Relocatable Object Files and Symbol Resolution',
      content: `The Linker (ld) combines multiple relocatable object files (.o) into a single executable binary.

ELF (Executable and Linkable Format) Sections:
- .text: Machine code instructions.
- .rodata: Read-only data (string literals, jump tables).
- .data: Initialized global and static C variables.
- .bss: Uninitialized global and static variables (occupies no disk space in binary, allocated as zeroed RAM at runtime).
- .symtab: Symbol table containing defined and referenced symbols.

Symbol Resolution:
Global symbols are categorized as Strong (functions and initialized globals) or Weak (uninitialized globals).
Rule 1: Multiple strong symbols with the same name are illegal.
Rule 2: Given a strong symbol and multiple weak symbols, choose the strong symbol.
Rule 3: Given multiple weak symbols, pick any arbitrarily.` },
    { num: 10, title: 'Dynamic Linking, Shared Libraries (.so / .dll), and Position-Independent Code',
      content: `Static libraries (.a) bloat executable size and require recompilation whenever a library updates. Shared libraries (.so in Linux, .dll in Windows) resolve this by loading code into memory once and sharing it across running processes.

Position-Independent Code (PIC):
Because shared libraries can be loaded at arbitrary virtual addresses in different processes, their code (.text) must not contain absolute memory addresses.

Mechanism:
1. Global Offset Table (GOT): Stored in the writable .data section. Contains pointers to global variables. Code accesses variables via PC-relative offsets to the GOT.
2. Procedure Linkage Table (PLT): Enables lazy binding of function calls. On the first invocation of a library function (e.g. printf), the PLT invokes dynamic linker routines to resolve the real function address and writes it into the GOT.` },
    // Unit 2: Processor Architecture & Pipelines (Pages 11-20)
    { num: 11, title: 'Logic Design, Boolean Algebra, and Combinational Circuits',
      content: `Digital circuits compute using high and low voltages representing logical 1 and 0.
Boolean Operations: AND, OR, NOT, XOR, NAND, NOR.
Universal Gates: NAND and NOR gates can implement any arbitrary Boolean function.

Combinational Circuits:
Circuits whose outputs depend purely on current inputs:
- Multiplexers (MUX): Selects one of 2^k input lines based on k selection bits.
- Decoders: Asserts one of 2^k output lines corresponding to a k-bit binary input.
- Arithmetic Logic Unit (ALU): Combines adders, bitwise operators, and comparator logic, guided by ALU operation control signals.
- Ripple-Carry Adder vs Carry-Lookahead Adder (CLA): Ripple-carry propagates carries linearly O(N), whereas CLA computes carries in O(log N) depth using Generate (G = A and B) and Propagate (P = A or B) equations.` },
    { num: 12, title: 'Sequential Circuits, Flip-Flops, and Clocked Registers',
      content: `Sequential circuits possess state; their outputs depend on current inputs and past history.
- Latches: Level-sensitive storage elements (SR Latch, D Latch).
- Flip-Flops: Edge-triggered storage elements (D Flip-Flop). State transitions occur precisely on the rising or falling clock edge.
- Register Files: An array of flip-flops addressable by read and write register identifiers. A modern register file provides multiple read ports and write ports allowing simultaneous register reads and writes in a single clock cycle.

Timing Constraints:
1. Setup Time (t_setup): Input data must remain stable before the clock edge.
2. Hold Time (t_hold): Input data must remain stable after the clock edge.
Clock period T must satisfy: T >= t_propagation + t_combinational_logic + t_setup.` },
    { num: 13, title: 'Single-Cycle Datapath: Instruction Fetch, Decode, and Execution',
      content: `A non-pipelined processor executes every instruction in a single long clock cycle.

The Five Classical Datapath Stages:
1. Fetch (IF): Read instruction from memory at address stored in Program Counter (PC); increment PC by instruction length.
2. Decode (ID): Read register specifiers, fetch operand values from Register File, and sign-extend immediate fields.
3. Execute (EX): ALU computes arithmetic result, memory effective address, or branch condition.
4. Memory (MEM): Read data from memory or write data to memory if executing a load or store instruction.
5. Write-back (WB): Write result back into destination register in Register File.

The Critical Path Bottleneck:
The clock cycle duration must accommodate the slowest instruction (typically a load instruction traversing all 5 stages). Faster instructions (like register adds) waste clock time idling.` },
    { num: 14, title: 'Pipelining Fundamentals and Throughput Analysis',
      content: `Pipelining divides instruction execution into independent stages separated by pipeline registers, analogous to an industrial assembly line.

Performance Metrics:
- Latency: Time required for an individual instruction to complete from start to finish.
- Throughput: Number of instructions completed per unit time.
Under ideal conditions with K balanced stages, pipelining increases instruction throughput by a factor of K without decreasing individual instruction latency.

Pipeline Registers:
Registers placed between IF/ID, ID/EX, EX/MEM, and MEM/WB latch intermediate control and data signals on each clock edge, ensuring independent stage operation.` },
    { num: 15, title: 'Pipeline Hazards: Structural, Data, and Control',
      content: `Hazards prevent the next instruction in the stream from executing in its designated clock cycle:
1. Structural Hazards: Hardware resource conflict (e.g. single memory port attempting simultaneous instruction fetch and data read; resolved by split Harvard L1 instruction and data caches).
2. Data Hazards: An instruction depends on the result of an earlier instruction still in the pipeline.
   - RAW (Read After Write / True Dependence).
   - WAR (Write After Read / Anti-dependence).
   - WAW (Write After Write / Output dependence).
3. Control Hazards: Caused by conditional branches where the target address is not known until the execute stage.` },
    { num: 16, title: 'Data Forwarding (Bypassing) and Pipeline Stalling',
      content: `Resolving RAW Data Hazards:
Without intervention, an ALU instruction producing a result in EX must wait until WB stage (2 cycles later) before a dependent instruction in ID can read it.

Forwarding (Bypassing):
The ALU result computed in EX stage is already available at the end of the EX/MEM pipeline register. Bypassing multiplexers route this result directly to ALU inputs in the following cycle, eliminating pipeline stalls for back-to-back ALU operations.

Load-Use Hazard Stall:
For a load instruction, data is not returned from memory until the end of the MEM stage. If the immediately following instruction requires this data, hardware must insert a 1-cycle bubble (NOP stall) into the pipeline, even with forwarding.` },
    { num: 17, title: 'Dynamic Branch Prediction and Speculative Execution',
      content: `When a branch is fetched, the pipeline cannot stall 2-3 cycles waiting for target resolution.

Predictor Architectures:
- 1-Bit Predictor: Remembers previous outcome. Flips prediction on every loop termination.
- 2-Bit Saturating Counter: States: Strongly Not Taken (00), Weakly Not Taken (01), Weakly Taken (10), Strongly Taken (11). Requires two consecutive mispredictions to change prediction direction, eliminating loop exit penalties.
- Two-Level Adaptive Correlating Predictors: Combines global branch history register (BHR) with local pattern history tables (PHT).

Speculative Execution:
The CPU executes past predicted branches, buffering results in a Reorder Buffer (ROB). If the branch was predicted correctly, results commit to architectural registers in order. If mispredicted, speculative results are discarded, and the pipeline restarts from the correct path.` },
    { num: 18, title: 'Superscalar Execution and Multiple Issue Pipelines',
      content: `To achieve an Instruction Per Cycle (IPC) greater than 1, processors issue multiple instructions per clock cycle.

Approaches:
1. Static Superscalar: The compiler analyzes instruction dependencies and bundles independent instructions together (e.g. VLIW / Intel Itanium).
2. Dynamic Superscalar: Hardware dynamically discovers instruction-level parallelism (ILP) at runtime (modern Intel Core, AMD Zen, Apple M-series).

Components of an Out-of-Order Engine:
- In-Order Front-End: Fetches and decodes 4-8 instructions per cycle into micro-operations (uops).
- Register Renaming: Maps architectural registers (%rax, %rbx) to a large physical register pool (180+ registers), eliminating false WAR and WAW hazards.
- Reservation Stations / Issue Queues: Hold instructions until operands are ready.
- Out-of-Order Execution: Dispatches uops to ALUs, vector units, and memory ports as soon as inputs arrive.` },
    { num: 19, title: 'Instruction-Level Parallelism (ILP) and Limits',
      content: `Instruction-Level Parallelism (ILP) is constrained by fundamental algorithmic dependencies.

Limits on ILP:
- True Data Dependencies (RAW chains): Sequential dependency chains cannot be computed in parallel: x = a + b; y = x * c; z = y - d.
- Control Dependencies: Unpredictable branches limit the window of instructions that can be safely scheduled.
- Memory Disambiguation: The CPU cannot determine if load [rax] depends on previous store [rbx] until both pointer addresses are evaluated.

Loop Unrolling:
Compilers unroll loops to expose ILP across iterations. By duplicating loop bodies and using distinct temporary variables, compilers allow out-of-order execution units to overlap operations across multiple loop iterations.` },
    { num: 20, title: 'SIMD Vector Processing and AVX / NEON Architectures',
      content: `Flynn's Taxonomy classifies computer architectures into SISD, SIMD, MISD, and MIMD.

SIMD (Single Instruction, Multiple Data):
A single vector instruction performs the same mathematical operation across wide vector registers containing multiple packed data elements.
- Intel AVX-512: 512-bit ZMM registers process 16 single-precision floats or 8 double-precision floats in a single clock cycle.
- ARM NEON: 128-bit vector registers standard on mobile and server silicon.

Applications:
- Audio/Video encoding (FFmpeg).
- Machine learning matrix multiplication (GEMM).
- Cryptographic hashing (AES-NI, SHA extensions).
Vectorization speedup can approach 8x-16x for embarrassingly parallel loops with aligned memory access.` },
    // Unit 3: Memory Hierarchy & Caching (Pages 21-30)
    { num: 21, title: 'The Memory Hierarchy: SRAM, DRAM, and Disks',
      content: `Memory systems are governed by physical trade-offs: smaller, faster technologies are expensive and power-hungry; larger technologies are slow and cheap.

Hierarchy Tiers:
1. CPU Registers: 0.5 ns, ~1 KB.
2. L1 Cache: SRAM, 1 ns, 32-64 KB per core.
3. L2 Cache: SRAM, 3-5 ns, 512 KB - 1 MB per core.
4. L3 Cache: SRAM (Shared), 10-15 ns, 16-96 MB.
5. Main Memory: DRAM, 50-80 ns, 16-128 GB.
6. NVMe SSD: Flash NAND, 10-50 microseconds, 1-4 TB.
7. Hard Disk: Magnetic platter, 5-10 milliseconds, 8-24 TB.

The Principle of Locality:
- Temporal Locality: Memory locations accessed recently are likely to be accessed again in the near future (e.g. loop counters, local variables).
- Spatial Locality: Memory locations near recently accessed addresses are likely to be accessed soon (e.g. sequential array traversals).` },
    { num: 22, title: 'SRAM vs DRAM: Transistor Cells and Refresh Overhead',
      content: `Comparing Primary Semiconductor Technologies:

Static RAM (SRAM):
- Cell Structure: Uses a 6-transistor (6T) bistable latch circuit.
- Operation: Holds state indefinitely as long as power is supplied. Fast access times (sub-nanosecond).
- Disadvantages: Low density (large silicon area per bit) and high manufacturing cost. Used exclusively for L1, L2, and L3 on-chip processor caches.

Dynamic RAM (DRAM):
- Cell Structure: 1 transistor and 1 capacitor (1T-1C).
- Operation: Stores bit as an electrical charge in a microscopic capacitor.
- The Leakage Problem: Capacitors lose charge within tens of milliseconds. DRAM memory controllers must continuously execute periodic refresh cycles (reading and restoring charge row-by-row), consuming memory bus bandwidth and introducing latency spikes.` },
    { num: 23, title: 'Cache Architecture: Direct Mapped, Set Associative, and Fully Associative',
      content: `A cache is organized into S = 2^s cache sets, each containing E cache lines. Each cache line stores a block of B = 2^b data bytes, a Valid bit, and a Tag of t = m - (s + b) bits.

Address Decomposition:
A virtual/physical address of m bits is partitioned into three fields:
1. Tag (t bits): Identifies whether the cached block matches the requested memory address.
2. Set Index (s bits): Selects which cache set contains the block.
3. Block Offset (b bits): Selects the specific byte within the B-byte cache line.

Associativity Categories:
- Direct Mapped (E = 1): Each memory block maps to exactly one cache line. Fast lookup, but suffers from conflict misses if two frequently accessed addresses map to the same set.
- Set Associative (E > 1, typically E = 8 or 16): Each block maps to a set with E lines. Mitigates conflict misses.
- Fully Associative (S = 1): Any block can reside in any cache line. Requires parallel comparison across all tags; used for small caches like the TLB.` },
    { num: 24, title: 'Cache Misses: The 3 Cs and Replacement Policies',
      content: `Cache misses fall into three fundamental classes (Mark Hill's 3 Cs model):
1. Compulsory (Cold) Misses: First access to a memory block. Unavoidable unless hardware prefetching predicts the access.
2. Capacity Misses: Working set size of the active program exceeds total cache size.
3. Conflict Misses: Multiple memory blocks map to the same set, evicting each other even when overall cache capacity has free lines elsewhere.

Replacement Policies (when set is full):
- Least Recently Used (LRU): Evicts the line that has not been accessed for the longest time. Requires timestamp or matrix tracking hardware.
- Pseudo-LRU (Tree-PLRU): Approximates LRU using a binary decision tree of single-bit flags.
- Random Replacement: Uniformly picks a line to evict. Simple hardware, competitive under heavy memory pressure.` },
    { num: 25, title: 'Write Policies: Write-Through vs Write-Back, Allocate vs No-Allocate',
      content: `Handling Cache Writes:

On a Cache Hit:
- Write-Through: Immediately writes updated data to both the cache and lower memory levels. Simple, but saturates memory bus bandwidth.
- Write-Back: Updates only the cache line and marks a 'Dirty' bit. The data is written to lower memory only when the dirty cache line is evicted. Minimizes bus traffic dramatically.

On a Cache Miss:
- Write-Allocate: Loads the missing block into cache from lower memory, then executes the write. Typically paired with Write-Back.
- No-Write-Allocate: Writes directly to lower memory without loading into cache. Typically paired with Write-Through.

Write Buffers:
Between cache and memory, CPUs employ Write Buffers to queue outgoing write requests, allowing CPU execution to continue without waiting for memory writes to complete.` },
    { num: 26, title: 'Cache-Friendly Code and Matrix Multiplication Optimization',
      content: `Writing high-performance code requires designing algorithms around cache line sizes (typically 64 bytes).

Row-Major vs Column-Major:
In C/C++, 2D arrays are stored in row-major order: row 0 elements are contiguous, followed by row 1. Traversing array[i][j] sequentially accesses adjacent memory addresses, yielding 1 cache miss every 64 / sizeof(T) elements (stride-1 access). Traversing array[j][i] jumps across entire row strides, incurring a cache miss on almost every access!

Matrix Multiplication Tiling (Blocking):
Standard O(N^3) multiplication suffers high cache misses on large matrices. Tiling partitions matrices into sub-blocks of size B x B chosen such that three B x B blocks fit into L1 cache simultaneously. This achieves spatial and temporal cache reuse, speeding up matrix multiplication by 4x to 10x.` },
    { num: 27, title: 'Cache Coherence Protocols: MSI and MESI',
      content: `In multi-core processors, each core possesses private L1 and L2 caches. If Core 0 writes to variable X in its private cache, Core 1's cache copy becomes stale unless coordinated.

Snooping Bus Protocols:
Caches monitor (snoop) transactions broadcast across the shared memory interconnect.

MESI Protocol States:
1. Modified (M): Cache line is present only in current cache and is dirty (memory is stale). Current core has exclusive write permission.
2. Exclusive (E): Cache line is present only in current cache and is clean (matches memory).
3. Shared (S): Cache line is present in multiple caches and is clean. Read-only.
4. Invalid (I): Cache line contains invalid/stale data.

False Sharing:
Occurs when two threads on separate cores modify independent variables that happen to reside in the same 64-byte cache line. The cache line bounces between cores in Invalid/Modified states, degrading multi-threaded throughput.` },
    { num: 28, title: 'Memory Ordering, Atomics, and Memory Barriers',
      content: `Modern out-of-order processors and optimizing compilers reorder memory read and write operations to maximize pipeline throughput, as long as single-threaded program correctness is preserved.

Multi-Threaded Memory Anomaly:
Consider two threads:
Thread 1: X = 1; r1 = Y;
Thread 2: Y = 1; r2 = X;
On x86 (which permits Store-Load reordering), it is physically possible for both r1 == 0 and r2 == 0 simultaneously at runtime!

Memory Fences & Atomics:
- MFENCE / SFENCE / LFENCE: x86 instructions preventing reordering across boundary lines.
- Hardware Atomics: LOCK cmpxchg instruction locks the cache line via MESI protocol, performing an atomic read-modify-write without inter-core race conditions.
- C++11 std::atomic memory orders: memory_order_relaxed, memory_order_acquire, memory_order_release, memory_order_seq_cst.` },
    { num: 29, title: 'Non-Uniform Memory Access (NUMA) Architecture',
      content: `In multi-socket servers, connecting dozens of CPU cores to a single centralized memory controller creates severe memory bus contention.

NUMA Architecture:
Physical memory is partitioned across sockets. Each processor socket has local memory controllers and directly attached RAM modules. Sockets communicate over high-speed coherent interconnects (e.g. Intel UPI, AMD Infinity Fabric).

Latency Characteristics:
- Local Access: Core accessing memory on its own socket (~60-80 ns).
- Remote Access: Core accessing memory attached to a different socket via interconnect (~120-180 ns).

Operating System NUMA Policies:
Linux provides 'numactl' to bind memory allocations to the same NUMA node as executing threads (local allocation policy), avoiding remote interconnect saturation in high-throughput databases.` },
    { num: 30, title: 'Hardware Prefetching and Stream Buffers',
      content: `Memory latency remains the primary bottleneck for data-intensive workloads. Hardware prefetchers detect access patterns and load cache lines from DRAM before the CPU explicitly requests them.

Prefetcher Types:
- Next-Line Prefetcher: On a cache miss at line L, automatically fetches line L + 1.
- Stream / Stride Prefetcher: Monitors miss addresses. If it detects a constant stride (e.g. L, L+4, L+8), it prefetches future addresses in that trajectory.
- Pointer / Correlation Prefetcher: Predicts pointer-chasing traversals in linked data structures.

Software Prefetching:
Compilers and developers can insert explicit prefetch instructions (e.g. __builtin_prefetch(&array[i + 16])) in loops to mask memory fetch latency without stalling computation pipelines.` },
    // Unit 4: Virtual Memory & Operating System Systems Programming (Pages 31-40)
    { num: 31, title: 'Virtual Memory Motivation: Protection, Isolation, and Sharing',
      content: `Virtual memory provides an essential hardware-software abstraction: every process runs in an illusion of possessing a private, contiguous address space (e.g. 256 Terabytes in 64-bit systems), regardless of physical RAM fragmentation.

Core Objectives:
1. Efficient Memory Utilization: Main memory acts as a cache for disk-backed virtual address spaces. Unused pages remain unallocated.
2. Process Isolation & Protection: A buggy or malicious process cannot read or corrupt memory belonging to another process or kernel space.
3. Simplified Memory Management: Linkers generate uniform code starting at fixed addresses (e.g. 0x400000) without knowledge of physical RAM placement.
4. Shared Memory: Read-only physical pages (e.g. libc.so code) are mapped into multiple process address spaces simultaneously.` },
    { num: 32, title: 'Paging Architecture: Page Tables and Address Translation',
      content: `Virtual and physical memory are divided into fixed-size blocks called Pages (typically 4 KB = 2^12 bytes).
A Virtual Address (VA) is partitioned into:
- Virtual Page Number (VPN): Used to index into the page table.
- Virtual Page Offset (VPO): Exact byte offset within the page (identical to Physical Page Offset PPO).

Memory Management Unit (MMU):
Hardware within the CPU that translates VPN to Physical Page Number (PPN) using page table entries (PTEs).

Page Table Entry (PTE) Flags:
- Present / Valid Bit: 1 if page resides in physical RAM; 0 if swapped to disk or unallocated.
- Read / Write (R/W) Bit: Enforces write protection.
- User / Supervisor (U/S) Bit: Prevents user-mode code from accessing kernel pages.
- Dirty Bit: Set by hardware whenever a write to the page occurs.
- Accessed / Reference Bit: Set on read or write, used by OS page replacement algorithms.` },
    { num: 33, title: 'Multi-Level Page Tables in 64-bit Architectures',
      content: `A flat single-level page table for a 64-bit address space would require billions of gigabytes just to store page pointers. Multi-level page tables solve this by organizing page tables hierarchically into trees.

x86-64 Four-Level Page Table (48-bit Virtual Address):
Virtual address consists of:
- 16 sign-extended bits.
- 9 bits: PML4 (Page Map Level 4) index.
- 9 bits: PDP (Page Directory Pointer) index.
- 9 bits: PD (Page Directory) index.
- 9 bits: PT (Page Table) index.
- 12 bits: Page offset (4 KB page).

The CR3 Control Register:
Stores the physical address of the current process's PML4 root page table. On context switch, updating CR3 switches the active virtual address space.
Unallocated memory regions require no intermediate tables, saving gigabytes of physical RAM.` },
    { num: 34, title: 'The Translation Lookaside Buffer (TLB) and Page Walkers',
      content: `Traversing a 4-level page table requires 4 consecutive memory accesses for every single instruction fetch or data load, degrading execution speed by 400%.

The TLB Solution:
The TLB is an on-chip associative cache inside the MMU that stores recently translated VPN -> PPN mappings.
- TLB Hit: Translation resolves in < 1 clock cycle.
- TLB Miss: Hardware Page Table Walker traverses the multi-level page table in memory, fills the TLB line, and retries the instruction.

Address Space Identifiers (ASID) / PCID:
Historically, context switching required flushing the entire TLB (costly cold misses). Process Context Identifiers (PCID) tag TLB entries with a process ID, allowing TLB entries from multiple processes to coexist across context switches.` },
    { num: 35, title: 'Page Faults, Demand Paging, and Swap Space',
      content: `When the MMU encounters a PTE with Valid Bit = 0, hardware generates an interrupt: a Page Fault (Exception 14).

Page Fault Handling Sequence:
1. CPU traps into kernel mode, saving program state. The faulting virtual address is saved in register CR2.
2. Kernel validates address legality against process vm_area_struct records. If address is invalid, kernel sends SIGSEGV.
3. If legal (Demand Paging), kernel allocates an empty physical page frame from the buddy allocator.
4. Kernel issues disk I/O to read page contents from disk/swap into the allocated physical page.
5. Kernel updates PTE with new PPN, sets Valid Bit = 1, and clears Dirty Bit.
6. Return from exception: CPU restarts the exact faulting instruction; this time, the TLB translates successfully.` },
    { num: 36, title: 'Memory Allocation: sbrk, mmap, and User-Space Allocators (malloc)',
      content: `Processes manage heap memory via kernel system calls:
- brk() / sbrk(): Expands the top of the heap break pointer.
- mmap(): Maps anonymous memory pages directly from the kernel for large allocations (> 128 KB in glibc).

User-Space Dynamic Allocator (malloc/free) Mechanics:
System calls are too slow to invoke on every small 16-byte object allocation. Libraries (ptmalloc, jemalloc, tcmalloc) pre-allocate memory pools and manage free lists in user space:
- Boundary Tags & Knuth Coalescing: Adds headers and footers to memory blocks so adjacent freed blocks can coalesce in O(1) time without heap fragmentation.
- Segregated Free Lists: Separate size-class bins for small allocations (8, 16, 32, 64 bytes) to satisfy requests with zero search overhead.
- Thread-Caching (tcmalloc): Thread-local memory arenas avoid mutex contention across concurrent threads.` },
    { num: 37, title: 'System-Level I/O: Unix File Descriptors and Open File Tables',
      content: `Unix fundamental philosophy: "Everything is a file". All I/O devices (disks, terminals, networks, pipes) are modeled as byte streams accessed via system calls: open, read, write, close, lseek.

Kernel I/O Data Structures:
1. Descriptor Table (Per-Process): Array of file descriptor indices (0 = stdin, 1 = stdout, 2 = stderr). Each entry points to an Open File Table entry.
2. Open File Table (System-Wide): Shared across all processes. Tracks the current file position offset, reference count, and access mode (read/write).
3. V-node / Inode Table (System-Wide): Tracks physical file metadata, file size, access permissions, and pointers to physical disk blocks.

Sharing Mechanics:
When fork() is called, the child inherits duplicate descriptor tables pointing to the exact same Open File Table entries, sharing file offsets with the parent process.` },
    { num: 38, title: 'I/O Multiplexing: select, poll, and epoll',
      content: `High-concurrency servers must monitor thousands of client socket connections without spawning a dedicated thread per connection (the C10K problem).

Evolution of I/O Multiplexing:
- select(): Takes fixed-size bitmasks (FD_SETSIZE = 1024). Incurs O(N) kernel scanning overhead on every invocation.
- poll(): Uses an array of pollfd structures, removing the 1024 limit, but still scales O(N).
- epoll (Linux): Scales O(1) with active connections using event-driven kernel callbacks.
  1. epoll_create(): Creates an in-kernel event poll object (Red-Black tree of watched descriptors and a ready list).
  2. epoll_ctl(): Adds/removes sockets from the Red-Black tree.
  3. epoll_wait(): Blocks until events arrive on the ready list.

Level-Triggered vs Edge-Triggered:
- Level-Triggered (LT): epoll_wait notifies repeatedly as long as data remains in socket buffer.
- Edge-Triggered (ET): Notifies only when state changes from unready to ready. Requires non-blocking sockets and reading until EAGAIN.` },
    { num: 39, title: 'Signals, Signal Handlers, and Async-Signal Safety',
      content: `A Unix signal is a software interrupt notifying a process of an asynchronous system event (e.g. SIGINT, SIGTERM, SIGSEGV, SIGCHLD).

Signal Mechanics:
1. Sending: Kernel updates a bit in the pending signal bitmask of the target process.
2. Delivery: When the kernel transitions execution back to user mode, it checks pending and unblocked signal masks.
3. Handling: Default action (terminate, ignore, dump core) or execution of a custom user signal handler.

Async-Signal-Safe Functions:
A signal handler can interrupt execution between ANY two assembly instructions, including inside a malloc() call holding an internal heap mutex. If the signal handler calls malloc(), it deadlocks itself!
Only async-signal-safe functions (e.g. write, _exit) can be safely invoked inside signal handlers. Standard I/O functions like printf() are NOT async-signal-safe.` },
    { num: 40, title: 'Inter-Process Communication: POSIX Pipes, FIFOs, and Shared Memory',
      content: `Processes have isolated virtual memory spaces. IPC mechanisms enable structured communication across boundaries:

1. Anonymous Pipes: Unidirectional byte stream connecting related processes (parent-child). Created via pipe(int fd[2]). Data resides in kernel buffer ring.
2. Named Pipes (FIFOs): Created on the file system via mkfifo(). Allows unrelated processes to communicate using standard file I/O operations.
3. POSIX Shared Memory (shm_open / mmap): Multiple processes map the exact same physical memory pages into their respective virtual address spaces. Provides maximum throughput (zero copy), but requires explicit synchronization (semaphores, mutexes) to avoid race conditions.
4. Domain Sockets (AF_UNIX): Bidirectional socket communication over kernel buffers, avoiding TCP/IP network stack encapsulation overhead.` },
    // Unit 5: Concurrent Network Programming & Security (Pages 41-50)
    { num: 41, title: 'The Network Protocol Stack: OSI and TCP/IP Models',
      content: `Network programming requires understanding how data moves from user applications across physical media.

TCP/IP Model Layers:
1. Application Layer (HTTP, SSH, DNS, gRPC): Defines message formats and protocols.
2. Transport Layer (TCP, UDP):
   - TCP: Connection-oriented, reliable, in-order byte stream, flow control, congestion control.
   - UDP: Connectionless, unreliable datagrams, minimal overhead, low latency (used for DNS, gaming, real-time video).
3. Internet Layer (IP): Logical addressing (IPv4, IPv6) and routing across heterogeneous networks.
4. Link Layer (Ethernet, Wi-Fi): Framing, MAC addressing, and physical transmission across local network links.

Encapsulation & Decapsulation:
As data travels down the stack, each layer appends its header (TCP header -> IP header -> Ethernet frame). At the receiver, each layer strips its header.` },
    { num: 42, title: 'The Sockets API: socket, bind, listen, accept, and connect',
      content: `A socket is an endpoint for network communication represented by a file descriptor.

Server Workflow:
1. socket(AF_INET, SOCK_STREAM, 0): Creates an endpoint.
2. bind(sockfd, ...): Binds the socket to an IP address and port number.
3. listen(sockfd, backlog): Puts the socket into passive listening mode. The backlog specifies the length of the pending connection queue.
4. accept(sockfd, ...): Blocks until an incoming TCP connection arrives. Returns a NEW connected socket descriptor used for client data exchange.

Client Workflow:
1. socket(): Creates an active socket descriptor.
2. connect(sockfd, ...): Initiates the TCP 3-way handshake with the listening server.

Byte Ordering (Endianness):
Network protocols use Big-Endian (Network Byte Order). Host architectures (like x86) often use Little-Endian. Sockets code must convert port and IP representations using htons(), htonl(), ntohs(), and ntohl().` },
    { num: 43, title: 'Concurrent Server Architectures: Multi-Process, Multi-Thread, and Event Loops',
      content: `Architectural models for handling concurrent network connections:

1. Process-per-Connection:
Server calls fork() for each incoming client. Highly isolated (one client crash doesn't affect others), but process creation overhead and context switching degrade scalability beyond a few hundred clients.

2. Thread-per-Connection:
Server spawns a POSIX thread (pthread_create) per client. Lower memory footprint and faster context switches than processes, but stacks consume memory (e.g. 8 MB default) and thread synchronization overhead limits scale to thousands of clients.

3. Event-Driven Reactor Pattern (Node.js, Nginx, Netty):
A small pool of worker threads uses I/O multiplexing (epoll/kqueue) to manage tens of thousands of active connections on a single non-blocking event loop. CPU utilization remains near 100% with negligible context switch overhead.` },
    { num: 44, title: 'Synchronization Primitives: Mutexes, Condition Variables, and Semaphores',
      content: `Concurrent multi-threaded programs require synchronization to protect shared data structures:

1. Mutex (Mutual Exclusion):
Guarantees that only one thread can execute within a Critical Section at any time. A thread calls pthread_mutex_lock(); other threads block until pthread_mutex_unlock().

2. Condition Variables:
Allows threads to suspend execution until a specific predicate becomes true. A thread holding a mutex calls pthread_cond_wait(&cond, &mutex), which atomically releases the mutex and sleeps. When another thread modifies state, it calls pthread_cond_signal() or broadcast(). Always wrap condition waits in a 'while' loop to protect against spurious wakeups!

3. Counting Semaphores (Dijkstra):
Maintains an integer counter. sem_wait() decrements the counter (blocking if counter <= 0); sem_post() increments the counter. Ideal for managing finite resource pools.` },
    { num: 45, title: 'Deadlock: Conditions, Prevention, and Coffman Analysis',
      content: `A deadlock occurs when a set of threads are blocked because each thread holds a resource and waits for another resource held by another thread.

The Four Coffman Conditions (All must hold simultaneously for deadlock):
1. Mutual Exclusion: Resources cannot be shared; only one thread holds a resource at a time.
2. Hold and Wait: A thread holding resources can request additional resources.
3. No Preemption: Resources cannot be forcibly confiscated from a thread.
4. Circular Wait: A closed chain of threads exists where Thread 0 waits for Thread 1, Thread 1 waits for Thread 2, ..., and Thread N waits for Thread 0.

Deadlock Prevention via Lock Ordering:
Impose a strict global ordering on all locks (e.g. Lock 1 < Lock 2 < Lock 3). All threads must acquire locks in strictly ascending numerical order. This mathematically breaks the Circular Wait condition, making deadlock impossible.` },
    { num: 46, title: 'Thread-Safe Data Structures: Lock-Free Programming and CAS',
      content: `Traditional lock-based synchronization suffers from priority inversion, convoying, and thread descheduling overhead.

Lock-Free Programming:
An algorithm is lock-free if at least one thread is guaranteed to make progress in a finite number of steps, even if other threads are stalled.

Compare-And-Swap (CAS) Loop:
The foundation of lock-free data structures. CAS(address, expected, desired) atomically checks if *address == expected; if true, it writes desired and returns true.
Pattern:
do {
  old_head = head.load();
  new_node->next = old_head;
} while (!head.compare_exchange_weak(old_head, new_node));

The ABA Problem:
A thread reads value A. Another thread changes A to B, then back to A. CAS succeeds, but data invariants may be corrupted. Resolved using Tagged Pointers / Versioned Counters where each pointer write increments an associated version tag.` },
    { num: 47, title: 'Hardware Security: Meltdown, Spectre, and Transient Execution Attacks',
      content: `In 2018, researchers discovered that speculative execution and hardware branch prediction can leak confidential data across protection boundaries.

Spectre (Bounds Check Bypass - Variant 1):
Attacker trains branch predictor on valid array bounds. Attacker then passes out-of-bounds index. The CPU speculatively loads secret memory at unauthorized address and uses it as an index into a secondary probe array before the bounds check instruction completes. The speculative result is discarded, but the probe array line remains resident in L1 cache! Attacker measures access latency to detect which cache line was hit, recovering the secret byte.

Meltdown (Rogue Data Load):
Directly read kernel memory speculatively before CPU privilege check exceptions retire.

Mitigations:
KPTI (Kernel Page Table Isolation), Speculative Execution Barriers (LFENCE), Retpoline, and hardware architectural fixes in modern silicon.` },
    { num: 48, title: 'Network Security: TLS / SSL Cryptographic Handshakes',
      content: `Transport Layer Security (TLS 1.3) protects network communication against eavesdropping, tampering, and message forgery.

Key Cryptographic Concepts:
- Asymmetric Encryption (RSA, ECC): Used during handshakes for authentication and key agreement.
- Symmetric Encryption (AES-GCM, ChaCha20-Poly1305): Used for high-throughput bulk data encryption.
- Cryptographic Hashes (SHA-256): Ensures data integrity.

TLS 1.3 Handshake (1-RTT):
1. ClientHello: Client sends supported cipher suites and key share (Diffie-Hellman ephemeral public key).
2. ServerHello: Server selects cipher suite, sends its public key share and X.509 digital certificate.
3. Master Secret Derivation: Both parties derive symmetric session keys via ECDHE.
4. Encrypted Communication: Application data flows over encrypted channel with forward secrecy.` },
    { num: 49, title: 'Systems Profiling: Flamegraphs, perf, and eBPF Tracing',
      content: `Optimizing software requires empirical measurement, not guesswork.

Systems Profiling Tools:
1. Linux perf: Utilizes hardware Performance Monitoring Counters (PMCs) to sample instructions, CPU cycles, cache misses, and branch mispredictions.
2. Flamegraphs (Brendan Gregg): Visualizes CPU sampling call stacks. The X-axis represents population percentage (alphabetically sorted, not time), and the Y-axis represents stack depth. Wide boxes identify CPU-intensive functions.
3. Extended Berkeley Packet Filter (eBPF):
Allows running sandboxed bytecode inside the Linux kernel without recompiling or loading risky kernel modules. eBPF hooks into kernel tracepoints, kprobes, and uprobes to observe system calls, disk latency, and packet drops with near-zero overhead.` },
    { num: 50, title: 'Capstone Systems Synthesis: Building Resilient, High-Throughput Engines',
      content: `Mastering computer systems is the ultimate synthesis of hardware awareness, algorithmic efficiency, and operating system mastery.

Core Principles for Senior Systems Engineers:
1. Respect the Hardware: Write cache-friendly algorithms, avoid false sharing, and utilize SIMD vectorization.
2. Minimize System Call Overhead: Amortize user-kernel transitions using user-space ring buffers (io_uring) and batched network operations.
3. Design for Failure: Implement circuit breakers, timeouts, and bounded queues to prevent cascade failures.
4. Measure Before Optimizing: Use eBPF and hardware performance counters to locate real architectural bottlenecks.

Review Questions & Capstone Exercises:
- Trace a 64-bit virtual memory address translation through a 4-level page table down to cache tag matching.
- Implement an epoll-based HTTP server utilizing non-blocking sockets, zero-copy sendfile, and worker thread pools.
- Analyze how speculative execution mitigations impact overall CPU IPC and throughput.` }
  ];

  return topics.map(t => ({
    pageNumber: t.num,
    title: `Page ${t.num}: ${t.title}`,
    content: t.content
  }));
};

// Generate 50 pages for Database Systems
const generateDbmsPages = (): LibraryPage[] => {
  const topics = [
    // Unit 1: Storage Engines & Page Formats (Pages 1-10)
    { num: 1, title: 'Database System Architecture & The Relational Model',
      content: `Relational Database Management Systems (RDBMS) are engineered to provide efficient, reliable, and concurrent management of structured data. Formulated by Edgar F. Codd in 1970, the relational model abstracts data into relations (tables) composed of tuples (rows) and attributes (columns).

The Classic DBMS Architectural Components:
1. Query Parser & Compiler: Parses SQL text into Abstract Syntax Trees (AST) and validates semantics against the system catalog.
2. Query Optimizer: Generates candidate relational algebra plans and selects the lowest-cost execution plan based on table statistics.
3. Execution Engine: Executes query plan operators using volcano iterator models or vectorized batch pipelines.
4. Storage Engine: Manages page layouts, row serialization, and disk I/O.
5. Buffer Pool Manager: Caches disk pages in RAM to reduce physical storage latency.
6. Transaction & Concurrency Manager: Enforces ACID guarantees via locks, latches, and Write-Ahead Logging.` },
    { num: 2, title: 'Disk Storage Architecture and Slotted-Page Layout',
      content: `Database storage engines organize data into fixed-size Pages (typically 4 KB to 16 KB) matching OS block boundaries.

The Slotted-Page Architecture:
Because rows often have variable lengths (VARCHAR, TEXT), storing rows sequentially causes painful internal fragmentation when rows are updated or deleted.

Page Structure:
- Page Header: Contains page LSN (Log Sequence Number), free space pointer, and slot count.
- Slot Array (Grows forward from start of page): Array of offsets pointing to the start of each row.
- Free Space: Middle gap between slot array and data rows.
- Data Rows (Grows backward from end of page): Actual serialized column bytes.

Row Identifier (Record ID / RID):
An RID is a tuple of (Page_ID, Slot_Number). If a row is modified or moved within the page, only its offset in the slot array is updated; external index pointers (RIDs) remain unchanged!` },
    { num: 3, title: 'Tuple Serialization, Data Formats, and Alignment',
      content: `How rows are serialized into raw byte arrays:

Tuple Header:
- Null Bitmap: Compact bitmask where bit i = 1 indicates column i is NULL, avoiding storing null bytes.
- Transaction Metadata: Created transaction ID (xmin), deleted transaction ID (xmax), and commit flags used by MVCC.

Fixed-Length vs Variable-Length Columns:
Fixed-length columns (INT4, BIGINT, FLOAT8, TIMESTAMP) are placed at predictable offsets at the start of the payload. Variable-length attributes (VARCHAR, BLOB) are stored at the end of the tuple, preceded by a length header.

Word Alignment:
Similar to CPU struct layouts, column attributes are aligned to their natural size (e.g. 8-byte integers start on byte offsets divisible by 8) to enable single-cycle memory reads by the CPU.` },
    { num: 4, title: 'Row-Oriented (NSM) vs Columnar (DSM) Storage Models',
      content: `Selecting the physical data organization determines analytical and transactional performance:

1. N-ary Storage Model (NSM / Row Store):
Stores all attributes of a single tuple contiguously on the same page.
- Best For: OLTP (Online Transaction Processing). Fast point lookups (SELECT * WHERE id = ?) and single-row inserts/updates.
- Problem for Analytics: Queries like 'SELECT AVG(salary) FROM employees' must read the entire employee table into cache, wasting 95% of memory bandwidth on unused columns.

2. Decomposition Storage Model (DSM / Column Store):
Stores all values of a single column contiguously across dedicated pages (e.g. Parquet, ClickHouse, Amazon Redshift).
- Best For: OLAP (Online Analytical Processing). Reads only the specific columns needed for aggregations.
- Compression Benefit: Adjacent column values share identical types and low entropy, achieving 5x-10x compression ratios via Run-Length Encoding (RLE) and Dictionary encoding.` },
    { num: 5, title: 'The Buffer Pool Manager and Frame Tables',
      content: `The Buffer Pool is a dedicated allocation of RAM managed directly by the DBMS to cache disk pages.

Components:
1. Frame Array: Contiguous memory partitioned into fixed-size frames matching page sizes.
2. Page Table: Hash map translating Page_ID -> Frame_ID.
3. Dirty Flags & Pin Counters:
   - Pin Count: Number of active query threads currently reading/writing the page. A page with Pin Count > 0 cannot be evicted.
   - Dirty Bit: 1 if page was modified in RAM; requires writing to disk before eviction.

Why DBMS Avoids OS Page Caches:
The OS kernel does not know DBMS query plans or transactional requirements. The DBMS must control exact page eviction and guarantee that write-ahead log records hit disk BEFORE dirty data pages are flushed.` },
    { num: 6, title: 'Buffer Pool Eviction Policies: LRU, Clock, and 2Q',
      content: `When all buffer pool frames are full and a new page is requested, the manager must evict an unpinned frame:

1. LRU (Least Recently Used):
Tracks access timestamps. High synchronization overhead on multi-core servers because every page read acquires a lock to update the LRU list.

2. Clock Algorithm (Second-Chance):
Approximates LRU with low overhead. Frames are arranged in a circular buffer with a sweeping hand. Each frame has a Usage Bit.
- If hand points to frame with Usage Bit = 1, clear bit to 0 and advance hand.
- If hand points to frame with Usage Bit = 0 and Pin Count = 0, select this frame for eviction.

3. The Sequential Scan Pollution Problem:
A large analytical table scan reads thousands of pages once, wiping out frequently accessed index root pages from LRU cache.
- Solution (LRU-K / 2Q): Distinguishes pages accessed once from pages accessed multiple times by tracking time elapsed between the last K references.` },
    { num: 7, title: 'Log-Structured Storage & LSM-Trees (Log-Structured Merge Trees)',
      content: `In write-heavy workloads, updating B+ Trees incurs random disk writes, which degrades magnetic disk and SSD endurance.

LSM-Tree Architecture (RocksDB, Cassandra):
Converts random writes into sequential writes:
1. Memtable: In-memory sorted data structure (Skip List or Red-Black Tree). All writes (INSERT, UPDATE, DELETE) append to Memtable and a sequential Write-Ahead Log.
2. Immutable Memtable: When Memtable reaches threshold (e.g. 64 MB), it freezes and flushes sequentially to disk as an SSTable.
3. SSTable (Sorted String Table): Immutable on-disk file containing sorted keys and values, with index blocks and Bloom filters.
4. Compaction: Background workers merge overlapping SSTables, purging deleted tombstones and overwritten keys.` },
    { num: 8, title: 'Bloom Filters and Probabilistic Membership Queries',
      content: `In LSM trees, searching for a nonexistent key might require reading multiple SSTables from disk.

Bloom Filter Mechanics:
A space-efficient probabilistic data structure used to test set membership:
- False Negatives: IMPOSSIBLE. If Bloom filter says "Not in Set", the key is guaranteed not to exist.
- False Positives: POSSIBLE. May report "In Set" when key does not exist.

Operation:
Uses a bit array of m bits and k independent cryptographic hash functions.
- Insert Key: Hash key with all k functions; set corresponding bit indices to 1.
- Query Key: Hash key with all k functions. If ANY bit is 0, key is definitely NOT in set (skips reading disk SSTable entirely!).
Optimal hash count: k = (m/n) * ln(2).` },
    { num: 9, title: 'Record Versioning and Toast Storage in Relational Engines',
      content: `Handling oversized columns and historical row states:

PostgreSQL TOAST (The Oversized-Attribute Storage Technique):
PostgreSQL pages are strictly 8 KB. When a tuple exceeds 2 KB (due to large JSON, TEXT, or BYTEA fields):
1. Compression: Tries inline LZ compression.
2. Out-of-Line Chunking: If still oversized, moves large values into a separate TOAST table, chunked into 2 KB slices. The main tuple stores only an 18-byte pointer (toast pointer).

Record Versioning in PostgreSQL:
Updates do not overwrite in place. An UPDATE writes a completely new tuple with xmin = current_tx_id, and sets xmax = current_tx_id on the old tuple. Vacuum workers later reclaim dead row space.` },
    { num: 10, title: 'Memory-Mapped Files (mmap) vs Explicit Buffer Pools',
      content: `Contrasting two primary storage engine design philosophies:

The mmap Approach (LMDB, MongoDB MMAPv1):
Relies on kernel virtual memory. The database calls mmap() to map disk files directly into process virtual address space.
- Pros: Simple code, zero user-space memory copies, OS handles paging.
- Cons: Inability to control eviction priorities, unpredictable I/O pauses, signals on corrupt files (SIGBUS), and lack of transactional write order guarantees.

The Explicit Buffer Pool Approach (PostgreSQL, MySQL InnoDB):
Database allocates large heap buffer and uses explicit read()/write() or direct I/O (O_DIRECT).
- Pros: Strict write ordering for WAL correctness, intelligent prefetching, fine-grained latching, and immunity to OS memory pressures.` },
    // Unit 2: Indexing & Tree Structures (Pages 11-20)
    { num: 11, title: 'Index Fundamentals: Clustered vs Secondary Indexes',
      content: `Indexes are auxiliary data structures that accelerate record retrieval without scanning entire tables.

Clustered (Primary) Index:
Determines the physical ordering of data rows on disk. In MySQL InnoDB, tables ARE clustered indexes (B+ Trees); the leaf nodes contain the complete data rows.
- Rule: A table can have at most ONE clustered index.
- Lookup: Clustered index search returns data immediately upon reaching leaf node.

Secondary (Non-Clustered) Index:
A separate B+ Tree where leaf nodes store the indexed key along with a pointer to the physical row:
- In Heap Engines (PostgreSQL): Leaf stores TID/RID (Page_ID, Offset).
- In Clustered Engines (InnoDB): Leaf stores the Primary Key value. Secondary lookup requires two traversals: secondary tree -> primary clustered tree (Primary Key Lookup).` },
    { num: 12, title: 'B+ Tree Architecture and Invariants',
      content: `The B+ Tree is the standard indexing structure in relational engines.

Invariants of an Order-M B+ Tree:
1. Balanced Tree: Every leaf node resides at the exact same depth.
2. Internal Nodes: Hold between ceil(M/2) and M child pointers.
3. Keys Guide Search: An internal node with K keys contains K + 1 child pointers.
4. Leaf Nodes Contain Data / Pointers: Unlike B-Trees, B+ Trees store all actual keys and row pointers exclusively in leaf nodes. Internal nodes contain only routing keys.
5. Doubly-Linked Leaf List: Leaf nodes are linked via next and previous pointers, allowing fast O(log N + Range) sequential scans without traversing parent nodes.` },
    { num: 13, title: 'B+ Tree Operations: Search, Insertion, and Node Splitting',
      content: `Algorithmic Mechanics of B+ Trees:

Search:
Start at root. Perform binary search within internal node to locate child pointer matching key >= K. Repeat down to leaf node. Time complexity: O(log_M N).

Insertion:
1. Traverse to target leaf node. Insert key in sorted order.
2. Node Overflow: If leaf keys exceed M - 1:
   - Split leaf into two nodes, each holding half the keys.
   - Copy the middle key up to the parent node.
   - If parent overflows, split parent and push middle key up recursively.
   - If root splits, create a new root with 2 children (the tree grows in height exclusively from the root upwards).` },
    { num: 14, title: 'B+ Tree Deletion, Merging, and Borrowing',
      content: `Handling Key Removal:

Deletion Sequence:
1. Traverse to target leaf node and remove key.
2. Underflow Detection: If leaf keys drop below floor(M/2):
   - Borrowing (Redistribution): If an adjacent sibling node has surplus keys, borrow a key and adjust the separator key in parent.
   - Merging (Coalescing): If sibling also has minimum keys, merge the two nodes into a single node and remove separator key from parent.
   - Underflow propagates up to parent recursively. If root node loses all children except one, the single child becomes the new root (tree height shrinks).

Practical Optimization:
Many production engines (InnoDB) relax strict merging rules, allowing nodes to remain partially empty to avoid thrashing split/merge operations under volatile workloads.` },
    { num: 15, title: 'Concurrency Control in B+ Trees: Latch Crabbing',
      content: `Multiple query threads traversing and mutating B+ Trees simultaneously must prevent race conditions and structural corruption.

Latches vs Locks:
- Locks: High-level transactional locks protecting logical tuples for transaction duration. Visible to user.
- Latches: Low-level hardware synchronization primitives (pthread_rwlock) protecting internal memory pages for microseconds.

Latch Crabbing (Coupling) Protocol:
Thread grabs child latch BEFORE releasing parent latch, moving down like a crab:
- Read Search: Acquire Read Latch on Child -> Release Read Latch on Parent.
- Safe Node Modification: A node is "Safe" for insertion if not full, or "Safe" for deletion if above minimum keys.
- Write Traversal: Acquire Write Latch on Child. If child is safe, release all held write latches on all ancestor nodes!` },
    { num: 16, title: 'Hash Indexes: Extensible Hashing and Linear Hashing',
      content: `Hash indexing provides O(1) point lookups, though it cannot support range queries (BETWEEN, <, >).

Extensible Hashing:
Uses a directory of pointers to buckets.
- Global Depth (D): Number of address bits used by directory (2^D pointers).
- Local Depth (d): Number of address bits used by a specific bucket.
- Bucket Split: When bucket overflows, if local depth d < global depth D, only split the bucket and re-point directory entries. If d == D, double directory size (D = D + 1) without rehashing all buckets.

Linear Hashing:
Grows the hash table incrementally by splitting buckets one by one in round-robin order using a pointer, avoiding the sudden latency spikes of directory doubling.` },
    { num: 17, title: 'Specialized Indexes: GiST, SP-GiST, GIN, and BRIN',
      content: `PostgreSQL extensible indexing framework:

1. GIN (Generalized Inverted Index):
Stores mapping of element -> list of matching row IDs (posting list). Essential for full-text search, array containment (@>), and JSONB keys.

2. GiST (Generalized Search Tree):
Balanced tree structure modeling hierarchical bounding predicates. Essential for PostGIS spatial coordinates (R-Trees) and range types.

3. BRIN (Block Range Index):
Designed for multi-terabyte tables where data is physically ordered on disk (e.g. log timestamps). Stores only the minimum and maximum values for physical ranges of pages (e.g. every 128 pages). Extremely compact (megabytes of index for terabytes of table).` },
    { num: 18, title: 'Multi-Column Composite Indexes and Leftmost Prefix Rule',
      content: `Creating indexes on multiple columns: CREATE INDEX idx_users ON users(country, state, city).

The Leftmost Prefix Rule:
A composite index orders tuples lexicographically: first by country; within country, by state; within state, by city.
- Usable Queries:
  - WHERE country = 'US'
  - WHERE country = 'US' AND state = 'CA'
  - WHERE country = 'US' AND state = 'CA' AND city = 'SF'
- Unusable Queries:
  - WHERE state = 'CA' (Cannot use index directly because states are scattered across different countries).

Index-Only Scans:
If a query selects ONLY columns that are present in the index itself (e.g. SELECT state FROM users WHERE country = 'US'), the engine reads data directly from the index tree without fetching heap pages!` },
    { num: 19, title: 'Index Maintenance Costs and Write Amplification',
      content: `Every index created on a table imposes severe trade-offs on write performance:

Write Amplification:
When a table has 5 indexes, inserting a single row requires:
1. Writing the data row into heap page.
2. Traversing and inserting keys into 5 independent B+ Tree indexes.
3. Generating WAL log records for 6 different page updates.

Index Bloat:
Frequent updates and deletes leave empty slots and fragmented pages in B+ Trees. In PostgreSQL, HOT (Heap-Only Tuple) optimization avoids updating secondary indexes if the updated column is not indexed and the new row fits inside the same data page.` },
    { num: 20, title: 'Modern In-Memory Indexes: Adaptive Radix Trees (ART)',
      content: `In high-performance in-memory databases (HyPer, DuckDB), pointer chasing in B+ Trees incurs CPU cache miss penalties.

Adaptive Radix Tree (ART):
A trie structure where key bytes determine traversal path:
- Deterministic Height: Maximum height equals key length in bytes.
- Adaptive Node Types: Dynamically switches node internal representations based on child count:
  - Node4: 4 keys and pointers (SIMD linear search).
  - Node16: 16 keys and pointers (SIMD 128-bit vector comparison).
  - Node48: 256-byte child index array.
  - Node256: Direct 256 pointer array.
Achieves up to 3x higher throughput than B+ Trees for in-memory string and integer keys.` },
    // Unit 3: Query Execution & Optimization (Pages 21-30)
    { num: 21, title: 'Query Processing Pipeline: Parsing, Semantic Analysis, and Rewriting',
      content: `How a declarative SQL string transforms into physical execution:

1. Lexing & Parsing:
Lexer generates tokens from SQL text. Parser constructs an Abstract Syntax Tree (AST) validating grammar syntax.

2. Semantic Analysis & Catalog Binding:
Validates table and column names against System Catalogs (pg_class, pg_attribute). Resolves data types and verifies user permissions.

3. Logical Query Plan:
Transforms AST into a tree of relational algebra operators: Project (pi), Select (sigma), Join (bowtie), Aggregate (gamma).

4. Query Rewriting:
Applies heuristic equivalence transformations:
- View Inlining: Substitutes view definitions directly into query tree.
- Subquery Flattening: Converts uncorrelated subqueries into JOIN operations.
- Constant Folding: Computes 1 + 1 as 2 at compile time.` },
    { num: 22, title: 'Physical Operator Execution Models: Volcano vs Vectorization',
      content: `Architectures for executing operator trees:

1. Volcano Iterator Model (Tuple-at-a-time):
Pioneered by Goetz Graefe. Every operator implements three methods: open(), next(), close().
- Execution: Parent operator calls next() on child, returning a single tuple.
- Pros: Minimal memory footprint; excellent pipelining.
- Cons: Incurs virtual function call overhead and poor instruction cache locality for every single tuple across millions of rows.

2. Vectorized Execution (Mona / DuckDB / Snowflake):
next() returns a batch of tuples (e.g. 1024 values per column vector).
- Pros: Amortizes virtual call overhead by 1024x. Enables compilers to generate SIMD vector instructions for filtering and arithmetic, yielding 10x-20x speedups on analytical queries.` },
    { num: 23, title: 'Relational Join Algorithms: Nested Loop, Hash Join, and Sort-Merge Join',
      content: `Executing R JOIN S across tables:

1. Nested Loop Join:
For each tuple r in R, scan all tuples s in S. Cost: O(|R| * |S|). If S has an index on join attribute, Index Nested Loop Join scales O(|R| * log |S|).

2. Hash Join (Standard for Equality Joins):
- Build Phase: Reads smaller table R into an in-memory hash table keyed on join attribute.
- Probe Phase: Scans table S, hashing join attribute to locate matching rows in hash table. Cost: O(|R| + |S|).
- Grace Hash Join: Partitions both tables to disk if R exceeds buffer pool RAM.

3. Sort-Merge Join:
Sorts both tables on join attribute, then advances two cursor pointers in lockstep. Ideal when inputs are already sorted by an index or clustered storage.` },
    { num: 24, title: 'External Sorting and 2-Way External Merge Sort',
      content: `When a dataset exceeds buffer pool memory during ORDER BY or Sort-Merge Join, external disk sorting is required.

2-Way External Merge Sort (using B buffer frames):
- Phase 0 (Run Generation):
  Reads B pages of data into RAM, sorts them in-memory using QuickSort, and writes the sorted "run" back to disk. Generates N = ceil(Total_Pages / B) sorted runs.
- Merge Passes:
  Recursively merges B - 1 runs simultaneously using a priority queue, streaming the merged output to disk.
Number of passes: 1 + ceil(log_{B-1} (Total_Pages / B)). Total I/O cost: 2 * Total_Pages * (Number of passes).` },
    { num: 25, title: 'Cost-Based Optimization (CBO) and Plan Enumeration',
      content: `The Query Optimizer's goal is to find the physical plan with the lowest estimated execution cost among mathematically equivalent alternatives.

Cost Models:
Cost = (Page Fetches * Disk_Weight) + (Tuples Processed * CPU_Weight) + (Network Transfers * Net_Weight).

Plan Search Space:
For a join of N tables, there are (2N - 2)! / (N - 1)! possible join trees.
System R Dynamic Programming (Selinger Optimizer):
Enumerates optimal sub-plans of size K using optimal plans of size K - 1, pruning suboptimal alternatives (Dynamic Programming over subsets). Left-deep trees are prioritized to enable pipelined hash joins.` },
    { num: 26, title: 'Database Statistics, Histograms, and Cardinality Estimation',
      content: `The accuracy of cost estimation depends entirely on Cardinality Estimation (predicting how many rows satisfy WHERE predicates).

Statistics Catalogs (pg_statistic):
- Total Row Count (N) and Page Count.
- Number of Distinct Values (NDV / n_distinct).
- Null Fraction.
- Most Common Values (MCV) list and frequencies.

Equi-Depth Histograms:
Divides the domain into buckets containing equal numbers of tuples.
- Selectivity for x in [low, high] is calculated via linear interpolation within the bucket.
Estimation Errors:
Errors multiply exponentially across successive joins. When optimizer mispredicts cardinality by 1000x, it chooses a disastrous plan (e.g. Nested Loop instead of Hash Join).` },
    { num: 27, title: 'Parallel Query Execution: Intra-Query and Inter-Query Parallelism',
      content: `Modern servers feature 64+ CPU cores. Relational engines utilize parallelism across queries:

1. Inter-Query Parallelism:
Independent concurrent transactions execute simultaneously on separate threads. Managed via locking and buffer pool concurrency.

2. Intra-Query Parallelism:
A single complex query is divided into sub-tasks executed by multiple worker threads:
- Parallel Sequential Scan: Worker threads scan disjoint ranges of pages.
- Exchange Operators (Volcano Parallelism):
  - Split Operator: Partitions data streams among worker threads (hash, round-robin).
  - Merge Operator: Combines outputs from multiple workers into a single stream for the client.
Parallel Hash Join allows each worker to build partial hash tables and probe in parallel.` },
    { num: 28, title: 'Query Compilation and Just-In-Time (JIT) Code Generation',
      content: `In memory-resident databases, the CPU execution bottleneck is interpretation overhead in the volcano model.

JIT Compilation (LLVM in PostgreSQL / HyPer):
Compiles the query plan directly into native machine code at runtime:
- Inlines expression evaluations (e.g. price * (1.0 - discount) * tax).
- Compiles loops without function call overhead.
- Eliminates interpretive dispatch loops and pushes tuples through CPU registers instead of memory structures.
JIT compilation reduces CPU execution time by 3x-5x on compute-heavy analytical aggregations.` },
    { num: 29, title: 'Materialized Views and Query Rewriting Techniques',
      content: `Materialized views store the precomputed result set of a complex query physically on disk.

Refresh Strategies:
- Complete Refresh: Re-executes the underlying query from scratch and rebuilds table.
- Incremental Refresh: Listens to WAL delta changes on base tables and applies mathematical diffs to the materialized view.

Automated Query Rewrite:
Advanced enterprise optimizers analyze user queries and automatically substitute an existing materialized view if the view contains all required attributes, saving hours of expensive join computations.` },
    { num: 30, title: 'Common Table Expressions (CTEs) and Recursive Queries',
      content: `SQL CTEs (WITH clauses) improve query readability and enable hierarchical traversals:

Non-Recursive CTEs:
Acts as a temporary named query block. Modern engines inline CTEs into the main query plan unless marked WITH ... MATERIALIZED.

Recursive CTEs:
Consists of an Anchor Member and a Recursive Member joined by UNION ALL:
WITH RECURSIVE OrgChart AS (
  SELECT emp_id, manager_id, 1 AS level FROM employees WHERE manager_id IS NULL -- Anchor
  UNION ALL
  SELECT e.emp_id, e.manager_id, o.level + 1 FROM employees e JOIN OrgChart o ON e.manager_id = o.emp_id -- Recursive
)
SELECT * FROM OrgChart;
The engine executes iterative queue evaluation until the recursive step returns an empty set.` },
    // Unit 4: Transactions, Concurrency & Recovery (Pages 31-40)
    { num: 31, title: 'The ACID Guarantees and Transaction States',
      content: `A transaction is a logical unit of database processing containing one or more SQL operations.

The ACID Principles:
1. Atomicity: All operations succeed, or all changes are rolled back (All-or-Nothing).
2. Consistency: Database transitions from one valid state satisfying all schema constraints (keys, foreign keys, checks) to another.
3. Isolation: Concurrent transactions execute without interfering with one another.
4. Durability: Once a transaction commits, its updates persist permanently, even if power is lost immediately after.

Transaction Lifecycle States:
Active -> Partially Committed (after final statement executes) -> Committed (after WAL flush).
If an error occurs: Active -> Failed -> Aborted (after rollback completes).` },
    { num: 32, title: 'Concurrency Anomalies: Dirty Reads, Non-Repeatable Reads, and Phantoms',
      content: `When transactions run concurrently without isolation, anomalies arise:

1. Dirty Read (G1):
Transaction T1 modifies a row. Transaction T2 reads the uncommitted value. T1 aborts and rolls back. T2 has operated on phantom data that never legally existed!

2. Non-Repeatable Read (Fuzzy Read):
T1 reads row X. T2 updates row X and commits. T1 re-reads row X and observes different values.

3. Phantom Read:
T1 queries a range: SELECT * WHERE age > 30 (finds 5 rows). T2 inserts a new person with age 35 and commits. T1 re-executes query and finds 6 rows.

4. Write Skew:
Two concurrent transactions read overlapping datasets, verify invariant (e.g. at least one doctor on call), and make disjoint updates that jointly violate the invariant!` },
    { num: 33, title: 'ANSI SQL Isolation Levels and Serializability',
      content: `ANSI SQL-92 defines 4 standard isolation levels:

1. Read Uncommitted: Permits Dirty Reads, Non-repeatable Reads, and Phantoms. Lowest overhead.
2. Read Committed: Disallows Dirty Reads. Reads only committed data. Permits Non-repeatable reads and Phantoms.
3. Repeatable Read: Guarantees that any row read by the transaction remains unchanged during repeated reads. Permits Phantoms in standard ANSI.
4. Serializable: Highest isolation. Guarantees that the concurrent execution schedule is mathematically equivalent to some purely serial execution of transactions.

Conflict Serializability:
A schedule is conflict serializable if its Conflict Graph (precedence graph where edges represent conflicting operations between transactions) is acyclic.` },
    { num: 34, title: 'Two-Phase Locking (2PL) and Strict 2PL (S2PL)',
      content: `Two-Phase Locking is a pessimistic concurrency protocol ensuring conflict serializability.

The 2PL Rules:
- Growing Phase: Transaction may acquire locks (Shared or Exclusive), but cannot release any lock.
- Shrinking Phase: Transaction may release locks, but cannot acquire any new lock.

Strict 2PL (S2PL):
Standard 2PL suffers from Cascading Aborts (if T1 aborts after releasing a lock, T2 who read T1's updates must also abort).
- S2PL Rule: All Exclusive (X) locks must be held until the transaction fully COMMITS or ABORTS.
Prevents cascading aborts and guarantees strict schedules.` },
    { num: 35, title: 'Deadlock Detection vs Deadlock Prevention in Lock Managers',
      content: `When multiple transactions hold locks and wait for each other, deadlocks occur:

1. Deadlock Detection (Wait-For Graph):
The Lock Manager maintains a directed graph where nodes are transactions and edges T1 -> T2 denote T1 waiting for a lock held by T2. A background thread runs cycle detection (DFS) periodically. If a cycle is detected, the engine picks a "victim" transaction and aborts it.

2. Deadlock Prevention (Timestamps):
Transactions receive monotonically increasing timestamps when created:
- Wait-Die (Non-preemptive): Older transaction waits for younger; younger transaction requesting older resource dies (aborts).
- Wound-Wait (Preemptive): Older transaction "wounds" (forces abort of) younger transaction; younger transaction waits for older.` },
    { num: 36, title: 'Multi-Version Concurrency Control (MVCC) Architecture',
      content: `Locking causes readers to block writers, and writers to block readers. MVCC solves this: "Readers never block writers, and writers never block readers".

How MVCC Operates:
Each UPDATE or DELETE creates a new version of the row, stamped with transaction timestamps.
- Snapshot Isolation: A transaction reads the version of data that was committed at the exact instant the transaction began.
- Tuple Headers: Contain xmin (creating transaction ID) and xmax (deleting/overwriting transaction ID).

Vacuuming & Garbage Collection:
Dead row versions accumulate (bloat). PostgreSQL uses background autovacuum processes to scan pages and mark dead tuple slots as free space once no active transaction's snapshot needs them.` },
    { num: 37, title: 'Write-Ahead Logging (WAL) and Physiological Logging',
      content: `The Write-Ahead Logging (WAL) protocol is the foundation of durability and atomicity in storage engines.

The WAL Invariant:
A dirty data page must NEVER be written to non-volatile disk storage until all log records describing modifications to that page have been written to disk!

Log Records & LSNs:
Every WAL record has a monotonically increasing Log Sequence Number (LSN).
- PageLSN: Every database page stores the LSN of the latest log record that modified it.
- Flushing Rule: Before writing dirty page P to disk, the engine ensures: WAL_Flushed_LSN >= PageLSN(P).

Physiological Logging:
Combines logical operation descriptions with physical page identifiers, reducing log record sizes while remaining idempotent.` },
    { num: 38, title: 'The ARIES Recovery Algorithm: Analysis, Redo, and Undo',
      content: `Developed by C. Mohan at IBM, ARIES (Algorithms for Recovery and Isolation Exploiting Semantics) restores database consistency after a system crash.

The Three ARIES Passes:
1. Analysis Pass:
Scans the log forward from the latest Checkpoint to the end of the log. Identifies all active "loser" transactions that were running when the crash occurred, and determines the earliest unwritten dirty page LSN (RecLSN).

2. Redo Pass ("Repeating History"):
Scans forward from the smallest RecLSN. Reapplies ALL logged changes (including changes made by loser transactions) to restore the exact state of physical memory before the crash.

3. Undo Pass:
Scans backward from crash point, rolling back all operations of loser transactions in reverse chronological order. Writes Compensation Log Records (CLRs) to ensure recovery itself is idempotent if the system crashes during recovery!` },
    { num: 39, title: 'Checkpointing Mechanisms: Fuzzy Checkpointing',
      content: `Scanning the entire WAL log from database inception after a crash would take days. Checkpointing limits recovery time.

Naive Checkpoint (Stop-the-World):
Pause all transactions, flush all dirty pages to disk, write checkpoint record. Unacceptable for high-availability systems.

Fuzzy Checkpointing (Non-blocking):
Transactions continue executing normally:
1. Write 'Begin_Checkpoint' log record.
2. Capture snapshot of current Transaction Table (active transactions and their last LSN) and Dirty Page Table (dirty pages in buffer pool and their RecLSN).
3. Write 'End_Checkpoint' record containing these tables.
Dirty pages do NOT need to be flushed immediately; recovery uses the Dirty Page Table to identify where the Redo pass must begin.` },
    { num: 40, title: 'Group Commit and SSD Durability Optimization',
      content: `Writing WAL records synchronously (fsync) on every single transaction commit limits throughput to a few hundred commits per second (disk rotation / flash sync latency).

Group Commit:
The DBMS queues commit requests from multiple concurrent threads. A single leader thread issues a single combined fsync() system call that flushes WAL records for dozens of committed transactions in a single disk I/O operation.

NVMe Optimization:
Modern SSDs feature power-loss protection (PLP) capacitors. The DBMS can safely write to battery-backed controller caches without waiting for physical NAND flash cell programming, scaling group commit to hundreds of thousands of transactions per second.` },
    // Unit 5: Distributed Databases & Cloud Storage (Pages 41-50)
    { num: 41, title: 'Distributed Systems Foundations: CAP, PACELC, and Fallacies',
      content: `Distributed databases partition data and computation across multiple network nodes.

The Fallacies of Distributed Computing (L. Peter Deutsch):
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. Transport cost is zero.

The CAP Theorem (Brewer):
In the presence of network Partitions (P), a system must choose between:
- Consistency (C): Every read receives the most recent write or an error.
- Availability (A): Every non-failing node returns a non-error response without guarantee of latest data.

PACELC Theorem (Abadi):
If Partition (P), trade off Availability (A) vs Consistency (C); Else (E), trade off Latency (L) vs Consistency (C).` },
    { num: 42, title: 'Data Partitioning: Range, Hash, and Consistent Hashing',
      content: `Distributing massive tables across a cluster:

1. Range Partitioning:
Assigns ranges of primary key values to shards (e.g. Shard 1: A-F, Shard 2: G-M). Efficient for range queries, but creates write hotspots if keys are monotonically increasing (e.g. auto-increment IDs or timestamps).

2. Hash Partitioning:
Maps Key -> hash(Key) % N. Evenly distributes write load, but makes range queries scatter-gather across all nodes.

3. Consistent Hashing (Karger et al.):
Nodes and keys are mapped to points on a logical 360-degree ring:
- When a node joins or leaves, only K/N keys are moved.
- Virtual Nodes: Each physical node is assigned multiple positions on the ring to balance load distribution and prevent skewed partitions.` },
    { num: 43, title: 'Replication Models: Single-Leader, Multi-Leader, and Leaderless',
      content: `Ensuring high availability through redundant copies:

1. Single-Leader Replication (PostgreSQL / MySQL):
One leader node processes all writes, streaming replication logs to follower read replicas.
- Synchronous Replication: Leader waits for at least one follower confirmation before committing. Safe, but write latency equals slowest replica.
- Asynchronous Replication: Leader commits locally immediately. Fast, but risks data loss if leader crashes before replication.

2. Multi-Leader Replication:
Multiple nodes accept writes (e.g. across geographic datacenters). Requires conflict resolution strategies (Last-Write-Wins, CRDTs).

3. Leaderless Replication (DynamoDB, Cassandra):
Clients write to and read from any node, relying on Quorum consensus.` },
    { num: 44, title: 'Quorum Consensus: Sloppy Quorums and Read Repair',
      content: `Leaderless replication ensures consistency using configurable quorum parameters (N, W, R):
- N: Total number of replicas storing the data item.
- W: Number of successful replica confirmations required for a WRITE to succeed.
- R: Number of replicas queried during a READ operation.

Strong Consistency Quorum Invariant:
If W + R > N, the read set and write set must overlap by at least one node containing the latest version of data.

Anti-Entropy & Read Repair:
- Read Repair: When a client detects that replica A has an older version than replicas B and C, it writes the latest version back to replica A in the background.
- Hinted Handoff / Sloppy Quorum: If designated replica is down, a neighboring node buffers the write temporarily.` },
    { num: 45, title: 'Distributed Consensus: Paxos and Raft Protocols',
      content: `Consensus enables a cluster of nodes to agree on a sequence of values (replicated state machine) despite node crashes and network partitions.

The Raft Consensus Protocol (Ongaro & Ousterhout):
Deconstructs consensus into three clear sub-problems:
1. Leader Election: Nodes start as Followers. If heartbeat timer expires, a follower becomes Candidate, increments Term, and requests votes. Needs majority vote (ceil((N+1)/2)) to become Leader.
2. Log Replication: Clients send commands to Leader. Leader appends entry to its log and broadcasts AppendEntries RPCs. When entry is replicated on majority of nodes, Leader commits and notifies followers.
3. Safety: A candidate can only win an election if its log is at least as up-to-date as any majority node.` },
    { num: 46, title: 'Distributed Transactions and Two-Phase Commit (2PC)',
      content: `Executing transactions that update data across multiple database shards:

The Two-Phase Commit Protocol:
Coordinated by a Transaction Coordinator node:

Phase 1: Prepare Phase
1. Coordinator sends 'PREPARE' message to all participating cohort nodes.
2. Cohort nodes write changes to local WAL, verify integrity, acquire locks, and vote 'YES' (guaranteeing ability to commit) or 'NO'.

Phase 2: Commit Phase
1. If ALL cohorts vote YES: Coordinator writes 'COMMIT' to its log and sends 'GLOBAL_COMMIT' to cohorts. Cohorts commit and release locks.
2. If ANY cohort votes NO or times out: Coordinator writes 'ABORT' and sends 'GLOBAL_ABORT'.

The 2PC Blocking Flaw:
If the Coordinator crashes after cohorts vote YES, cohorts must block indefinitely holding locks because they cannot know if the global decision was commit or abort.` },
    { num: 47, title: 'Google Spanner: TrueTime API and External Consistency',
      content: `Google Spanner is the first globally distributed database to achieve strict serializability (external consistency) across worldwide datacenters.

The TrueTime API:
Hardware-assisted time synchronization using GPS receivers and atomic clocks in every Google datacenter:
- TT.now() returns a time interval [earliest, latest] guaranteeing that absolute real-world time falls within [t.earliest, t.latest]. Uncertainty window epsilon is typically < 7 milliseconds.

TrueTime Commit Wait:
When transaction T commits, Spanner assigns it a commit timestamp s = TT.now().latest. Spanner then deliberately pauses execution and waits until TT.now().earliest > s before releasing locks! This guarantees that any subsequent transaction anywhere in the world will receive a timestamp strictly greater than s, achieving global linearizability without coordinator communication.` },
    { num: 48, title: 'Cloud-Native Disaggregated Storage: AWS Aurora and Snowflake',
      content: `Traditional monolithic databases tightly couple compute (CPU/RAM) and storage (local disks). Cloud-native architectures disaggregate them.

Amazon Aurora Architecture ("The Log IS the Database"):
- Separates compute instance (running MySQL/Postgres query engine) from a custom multi-tenant storage fleet.
- Storage fleet replicates across 6 nodes in 3 Availability Zones (AZs).
- Compute node writes ONLY WAL log records over the network to the storage fleet; the storage nodes asynchronously materialize database pages from logs in the background! Reduces network I/O by 80%.

Snowflake Shared-Data Architecture:
Decouples storage (Amazon S3 / Google Cloud Storage), compute clusters (virtual warehouses), and cloud services metadata management.` },
    { num: 49, title: 'Vector Databases and High-Dimensional Similarity Search',
      content: `Generative AI and Large Language Models represent unstructured data (text, images, audio) as high-dimensional embedding vectors (e.g. 1536 floats).

Vector Distance Metrics:
- Euclidean Distance (L2)
- Cosine Similarity: cos(theta) = (A dot B) / (||A|| * ||B||)
- Dot Product

Approximate Nearest Neighbor (ANN) Indexing:
Brute-force O(N * D) search is too slow for millions of vectors:
1. HNSW (Hierarchical Navigable Small World):
Multi-layer graph structure inspired by skip lists. Top layers have long-range links for fast routing; bottom layers contain dense local connections for precise nearest neighbor search.
2. IVF-PQ (Inverted File with Product Quantization):
Partitions vector space into Voronoi cells via k-means clustering, compressing vectors into compact centroid codes.` },
    { num: 50, title: 'Capstone Database Engineering Synthesis & System Design',
      content: `A complete synthesis of database systems engineering principles:

System Design Framework for Database Architects:
1. Workload Profiling: Distinguish read-heavy vs write-heavy; OLTP (low latency, high concurrency) vs OLAP (high throughput, large scans).
2. Storage Engine Selection: B+ Trees for predictable low-latency reads; LSM-Trees for high write ingestion rates; Columnar for analytical aggregations.
3. Concurrency Strategy: Multi-version Concurrency Control (MVCC) with snapshot isolation to prevent read-write contention.
4. High Availability & Disaster Recovery: Quorum-based consensus (Raft/Paxos) for zero-data-loss failover; write-ahead logging with fuzzy checkpoints for deterministic recovery.

Comprehensive Review Questions:
- Diagram the complete life cycle of an INSERT transaction from client driver to WAL fsync and buffer pool page dirtiness.
- Compare the write amplification and read amplification trade-offs between B+ Trees and LSM-Trees.
- Explain how the Raft consensus algorithm resolves split-brain elections.` }
  ];

  return topics.map(t => ({
    pageNumber: t.num,
    title: `Page ${t.num}: ${t.title}`,
    content: t.content
  }));
};

export const COLLEGE_50_PAGE_BOOKS: LibraryBook[] = [
  {
    id: 'book-college-cs-systems-50',
    title: 'Computer Systems: Architecture, Operating Environments & Low-Level Engineering',
    author: 'Prof. Alistair R. Thorne & Dr. Clara Chen (MIT & Stanford EECS)',
    category: 'college_books',
    badge: 'College Textbook (50 Pages)',
    description: 'An authoritative 50-page university textbook covering machine execution, instruction pipelines, memory hierarchies, virtual memory, systems programming, concurrent servers, and security defenses.',
    coverEmoji: '🏛️',
    coverColor: 'from-amber-700 via-orange-800 to-stone-900',
    totalPages: 50,
    readPages: [],
    pages: generateSystemsPages(),
    collegeMetadata: {
      courseCode: 'CS301 / EECS201',
      level: 'Undergraduate & Graduate Core',
      semester: 'Semester 4 / 5',
      units: [
        { unitNumber: 1, title: 'Foundations of Machine Execution & Logic', startPage: 1, endPage: 10 },
        { unitNumber: 2, title: 'Processor Microarchitecture & Pipelining', startPage: 11, endPage: 20 },
        { unitNumber: 3, title: 'Memory Hierarchy, Cache Coherence & NUMA', startPage: 21, endPage: 30 },
        { unitNumber: 4, title: 'Virtual Memory, Inodes & System I/O', startPage: 31, endPage: 40 },
        { unitNumber: 5, title: 'Concurrent Network Servers & Systems Security', startPage: 41, endPage: 50 }
      ]
    }
  },
  {
    id: 'book-college-distributed-dbms-50',
    title: 'Database Internals & Distributed Storage Architectures',
    author: 'Prof. Marcus Vance & Dr. Elena Rostova (Carnegie Mellon Database Group)',
    category: 'college_books',
    badge: 'College Textbook (50 Pages)',
    description: 'A comprehensive 50-page university textbook examining storage engines, write-ahead logging (ARIES), B+ Tree indexing, vectorized query execution, transactions, Raft consensus, Spanner, and cloud databases.',
    coverEmoji: '📚',
    coverColor: 'from-emerald-700 via-teal-800 to-slate-900',
    totalPages: 50,
    readPages: [],
    pages: generateDbmsPages(),
    collegeMetadata: {
      courseCode: 'CS445 / CS645',
      level: 'Advanced Undergraduate / Masters',
      semester: 'Semester 5 / 6',
      units: [
        { unitNumber: 1, title: 'Storage Engines, Buffer Pools & Page Formats', startPage: 1, endPage: 10 },
        { unitNumber: 2, title: 'B+ Trees, LSM Trees & In-Memory Indices', startPage: 11, endPage: 20 },
        { unitNumber: 3, title: 'Query Execution Engines & Cost Optimizers', startPage: 21, endPage: 30 },
        { unitNumber: 4, title: 'Concurrency Control, MVCC & ARIES Recovery', startPage: 31, endPage: 40 },
        { unitNumber: 5, title: 'Distributed Consensus, Spanner & Cloud Warehouses', startPage: 41, endPage: 50 }
      ]
    }
  }
];
