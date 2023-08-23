
The project is undergoing an important re-factor (mostly how files and logic is structured and also one server instead of two for backend+frontend). Because of this, the `main` branch might or might not work properly. Please check branch [`v-0.1.0`](https://github.com/ShardulNalegave/gofer/tree/v-0.1.0) for the last working version of the project.

----------------------------

# Gofer
Gofer is a project/task management solution for organisations. Users can be assigned to projects which have tasks under them. Authorization is handled through a Roles based system, the organisation admin can create roles and assign various rights to them, these rights govern what actions users with certain roles can perform.

**Note:** This project is currently under development.

## Highlights
- Built using the `MERN` stack (MongoDB + Express + React + Node)
- GraphQL API ([Schema](https://github.com/ShardulNalegave/gofer/blob/main/schema.gql))
- Token-based auth using JSON Web Tokens (JWT)

![Dashboard](https://github.com/ShardulNalegave/gofer/blob/main/imgs/dashboard.png?raw=true)
![Login Screen](https://github.com/ShardulNalegave/gofer/blob/main/imgs/loginScreen.png?raw=true)
![Dashboard](https://github.com/ShardulNalegave/gofer/blob/main/imgs/apolloServer.png?raw=true)