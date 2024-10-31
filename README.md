# 🚀 Moving Robot Simulation using Express TypeScript Boilerplate 2024

## 🌟 Introduction

Moving Robot simulation using Express TypeScript Boilerplate 2024 – which is implemented with modern tools and practices using Express.js and TypeScript.

## 💡 Motivation

This solution aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡ Facilitate rapid development/changes
- 🛡️ Encourage best practices in security, testing, and performance

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/faisalsiddiq87/robot`
- Navigate: `cd robot`
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- CommandLine Mode: `npm run move:robot validCommands.txt`
- CommandLine Mode multiple other available test data files: 
   - `npm run move:robot cmds.txt`
   - `npm run move:robot noReport.txt`
   - `npm run move:robot ignorePrePlace.txt`
   - `npm run move:robot junkCommands.txt`
   - `npm run move:robot junkAndCorrectCmd.txt`
- Linting: `npm run lint`
- Linting Fix: `npm run lint:fix`
- Testing: `npm run test`

## 🤝 About Solution

- The solution aims to provide a solution for a moving toy robot simulation on a square table
- The table dimensions are configured via env variables `MAX_X_AXIS`, `MAX_Y_AXIS`
- The valid commands to move a robot i.e: `PLACE 0,4,NORTH`, `MOVE`, `LEFT`, `RIGHT`, `REPORT` are injected via cmd files hosted in the `commandFiles` directory
- The application gets command file Name from CLI command `npm run move:robot validCommands.txt` i.e: `validCommands.txt`  and starts evaluation of moves for robot on square table; provided if a valid square table is available, valid place and move etc commands exist in file and robot can move around.

🎉 Happy evaluation!