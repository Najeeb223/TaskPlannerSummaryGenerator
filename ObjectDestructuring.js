// ============================================================================
// DESTRUCTURING MASTERY - Stop Writing Repetitive Code Like an Amateur
// ============================================================================

// WHAT: Extract values from arrays/objects into distinct variables in one line
// WHY: Cleaner code, less repetition, more readable
// WHEN: Every damn time you access multiple properties/elements

// ============================================================================
// OBJECT DESTRUCTURING - The Game Changer
// ============================================================================

// THE OLD WAY (what amateurs still do)
const user = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
    },
    preferences: {
        theme: 'dark',
        notifications: true
    }
};

// Amateur code - repetitive and ugly
// const userName = user.name;
const userEmail = user.email;
const userAge = user.age;
console.log(userName, userEmail, userAge);

// THE PRO WAY - Destructuring
// const { name, email, age } = user;
console.log(name, email, age); // Same result, way cleaner

// RENAMING VARIABLES (when property names suck or conflict)
const { name: fullName, email: emailAddress } = user;
console.log(fullName, emailAddress);

// DEFAULT VALUES (handle missing properties like a boss)
// const { name, phone = 'No phone provided' } = user;
console.log(phone); // 'No phone provided'

// NESTED DESTRUCTURING (this is where you level up)
const { 
    address: { street, city, zipCode },
    preferences: { theme, notifications }
} = user;
console.log(street, city, theme); // '123 Main St', 'New York', 'dark'

// MIXED DESTRUCTURING WITH RENAMING AND DEFAULTS
const {
   // name: userName,
    // age = 18,
    address: { 
        city: userCity = 'Unknown City',
        country = 'USA' 
    }
} = user;

// REST OPERATOR (...) - Capture remaining properties
// const { name, age, ...otherUserData } = user;
console.log(otherUserData); // Everything except name and age

// FUNCTION PARAMETER DESTRUCTURING (industry standard)
// Instead of this amateur shit:
function createUserProfile(user) {
    return `${user.name} (${user.age}) - ${user.email}`;
}

// Write this pro code:
function createUserProfile({ name, age, email, city = 'Unknown' }) {
    return `${name} (${age}) - ${email} from ${city}`;
}

// Call it the same way
const profile = createUserProfile(user);

// ADVANCED: Destructuring with computed property names
const field = 'name';
const { [field]: dynamicValue } = user;
console.log(dynamicValue); // 'John Doe'

// ============================================================================
// ARRAY DESTRUCTURING - Positional Power
// ============================================================================

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const coordinates = [40.7128, -74.0060]; // NYC lat/lng
const apiResponse = ['success', { data: 'user data' }, 200];

// Basic array destructuring
const [first, second, third] = colors;
console.log(first); // 'red'
console.log(second); // 'green'

// Skip elements you don't need
// const [firstColor, , thirdColor] = colors;
console.log(firstColor, thirdColor); // 'red', 'blue'

// Geographic coordinates (common real-world use)
const [latitude, longitude] = coordinates;
console.log(`Lat: ${latitude}, Lng: ${longitude}`);

// Default values for arrays
const [primary, secondary = 'black'] = ['white'];
console.log(secondary); // 'black'

// Rest operator with arrays
const [firstColor, ...remainingColors] = colors;
console.log(remainingColors); // ['green', 'blue', 'yellow', 'purple']

// SWAPPING VARIABLES (mind-blowing one-liner)
let a = 1;
let b = 2;
[a, b] = [b, a]; // Swap without temp variable
console.log(a, b); // 2, 1

// API RESPONSE HANDLING (real industry pattern)
const [status, responseData, statusCode] = apiResponse;
if (status === 'success') {
    console.log('Data:', responseData.data);
}

// ============================================================================
// MIXED DESTRUCTURING - Arrays with Objects
// ============================================================================

const users = [
    { name: 'Alice', scores: [95, 87, 92] },
    { name: 'Bob', scores: [78, 85, 90] },
    { name: 'Charlie', scores: [88, 91, 94] }
];

// Destructure first user and their first score
// const [{ name: firstName, scores: [firstScore] }] = users;
console.log(firstName, firstScore); // 'Alice', 95

// Get first two users
const [firstUser, secondUser] = users;
const { name: user1Name } = firstUser;
const { name: user2Name } = secondUser;

// ============================================================================
// FUNCTION RETURN DESTRUCTURING - Multiple Return Values
// ============================================================================

// Function that returns multiple values as array
function getNameParts(fullName) {
    return fullName.split(' ');
}

// const [firstName, lastName] = getNameParts('John Doe');

// Function that returns object with multiple values
function getUserStats(user) {
    return {
        isAdult: user.age >= 18,
        canVote: user.age >= 18,
        category: user.age < 13 ? 'child' : user.age < 20 ? 'teen' : 'adult'
    };
}

const { isAdult, category } = getUserStats(user);

// ============================================================================
// REAL-WORLD PATTERNS YOU'LL USE DAILY
// ============================================================================

// 1. REACT PROPS DESTRUCTURING (if you do React)
function UserCard({ name, email, avatar, isOnline = false }) {
    return `<div>${name} - ${isOnline ? 'Online' : 'Offline'}</div>`;
}

// 2. API DATA EXTRACTION
const apiUser = {
    data: {
        user: {
            profile: {
                firstName: 'John',
                lastName: 'Doe',
                contact: {
                    email: 'john@example.com'
                }
            }
        }
    }
};

const {
    data: {
        user: {
            profile: {
                firstName,
                lastName,
                contact: { email }
            }
        }
    }
} = apiUser;

// 3. CONFIGURATION OBJECTS
function createDatabase({ 
    host = 'localhost', 
    port = 5432, 
    database = 'myapp',
    ssl = false,
    pool: { min = 2, max = 10 } = {}
}) {
    console.log(`Connecting to ${host}:${port}/${database}`);
    console.log(`Pool: ${min}-${max}, SSL: ${ssl}`);
}

createDatabase({
    host: 'production.db.com',
    pool: { max: 20 }
});

// 4. FORM DATA HANDLING
const formData = new FormData();
formData.append('name', 'John');
formData.append('email', 'john@example.com');

// Convert FormData to object and destructure
const formObject = Object.fromEntries(formData);
const { name: formName, email: formEmail } = formObject;

// 5. ARRAY METHOD CHAINING WITH DESTRUCTURING
const transactions = [
    { id: 1, amount: 100, type: 'credit', date: '2024-01-01' },
    { id: 2, amount: 50, type: 'debit', date: '2024-01-02' },
    { id: 3, amount: 200, type: 'credit', date: '2024-01-03' }
];

// Extract and process in one go
const [{ amount: firstAmount }, { type: secondType }] = transactions
    .filter(({ type }) => type === 'credit')
    .sort(({ amount: a }, { amount: b }) => b - a);

console.log(firstAmount, secondType);

// ============================================================================
// DESTRUCTURING IN LOOPS - Pro Level Shit
// ============================================================================

const keyValuePairs = [
    ['name', 'John'],
    ['age', 30],
    ['city', 'New York']
];

// Instead of this amateur code:
for (let i = 0; i < keyValuePairs.length; i++) {
    console.log(keyValuePairs[i][0], keyValuePairs[i][1]);
}

// Write this pro code:
for (const [key, value] of keyValuePairs) {
    console.log(key, value);
}

// Object entries destructuring
const userObj = { name: 'John', age: 30, city: 'NYC' };
for (const [property, value] of Object.entries(userObj)) {
    console.log(`${property}: ${value}`);
}

// ============================================================================
// COMMON DESTRUCTURING MISTAKES (don't be this guy)
// ============================================================================

// MISTAKE 1: Trying to destructure null/undefined
const nullUser = null;
// const { name } = nullUser; // TypeError! Always check first
const { name } = nullUser || {}; // Safe destructuring

// MISTAKE 2: Wrong variable names in nested destructuring
const response = { data: { users: [{ name: 'John' }] } };
// const { data: { users: [{ userName }] } } = response; // userName doesn't exist
const { data: { users: [{ name: userName }] } } = response; // Correct

// MISTAKE 3: Not using rest operator when you should
const config = { host: 'localhost', port: 3000, debug: true, ssl: false };
const { host, port, ...options } = config; // options = { debug: true, ssl: false }

// ============================================================================
// PERFORMANCE NOTES (why this matters beyond clean code)
// ============================================================================

// Destructuring is not just about clean code - it's about performance
// It creates references, not copies (unless you explicitly copy)

const largeObject = { /* thousands of properties */ };
const { needed1, needed2 } = largeObject; // Only extract what you need

// This is better than:
// const needed1 = largeObject.needed1;
// const needed2 = largeObject.needed2;

// BRUTAL TRUTH: If you're not using destructuring in 2024+, 
// you're writing code like it's 2010. Master this or stay amateur.