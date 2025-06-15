// ============================================================================
// ARROW FUNCTIONS - The Modern Way (ES6+)
// ============================================================================

// WHAT: Shorter syntax for writing functions
// HOW: Use => instead of function keyword
// WHEN: Almost always, except when you need 'this' binding or arguments object

// Basic arrow function - single parameter, no parentheses needed
const greet = name => `Hello, ${name}!`;

// Multiple parameters - parentheses required
const add = (a, b) => a + b;

// No parameters - empty parentheses required
const getRandom = () => Math.random();

// Multiple lines - curly braces + explicit return
const processUser = (user) => {
    const formatted = user.name.toUpperCase();
    const timestamp = new Date().toISOString();
    return { formatted, timestamp };
};

// BRUTAL TRUTH: Arrow functions don't have their own 'this'
// Regular function - 'this' changes based on how it's called
function regularFunction() {
    console.log(this); // Could be window, the calling object, etc.
}

// Arrow function - 'this' is inherited from surrounding scope
const arrowFunction = () => {
    console.log(this); // Same 'this' as the surrounding code
};

// ============================================================================
// OBJECTS - Your Data Containers
// ============================================================================

// WHAT: Collections of key-value pairs
// HOW: Use {} notation or Object constructor
// WHEN: When you need to group related data and functions

// Object literal (most common way)
const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    // Method inside object
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

// Accessing properties
console.log(user.name);        // Dot notation
console.log(user['email']);    // Bracket notation (useful for dynamic keys)

// Adding properties
user.city = 'New York';
user['country'] = 'USA';

// ES6 Destructuring (LEARN THIS - you'll use it everywhere)
const { name, age } = user;
console.log(name, age); // 'John', 30

// Destructuring with renaming
const { name: userName, email: userEmail } = user;

// Destructuring with default values
const { phone = 'No phone' } = user;

// OBJECT METHODS YOU MUST KNOW:

// Object.keys() - Get all property names as array
const keys = Object.keys(user);
// Returns: ['name', 'age', 'email', 'greet', 'city', 'country']

// Object.values() - Get all values as array
const values = Object.values(user);
// Returns: ['John', 30, 'john@example.com', function, 'New York', 'USA']

// Object.entries() - Get key-value pairs as array of arrays
const entries = Object.entries(user);
// Returns: [['name', 'John'], ['age', 30], ...]

// Object.assign() - Copy properties from one object to another
const userCopy = Object.assign({}, user);
// Or use spread operator (modern way)
const userCopy2 = { ...user };

// Object.freeze() - Make object immutable (can't add/change/delete properties)
Object.freeze(user);

// Object.hasOwnProperty() - Check if object has specific property
if (user.hasOwnProperty('name')) {
    console.log('User has name property');
}

// ============================================================================
// ARRAY METHODS - The Power Tools
// ============================================================================

// WHAT: Methods to manipulate arrays without writing loops
// HOW: Chain them together for powerful data transformations
// WHEN: Almost every time you work with arrays

const numbers = [1, 2, 3, 4, 5];
const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 30, active: false },
    { name: 'Charlie', age: 35, active: true }
];

// MAP - Transform each element, returns new array (SAME LENGTH)
// Use when: You want to transform every item
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

const userNames = users.map(user => user.name);
// ['Alice', 'Bob', 'Charlie']

// FILTER - Keep elements that pass a test, returns new array (DIFFERENT LENGTH)
// Use when: You want to remove items based on condition
const evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4]

const activeUsers = users.filter(user => user.active);
// [{ name: 'Alice', age: 25, active: true }, { name: 'Charlie', age: 35, active: true }]

// FIND - Get first element that passes test, returns single item or undefined
// Use when: You want to find ONE specific item
const firstEven = numbers.find(num => num % 2 === 0);
// 2

const alice = users.find(user => user.name === 'Alice');
// { name: 'Alice', age: 25, active: true }

// FINDINDEX - Get index of first element that passes test
// Use when: You need the position, not the item itself
const aliceIndex = users.findIndex(user => user.name === 'Alice');
// 0

// REDUCE - Reduce array to single value (most powerful but hardest)
// Use when: You want to calculate something from all items
const sum = numbers.reduce((total, num) => total + num, 0);
// 15

const totalAge = users.reduce((total, user) => total + user.age, 0);
// 90

// Advanced reduce - group by property
const groupedByActive = users.reduce((groups, user) => {
    const key = user.active ? 'active' : 'inactive';
    if (!groups[key]) groups[key] = [];
    groups[key].push(user);
    return groups;
}, {});

// FOREACH - Execute function for each element (NO RETURN VALUE)
// Use when: You want to do something with each item but don't need new array
numbers.forEach(num => console.log(num));

// SOME - Test if at least one element passes test
// Use when: You want to check if ANY item meets condition
const hasEven = numbers.some(num => num % 2 === 0);
// true

// EVERY - Test if all elements pass test
// Use when: You want to check if ALL items meet condition
const allPositive = numbers.every(num => num > 0);
// true

// INCLUDES - Check if array contains specific value
// Use when: Simple existence check
const hasThree = numbers.includes(3);
// true

// SORT - Sort array in place (MODIFIES ORIGINAL)
// Use when: You need ordered data
const sortedNumbers = [...numbers].sort((a, b) => a - b); // Ascending
const sortedUsers = [...users].sort((a, b) => a.age - b.age); // By age

// REVERSE - Reverse array in place (MODIFIES ORIGINAL)
const reversed = [...numbers].reverse();

// SLICE - Get portion of array (doesn't modify original)
// Use when: You want part of an array
const firstThree = numbers.slice(0, 3);
// [1, 2, 3]

// SPLICE - Add/remove elements at specific position (MODIFIES ORIGINAL)
// Use when: You need to insert/remove at specific index
const numbersCopy = [...numbers];
numbersCopy.splice(2, 1, 99); // At index 2, remove 1 item, add 99
// [1, 2, 99, 4, 5]

// CONCAT - Merge arrays (doesn't modify original)
const moreNumbers = [6, 7, 8];
const combined = numbers.concat(moreNumbers);
// [1, 2, 3, 4, 5, 6, 7, 8]

// Modern way with spread operator
const combined2 = [...numbers, ...moreNumbers];

// JOIN - Convert array to string
const numberString = numbers.join(', ');
// "1, 2, 3, 4, 5"

// ============================================================================
// CHAINING - The Real Power (this is where you become dangerous)
// ============================================================================

// You can chain these methods together for complex transformations
const result = users
    .filter(user => user.active)           // Get only active users
    .map(user => ({ ...user, age: user.age + 1 })) // Increment age
    .sort((a, b) => a.age - b.age)         // Sort by age
    .map(user => user.name);               // Get just names

// BRUTAL INDUSTRY TRUTH:
// - Master these 10 methods: map, filter, find, reduce, forEach, some, every, includes, sort, slice
// - 80% of your array manipulation will use these
// - Learn to chain them - this is how real applications work
// - Always think: "Am I transforming (map), filtering (filter), or calculating (reduce)?"
// - Use const, avoid var, let only when you reassign
// - Spread operator (...) is your friend for copying arrays/objects

// ============================================================================
// COMMON REAL-WORLD PATTERNS
// ============================================================================

// Pattern 1: API data transformation
const apiUsers = [
    { id: 1, first_name: 'John', last_name: 'Doe', is_active: 1 },
    { id: 2, first_name: 'Jane', last_name: 'Smith', is_active: 0 }
];

const transformedUsers = apiUsers
    .filter(user => user.is_active)
    .map(user => ({
        id: user.id,
        fullName: `${user.first_name} ${user.last_name}`,
        active: Boolean(user.is_active)
    }));

// Pattern 2: Form validation
const formData = { name: '', email: 'test@example.com', age: 25 };
const requiredFields = ['name', 'email'];

const missingFields = requiredFields.filter(field => !formData[field]);
const isValid = missingFields.length === 0;

// Pattern 3: Statistics from data
const scores = [85, 92, 78, 96, 88];
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
const highest = Math.max(...scores);
const passingScores = scores.filter(score => score >= 80);

// NOW GO BUILD SOMETHING. Stop reading, start coding.