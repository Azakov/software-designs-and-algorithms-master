class QueueElement {
    priority: number;

    constructor() {
        this.priority = this.generatePriorityValue();
    }

    private generatePriorityValue() {
        return Math.floor(Math.random() * 10000);
    }
}

class Queue {
    heap: QueueElement[];

    constructor() {
        this.heap = [];
    }

    getLeftIndex = (index) => index * 2;
    getRightIndex = (index) => index * 2 + 1;
    getParentIndex = (index) => Math.floor((index - 1) / 2);

    swap(firstIndex, secondIndex) {
        const temp = this.heap[firstIndex];
        this.heap[firstIndex] = this.heap[secondIndex];
        this.heap[secondIndex] = temp;
    }

    insert(element: QueueElement) {
        this.heap.push(element);

        let index = this.heap.length - 1;

        while (index !== 0 && this.heap[index].priority > this.heap[this.getParentIndex(index)].priority) {
            this.swap(index, this.getParentIndex(index));
            index = this.getParentIndex(index);
        }
    }

    maxHeapify(index = 0) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        let smallestIndex = index;

        if (leftIndex < this.heap.length && this.heap[smallestIndex].priority < this.heap[leftIndex].priority) {
            smallestIndex = leftIndex;
        }

        if (rightIndex < this.heap.length && this.heap[smallestIndex].priority < this.heap[rightIndex].priority) {
            smallestIndex = rightIndex;
        }

        if (smallestIndex !== index) {
            this.swap(smallestIndex, index);
            this.maxHeapify(smallestIndex);
        }
    }

    getMaxPriorityElement() {
        const root = this.heap.shift();

        this.heap.unshift(this.heap[this.heap.length - 1]);
        this.heap.pop();

        this.maxHeapify(0);

        return root;
    }
}


const queue = new Queue();

for (let i = 0; i< 10000; i++) {
    queue.insert(new QueueElement());
}


console.log(queue.heap);
console.log(queue.getMaxPriorityElement());
console.log(queue.getMaxPriorityElement());
console.log(queue.getMaxPriorityElement());
console.log(queue.heap);
