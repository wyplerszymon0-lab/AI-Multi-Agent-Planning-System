# AI Multi-Agent Planning System 

A modular Node.js application demonstrating autonomous agent cooperation through an asynchronous event-driven architecture. This project simulates a real-world task management environment where different AI agents handle planning, execution, and reporting.

##  Architecture

The system is built using three specialized agents that communicate via a central **Event Bus** (`EventEmitter`):

1.  **Planner Agent**: 
    * Ingests raw tasks and performs string analysis.
    * Dynamically assigns priorities (**High**, **Medium**, **Low**) based on keywords like "URGENT", "ASAP", or "Fix".
    * Maintains and re-sorts the execution queue in real-time.

2.  **Executive Agent**:
    * Processes the queue asynchronously using `async/await`.
    * Simulates real-world processing latency.
    * Ensures tasks are executed in the correct order of priority.

3.  **Report Agent**:
    * Monitors the lifecycle of every task.
    * Collects metadata and execution history.
    * Generates a final statistical summary once all tasks are completed.

##  Features

- **Asynchronous Workflow**: Handles non-blocking task processing.
- **Dynamic Prioritization**: New high-priority tasks automatically jump to the front of the queue.
- **Event-Driven Communication**: Decoupled logic ensuring high scalability.
- **Performance Reporting**: Automated data aggregation and final system status reports.

##  Technology Stack

- **Runtime**: Node.js
- **Language**: JavaScript (ES6+)
- **Core Module**: `events` (EventEmitter)

##  Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
