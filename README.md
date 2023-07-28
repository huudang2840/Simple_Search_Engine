# SEARCH ENGINE

- FrontEnd: ReactJS + Typescript
- Backend: NodeJS (ExpressJS) + Typescript
- API Document: Swagger

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

1. Clone the repository
2. Move to backend folder and install node modules: cd backend -> npm install
3. Move to frontend folder and install node modules: cd.. -> cd frontend -> npm install
4. Move to root folder and run: yarn dev

## Usage

Once the application is up and running
Open your web browser and visit `http://localhost:3000` to access Search Engine
Visit `http://localhost:3001/docs/` to access Swagger view API document

### Features

- Search word and show top 3 word similar using levenshtein Distance to calculate the similarity of words and only take the similarity from 0 to 2
- Add word
- Delete word
