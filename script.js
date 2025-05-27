class TaskManager {
    constructor() { // method used within a class to initialize objects
        this.tasks = [];  // i am going to a store the word "I" refers to whoever is speaking. Similarly, when your code says this.tasks, it means "the tasks array belonging to whichever TaskManager instance is currently running this code
        this.completedTasks = [];
    }

    addTask() {
        const taskName = document.getElementById('taskName').value.trim();  //used to select an HTML element by its id attribute can also be selected by class 
        const description = document.getElementById('description').value.trim();
        
        if (!taskName) {
            alert('Please enter a task name'); //  sends a prompts a pop-up alerting the user of any major changes 
            return;
        }

        const task = {
            id: Date.now(),
            name: taskName,
            description: description,
            dateCreated: new Date().toLocaleDateString(), // this is an object has a key value pair
            completed: false
        };

        this.tasks.push(task);
        this.showTasks();
        this.clearForm(); 
        this.updateTaskCount();
        this.showSuccessMessage();
    }

    completeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const task = this.tasks[taskIndex];
            task.completed = true;
            task.completedDate = new Date().toLocaleDateString();//date is in milliseconds and the next buitin function converts it to a normal readable date 
            
            this.completedTasks.push(task);
            this.tasks.splice(taskIndex, 1);
            this.showTasks();
            this.updateTaskCount();
        }
    }
    

    deleteTask(id) {
        if (confirm('Delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.showTasks();
            this.updateTaskCount();
        }
    }

    showTasks() {
        const tasksDisplay = document.getElementById('tasksDisplay');
        
        if (this.tasks.length === 0) {
            tasksDisplay.innerHTML = `
                <div class="empty-state">
                    <p>📋 No tasks yet! Add one to get started.</p>
                </div>
            `;
            return;
        }

        let html = '<h3>Active Tasks</h3>';
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i]; // backticks(button below your escape key on a laptops) are used as literals used to include variables in between JS strings used when u have to include some ones name or detaiils in between a standard string 
            html += `
                <div class="task-item">
                    <div class="task-content">
                        <div class="task-name">${task.name}</div>
                        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                        <div class="task-date">Created: ${task.dateCreated}</div>
                    </div>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="taskManager.completeTask(${task.id})">✓ Complete</button>
                        <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">✗ Delete</button>
                    </div>
                </div>
            `;
        }
        
        if (this.completedTasks.length > 0) {// same as above used to create html tags to be added into the task list 
            html += '<h3 style="margin-top: 20px;">Completed Tasks</h3>';
            for (let i = 0; i < this.completedTasks.length; i++) {
                const task = this.completedTasks[i];
                html += `
                    <div class="task-item completed">
                        <div class="task-content">
                            <div class="task-name">${task.name}</div>
                            <div class="task-date">Completed: ${task.completedDate}</div>
                        </div>
                        <button class="delete-btn" onclick="taskManager.deleteCompletedTask(${task.id})">Remove</button>
                    </div>
                `;
            }
        }
        
        tasksDisplay.innerHTML = html;
    }

    clearForm() {
        document.getElementById('taskName').value = ''; // set the value to null or zero (both have different meaning in JS but in this case for understanding purpose you can se it that way)
        if (document.getElementById('description')) {
            document.getElementById('description').value = '';
        }
    }

    updateTaskCount() {
        const countElement = document.getElementById('taskCount');//for the total number of elements in task list 
        if (countElement) {
            countElement.textContent = this.tasks.length;
        }
    }

    showSuccessMessage() {
        const addBtn = document.querySelector('.add-btn'); // for the add button 
        if (addBtn) {
            const originalText = addBtn.textContent;
            addBtn.textContent = '✓ Added!';
            setTimeout(() => { // stops execution of JS main thread for sometime and 5000 here is a arg to be passed and changed as u wish it is in ms also lookup event loop in js is u are curious 
                addBtn.textContent = originalText;
            }, 5000);
        }
    }

    deleteCompletedTask(id) {
        this.completedTasks = this.completedTasks.filter(task => task.id !== id);// filters elements based on task id to check if the are complete dor not 
        this.showTasks();
    }


    getTotalTasks() {
        return this.tasks.length + this.completedTasks.length;// pretty much clear what this does 
    }
}


const taskManager = new TaskManager(); // calls the constructor and every function inside it 

// there is a simpler but slightly complicated  (with event listners )way to do this without using classes and constructers i chose this way because you all would feel familiar with classes and objects since you guys jus studied tha stuff 