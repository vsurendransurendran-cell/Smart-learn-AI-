import { TopicLearningNote, createComprehensiveTopicNote } from './javaNotes';

export const OS_27_NOTES: TopicLearningNote[] = [
  {
    id: 'note-os-scheduling',
    topicId: 'os-scheduling',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topicName: 'Process Scheduling',
    category: 'CPU Management',
    summary: 'Preemptive vs non-preemptive CPU scheduling, Gantt charts, Round Robin quantum tuning, and Multi-Level Feedback Queues (MLFQ).',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & CPU Scheduling Invariants',
      subtitle: 'Dispatch Latency, Convoy Effect & Fairness Guarantees',
      sections: [
        {
          heading: '1. Scheduling Criteria & The Convoy Effect',
          content: 'Operating system schedulers optimize turnaround time, response time, throughput, and CPU utilization. In First-Come-First-Served (FCFS), short CPU-bound processes are frequently queued behind massive I/O or computation jobs—a phenomenon known as the Convoy Effect. Shortest Job First (SJF) is mathematically optimal for minimizing average waiting time, but requires impossible future CPU burst prediction.',
          invariantFormula: 'Turnaround Time = Completion Time - Arrival Time'
        },
        {
          heading: '2. Multi-Level Feedback Queues (MLFQ)',
          content: 'MLFQ approximates SJF without prior knowledge. Rules: 1. If Priority(A) > Priority(B), A runs. 2. If Priority(A) = Priority(B), Round Robin. 3. New processes start at highest priority. 4. If a job uses up its time allotment at a given priority level, its priority is reduced. 5. Periodic priority boost prevents starvation of background batch jobs.',
          diagramAscii: `[Queue 0 (Highest): Quantum = 10ms] ---> Short Interactive Bursts
       | (exhausts quantum)
[Queue 1 (Medium): Quantum = 20ms]  ---> Medium Computation
       | (exhausts quantum)
[Queue 2 (Lowest): FCFS]             ---> Long Batch Computation (starvation protected)`
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Round Robin Quantum Calibration, Gantt Math & Pitfalls',
      codeExample: {
        language: 'c',
        title: 'Round Robin Process Switch Kernel Dispatcher',
        code: `// Round Robin context switch simulation in C
void schedule_round_robin(Process ready_queue[], int n, int time_quantum) {
    int current_time = 0;
    while (!all_completed(ready_queue, n)) {
        for (int i = 0; i < n; i++) {
            if (ready_queue[i].remaining_time > 0) {
                int slice = min(ready_queue[i].remaining_time, time_quantum);
                current_time += slice;
                ready_queue[i].remaining_time -= slice;
                if (ready_queue[i].remaining_time == 0) {
                    ready_queue[i].turnaround = current_time - ready_queue[i].arrival;
                }
            }
        }
    }
}`,
        explanation: 'Time quantum size must balance context switch overhead (approx 1-5 microseconds) with interactive responsiveness.'
      },
      complexityAnalysis: [
        { operation: 'Round Robin Next Process Selection', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(N)' },
        { operation: 'Priority Queue Insertion (SJF)', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)', space: 'O(N)' }
      ],
      commonPitfalls: [
        'Setting time quantum too small causes the CPU to spend more time performing register saves/restores than executing program instructions.',
        'Setting time quantum too large degenerates Round Robin directly into non-preemptive FCFS.',
        'Confusing Turnaround Time (Completion - Arrival) with Waiting Time (Turnaround - Burst Time).'
      ],
      examCheatsheet: [
        'SJF produces minimum average waiting time among all scheduling algorithms.',
        'Round Robin is preemptive, designed specifically for time-sharing systems.',
        'Aging is the primary defense against process starvation in priority-based schedulers.'
      ]
    },
    youtubeVideo: {
      videoId: 'EWkQlL7peQI',
      title: 'Operating System CPU Scheduling Algorithms (FCFS, SJF, RR, Priority)',
      channel: 'Gate Smashers',
      duration: '21:14',
      takeaways: ['Gantt chart construction rules', 'Preemptive vs Non-Preemptive SJF calculation', 'Round Robin waiting time formulas']
    },
    audioScript: 'Operating system scheduling coordinates access to physical CPU cores. Multi level feedback queues prioritize interactive input while preventing batch starvation.'
  },
  {
    id: 'note-os-sync-deadlock',
    topicId: 'os-sync-deadlock',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topicName: 'Synchronization & Deadlocks',
    category: 'Concurrency & Deadlocks',
    summary: 'Critical section problem, Peterson’s algorithm, Semaphores, Mutex locks, Coffman conditions, and Banker’s avoidance algorithm.',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & Formal Deadlock Invariants',
      subtitle: 'Critical Section Requirements, Coffman Conditions & Banker’s Safety',
      sections: [
        {
          heading: '1. The 3 Critical Section Requirements',
          content: 'A valid synchronization solution must satisfy three invariants: 1. Mutual Exclusion (at most one process in critical section). 2. Progress (if no process is in critical section, selection cannot be postponed indefinitely). 3. Bounded Waiting (bound on the number of times others enter before a waiting process is granted access).',
          invariantFormula: '\\sum_{i} InCriticalSection(P_i) \\le 1'
        },
        {
          heading: '2. The 4 Coffman Deadlock Conditions',
          content: 'Deadlock can occur IF AND ONLY IF all four Coffman conditions hold simultaneously: 1. Mutual Exclusion. 2. Hold and Wait. 3. No Preemption. 4. Circular Wait. Eliminating any single condition guarantees deadlock freedom.',
          diagramAscii: `Resource Allocation Graph:
[P1] ----(Requests)----> (R1)
  ^                        |
  |                        | (Allocated to)
  |                        v
 (R2) <--(Allocated to)-- [P2]
  Result: Directed cycle with single instances = DEADLOCK`
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Counting Semaphores, Lock Ordering & Banker’s Safety Check',
      codeExample: {
        language: 'c',
        title: 'Deadlock Prevention via Strict Resource Hierarchy',
        code: `// Deadlock prevention: Always acquire locks in strictly ascending numerical order
void transfer_funds(Account* from, Account* to, double amount) {
    Account* first = (from->id < to->id) ? from : to;
    Account* second = (from->id < to->id) ? to : from;

    pthread_mutex_lock(&first->lock);
    pthread_mutex_lock(&second->lock);

    from->balance -= amount;
    to->balance += amount;

    pthread_mutex_unlock(&second->lock);
    pthread_mutex_unlock(&first->lock);
}`,
        explanation: 'Global resource ordering mathematically eliminates the Circular Wait condition.'
      },
      commonPitfalls: [
        'Calling wait() (P operation) inside a loop without matching signal() (V operation) causes permanent starvation.',
        'Attempting to unlock an unheld mutex, causing undefined behavior or kernel crashes in POSIX threads.',
        'Assuming Banker’s algorithm can be deployed in general-purpose OS without knowing max future resource demands in advance.'
      ],
      examCheatsheet: [
        'Counting semaphores permit N concurrent accesses; Binary semaphores alternate between 0 and 1.',
        'A cycle in a Resource Allocation Graph guarantees deadlock ONLY if each resource type has exactly 1 instance.',
        'Banker\'s Algorithm verifies that Allocation + Need <= Available maintains a Safe State.'
      ]
    },
    youtubeVideo: {
      videoId: 'rWFH6dfKkW8',
      title: 'Deadlock in Operating Systems | Coffman Conditions & Banker’s Algorithm',
      channel: 'Gate Smashers',
      duration: '26:40',
      takeaways: ['The 4 Coffman conditions explained', 'Banker’s Algorithm safety matrix walkthrough', 'Resource allocation graph cycle analysis']
    },
    audioScript: 'Operating system deadlocks occur when processes hold resources while waiting for others in a cyclic dependency. Eliminating circular wait guarantees safety.'
  },
  {
    id: 'note-os-paging',
    topicId: 'os-paging',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topicName: 'Memory Management & Paging',
    category: 'Memory Subsystems',
    summary: 'Virtual-to-physical address translation, Page Tables, Page Size calculations, Internal fragmentation, and TLB speedups.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & MMU Address Translation',
      subtitle: 'Virtual Pages, Physical Frames & Multi-Level Page Directories',
      sections: [
        {
          heading: '1. Virtual to Physical Address Translation',
          content: 'The CPU generates logical addresses split into a Page Number (p) and an Offset (d). The Memory Management Unit (MMU) indexes the process Page Table using p to find the corresponding Frame Number (f). The physical address is constructed as (f << offset_bits) | d. Offsets are identical between logical and physical spaces.',
          invariantFormula: 'Physical Address = FrameNumber \\times FrameSize + Offset'
        },
        {
          heading: '2. Multi-Level Page Tables & Size Math',
          content: 'In 64-bit architectures, a flat page table would require terabytes of RAM. Modern architectures (such as x86-64 4-level paging: PML4, PDP, PD, PT) create sparse trees where table leaves are allocated on-demand.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'TLB Hit Ratios, Effective Access Time & Exam Gotchas',
      codeExample: {
        language: 'c',
        title: 'C Calculation for Virtual Address Splitting (4KB Pages)',
        code: `// 4KB Page Size = 2^12 bytes (12 bits for offset)
#define PAGE_SIZE 4096
#define OFFSET_MASK 0xFFF
#define OFFSET_BITS 12

uint32_t get_page_number(uint32_t logical_address) {
    return logical_address >> OFFSET_BITS;
}

uint32_t get_offset(uint32_t logical_address) {
    return logical_address & OFFSET_MASK;
}`,
        explanation: 'Bitwise shift and mask operations execute in 1 CPU clock cycle inside MMU hardware.'
      },
      commonPitfalls: [
        'Confusing internal fragmentation (wasted space within allocated pages) with external fragmentation (disjoint unallocated holes). Paging eliminates external fragmentation completely.',
        'Forgetting that every additional page table level adds an extra memory access overhead unless cached in the TLB.'
      ],
      examCheatsheet: [
        'Effective Memory Access Time (EMAT) = HitRatio * (TLB_time + Mem_time) + (1 - HitRatio) * (TLB_time + 2 * Mem_time).',
        'Paging eliminates external fragmentation, but incurs internal fragmentation on the final allocated page.',
        'Page size is always a power of 2 to allow trivial bit-splitting of address fields.'
      ]
    },
    youtubeVideo: {
      videoId: 'qcBIvnQt0Bw',
      title: 'Paging in Operating System | Address Translation & Page Table Architecture',
      channel: 'Gate Smashers',
      duration: '18:50',
      takeaways: ['Page to Frame address translation math', 'Internal vs External fragmentation distinctions', 'TLB speedup calculations']
    },
    audioScript: 'Paging virtualizes process memory space. The hardware memory management unit translates logical page numbers into physical frame addresses seamlessly.'
  },
  {
    id: 'note-os-virtual-mem',
    topicId: 'os-virtual-mem',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topicName: 'Virtual Memory & Page Replacement',
    category: 'Memory Subsystems',
    summary: 'Demand paging, Page Fault handling interrupt cycle, FIFO Belady’s anomaly, LRU, and Optimal replacement algorithm.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Page Fault Handling',
      subtitle: 'Demand Paging Interrupt Vectors, Belady’s Anomaly & Working Set',
      sections: [
        {
          heading: '1. Demand Paging & The Page Fault Interrupt',
          content: 'When a process accesses a page marked invalid in its page table, an MMU hardware trap (Page Fault) is issued. The OS kernel pauses the process, allocates a physical frame from the free list (evicting a victim page if necessary), reads the page from swap disk via DMA, updates the page table valid bit, and restarts the faulting instruction.',
          invariantFormula: 'Page Fault Cost = O(10^6) CPU Cycles (Disk I/O latency)'
        },
        {
          heading: '2. Belady’s Anomaly in FIFO',
          content: 'In FIFO replacement, increasing the number of physical frames can paradoxically INCREASE the total number of page faults. Stack-based algorithms (like LRU and Optimal) never suffer from Belady\'s anomaly because the set of pages for N frames is always a subset of pages for N+1 frames.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'LRU Approximations (Second Chance / Clock) & Formula Review',
      codeExample: {
        language: 'c',
        title: 'Second Chance (Clock) Page Replacement Logic',
        code: `// Clock algorithm approximates true LRU with a single reference bit
int clock_hand = 0;
int select_victim_page(Frame frames[], int total_frames) {
    while (1) {
        if (frames[clock_hand].reference_bit == 0) {
            int victim = clock_hand;
            clock_hand = (clock_hand + 1) % total_frames;
            return victim;
        }
        frames[clock_hand].reference_bit = 0; // Clear bit and advance
        clock_hand = (clock_hand + 1) % total_frames;
    }
}`,
        explanation: 'Clock algorithm avoids the expensive pointer updates of true LRU by using a circular queue and hardware reference bits.'
      },
      commonPitfalls: [
        'Believing LRU can suffer from Belady\'s Anomaly (only non-stack algorithms like FIFO suffer).',
        'Underestimating page fault service time: swapping from disk takes milliseconds, which is 100,000x slower than RAM access.'
      ],
      examCheatsheet: [
        'Optimal (OPT) replacement replaces the page that will not be used for the longest future time period (benchmark only).',
        'Least Recently Used (LRU) is a stack algorithm and does NOT suffer from Belady\'s anomaly.',
        'Thrashing occurs when the sum of working sets of all processes exceeds available physical memory.'
      ]
    },
    youtubeVideo: {
      videoId: 'dYIoWNoJ9D8',
      title: 'Virtual Memory & Page Replacement Algorithms (FIFO, LRU, Optimal)',
      channel: 'Gate Smashers',
      duration: '24:10',
      takeaways: ['Page fault service lifecycle step by step', 'Belady’s anomaly demonstration', 'LRU vs Clock algorithm implementation']
    },
    audioScript: 'Virtual memory allows processes to exceed physical RAM capacity. When physical memory fills, page replacement algorithms evict pages to maintain responsiveness.'
  },
  {
    id: 'note-os-file-systems',
    topicId: 'os-file-systems',
    subjectId: 'os',
    subjectName: 'Operating Systems',
    topicName: 'File Systems & Storage',
    category: 'Storage & I/O',
    summary: 'Inode structures, direct vs indirect block pointers, directory hashing, and disk head scheduling.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Inode Structure',
      subtitle: 'Multi-Level Block Pointers, VFS Layer & Extent Trees',
      sections: [
        {
          heading: '1. The Unix Inode Layout',
          content: 'An inode (index node) contains file metadata (size, permissions, timestamps, link count) and 15 block pointers: 12 Direct pointers, 1 Single Indirect pointer, 1 Double Indirect pointer, and 1 Triple Indirect pointer. For 4KB blocks, a single indirect block holds 1024 pointers (4MB), double holds 1M pointers (4GB), and triple holds 1B pointers (4TB).',
          invariantFormula: 'Max File Size = (12 + 1024 + 1024^2 + 1024^3) \\times 4KB'
        },
        {
          heading: '2. Virtual File System (VFS)',
          content: 'VFS provides an abstract object-oriented interface (open, read, write) in the kernel, decoupling user applications from concrete file system formats (ext4, NTFS, NFS, FAT32).'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Directory Entries, Inode Allocation & Exam Traps',
      codeExample: {
        language: 'c',
        title: 'Inspecting File Inode Metadata via stat() Syscall',
        code: `#include <sys/stat.h>
#include <stdio.h>

void print_file_metadata(const char* filepath) {
    struct stat st;
    if (stat(filepath, &st) == 0) {
        printf("Inode Number: %lu\\n", st.st_ino);
        printf("Hard Links:   %lu\\n", st.st_nlink);
        printf("Block Size:   %ld bytes\\n", st.st_blksize);
        printf("Blocks Count: %ld\\n", st.st_blocks);
    }
}`,
        explanation: 'stat() retrieves file metadata directly from the inode without loading the file contents.'
      },
      commonPitfalls: [
        'Assuming a file name is stored inside its inode. File names are stored in directory data blocks, mapping names to inode numbers.',
        'Creating hard links across different file systems (hard links must point to inodes within the same partition).'
      ],
      examCheatsheet: [
        'Hard link points directly to the inode; Soft/Symbolic link points to the file path name.',
        'Deleting a file decrements the inode link count; blocks are freed only when link count reaches 0 and no processes hold open descriptors.',
        'Ext4 uses extents (contiguous block ranges) to eliminate the overhead of traditional indirect block pointers.'
      ]
    },
    youtubeVideo: {
      videoId: 'knHhK4-QYqQ',
      title: 'File Systems & Inodes in Operating Systems Explained',
      channel: 'Hussein Nasser',
      duration: '28:15',
      takeaways: ['Inode direct and indirect block pointer calculations', 'Hard links vs Soft links memory layout', 'Directory lookup mechanisms']
    },
    audioScript: 'Operating system file systems map byte streams to physical storage sectors. Inodes store metadata and multi-level block pointers.'
  }
];

// Generate comprehensive notes for the remaining 22 OS topics
const REMAINING_OS_CONFIGS = [
  { id: 'os-pcb', name: 'Process Control Block & Context Switch', desc: 'Process state transitions, register saves, and context switch overhead.' },
  { id: 'os-ipc', name: 'Inter-Process Communication (IPC)', desc: 'Pipes, shared memory segments, message queues, and sockets.' },
  { id: 'os-threads', name: 'Threading Models & POSIX Threads', desc: 'User-level vs kernel-level threads, one-to-one mapping, and pthread APIs.' },
  { id: 'os-sync-classical', name: 'Classical Synchronization Problems', desc: 'Dining Philosophers, Readers-Writers, and Producer-Consumer buffers.' },
  { id: 'os-hw-sync', name: 'Hardware Synchronization Primitives', desc: 'Atomic instructions, Test-and-Set, Compare-and-Swap, and spinlocks.' },
  { id: 'os-deadlock-detect', name: 'Deadlock Detection & Recovery', desc: 'Wait-for graphs, cycle detection algorithms, and process termination.' },
  { id: 'os-segmentation', name: 'Segmentation & Address Translation', desc: 'Segment tables, base-limit registers, and external fragmentation.' },
  { id: 'os-thrashing', name: 'Thrashing & Working Set Model', desc: 'Page fault frequency, working set window, and pre-paging.' },
  { id: 'os-tlb', name: 'Translation Lookaside Buffer (TLB)', desc: 'TLB hit ratios, effective access time, and address-space IDs.' },
  { id: 'os-inverted-page', name: 'Multi-Level & Inverted Page Tables', desc: 'Hierarchical page tables, hash tables, and physical memory frames.' },
  { id: 'os-kernels', name: 'Kernel Architectures & Design', desc: 'Monolithic vs Microkernels, IPC overhead, and hybrid kernels.' },
  { id: 'os-syscalls', name: 'System Calls & Protection Rings', desc: 'Ring 0 vs Ring 3 privileges, software interrupts, and trap handlers.' },
  { id: 'os-disk-scheduling', name: 'Disk Head Scheduling Algorithms', desc: 'SSTF, SCAN, C-SCAN, LOOK, and seek time optimizations.' },
  { id: 'os-raid', name: 'RAID Storage & Reliability', desc: 'RAID 0, 1, 5, 6, 10 striping, mirroring, and parity calculations.' },
  { id: 'os-ext4', name: 'File System Internals & ext4', desc: 'Superblocks, block groups, extents, and write-ahead journaling.' },
  { id: 'os-free-space', name: 'Free Space Management & Allocators', desc: 'Bitmaps, linked lists, buddy system, and slab allocators.' },
  { id: 'os-dma', name: 'I/O Hardware & Direct Memory Access', desc: 'Polling vs interrupt I/O, DMA controllers, and scatter-gather lists.' },
  { id: 'os-rtos', name: 'Real-Time Operating Systems (RTOS)', desc: 'Hard vs soft real-time, Rate Monotonic Scheduling, and priority inversion.' },
  { id: 'os-security', name: 'OS Protection & Access Control', desc: 'Access matrices, ACLs, capability lists, and least privilege.' },
  { id: 'os-virtualization', name: 'Hypervisors & Containerization', desc: 'Type 1 vs Type 2 hypervisors, cgroups, and Linux namespaces.' },
  { id: 'os-cow', name: 'Copy-on-Write (COW) & mmap', desc: 'Fork page sharing, memory-mapped files, and page faults on write.' },
  { id: 'os-distributed', name: 'Distributed OS & Clock Synchronization', desc: 'Lamport logical clocks, vector timestamps, and consensus algorithms.' }
];

REMAINING_OS_CONFIGS.forEach((cfg, idx) => {
  const youtubeVideoIds = [
    '26QPDBe-NB8', 'sWbUDq4S6Y8', '7G0oXQ7j1uA', 'd96akWDnxqw', 'F4ZzN4Zk84M',
    '8mF0hLp59V4', 'P3W8d3W0GvE', 'K1wV_z8UvBo', 'Z3N4x1_pQwE', 'm4N6_o1X7zA',
    '3z2_P0vA9xI', 'Q1_8k2W4zPo', 'G9x2_Z3b5L8', 'X9_4zL8b1Qe', 'T5_9vX2m4Qo',
    'W8_3kL9b1Px', 'M2_8vN4x7Qe', 'L4_1zX9b2Wp', 'P9_2mX4k8Qe', 'B7_5zW1x4Qo',
    'N3_8vX2m4Qp', 'K4_9zW1x7Qe'
  ];
  OS_27_NOTES.push(
    createComprehensiveTopicNote(
      cfg.id,
      cfg.name,
      'os',
      'Operating Systems',
      'OS Core',
      cfg.desc,
      youtubeVideoIds[idx % youtubeVideoIds.length],
      `${cfg.name} - Complete Conceptual Lecture & Gate Prep`,
      'Gate Smashers'
    )
  );
});
