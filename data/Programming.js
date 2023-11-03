export default [
  {
    "question": "write a classic for loop using i that iterates over an array called arr",
    "answer": "for(let i = 0; i ⟨ arr.length; i++) { }"
  },
  {
    "question": "write a loop using 'for...of' to iterate over an array called 'arr' and access each item with a variable called 'item'",
    "answer": "for(let item of arr) { }"
  },
  {
    "question": "write a loop using 'for...in' to iterate over the properties of an object called 'obj' and access each property name with a variable called 'key'",
    "answer": "for(let key in obj) { }"
  },
  {
    "question": "write a '.forEach' loop to iterate over an array called 'arr' and use an arrow function to access each item as 'element'",
    "answer": "arr.forEach(element => { })"
  },
  {
    "question": "use the '.map' function to transform each item in an array called 'arr' and store the transformed values in a variable called 'resultArr'",
    "answer": "let resultArr = arr.map(item => item)"
  },
  {
    "question": "write a loop using 'for...of' to iterate over the entries of an array called 'arr' and access each key-value pair with the variables '[index, element]'",
    "answer": "for(let [index, element] of arr.entries()) { }"
  },
  {
    "question": "use the '.sort' function to sort the items in an array called 'arr' based on a criteria. Access two items for comparison with the variables 'a' and 'b'",
    "answer": "arr.sort((a, b) => { return a - b })"
  },
  {
    "question": "use the '.reduce' function to process the elements of an array called 'arr' into a single value. Access the accumulator with 'acc' and the current item with 'curr'",
    "answer": "arr.reduce((acc, curr) => { return acc + curr }, 0)"
  },
  {
    "question": "use the '.filter' function to filter items in an array called 'arr' based on a condition. Access each item with the variable 'item'",
    "answer": "arr.filter(item => { return item > 0 })"
  },
  {
    "question": "use the '.find' function to find the first item in an array called 'arr' that meets a condition. Access each item with the variable 'item'",
    "answer": "arr.find(item => { return item > 0 })"
  },
  {
    "question": "Declare a constant variable called 'myConstant' and set its value to 10.",
    "answer": "const myConstant = 10"
  },
  {
    "question": "Declare a variable called 'myName' and set its value to the string 'John'.",
    "answer": "let myName = 'John'"
  },
  {
    "question": "Write a function using function keyword called 'add' that takes two parameters 'a' and 'b' and returns their sum.",
    "answer": "function add(a, b) { return a + b }"
  },
  {
    "question": "Create an arrow function called 'subtract' that takes two parameters 'x' and 'y' and returns their difference.",
    "answer": "const subtract = (x, y) => x - y"
  },
  {
    "question": "Write an if statement that checks if a variable 'number' is greater than 10 and logs 'Greater' to the console.",
    "answer": "if(number > 10) { console.log('Greater') }"
  },
  {
    "question": "Write a ternary expression that checks if a variable 'age' is greater than 18 and returns 'Adult' if true and 'Minor' if false.",
    "answer": "let status = age > 18 ? 'Adult' : 'Minor'"
  },
  {
    "question": "Write a switch statement for a variable 'fruit' that logs 'I like apples' when the fruit is 'apple'.",
    "answer": "switch(fruit) { case 'apple': console.log('I like apples') break }"
  },
  {
    "question": "Create an array called 'colors' with the values 'red', 'green', and 'blue'.",
    "answer": "const colors = ['red', 'green', 'blue']"
  },
  {
    "question": "Access the second element in an array called 'names' and store it in a variable called 'secondName'.",
    "answer": "let secondName = names[1]"
  },
  {
    "question": "Write a loop that logs numbers from 1 to 5 using a 'for' loop.",
    "answer": "for(let i = 1; i ⟨= 5; i++) { console.log(i) }"
  },
  {
    "question": "Write a function expression that multiplies two numbers. Name the function 'multiply' and it should take parameters 'x' and 'y'.",
    "answer": "const multiply = function(x, y) { return x * y }"
  },
  {
    "question": `<p>Consider the following JavaScript code:</p>
      <pre>
      greet()
  
      function greet() {
        console.log("Hello!")
      }
      </pre>
      <p>Even though the function is called before its declaration, the code runs without any errors. This behavior is due to a fundamental concept in JavaScript. What is this concept called?</p>
  
      <p><strong>Visualization:</strong></p>
      <pre>
      // This is how JavaScript internally rearranges the code:
      function greet() {
        console.log("Hello!")
      }
  
      greet()
      </pre>
  
      <p>This concept means that function declarations are lifted to the top of their scope before the code is executed, allowing them to be called before they appear in the code. What is the name of this concept?</p>
    `,
    "answer": "hoisting"
  },
  {
    "question": `
      <p>In JavaScript, which one will be hoisted?</p>
  
      <ul>
        <li><code>const myConst = 10</code></li>
        <li><code>let myLet = 20</code></li>
        <li><code>myArrowFunc = () => { return 'Hello' }</code></li>
        <li><code>var myVar = 0</code></li>
      </ul>
    `,
    "answer": "var myVar = 0"
  },
  {
    "question": `
        what does x represent in this loop: for(let x in obj) { } 
    `,
    "answer": "key"
  },
  {
    "question": `
        what does x represent in this loop: for(let x of obj) { } 
    `,
    "answer": "value"
  },
  {
    "question": `
        what does i represent in this loop: for( let i = 0; i ⟨ arr.length; i++) { }
    `,
    "answer": "index"
  },
  {
    "question": `what does arr[i] represent in body of this loop: for( let i = 0; i ⟨ arr.length; i++) { arr[i] }`,
    "answer": "value"
  },
  {
    "question": `
        what is another name for key in an object
    `,
    "answer": "property name"
  },
  {
    "question": `what is a name for both key and value in an object
    `,
    "answer": "property"
  },
  {
    "question": `
        what is another name for property name
    `,
    "answer": "key"
  },
  {
    "question": `
        can add a property {y: "x" } to an existing object 'a' and store it in const b. Use destructuring
    `,
    "answer": `const b = {...a, y: "x" }`
  },
  {
    "question": `
        can add a property {y: "x" } to an existing object 'a' and store it in const b. Dont create new object 
    `,
    "answer":
      `a.y = "x"
const b = a`
  },
  {
    "question": `
a.y = "x"
const b = a
what is output of a === b
    `,
    "answer":
      `true`
  },
  {
    "question": `
      const b = {...a, y: "x" }
what is output of a === b
    `,
    "answer":
      `false`
  },
  {
    "question": `
      a whole object is iterated through coping every value into a new variable like with destructuring (or a loop):
const b = {...a }
what is the name for this operation
    `,
    "answer":
      `shallow copy`
  },
  {
    "question": `
      assign objects 'a' reference to another const object 'b'. 
      Object 'a' is just an alias (different name but the same) as object 'b'
    `,
    "answer":
      `const b = a`
  },
  {
    "question": `
      use destructuring:
get properties 'x' and 'y' from object 'a' and assign them to constants with the same name 
    `,
    "answer":
      `const {x, y} = a`
  },
  {
    "question": `
      without destructuring:
      get properties 'x' and 'y' from object 'a' and assign them to variables with the same name 
    `,
    "answer":
      `let x = a.x
let y = a.y`
  },
  {
    "question": `
      without destructuring:
      get properties 'x' and 'y' from object 'a' and assign them to constants named 'b' and 'c'
    `,
    "answer":
      `const b = a.x
const c = a.y`
  },
  {
    "question": `
      use destructuring:
      get properties 'x' and 'y' from object 'a' and assign them to variables named 'b' and 'c'
    `,
    "answer":
      `let {x: b, y: c} = a`
  },
  {
    "question": `
    let obj = {
      name: "John",
    }
    what is the key   
    `,
    "answer":
      `name`
  },
  {
    "question": `
    let obj = {
      name: "John",
    }
    what is the value the only property in obj
    `,
    "answer":
      `John`
  },
  {
    "question": `
    let obj = {
      name: "John",
    }
    what is the value the property in obj
    `,
    "answer":
      `name: "John"`
  },
  {
    "question": `
    let obj = {
      name: "John",
    }
    what is the name of this object
    `,
    "answer":
      `obj`
  },
  {
    "question": `
    let obj = {
      name: "John",
    }
    what is the name of this object
    `,
    "answer":
      `obj`
  },
  {
    "question": `
     with destructuring and ES5 function
     create a function declaration of a component 'Hello' that takes props 'a', 'b'
    `,
    "answer":
      `function Hello({ a, b })`
  },
  {
    "question": `
     without destructuring 
     create a function declaration of a component 'Hello' that takes props 'a', 'b'
    `,
    "answer":
      `function Hello(props)`
  },
  {
    "question":
      `create a parameter-less function with empty body named myFunc using ES5 syntax`
    ,
    "answer":
      `function myFunc () {}`
  },
  {
    "question":
      `create a parameter-less constant arrow function with empty body named myFunc`
    ,
    "answer":
      `const myFunc = () => {}`
  },
  {
    "question":
      `Complete this code so it logs value of prop 'a'
      const MyComponent = ({a}) => {
        // what code goes here
        return (⟨div> Very Bland Component Camille would like to eat it ⟨/div>)
      }`
    ,
    "answer":
      `console.log(a)`
  },

  {
    "question":
      `Complete this code so it logs value of prop 'a'
      const MyComponent = (props) => {
        // what code goes here
        return (⟨div> Very Bland Component Camille would like to eat it ⟨/div>)
      }`
    ,
    "answer":
      `console.log(props.a)`
  },
  {
    "question":
      `Complete this code so it displays the value of prop 'a' onto the website
      const MyComponent = (props) => {
        return (
          ⟨div> 
          A more spicy component which Camille is likely to dislike
          // code to display prop 'a' goes here  
          ⟨/div>)
      }`
    ,
    "answer":
      `{{props.a}}`
  },
  {
    "question":
      `Complete this code so it displays the value of prop 'a' onto the website
      const MyComponent = ({a}) => {
        return (
          ⟨div> 
          A more spicy component which Camille is likely to dislike
          // code to display prop 'a' goes here  
          ⟨/div>)
      }`
    ,
    "answer":
      `{{a}}`
  },
  {
    "question":
      `Given a component MyComponet pass in a prop called 'a' with value 'pierogi' to it.
      The component doesnt take any children (it is empty terminate it with /> )`
    ,
    "answer":
      `⟨MyComponent a="pierogi" />`
  },
  {
    "question":
      `Given a component MyComponet pass in a prop called 'a' with value of a variable called 'b' to it.
      The component doesnt take any children (it is empty terminate it with /> )`
    ,
    "answer":
      `⟨MyComponent a={{b}} />`
  },
  {
    "question":
      `Given a component MyComponet pass in a text child that contains text "Excitement!" to it`
    ,
    "answer":
      `⟨MyComponent > Excitement! ⟨/MyCompotnet>`
  },
  {
    "question":
      `Given a component MyComponet pass in a child div tag that contains text "Careful!" to it`
    ,
    "answer":
      `⟨MyComponent > ⟨div> Careful! ⟨/div> ⟨/MyCompotnet>`
  },

  {
    "question":
      `what is the name of the parent of the div tag in this line of code:
      ⟨MyComponent > ⟨div> Careful ⟨/div> ⟨/MyCompotnet>`
    ,
    "answer":
      `MyComponent`
  },
];
