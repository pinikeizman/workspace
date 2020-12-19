# Workspaces
A Reactive application that display workspaces with live updates.

## Application
The application build from two layers:
- BE app that exposes WS/HTTP interfaces to communicate with clients.
- FE app that connects to the WS server and display workspaces with live updates.

### FE - React
The FE application is a React application written with JS and TS.

Check out the live demo: https://aqueous-woodland-47601.herokuapp.com

The application has 2 screens:
- Login - a simple form to get the user name
- Workspaces - a screen that display workspaces with live updates using WS.

### BE - Node.js
The BE is a Node.js application that expose two interfaces:

### WS
  - Clients can connect to the WS server and send `Action`s. The only available `Action` currently supported is `GetWorkspaces` but the protocol is extendable.
  - Clients that are connected to the WS will get notification each time a workspace is created in the form of an `Action`.
  
```yaml
protocol: wss
Path: `/ws`
Parameters: 
  query: username
  required: true
Examples:
  - `ws://localhost:8080/ws?username=cyborg.morty@pickle.rick`
```
```ts
 export class Action<T> {
    type: ActionType
    msg?: T
}
```
 
### HTTP
  - Clients can create new workspaces.
  - Clients can get all workspaces.
 
```yaml
Protocol: http
Path: `/workspaces`
Method: POST
Parameters: 
  - query: username
    required: true
  - body:
      eventId: 
        type: string
        required: true
      statue:
        type: string
        required: true
Examples:
  - `curl --location --request POST 'http://localhost:8080/workspaces?username=pini' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "eventId": "8c329494-8e39-4dc0-ad5c-ba569881c3c1",
        "status": "offline"
      }'`
```
 
```yaml
Protocol: http
Path: `/workspaces`
Method: GET
Parameters: 
  - query: username
    required: true
Examples:
  - `curl --location --request GET 'http://localhost:8080/workspaces?username=pini'`
```

## Development
To run this locally you need to have a running mongo, I use docker:
`docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.4.1`
To run the project locally run the following:
```bash
  npm run install:all # install dependencies
  npm run run:all
```

## What's Next
- Add test suite
- Test all the THINGz
