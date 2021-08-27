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

## Socket.io - Real Time Chat Application

### General Docs

- web socket is auth protected means you have to pass the token to access that. And you will get the token when you logged in. And if you don't pass the token the server will fire an event i.e. **"connect_error"** and you must have to listen for that in order to receive connection error messages. This is how you can do it on the client side.

```js
const APP_URL = "http://localhost:8000"; // or whatever the base URL
const socket = io(APP_URL, {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFmNWJiNzlmM2ExOTFhMWNhYzUwOGQiLCJuYW1lIjoiQWJkdWwgTXVxZWV0IiwiZW1haWwiOiJhYmR1bGlzY29vb2xAZ21haWwuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYyOTc5NzA1MX0.4qp_IeaSNi4U7n5Y9VssAAObZ22dJVfd0yIXX7WN-kE",
  }, // replace your token this is just for demo. By the way token is passed dynamically most probably you store token in localstorage or some other in memory db just replace this hard coded string with that token.
});
```

### Fire Events from Client

- **"create-room"** : this will create a room. You have to pass object having user key to which we can chat it can be anyone like client or professional. You just have to pass that user id in object having user key in it. This is how you can do it on the client side.

```js
socket.emit(
  "create-room",
  {
    opposedUserId: "611f5dc8d36b501008bb55ed",
  },
  (data) => {
    console.log(data);
  }
);
```

- **"all-rooms"** : this will return all rooms for that logged in user. Room means all chat that logged in user involved. And you don't have to pass anything. This is how you can do it on the client side.

```js
socket.emit("all-rooms", (data) => {
  console.log(data);
});
```

- **"chat-history"** : this will return all chat history for specific room. We just have to pass roomId and you must use callback on the client side to get all the chat history. This is how you can do it on the client side.

```js
socket.emit(
  "chat-history",
  {
    roomId: "61261edc45fc2c04b0744a1e",
  },
  (data) => {
    console.log(data);
  }
);
```

- **"msg-from-client"** : this will emit message from the client means when you create a message on the client side simply use that action. And you just have to pass message string and roomId to that action. The server will listen for that action and it will fire an event i.e. **"msg-from-server"** and you must have to listen for that event to receive new messages. It will contain three things message, time, user. This is how you can do it on the client side.

```js
socket.emit(
  "msg-from-client",
  {
    roomId: "61261edc45fc2c04b0744a1e",
    message: "Message from client",
  },
  (data) => {
    console.log(data);
  }
);

socket.on("msg-from-server", (data) => {
  console.log("Message:", data);
});
```

### Fire Events From Server

- **"exception"**
- **"hello-from-server"**
- **"connect_error"**
