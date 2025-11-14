// Provide 3 unique implementations of the following function in JavaScript.

// **Input**: `n` - any integer

// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Implementation 1: Mathematical Formula (Gauss's Formula)
// Time Complexity: O(1), Space Complexity: O(1)
// Most efficient - uses the arithmetic series sum formula: n * (n + 1) / 2
var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

// Implementation 2: Iterative Approach (For Loop)
// Time Complexity: O(n), Space Complexity: O(1)
// Classic iterative solution using a for loop
var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Implementation 3: Recursive Approach
// Time Complexity: O(n), Space Complexity: O(n) due to call stack
// Recursive solution that breaks down the problem into smaller subproblems
var sum_to_n_c = function(n) {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
};

// Test cases to verify all implementations
console.log("Testing sum_to_n implementations:");
console.log("sum_to_n_a(5) =", sum_to_n_a(5)); // Expected: 15
console.log("sum_to_n_b(5) =", sum_to_n_b(5)); // Expected: 15
console.log("sum_to_n_c(5) =", sum_to_n_c(5)); // Expected: 15

console.log("\nsum_to_n_a(10) =", sum_to_n_a(10)); // Expected: 55
console.log("sum_to_n_b(10) =", sum_to_n_b(10)); // Expected: 55
console.log("sum_to_n_c(10) =", sum_to_n_c(10)); // Expected: 55