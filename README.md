# E-Commerce API

Build an API set to support e-commerce operations, such as product and category listing, product details, cart management, and order processing. Used  postgreSQL database to manage product/category data, user cart information, and order details.Used JWT for Token-Authentication. 
## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#endpoints)


## Features
- **User Authentication:** Secure sign-up and login system for both hosts and guests.
- **Accommodation Listings:** Hosts can create listings for their properties, including details like location, amenities, and pricing.
- **Search nearBy houses:** Guests can search for available accommodations, book stays, and manage their reservations.
- **Reviews and Ratings:** Guests can leave reviews and ratings for accommodations, helping future guests make informed decisions.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker installed
- npm or yarn installed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sachinSingh53/E-Commerce.git
   
   
2. Build the Image and run the container:

   ```bash
   docker-compose -f docker.compose.yml -f docker.compose.dev.yml up -d --build

## Usage

1. The server will be running at http://localhost:3000

2. Use API endpoints to interact with the application.


## Architecture

![diagram-export-25-2-2024-10_07_12-PM](https://github.com/sachinSingh53/triveous-task/assets/96944676/bc2ecfeb-23b0-478b-a4d3-b1dff8189925)

![diagram-export-25-2-2024-10_56_00-PM](https://github.com/sachinSingh53/triveous-task/assets/96944676/e6436c73-629d-4c30-8471-0c3e5c596725)




