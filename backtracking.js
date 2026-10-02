// ==================== BACKTRACKING ALGORITHMS ====================

// Traveling Salesman Problem
function tsp(distMatrix) {
    let n = distMatrix.length;
    let visited = new Array(n).fill(false);
    let allPaths = [];
    let minCost = Infinity;
    let bestPath = [];

    function tspHelper(pos, cost, path, steps) {
        if (path.length === n) {
            let totalCost = cost + distMatrix[path[n - 1]][path[0]];
            steps.push(`Path ${path.join('→')}→0: cost = ${totalCost}`);

            if (totalCost < minCost) {
                minCost = totalCost;
                bestPath = [...path, 0];
            }
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                visited[i] = true;
                path.push(i);
                tspHelper(i, cost + distMatrix[pos][i], path, steps);
                path.pop();
                visited[i] = false;
            }
        }
    }

    let steps = [];
    visited[0] = true;
    tspHelper(0, 0, [0], steps);

    steps.push(`\nBest path: ${bestPath.join('→')} with total distance: ${minCost}`);

    return { bestPath, minCost, steps };
}

// N Queens Problem
function nQueens(n) {
    let solutions = [];
    let board = Array(n).fill(-1);
    let steps = [];

    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }

    function solveNQueens(row) {
        if (row === n) {
            let solution = [];
            for (let i = 0; i < n; i++) {
                solution.push({ row: i, col: board[i] });
            }
            solutions.push(solution);
            steps.push(`Solution ${solutions.length}: ${board.join(',')}`);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = col;
                solveNQueens(row + 1);
                board[row] = -1;
            }
        }
    }

    steps.push(`Finding all ${n}-Queens solutions...`);
    solveNQueens(0);
    steps.push(`Total solutions found: ${solutions.length}`);

    return { solutions, numSolutions: solutions.length, steps };
}

// Sum of Subsets
function sumOfSubsets(set, target) {
    let results = [];
    let steps = [];

    function backtrack(index, currentSum, subset) {
        steps.push(`Index ${index}, Sum ${currentSum}, Subset [${subset.join(', ')}]`);

        if (currentSum === target) {
            results.push([...subset]);
            steps.push(`Found: [${subset.join(', ')}]`);
            return;
        }

        if (index >= set.length || currentSum > target) {
            return;
        }

        subset.push(set[index]);
        backtrack(index + 1, currentSum + set[index], subset);
        subset.pop();

        backtrack(index + 1, currentSum, subset);
    }

    backtrack(0, 0, []);
    return { results, steps };
}

// Graph Coloring
function graphColoring(adjMatrix, m) {
    const n = adjMatrix.length;
    let colors = new Array(n).fill(0);
    let steps = [];

    function isSafe(v, c) {
        for (let i = 0; i < n; i++) {
            if (adjMatrix[v][i] === 1 && colors[i] === c) {
                return false;
            }
        }
        return true;
    }

    function solve(v) {
        if (v === n) {
            return true;
        }

        for (let c = 1; c <= m; c++) {
            if (isSafe(v, c)) {
                colors[v] = c;
                steps.push(`Color vertex ${v} with ${c}`);
                if (solve(v + 1)) {
                    return true;
                }
                steps.push(`Backtrack vertex ${v}`);
                colors[v] = 0;
            }
        }
        return false;
    }

    const possible = solve(0);
    return { colors, possible, steps };
}

// Hamiltonian Cycle
function hamiltonianCycle(adjMatrix) {
    const n = adjMatrix.length;
    let path = new Array(n).fill(-1);
    let steps = [];

    function isSafe(v, pos) {
        if (adjMatrix[path[pos - 1]][v] === 0) {
            return false;
        }
        for (let i = 0; i < pos; i++) {
            if (path[i] === v) {
                return false;
            }
        }
        return true;
    }

    function solve(pos) {
        if (pos === n) {
            return adjMatrix[path[pos - 1]][path[0]] === 1;
        }

        for (let v = 1; v < n; v++) {
            if (isSafe(v, pos)) {
                path[pos] = v;
                steps.push(`Add vertex ${v} at position ${pos}`);
                if (solve(pos + 1)) {
                    return true;
                }
                steps.push(`Remove vertex ${v} from position ${pos}`);
                path[pos] = -1;
            }
        }
        return false;
    }

    path[0] = 0;
    const found = solve(1);
    return { path: found ? [...path, 0] : [], found, steps };
}

// Travelling Salesman Problem (Backtracking)
function tspBacktracking(graph) {
    const n = graph.length;
    const visited = new Array(n).fill(false);
    let minCost = Infinity;
    let steps = [];

    function solve(currPos, count, cost, path) {
        if (count === n && graph[currPos][0] > 0) {
            minCost = Math.min(minCost, cost + graph[currPos][0]);
            steps.push(`Path: ${path.join(' -> ')} -> 0, Cost: ${cost + graph[currPos][0]}`);
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!visited[i] && graph[currPos][i] > 0) {
                visited[i] = true;
                solve(i, count + 1, cost + graph[currPos][i], [...path, i]);
                visited[i] = false;
            }
        }
    }

    visited[0] = true;
    solve(0, 1, 0, [0]);

    steps.push(`Minimum cost: ${minCost}`);
    return { minCost, steps };
}
