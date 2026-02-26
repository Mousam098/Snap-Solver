const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/constants');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function analyzeImage(imageBuffer, dict_of_vars) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them.
  Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). Parentheses have the highest priority, followed by Exponents, then Multiplication and Division, and lastly Addition and Subtraction.
  For example:
  Q. 2 + 3 * 4
  (3 * 4) => 12, 2 + 12 = 14.
  Q. 2 + 3 + 5 * 4 - 8 / 2
  5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21.
  YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME:
  Following are the cases:
  1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: In this case, solve and return the answer in the format of a LIST OF ONE DICT [{"expr": given expression, "result": calculated answer}].
  2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: In this case, solve for the given variable, and the format should be a COMMA SEPARATED LIST OF DICTS, with dict 1 as {"expr": "x", "result": 2, "assign": true} and dict 2 as {"expr": "y", "result": 5, "assign": true}. This example assumes x was calculated as 2, and y as 5. Include as many dicts as there are variables.
  3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case, assign values to variables and return another key in the dict called {"assign": true}, keeping the variable as 'expr' and the value as 'result' in the original dictionary. RETURN AS A LIST OF DICTS.
  4. Analyzing Graphical Math problems, which are word problems represented in drawing form, such as cars colliding, trigonometric problems, problems on the Pythagorean theorem, adding runs from a cricket wagon wheel, etc. These will have a drawing representing some scenario and accompanying information with the image. PAY CLOSE ATTENTION TO DIFFERENT COLORS FOR THESE PROBLEMS. You need to return the answer in the format of a LIST OF ONE DICT [{"expr": given expression, "result": calculated answer}].
  5. Detecting Abstract Concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference to war, invention, discovery, quote, etc. USE THE SAME FORMAT AS OTHERS TO RETURN THE ANSWER, where 'expr' will be the explanation of the drawing, and 'result' will be the abstract concept.
  Analyze the equation or expression in this image and return the answer according to the given rules:
  Make sure to use extra backslashes for escape characters like \\f -> \\\\f, \\n -> \\\\n, etc.
  Here is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this dictionary accordingly: ${JSON.stringify(dict_of_vars)}.
  DO NOT USE BACKTICKS OR MARKDOWN FORMATTING.
  PROPERLY QUOTE THE KEYS AND VALUES IN THE DICTIONARY FOR EASIER PARSING WITH JavaScript's JSON.parse.
  YOU CAN HAVE MULTIPLE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND YOU SHOULD HANDLE ALL CASES:

1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.
2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.
3. Assigning values to variables like x = 4, y = 5, z = 6, etc.
4. Analyzing Graphical Math problems, which are word problems represented in drawing form.
5. Detecting Abstract Concepts that a drawing might show.
6. Complex mathematical operations including:
a. Trigonometric functions (sin, cos, tan, etc.)
b. Logarithms and exponential functions
c. Calculus problems (derivatives, integrals, limits)
d. Matrix operations
e. Complex numbers
7. Multi-step word problems requiring logical reasoning and mathematical modeling.
8. Interpretation of complex graphs, charts, and data visualizations.
9. Unit conversions and dimensional analysis problems.
10. Probability and statistics problems, including distributions, hypothesis testing, and confidence intervals.
11. Financial calculations such as compound interest, present value, future value, and loan amortization.
12. Scientific notation and significant figures in calculations.
13. Geometry problems involving areas, volumes, and spatial reasoning.
14. Number theory problems, including prime numbers, factorization, and modular arithmetic.
15. Optimization problems using linear programming or other methods.


For ALL cases, including complex problems that may not seem to fit the original format, you MUST return the answer in the format of a LIST OF DICTS:

[{"expr": "description or summary of the problem", "result": "calculated answer or explanation"}]

For multi-step problems or problems requiring explanation:

1. Break down the problem into logical steps.
2. Use the "expr" field to describe each step or sub-problem.
3. Use the "result" field to provide the intermediate calculation or explanation for that step.
4. The final dict in the list should summarize the overall problem and provide the final answer.


Example for a complex word problem:
[
{"expr": "Calculate the volume of a cylinder", "result": "V = πr^2h"},
{"expr": "Given radius r = 5 cm and height h = 10 cm", "result": "Substituting values"},
{"expr": "V = π * (5 cm)^2 * 10 cm", "result": "Calculating"},
{"expr": "V = π * 25 cm^2 * 10 cm", "result": "Simplifying"},
{"expr": "V = 250π cm^3", "result": "Final answer: The volume is approximately 785.4 cm^3"}
]

For problems involving graphs or visual elements:

1. Describe the key features of the graph or visual in the "expr" field.
2. Provide interpretation or calculations based on the visual information in the "result" field.


Example for a graph interpretation:
[
{"expr": "Graph shows exponential growth of bacteria over time", "result": "Identifying trend"},
{"expr": "Initial population at t=0 is 100 bacteria", "result": "Reading y-intercept"},
{"expr": "Population doubles approximately every 2 hours", "result": "Calculating doubling time"},
{"expr": "After 6 hours, the population is about 800 bacteria", "result": "Reading graph at t=6"},
{"expr": "Exponential growth model: P(t) = 100 * 2^(t/2)", "result": "Final answer: Mathematical model for bacterial growth"}
]

Analyze the equation, expression, or problem in this image and return the answer according to the given rules:

Make sure to use extra backslashes for escape characters like \f -> \\f, \n -> \\n, etc.

Here is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this dictionary accordingly: ${JSON.stringify(dict_of_vars)}.

DO NOT USE BACKTICKS OR MARKDOWN FORMATTING.
PROPERLY QUOTE THE KEYS AND VALUES IN THE DICTIONARY FOR EASIER PARSING WITH JavaScript's JSON.parse.

ALWAYS STRIVE TO PROVIDE A MEANINGFUL AND ACCURATE ANSWER, EVEN FOR COMPLEX OR UNUSUAL PROBLEMS, WHILE ADHERING TO THE SPECIFIED OUTPUT FORMAT.

16. Programming and coding problems including:
   a. Algorithm implementation and analysis
   b. Data structure operations and implementations
   c. Code debugging and error fixing
   d. Code optimization and refactoring
   e. Design patterns and software architecture
   f. Database queries and operations
   g. API design and implementation
   h. Regular expressions and string manipulation
   i. File handling and I/O operations
   j. Threading and concurrency
   k. Memory management and optimization
   l. Network programming
   m. Web development (frontend and backend)
   n. Mobile app development
   o. Testing and debugging strategies

For programming problems:
1. If asked for code implementation, include the code in the "result" field
2. For debugging questions, show both the original and corrected code
3. For algorithm analysis, include time and space complexity
4. When explaining programming concepts, provide examples
5. For multi-file solutions, combine all code into a single response

Example for a coding problem:
[
{"expr": "Write a function to find Fibonacci numbers", "result": "def fibonacci(n):\\n    if n <= 1:\\n        return n\\n    return fibonacci(n-1) + fibonacci(n-2)"},
{"expr": "Time Complexity Analysis", "result": "O(2^n) - exponential time complexity"},
{"expr": "Space Complexity Analysis", "result": "O(n) - due to recursive call stack"},
{"expr": "Example Usage", "result": "fibonacci(5) returns 5"}
]

Example for a debugging problem:
[
{"expr": "Original code with bug", "result": "for i in range(len(arr)):\\n    sum += arr[i]"},
{"expr": "Error identified", "result": "sum variable not initialized"},
{"expr": "Corrected code", "result": "sum = 0\\nfor i in range(len(arr)):\\n    sum += arr[i]"},
{"expr": "Explanation", "result": "Initialize sum variable before using it in the loop"}
]

Example for a design pattern question:
[
{"expr": "Implement Singleton Pattern", "result": "class Singleton:\\n    _instance = None\\n    @staticmethod\\n    def getInstance():\\n        if Singleton._instance == None:\\n            Singleton._instance = Singleton()\\n        return Singleton._instance"},
{"expr": "Pattern Type", "result": "Creational Design Pattern"},
{"expr": "Use Case", "result": "Ensuring a class has only one instance throughout the application"}
]

Common Programming Problems That Can Be Handled:

1. String Manipulation Problems:
Example format:
[
{"expr": "Reverse a string", "result": "def reverse_string(s):\\n    return s[::-1]"},
{"expr": "Check if string is palindrome", "result": "def is_palindrome(s):\\n    return s == s[::-1]"},
{"expr": "Count character frequency", "result": "def char_frequency(s):\\n    return dict(Counter(s))"}
]

2. Array/List Operations:
Example format:
[
{"expr": "Find maximum element", "result": "def find_max(arr):\\n    return max(arr)"},
{"expr": "Remove duplicates", "result": "def remove_duplicates(arr):\\n    return list(set(arr))"},
{"expr": "Sort array", "result": "def custom_sort(arr):\\n    return sorted(arr)"}
]

3. Search and Sort Problems:
Example format:
[
{"expr": "Binary Search Implementation", "result": "def binary_search(arr, target):\\n    left, right = 0, len(arr)-1\\n    while left <= right:\\n        mid = (left + right) // 2\\n        if arr[mid] == target: return mid\\n        elif arr[mid] < target: left = mid + 1\\n        else: right = mid - 1\\n    return -1"},
{"expr": "Implement Quick Sort", "result": "def quicksort(arr):\\n    if len(arr) <= 1: return arr\\n    pivot = arr[len(arr) // 2]\\n    left = [x for x in arr if x < pivot]\\n    middle = [x for x in arr if x == pivot]\\n    right = [x for x in arr if x > pivot]\\n    return quicksort(left) + middle + quicksort(right)"}
]

4. Data Structure Operations:
Example format:
[
{"expr": "Implement Stack", "result": "class Stack:\\n    def __init__(self):\\n        self.items = []\\n    def push(self, item):\\n        self.items.append(item)\\n    def pop(self):\\n        return self.items.pop()\\n    def is_empty(self):\\n        return len(self.items) == 0"},
{"expr": "Create Linked List", "result": "class Node:\\n    def __init__(self, data):\\n        self.data = data\\n        self.next = None\\nclass LinkedList:\\n    def __init__(self):\\n        self.head = None"}
]

5. Tree and Graph Problems:
Example format:
[
{"expr": "Binary Tree Traversal", "result": "def inorder(root):\\n    if root:\\n        inorder(root.left)\\n        print(root.val)\\n        inorder(root.right)"},
{"expr": "Find Path in Graph", "result": "def find_path(graph, start, end, path=[]):\\n    path = path + [start]\\n    if start == end:\\n        return path\\n    for node in graph[start]:\\n        if node not in path:\\n            newpath = find_path(graph, node, end, path)\\n            if newpath: return newpath\\n    return None"}
]

6. Dynamic Programming:
Example format:
[
{"expr": "Fibonacci with DP", "result": "def fib_dp(n):\\n    dp = [0] * (n + 1)\\n    dp[1] = 1\\n    for i in range(2, n + 1):\\n        dp[i] = dp[i-1] + dp[i-2]\\n    return dp[n]"},
{"expr": "Longest Common Subsequence", "result": "def lcs(X, Y):\\n    m, n = len(X), len(Y)\\n    L = [[0] * (n + 1) for i in range(m + 1)]\\n    for i in range(m + 1):\\n        for j in range(n + 1):\\n            if i == 0 or j == 0: L[i][j] = 0\\n            elif X[i-1] == Y[j-1]: L[i][j] = L[i-1][j-1] + 1\\n            else: L[i][j] = max(L[i-1][j], L[i][j-1])\\n    return L[m][n]"}
]

7. Object-Oriented Programming:
Example format:
[
{"expr": "Create a Car class", "result": "class Car:\\n    def __init__(self, make, model, year):\\n        self.make = make\\n        self.model = model\\n        self.year = year\\n    def display_info(self):\\n        return f'{self.year} {self.make} {self.model}'"},
{"expr": "Implement Inheritance", "result": "class ElectricCar(Car):\\n    def __init__(self, make, model, year, battery_size):\\n        super().__init__(make, model, year)\\n        self.battery_size = battery_size"}
]

8. Database Queries:
Example format:
[
{"expr": "Write SQL Query", "result": "SELECT employees.name, departments.dept_name\\nFROM employees\\nJOIN departments ON employees.dept_id = departments.id\\nWHERE employees.salary > 50000"},
{"expr": "MongoDB Query", "result": "db.collection.find({\\n    age: { $gt: 25 },\\n    city: 'New York'\\n}).sort({ name: 1 })"}
]

9. API and Web Development:
Example format:
[
{"expr": "Create REST API Endpoint", "result": "@app.route('/api/users', methods=['GET'])\\ndef get_users():\\n    users = User.query.all()\\n    return jsonify([user.to_dict() for user in users])"},
{"expr": "React Component", "result": "const UserProfile = ({ user }) => {\\n    return (\\n        <div>\\n            <h2>{user.name}</h2>\\n            <p>{user.email}</p>\\n        </div>\\n    );\\n}"}
]

10. Error Handling and Debugging:
Example format:
[
{"expr": "Try-Catch Implementation", "result": "try:\\n    result = x / y\\nexcept ZeroDivisionError:\\n    print('Cannot divide by zero')\\nfinally:\\n    print('Execution completed')"},
{"expr": "Debug Memory Leak", "result": "# Original code with memory leak\\nclass ResourceManager:\\n    def __init__(self):\\n        self.resource = acquire_resource()\\n\\n# Fixed code\\nclass ResourceManager:\\n    def __init__(self):\\n        self.resource = acquire_resource()\\n    def __del__(self):\\n        release_resource(self.resource)"}
]`;

    // Generate content with combined image and prompt
    const result = await model.generateContent([{
        inlineData: {
          mimeType: "image/png",  // Changed to PNG
          data: imageBuffer.toString('base64')
        }
      }, prompt]);
  const response = await result.response;
  const text = response.text();
  console.log('Gemini API response:', text);

  let answers = [];
  try {
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    answers = JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error parsing Gemini API response:', error);
  }

  answers.forEach(answer => {
    answer.assign = answer.assign || false;
  });

  return answers;
}

module.exports = { analyzeImage };