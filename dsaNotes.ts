import { TopicLearningNote, createComprehensiveTopicNote } from './javaNotes';

export const DSA_27_NOTES: TopicLearningNote[] = [
  {
    id: 'note-dsa-arrays-strings',
    topicId: 'dsa-arrays-strings',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Arrays & Strings',
    category: 'Linear Structures',
    summary: 'Contiguous memory address calculation, dynamic array geometric resizing proof, sliding window, and two-pointer paradigms.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Memory Layout Invariants',
      subtitle: 'Spatial Locality, Cache Lines & Geometric Doubling Amortization',
      sections: [
        {
          heading: '1. Contiguous Address Offset Invariant',
          content: 'Array elements are laid out in contiguous physical memory. The memory offset of any element index i is computed directly via pointer arithmetic: Addr(A[i]) = BaseAddress + i * sizeof(T). This mathematical property provides instantaneous O(1) random access without pointer indirection.',
          invariantFormula: '\\text{Addr}(A[i]) = \\text{Base} + i \\cdot \\text{sizeof}(T)'
        },
        {
          heading: '2. Amortized O(1) Capacity Doubling Proof',
          content: 'Dynamic arrays double capacity (N -> 2N) upon overflow. Across N sequential insertions, allocations occur at sizes 1, 2, 4, 8, ..., N. Total copies = \\sum_{k=0}^{\\log_2 N} 2^k = 2N - 1 < 2N. The amortized cost per append is (N + 2N) / N = O(1).'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Sliding Window Algorithm, Edge Cases & Complexity Bounds',
      codeExample: {
        language: 'typescript',
        title: 'Variable-Size Sliding Window (Longest Substring Without Repeats)',
        code: `function lengthOfLongestSubstring(s: string): number {
    const lastSeenIndex = new Map<string, number>();
    let maxLength = 0;
    let windowStart = 0;

    for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
        const char = s[windowEnd];
        if (lastSeenIndex.has(char) && lastSeenIndex.get(char)! >= windowStart) {
            windowStart = lastSeenIndex.get(char)! + 1; // Slide left pointer forward
        }
        lastSeenIndex.set(char, windowEnd);
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}`,
        explanation: 'Sliding window shifts the left pointer monotonically, guaranteeing each character is visited at most twice for an optimal O(N) runtime.'
      },
      complexityAnalysis: [
        { operation: 'Random Index Access', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
        { operation: 'Append (Amortized)', best: 'O(1)', average: 'O(1)', worst: 'O(N) (realloc)', space: 'O(1)' },
        { operation: 'Arbitrary Insertion / Deletion', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(1)' },
        { operation: 'Two-Pointer / Sliding Window', best: 'O(N)', average: 'O(N)', worst: 'O(N)', space: 'O(min(N, \\Sigma))' }
      ],
      commonPitfalls: [
        'Resizing dynamic arrays by an additive increment (+10 slots) causes O(N^2) total allocation time instead of linear time.',
        'Off-by-one errors when managing sliding window boundaries: window length is always (windowEnd - windowStart + 1).',
        'Creating new substrings inside high-frequency loops in immutable string languages (like Java/Python), creating huge garbage collection overhead.'
      ],
      examCheatsheet: [
        'Prefix Sum allows range sum queries in O(1) time after O(N) preprocessing.',
        'Kadane’s algorithm finds maximum subarray sum in O(N) time and O(1) space.',
        'Two pointers moving towards each other solves pair sum in sorted arrays in O(N) time.'
      ]
    },
    youtubeVideo: {
      videoId: 'wiGpQwVHdE0',
      title: 'Sliding Window & Two Pointer Techniques | Data Structures & Algorithms',
      channel: 'NeetCode',
      duration: '19:40',
      takeaways: ['Sliding window template code structure', 'Two pointer convergence on sorted arrays', 'Time and space complexity optimizations']
    },
    audioScript: 'Arrays provide contiguous memory layout with instantaneous O(1) index addressing. The sliding window pattern processes sequential ranges in linear time.'
  },
  {
    id: 'note-dsa-linked-lists',
    topicId: 'dsa-linked-lists',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Linked Lists',
    category: 'Linear Structures',
    summary: 'Singly, doubly, and circular linked lists, pointer manipulation, Floyd’s Tortoise and Hare cycle detection proof, and list reversal.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Pointer Invariants',
      subtitle: 'Discontiguous Memory, Floyd’s Cycle Proof & Sentinel Nodes',
      sections: [
        {
          heading: '1. Floyd’s Cycle Detection Theorem (Tortoise and Hare)',
          content: 'Let non-cyclic distance before the loop be L, and the loop circumference be C. Slow moves 1 step per tick; Fast moves 2 steps. When Slow enters the loop, Fast is at some distance k within the loop. The relative distance decreases by 1 each step. They are guaranteed to meet within C steps. Resetting Slow to head while keeping Fast at meet point and moving both at 1 step locates the cycle start at exact distance L.',
          invariantFormula: '2 \\cdot \\text{dist}(Slow) - \\text{dist}(Fast) = k \\cdot C'
        },
        {
          heading: '2. Sentinel (Dummy) Node Invariant',
          content: 'Employing a dummy sentinel node prior to head (dummy.next = head) eliminates boundary checks for empty lists, single-element deletions, and insertions at the head.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'In-Place Linked List Reversal, Edge Cases & Cheatsheet',
      codeExample: {
        language: 'typescript',
        title: 'Iterative In-Place Singly Linked List Reversal',
        code: `class ListNode {
    val: number;
    next: ListNode | null = null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr !== null) {
        const nextTemp = curr.next; // Cache next pointer
        curr.next = prev;           // Invert pointer
        prev = curr;                // Advance prev
        curr = nextTemp;            // Advance curr
    }
    return prev; // New head of reversed list
}`,
        explanation: 'Three-pointer iteration reverses the entire list in O(N) time using O(1) auxiliary space.'
      },
      complexityAnalysis: [
        { operation: 'Prepend (Push Front)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
        { operation: 'Search by Value', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(1)' },
        { operation: 'Reverse in Place', best: 'O(N)', average: 'O(N)', worst: 'O(N)', space: 'O(1)' },
        { operation: 'Floyd Cycle Detection', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(1)' }
      ],
      commonPitfalls: [
        'Losing reference to the rest of the list before breaking curr.next pointer (always save nextTemp first).',
        'Dereferencing null pointers on fast.next before checking fast !== null in Floyd cycle detection.',
        'Failing to set the original head.next to null when reversing, creating infinite circular cycles.'
      ],
      examCheatsheet: [
        'Floyd’s cycle detection runs in O(N) time and O(1) memory without modifying node values.',
        'Fast and slow pointers also find the exact midpoint of a linked list in a single pass.',
        'Doubly linked lists enable O(1) node deletion when a direct pointer to the target node is provided.'
      ]
    },
    youtubeVideo: {
      videoId: 'gBTe7lFR3vc',
      title: 'Floyd’s Tortoise and Hare Cycle Detection Proof & Linked List Reversal',
      channel: 'NeetCode',
      duration: '16:45',
      takeaways: ['Mathematical proof of cycle detection meeting point', 'Step by step linked list reversal walkthrough', 'Dummy head pattern to avoid null checks']
    },
    audioScript: 'Linked lists chain discontiguous memory allocations through pointers. Floyds tortoise and hare algorithm detects circular cycles in linear time and constant space.'
  },
  {
    id: 'note-dsa-stacks-queues',
    topicId: 'dsa-stacks-queues',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Stacks & Queues',
    category: 'Linear Structures',
    summary: 'LIFO and FIFO mechanics, circular buffer queue implementation, Monotonic Stack pattern, and mathematical expression evaluation.',
    readingTimeMinutes: 7,
    page1: {
      title: 'Architectural Theory & Monotonic Stack Invariants',
      subtitle: 'LIFO State Machines, Circular Ring Buffers & Monotonic Ordering',
      sections: [
        {
          heading: '1. Monotonic Stack Ordering Theorem',
          content: 'A monotonic stack maintains elements in strictly increasing (or decreasing) order. When a new element arrives that violates monotonicity, elements are popped until order is restored. Because every element is pushed exactly once and popped at most once, the total amortized runtime is O(N). Solves Next Greater Element, Daily Temperatures, and Largest Rectangle in Histogram in linear time.',
          invariantFormula: '\\forall i < j \\text{ on stack}: \\text{Stack}[i] < \\text{Stack}[j]'
        },
        {
          heading: '2. Circular Buffer Queue Invariant',
          content: 'A ring buffer avoids shifting elements upon dequeue by updating head and tail indices modulo capacity: head = (head + 1) % capacity. Full condition: (tail + 1) % capacity == head.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Next Greater Element Monotonic Stack, Edge Cases & Cheatsheet',
      codeExample: {
        language: 'typescript',
        title: 'Next Greater Element via Monotonic Decreasing Stack',
        code: `function nextGreaterElement(nums: number[]): number[] {
    const result = new Array(nums.length).fill(-1);
    const stack: number[] = []; // Stores indices of unresolved elements

    for (let i = 0; i < nums.length; i++) {
        // While current element is greater than element at stack top
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const poppedIndex = stack.pop()!;
            result[poppedIndex] = nums[i]; // Found next greater element!
        }
        stack.push(i);
    }
    return result;
}`,
        explanation: 'Each index is pushed and popped at most once, yielding an optimal O(N) runtime.'
      },
      complexityAnalysis: [
        { operation: 'Stack Push / Pop', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
        { operation: 'Queue Enqueue / Dequeue', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
        { operation: 'Monotonic Stack Pass', best: 'O(N)', average: 'O(N)', worst: 'O(N)', space: 'O(N)' }
      ],
      commonPitfalls: [
        'Pushing array values onto monotonic stacks instead of array indices, losing positional context for distance calculations.',
        'Using JavaScript Array.shift() for a FIFO queue, which incurs O(N) unshifting reallocations on every operation.'
      ],
      examCheatsheet: [
        'Stack is LIFO (Last-In-First-Out); Queue is FIFO (First-In-First-Out).',
        'Two stacks can implement a FIFO queue with amortized O(1) operations.',
        'Infix to Postfix expression conversion uses Dijkstra’s Shunting-Yard algorithm using an operator stack.'
      ]
    },
    youtubeVideo: {
      videoId: 'Dq_ObNwRN_A',
      title: 'Monotonic Stack Pattern & Next Greater Element | DSA Masterclass',
      channel: 'NeetCode',
      duration: '18:10',
      takeaways: ['Why monotonic stacks execute in O(N) amortized time', 'Daily temperatures and next greater element code', 'Circular array variant handling']
    },
    audioScript: 'Stacks and queues govern sequential processing order. Monotonic stacks resolve nearest greater or smaller elements in linear time.'
  },
  {
    id: 'note-dsa-trees',
    topicId: 'dsa-trees',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Binary Trees & BST',
    category: 'Non-Linear Structures',
    summary: 'Binary search tree ordering property, Tree traversals (In-order, Pre-order, Post-order, Level-order), and AVL height-balance factor.',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & BST Invariants',
      subtitle: 'Recursive Structural Invariants, In-Order Sorting & AVL Rotations',
      sections: [
        {
          heading: '1. Binary Search Tree Ordering Invariant',
          content: 'For every node N with key K: all keys in the left subtree of N are strictly less than K, and all keys in the right subtree are strictly greater than K. An In-Order traversal (Left, Root, Right) of any valid BST yields keys in strictly ascending sorted order in O(N) time.',
          invariantFormula: '\\forall x \\in Left(N): val(x) < val(N) < \\forall y \\in Right(N): val(y)'
        },
        {
          heading: '2. AVL Tree Balance Factor Invariant',
          content: 'AVL trees enforce that for every node, Balance Factor BF = height(Left) - height(Right) \\in {-1, 0, 1}. Violations (BF = 2 or -2) are corrected in O(1) time via Single Rotations (LL, RR) or Double Rotations (LR, RL), maintaining strict O(log N) tree height.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'BST Validation with Bounds, Morris Traversal & Traps',
      codeExample: {
        language: 'typescript',
        title: 'Validate Binary Search Tree with Min/Max Bounds',
        code: `class TreeNode {
    val: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    constructor(val: number) { this.val = val; }
}

function isValidBST(root: TreeNode | null, minVal = -Infinity, maxVal = Infinity): boolean {
    if (root === null) return true;
    // Current node must strictly adhere to inherited boundary invariant
    if (root.val <= minVal || root.val >= maxVal) return false;

    return isValidBST(root.left, minVal, root.val) &&
           isValidBST(root.right, root.val, maxVal);
}`,
        explanation: 'Checking only immediate children is insufficient; passing down ancestral min/max boundaries verifies whole-subtree invariants.'
      },
      complexityAnalysis: [
        { operation: 'BST Search (Balanced)', best: 'O(1)', average: 'O(log N)', worst: 'O(log N)', space: 'O(log N)' },
        { operation: 'BST Search (Skewed)', best: 'O(1)', average: 'O(N)', worst: 'O(N)', space: 'O(N)' },
        { operation: 'Tree Traversal (All Nodes)', best: 'O(N)', average: 'O(N)', worst: 'O(N)', space: 'O(h)' }
      ],
      commonPitfalls: [
        'Validating a BST by checking only left.val < root.val and right.val > root.val without checking ancestral subtrees.',
        'Forgetting that tree recursion consumes O(h) call stack memory, causing StackOverflowError on deeply skewed trees.'
      ],
      examCheatsheet: [
        'In-order traversal of a BST generates elements in strictly sorted order.',
        'Maximum number of nodes at depth d of a binary tree is 2^d; maximum nodes for height h is 2^{h+1} - 1.',
        'Morris In-Order Traversal achieves O(N) time and O(1) space using threaded binary tree pointers.'
      ]
    },
    youtubeVideo: {
      videoId: 'sWbzWC89_P0',
      title: 'Binary Tree Algorithms & BST Traversal Mastery',
      channel: 'freeCodeCamp.org',
      duration: '2:15:20',
      takeaways: ['Recursive vs Iterative DFS traversals', 'Validating BST with mathematical bounds', 'Lowest Common Ancestor (LCA) algorithms']
    },
    audioScript: 'Binary search trees organize hierarchical keys. In-order traversals yield sorted sequences, while AVL balancing guarantees logarithmic search heights.'
  },
  {
    id: 'note-dsa-graphs',
    topicId: 'dsa-graphs',
    subjectId: 'dsa',
    subjectName: 'Data Structures & Algorithms',
    topicName: 'Graphs & Traversals',
    category: 'Non-Linear Structures',
    summary: 'Adjacency list vs matrix representations, Breadth-First Search (BFS), Depth-First Search (DFS), and Dijkstra’s shortest path algorithm.',
    readingTimeMinutes: 8,
    page1: {
      title: 'Architectural Theory & Shortest Path Invariants',
      subtitle: 'Graph Representations, BFS Shortest Hops & Dijkstra’s Greedy Proof',
      sections: [
        {
          heading: '1. BFS Monotonic Distance Discovery Invariant',
          content: 'Breadth-First Search processes vertices layer by layer in monotonic distance order using a FIFO queue. The first time a target vertex v is discovered from source s, the recorded path length dist[v] is mathematically guaranteed to be the minimum hop distance.',
          invariantFormula: '\\text{dist}[v] = \\text{dist}[u] + 1 \\quad (\\forall v \\in \\text{Neighbors}(u))'
        },
        {
          heading: '2. Dijkstra’s Algorithm Greedy Choice Property',
          content: 'Dijkstra’s algorithm computes single-source shortest paths on graphs with non-negative edge weights using a min-priority queue. Invariant: when a node u is extracted from the priority queue, its recorded dist[u] is optimal and will never be relaxed again.'
        }
      ]
    },
    page2: {
      title: 'Production Implementation & High-Yield Cheatsheet',
      subtitle: 'Dijkstra’s Algorithm with Min-Heap, Edge Cases & Cheatsheet',
      codeExample: {
        language: 'typescript',
        title: 'Dijkstra’s Single-Source Shortest Path Implementation',
        code: `interface Edge { to: number; weight: number; }

function dijkstra(n: number, graph: Edge[][], source: number): number[] {
    const dist = new Array(n).fill(Infinity);
    dist[source] = 0;
    
    // Priority queue storing [node, distance]
    const pq: [number, number][] = [[source, 0]];

    while (pq.length > 0) {
        pq.sort((a, b) => a[1] - b[1]); // Min-heap behavior
        const [u, d] = pq.shift()!;

        if (d > dist[u]) continue; // Stale heap entry

        for (const edge of graph[u]) {
            if (dist[u] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.weight; // Relax edge
                pq.push([edge.to, dist[edge.to]]);
            }
        }
    }
    return dist;
}`,
        explanation: 'Relaxing edges monotonically updates shortest distances until all reachable vertices are visited.'
      },
      complexityAnalysis: [
        { operation: 'BFS / DFS (Adjacency List)', best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)' },
        { operation: 'BFS / DFS (Adjacency Matrix)', best: 'O(V^2)', average: 'O(V^2)', worst: 'O(V^2)', space: 'O(V^2)' },
        { operation: 'Dijkstra (Binary Min-Heap)', best: 'O((V + E) log V)', average: 'O((V + E) log V)', worst: 'O((V + E) log V)', space: 'O(V)' }
      ],
      commonPitfalls: [
        'Running Dijkstra’s algorithm on graphs with negative edge weights (infinite loop or incorrect answers; use Bellman-Ford instead).',
        'Omitting the `if (d > dist[u]) continue;` check, leading to redundant edge relaxations from stale priority queue entries.'
      ],
      examCheatsheet: [
        'BFS uses a FIFO queue and finds shortest path in unweighted graphs.',
        'DFS uses a LIFO stack (or recursion) and is ideal for connected components, topological sort, and cycle detection.',
        'Handshaking Lemma: In any undirected graph, \\sum \\text{deg}(v) = 2 |E|.'
      ]
    },
    youtubeVideo: {
      videoId: 'tWVWeAqZ0WU',
      title: 'Graph Algorithms & Traversals (BFS, DFS, Dijkstra, Bellman-Ford)',
      channel: 'freeCodeCamp.org',
      duration: '2:40:15',
      takeaways: ['Adjacency list memory efficiency', 'Cycle detection in directed vs undirected graphs', 'Dijkstra edge relaxation step by step']
    },
    audioScript: 'Graphs model relational networks. Breadth-first search traverses shortest hops in unweighted graphs, while Dijkstra uses priority queues for weighted paths.'
  }
];

// Generate comprehensive notes for remaining 22 DSA topics
const REMAINING_DSA_CONFIGS = [
  { id: 'dsa-asymptotics', name: 'Asymptotic Analysis & Master Theorem', desc: 'Big-O, Omega, Theta definitions, amortized cost, and recurrence relations.' },
  { id: 'dsa-hash-tables', name: 'Hash Tables & Collision Resolution', desc: 'Separate chaining, open addressing, load factor threshold, and robin hood hashing.' },
  { id: 'dsa-dsu', name: 'Disjoint Set Union (Union-Find)', desc: 'Find with path compression, union by rank, and cycle detection in undirected graphs.' },
  { id: 'dsa-heaps', name: 'Heaps & Priority Queues', desc: 'Binary heap array representation, buildHeap in O(N), and HeapSort mechanics.' },
  { id: 'dsa-red-black', name: 'Self-Balancing Trees (Red-Black & Splay)', desc: 'Red-black invariant rules, tree rotations, and splay tree self-adjustment.' },
  { id: 'dsa-trie', name: 'Trie (Prefix Tree) & Radix Trees', desc: 'Prefix tree nodes, string insertion, autocomplete search, and compressed tries.' },
  { id: 'dsa-segment-tree', name: 'Segment Trees & Range Queries', desc: 'Range sum/min queries, point updates, tree construction in O(N), and lazy propagation.' },
  { id: 'dsa-fenwick', name: 'Fenwick Tree (Binary Indexed Tree)', desc: 'Lowbit operation (x & -x), prefix sums in O(log N), and point updates.' },
  { id: 'dsa-divide-conquer', name: 'Divide & Conquer Analysis', desc: 'Merge Sort, Quick Sort (Lomuto vs Hoare), QuickSelect in O(N), and stability.' },
  { id: 'dsa-dp-knapsack', name: 'Dynamic Programming: Knapsack & Subsets', desc: '0/1 Knapsack, Unbounded Knapsack, Subset Sum, and 1D memory optimization.' },
  { id: 'dsa-dp-advanced', name: 'Advanced Dynamic Programming', desc: 'Longest Common Subsequence, Matrix Chain Multiplication, and Bitmask DP.' },
  { id: 'dsa-greedy', name: 'Greedy Algorithms & Proofs', desc: 'Greedy-choice property, optimal substructure, Huffman coding, and interval scheduling.' },
  { id: 'dsa-mst', name: 'Minimum Spanning Tree (Kruskal & Prim)', desc: 'Cut property, Kruskal with DSU, and Prim with priority queues.' },
  { id: 'dsa-shortest-paths', name: 'Advanced Shortest Paths (Bellman-Ford & Floyd)', desc: 'Bellman-Ford negative cycle detection, and Floyd-Warshall all-pairs shortest paths.' },
  { id: 'dsa-network-flow', name: 'Network Flow & Ford-Fulkerson', desc: 'Residual graphs, augmenting paths, Edmonds-Karp BFS, and Max-Flow Min-Cut.' },
  { id: 'dsa-string-matching', name: 'String Matching (KMP & Rabin-Karp)', desc: 'Knuth-Morris-Pratt LPS array, and Rabin-Karp rolling hash algorithms.' },
  { id: 'dsa-backtracking', name: 'Backtracking & Pruning Paradigms', desc: 'State-space exploration, N-Queens problem, and Sudoku branch pruning.' },
  { id: 'dsa-topo-sort', name: 'Topological Sort & DAG Cycle Detection', desc: 'Kahn’s algorithm using indegree queues, and DFS finishing times.' },
  { id: 'dsa-b-trees', name: 'B-Trees & B+ Trees', desc: 'Order M multiway search trees, node splitting, and range scanning.' },
  { id: 'dsa-spatial', name: 'Spatial Structures: KD-Trees & QuadTrees', desc: 'Multi-dimensional point partitioning and nearest-neighbor search pruning.' },
  { id: 'dsa-geometric', name: 'Computational Geometry & Convex Hull', desc: 'Cross product orientation test, and Graham scan convex hull algorithm.' },
  { id: 'dsa-randomized', name: 'Randomized Algorithms & Skip Lists', desc: 'Skip list probabilistic layers, randomized QuickSelect, and Monte Carlo guarantees.' }
];

REMAINING_DSA_CONFIGS.forEach((cfg, idx) => {
  const youtubeVideoIds = [
    '0IAPZzGSbME', '2_Ea32G48lk', 'wU6udHRIkcc', 'HqPJF2L5h9U', 'qvZGUFHWChY',
    'AXjmTQ8LEoI', 'ZBHKZF5w4dU', 'uSFzHCZ4E-8', 'COk73CPEbvM', '1mtvm2ubHCY',
    'sSno9rV8Rhg', 'ARvQcqJ_-NY', '4ZlRH0EebVE', 'obWXjtg0L64', 'LdOnanfc5TM',
    'V5-7GzOfADQ', 'xFv_Hl4B83A', 'eL-KzMXSXXI', 'aZjYr87r1b8', 'BK5x7IUTIyU',
    'SBdXcm-S1hU', 'UGqB_c3B9U4'
  ];
  DSA_27_NOTES.push(
    createComprehensiveTopicNote(
      cfg.id,
      cfg.name,
      'dsa',
      'Data Structures & Algorithms',
      'DSA Core',
      cfg.desc,
      youtubeVideoIds[idx % youtubeVideoIds.length],
      `${cfg.name} - Complete Algorithms Breakdown & Visual Proof`,
      'NeetCode'
    )
  );
});
