# Application details
 
 To run the application.
 > npm install
 > node app.js

The APi's are also accessible on - https://products-disp.herokuapp.com/

# API's
Add a product:
  > POST /product/
  > Body : {id : <Number>, name : <string>, price: <Number>}

Update a product:
> PUT /product/:id
> Body : {id : <Number>, name : <string>, price: <Number>}

Delete a product:
> DELETE /product/:id

Get all products:
> GET /products/