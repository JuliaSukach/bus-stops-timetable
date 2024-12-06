# **Bus Stops Timetable**

This project is a Vue.js application designed to display bus lines, stops, and their respective schedules. It provides a user-friendly interface for navigating bus lines, viewing stops, and checking timetable details with built-in search and sorting functionality.

## Preview 
![demo](https://github.com/user-attachments/assets/402f36e3-893b-4ae8-a740-0387e9cba994)


## **Features**
- View a list of bus lines and their stops.
- Search for bus stops by name.
- Sort stops and schedules in ascending or descending order.
- Handle loading and error states gracefully.
- Mobile-friendly and accessible design.
- Built using Vue.js, TypeScript, and Bootstrap.

---

## **Getting Started**

### **System Requirements**
- **Node.js**: `16.15`
- **npm**: `8.11`

### **Technologies and Tools**
- **Frameworks**: Vue.js 3, Vue Router, Vuex
- **Utilities**: Axios, Bootstrap, JSON Server
- **Testing**: Vitest

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/JuliaSukach/bus-stops-timetable.git
   cd bus-stops-timetable

2. Install dependencies:
    ```bash
    npm install

### **Run the Application**
1. Start the mock API server:
   ```bash
    npm run api

2. Start the development server:
    ```bash
    npm run serve

## Environment Ports
`8080` - for the Vue application <br/>
`3000` - for the API server

## **Application Overview**

### **Home Page (Bus Lines)**
- Displays a list of bus lines, sorted in ascending order.
- Select a bus line to view its stops and timetable.

### **Stops Page**
- Displays all bus stops with a search bar for filtering.
- Sort stops by clicking the sort icon.

## **How It Works**
### **Data**
The application fetches data from a mock API powered by JSON Server. The API serves data for:
- Bus Lines
- Bus Stops
- Timetables
### **Routing**
- /: Displays the list of bus lines.
- /stops: Displays all bus stops with search and sort functionality.
### **Error Handling**
- Displays error messages when data fetching fails.
- Includes a retry button for reloading data.

## **Testing**
The project includes unit tests for key components, ensuring robust functionality and a seamless user experience.

### **Run Tests**
To run the test suite:

    npm run test

Tests are written using Vitest and cover:

- Data fetching and rendering.
- Sorting and filtering logic.
- Error handling and edge cases.
