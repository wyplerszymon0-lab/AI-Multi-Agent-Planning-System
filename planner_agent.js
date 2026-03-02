const EventEmitter = require('events');
const plannerBus = new EventEmitter();

class PlannerAgent {
    constructor() {
        this.todoList = [];
    }

    addTask(title) {
        let priority = "Low";
        const lowerTitle = title.toLowerCase();
        
        if (lowerTitle.includes("urgent") || lowerTitle.includes("asap")) {
            priority = "High";
        } else if (lowerTitle.includes("fix") || lowerTitle.includes("error")) {
            priority = "Medium";
        }

        const task = {
            title,
            priority,
            id: Math.random().toString(36).substr(2, 5)
        };

        this.todoList.push(task);
        this.sortTasks();
        console.log(`[Planner] Task Ingested: "${title}" assigned to ${priority} priority.`);
        plannerBus.emit('queue_updated');
    }

    sortTasks() {
        const weights = { "High": 3, "Medium": 2, "Low": 1 };
        this.todoList.sort((a, b) => weights[b.priority] - weights[a.priority]);
    }

    getNextTask() {
        return this.todoList.shift();
    }
}

class ExecutiveAgent {
    constructor(planner) {
        this.planner = planner;
        this.isWorking = false;
    }

    init() {
        plannerBus.on('queue_updated', () => {
            if (!this.isWorking) this.processNext();
        });
    }

    async processNext() {
        const task = this.planner.getNextTask();
        
        if (!task) {
            this.isWorking = false;
            plannerBus.emit('all_tasks_completed');
            return;
        }

        this.isWorking = true;
        console.log(`[Executive] Executing: "${task.title}" [Priority: ${task.priority}]`);
        
        // Simulating processing time
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        
        console.log(`[Executive] Completed: "${task.title}"`);
        plannerBus.emit('task_finished', task);
        
        this.processNext();
    }
}

class ReportAgent {
    constructor() {
        this.completedTasks = [];
    }

    init() {
        plannerBus.on('task_finished', (task) => {
            this.completedTasks.push(task);
        });

        plannerBus.on('all_tasks_completed', () => {
            this.generateFinalReport();
        });
    }

    generateFinalReport() {
        console.log("\n" + "=".repeat(30));
        console.log("      FINAL AI REPORT");
        console.log("=".repeat(30));
        console.log(`Total tasks handled: ${this.completedTasks.length}`);
        
        const stats = this.completedTasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});

        console.log("Priority Breakdown:", stats);
        console.log("System Status: Operational / Idle");
        console.log("=".repeat(30) + "\n");
    }
}

// --- SYSTEM INITIALIZATION ---

const planner = new PlannerAgent();
const executive = new ExecutiveAgent(planner);
const reporter = new ReportAgent();

executive.init();
reporter.init();

// Simulated Task Stream
async function startSimulation() {
    console.log("[System] Initializing Multi-Agent Environment...\n");
    
    planner.addTask("General documentation update");
    
    // Simulating tasks arriving with slight delays to allow re-prioritization
    setTimeout(() => planner.addTask("URGENT: Database connection error"), 500);
    setTimeout(() => planner.addTask("Fix minor CSS alignment"), 1000);
    setTimeout(() => planner.addTask("ASAP: Security patch deployment"), 1500);
}

startSimulation();
