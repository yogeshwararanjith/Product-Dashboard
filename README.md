# Product Dashboard (Angular)

## Overview

Product Dashboard is a simple Angular application that displays products fetched from an API and provides features like search, filtering, and pagination. The project was built as a practice project to strengthen concepts like Angular Reactive Forms, RxJS, API integration, and component architecture.

## Features

* Product listing dashboard
* Search functionality with debounce
* Category filtering
* Client-side pagination
* API integration using Angular HttpClient
* Reactive Forms for search and filtering
* Optimized API caching using RxJS

## Tech Stack

* Angular
* TypeScript
* RxJS
* Bootstrap
* REST API (dummyjson)

## Project Structure

* `product-dashboard` – main container component
* `product-list` – displays paginated product list
* `filter-list` – handles filtering and categories
* `product.service` – handles API calls and caching

## Installation

Clone the repository:

```
git clone https://github.com/yourusername/product-dashboard.git
```

Install dependencies:

```
npm install
```

Run the application:

```
ng serve
```

Open in browser:

```
http://localhost:4200
```

## Build for Production

```
ng build --configuration production
```

Production files will be generated in:

```
dist/product-dashboard
```

## Deployment

The application can be deployed to static hosting platforms like:

* Vercel
* Netlify
* GitHub Pages
* Firebase Hosting

Upload the contents of the `dist/product-dashboard` folder to your hosting provider.

## Learning Objectives

This project helped practice:

* Angular component architecture
* Reactive Forms and `valueChanges`
* RxJS operators
* API data handling
* Frontend performance concepts like caching
