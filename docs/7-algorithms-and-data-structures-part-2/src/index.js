const INF = Number.MAX_SAFE_INTEGER;
const vertexArray = {};

const fromInput = document.getElementById('input-from');
const toInput = document.getElementById('input-to');
const distanceInput = document.getElementById('input-distance');
const sourceSelectControl = document.getElementById('input-source');
const adjacencyMatrixList = document.getElementById('adjacencyMatrix-list');
const shortestRouteList = document.getElementById('shortestRoute-list');


document.getElementById('add-vertex').onclick = function() {
    resetContainers([adjacencyMatrixList, shortestRouteList, sourceSelectControl])

    if (!fromInput.value || !toInput.value || !+distanceInput.value) {
        alert('Please, enter something in From, To and Distance ^-^')

        return;
    }

    addToVertexArray(fromInput.value, toInput.value, +distanceInput.value);

    resetControlsValue([fromInput, toInput, distanceInput]);

    const adjacencyMatrix = createMatrix();

    drawAdjacencyMatrixTable(adjacencyMatrix);

    drawShortestRouteSelectControl();

    drawShortestRouteTable(adjacencyMatrix, 0)

}

document.getElementById('input-source').onclick = function() {
    const matrixLine = Object.keys(vertexArray);
    const adjacencyMatrix = createMatrix();

    resetContainers([shortestRouteList])

    drawShortestRouteTable(adjacencyMatrix, matrixLine.indexOf(sourceSelectControl.value))
}

// dijkstra alg
function getShortestRouteArray(graphMatrix, source) {
    const distanceArray = [];
    const visited = [];
    const graphLength = graphMatrix.length;
    for (let i = 0; i < graphLength; i++) {
        distanceArray[i] = INF;
        visited[i] = false;
    }
    distanceArray[source] = 0;
    for (let i = 0; i < graphLength - 1; i++) {
        const minIndex = getMinDistance(distanceArray, visited);
        visited[minIndex] = true;
        for (let v = 0; v < graphLength; v++) {
            if (!visited[v] &&
                graphMatrix[minIndex][v] !== 0 &&
                distanceArray[minIndex] !== INF &&
                distanceArray[minIndex] + graphMatrix[minIndex][v] < distanceArray[v]
            ) {
                distanceArray[v] = distanceArray[minIndex] + graphMatrix[minIndex][v];
            }
        }
    }
    return distanceArray;
};

function getMinDistance(dist, visited) {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
};

function resetContainers(containers) {
    containers.forEach(container => container.innerHTML = null)
}

function resetControlsValue(controls) {
    controls.forEach(control => control.value = '')
}

function drawAdjacencyMatrixTable(adjacencyMatrix) {
    const matrixLine = Object.keys(vertexArray);

    let span = document.createElement('span');
    span.innerText = matrixLine.join(' ');
    adjacencyMatrixList.appendChild(span);

    adjacencyMatrix.forEach((el) => {
        let li = document.createElement('li');
        li.innerText = el.join(' ');
        adjacencyMatrixList.appendChild(li);
    })

    let verticalHeaderList = document.getElementById('vertical-header-list');
    verticalHeaderList.innerHTML = null;
    matrixLine.forEach((el) => {
        let span2 = document.createElement('span');
        span2.innerText = el;
        verticalHeaderList.appendChild(span2);
    })
}

function drawShortestRouteSelectControl() {
    const matrixLine = Object.keys(vertexArray);

    matrixLine.forEach((el) => {
        let option = document.createElement('option');
        option.innerText = el;
        option.value = el;
        sourceSelectControl.appendChild(option);
    })
}

function drawShortestRouteTable(adjacencyMatrix, sourceIndex) {
    const matrixLine = Object.keys(vertexArray);
    const dijkstraResult = getShortestRouteArray(adjacencyMatrix, sourceIndex);
    const shortestRoute = [];
    for (i = 0; i < dijkstraResult.length; i++) {
        if (dijkstraResult[i] === INF) {
            dijkstraResult[i] = 'no path';
        }
        shortestRoute.push('To ' + matrixLine[i] + '\t\t' + '→' + '\t\t' + dijkstraResult[i]);
    }

    shortestRoute.forEach((el) => {
        let li = document.createElement('li');
        li.innerText = el;
        shortestRouteList.appendChild(li);
    })
}

function addToVertexArray(from, to, distance) {
    if (!vertexArray[from]) {
        vertexArray[from] = {
            [to]: distance
        }
    } else {
        vertexArray[from][to] = distance;
    }

    if (!vertexArray[to]) {
        vertexArray[to] = {}
    }
}

function createMatrix() {
    const matrixLine = Object.keys(vertexArray);
    const matrixLength = matrixLine.length;
    const resultArray = Object.entries(vertexArray).map(([_, neighbors], vertexIndex) => {
        const result = []

        if (!Object.keys(neighbors).length) {
            return new Array(matrixLength).fill(0, 0, matrixLength);
        }

        for (let i = 0; i < matrixLength; i++) {
            if (vertexIndex === i) {
                result.push(0);
                continue;
            };

            if (neighbors[matrixLine[i]]) {
                result.push(neighbors[matrixLine[i]]);
            } else {
                result.push(0);
            }
        }

        return result;
    })

    return resultArray;
}