# Auth routes

`GET /auth/me` (boilermaker)

`POST /login` (boilermaker)

`POST /signup` (boilermaker)

`POST /logout` (boilermaker)

# Cart routes

`GET /api/cart`

- response: the current cart items array

`DELETE /api/cart/:productId`

- action: removes the specified item from the cart
- response: the (entire) updated cart items array

`PUT /api/cart/:productId`

- body: {quantity: number}
- action: sets the quantity of the specified item in the cart
- response: the (entire) updated cart items array

`POST /api/cart/checkout`

- body: none for now (but payment info later)
- action: turns the cart into a fulfilled order
- response: the finished order object

# Users routes

`GET /api/users` (admin only)

- response: the list of all registered users

# Product routes

`GET /api/products`

- response: the list of all products

`GET /api/products/:productId`

- response: a single product object

`POST /api/products` (admin only)

`DELETE /api/products/:productId` (admin only)

`PUT /api/products/:productId` (admin only)
