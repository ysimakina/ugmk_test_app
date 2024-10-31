# ugmk_test_app

[![ru](https://img.shields.io/badge/lang-ru-blue.svg)](https://github.com/ysimakina/ugmk_test_app/blob/main/README.ru.md)

## Project description

An application for demonstrating data on manufactured products in factories. The main page displays a bar chart with information about the products produced by each factory by month. Using filters, you can see how many products were produced in total, as well as data for each product separately. When you click on a specific column, you are redirected to a page with a pie chart, where the quantity of each product produced by a specific factory for a specific month is displayed.

## Installation

### 1. Cloning a repository

```sh
git clone https://github.com/ysimakina/ugmk_test_app.git
cd ugmk_test_app
```

### 2. Installing dependencies

```sh
npm install
```

### 3. Run the project

Running the application on a local machine at [localhost:3000](http://localhost:3000/)

```sh
npm run start
```

## Docker

### 1. Сreate a docker image:

```sh
npm run dockerize
```

### 2. Run the container:

```sh
npm run start-container
```

The application is available at [localhost:3000](http://localhost:3000/)

## Author

[Simakina Yuliya](https://github.com/ysimakina)
