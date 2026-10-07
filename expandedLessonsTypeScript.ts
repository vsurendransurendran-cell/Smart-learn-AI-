import { CodeLesson } from '../types';

export const EXPANDED_TYPESCRIPT_LESSONS: CodeLesson[] = [
  {
    id: 'ts-exp-1',
    title: 'Discriminated Unions & Exhaustive never Checking',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Leverage literal discriminant tags to enforce compile-time safety across complex polymorphic domain state machines.',
    concepts: ['Literal discriminant keys', 'Type narrowing via switch', 'Exhaustive check with never', 'Compile-time unhandled case detection'],
    starterCode: `type NetworkState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: string };

function renderState(state: NetworkState): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting to start request...';
    case 'loading':
      return 'Fetching remote resources...';
    case 'success':
      return \`Received \${state.data.length} items\`;
    case 'error':
      return \`Failed: \${state.error}\`;
    default: {
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
    }
  }
}

console.log(renderState({ status: 'success', data: ['item1', 'item2'] }));`,
    expectedOutput: 'Received 2 items',
    explanation: 'Assigning unhandled cases to the `never` type produces a compiler error whenever a new variant is added to the union without an accompanying switch case.',
    bugChallenge: {
      title: 'Missing Exhaustive Switch Check',
      description: 'Without a never check, adding a new union member fails silently at runtime.',
      buggyCode: `type Action = { type: 'ADD' } | { type: 'SUB' };\nfunction handle(a: Action) {\n  if (a.type === 'ADD') return 1;\n  // BUG: what if 'SUB' or future 'MUL' added? returns undefined silently!\n}`,
      solutionCode: `type Action = { type: 'ADD' } | { type: 'SUB' };\nfunction handle(a: Action): number {\n  switch (a.type) {\n    case 'ADD': return 1;\n    case 'SUB': return -1;\n  }\n}`,
      hint: 'Use a switch statement that handles all variants with a return type.',
      bugExplanation: 'Exhaustive pattern checks ensure complete runtime coverage and enforce typed returns.'
    }
  },
  {
    id: 'ts-exp-2',
    title: 'Conditional Types & the infer Keyword',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Extract inner return types, promise unwrapping, and array element types dynamically at compile time.',
    concepts: ['T extends U ? X : Y syntax', 'infer keyword for type pattern extraction', 'Flattening nested Promises (Awaited<T>)', 'Distributed conditional types'],
    starterCode: `type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type ElementType<T> = T extends (infer U)[] ? U : T;

type Example1 = UnpackPromise<Promise<string>>; // string
type Example2 = ElementType<number[]>;          // number

const message: Example1 = "Extracted Promise Type Successfully";
const count: Example2 = 42;

console.log(message, count);`,
    expectedOutput: 'Extracted Promise Type Successfully 42',
    explanation: 'The `infer` keyword introduces a type variable within the conditional check to capture and return types deduced by the compiler.',
    bugChallenge: {
      title: 'Distribution Over Unions in Conditional Types',
      description: 'Naked type variables in conditional types distribute across unions, often causing unexpected union expansion.',
      buggyCode: `type ToArray<T> = T extends any ? T[] : never;\ntype Res = ToArray<string | number>; // BUG: Res is string[] | number[], not (string | number)[]!`,
      solutionCode: `type ToArray<T> = [T] extends [any] ? T[] : never;\ntype Res = ToArray<string | number>; // Res is (string | number)[]`,
      hint: 'Wrap the type variable in a tuple [T] to prevent distribution.',
      bugExplanation: 'Wrapping both sides of extends in square brackets disables default distributive behavior over union types.'
    }
  },
  {
    id: 'ts-exp-3',
    title: 'Template Literal Types & String Pattern Matching',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Build type-safe event systems and routing URLs by combining string literals at the type level.',
    concepts: ['Template literal type syntax (\`\${T}\`)', 'Uppercase & Lowercase intrinsics', 'Type-safe event strings (\`on\${Capitalize<Event>}\`)', 'Key remapping with as'],
    starterCode: `type Event = 'click' | 'hover' | 'focus';
type HandlerName = \`on\${Capitalize<Event>}\`;

type EventMap = {
  [K in HandlerName]: (e: any) => void;
};

const handlers: Partial<EventMap> = {
  onClick: (e) => console.log('Clicked!'),
  onHover: (e) => console.log('Hovered!')
};

console.log('Registered Handlers:', Object.keys(handlers));`,
    expectedOutput: 'Registered Handlers: [ \'onClick\', \'onHover\' ]',
    explanation: 'Template literal types produce cross-product unions of string values, giving compile-time autocomplete to event names, CSS properties, and API routes.',
    bugChallenge: {
      title: 'Typo in Template Literal Event Key',
      description: 'A casing mistake in the event name causes TypeScript to reject the object keys.',
      buggyCode: `type Event = 'click';\ntype Handlers = { [K in \`on\${Capitalize<Event>}\`]: () => void };\n// BUG: 'onclick' does not match 'onClick'\nconst bad: Handlers = { onclick: () => {} };`,
      solutionCode: `type Event = 'click';\ntype Handlers = { [K in \`on\${Capitalize<Event>}\`]: () => void };\nconst good: Handlers = { onClick: () => {} };`,
      hint: 'Capitalize turns "click" into "Click", so the key must be "onClick".',
      bugExplanation: 'TypeScript strictly validates string casings generated by template literal types.'
    }
  },
  {
    id: 'ts-exp-4',
    title: 'Mapped Types & Key Remapping via as Clause',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Transform object interfaces dynamically while filtering keys and generating getter/setter signatures.',
    concepts: ['Mapped type syntax {[K in keyof T]: T[K]}', 'Key filtering via as K extends ... ? K : never', 'Getter/setter generation', 'Readonly and optional modifiers (+/-)'],
    starterCode: `interface User {
  id: string;
  name: string;
  age: number;
}

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;

const userManager: UserGetters = {
  getId: () => 'usr_001',
  getName: () => 'Anya',
  getAge: () => 22
};

console.log('Name from generated getter:', userManager.getName());`,
    expectedOutput: 'Name from generated getter: Anya',
    explanation: 'The `as` clause in mapped types allows transforming or filtering object keys during iteration, generating idiomatic accessor methods automatically.',
    bugChallenge: {
      title: 'Filtering Keys with never Mapped Type Bug',
      description: 'Omitting key remapping causes unwanted non-string or non-matching keys to remain in the transformed type.',
      buggyCode: `type OnlyStrings<T> = { [K in keyof T]: T[K] extends string ? T[K] : never }; // BUG: retains non-string keys with value 'never'!`,
      solutionCode: `type OnlyStrings<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };`,
      hint: 'Remap the key itself using `as` to `never` to completely filter out the property.',
      bugExplanation: 'Mapping the key to `never` removes the attribute from the resulting interface entirely.'
    }
  },
  {
    id: 'ts-exp-5',
    title: 'Nominal & Branded Types for Type-Safe Primitives',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Prevent mixing up identical primitive types like UserId and OrderId using compile-time type branding.',
    concepts: ['Structural typing vs nominal typing', 'Brand property pattern', 'Zero-cost compile time tag', 'Type assertion smart constructors'],
    starterCode: `type Brand<K, T> = K & { readonly __brand: T };

type UserId = Brand<string, 'UserId'>;
type OrderId = Brand<string, 'OrderId'>;

function makeUserId(id: string): UserId {
  return id as UserId;
}

function fetchUser(id: UserId) {
  console.log(\`Fetching database record for user: \${id}\`);
}

const uId = makeUserId('usr-4819');
fetchUser(uId);
// fetchUser('raw_string'); // Compiler prevents accidental raw string pass!`,
    expectedOutput: 'Fetching database record for user: usr-4819',
    explanation: 'TypeScript uses structural typing by default. Adding a unique phantom brand property creates nominal types that cannot be accidentally interchanged.',
    bugChallenge: {
      title: 'Accidental Primitive Passing Bug',
      description: 'Passing an order ID into a function expecting a user ID should trigger a type error.',
      buggyCode: `type UserId = string;\ntype OrderId = string;\nfunction processOrder(u: UserId, o: OrderId) {}\n// BUG: Arguments swapped without compiler warning!\nprocessOrder("order-1", "user-1");`,
      solutionCode: `type Brand<K, T> = K & { readonly __brand: T };\ntype UserId = Brand<string, 'UserId'>;\ntype OrderId = Brand<string, 'OrderId'>;\nfunction processOrder(u: UserId, o: OrderId) {}`,
      hint: 'Use branded types for UserId and OrderId.',
      bugExplanation: 'Without brands, type aliases for strings are completely interchangeable aliases without safety.'
    }
  },
  {
    id: 'ts-exp-6',
    title: 'Standard Utility Types: Deep Dive into Pick, Omit & Extract',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Leverage built-in TypeScript utility types to derive clean API contracts from base schemas.',
    concepts: ['Pick<T, K> & Omit<T, K>', 'Extract<T, U> & Exclude<T, U>', 'NonNullable<T>', 'Parameters<T> and ReturnType<T>'],
    starterCode: `interface Article {
  id: string;
  title: string;
  body: string;
  publishedAt: Date;
  draft: boolean;
}

type ArticlePreview = Pick<Article, 'id' | 'title' | 'publishedAt'>;
type CreateArticlePayload = Omit<Article, 'id' | 'publishedAt'>;

const preview: ArticlePreview = {
  id: 'art-1',
  title: 'Mastering TypeScript Types',
  publishedAt: new Date('2026-09-01')
};

console.log('Preview Article:', preview.title);`,
    expectedOutput: 'Preview Article: Mastering TypeScript Types',
    explanation: 'Built-in utility types compose conditional and mapped types to slice and transform interfaces without code duplication.',
    bugChallenge: {
      title: 'Invalid Key in Pick Utility',
      description: 'Specifying a key that does not exist in the source interface causes a compilation error.',
      buggyCode: `interface Person { name: string; }\n// BUG: 'email' is not in keyof Person\ntype Contact = Pick<Person, 'name' | 'email'>;`,
      solutionCode: `interface Person { name: string; email?: string; }\ntype Contact = Pick<Person, 'name' | 'email'>;`,
      hint: 'Ensure all picked keys exist on the parent type.',
      bugExplanation: 'The second parameter of Pick<T, K> is constrained to K extends keyof T.'
    }
  },
  {
    id: 'ts-exp-7',
    title: 'const Assertions & Readonly Tuples (as const)',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Lock down literals into immutable deep-readonly types using the as const suffix.',
    concepts: ['as const expression', 'Literal type inference vs widening', 'Readonly arrays & tuples', 'Deriving unions from const arrays'],
    starterCode: `const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;
type HttpMethod = typeof HTTP_METHODS[number]; // 'GET' | 'POST' | 'PUT' | 'DELETE'

function sendRequest(method: HttpMethod, url: string) {
  console.log(\`Sending \${method} to \${url}\`);
}

sendRequest('GET', '/api/users');
console.log('Available Methods Count:', HTTP_METHODS.length);`,
    expectedOutput: 'Sending GET to /api/users\nAvailable Methods Count: 4',
    explanation: '`as const` instructs TypeScript not to widen strings to `string` or arrays to `string[]`, keeping exact literal values and making properties readonly.',
    bugChallenge: {
      title: 'Array Literal Widening Bug',
      description: 'Without as const, an array is inferred as string[], preventing derivation of a strict string literal union.',
      buggyCode: `const roles = ['admin', 'user'];\n// BUG: UserRole is inferred as 'string' instead of 'admin' | 'user'!\ntype UserRole = typeof roles[number];`,
      solutionCode: `const roles = ['admin', 'user'] as const;\ntype UserRole = typeof roles[number];`,
      hint: 'Add `as const` after the array declaration.',
      bugExplanation: '`as const` prevents type widening to primitive types and creates a readonly tuple of literal types.'
    }
  },
  {
    id: 'ts-exp-8',
    title: 'Function Overloads & Implementation Signatures',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Declare multiple call signatures for a function with different parameter and return type combinations.',
    concepts: ['Overload signatures vs implementation', 'Parameter type disambiguation', 'Implementation signature hiding', 'Alternative: union returns'],
    starterCode: `function format(input: string): string;
function format(input: number): string;
function format(input: boolean): string;
function format(input: string | number | boolean): string {
  if (typeof input === 'string') return input.trim().toUpperCase();
  if (typeof input === 'number') return \`#\${input.toFixed(2)}\`;
  return input ? 'TRUE' : 'FALSE';
}

console.log(format(' hello world '));
console.log(format(19.999));
console.log(format(true));`,
    expectedOutput: 'HELLO WORLD\n#20.00\nTRUE',
    explanation: 'Overload signatures expose distinct strongly-typed entry points to callers while sharing a single unified implementation function.',
    bugChallenge: {
      title: 'Incompatible Implementation Signature Bug',
      description: 'The implementation signature must be broad enough to encompass all defined overload signatures.',
      buggyCode: `function add(a: string, b: string): string;\nfunction add(a: number, b: number): number;\n// BUG: implementation only accepts number, breaking string overload!\nfunction add(a: number, b: number): any { return a + b; }`,
      solutionCode: `function add(a: string, b: string): string;\nfunction add(a: number, b: number): number;\nfunction add(a: any, b: any): any { return a + b; }`,
      hint: 'Make the implementation parameter types compatible with all overloads.',
      bugExplanation: 'The implementation signature must accept all union combinations declared in the preceding overload signatures.'
    }
  },
  {
    id: 'ts-exp-9',
    title: 'Generic Constraints with extends keyword',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Constrain generic parameters to ensure they satisfy minimum shape contracts such as having an id or length.',
    concepts: ['T extends { id: string }', 'keyof constraints (K extends keyof T)', 'Preserving precise input types', 'Multiple generic bounds'],
    starterCode: `interface Identifiable {
  id: string | number;
}

function getById<T extends Identifiable>(items: T[], targetId: string | number): T | undefined {
  return items.find(item => item.id === targetId);
}

const users = [
  { id: 1, name: 'Alice', role: 'Engineer' },
  { id: 2, name: 'Bob', role: 'Designer' }
];

const foundUser = getById(users, 2);
console.log('Found User Role:', foundUser?.role);`,
    expectedOutput: 'Found User Role: Designer',
    explanation: 'Generic constraints guarantee the presence of specific properties while maintaining the exact return type `T` rather than downgrading to the base interface.',
    bugChallenge: {
      title: 'Unconstrained Property Access Error',
      description: 'Accessing property .length on an unconstrained generic T produces a compiler error.',
      buggyCode: `function logLength<T>(item: T) {\n  console.log(item.length); // BUG: Property 'length' does not exist on type 'T'\n}`,
      solutionCode: `function logLength<T extends { length: number }>(item: T) {\n  console.log(item.length);\n}`,
      hint: 'Add `extends { length: number }` to the generic parameter T.',
      bugExplanation: 'Without a constraint, TypeScript assumes `T` could be any type including numbers or booleans which have no length property.'
    }
  },
  {
    id: 'ts-exp-10',
    title: 'Modern TypeScript Decorators (Stage 3)',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Intercept class methods and measure runtime execution using the modern standard decorators specification.',
    concepts: ['Stage 3 decorators specification', 'Method decorator context (ClassMethodDecoratorContext)', 'Target function wrapping', 'Field & class decorators'],
    starterCode: `function logged<This, Args extends any[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  const methodName = String(context.name);
  return function (this: This, ...args: Args): Return {
    console.log(\`[CALL] \${methodName} called with args:\`, args);
    const result = target.call(this, ...args);
    console.log(\`[RETURN] \${methodName} returned:\`, result);
    return result;
  };
}

class Calculator {
  @logged
  add(x: number, y: number): number {
    return x + y;
  }
}

const calc = new Calculator();
calc.add(10, 25);`,
    expectedOutput: '[CALL] add called with args: [ 10, 25 ]\n[RETURN] add returned: 35',
    explanation: 'Modern Stage 3 decorators are officially part of ECMAScript and TypeScript 5.0+, taking a target function and context descriptor without experimental flags.',
    bugChallenge: {
      title: 'Lost this Context in Decorator Wrapper',
      description: 'Using an arrow function inside a method decorator can lose the class instance this binding.',
      buggyCode: `function myDec(target, context) {\n  // BUG: arrow function does not bind dynamic 'this' of caller\n  return (...args) => target(...args);\n}`,
      solutionCode: `function myDec(target, context) {\n  return function(this: any, ...args: any[]) {\n    return target.call(this, ...args);\n  };\n}`,
      hint: 'Use a regular function expression and `target.call(this, ...args)`.',
      bugExplanation: 'Arrow functions lexically bind this from definition scope rather than the dynamic instance invoking the method.'
    }
  },
  {
    id: 'ts-exp-11',
    title: 'Type Narrowing with User-Defined Type Guards (is & asserts)',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Write custom boolean validation functions that narrow unknown data into verified typed interfaces.',
    concepts: ['val is Type return predicate', 'asserts condition syntax', 'Validating external API payloads', 'Safe type casting without as'],
    starterCode: `interface Customer {
  id: string;
  email: string;
}

function isCustomer(obj: unknown): obj is Customer {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    typeof (obj as any).email === 'string'
  );
}

const payload: unknown = { id: 'c-100', email: 'hello@smartlearn.ai' };

if (isCustomer(payload)) {
  console.log('Valid customer email verified:', payload.email);
} else {
  console.log('Invalid payload format');
}`,
    expectedOutput: 'Valid customer email verified: hello@smartlearn.ai',
    explanation: 'The `is` predicate instructs the TypeScript type checker to treat the tested variable as the targeted type in the truthy conditional block.',
    bugChallenge: {
      title: 'Boolean Return Instead of Predicate Bug',
      description: 'Declaring a boolean return type instead of an is predicate does not narrow the variable.',
      buggyCode: `function isString(val: unknown): boolean {\n  return typeof val === 'string';\n}\nconst x: unknown = "hi";\nif (isString(x)) {\n  // BUG: x is still unknown here!\n  console.log(x.toUpperCase());\n}`,
      solutionCode: `function isString(val: unknown): val is string {\n  return typeof val === 'string';\n}\nconst x: unknown = "hi";\nif (isString(x)) {\n  console.log(x.toUpperCase());\n}`,
      hint: 'Change `: boolean` return to `: val is string`.',
      bugExplanation: 'TypeScript requires the explicit type predicate `param is Type` to inform the control-flow analyzer.'
    }
  },
  {
    id: 'ts-exp-12',
    title: 'Recursive Types for JSON & Nested Tree Structures',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Model arbitrarily nested JSON trees and file system hierarchies using self-referential type aliases.',
    concepts: ['Recursive type definitions', 'JSONValue & JSONObject typing', 'Tree nodes with children: TreeNode[]', 'Depth limit considerations'],
    starterCode: `type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

interface FileNode {
  name: string;
  sizeBytes?: number;
  children?: FileNode[];
}

const fileSystemTree: FileNode = {
  name: 'root',
  children: [
    { name: 'src', children: [{ name: 'index.ts', sizeBytes: 1024 }] },
    { name: 'package.json', sizeBytes: 512 }
  ]
};

console.log('Root Directory Name:', fileSystemTree.name);
console.log('First Child Directory:', fileSystemTree.children?.[0]?.name);`,
    expectedOutput: 'Root Directory Name: root\nFirst Child Directory: src',
    explanation: 'TypeScript supports recursive type aliases where the type references itself in its own definition, ideal for representing recursive schemas.',
    bugChallenge: {
      title: 'Infinite Non-Terminating Recursive Type',
      description: 'A recursive type without a non-recursive base case causes TypeScript to report a circular reference error.',
      buggyCode: `type BadTree = { value: number; left: BadTree }; // BUG: infinite depth without optional or null!`,
      solutionCode: `type SafeTree = { value: number; left?: SafeTree; right?: SafeTree };`,
      hint: 'Make child branches optional with `?` or union with `null`.',
      bugExplanation: 'Recursive types must provide a terminal base case to avoid impossible infinite structures.'
    }
  },
  {
    id: 'ts-exp-13',
    title: 'Declaration Merging for Interfaces & Namespaces',
    level: 'intermediate',
    durationMinutes: 20,
    summary: 'Extend existing third-party library types and standard ambient globals using declaration merging.',
    concepts: ['Interface open-ended merging', 'Namespace & function merging', 'Extending Window & Express Request', 'Module augmentation'],
    starterCode: `interface AppConfig {
  appName: string;
  version: string;
}

// Re-open AppConfig to add extra properties without modifying original interface
interface AppConfig {
  environment: 'development' | 'production';
}

const config: AppConfig = {
  appName: 'SmartLearn',
  version: '2.5.0',
  environment: 'production'
};

console.log(\`App: \${config.appName} v\${config.version} [\${config.environment}]\`);`,
    expectedOutput: 'App: SmartLearn v2.5.0 [production]',
    explanation: 'Unlike type aliases, interfaces are "open-ended" and automatically merge multiple declarations with the same name into a unified contract.',
    bugChallenge: {
      title: 'Duplicate Identifier in Type Alias Bug',
      description: 'Attempting declaration merging on type aliases causes a compile-time "Duplicate identifier" error.',
      buggyCode: `type Point = { x: number; };\ntype Point = { y: number; }; // BUG: Duplicate identifier 'Point'!`,
      solutionCode: `interface Point { x: number; }\ninterface Point { y: number; }`,
      hint: 'Use `interface` instead of `type` when declaration merging is required.',
      bugExplanation: 'Type aliases cannot be reopened once declared; interface declarations merge automatically.'
    }
  },
  {
    id: 'ts-exp-14',
    title: 'Async Iterators & Generators with for-await-of',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Stream asynchronous chunks, paginated API responses, and event pulses using AsyncIterable and for-await-of.',
    concepts: ['AsyncIterator & AsyncIterable<T>', 'async function* generator syntax', 'for-await-of loop', 'Symbol.asyncIterator protocol'],
    starterCode: `async function* fetchPaginatedRecords(totalPages: number) {
  for (let page = 1; page <= totalPages; page++) {
    // Emulate network latency
    yield \`Page \${page} items: [record_\${page}A, record_\${page}B]\`;
  }
}

async function run() {
  const messages: string[] = [];
  for await (const chunk of fetchPaginatedRecords(3)) {
    messages.push(chunk);
  }
  console.log('Streamed Chunks Count:', messages.length);
  console.log('First Chunk:', messages[0]);
}

run();`,
    expectedOutput: 'Streamed Chunks Count: 3\nFirst Chunk: Page 1 items: [record_1A, record_1B]',
    explanation: 'Async generators yield promises sequentially, allowing memory-efficient streaming of huge query results without loading all records at once.',
    bugChallenge: {
      title: 'Standard for-of on Async Generator Bug',
      description: 'Using standard synchronous for-of on an async iterable fails to await yielded promises.',
      buggyCode: `async function* gen() { yield 1; }\nasync function test() {\n  // BUG: for-of does not unwrap async iterator promises\n  for (const item of gen()) { console.log(item); }\n}`,
      solutionCode: `async function* gen() { yield 1; }\nasync function test() {\n  for await (const item of gen()) { console.log(item); }\n}`,
      hint: 'Use `for await (const item of ...)` for async generators.',
      bugExplanation: 'Synchronous `for-of` expects `Symbol.iterator`, while async generators implement `Symbol.asyncIterator`.'
    }
  },
  {
    id: 'ts-exp-15',
    title: 'Strict Type-Safe Event Emitter Implementation',
    level: 'intermediate',
    durationMinutes: 25,
    summary: 'Construct an event emitter where event names dynamically constrain callback argument signatures.',
    concepts: ['Generic event maps', 'Keyof event dictionary indexing', 'Type-safe listener registration', 'Variadic event argument tuples'],
    starterCode: `interface AppEvents {
  login: [userId: string, timestamp: number];
  logout: [userId: string];
  error: [err: Error];
}

class TypedEventEmitter<TEvents extends Record<string, any[]>> {
  private listeners: { [K in keyof TEvents]?: ((...args: TEvents[K]) => void)[] } = {};

  on<K extends keyof TEvents>(event: K, handler: (...args: TEvents[K]) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof TEvents>(event: K, ...args: TEvents[K]) {
    this.listeners[event]?.forEach(h => h(...args));
  }
}

const emitter = new TypedEventEmitter<AppEvents>();
emitter.on('login', (uId, time) => {
  console.log(\`User \${uId} logged in at timestamp \${time}\`);
});

emitter.emit('login', 'usr-901', 1700000000);`,
    expectedOutput: 'User usr-901 logged in at timestamp 1700000000',
    explanation: 'Constraining emitter methods with keyof TEvents ensures that emitting an event requires passing the exact tuple parameter types associated with that event.',
    bugChallenge: {
      title: 'Mismatched Event Payload Argument Bug',
      description: 'Emitting an event with incorrect parameter counts or types will be flagged at compile time.',
      buggyCode: `// emitter.emit('login', 'usr-901'); // BUG: Expected 2 arguments, but got 1!`,
      solutionCode: `emitter.emit('login', 'usr-901', Date.now());`,
      hint: 'Provide both arguments defined in the tuple [userId: string, timestamp: number].',
      bugExplanation: 'The tuple specifies both arguments as mandatory.'
    }
  },
  {
    id: 'ts-exp-16',
    title: 'Deep Readonly & Immutable Transformation Helpers',
    level: 'advanced',
    durationMinutes: 20,
    summary: 'Build a recursive DeepReadonly type helper that makes nested object structures and arrays completely immutable.',
    concepts: ['Recursive mapped types', 'Readonly modifier on arrays and objects', 'Primitive base case termination', 'Protection against mutation'],
    starterCode: `type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

interface ComplexConfig {
  database: {
    host: string;
    ports: number[];
  };
}

const config: DeepReadonly<ComplexConfig> = {
  database: {
    host: 'db.internal.cloud',
    ports: [5432, 5433]
  }
};

console.log('Database Host:', config.database.host);
// config.database.ports.push(5434); // Compile error: push does not exist on ReadonlyArray!`,
    expectedOutput: 'Database Host: db.internal.cloud',
    explanation: 'Standard `Readonly<T>` is shallow. DeepReadonly recurses through objects and arrays to freeze modifications at every nested level.',
    bugChallenge: {
      title: 'Shallow Readonly Mutation Trap',
      description: 'Built-in Readonly<T> allows mutation of nested child objects.',
      buggyCode: `const obj: Readonly<{ inner: { count: number } }> = { inner: { count: 1 } };\nobj.inner.count = 2; // BUG: mutated despite Readonly!`,
      solutionCode: `type DeepReadonly<T> = T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]> } : T;\nconst obj: DeepReadonly<{ inner: { count: number } }> = { inner: { count: 1 } };`,
      hint: 'Use a recursive DeepReadonly type instead of shallow Readonly.',
      bugExplanation: 'Readonly only marks immediate properties as readonly, leaving nested objects mutable.'
    }
  },
  {
    id: 'ts-exp-17',
    title: 'Ambient Module Declarations & Non-JS Asset Imports',
    level: 'scratch',
    durationMinutes: 15,
    summary: 'Declare ambient modules to safely import SVG, CSS, PNG, and external untyped assets in TypeScript.',
    concepts: ['declare module "*.svg" syntax', 'Ambient namespace declarations', 'declare global block', 'Importing static assets safely'],
    starterCode: `// Demonstration of ambient type definitions
interface SvgComponent {
  src: string;
  width: number;
}

const logoSvg: SvgComponent = {
  src: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  width: 120
};

console.log('Loaded SVG asset with width:', logoSvg.width);`,
    expectedOutput: 'Loaded SVG asset with width: 120',
    explanation: 'Ambient declarations inform the compiler about identifiers and modules defined outside of TypeScript files (e.g. bundler webpack/vite asset loaders).',
    bugChallenge: {
      title: 'Missing Wildcard in Module Declaration Bug',
      description: 'Declaring a module without the wildcard asterisk fails to match arbitrary file paths.',
      buggyCode: `// declare module ".svg" { ... } // BUG: does not match import x from './icon.svg'`,
      solutionCode: `// declare module "*.svg" { const content: string; export default content; }`,
      hint: 'Use the `*.svg` wildcard pattern.',
      bugExplanation: 'Wildcards allow the declaration to match any module ending in that extension.'
    }
  },
  {
    id: 'ts-exp-18',
    title: 'Index Signatures vs Record<K, V> & keyof Operators',
    level: 'scratch',
    durationMinutes: 20,
    summary: 'Choose appropriately between loose index signatures and strongly-typed Record mappings.',
    concepts: ['[key: string]: T index signatures', 'Record<K, T> utility', 'noUncheckedIndexedAccess compiler flag', 'keyof indexing safety'],
    starterCode: `type Environment = 'dev' | 'staging' | 'prod';

// Strongly typed Record with exact known keys
const apiEndpoints: Record<Environment, string> = {
  dev: 'https://dev.api.internal',
  staging: 'https://staging.api.internal',
  prod: 'https://api.internal'
};

function getEndpoint(env: Environment): string {
  return apiEndpoints[env];
}

console.log('Production Endpoint:', getEndpoint('prod'));`,
    expectedOutput: 'Production Endpoint: https://api.internal',
    explanation: '`Record<K, V>` with union keys guarantees every declared variant has an assigned value, avoiding runtime undefined lookup errors common with loose index signatures.',
    bugChallenge: {
      title: 'Missing Key in Record Mapping Bug',
      description: 'Omitting a key in a Record type with union keys produces an immediate compiler error.',
      buggyCode: `type Status = 'active' | 'inactive';\n// BUG: Missing property 'inactive'\nconst labels: Record<Status, string> = { active: 'Active' };`,
      solutionCode: `type Status = 'active' | 'inactive';\nconst labels: Record<Status, string> = { active: 'Active', inactive: 'Inactive' };`,
      hint: 'Include both active and inactive keys or use Partial<Record<Status, string>>.',
      bugExplanation: 'Record requires all union members to be defined.'
    }
  },
  {
    id: 'ts-exp-19',
    title: 'Variadic Tuple Types & Tuple Concatenation',
    level: 'advanced',
    durationMinutes: 25,
    summary: 'Manipulate tuple arrays using the spread operator at the type level to construct typed function currying.',
    concepts: ['Variadic tuples ([...T, ...U])', 'Prefix & suffix tuple parameters', 'Type-safe function composition', 'Extracting tuple head and tail'],
    starterCode: `type Prepend<Head, Tail extends any[]> = [Head, ...Tail];
type Concat<A extends any[], B extends any[]> = [...A, ...B];

type Numbers = [1, 2, 3];
type MoreNumbers = [4, 5];
type All = Concat<Numbers, MoreNumbers>; // [1, 2, 3, 4, 5]

function concatTuples<T extends any[], U extends any[]>(a: T, b: U): Concat<T, U> {
  return [...a, ...b] as Concat<T, U>;
}

const combined = concatTuples(['a', 'b'], [1, 2]);
console.log('Combined Tuple Length:', combined.length);
console.log('First & Last Elements:', combined[0], combined[3]);`,
    expectedOutput: 'Combined Tuple Length: 4\nFirst & Last Elements: a 2',
    explanation: 'Variadic tuple types allow spreading generic array and tuple types within tuple definitions, enabling strongly typed pipeline composition.',
    bugChallenge: {
      title: 'Unconstrained Variadic Spread Bug',
      description: 'Spreading an unconstrained generic T in a tuple definition causes a compilation error.',
      buggyCode: `type Wrap<T> = [string, ...T]; // BUG: A rest element type must be an array type!`,
      solutionCode: `type Wrap<T extends any[]> = [string, ...T];`,
      hint: 'Constrain generic T to extends any[].',
      bugExplanation: 'Tuple spreads require the operand to be an array or tuple type.'
    }
  },
  {
    id: 'ts-exp-20',
    title: 'TypeScript Compiler API & AST Transformation Basics',
    level: 'advanced',
    durationMinutes: 30,
    summary: 'Explore how the TypeScript compiler creates SourceFiles, parses AST nodes, and generates type checkers.',
    concepts: ['TypeScript compiler architecture', 'ts.createSourceFile', 'SyntaxKind enums & AST nodes', 'Custom AST visitor transformers'],
    starterCode: `// Conceptual model of TypeScript Compiler API traversal
interface ASTNode {
  kind: string;
  text?: string;
  children?: ASTNode[];
}

const sampleAST: ASTNode = {
  kind: 'SourceFile',
  children: [
    { kind: 'VariableStatement', text: 'const x: number = 42;' },
    { kind: 'FunctionDeclaration', text: 'function greet() { return "hi"; }' }
  ]
};

function traverseAST(node: ASTNode, depth = 0) {
  const indent = '  '.repeat(depth);
  console.log(\`\${indent}-> \${node.kind} \${node.text ? \`(\${node.text})\` : ''}\`);
  node.children?.forEach(c => traverseAST(c, depth + 1));
}

traverseAST(sampleAST);`,
    expectedOutput: '-> SourceFile \n  -> VariableStatement (const x: number = 42;)\n  -> FunctionDeclaration (function greet() { return "hi"; })',
    explanation: 'The TypeScript Compiler API converts code into an Abstract Syntax Tree (AST), performs symbol resolution, and produces JavaScript output.',
    bugChallenge: {
      title: 'Mutating AST Directly Instead of Transforming',
      description: 'Directly mutating AST nodes during compilation corrupts cache references; a transformation factory must return fresh nodes.',
      buggyCode: `function badTransform(node) { node.text = "corrupted"; return node; } // BUG: in-place mutation!`,
      solutionCode: `function safeTransform(node, factory) { return factory.updateIdentifier(node, "newName"); }`,
      hint: 'Use the TypeScript factory methods to produce updated immutable nodes.',
      bugExplanation: 'TypeScript AST nodes are designed to be immutable; updater methods clone and link new instances safely.'
    }
  }
];
