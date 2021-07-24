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

## Web Socket Documentation

### Listeners on Server

- "create-room" : this will create a room. You have to pass object having user key to which we can chat it can be anyone like admin, vendor etc. You just have to pass that user id in object having user key in it.

- "all-rooms"
- "join-room"
- "message-from-client"

### Fire Events From Server

- "exception"
- "chat-history"
- "join-room-error"
- "message-from-server"
