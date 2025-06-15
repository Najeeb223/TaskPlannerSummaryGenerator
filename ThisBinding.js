// ============================================================================
// JAVASCRIPT 'THIS' BINDING - The Make-or-Break Concept
// ============================================================================

// WHAT: 'this' is a reference to an object, determined by HOW a function is called
// WHY: Understanding 'this' separates pros from amateurs - it's everywhere in JS
// WHEN: Every time you use methods, constructors, event handlers, or callbacks

// BRUTAL TRUTH: 'this' is NOT where the function is defined, 
// it's HOW the function is CALLED that matters

// ============================================================================
// THE FOUR RULES OF 'THIS' BINDING (Learn these or suffer forever)
// ============================================================================

// Rule 1: DEFAULT BINDING (function called standalone)
// Rule 2: IMPLICIT BINDING (function called as object method)  
// Rule 3: EXPLICIT BINDING (call, apply, bind)
// Rule 4: NEW BINDING (constructor functions)

// Arrow functions follow different rules - they inherit 'this' from surrounding scope

// ============================================================================
// RULE 1: DEFAULT BINDING - The Fallback
// ============================================================================

function standaloneFunction() {
    console.log(this); // In browser: window object, in Node.js: global object
    // In strict mode: undefined
}

standaloneFunction(); // 'this' = global object (or undefined in strict mode)

// STRICT MODE changes this behavior
'use strict';
function strictFunction() {
    console.log(this); // undefined in strict mode
}

strictFunction(); // 'this' = undefined

// REAL WORLD PROBLEM: Callback functions lose context
const user = {
    name: 'John',
    hobbies: ['reading', 'coding', 'gaming'],
    
    printHobbies() {
        // 'this' refers to user object here
        console.log(`${this.name}'s hobbies:`);
        
        // PROBLEM: forEach callback loses 'this' context
        this.hobbies.forEach(function(hobby) {
            console.log(this); // 'this' is NOT the user object!
            // console.log(`${this.name} likes ${hobby}`); // ERROR!
        });
    }
};

user.printHobbies(); // Breaks because 'this' is lost in callback

// ============================================================================
// RULE 2: IMPLICIT BINDING - Object Method Calls
// ============================================================================

const person = {
    name: 'Alice',
    age: 30,
    
    // Method inside object
    greet() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
        // 'this' refers to the person object
    },
    
    // Nested object - COMMON GOTCHA
    address: {
        street: '123 Main St',
        getFullAddress() {
            // 'this' refers to address object, NOT person object
            console.log(`Address: ${this.street}`); // Works
            // console.log(`${person.name} lives at ${this.street}`); // Need to reference person directly
        }
    }
};

person.greet(); // 'this' = person object
person.address.getFullAddress(); // 'this' = address object

// THE GOTCHA: Assigning method to variable loses context
const greetFunction = person.greet;
greetFunction(); // 'this' is NOT person anymore! It's global/undefined

// ANOTHER GOTCHA: Passing method as callback
function executeCallback(callback) {
    callback(); // 'this' context is lost!
}

executeCallback(person.greet); // Doesn't work as expected

// ============================================================================
// RULE 3: EXPLICIT BINDING - Call, Apply, Bind (Your Control Tools)
// ============================================================================

const teacher = {
    name: 'Professor Smith',
    subject: 'JavaScript'
};

const student = {
    name: 'John Doe',
    grade: 'A+'
};

function introduce() {
    console.log(`Hello, I'm ${this.name}`);
}

function announceGrade(subject, semester) {
    console.log(`${this.name} got ${this.grade} in ${subject} for ${semester}`);
}

// CALL - immediately invoke with specific 'this' + individual arguments
introduce.call(teacher); // "Hello, I'm Professor Smith"
introduce.call(student); // "Hello, I'm John Doe"

announceGrade.call(student, 'JavaScript', 'Fall 2024');
// "John Doe got A+ in JavaScript for Fall 2024"

// APPLY - same as call, but arguments as array
announceGrade.apply(student, ['JavaScript', 'Fall 2024']);
// Same result as call

// BIND - returns new function with 'this' permanently bound
const boundIntroduce = introduce.bind(teacher);
boundIntroduce(); // Always uses teacher as 'this', no matter how called

const boundAnnounce = announceGrade.bind(student);
boundAnnounce('JavaScript', 'Fall 2024'); // Always uses student as 'this'

// REAL WORLD EXAMPLE: Event handlers
const button = {
    element: document.createElement('button'),
    clickCount: 0,
    
    handleClick() {
        this.clickCount++;
        console.log(`Button clicked ${this.clickCount} times`);
    },
    
    init() {
        // WRONG: 'this' context lost in event handler
        // this.element.addEventListener('click', this.handleClick);
        
        // RIGHT: Bind to preserve 'this' context
        this.element.addEventListener('click', this.handleClick.bind(this));
    }
};

// ============================================================================
// RULE 4: NEW BINDING - Constructor Functions
// ============================================================================

// Constructor function (notice capital letter convention)
function User(name, email) {
    // When called with 'new', 'this' refers to the newly created object
    this.name = name;
    this.email = email;
    this.isActive = true;
    
    this.login = function() {
        console.log(`${this.name} logged in`);
    };
}

// Using 'new' creates new object and binds 'this' to it
const user1 = new User('Alice', 'alice@example.com');
const user2 = new User('Bob', 'bob@example.com');

user1.login(); // 'this' refers to user1 object
user2.login(); // 'this' refers to user2 object

// WITHOUT 'new' - common mistake
const user3 = User('Charlie', 'charlie@example.com'); // Forgot 'new'!
console.log(user3); // undefined! Properties were added to global object

// MODERN ALTERNATIVE: Class syntax (still uses 'this' the same way)
class ModernUser {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isActive = true;
    }
    
    login() {
        console.log(`${this.name} logged in`);
    }
    
    // Method with callback problem
    delayedGreeting() {
        setTimeout(function() {
            // PROBLEM: 'this' is lost in setTimeout callback
            console.log(`Hello from ${this.name}`); // 'this' is not ModernUser instance
        }, 1000);
    }
    
    // SOLUTION 1: Arrow function preserves 'this'
    delayedGreetingFixed() {
        setTimeout(() => {
            console.log(`Hello from ${this.name}`); // Works! Arrow function inherits 'this'
        }, 1000);
    }
    
    // SOLUTION 2: Bind the callback
    delayedGreetingBound() {
        setTimeout(function() {
            console.log(`Hello from ${this.name}`);
        }.bind(this), 1000);
    }
    
    // SOLUTION 3: Store 'this' in variable
    delayedGreetingStored() {
        const self = this; // Store reference
        setTimeout(function() {
            console.log(`Hello from ${self.name}`);
        }, 1000);
    }
}

// ============================================================================
// ARROW FUNCTIONS - Different Rules Entirely
// ============================================================================

// Arrow functions DON'T have their own 'this' - they inherit from parent scope

const arrowObj = {
    name: 'Arrow Object',
    
    // Regular method
    regularMethod() {
        console.log('Regular method this:', this.name); // 'Arrow Object'
        
        // Arrow function inside method inherits 'this' from method
        const arrowInside = () => {
            console.log('Arrow inside method this:', this.name); // 'Arrow Object'
        };
        arrowInside();
        
        // Regular function inside method loses 'this'
        const regularInside = function() {
            console.log('Regular inside method this:', this.name); // undefined or global
        };
        regularInside();
    },
    
    // Arrow method - PROBLEM!
    arrowMethod: () => {
        console.log('Arrow method this:', this.name); // NOT 'Arrow Object'!
        // Arrow functions as object methods don't work as expected
    }
};

arrowObj.regularMethod();
arrowObj.arrowMethod(); // 'this' is NOT arrowObj

// WHY ARROW FUNCTIONS ARE PERFECT FOR CALLBACKS
const callbackExample = {
    name: 'Callback Demo',
    items: [1, 2, 3, 4, 5],
    
    processItems() {
        // Arrow function preserves 'this' from processItems method
        this.items.forEach(item => {
            console.log(`${this.name} processing item: ${item}`);
        });
        
        // Regular function would lose 'this'
        this.items.forEach(function(item) {
            console.log(`${this.name} processing item: ${item}`); // this.name is undefined
        });
    }
};

// ============================================================================
// REAL-WORLD SCENARIOS AND SOLUTIONS
// ============================================================================

// SCENARIO 1: Event Handlers in Classes
class ToggleButton {
    constructor(element) {
        this.element = element;
        this.isOn = false;
        
        // WRONG: 'this' context lost
        // this.element.addEventListener('click', this.toggle);
        
        // RIGHT: Bind to preserve context
        this.element.addEventListener('click', this.toggle.bind(this));
        
        // ALTERNATIVE: Arrow function property (modern approach)
        // this.element.addEventListener('click', this.toggleArrow);
    }
    
    toggle() {
        this.isOn = !this.isOn;
        this.element.textContent = this.isOn ? 'ON' : 'OFF';
        console.log(`Button is now ${this.isOn ? 'on' : 'off'}`);
    }
    
    // Arrow function property - automatically bound
    toggleArrow = () => {
        this.isOn = !this.isOn;
        this.element.textContent = this.isOn ? 'ON' : 'OFF';
    }
}

// SCENARIO 2: API Calls with Context
class UserService {
    constructor() {
        this.users = [];
        this.apiUrl = 'https://api.example.com/users';
    }
    
    async fetchUsers() {
        try {
            const response = await fetch(this.apiUrl);
            const users = await response.json();
            
            // Process each user - 'this' context preserved with arrow function
            users.forEach(user => {
                this.processUser(user); // 'this' refers to UserService instance
            });
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
    
    processUser(user) {
        // Add to internal array
        this.users.push(user);
        console.log(`Processed user: ${user.name}`);
    }
    
    // Method that returns bound function for external use
    getBoundProcessor() {
        return this.processUser.bind(this);
    }
}

// SCENARIO 3: React-style Component (conceptual)
class Component {
    constructor(props) {
        this.props = props;
        this.state = { count: 0 };
    }
    
    // Event handler - needs to be bound or arrow function
    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    }
    
    // Alternative: bind in constructor
    // constructor(props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this);
    // }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        console.log('State updated:', this.state);
    }
}

// ============================================================================
// DEBUGGING 'THIS' ISSUES
// ============================================================================

// Pro tip: Add console.log to see what 'this' actually is
function debugThis() {
    console.log('this is:', this);
    console.log('this constructor:', this.constructor.name);
    console.log('typeof this:', typeof this);
}

// Test in different contexts
debugThis(); // Global context
const obj = { method: debugThis };
obj.method(); // Object context
debugThis.call({ name: 'custom' }); // Explicit context

// ============================================================================
// COMMON 'THIS' MISTAKES AND FIXES
// ============================================================================

// MISTAKE 1: Extracting methods from objects
const calculator = {
    value: 0,
    add(num) {
        this.value += num;
        return this;
    }
};

const addFunction = calculator.add; // Method extracted
// addFunction(5); // ERROR: 'this' is not calculator

// FIX: Bind the method
const boundAdd = calculator.add.bind(calculator);
boundAdd(5); // Works correctly

// MISTAKE 2: Using arrow functions as object methods
const wrongObj = {
    name: 'Wrong',
    greet: () => {
        console.log(`Hello from ${this.name}`); // 'this' is NOT wrongObj
    }
};

// FIX: Use regular method
const rightObj = {
    name: 'Right',
    greet() {
        console.log(`Hello from ${this.name}`); // 'this' IS rightObj
    }
};

// MISTAKE 3: Nested regular functions
const nestedProblem = {
    name: 'Nested',
    items: ['a', 'b', 'c'],
    
    process() {
        this.items.forEach(function(item) {
            console.log(`${this.name}: ${item}`); // 'this.name' is undefined
        });
    }
};

// FIX 1: Arrow function
const nestedFixed1 = {
    name: 'Fixed1',
    items: ['a', 'b', 'c'],
    
    process() {
        this.items.forEach(item => {
            console.log(`${this.name}: ${item}`); // Works!
        });
    }
};

// FIX 2: Bind
const nestedFixed2 = {
    name: 'Fixed2',
    items: ['a', 'b', 'c'],
    
    process() {
        this.items.forEach(function(item) {
            console.log(`${this.name}: ${item}`);
        }.bind(this)); // Bind 'this' to callback
    }
};

// FIX 3: Store reference
const nestedFixed3 = {
    name: 'Fixed3',
    items: ['a', 'b', 'c'],
    
    process() {
        const self = this; // Store reference
        this.items.forEach(function(item) {
            console.log(`${self.name}: ${item}`);
        });
    }
};

// ============================================================================
// MODERN BEST PRACTICES
// ============================================================================

// 1. Use arrow functions for callbacks and event handlers
// 2. Use regular methods for object methods
// 3. Use bind() when you need to pass methods as callbacks
// 4. In classes, use arrow function properties for event handlers
// 5. Always console.log('this') when debugging context issues

// DON'T DO THIS:
class BadPractice {
    constructor() {
        this.name = 'Bad';
    }
    
    // Arrow function as method - doesn't work as expected
    greet = () => {
        console.log(this.name);
    }
}

// DO THIS:
class GoodPractice {
    constructor() {
        this.name = 'Good';
    }
    
    // Regular method
    greet() {
        console.log(this.name);
    }
    
    // Arrow function for event handlers
    handleEvent = (event) => {
        console.log(`${this.name} handled event:`, event.type);
    }
}

// ============================================================================
// THE BRUTAL TRUTH
// ============================================================================

// If you don't understand 'this', you'll write broken code
// If you avoid 'this', you'll write amateur code
// If you master 'this', you'll write professional JavaScript

// REMEMBER:
// - 'this' is determined by HOW a function is called, not WHERE it's defined
// - Arrow functions inherit 'this' from surrounding scope
// - Regular functions get new 'this' based on call context
// - Use bind(), call(), apply() to control 'this' explicitly
// - In classes, arrow function properties auto-bind 'this'

// Master these patterns and you'll never be confused about 'this' again.