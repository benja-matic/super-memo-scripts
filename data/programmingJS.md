| Question | Answer |
|----------|--------|
| const a = [1, 2, 3]; a.map(x => { x * 3; return 0; }); console.log(a); | [0, 0, 0] |
| const a = [1, 2, 3]; let result = ''; for(const x of a) { result += (x + 3) + ' '; } console.log(result.trim()); | 4 5 6 |
| const a = {x: 10, y: 20}; for(const b in a) { console.log(a[b]); } | 10 20 |
| const a = [1, -2, 3, -4]; const b = a.filter(x => x < 0); console.log(b); | [-2, -4] |
| const a = ['x', 'y', 'z']; for(const [b, c] of a.entries()) { console.log(b + c); } | 0x 1y 2z |
| const a = [10, 20, 30]; const b = a.reduce((x, y) => x + y); console.log(b); | 60 |
| let a = 12; if(a > 10) { console.log('Greater'); } else { console.log('Smaller'); } | Greater |
| const a = {x: 'apple', y: 'banana'}; const b = Object.keys(a); console.log(b); | ['x', 'y'] |
| const a = [5, 1, 3, 2]; a.sort((x, y) => y - x); console.log(a); | [5, 3, 2, 1] |
| let a = 10; let b = 20; const c = a < b ? 'a is smaller' : 'b is smaller'; console.log(c); | a is smaller |
| const a = {x: 10, y: 20}; const b = {...a, z: 30}; console.log(b); | {x: 10, y: 20, z: 30} |
| const a = {x: 'apple', y: 'banana'}; for(const b in a) { console.log(b + ' is ' + a[b]); } | x is apple y is banana |
| const a = ['apple', 'banana', 'cherry']; const b = a.indexOf('banana'); console.log(b); | 1 |
| const a = [1, 2, 3]; a.map(x => x * 3); console.log(a); | [3, 6, 9] |
| const a = [1, 2, 3]; let b = ''; for (const x of a) { b += x + 2; } console.log(b); | 345 |
 | const a = {x: 10, y: 20}; for (const b in a) { console.log(b); } | x y |
| let a = 5; if (a > 3) { console.log('Greater'); } console.log('Smaller'); | Greater Smaller |
| const a = [1, 2, 3]; const b = a.filter(x => x > 1); console.log(b); | [2, 3] |
| const a = [1, 2, 3]; const b = a.reduce((x, y) => x + y, 1); console.log(b); | 7 |

| const a = [1, 2, 3]; const c = 2; const b = a.reduce((x, y) => x + y, c); console.log(b); | 8 |
| const a = [1, 2, 3]; const c = 2; const b = a.reduce((x, y) => x + y, c); console.log(c); | 8 |
| const a = [1, 2, 3]; const c = 2; const b = a.reduce((x, y) => x + y, c); console.log(a); | [1, 2, 3] |
| const a = [5, 1, 2]; a.sort(); console.log(a); | [1, 2, 5] |
| let a = 18; const b = a > 18 ? 'Adult' : 'Minor'; console.log(b); | Minor |
| const a = ['red', 'green', 'blue']; const b = a.map(x => x.toUpperCase()); console.log(b); | ['RED', 'GREEN', 'BLUE'] |
| const a = [1, 2, 3]; const b = a.map(x => x * 2); console.log(b); | [2, 4, 6] |
| let a = 10; a += 5; console.log(a); | 15 |
| const a = [10, 20, 30]; const b = [...a, 40]; console.log(b); | [10, 20, 30, 40] |
| const a = {x: 10, y: 20}; const {x, y: b} = a; console.log(b); | 20 |
| const a = {x: 10, y: 20}; const {x, y: b} = a; console.log(y); | undefined |
| const a = {x: 10, y: 20}; const {x, y: b} = a; console.log(a.y); | 20 |
| const a = {x: 10, y: 20}; const {x, y: b} = a; console.log(x); | 10 |
| const a = 'Hello'; const b = a.repeat(2); console.log(b); | HelloHello |
| const a = [1, 2, 3]; const b = a.find(x => x > 1); console.log(b); | 2 |
| const a = [1, 2, 3]; let q = 0; for(const x of a) { q += x; } console.log(q); | 6 |
| const a = {x: 10, y: 20}; const {x, y} = a; console.log(x + y); | 30 |
| const a = {x: 10, y: 20}; console.log(x + y); | undefined |
| const a = {x: 10, y: 20}; console.log(a.x + a.y); | 30 |
| const a = [1, 2, 3]; a.map(x => x * 3); console.log(a); | [1, 2, 3] |
| const a = [1, 2, 3]; let b = ''; for (const x of a) { b += x + 2; } console.log(b); | 357 |
| const a = {x: 10, y: 20}; for (const b in a) { console.log(a[b] + 5); } | 15 25 |
| const a = {x: 10, y: 20}; for (const b in a) { console.log(b + 5); } | x5 y5 |
| const a = [1, 2, 3]; const b = a.filter(x => x > 1); console.log(b); | [2, 3] |
| let a = 5; if (a > 3) { console.log('Greater'); } console.log('Smaller'); | Greater Smaller |
| const a = [1, 2, 3, 4]; const b = a.reduce((x, y) => x + y, 0); console.log(b); | 10 |
| const a = [5, 1, 3, 2]; a.sort(); console.log(a); | [1, 2, 3, 5] |
| let a = 18; const b = a > 18 ? 'Adult' : 'Minor'; console.log(b); | Minor |
| const a = ['red', 'green', 'blue']; const b = a.map(x => x.toUpperCase()); console.log(b); | ['RED', 'GREEN', 'BLUE'] |
| const a = [1, 2, 3]; const b = a.map(x => x * 2); console.log(b); | [2, 4, 6] |
| let a = 10; a += 5; console.log(a); | 15 |
| const a = [10, 20, 30]; const b = [...a, 40]; console.log(b); | [10, 20, 30, 40] |
| const a = {x: 10, y: 20}; const {x, y: b} = a; console.log(b); | 20 |
| const a = 'Hello'; const b = a.repeat(2); console.log(b); | HelloHello |
| let a = 10; let b = 20; const c = a < b ? 'a' : 'b'; console.log(c); | a |
| const a = {x: 'a', y: 'b'}; for(const b in a) { console.log(a); } | {x: 'a', y: 'b'} {x: 'a', y: 'b'} |