# Star Wars Character App

## Overview

The **Star Wars Character App** is a React-based application that allows users to browse and filter characters from the Star Wars universe. Users can filter characters by movie, species, and birth year range, and view detailed information about each character.

## Features

- **Character Listing**: Displays a list of characters from the Star Wars universe.
- **Filtering**: Allows users to filter characters by movie, species, and birth year range.
- **Character Details**: Clicking on a character's name in the list navigates to a detailed view of the character.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Ant Design (antd)**: A React UI framework that provides a set of high-quality components.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router**: A collection of navigational components that compose declaratively with your application.
- **Moment.js**: A library for parsing, validating, manipulating, and formatting dates.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/star-wars-character-app.git
   cd star-wars-character-app

2. Install the dependencies:
        cd star-wars-character-app
        
        npm install

2. Running the App
    To start the development server:
        
        npm start

3. Folder Structure

        src/
        ├── components/
        │   ├── CharacterList.js
        │   ├── CharacterDetails.js
        │   └── Filter.js
        ├── services/
        │   ├── fetchMovies.js
        │   ├── fetchSpecies.js
        │   ├── fetchWithFiltering.js
        │   ├── fetchSpeciesType.js
        │   ├── fetchDetails.js
        │   └── swapiService.js
        ├── App.js
        ├── App.css
        ├── index.css
        └── index.js