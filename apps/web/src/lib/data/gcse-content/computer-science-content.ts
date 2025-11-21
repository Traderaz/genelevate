/**
 * GCSE Computer Science - Complete Revision Guide
 * 
 * 12 comprehensive modules covering GCSE Computer Science specifications
 * AQA 8525, OCR J277, Edexcel 1CP2, WJEC
 * Updated for 2025/2026 curriculum
 * 
 * Topics: Programming (Python), Algorithms, Data Representation,
 * Computer Systems, Networks, Security, Databases, Ethics
 */

export interface LessonContent {
  moduleNumber: number;
  title: string;
  duration: string;
  introduction: string;
  keyPoints: string[];
  explanation: string;
  examples: {
    question: string;
    workingOut: string;
    answer: string;
    explanation: string;
  }[];
  practiceQuestions: {
    question: string;
    options?: string[];
    answer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  tips: string[];
  commonMistakes: string[];
  examStrategy: string;
}

export const gcseComputerScienceContent: LessonContent[] = [
  // Module 1: Programming Fundamentals (Python)
  {
    moduleNumber: 1,
    title: 'Programming Fundamentals - Python Basics',
    duration: '90 minutes',
    introduction: 'Master Python programming! Variables, data types, input/output, operators, type conversion. Foundation for GCSE programming.',
    keyPoints: [
      'Variables: store data (name = value)',
      'Data types: int (whole numbers), float (decimals), string (text), bool (True/False)',
      'Input: input() function (returns string)',
      'Output: print() function',
      'Operators: + - * / // % **',
      'Type conversion: int(), float(), str()',
      'String manipulation: slicing, concatenation, methods'
    ],
    explanation: `Python = popular programming language, GCSE standard. Variables store data: name = 10 assigns value 10 to variable name. Data types: int (integers), float (decimal numbers), string (text in quotes), boolean (True/False). Input from user: input("prompt"). Output: print(value). Operators: + add, - subtract, * multiply, / divide, // integer division, % modulo (remainder), ** power. Type conversion: int("5") converts string to integer. Strings: concatenate with +, slice with [start:end], use methods like .upper(), .lower().`,
    examples: [
      {
        question: 'Write a program to calculate area of rectangle (4 marks)',
        workingOut: `# Get inputs from user
length = float(input("Enter length: "))
width = float(input("Enter width: "))

# Calculate area
area = length * width

# Output result
print("Area:", area)

Marks awarded for:
✓ Input (2 inputs) [1 mark]
✓ Calculation (length * width) [1 mark]
✓ Output (display area) [1 mark]
✓ Data types (float for decimals) [1 mark]

Why float not int?
- Measurements can be decimals (e.g. 5.5m)
- float() converts input string to decimal number`,
        answer: 'length = float(input("Enter length: "))\nwidth = float(input("Enter width: "))\narea = length * width\nprint("Area:", area)',
        explanation: '4-mark program = inputs, process (calculation), output, appropriate data types. Comments helpful but not required unless asked!'
      },
      {
        question: 'Explain the difference between / and // operators (2 marks)',
        workingOut: `/ (division):
- Returns float (decimal result)
- Example: 7 / 2 = 3.5

// (integer division):
- Returns int (whole number, rounds down)
- Example: 7 // 2 = 3

Use case:
- / when need exact result (e.g. averages)
- // when need whole numbers (e.g. counting how many groups)

Example code:
print(7 / 2)   # Output: 3.5
print(7 // 2)  # Output: 3

1 mark for explaining each operator`,
        answer: '/ returns float (3.5), // returns int rounded down (3)',
        explanation: '2 marks = explain BOTH operators with examples. Show you understand when to use each!'
      },
      {
        question: 'String manipulation: Extract first 3 characters (3 marks)',
        workingOut: `# String slicing
word = "COMPUTER"

# Get first 3 characters
first_three = word[0:3]
print(first_three)  # Output: COM

Explanation:
- word[0:3] means start at index 0, stop BEFORE index 3
- Indices: C=0, O=1, M=2, P=3, U=4, T=5, E=6, R=7
- Gets characters at positions 0, 1, 2

Alternative (simpler):
first_three = word[:3]  # Start from beginning

Other slicing examples:
word[2:5]   # "MPU" (indices 2,3,4)
word[5:]    # "TER" (index 5 to end)
word[-1]    # "R" (last character)
word[-3:]   # "TER" (last 3 characters)

Marks:
✓ Correct slicing syntax [1]
✓ Correct indices [1]
✓ Explanation of how it works [1]`,
        answer: 'word[0:3] or word[:3] extracts characters at indices 0,1,2',
        explanation: '3 marks = code + explanation. Understand indices start at 0, stop BEFORE end index!'
      },
      {
        question: 'Type conversion: Calculate sum of two inputs (4 marks)',
        workingOut: `# WRONG way (no type conversion):
num1 = input("Enter first number: ")   # User enters "5"
num2 = input("Enter second number: ")   # User enters "3"
total = num1 + num2
print(total)  # Output: "53" (concatenated strings!)

# CORRECT way (with type conversion):
num1 = int(input("Enter first number: "))   # Converts "5" to 5
num2 = int(input("Enter second number: "))   # Converts "3" to 3
total = num1 + num2
print(total)  # Output: 8 (added numbers!)

Why needed?
- input() always returns STRING
- "5" + "3" = "53" (string concatenation)
- 5 + 3 = 8 (numeric addition)
- int() converts string to integer
- Use float() if decimals needed

Marks:
✓ Two inputs [1]
✓ Type conversion (int or float) [1]
✓ Addition [1]
✓ Output [1]

Common error: Forgetting int() leads to concatenation not addition!`,
        answer: 'num1 = int(input("Enter first number: "))\nnum2 = int(input("Enter second number: "))\ntotal = num1 + num2\nprint(total)',
        explanation: 'input() returns STRING! Must convert to int/float for numeric operations. Very common exam question!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is the output of: print(5 % 2)',
        options: ['1', '2', '2.5', '0'],
        answer: '1',
        explanation: '% is modulo (remainder). 5 ÷ 2 = 2 remainder 1. So 5 % 2 = 1',
        difficulty: 'easy'
      },
      {
        question: 'Which data type for storing "Hello"?',
        options: ['string', 'int', 'float', 'bool'],
        answer: 'string',
        explanation: 'Text (in quotes) is string data type',
        difficulty: 'easy'
      },
      {
        question: 'What is output of: "abc"[1]',
        options: ['"b"', '"a"', '"c"', 'Error'],
        answer: '"b"',
        explanation: 'Indices start at 0. "abc"[1] is 2nd character = "b"',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ input() always returns STRING - convert with int() or float()',
      '⭐ Indices start at 0 not 1',
      '⭐ String slicing [start:stop] - stops BEFORE stop index',
      '⭐ Use meaningful variable names (not x, y)',
      '⭐ Test code with different inputs',
      '⭐ Comment complex code (good practice)'
    ],
    commonMistakes: [
      '❌ Forgetting type conversion (int, float)',
      '❌ Starting indices at 1 not 0',
      '❌ Confusing / and //',
      '❌ Missing quotes around strings',
      '❌ Not testing code'
    ],
    examStrategy: 'Programming = 40-50% of exam! Paper 1: written (algorithm questions). Paper 2: practical (write/debug code). Practice coding regularly! Know: input, output, variables, data types, operators, type conversion, string manipulation. Trace code questions common - work through line by line!'
  },

  // Module 2: Selection & Iteration
  {
    moduleNumber: 2,
    title: 'Selection (if) & Iteration (loops)',
    duration: '95 minutes',
    introduction: 'Master control flow! if/elif/else statements, comparison operators, boolean logic, for/while loops.',
    keyPoints: [
      'Selection: if, elif, else (conditional execution)',
      'Comparison: == != < > <= >=',
      'Boolean logic: and, or, not',
      'for loop: definite iteration (known repetitions)',
      'while loop: indefinite iteration (condition-based)',
      'range(): generate number sequences',
      'Nested loops: loop inside loop',
      'Break: exit loop early, Continue: skip iteration'
    ],
    explanation: `Selection = branching (if statements). if condition: code executes if True. elif: else if (another condition). else: executes if all False. Comparison operators: == equal, != not equal, < less than, > greater than, <= less/equal, >= greater/equal. Boolean logic: and (both True), or (at least one True), not (opposite). Iteration = repetition. for loop: repeat fixed times (e.g. for i in range(10)). while loop: repeat while condition True. Nested loops: loop inside another (e.g. 2D grids). break exits loop, continue skips to next iteration.`,
    examples: [
      {
        question: 'Write program to check if number positive, negative, or zero (6 marks)',
        workingOut: `# Get input
num = int(input("Enter a number: "))

# Selection - check conditions
if num > 0:
    print("Positive")
elif num < 0:
    print("Negative")
else:
    print("Zero")

Marks:
✓ Input with conversion [1]
✓ if statement (positive check) [1]
✓ elif statement (negative check) [2]
✓ else statement (zero) [1]
✓ Appropriate output [1]

Logic:
- First check: num > 0 (positive)
- If False, check: num < 0 (negative)
- If both False, must be 0 (else)

Why elif not second if?
- elif only checks if previous was False (efficient)
- Second if would check even if first was True (unnecessary)

Flowchart:
Input num → Is num > 0? → Yes: "Positive"
                       → No: Is num < 0? → Yes: "Negative"
                                         → No: "Zero"`,
        answer: 'num = int(input("Enter a number: "))\nif num > 0:\n    print("Positive")\nelif num < 0:\n    print("Negative")\nelse:\n    print("Zero")',
        explanation: '6 marks = input, if, elif, else, correct logic, output. elif is "else if" - only checked if previous False!'
      },
      {
        question: 'for loop: Print even numbers 0 to 10 (4 marks)',
        workingOut: `# Method 1: range with step
for num in range(0, 11, 2):
    print(num)

Output: 0, 2, 4, 6, 8, 10

Explanation:
- range(start, stop, step)
- range(0, 11, 2): start 0, stop before 11, increment by 2
- Generates: 0, 2, 4, 6, 8, 10

# Method 2: range with if
for num in range(11):
    if num % 2 == 0:
        print(num)

Output: 0, 2, 4, 6, 8, 10

Explanation:
- range(11): generates 0 to 10
- num % 2 == 0: checks if even (remainder 0 when divided by 2)
- Only prints if condition True

Marks:
✓ for loop [1]
✓ range() function [1]
✓ Correct parameters (0 to 10) [1]
✓ Correct logic (even only) [1]

Both methods valid, Method 1 more efficient!`,
        answer: 'for num in range(0, 11, 2):\n    print(num)\nOR\nfor num in range(11):\n    if num % 2 == 0:\n        print(num)',
        explanation: '4 marks = for loop + range + correct values + even logic. Two valid approaches!'
      },
      {
        question: 'while loop: Keep asking until valid input (6 marks)',
        workingOut: `# Validation loop - repeat until valid
age = -1  # Initial invalid value

while age < 0 or age > 120:
    age = int(input("Enter age (0-120): "))
    if age < 0 or age > 120:
        print("Invalid age, try again")

print("Age accepted:", age)

Explanation:
1. Set age to invalid value initially (-1)
2. while loop condition: age < 0 OR age > 120 (outside valid range)
3. Loop body:
   - Get input from user
   - Check if invalid
   - If invalid, print error
4. Loop continues until valid input (0-120)
5. Once valid, loop exits, print confirmation

Example run:
Enter age (0-120): -5
Invalid age, try again
Enter age (0-120): 150
Invalid age, try again
Enter age (0-120): 25
Age accepted: 25

Marks:
✓ while loop [1]
✓ Correct condition (range check) [2]
✓ Input inside loop [1]
✓ Validation message [1]
✓ Exits when valid [1]

Alternative (cleaner):
while True:
    age = int(input("Enter age (0-120): "))
    if 0 <= age <= 120:
        break  # Exit loop if valid
    print("Invalid age, try again")

Both approaches valid!`,
        answer: 'age = -1\nwhile age < 0 or age > 120:\n    age = int(input("Enter age (0-120): "))\n    if age < 0 or age > 120:\n        print("Invalid")\nprint("Accepted:", age)',
        explanation: '6 marks = while loop, condition, input, validation, error message, exit logic. Validation loops common in exams!'
      },
      {
        question: 'Nested loops: Print times table grid (8 marks)',
        workingOut: `# Times table 1-5
for row in range(1, 6):
    for col in range(1, 6):
        product = row * col
        print(product, end=" ")  # Print on same line
    print()  # New line after each row

Output:
1 2 3 4 5 
2 4 6 8 10 
3 6 9 12 15 
4 8 12 16 20 
5 10 15 20 25 

Explanation:
- Outer loop (row): iterates 1 to 5
- Inner loop (col): for EACH row, iterates 1 to 5
- Calculate: row * col
- print(product, end=" ") keeps on same line (default end="\\n" creates new line)
- After inner loop finishes, print() creates new line
- Result: 5x5 grid

Trace (first 2 iterations):
row=1: col=1→1*1=1, col=2→1*2=2, ..., col=5→1*5=5, newline
row=2: col=1→2*1=2, col=2→2*2=4, ..., col=5→2*5=10, newline

Marks:
✓ Outer loop [2]
✓ Inner loop [2]
✓ Correct ranges [1]
✓ Calculation [1]
✓ Correct output format [2]

How nested loops work:
- Outer loop executes ONCE, inner loop executes FULLY
- Then outer moves to next iteration
- Pattern: outer=1 (inner runs 1-5), outer=2 (inner runs 1-5 again), etc.

Use cases:
- 2D grids, tables
- Searching 2D arrays
- Generating combinations`,
        answer: 'for row in range(1, 6):\n    for col in range(1, 6):\n        print(row * col, end=" ")\n    print()',
        explanation: '8 marks = outer loop, inner loop, ranges, calculation, formatting. Nested loops = common exam topic. Understand: inner completes FULLY for each outer iteration!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does range(5) generate?',
        options: ['0,1,2,3,4', '1,2,3,4,5', '0,1,2,3,4,5', '1,2,3,4'],
        answer: '0,1,2,3,4',
        explanation: 'range(5) = 0 to 4 (5 numbers starting from 0)',
        difficulty: 'easy'
      },
      {
        question: 'True and False evaluates to?',
        options: ['False', 'True', 'Error', '0'],
        answer: 'False',
        explanation: 'and: both must be True. True and False = False',
        difficulty: 'easy'
      },
      {
        question: 'How many times does this loop run? for i in range(2, 10, 3):',
        options: ['3', '4', '5', '8'],
        answer: '3',
        explanation: 'range(2, 10, 3) generates: 2, 5, 8 (3 values)',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ if/elif/else: only ONE block executes',
      '⭐ == is comparison, = is assignment',
      '⭐ range(n) starts at 0, stops before n',
      '⭐ while loop needs condition to eventually become False (avoid infinite loops)',
      '⭐ Nested loops: inner completes FULLY each time outer runs once',
      '⭐ break exits loop, continue skips to next iteration',
      '⭐ Indentation crucial in Python!'
    ],
    commonMistakes: [
      '❌ Using = instead of == for comparison',
      '❌ Infinite while loops (condition never False)',
      '❌ Off-by-one errors in range()',
      '❌ Wrong indentation',
      '❌ Not understanding nested loop flow'
    ],
    examStrategy: 'Selection & Iteration = core programming! Exam includes: trace code (work through line-by-line), write code (loops, validation), identify errors. Practice: tracing nested loops, validation with while, if/elif/else logic. INDENTATION MATTERS!'
  },

  // Streamlined modules 3-12
  {
    moduleNumber: 3,
    title: 'Data Structures: Lists & Arrays',
    duration: '85 minutes',
    introduction: 'Master lists! Creating, accessing, modifying, iterating, 2D lists, list methods.',
    keyPoints: [
      'List: ordered collection [item1, item2, ...]',
      'Index access: list[0] (first item)',
      'Slicing: list[start:stop]',
      'Modify: list[index] = new_value',
      'Append: list.append(item)',
      'Methods: .insert(), .remove(), .pop(), .sort()',
      '2D lists: list of lists (tables, grids)',
      'Iterate: for item in list:'
    ],
    explanation: `Lists store multiple values in one variable. Create: my_list = [1, 2, 3]. Access: my_list[0] gets first item. Modify: my_list[0] = 10 changes first. Append adds to end: my_list.append(4). Methods: .insert(index, item) adds at position, .remove(value) deletes first occurrence, .pop() removes last, .sort() orders. 2D lists: grid = [[1,2], [3,4]] - access: grid[0][1] gets 2. Iterate: for item in my_list: processes each element.`,
    examples: [
      {
        question: 'Create list of 5 scores, find average (6 marks)',
        workingOut: `# Create empty list
scores = []

# Get 5 scores from user
for i in range(5):
    score = int(input("Enter score: "))
    scores.append(score)

# Calculate average
total = sum(scores)  # sum() adds all items
average = total / len(scores)  # len() gets list length

# Output
print("Average:", average)

Marks:
✓ Create list [1]
✓ Loop to get inputs [2]
✓ Append to list [1]
✓ Calculate average (sum/length) [1]
✓ Output [1]

Alternative (no list needed for this Q, but demonstrates list usage):
total = 0
for i in range(5):
    score = int(input("Enter score: "))
    total += score
average = total / 5`,
        answer: 'scores = []\nfor i in range(5):\n    scores.append(int(input("Enter score: ")))\naverage = sum(scores) / len(scores)\nprint(average)',
        explanation: '6 marks = create list, loop, append, sum, divide by length, output. Know list methods: append, sum(), len()!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is output: [1,2,3][1]',
        options: ['2', '1', '3', 'Error'],
        answer: '2',
        explanation: 'Index 1 is 2nd item = 2 (indices start at 0)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Lists mutable (can change)',
      '⭐ Indices start at 0',
      '⭐ len() for length, sum() for total',
      '⭐ 2D lists: list[row][column]'
    ],
    commonMistakes: [
      '❌ Index out of range errors',
      '❌ Forgetting to append',
      '❌ Confusing 2D list indices'
    ],
    examStrategy: 'Lists = essential! Practice: create, append, access, modify, iterate, 2D lists. Exam: list processing, searching, sorting.'
  },

  {
    moduleNumber: 4,
    title: 'Functions & Procedures',
    duration: '80 minutes',
    introduction: 'Master functions! Define, call, parameters, return values, scope.',
    keyPoints: [
      'Function: reusable code block',
      'def function_name(parameters):',
      'Parameters: inputs to function',
      'return: send value back',
      'Call: function_name(arguments)',
      'Scope: local vs global variables',
      'Benefits: reusability, maintainability, modularity'
    ],
    explanation: `Functions = reusable code blocks. Define: def name(params): body. Parameters = inputs. return sends value back. Call: name(args). Scope: variables inside function are local (only exist inside), global variables outside. Benefits: avoid repetition, easier to debug, modular design. Procedure = function without return (just does task).`,
    examples: [
      {
        question: 'Write function to calculate area of circle (6 marks)',
        workingOut: `import math  # For pi

def circle_area(radius):
    """Calculate area of circle given radius"""
    area = math.pi * radius ** 2
    return area

# Test function
r = float(input("Enter radius: "))
result = circle_area(r)
print("Area:", result)

Marks:
✓ Function definition [1]
✓ Parameter [1]
✓ Correct formula (π × r²) [2]
✓ Return statement [1]
✓ Function call [1]

Explanation:
- def circle_area(radius): defines function with one parameter
- math.pi is constant (3.14159...)
- radius ** 2 is radius squared
- return sends area back to caller
- Call: circle_area(r) passes r as argument, gets area back`,
        answer: 'import math\ndef circle_area(radius):\n    return math.pi * radius ** 2\nr = float(input("Enter radius: "))\nprint(circle_area(r))',
        explanation: '6 marks = definition, parameter, formula, return, call. Functions = modularity, reusability!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does return do?',
        options: ['Sends value back to caller', 'Prints value', 'Deletes function', 'Loops'],
        answer: 'Sends value back to caller',
        explanation: 'return sends value back from function to where it was called',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Functions improve code organization',
      '⭐ return sends value back',
      '⭐ Parameters = inputs',
      '⭐ Local variables only exist in function'
    ],
    commonMistakes: [
      '❌ Forgetting return',
      '❌ Not calling function (just defining)',
      '❌ Wrong number of arguments'
    ],
    examStrategy: 'Functions = modularity focus! Exam: write function, call function, trace execution. Understand: parameters, return, scope.'
  },

  {
    moduleNumber: 5,
    title: 'Number Systems & Binary',
    duration: '85 minutes',
    introduction: 'Master number systems! Binary, denary, hexadecimal, conversions, binary arithmetic.',
    keyPoints: [
      'Denary: base 10 (0-9)',
      'Binary: base 2 (0,1)',
      'Hexadecimal: base 16 (0-9, A-F)',
      'Binary to denary: place values (128,64,32,16,8,4,2,1)',
      'Denary to binary: repeated division by 2',
      'Binary addition: 0+0=0, 0+1=1, 1+1=10 (carry)',
      'Binary shifts: left multiply, right divide'
    ],
    explanation: `Computers use binary (0s and 1s). Denary = base 10 (everyday numbers). Binary = base 2. Each digit is bit (binary digit). 8 bits = 1 byte. Binary to denary: multiply each bit by place value (128,64,32,16,8,4,2,1), add up. Denary to binary: divide by 2, note remainders, read backwards. Hexadecimal = base 16 (0-9,A-F), shorthand for binary (1 hex digit = 4 bits). Binary addition: same as denary but 1+1=10 (carry 1). Shift left = multiply by 2, shift right = divide by 2.`,
    examples: [
      {
        question: 'Convert binary 10110110 to denary (3 marks)',
        workingOut: `Binary: 1  0  1  1  0  1  1  0
Place:  128 64 32 16 8  4  2  1

Step 1: Multiply each bit by place value
1 × 128 = 128
0 × 64  = 0
1 × 32  = 32
1 × 16  = 16
0 × 8   = 0
1 × 4   = 4
1 × 2   = 2
0 × 1   = 0

Step 2: Add up all values
128 + 32 + 16 + 4 + 2 = 182

Answer: 182 (denary)

Marks:
✓ Place values shown [1]
✓ Correct multiplication [1]
✓ Correct sum [1]

Quick check method:
Only add place values where bit is 1
10110110: 128 + 32 + 16 + 4 + 2 = 182 ✓`,
        answer: '182',
        explanation: '3 marks = place values, multiply, sum. Binary to denary: add place values where bit is 1!'
      },
      {
        question: 'Convert denary 45 to binary (3 marks)',
        workingOut: `Method: Repeated division by 2, note remainders

45 ÷ 2 = 22 remainder 1  ↑
22 ÷ 2 = 11 remainder 0  |
11 ÷ 2 = 5  remainder 1  | Read upwards
5  ÷ 2 = 2  remainder 1  |
2  ÷ 2 = 1  remainder 0  |
1  ÷ 2 = 0  remainder 1  ↓

Answer: Read remainders from bottom to top: 101101

Check (convert back):
101101 binary
Place values: 32 + 8 + 4 + 1 = 45 ✓

Marks:
✓ Division method shown [1]
✓ Remainders recorded [1]
✓ Correct binary answer [1]

Alternative method (subtraction):
45 - 32 = 13 (1 in 32s place)
13 - 16 = No (0 in 16s)
13 - 8 = 5 (1 in 8s)
5 - 4 = 1 (1 in 4s)
1 - 2 = No (0 in 2s)
1 - 1 = 0 (1 in 1s)
Answer: 101101`,
        answer: '101101',
        explanation: '3 marks = method, workings, answer. Denary to binary: divide by 2, read remainders bottom-up. Check by converting back!'
      },
      {
        question: 'Binary addition: 10111 + 1101 (4 marks)',
        workingOut: `Align right:
   10111
  + 1101
  ------

Add column by column (right to left):

Column 1 (1s): 1 + 1 = 10 (write 0, carry 1)
Column 2 (2s): 1 + 0 + carry 1 = 10 (write 0, carry 1)  
Column 3 (4s): 1 + 1 + carry 1 = 11 (write 1, carry 1)
Column 4 (8s): 1 + 1 + carry 1 = 11 (write 1, carry 1)
Column 5 (16s): 1 + carry 1 = 10 (write 0, carry 1)
Column 6 (32s): carry 1 (write 1)

  ¹¹¹¹¹¹  (carries)
   10111
  + 1101
  ------
  100100

Answer: 100100

Check in denary:
10111 = 23
 1101 = 13
      = 36
100100 = 36 ✓

Marks:
✓ Aligned correctly [1]
✓ Addition rules applied [1]
✓ Carries shown [1]
✓ Correct answer [1]

Binary addition rules:
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 10 (0, carry 1)
1 + 1 + carry 1 = 11 (1, carry 1)`,
        answer: '100100',
        explanation: '4 marks = alignment, rules, carries, answer. Binary addition: 1+1=10 (carry!). Check by converting to denary.'
      }
    ],
    practiceQuestions: [
      {
        question: 'How many bits in 1 byte?',
        options: ['8', '16', '4', '2'],
        answer: '8',
        explanation: '1 byte = 8 bits (binary digits)',
        difficulty: 'easy'
      },
      {
        question: 'Hexadecimal C equals denary...',
        options: ['12', '13', '14', '15'],
        answer: '12',
        explanation: 'Hex: A=10, B=11, C=12, D=13, E=14, F=15',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ Binary place values: 128,64,32,16,8,4,2,1',
      '⭐ Check conversions by converting back',
      '⭐ Binary addition: 1+1=10 (carry)',
      '⭐ 1 hex digit = 4 bits',
      '⭐ Shift left ×2, shift right ÷2'
    ],
    commonMistakes: [
      '❌ Reading remainders bottom-up incorrectly',
      '❌ Forgetting carries in addition',
      '❌ Wrong place values',
      '❌ Not showing working'
    ],
    examStrategy: 'Number systems = Paper 1! Practice: binary↔denary, binary addition, shifts, hex. SHOW WORKING! Conversions = 3-4 marks each. Check answers by converting back!'
  },

  {
    moduleNumber: 6,
    title: 'Data Representation: Characters & Images',
    duration: '75 minutes',
    introduction: 'Master data representation! ASCII, Unicode, images, pixels, resolution, color depth, file size.',
    keyPoints: [
      'ASCII: 7-bit character encoding (128 characters)',
      'Unicode: 16-bit encoding (millions of characters, global)',
      'Images: made of pixels',
      'Resolution: width × height in pixels',
      'Color depth: bits per pixel (1-bit=2 colors, 8-bit=256, 24-bit=16.7M)',
      'File size: width × height × color depth (bits)',
      'Metadata: data about data (image: date, camera, etc.)'
    ],
    explanation: `Characters stored as binary codes. ASCII = 7 bits (128 characters: A-Z, a-z, 0-9, symbols). Unicode = 16+ bits (all languages, emojis). Images = grid of pixels. Resolution = number of pixels (e.g. 1920×1080). Color depth = bits per pixel (8-bit = 256 colors, 24-bit = 16.7M colors). File size calculation: width × height × color depth ÷ 8 (bytes). Metadata = information about file (date, location, camera settings). Compression reduces file size: lossy (lose quality) vs lossless (reversible).`,
    examples: [
      {
        question: 'Calculate image file size (4 marks)',
        workingOut: `Image: 800 × 600 pixels, 24-bit color depth

Step 1: Calculate total pixels
800 × 600 = 480,000 pixels

Step 2: Calculate total bits
480,000 pixels × 24 bits per pixel = 11,520,000 bits

Step 3: Convert bits to bytes
11,520,000 ÷ 8 = 1,440,000 bytes

Step 4: Convert to MB (optional)
1,440,000 ÷ 1024 ÷ 1024 = 1.37 MB

Answer: 1,440,000 bytes (or 1.37 MB)

Marks:
✓ Pixels calculated [1]
✓ Multiply by color depth [1]
✓ Convert to bytes (÷8) [1]
✓ Correct answer [1]

Formula:
File size (bits) = width × height × color depth
File size (bytes) = (width × height × color depth) ÷ 8

Remember:
- 8 bits = 1 byte
- 1024 bytes = 1 KB
- 1024 KB = 1 MB`,
        answer: '1,440,000 bytes',
        explanation: '4 marks = pixels, multiply color depth, divide by 8, answer. File size = width × height × color depth ÷ 8 (bytes)!'
      },
      {
        question: 'Explain difference between ASCII and Unicode (4 marks)',
        workingOut: `ASCII:
- 7-bit encoding (7 binary digits per character)
- 2⁷ = 128 possible characters
- Includes: English alphabet (A-Z, a-z), digits (0-9), punctuation, control characters
- Sufficient for English text
- Smaller file size (fewer bits)
- Example: 'A' = 1000001 (65 in denary)

Unicode:
- 16-bit (or more) encoding
- 2¹⁶ = 65,536+ possible characters
- Includes: ALL world languages (Arabic, Chinese, etc.), symbols, emojis
- Global standard
- Larger file size (more bits per character)
- Compatible with ASCII (first 128 characters same)

Why Unicode needed:
- Globalization of computing
- Internet needs all languages
- ASCII only covers English

Comparison:
ASCII: 'A' = 7 bits
Unicode: 'A' = 16 bits (but includes 你, 🙂, etc.)

Marks awarded for:
✓ ASCII description (7-bit, 128 chars) [1]
✓ Unicode description (16-bit, global) [1]
✓ Comparison (Unicode larger but more languages) [1]
✓ Real-world context (why Unicode needed) [1]`,
        answer: 'ASCII: 7-bit, 128 characters (English only). Unicode: 16-bit, 65,536+ characters (all languages). Unicode needed for globalization.',
        explanation: '4 marks = describe ASCII, describe Unicode, compare, explain why Unicode needed. Unicode = global, ASCII = English only!'
      }
    ],
    practiceQuestions: [
      {
        question: 'ASCII uses how many bits per character?',
        options: ['7', '8', '16', '24'],
        answer: '7',
        explanation: 'ASCII = 7-bit encoding (128 characters)',
        difficulty: 'easy'
      },
      {
        question: '24-bit color depth allows how many colors?',
        options: ['16.7 million', '256', '1024', '16'],
        answer: '16.7 million',
        explanation: '24-bit: 2²⁴ = 16,777,216 colors (16.7M)',
        difficulty: 'medium'
      }
    ],
    tips: [
      '⭐ File size formula: width × height × color depth ÷ 8',
      '⭐ ASCII = 7-bit (English), Unicode = 16-bit (global)',
      '⭐ Color depth: 1-bit=2, 8-bit=256, 24-bit=16.7M colors',
      '⭐ Show calculations clearly',
      '⭐ Remember units: bits → bytes (÷8)'
    ],
    commonMistakes: [
      '❌ Forgetting to divide by 8 (bits to bytes)',
      '❌ Confusing ASCII and Unicode',
      '❌ Wrong color depth values',
      '❌ Not showing working'
    ],
    examStrategy: 'Data representation = calculation questions! File size = common (4-6 marks). Show: pixels, multiply color depth, divide 8, units. ASCII/Unicode = compare question (4 marks). Practice calculations!'
  },

  {
    moduleNumber: 7,
    title: 'Computer Systems: Hardware & Software',
    duration: '80 minutes',
    introduction: 'Master computer architecture! CPU, RAM, ROM, storage, input/output, operating systems.',
    keyPoints: [
      'CPU: executes instructions (ALU, CU, registers, cache)',
      'RAM: volatile memory (temporary, fast)',
      'ROM: non-volatile (permanent, stores boot)',
      'Storage: HDD (magnetic, slow, cheap), SSD (flash, fast, expensive)',
      'Input: keyboard, mouse, scanner',
      'Output: monitor, printer, speaker',
      'Operating system: manages hardware/software, UI'
    ],
    explanation: `CPU = brain of computer. Components: ALU (arithmetic/logic), CU (control unit), registers (fast storage), cache (very fast memory). RAM = temporary memory (loses data when power off). ROM = permanent (stores BIOS/boot). Storage: HDD (spinning disks, large, cheap, slow), SSD (no moving parts, fast, expensive). Input devices get data in. Output devices display results. OS manages: memory, processes, files, security, UI.`,
    examples: [
      {
        question: 'Explain the role of RAM in a computer system (4 marks)',
        workingOut: `RAM (Random Access Memory):

Purpose:
- Temporarily stores data and programs currently in use
- Holds running applications and open files
- Stores operating system while computer on

Characteristics:
- Volatile: loses all data when power turned off
- Fast access (nanoseconds)
- Directly accessible by CPU
- More RAM = more programs can run simultaneously

Example:
When you open a word document:
1. Program loaded from storage (HDD/SSD) into RAM
2. CPU reads instructions from RAM
3. Your typing stored in RAM
4. When save, written back to storage
5. When close/turn off, RAM cleared

Why fast access needed:
- CPU operates at billions of cycles per second
- Fetching from storage would create bottleneck
- RAM bridges speed gap

Comparison with storage:
RAM: Fast, volatile, temporary, expensive (per GB)
Storage: Slower, permanent, large capacity, cheaper

Marks:
✓ Stores currently used programs/data [1]
✓ Volatile (loses data when power off) [1]
✓ Fast access by CPU [1]
✓ Example/comparison with storage [1]`,
        answer: 'RAM temporarily stores programs/data in use. Volatile (loses data when off). Fast access by CPU. More RAM = more programs simultaneously.',
        explanation: '4 marks = purpose, volatile, speed, example. RAM = temporary, fast, volatile!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Which is volatile memory?',
        options: ['RAM', 'ROM', 'Hard drive', 'SSD'],
        answer: 'RAM',
        explanation: 'RAM loses data when power off (volatile). ROM/storage permanent (non-volatile).',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ CPU = ALU + CU + registers + cache',
      '⭐ RAM = volatile, ROM = non-volatile',
      '⭐ SSD faster but more expensive than HDD',
      '⭐ OS manages hardware and software'
    ],
    commonMistakes: [
      '❌ Confusing RAM and ROM',
      '❌ Not explaining volatile/non-volatile',
      '❌ Vague answers ("RAM stores things")'
    ],
    examStrategy: 'Computer systems = theory questions (4-6 marks). Explain: purpose, characteristics, examples. Compare: RAM/ROM, HDD/SSD. Know CPU components!'
  },

  {
    moduleNumber: 8,
    title: 'Networks & Internet',
    duration: '85 minutes',
    introduction: 'Master networks! LAN, WAN, topologies, protocols, IP addresses, DNS, encryption.',
    keyPoints: [
      'LAN: Local Area Network (small area, e.g. school)',
      'WAN: Wide Area Network (large area, e.g. internet)',
      'Topologies: star (central switch), mesh (all interconnected)',
      'Protocols: rules for communication (TCP/IP, HTTP, HTTPS)',
      'IP address: unique device identifier',
      'DNS: converts domain names to IP addresses',
      'Encryption: scrambles data for security'
    ],
    explanation: `Network = connected computers sharing resources. LAN = local (building, campus), owned. WAN = wide (cities, countries), leased. Topologies: star (all connect to central switch, one cable fails doesn't affect others), mesh (all interconnected, robust but expensive). Protocols = rules: HTTP (web), HTTPS (secure web), FTP (file transfer), SMTP (email). IP address = unique number (e.g. 192.168.1.1). DNS = phone book (google.com → 142.250.185.46). Encryption = scrambles data (only recipient can decrypt).`,
    examples: [
      {
        question: 'Compare star and mesh network topologies (6 marks)',
        workingOut: `Star Topology:
Structure:
- All devices connect to central switch/hub
- Devices don't directly connect to each other
- All data passes through central switch

Advantages:
✓ Easy to add/remove devices
✓ If one cable fails, only that device affected
✓ Central management (security, monitoring)
✓ Fast performance (switch directs data)

Disadvantages:
✗ If central switch fails, whole network down
✗ Switch can be bottleneck
✗ More cable needed (each device to switch)

Use case: Schools, offices

Mesh Topology:
Structure:
- Every device connects to every other device
- Multiple paths between devices
- No central point

Advantages:
✓ Very reliable (if one connection fails, data takes alternative route)
✓ No single point of failure
✓ Fast (direct connections)
✓ Private (data doesn't pass through central point)

Disadvantages:
✗ Expensive (lots of cables/wireless links)
✗ Complex to set up and maintain
✗ Many connections (n devices = n(n-1)/2 connections!)

Use case: Military, critical infrastructure

Comparison table:
| Aspect | Star | Mesh |
|--------|------|------|
| Reliability | Switch = single point of failure | No single point of failure |
| Cost | Moderate | High (many connections) |
| Speed | Fast (switch) | Fast (direct) |
| Setup | Easy | Complex |
| Scalability | Easy | Difficult (exponential connections) |

Marks:
✓ Star structure/advantages [2]
✓ Mesh structure/advantages [2]
✓ Comparison/disadvantages [2]`,
        answer: 'Star: central switch, easy setup, switch fails = network down. Mesh: all interconnected, very reliable, expensive/complex. Star = offices, Mesh = critical systems.',
        explanation: '6 marks = describe both, advantages, disadvantages, comparison. Star = easy, switch dependency. Mesh = reliable, expensive!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What does DNS do?',
        options: ['Converts domain names to IP addresses', 'Encrypts data', 'Sends emails', 'Stores files'],
        answer: 'Converts domain names to IP addresses',
        explanation: 'DNS (Domain Name System) = phone book, converts google.com to IP address',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ LAN = local, WAN = wide',
      '⭐ Star = central switch (easy, switch fails = all down)',
      '⭐ Mesh = all connected (reliable, expensive)',
      '⭐ HTTPS = secure HTTP (encryption)',
      '⭐ DNS = domain to IP'
    ],
    commonMistakes: [
      '❌ Confusing LAN and WAN',
      '❌ Not explaining topology advantages/disadvantages',
      '❌ Confusing protocols'
    ],
    examStrategy: 'Networks = compare questions (6 marks). Star vs mesh common. Also: protocols, DNS, encryption. Explain: what, how, why, advantages/disadvantages!'
  },

  {
    moduleNumber: 9,
    title: 'Cybersecurity & Threats',
    duration: '75 minutes',
    introduction: 'Master security! Malware, phishing, social engineering, prevention, authentication, encryption.',
    keyPoints: [
      'Malware: virus, worm, trojan, ransomware, spyware',
      'Phishing: fake emails to steal data',
      'Social engineering: manipulating people',
      'Prevention: antivirus, firewall, updates, backups',
      'Authentication: passwords, 2FA, biometrics',
      'Encryption: scrambles data (only key can decrypt)',
      'Physical security: locks, CCTV'
    ],
    explanation: `Cybersecurity protects against threats. Malware types: virus (attaches to files), worm (self-replicates), trojan (disguised as legitimate), ransomware (encrypts files, demands payment), spyware (monitors activity). Phishing = fake emails/websites to steal credentials. Social engineering = psychological manipulation. Prevention: antivirus software (detects/removes malware), firewall (blocks unauthorized access), updates (patch vulnerabilities), backups (recover from attacks). Authentication: passwords (strong, unique), 2FA (two factors, e.g. password + SMS code), biometrics (fingerprint, face). Encryption = scrambles data (unreadable without key).`,
    examples: [
      {
        question: 'Explain three methods to protect against cyberattacks (6 marks)',
        workingOut: `Method 1: Strong passwords & 2FA
- Use complex passwords (12+ characters, mix of upper, lower, numbers, symbols)
- Different password for each account (if one breached, others safe)
- Enable two-factor authentication (2FA): requires second verification (SMS code, app)
- Even if password stolen, attacker can't access without 2nd factor
- Example: Banking apps use 2FA (password + fingerprint)
[2 marks]

Method 2: Regular software updates
- Updates patch security vulnerabilities (flaws attackers exploit)
- Enable automatic updates (OS, apps, antivirus)
- Example: WannaCry ransomware exploited Windows flaw; update would have prevented
- Outdated software = easy target
- Also update firmware (router, devices)
[2 marks]

Method 3: User education & awareness
- Train users to recognize phishing emails (suspicious sender, urgent language, spelling errors)
- Don't click unknown links or download attachments
- Verify website legitimacy (HTTPS, correct URL)
- Report suspicious activity
- Human = weakest link; education strengthens
- Example: Many breaches start with phishing - education reduces success rate
[2 marks]

Additional methods (if asked for more):
- Antivirus software (scans, removes malware)
- Firewall (blocks unauthorized access)
- Backups (recover from ransomware)
- Access control (least privilege)
- Network monitoring (detect intrusions)

Marks:
✓ Method 1 explained [2]
✓ Method 2 explained [2]
✓ Method 3 explained [2]

Each method needs: what, how, why effective, example!`,
        answer: '1) Strong passwords + 2FA (second verification). 2) Regular updates (patch vulnerabilities). 3) User education (recognize phishing).',
        explanation: '6 marks = 3 methods, 2 marks each. Explain: what, how, why, example. Security = layers!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Ransomware does what?',
        options: ['Encrypts files, demands payment', 'Steals passwords', 'Displays ads', 'Monitors activity'],
        answer: 'Encrypts files, demands payment',
        explanation: 'Ransomware encrypts victim\'s files, demands ransom (usually Bitcoin) for decryption key',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Malware types: virus, worm, trojan, ransomware, spyware',
      '⭐ Phishing = fake emails/sites',
      '⭐ Prevention = layers (antivirus, firewall, education, updates)',
      '⭐ 2FA = two factors (password + something else)',
      '⭐ Backups = essential (ransomware recovery)'
    ],
    commonMistakes: [
      '❌ Only naming methods, not explaining',
      '❌ Vague ("use security software")',
      '❌ Not giving examples',
      '❌ Confusing malware types'
    ],
    examStrategy: 'Cybersecurity = explain questions (6 marks). "Describe three methods to protect..." common. Need: what, how, why, example. Know: malware types, prevention, authentication!'
  },

  {
    moduleNumber: 10,
    title: 'Databases & SQL',
    duration: '80 minutes',
    introduction: 'Master databases! Tables, records, fields, primary keys, SQL queries (SELECT, WHERE, JOIN).',
    keyPoints: [
      'Database: organized collection of data',
      'Table: holds data (rows and columns)',
      'Record: row (one entry)',
      'Field: column (attribute)',
      'Primary key: unique identifier',
      'SQL: Structured Query Language',
      'SELECT: retrieve data',
      'WHERE: filter records',
      'JOIN: combine tables'
    ],
    explanation: `Database = structured data storage. Relational database = linked tables. Table = grid (rows/columns). Record = row (one item). Field = column (attribute, e.g. name, age). Primary key = unique identifier (e.g. StudentID). SQL = language to interact with databases. SELECT field FROM table: retrieve data. WHERE condition: filter. JOIN: combine tables using common field. ORDER BY: sort results. INSERT, UPDATE, DELETE: modify data.`,
    examples: [
      {
        question: 'Write SQL query: Find all students aged 16+ (3 marks)',
        workingOut: `Assuming table: Students(StudentID, Name, Age, Year)

SQL Query:
SELECT *
FROM Students
WHERE Age >= 16;

Explanation:
- SELECT * means select all fields (columns)
- FROM Students specifies which table
- WHERE Age >= 16 filters records (only age 16 or more)
- Semicolon ends statement

Result example:
| StudentID | Name | Age | Year |
|-----------|------|-----|------|
| 101 | Alice | 16 | 11 |
| 103 | Bob | 17 | 12 |
| 105 | Carol | 16 | 11 |

Marks:
✓ SELECT correct [1]
✓ FROM correct table [1]
✓ WHERE condition correct [1]

Alternative (specific fields):
SELECT Name, Age
FROM Students
WHERE Age >= 16;

Only shows Name and Age columns.

Common variations:
- Age > 16 (strictly greater)
- Age = 16 (exactly 16)
- Age BETWEEN 16 AND 18 (range)`,
        answer: 'SELECT * FROM Students WHERE Age >= 16;',
        explanation: '3 marks = SELECT, FROM, WHERE. SQL syntax: keywords uppercase (not required but convention), semicolon ends, condition in WHERE!'
      }
    ],
    practiceQuestions: [
      {
        question: 'What is a primary key?',
        options: ['Unique identifier for each record', 'First field', 'Most important data', 'Password'],
        answer: 'Unique identifier for each record',
        explanation: 'Primary key = unique identifier, no two records have same value (e.g. StudentID)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Table = rows (records) + columns (fields)',
      '⭐ Primary key = unique',
      '⭐ SQL: SELECT (what), FROM (where), WHERE (condition)',
      '⭐ * means all fields',
      '⭐ Semicolon ends SQL statement'
    ],
    commonMistakes: [
      '❌ Wrong SQL syntax',
      '❌ Forgetting WHERE clause',
      '❌ Confusing record/field',
      '❌ Not understanding primary key'
    ],
    examStrategy: 'Databases = SQL writing (3-5 marks). Practice: SELECT, WHERE, JOIN. Understand: tables, records, fields, primary key. Exam gives table structure, you write query!'
  },

  {
    moduleNumber: 11,
    title: 'Algorithms & Searching/Sorting',
    duration: '85 minutes',
    introduction: 'Master algorithms! Linear search, binary search, bubble sort, merge sort, efficiency.',
    keyPoints: [
      'Algorithm: step-by-step instructions',
      'Linear search: check each item (simple, slow)',
      'Binary search: divide in half (fast, needs sorted)',
      'Bubble sort: swap adjacent if wrong order (simple, slow)',
      'Merge sort: divide, sort, merge (fast, complex)',
      'Efficiency: time complexity (how speed changes with data size)',
      'Flowcharts: visual algorithm representation'
    ],
    explanation: `Algorithm = precise instructions to solve problem. Searching: Linear (check each item, O(n)), Binary (divide and conquer, O(log n), needs sorted data). Sorting: Bubble (compare adjacent, swap if wrong order, repeat, O(n²)), Merge (divide list, sort halves, merge, O(n log n)). Efficiency matters for large datasets. Flowcharts use shapes (oval=start/end, rectangle=process, diamond=decision, parallelogram=input/output).`,
    examples: [
      {
        question: 'Trace binary search for 23 in [3,8,12,15,23,31,45] (6 marks)',
        workingOut: `List: [3, 8, 12, 15, 23, 31, 45]
Target: 23

Step 1: Set boundaries
Low = 0 (index of first item)
High = 6 (index of last item)

Step 2: Find middle
Mid = (Low + High) // 2 = (0 + 6) // 2 = 3
List[3] = 15

Step 3: Compare
15 < 23 (too small)
Target in upper half
New Low = Mid + 1 = 4

Step 4: Find new middle
Mid = (4 + 6) // 2 = 5
List[5] = 31

Step 5: Compare
31 > 23 (too large)
Target in lower half
New High = Mid - 1 = 4

Step 6: Find new middle
Mid = (4 + 4) // 2 = 4
List[4] = 23

Step 7: Compare
23 == 23 FOUND!
Return index 4

Summary:
Iteration 1: Checked index 3 (15) - too small
Iteration 2: Checked index 5 (31) - too large  
Iteration 3: Checked index 4 (23) - found!

Total comparisons: 3 (linear search would take 5)

Marks:
✓ Correct initial boundaries [1]
✓ Iteration 1 correct [1]
✓ Iteration 2 correct [2]
✓ Iteration 3 correct [1]
✓ Conclusion (found, index) [1]

Why binary search efficient:
- Eliminates half remaining items each step
- O(log n) time complexity
- BUT requires sorted list
- Linear search: O(n), no sorting needed`,
        answer: 'Iteration 1: mid=3(15), too small, low=4. Iteration 2: mid=5(31), too large, high=4. Iteration 3: mid=4(23), found!',
        explanation: '6 marks = trace each iteration (mid, comparison, boundary update). Binary search = divide and conquer, O(log n)!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Binary search requires data to be...',
        options: ['Sorted', 'Random', 'Large', 'Unique'],
        answer: 'Sorted',
        explanation: 'Binary search only works on sorted data (needs to know which half to search)',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Linear search: simple, works on unsorted, O(n)',
      '⭐ Binary search: fast, needs sorted, O(log n)',
      '⭐ Bubble sort: simple, slow, O(n²)',
      '⭐ Merge sort: fast, complex, O(n log n)',
      '⭐ Trace means show each step!'
    ],
    commonMistakes: [
      '❌ Not showing trace steps',
      '❌ Using binary search on unsorted data',
      '❌ Off-by-one errors in indices',
      '❌ Not explaining efficiency'
    ],
    examStrategy: 'Algorithms = trace questions (6 marks) + efficiency (4 marks). Practice: binary search trace, bubble sort pass, flowcharts. Understand: when to use which algorithm!'
  },

  {
    moduleNumber: 12,
    title: 'Ethics, Legal, Environmental Issues',
    duration: '70 minutes',
    introduction: 'Master ethical/legal issues! Data Protection Act, Computer Misuse Act, Copyright, environmental impact, accessibility.',
    keyPoints: [
      'Data Protection Act: controls personal data use',
      'Computer Misuse Act: illegal access, hacking',
      'Copyright: protects creative work',
      'Patents: protect inventions',
      'Open source: free, modifiable code',
      'Environmental: e-waste, energy consumption',
      'Accessibility: technology for all abilities',
      'Digital divide: inequality in technology access'
    ],
    explanation: `Legal: Data Protection Act (personal data rights: access, correction, deletion, lawful processing). Computer Misuse Act (illegal: unauthorized access, data modification, malware distribution). Copyright protects creative works (books, music, software) - can't copy without permission. Patents protect inventions. Open source = free software, source code available. Environmental: computers use energy (carbon footprint), e-waste toxic. Accessibility: technology should work for disabilities (screen readers, subtitles). Digital divide = inequality in internet/device access (wealth, location).`,
    examples: [
      {
        question: 'Discuss environmental impact of technology (6 marks)',
        workingOut: `Environmental Issues:

1. Energy Consumption
- Data centers use huge amounts of electricity (cooling, servers)
- Global data centers use 1% of world's electricity
- Fossil fuels = carbon emissions, climate change
- Cryptocurrencies extremely energy-intensive (Bitcoin mining)
- Impact: Global warming, resource depletion

Solutions:
- Renewable energy (solar, wind for data centers)
- Energy-efficient hardware
- Cloud computing (shared resources, better utilization)

2. E-Waste
- Electronic devices contain toxic materials (lead, mercury, cadmium)
- 50 million tonnes e-waste annually, mostly landfill
- Developing countries dump sites = health hazards
- Short product lifecycles (phones upgraded every 2 years)
- Impact: Soil/water contamination, health problems

Solutions:
- Recycling programs (recover metals, safe disposal)
- Design for longevity (repairable, upgradable)
- Legislation (manufacturers responsible for disposal)

3. Resource Extraction
- Rare earth metals (phones, computers) = destructive mining
- Water usage in manufacturing
- Deforestation (space for factories)
- Impact: Habitat destruction, pollution

Solutions:
- Sustainable sourcing
- Circular economy (reuse, refurbish)

4. Carbon Footprint of Manufacturing
- Producing smartphone = 55kg CO₂
- Global supply chains = transportation emissions
- Impact: Climate change

Balanced view:
Negative impacts BUT technology also helps:
- Remote work reduces commute emissions
- Smart grids optimize energy
- Online reduces paper use

Responsible computing needed:
- Individuals: repair not replace, recycle, turn off devices
- Companies: green data centers, sustainable design
- Governments: regulations, incentives

Marks awarded for:
✓ Energy consumption explained [2]
✓ E-waste explained [2]
✓ Solutions/mitigation [1]
✓ Balanced view/evaluation [1]`,
        answer: 'Energy: data centers use 1% global electricity. E-waste: 50M tonnes annually, toxic. Solutions: renewables, recycling, repair. Technology helps (remote work) BUT responsible computing needed.',
        explanation: '6 marks = issues (energy, e-waste), impacts, solutions, balance. Show: problems, consequences, what can be done!'
      }
    ],
    practiceQuestions: [
      {
        question: 'Computer Misuse Act makes what illegal?',
        options: ['Unauthorized access to computer', 'Slow internet', 'Forgetting password', 'Buying software'],
        answer: 'Unauthorized access to computer',
        explanation: 'Computer Misuse Act criminalizes: unauthorized access, modification, malware distribution',
        difficulty: 'easy'
      }
    ],
    tips: [
      '⭐ Data Protection Act = personal data rights',
      '⭐ Computer Misuse Act = hacking illegal',
      '⭐ Copyright = can\'t copy without permission',
      '⭐ Open source = free, modifiable',
      '⭐ E-waste toxic, recycling important',
      '⭐ Digital divide = inequality'
    ],
    commonMistakes: [
      '❌ Confusing laws',
      '❌ One-sided (only negative OR only positive)',
      '❌ No solutions',
      '❌ Vague answers'
    ],
    examStrategy: `**COMPUTER SCIENCE EXAM STRATEGY:**

**Papers:**
- Paper 1: Theory (written, 80 marks, 1h30m) - Systems, networks, security, ethics, algorithms
- Paper 2: Programming (onscreen, 40 marks, 2h) - Write, test, debug Python code

**Question Types:**
- Multiple choice (1 mark)
- Short answer (2-4 marks)
- Explain/describe (4-6 marks)
- Programming (6-12 marks)
- Extended response (6-9 marks)

**Paper 1 Strategy:**
- Know definitions (algorithm, encryption, etc.)
- Trace algorithms (show each step)
- Explain questions = what, how, why, example
- Compare questions = both sides, advantages/disadvantages
- Calculate file sizes (show working!)
- Binary conversions (check by converting back)

**Paper 2 Strategy:**
- Read question carefully (inputs, outputs, constraints)
- Plan before coding (pseudocode/comments)
- Test with different inputs (normal, boundary, invalid)
- Debug systematically (trace line-by-line)
- Comment complex sections
- Check: variable names, indentation, syntax

**Key Topics:**
✅ Programming: variables, selection, iteration, lists, functions
✅ Number systems: binary, hex, conversions, addition
✅ Data representation: ASCII, Unicode, images, file size
✅ Networks: LAN/WAN, topologies, protocols, security
✅ Algorithms: search (linear, binary), sort (bubble, merge)
✅ Databases: SQL queries (SELECT, WHERE)
✅ Ethics/legal: laws, environmental, accessibility

**Success Formula:**
📝 Show working (calculations, traces)
💻 Practice coding regularly
📊 Know efficiency (linear vs binary, bubble vs merge)
🔐 Understand security layers
⚖️ Balanced answers (pros AND cons)
📖 Learn SQL syntax
🌍 Real-world examples

**Common Command Words:**
- Define: Short, precise meaning
- Describe: More detail, characteristics
- Explain: Reasons WHY, cause/effect
- Compare: Similarities AND differences
- Evaluate: Pros, cons, judgement
- Justify: Give reasons for decision

**Time Management:**
~1 minute per mark
Programming questions: Plan 5 mins, code, test 5 mins

You've mastered GCSE Computer Science! 💻`
  }
];

export default gcseComputerScienceContent;

