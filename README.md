# Pokémon Stats Web Application

## Project Overview
This web application lists Pokémon along with their key stats, allowing users to search, filter, and sort Pokémon data fetched from the PokeAPI using GraphQL. The application is built with React, TypeScript, and TailwindCSS.

## Table of Contents
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [UI/UX Design](#uiux-design)
- [Live Demo](#live-demo)
- [Author](#author)

## Features
- **Pokémon Listing:** Displays a comprehensive list of Pokémon with stats including HP, Attack, Defense, Speed, etc.
- **Search Functionality:**
  - Search by Pokémon name.
  - Search by Pokémon stats (e.g., Attack greater than a specified number).
- **Filter by Type:** Filter Pokémon by type (Fire, Water, Grass, etc.).
- **Sorting:** Sort the Pokémon list by name or various stats.
- **Infinite Scroll Pagination:** Implements infinite scroll for seamless navigation through the Pokémon list.
- **Dark and Light Mode:** Users can switch between dark and light themes for a customizable viewing experience.
- **State Management with Redux:** Utilizes Redux for efficient state management across the application.
- **Responsive UI:** Clean, functional, and user-friendly design using TailwindCSS.

## Technical Stack
- **Frontend:** React, Redux, TypeScript, TailwindCSS
- **Data Fetching:** GraphQL
- **API:** PokeAPI

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/azizjarrar/pokemons-project
2. Install dependencies:
    ```bash
    npm install

3. Start the application:
   ```bash
    npm start
Open your browser and navigate to http://localhost:3000.
## Usage
Once the application is running, you can:

View the list of Pokémon with their stats.
Use the search bar to find a specific Pokémon by name or filter by stats.
Use the type filter to narrow down the list based on Pokémon types.
Sort the list by name.
Scroll down to load more Pokémon results dynamically.
## API Integration
The application utilizes the PokeAPI with GraphQL to fetch Pokémon data. The main query used is:

Get Pokémon List: This query retrieves the list of Pokémon along with their stats.
## UI/UX Design
The design of the application is based on modern UI principles, ensuring a responsive and intuitive user experience. TailwindCSS is used for styling, allowing for a clean layout and efficient customization.

## Live Demo
You can view the live demo of the application [here](https://pokemons-project-three.vercel.app/).

## Author
**Aziz Jarrar**  
[GitHub Profile](https://github.com/azizjarrar/)
