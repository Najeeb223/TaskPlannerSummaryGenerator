// ============================================================================
// ARRAY METHOD CHAINING - How Pros Transform Data
// ============================================================================

// WHAT: Combining multiple array methods in sequence to transform data
// WHY: Readable, functional, and powerful data manipulation
// WHEN: Every time you need to transform, filter, or process arrays

// The secret: Each method returns a new array, so you can chain them infinitely
// Think of it as a pipeline: data flows through each transformation

// ============================================================================
// THE FOUNDATION - Understanding Method Return Values
// ============================================================================

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Each method returns a new array (except forEach, reduce with single value)
console.log(numbers.map(x => x * 2));     // Returns new array
console.log(numbers.filter(x => x > 5));  // Returns new array  
console.log(numbers.slice(0, 3));         // Returns new array
// Original array is unchanged!
console.log(numbers); // Still [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// ============================================================================
// BASIC CHAINING PATTERNS
// ============================================================================

// Pattern 1: Filter then Map (very common)
const evenNumbersDoubled = numbers
    .filter(num => num % 2 === 0)    // [2, 4, 6, 8, 10]
    .map(num => num * 2);            // [4, 8, 12, 16, 20]

console.log(evenNumbersDoubled);

// Pattern 2: Map then Filter (transform first, then filter)
const processedNumbers = numbers
    .map(num => num * 3)           // [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
    .filter(num => num > 15);      // [18, 21, 24, 27, 30]

// Pattern 3: Filter, Map, Sort (the holy trinity)
const result = numbers
    .filter(num => num > 3)        // [4, 5, 6, 7, 8, 9, 10]
    .map(num => num ** 2)          // [16, 25, 36, 49, 64, 81, 100]
    .sort((a, b) => b - a);        // [100, 81, 64, 49, 36, 25, 16] (descending)

// ============================================================================
// REAL-WORLD DATA TRANSFORMATION EXAMPLES
// ============================================================================

// Realistic user data (what you'll actually work with)
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, department: 'Engineering', salary: 95000, active: true },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, department: 'Marketing', salary: 75000, active: false },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 29, department: 'Engineering', salary: 88000, active: true },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 31, department: 'Sales', salary: 82000, active: true },
    { id: 5, name: 'Eve Wilson', email: 'eve@example.com', age: 26, department: 'Engineering', salary: 92000, active: false },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', age: 45, department: 'Management', salary: 120000, active: true }
];

// EXAMPLE 1: Get active engineering employees, sorted by salary (high to low)
const topEngineers = users
    .filter(user => user.active)                    // Only active users
    .filter(user => user.department === 'Engineering')  // Only engineers
    .sort((a, b) => b.salary - a.salary)           // Sort by salary (descending)
    .map(user => ({                                 // Transform to needed format
        name: user.name,
        salary: user.salary,
        email: user.email
    }));

console.log('Top Engineers:', topEngineers);
// Result: [
//   { name: 'Alice Johnson', salary: 95000, email: 'alice@example.com' },
//   { name: 'Charlie Brown', salary: 88000, email: 'charlie@example.com' }
// ]

// EXAMPLE 2: Get names of users over 30, formatted for display
const seniorUserNames = users
    .filter(user => user.age > 30)                 // Age filter
    .filter(user => user.active)                   // Active filter  
    .map(user => user.name.toUpperCase())          // Transform names
    .sort();                                       // Alphabetical sort

console.log('Senior Active Users:', seniorUserNames);
// Result: ['BOB SMITH', 'DIANA PRINCE', 'FRANK MILLER']

// EXAMPLE 3: Calculate average salary by department (complex chaining)
const departmentStats = users
    .filter(user => user.active)                   // Only active users
    .reduce((acc, user) => {                       // Group by department
        const dept = user.department;
        if (!acc[dept]) {
            acc[dept] = { total: 0, count: 0, employees: [] };
        }
        acc[dept].total += user.salary;
        acc[dept].count += 1;
        acc[dept].employees.push(user.name);
        return acc;
    }, {});

// Transform the grouped data
const avgSalariesByDept = Object.entries(departmentStats)
    .map(([dept, stats]) => ({                     // Transform to array of objects
        department: dept,
        averageSalary: Math.round(stats.total / stats.count),
        employeeCount: stats.count,
        employees: stats.employees
    }))
    .sort((a, b) => b.averageSalary - a.averageSalary); // Sort by avg salary

console.log('Department Stats:', avgSalariesByDept);

// ============================================================================
// E-COMMERCE / SHOPPING CART EXAMPLES
// ============================================================================

const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true, rating: 4.5 },
    { id: 2, name: 'Phone Case', price: 19.99, category: 'Accessories', inStock: true, rating: 4.2 },
    { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics', inStock: false, rating: 4.8 },
    { id: 4, name: 'Desk Chair', price: 299.99, category: 'Furniture', inStock: true, rating: 4.0 },
    { id: 5, name: 'Mouse Pad', price: 12.99, category: 'Accessories', inStock: true, rating: 3.9 },
    { id: 6, name: 'Monitor', price: 399.99, category: 'Electronics', inStock: true, rating: 4.6 }
];

// EXAMPLE 4: Find highly-rated electronics under $500 that are in stock
const recommendedElectronics = products
    .filter(product => product.category === 'Electronics')  // Electronics only
    .filter(product => product.inStock)                     // In stock only
    .filter(product => product.price < 500)                 // Under $500
    .filter(product => product.rating >= 4.5)               // High rating
    .sort((a, b) => b.rating - a.rating)                   // Best rated first
    .map(product => ({                                      // Format for display
        name: product.name,
        price: `$${product.price}`,
        rating: `${product.rating}⭐`
    }));

console.log('Recommended Electronics:', recommendedElectronics);

// EXAMPLE 5: Shopping cart total with discounts
const cartItems = [
    { productId: 1, quantity: 1 },  // Laptop
    { productId: 2, quantity: 2 },  // Phone Cases
    { productId: 6, quantity: 1 }   // Monitor
];

const cartTotal = cartItems
    .map(item => {                                    // Add product details to cart items
        const product = products.find(p => p.id === item.productId);
        return { ...item, ...product };
    })
    .filter(item => item.inStock)                     // Only in-stock items
    .map(item => ({                                   // Calculate line totals
        ...item,
        lineTotal: item.price * item.quantity
    }))
    .reduce((total, item) => total + item.lineTotal, 0); // Sum everything

console.log('Cart Total:', `$${cartTotal.toFixed(2)}`);

// ============================================================================
// API DATA PROCESSING (Real Industry Patterns)
// ============================================================================

// Simulated API response structure
const apiResponse = {
    data: [
        { id: 1, user_id: 101, title: 'Learn JavaScript', completed: false, priority: 'high', created_at: '2024-01-15' },
        { id: 2, user_id: 102, title: 'Build React App', completed: true, priority: 'medium', created_at: '2024-01-10' },
        { id: 3, user_id: 101, title: 'Write Tests', completed: false, priority: 'low', created_at: '2024-01-20' },
        { id: 4, user_id: 103, title: 'Deploy to Production', completed: false, priority: 'high', created_at: '2024-01-12' },
        { id: 5, user_id: 102, title: 'Code Review', completed: true, priority: 'medium', created_at: '2024-01-18' }
    ]
};

// EXAMPLE 6: Transform API data for frontend consumption
const todoSummary = apiResponse.data
    .filter(todo => !todo.completed)                     // Incomplete todos only
    .filter(todo => todo.priority === 'high')            // High priority only
    .map(todo => ({                                       // Transform API format to frontend format
        id: todo.id,
        title: todo.title,
        userId: todo.user_id,
        daysOld: Math.floor((new Date() - new Date(todo.created_at)) / (1000 * 60 * 60 * 24))
    }))
    .sort((a, b) => b.daysOld - a.daysOld)               // Oldest first (most urgent)
    .slice(0, 5);                                        // Top 5 only

console.log('High Priority Todo Summary:', todoSummary);

// ============================================================================
// ADVANCED CHAINING PATTERNS
// ============================================================================

// Pattern 1: Conditional chaining (based on user input/state)
function getFilteredProducts(filters = {}) {
    let result = products;
    
    // Chain conditionally based on what filters are provided
    if (filters.category) {
        result = result.filter(p => p.category === filters.category);
    }
    
    if (filters.maxPrice) {
        result = result.filter(p => p.price <= filters.maxPrice);
    }
    
    if (filters.minRating) {
        result = result.filter(p => p.rating >= filters.minRating);
    }
    
    if (filters.inStock) {
        result = result.filter(p => p.inStock);
    }
    
    // Always sort and format at the end
    return result
        .sort((a, b) => b.rating - a.rating)
        .map(p => ({ ...p, formattedPrice: `$${p.price.toFixed(2)}` }));
}

// Usage examples
const electronicUnder300 = getFilteredProducts({ 
    category: 'Electronics', 
    maxPrice: 300, 
    inStock: true 
});

// Pattern 2: Error handling in chains (real-world necessity)
const safeProcessUsers = (userData) => {
    try {
        return userData
            .filter(user => user && user.email)           // Remove invalid users
            .filter(user => user.email.includes('@'))      // Basic email validation
            .map(user => ({
                ...user,
                emailValid: /\S+@\S+\.\S+/.test(user.email)  // Proper email regex
            }))
            .filter(user => user.emailValid)              // Only valid emails
            .map(({ emailValid, ...user }) => user);      // Remove validation field
    } catch (error) {
        console.error('Error processing users:', error);
        return [];  // Return empty array on error
    }
};

// Pattern 3: Chaining with async operations (advanced)
// Note: This would need to be in an async function in real code
const processUserDataAsync = async (userIds) => {
    // Simulate async operations
    const fetchUser = async (id) => ({ id, name: `User ${id}`, active: Math.random() > 0.5 });
    
    const userPromises = userIds.map(id => fetchUser(id));
    const users = await Promise.all(userPromises);
    
    return users
        .filter(user => user.active)
        .map(user => ({ ...user, processed: true }))
        .sort((a, b) => a.id - b.id);
};

// ============================================================================
// PERFORMANCE CONSIDERATIONS (Critical for large datasets)
// ============================================================================

// BAD: Multiple loops through large array
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// This creates multiple intermediate arrays (memory intensive)
const inefficient = largeArray
    .map(x => x * 2)        // Creates 100k element array
    .filter(x => x > 1000)  // Creates another large array
    .map(x => x + 1);       // Creates final array

// BETTER: Combine operations where possible
const moreEfficient = largeArray
    .reduce((acc, x) => {
        const doubled = x * 2;
        if (doubled > 1000) {
            acc.push(doubled + 1);
        }
        return acc;
    }, []);

// BEST: Use for...of for complex operations on large datasets
const mostEfficient = [];
for (const x of largeArray) {
    const doubled = x * 2;
    if (doubled > 1000) {
        mostEfficient.push(doubled + 1);
    }
}

// ============================================================================
// COMMON CHAINING MISTAKES (Don't be this developer)
// ============================================================================

// MISTAKE 1: Unnecessary chaining
const bad1 = users.map(user => user); // Pointless map
const good1 = users; // Just use the original array

// MISTAKE 2: Wrong order of operations
const bad2 = users
    .map(user => ({ name: user.name }))     // Transform first (loses data)
    .filter(user => user.age > 30);        // Can't filter on age anymore!

const good2 = users
    .filter(user => user.age > 30)         // Filter first (keeps all data)
    .map(user => ({ name: user.name }));   // Transform last

// MISTAKE 3: Mutating during chain
const bad3 = users
    .map(user => {
        user.processed = true; // MUTATING ORIGINAL OBJECT!
        return user;
    });

const good3 = users
    .map(user => ({ ...user, processed: true })); // Create new objects

// ============================================================================
// DEBUGGING CHAINED METHODS
// ============================================================================

// Pro tip: Add .map() calls to inspect intermediate results
const debugChain = users
    .filter(user => user.active)
    .map(user => { console.log('After active filter:', user); return user; }) // Debug line
    .filter(user => user.age > 30)
    .map(user => { console.log('After age filter:', user); return user; })   // Debug line
    .map(user => ({ name: user.name, age: user.age }));

// Or use a utility function
const tap = (fn) => (value) => { fn(value); return value; };

const cleanDebugChain = users
    .filter(user => user.active)
    .map(tap(user => console.log('Active user:', user.name)))
    .filter(user => user.age > 30)
    .map(user => ({ name: user.name, age: user.age }));

// ============================================================================
// THE BOTTOM LINE
// ============================================================================

// Master these patterns:
// 1. filter → map → sort (most common)
// 2. map → filter (when you need to transform first)
// 3. reduce for complex aggregations
// 4. slice for pagination
// 5. Conditional chaining for dynamic filtering

// If you're writing multiple separate loops instead of chaining,
// you're missing the point and writing amateur code.
// Chain methods like a pro, but don't chain unnecessarily.
// Each method call has a performance cost - make it count.