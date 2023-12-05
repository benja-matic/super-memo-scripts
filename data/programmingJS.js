export default [
  {
    question: `const a = [1, 2, 3]
a.map(x => {
  x * 3
  return 0
})
console.log(a)
`,
    answer: `[0, 0, 0]`
  },
  {
    question: `const a = [1, 2, 3]
let result = ''
for(const x of a) { 
  result += (x + 3) + ' '
} console.log(result.trim())
`,
    answer: `4 5 6`
  },
  {
    question: `const a = {x: 10, y: 20}
for(const b in a) { 
  console.log(a[b])
}`,
    answer: `10 20`
  },
  {
    question: `const a = [1, -2, 3, -4]
const b = a.filter(x => x < 0)
console.log(b)
`,
    answer: `[-2, -4]`
  },
  {
    question: `const a = ['x', 'y', 'z']
for(const [b, c] of a.entries()) { 
  console.log(b + c)
}`,
    answer: `0x 1y 2z`
  },
  {
    question: `const a = [10, 20, 30]
const b = a.reduce((x, y) => x + y)
console.log(b)
`,
    answer: `60`
  },
  {
    question: `let a = 12
if(a > 10) { 
  console.log('Greater')
} else { 
  console.log('Smaller')
}`,
    answer: `Greater`
  },
  {
    question: `const a = {x: 'apple', y: 'banana'}
const b = Object.keys(a)
console.log(b)
`,
    answer: `['x', 'y']`
  },
  {
    question: `const a = [5, 1, 3, 2]
a.sort((x, y) => y - x)
console.log(a)
`,
    answer: `[5, 3, 2, 1]`
  },
  {
    question: `let a = 10
let b = 20
const c = a < b ? 'b' : 'a'
console.log(c)
`,
    answer: `b`
  },
  {
    question: `const a = {x: 10, y: 20}
const b = {...a, z: 30}
console.log(b)
`,
    answer: `{x: 10, y: 20, z: 30}`
  },
  {
    question: `const a = {x: 'apple', y: 'banana'}
for(const b in a) { 
  console.log(b + ' is ' + a[b])
}`,
    answer: `x is apple 
y is banana`
  },
  {
    question: `const a = ['apple', 'banana', 'cherry']
const b = a.indexOf('banana')
console.log(b)
`,
    answer: `1`
  },
  {
    question: `const a = [1, 2, 3]
 a.map(x => x * 3)
 console.log(a)
`,
    answer: `[3, 6, 9]`
  },
  {
    question: `const a = [1, 2, 3]
let b = ''
for (const x of a) { 
  b += x + 2
} 
console.log(b)
`,
    answer: `345`
  },
  {
    question: `const a = [0, 2, 1]
let b = ''
for (const x of a) { 
  b += x + 1
} 
console.log(b)
`,
    answer: `132`
  },
  {
    question: `const a = [1, 0, 1]
 let b = ''
 for (const x of a) { 
    b += x - 1
 } 
 console.log(b)
`,
    answer: `0-10`
  },
  {
    question: `const a = [1, 2, 0, 0]
let b = ''
for (const x of a) { 
   b += x - 1
} 
console.log(b)
`,
    answer: `01-1-1`
  },
  {
    question: `const a = {x: 10, y: 20}
for (const b in a) { 
  console.log(b)
}`,
    answer: `x y`
  },
  {
    question: `let a = 5
if (a > 3) { 
  console.log('Greater')
} 
console.log('Smaller')
`,
    answer: `Greater
Smaller`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.filter(x => x > 1)
console.log(b)
`,
    answer: `[2, 3]`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.reduce((x, y) => x + y, 1)
console.log(b)
`,
    answer: `7`
  },
  {
    question: `const a = [1, 2, 3]
const c = 2
const b = a.reduce((x, y) => x + y, c)
console.log(b)
`,
    answer: `8`
  },
  {
    question: `const a = [1, 2, 3]
const c = 2
const b = a.reduce((x, y) => x + y, c)
console.log(c)
`,
    answer: `8`
  },
  {
    question: `const a = [1, 2, 3]
const c = 2
const b = a.reduce((x, y) => x + y, c)
console.log(a)
`,
    answer: `[1, 2, 3]`
  },
  {
    question: `const a = [5, 1, 2]
a.sort()
console.log(a)
`,
    answer: `[1, 2, 5]`
  },
  {
    question: `let a = 18
const b = a > 18 ? 'Adult' : 'Minor'
console.log(b)
`,
    answer: `Minor`
  },
  {
    question: `const a = ['red', 'green', 'blue']
const b = a.map(x => x.toUpperCase())
console.log(b)
`,
    answer: `['RED', 'GREEN', 'BLUE']`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.map(x => x * 2)
console.log(b)
`,
    answer: `[2, 4, 6]`
  },
  {
    question: `let a = 10
a += 5
console.log(a)
`,
    answer: `15`
  },
  {
    question: `const a = [10, 20, 30]
const b = [...a, 40]
console.log(b)
`,
    answer: `[10, 20, 30, 40]`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y: b} = a
console.log(b)
`,
    answer: `20`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y: b} = a
console.log(y)
`,
    answer: `undefined`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y: b} = a
console.log(a.y)
`,
    answer: `20`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y: b} = a
console.log(x)
`,
    answer: `10`
  },
  {
    question: `const a = 'Hello'
const b = a.repeat(2)
console.log(b)
`,
    answer: `HelloHello`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.find(x => x > 1)
console.log(b)
`,
    answer: `2`
  },
  {
    question: `const a = [1, 2, 3]
let q = 0
for(const x of a) { 
  q += x
} 
console.log(q)
`,
    answer: `6`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y} = a
console.log(x + y)
`,
    answer: `30`
  },
  {
    question: `const a = {x: 10, y: 20}
console.log(x + y)
`,
    answer: `undefined`
  },
  {
    question: `const a = {x: 10, y: 20}
console.log(a.x + a.y)
`,
    answer: `30`
  },
  {
    question: `const a = [1, 2, 3]
a.map(x => x * 3)
console.log(a)
`,
    answer: `[1, 2, 3]`
  },
  {
    question: `const a = [1, 2, 3]
let b = ''
for (const x of a) {
   b += x + 2
} 
console.log(b)
`,
    answer: `357`
  },
  {
    question: `const a = {x: 10, y: 20}
for (const b in a) { 
  console.log(a[b] + 5)
}`,
    answer: `15 25`
  },
  {
    question: `const a = {x: 10, y: 20}
for (const b in a) { 
  console.log(b + 5)
}`,
    answer: `x5 y5`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.filter(x => x > 1)
console.log(b)
`,
    answer: `[2, 3]`
  },
  {
    question: `let a = 5
if (a > 3) { console.log('Greater')
} console.log('Smaller')
`,
    answer: `Greater Smaller`
  },
  {
    question: `const a = [1, 2, 3, 4]
const b = a.reduce((x, y) => x + y, 0)
console.log(b)
`,
    answer: `10`
  },
  {
    question: `const a = [5, 1, 3, 2]
a.sort()
console.log(a)
`,
    answer: `[1, 2, 3, 5]`
  },
  {
    question: `let a = 17
const b = a < 18 ? 'Adult' : 'Minor'
console.log(b)
`,
    answer: `Adult`
  },
  {
    question: `const a = ['red', 'green', 'blue']
const b = a.map(x => x.toUpperCase())
console.log(b)
`,
    answer: `['RED', 'GREEN', 'BLUE']`
  },
  {
    question: `const a = [1, 2, 3]
const b = a.map(x => x * 2)
console.log(b)
`,
    answer: `[2, 4, 6]`
  },
  {
    question: `let a = 10
a += 5
console.log(a)
`,
    answer: `15`
  },
  {
    question: `const a = [10, 20, 30]
const b = [...a, 40]
console.log(b)
`,
    answer: `[10, 20, 30, 40]`
  },
  {
    question: `const a = {x: 10, y: 20}
const {x, y: b} = a
console.log(b)
`,
    answer: `20`
  },
  {
    question: `const a = 'Hello'
const b = a.repeat(2)
console.log(b)
`,
    answer: `HelloHello`
  },
  {
    question: `let a = 10
let b = 20
const c = a < b ? 'a' : 'b'
console.log(c)
`,
    answer: `a`
  },
  {
    question: `const a = {x: 'a', y: 'b'}
for(const b in a) { 
  console.log(a)
}`,
    answer: `{x: 'a', y: 'b'}
{x: 'a', y: 'b'}`
  }
];
