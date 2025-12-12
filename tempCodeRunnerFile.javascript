function Afunc() {
    const A = 10;
    return function Bfunc() {
        const B = 20;
        return function Cfunc() {
            const C = 30;
            return A + B + C;
        }
    }
}

const result = Afunc()()();
console.log(result); // Output: 60
