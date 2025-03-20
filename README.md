# Pokemon App Project - Presentation

## User Story

As a Pokemon enthusiast, I want to log in to the app so that I can view a list of Pokemon and click on any Pokemon to see its detailed information.

### Acceptance Criteria

- Login Screen:
  - A simple login form with validation.
  - Display error messages for invalid credentials.
- Main Page (Pokemon List):
  - Show a paginated list of Pokemon Cards.
  - Each Card shows the pokemon name, and photo.
- Detail View (Pokemon Modal):
  - When a Pokemon is selected/clicked, open a Modal.
  - The modal shows the pokemon with its stats, abilities, and moves.

## Architecture

The Clean Architecture I decided to apply to my project is inspired on the Hexagonal Architecture where it defines 3 layers, Domain, Application, and Infrastructure, promoting a separation of concerns. Hexagonal Architecture usually works great on a Backend environment, so for my Frontend Architecture I have defined 4 main layers described below:

### Domain

- Contains Core Business models (e.g., `Pokemon`, `User`) and interfaces like `Repositories` that define the **Application** rules.
- Does not have any dependency from external resources or layers.

### Application

- Implements business rules using `Use Cases` that orchestrate **Domain** logic (e.g., login flow, fetching Pokémon list, retrieving details).
- Does not have access to the **Infrastructure** layer, it focuses only on the business rules and depends on the Core Business defined in the **Domain** layer.

### Infraestructure

- Deals with external dependencies such as API calls, like the requested Pokemon API or the Mocked Authentication API, and store/persistence layers.
- Implements the interfaces defined in the **Domain**.
- **Redux store** is part of the Infrastructure layer, but it is recommended to always place it at the top-level making clear it is the global state management.

### Presentation

- Contains the Components, and UI logic.
- Interacts only via the Application classes, requires the instantiation of theses Classes (Services) along with the Infrastructure implementations.
- Domain can be helpful to type the component states, but can create its own interfaces as needed.
- The `app` folder created by **Next.js** for App Routing is also part of the Presentation layer, but we cannot change its structure so it is implicitly understood. There's a `pages` folder inside of the Presentation layer that's directly coupled to the `app` folder making it clear they belong to the same layer.

## Design

Key Design decisions made for this project:

- Component-based Architecture leveraging React's component modularity and reusability
- Global state management with Redux for the User
- Next.js for server-side rendering and static site generation for optimal routing, SEO, and performance.​
- TypeScript integration to not only reduce runtime errors and enhance development productivity, but also important to orchestrate the different layers of the Clean Architecture.
- Jest integration for a Test-Driven Development

## Test-Driven Development (TDD)

- Unit Tests:
  - Focused on the core logic within the **Domain** and **Application** layers (e.g., test the `UserService`, and `PokemonService` before the Infrastructure implementation). Ensures that the core logic remains stable regardless of external changes (**Infrastructure**).
  - For the Component-based architecture create tests for common components with a **Single Responsibility**.

## Technology Stack

- **Next.js**: 15.2.2v
- **Redux**: ^2.6.1v
- **Redux-persist**: ^6.0.0v
- **TypeScript**: ^5v
- **TailwindCSS**: ^4v
- **Jest**: ^29.7.0v

## How to Run the Application

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app up and running.

Login credentials:

- Username: **admin**
- Password: **admin**

## How to Run Tests

Open a separate terminal and run:

```bash
npm run test
```

## Expected UI

- Desktop

<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-desktop1.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-desktop2.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-desktop3.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-desktop4.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-desktop5.png"/>

- Mobile

<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-mobile1.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-mobile2.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-mobile3.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-mobile4.png"/>
<img src="https://github.com/mesparza942/pokemon-app/blob/main/public/pokemon-app-mobile5.png"/>
