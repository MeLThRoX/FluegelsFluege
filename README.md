# FluegelsFluege

## Dependencies

 - [Docker](https://www.docker.com), [Docker Compose](https://docs.docker.com/compose/)

## Installation

After Docker is installed, go to the Project-Directory and run following commands.

```bash
docker-compose up -d
```

## Build Files

The build process of the project is entirely realized by Docker.
All related build files are located in the following files:

 - [/Proxy/Dockerfile](./Proxy/Dockerfile)
 - [/BackEnd/Dockerfile](./BackEnd/Dockerfile)
 - [/FrontEnd/Dockerfile](./FrontEnd/Dockerfile)
 
## Package Dependencies

The project is implemented using [Node.js](https://nodejs.dev).
All corosponding dependencies are [Node Packages](https://www.npmjs.com) and are listed in following files:

 - [/BackEnd/package.json](./BackEnd/package.json)
 - [/FrontEnd/package.json](./FrontEnd/package.json)
