function generateStores(size) {
    const stores = [];
    for (let i = 0; i < size; i++) {
        const name = 'Store_' + Math.random().toString(36).substring(2, 8);
        const rating = parseFloat((Math.random() * 4 + 1).toFixed(1));
        stores.push({ name, rating });
    }
    return stores;
}

function measurePerformance() {
    const sizes = [10,50,100,300, 500, 1000,3000, 5000,7000, 10000, 15000];
    const quickTimes = [];
    const selectionTimes = [];

    sizes.forEach(size => {
        const stores = generateStores(size);

        // Measure Quick Sort
        const quickStart = performance.now();
        quickSort([...stores]);
        const quickTime = performance.now() - quickStart;
        quickTimes.push(quickTime);

        // Measure Selection Sort
        const selectionStart = performance.now();
        selectionSort([...stores]);
        const selectionTime = performance.now() - selectionStart;
        selectionTimes.push(selectionTime);
    });

    return { sizes, quickTimes, selectionTimes };
}

function plotPerformanceChart(data) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.sizes,
            datasets: [
                {
                    label: 'Quick Sort Time (ms)',
                    data: data.quickTimes,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Selection Sort Time (ms)',
                    data: data.selectionTimes,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Sorting Performance Comparison'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Input Size'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                }
            }
        }
    });
}

function generateAndSort() {
    const stores = generateStores(1000);
    displayData(stores, 'original-data', 25);

    // Quick Sort
    const quickSorted = quickSort([...stores]);
    const quickStart = performance.now();
    quickSort(quickSorted); // Re-run to measure performance
    const quickTime = (performance.now() - quickStart).toFixed(2);
    displayData(quickSorted, 'quick-sort-data');
    document.getElementById('quick-sort-time').innerText = quickTime;

    // Selection Sort
    const selectionSorted = [...stores];
    const selectionStart = performance.now();
    selectionSort(selectionSorted);
    const selectionTime = (performance.now() - selectionStart).toFixed(2);
    document.getElementById('selection-sort-time').innerText = selectionTime;

    // Performance Comparison
    const performanceData = measurePerformance();
    plotPerformanceChart(performanceData);
}

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let maxIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j].rating > arr[maxIdx].rating) {
                maxIdx = j;
            }
        }
        [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]];
    }
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(item => item.rating > pivot.rating);
    const middle = arr.filter(item => item.rating === pivot.rating);
    const right = arr.filter(item => item.rating < pivot.rating);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function displayData(stores, elementId, count = 25) {
    const tableBody = document.getElementById(elementId);
    tableBody.innerHTML = '';
    stores.slice(0, count).forEach((store, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${store.name}</td>
            <td>${store.rating}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
