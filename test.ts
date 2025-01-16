interface A {
  x: number;
  y: string;
}

interface B {
  x: number;
}

const map = (a: A): B => {
  return a as B;
};

const a: A = { x: 1, y: 'a' };

const b = map(a) as B;

console.log(b);
