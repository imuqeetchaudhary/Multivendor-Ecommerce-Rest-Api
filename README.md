# Multivendor E-commerce Rest Api

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
    price: (number)
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

### to get all products for admin

- product/admin-get-all :get

### to get all products for user based on userId

- product/user-get-all :get
