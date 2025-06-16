// ========================================
// COMPLETE GUIDE TO JAVASCRIPT TEMPLATE LITERALS
// ========================================

console.log("=== JAVASCRIPT TEMPLATE LITERALS TUTORIAL ===\n");

// ========================================
// 1. WHAT ARE TEMPLATE LITERALS?
// ========================================

/*
Template literals are a way to create strings in JavaScript using backticks (`) 
instead of single quotes (') or double quotes (").

Key features:
- Use backticks (`) to wrap the string
- Allow embedded expressions using ${expression}
- Support multi-line strings naturally
- More readable and flexible than traditional string concatenation
*/

console.log("1. BASIC TEMPLATE LITERAL SYNTAX");
console.log("================================");

// Traditional string
let traditionalString = "Hello World";
console.log("Traditional string:", traditionalString);

// Template literal (same result, different syntax)
let templateString = `Hello World`;
console.log("Template literal:", templateString);

console.log("\n");

// ========================================
// 2. STRING INTERPOLATION (EMBEDDING VARIABLES)
// ========================================

console.log("2. STRING INTERPOLATION");
console.log("=======================");

let name = "Alice";
let age = 25;
let city = "New York";

// OLD WAY: String concatenation (messy and hard to read)
let oldWay = "My name is " + name + ", I am " + age + " years old, and I live in " + city + ".";
console.log("Old way (concatenation):", oldWay);

// NEW WAY: Template literals (clean and readable)
let newWay = `My name is ${name}, I am ${age} years old, and I live in ${city}.`;
console.log("New way (template literal):", newWay);

// You can embed any JavaScript expression inside ${}
let firstName = "John";
let lastName = "Doe";
let fullName = `${firstName} ${lastName}`;
console.log("Full name:", fullName);

console.log("\n");

// ========================================
// 3. EXPRESSIONS INSIDE TEMPLATE LITERALS
// ========================================

console.log("3. EXPRESSIONS IN TEMPLATE LITERALS");
console.log("===================================");

let num1 = 10;
let num2 = 5;

// You can perform calculations directly inside ${}
console.log(`${num1} + ${num2} = ${num1 + num2}`);
console.log(`${num1} - ${num2} = ${num1 - num2}`);
console.log(`${num1} * ${num2} = ${num1 * num2}`);
console.log(`${num1} / ${num2} = ${num1 / num2}`);

// You can call functions inside ${}
function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

console.log(`Current time: ${getCurrentTime()}`);

// You can use conditional (ternary) operators
let score = 85;
let grade = `Your grade is: ${score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D'}`;
console.log(grade);

// You can access object properties and array elements
let person = {
    name: "Sarah",
    age: 30,
    hobbies: ["reading", "swimming", "coding"]
};

console.log(`${person.name} is ${person.age} years old and likes ${person.hobbies[0]}.`);

console.log("\n");

// ========================================
// 4. MULTI-LINE STRINGS
// ========================================

console.log("4. MULTI-LINE STRINGS");
console.log("=====================");

// OLD WAY: Using \n for line breaks (hard to visualize)
let oldMultiLine = "Line 1\nLine 2\nLine 3";
console.log("Old way with \\n:");
console.log(oldMultiLine);

// NEW WAY: Template literals preserve line breaks naturally
let newMultiLine = `Line 1
Line 2
Line 3`;
console.log("\nNew way with template literals:");
console.log(newMultiLine);

// Practical example: HTML template
let htmlTemplate = `
<div class="user-card">
    <h2>${person.name}</h2>
    <p>Age: ${person.age}</p>
    <p>Hobbies: ${person.hobbies.join(", ")}</p>
</div>`;

console.log("\nHTML Template example:");
console.log(htmlTemplate);

console.log("\n");

// ========================================
// 5. ESCAPING CHARACTERS IN TEMPLATE LITERALS
// ========================================

console.log("5. ESCAPING CHARACTERS");
console.log("======================");

// To include a backtick in a template literal, escape it with \
let stringWithBacktick = `This string contains a backtick: \``;
console.log(stringWithBacktick);

// To include ${} as literal text (not as an expression), escape the $
let literalDollarBrace = `This is not an expression: \${variable}`;
console.log(literalDollarBrace);

// Backslashes work the same as in regular strings
let stringWithBackslash = `This is a backslash: \\`;
console.log(stringWithBackslash);

console.log("\n");

// ========================================
// 6. TAGGED TEMPLATE LITERALS (ADVANCED)
// ========================================

console.log("6. TAGGED TEMPLATE LITERALS");
console.log("===========================");

/*
Tagged template literals allow you to parse template literals with a function.
The tag function receives the string parts and the interpolated values separately.
This is an advanced feature used for:
- Custom string processing
- Internationalization
- Security (preventing injection attacks)
- Custom formatting
*/

// Simple tag function example
function simpleTag(strings, ...values) {
    console.log("Strings array:", strings);
    console.log("Values array:", values);
    
    // Reconstruct the string
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += values[i];
        }
    }
    return result;
}

let taggedResult = simpleTag`Hello ${name}, you are ${age} years old!`;
console.log("Tagged result:", taggedResult);

// Practical example: Highlighting function
function highlight(strings, ...values) {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            result += `**${values[i]}**`; // Wrap values in ** for emphasis
        }
    }
    return result;
}

let highlighted = highlight`Welcome ${name}, your score is ${score}!`;
console.log("Highlighted:", highlighted);

console.log("\n");

// ========================================
// 7. PRACTICAL EXAMPLES AND USE CASES
// ========================================

console.log("7. PRACTICAL EXAMPLES");
console.log("=====================");

// Example 1: Creating URLs
let baseUrl = "https://api.example.com";
let endpoint = "users";
let userId = 123;
let apiUrl = `${baseUrl}/${endpoint}/${userId}`;
console.log("API URL:", apiUrl);

// Example 2: SQL Query building (be careful with SQL injection in real apps!)
let tableName = "users";
let userName = "john_doe";
let query = `SELECT * FROM ${tableName} WHERE username = '${userName}'`;
console.log("SQL Query:", query);

// Example 3: Creating file paths
let directory = "/home/user";
let filename = "document.txt";
let fullPath = `${directory}/${filename}`;
console.log("File path:", fullPath);

// Example 4: Email template
function createEmailTemplate(recipientName, senderName, subject) {
    return `
Dear ${recipientName},

I hope this email finds you well.

Best regards,
${senderName}

Subject: ${subject}
Sent at: ${new Date().toLocaleString()}
    `.trim(); // .trim() removes leading/trailing whitespace
}

let email = createEmailTemplate("Bob", "Alice", "Meeting Tomorrow");
console.log("Email template:");
console.log(email);

// Example 5: Configuration strings
let config = {
    host: "localhost",
    port: 3000,
    database: "myapp"
};

let connectionString = `mongodb://${config.host}:${config.port}/${config.database}`;
console.log("Connection string:", connectionString);

console.log("\n");

// ========================================
// 8. COMMON MISTAKES AND BEST PRACTICES
// ========================================

console.log("8. COMMON MISTAKES & BEST PRACTICES");
console.log("===================================");

// MISTAKE 1: Forgetting to use backticks
// let wrong = "Hello ${name}"; // This won't work - uses quotes instead of backticks
let correct = `Hello ${name}`; // This works - uses backticks
console.log("Correct template literal:", correct);

// MISTAKE 2: Not handling undefined/null values
let undefinedVar;
let safeString = `Value: ${undefinedVar || 'Not provided'}`; // Use || for default values
console.log("Safe string with default:", safeString);

// BEST PRACTICE 1: Use template literals for any string with variables
let goodExample = `Welcome back, ${name}! You have ${5} new messages.`;
console.log("Good example:", goodExample);

// BEST PRACTICE 2: Break long templates into multiple lines for readability
let longTemplate = `
    This is a very long template literal
    that spans multiple lines and contains
    variables like ${name} and ${age}
    for better readability.
`.trim();
console.log("Long template:", longTemplate);

// BEST PRACTICE 3: Use template literals for HTML/XML generation
function createUserCard(user) {
    return `
        <div class="user-card" id="user-${user.id}">
            <img src="${user.avatar}" alt="${user.name}'s avatar">
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <span class="status ${user.isOnline ? 'online' : 'offline'}">
                ${user.isOnline ? 'Online' : 'Offline'}
            </span>
        </div>
    `.trim();
}

let user = {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "avatar.jpg",
    isOnline: true
};

console.log("User card HTML:");
console.log(createUserCard(user));

console.log("\n");

// ========================================
// 9. PERFORMANCE CONSIDERATIONS
// ========================================

console.log("9. PERFORMANCE NOTES");
console.log("====================");

/*
Template literals are generally very efficient, but here are some considerations:

1. Template literals are usually faster than string concatenation
2. For simple cases, both template literals and concatenation perform similarly
3. Template literals are much more readable and maintainable
4. Avoid complex expressions inside ${} for better performance
5. For repeated string building, consider using arrays and join()
*/

// Example of efficient string building for large datasets
let items = ["apple", "banana", "cherry", "date", "elderberry"];
let listHtml = `
<ul>
${items.map(item => `    <li>${item}</li>`).join('\n')}
</ul>`;

console.log("Efficient list generation:");
console.log(listHtml);

console.log("\n=== END OF TEMPLATE LITERALS TUTORIAL ===");

// ========================================
// SUMMARY
// ========================================

/*
SUMMARY - Template Literals vs Traditional Strings:

TRADITIONAL STRINGS:
- Use single (') or double (") quotes
- Concatenation with + operator
- Escape sequences for line breaks (\n)
- Hard to read with many variables

TEMPLATE LITERALS:
- Use backticks (`)
- Embed expressions with ${}
- Natural multi-line support
- Much more readable
- Support for tagged templates (advanced)

WHEN TO USE TEMPLATE LITERALS:
✅ Any string that contains variables
✅ Multi-line strings
✅ HTML/XML generation
✅ URL building
✅ When readability matters

WHEN TRADITIONAL STRINGS MIGHT BE OK:
- Simple static strings with no variables
- Very performance-critical code (minimal difference)
- When working with older JavaScript environments

RECOMMENDATION: Use template literals by default for any string that contains variables or spans multiple lines. They make your code more readable and maintainable.
*/