class TaskManager {
            constructor() {
                this.tasks = [];
                this.currentEditId = null;
                this.initializeEventListeners();
            }

            initializeEventListeners() {
                document.querySelectorAll('.tool-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        btn.classList.toggle('active');
                    });
                });
            }

            addTask() {
                const taskName = document.getElementById('taskName').value.trim();
                const description = document.getElementById('description').value.trim();

                if (!taskName) {
                    alert('Please enter a task title');
                    return;
                }

                if (this.currentEditId !== null) {
                    this.updateTask();
                    return;
                }

                const task = {
                    id: Date.now(),
                    name: taskName,
                    description: description,
                    dateCreated: new Date().toLocaleDateString(),
                    priority: document.getElementById('priorityBtn').classList.contains('active') ? 'High' : 'Normal',
                    hasReminder: document.getElementById('reminderBtn').classList.contains('active'),
                    hasDate: document.getElementById('dateBtn').classList.contains('active')
                };

                this.tasks.push(task);
                this.renderTasks();
                this.clearForm();
                this.updateTaskCount();

                // Success feedback
                const addBtn = document.querySelector('.add-btn');
                const originalText = addBtn.textContent;
                addBtn.textContent = '✅ Added!';
                setTimeout(() => {
                    addBtn.textContent = originalText;
                }, 1500);
            }

            editTask(id) {
                const task = this.tasks.find(t => t.id === id);
                if (!task) return;

                document.getElementById('taskName').value = task.name;
                document.getElementById('description').value = task.description;
                
                document.getElementById('priorityBtn').classList.toggle('active', task.priority === 'High');
                document.getElementById('reminderBtn').classList.toggle('active', task.hasReminder);
                document.getElementById('dateBtn').classList.toggle('active', task.hasDate);

                this.currentEditId = id;
                
                const addBtn = document.querySelector('.add-btn');
                addBtn.textContent = 'Update Task';
                addBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

                document.querySelector('.task-form').scrollIntoView({ behavior: 'smooth' });
            }

            updateTask() {
                const taskIndex = this.tasks.findIndex(t => t.id === this.currentEditId);
                if (taskIndex === -1) return;

                const taskName = document.getElementById('taskName').value.trim();
                const description = document.getElementById('description').value.trim();

                if (!taskName) {
                    alert('Please enter a task title');
                    return;
                }

                this.tasks[taskIndex] = {
                    ...this.tasks[taskIndex],
                    name: taskName,
                    description: description,
                    priority: document.getElementById('priorityBtn').classList.contains('active') ? 'High' : 'Normal',
                    hasReminder: document.getElementById('reminderBtn').classList.contains('active'),
                    hasDate: document.getElementById('dateBtn').classList.contains('active')
                };

                this.renderTasks();
                this.clearForm();
                this.currentEditId = null;

                const addBtn = document.querySelector('.add-btn');
                addBtn.textContent = 'Add Task';
                addBtn.style.background = 'linear-gradient(135deg, #e78c8c, #f0a0a0)';
            }

            deleteTask(id) {
                if (confirm('Are you sure you want to delete this task?')) {
                    this.tasks = this.tasks.filter(task => task.id !== id);
                    this.renderTasks();
                    this.updateTaskCount();
                    
                    if (this.currentEditId === id) {
                        this.clearForm();
                        this.currentEditId = null;
                    }
                }
            }

            // renderTasks() {
            //     const tasksDisplay = document.getElementById('tasksDisplay');
                
            //     if (this.tasks.length === 0) {
            //         tasksDisplay.innerHTML = `
            //             <div class="empty-state">
            //                 <div class="empty-state-icon">📋</div>
            //                 <p>No tasks yet. Create your first task to get started!</p>
            //             </div>
            //         `;
            //         return;
            //     }

            //     tasksDisplay.innerHTML = this.tasks.map(task => `
            //         <div class="task-item">
            //             <div class="task-header">
            //                 <div class="task-name">${task.name}</div>
            //                 <div class="task-actions">
            //                     <button class="edit-btn" onclick="taskManager.editTask(${task.id})">✏️ Edit</button>
            //                     <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})">🗑️ Delete</button>
            //                 </div>
            //             </div>
            //             ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            //             <div style="margin-top: 10px; font-size: 0.8rem; color: #999;">
            //                 Created: ${task.dateCreated} | Priority: ${task.priority}
            //                 ${task.hasReminder ? ' | 🔔 Reminder' : ''}
            //                 ${task.hasDate ? ' | 📅 Scheduled' : ''}
            //             </div>
            //         </div>
            //     `).join('');
            // }

            updateTaskCount() {
                document.getElementById('taskCount').textContent = this.tasks.length;
            }

            clearForm() {
                document.getElementById('taskName').value = '';
                document.getElementById('description').value = '';
                document.querySelectorAll('.tool-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.currentEditId = null;
                
                const addBtn = document.querySelector('.add-btn');
                addBtn.textContent = 'Add Task';
                addBtn.style.background = 'linear-gradient(135deg, #e78c8c, #f0a0a0)';
            }

            getAllTasks() {
                return [...this.tasks];
            }

            getTaskById(id) {
                return this.tasks.find(task => task.id === id);
            }

            searchTasks(query) {
                return this.tasks.filter(task => 
                    task.name.toLowerCase().includes(query.toLowerCase()) ||
                    task.description.toLowerCase().includes(query.toLowerCase())
                );
            }

            filterTasksByPriority(priority) {
                return this.tasks.filter(task => task.priority === priority);
            }
        }

        const taskManager = new TaskManager();

        function clearForm() {
            taskManager.clearForm();
        }

        setInterval(() => {
            if (taskManager.tasks.length > 0) {
                console.log('Auto-saving tasks...', taskManager.tasks.length, 'tasks');
            }
        }, 30000); 