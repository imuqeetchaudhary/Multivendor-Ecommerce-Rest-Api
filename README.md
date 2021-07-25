# Multivendor E-commerce Rest Api

## Rest Api deployment link

https://multivendor-ecommerce-restapi.herokuapp.com/

## Routes for User

### to register a new user

- user/register : post

```
{
    name:
    email:
    password:
}
```

### to login an existing user

- user/login :post

```
{
    email:
    password:
}
```

### to view the profile of an authenticated user

- user/profile :post

## Routes for products

### to add a new product

- product/add :post

```
{
    image: {
        type: (form-data)
    }
    companyName: (string)
    productTitle: (string)
    description: (string)
    pricePerDay: (number)
    address: (string)
    state: (string)
    isAvailable: {
        type: boolean
    }
    availableDate: {
        format: yyyy-mm-dd
    }
```

### to get a single product with productId

- product/get-single :post

```
{
    productId:
}
```

### to update a product

- product/update :post

```
{
    productId:
}
```

### to search a product based on following filters

- product/search :post

```
{
    companyName:
    address:
    state:
    minimumPrice:
    maximumPrice:
    startingDate:
    endingDate:
}
```

### to get all products for admin

- product/admin-get-all :get

### to get all products for user based on userId

- product/user-get-all :get

## Routes for rental history and to rent a product

### to rent a product

- rental-history/add :post

```
{
    productId:
    totalDays:
    rentingDate: formate ( yyyy-mm-dd )
    returningDate: formate ( yyyy-mm-dd )
    shippingAddress:
    shippingState:
}
```

### to check all rentel histories by admin

- rental-history/admin-get :get

### to check all of his rentel histories of vendor by the vendor

- rental-history/vendor-get :get

### to check all of his rentel histories of renter by the renter

- rental-history/renter-get :get

## ROutes for Product Reviews

### to add a product review

- product-review/add :post

```
{
    productId:
    rating:
    review:
}
```

### to get a product review

- product-review/get :post

```
{
    productId:
}
```

---

## Web Socket Documentation

### General Docs

- web socket is auth protected means you have to pass the token to access that. And you will get the token when you logged in. And if you don't pass the token the server will fire an event i.e. **"connect_error"** and you must have to listen for that in order to receive connection error messages. This is how you can do it on the client side ...

```js
const APP_URL = "http://localhost:8000"; // or whatever the base URL
const socket = io(APP_URL, {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZhN2ExMzAyZmMzZjI4ODE0NjFkMDciLCJuYW1lIjoiVXNlcjEiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MjcwMjc5OTd9.qbMPkLkt7kGB7AqNiZkWOozr2NWyWhaSEp5VNZTubBI",
  }, // replace your token this is just for demo. By the way token is passed dynamically most probably you store token in localstorage or some other in memory db just replace this hard coded string with that token ...
});
```

### Fire Events from Client

- **"create-room"** : this will create a room. You have to pass object having user key to which we can chat it can be anyone like admin, vendor etc. You just have to pass that user id in object having user key in it. This is how you can do it on the client side ...

```js
socket.emit(
  "create-room",
  { user: "60fa7a1802fc3f2881461d0a" },
  (newlyCreatedRoom) => {
    console.log(newlyCreatedRoom);
  }
);
```

- **"all-rooms"** : this will return all rooms for that logged in user. Room means all chat that logged in user involved. And you don't have to pass anything. This is how you can do it on the client side ...

```js
socket.emit("all-rooms", (allRooms) => {
  console.log("all rooms", allRooms);
});
```

- **"join-room"** : this will join room to chat with someone. And we have to pass the room id. And to get the room id you have all the rooms for that logged in user by firing an event **"all-rooms"**. For example: you are a normal user and you want to chat with vendor. For that simply get the room id in which you as normal user and that vendor will exist. And that room id we have to pass to join the room as simple as that. And when you will join the room it will fire event from the server and you should listen for that i.e. **"chat-history"** that will fire when you join the room it will return all the chat history for that room means all chat history you as logged in user and other user have. And second event will fire i.e. **"join-room-error"** if you pass invalid room id then this event will fire from server. This is how you can do it on the client side ...

```js
socket.emit("join-room", "60fa7b24ac584e29e1f44bd9");

socket.on("chat-history", (chatHistory) => {
  console.log("chat history", chatHistory);
});

socket.on("join-room-error", (roomErr) => {
  console.log("join room error", roomErr);
});
```

- **"message-from-client"** : this will emit message from the client means when you create a message on the client side simply use that action. And you just have to pass message string to that action. The server will listen for that action and it will fire an event i.e. **"message-from-server"** and you must have to listen for that event to receive new messages. It will contain three things message, time, user. This is how you can do it on the client side ...

```js
socket.emit("message-from-client", "Hello from client");

socket.on("message-from-server", (newMsg) => {
  console.log("new message from server", newMsg);
});
```

### Fire Events From Server

- **"exception"**
- **"chat-history"**
- **"join-room-error"**
- **"message-from-server"**
