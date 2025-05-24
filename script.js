 function createTimedPromise(index) {
      const delay = Math.random() * 2 + 1; // Between 1 and 3 seconds
      const startTime = performance.now();
      return new Promise((resolve) => {
        setTimeout(() => {
          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000;
          resolve({ index, duration });
        }, delay * 1000);
      });
    }

    const promise1 = createTimedPromise(1);
    const promise2 = createTimedPromise(2);
    const promise3 = createTimedPromise(3);

    const startAll = performance.now();

    Promise.all([promise1, promise2, promise3]).then((results) => {
      const endAll = performance.now();
      const totalDuration = (endAll - startAll) / 1000;

      const output = document.getElementById("output");
      const loadingRow = document.getElementById("loading-row");
      output.removeChild(loadingRow);

      results.forEach((result) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const timeCell = document.createElement("td");

        nameCell.textContent = `Promise ${result.index}`;
        timeCell.textContent = result.duration.toFixed(3);

        row.appendChild(nameCell);
        row.appendChild(timeCell);
        output.appendChild(row);
      });

      // Add total row
      const totalRow = document.createElement("tr");
      const totalLabelCell = document.createElement("td");
      const totalTimeCell = document.createElement("td");

      totalLabelCell.textContent = "Total";
      totalTimeCell.textContent = totalDuration.toFixed(3);

      totalRow.appendChild(totalLabelCell);
      totalRow.appendChild(totalTimeCell);
      output.appendChild(totalRow);
    });