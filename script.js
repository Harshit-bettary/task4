let entries = JSON.parse(localStorage.getItem('entries')) || [];

        function addEntry() {
            const description = document.getElementById("description").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const type = document.getElementById("type").value;
            
            if (!description || isNaN(amount)) {
                alert("Please enter valid details.");
                return;
            }

            entries.push({ description, amount, type });
            localStorage.setItem('entries', JSON.stringify(entries));
            renderEntries();
            resetFields();
        }

        function resetFields() {
            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
        }

        function updateSummary() {
            let totalIncome = 0, totalExpense = 0;
            entries.forEach(entry => {
                if (entry.type === "income") totalIncome += entry.amount;
                else totalExpense += entry.amount;
            });
            document.getElementById("total-income").textContent = `₹${totalIncome}`;
            document.getElementById("total-expense").textContent = `₹${totalExpense}`;
            document.getElementById("net-balance").textContent = `₹${totalIncome - totalExpense}`;
        }

        function renderEntries() {
            const filter = document.querySelector('input[name="filter"]:checked').value;
            const list = document.getElementById("entries-list");
            list.innerHTML = "";
            entries.filter(entry => filter === "all" || entry.type === filter).forEach((entry, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${entry.description} - ₹${entry.amount} 
                    <button class="edit-btn" onclick="editEntry(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>`;
                list.appendChild(li);
            });
            updateSummary();
        }

        function deleteEntry(index) {
            entries.splice(index, 1);
            localStorage.setItem('entries', JSON.stringify(entries));
            renderEntries();
        }

        function editEntry(index) {
            const entry = entries[index];
            document.getElementById("description").value = entry.description;
            document.getElementById("amount").value = entry.amount;
            deleteEntry(index);
        }

        function filterEntries() {
            renderEntries();
        }

        renderEntries();