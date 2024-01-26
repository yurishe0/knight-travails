export default class Knight {
    constructor() {
        this.adjacencyList = {};
        this.#createAdjacencyList();
    }

    #createAdjacencyList() {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let moves = this.#calculateKnightMoves([i, j]);
                this.adjacencyList[`${i}, ${j}`] = moves;
            }
        }
    }

    #calculateKnightMoves(square) {
        const x = square[0];
        const y = square[1];

        const moves = [
            [x + 1, y + 2],
            [x + 2, y + 1],
            [x + 2, y - 1],
            [x + 1, y - 2],
            [x - 1, y - 2],
            [x - 2, y - 1],
            [x - 2, y + 1],
            [x - 1, y + 2]
        ];

        // Filter out moves with indexes out of bound (0 > x < 7), (0 > y < 7)
        return moves.filter(e => e[0] >= 0 && e[0] < 8 && e[1] >= 0 && e[1] < 8);
    }

    createPath(start, end) {
        const queue = [[start]];
        const visited = new Set;

        while (queue.length > 0) {
            let currentPath = queue.shift();
            let currentSquare = currentPath[currentPath.length - 1];

            // Convert to string in order to compare
            currentSquare = `${currentSquare[0]}, ${currentSquare[1]}`;
            const endString = `${end[0]}, ${end[1]}`;

            if (currentSquare === endString) return currentPath;

            if (!visited.has(currentSquare)) {
                visited.add(currentSquare);

                const neighbors = this.adjacencyList[currentSquare];

                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push([...currentPath, neighbor]);
                    }
                }
            }
        }
    }
}
