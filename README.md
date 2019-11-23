## myNetflixAPI

> Creando una API con NodeJS / Express / MongoDB / Mongoose.
```
```
---
## <span style="color: #f58060">API documentation.</span>


# Movies

## <span style="color: lightGreen"> GET</span> - /movies

Get a list of all movies. (supports id, title, gender filtering)

http://localhost:3000/movies  
http://localhost:3000/movies?id=475557  
http://localhost:3000/movies/&genre=Thriller  
http://localhost:3000/movies/&title=enigma


## <span style="color: lightGreen"> GET</span> - /movies/popular

Get a list of the current popular movies. (supports gender, tittle filtering)

http://localhost:3000/movies/popular  
http://localhost:3000/movies/popular/&genre=war  
http://localhost:3000/movies/popular/&title=toy

## <span style="color: lightGreen"> GET</span> - /movies/latest

Get the most newly created movie. (supports gender, title filtering)

http://localhost:3000/movies/latest  
http://localhost:3000/movies/latest/&genre=adventure  
http://localhost:3000/movies/latest/&title=IronMan

## <span style="color: lightGreen"> GET</span> - /movies/premieres

Get a list of premieres, all movies type 1 (supports gender, title filtering)

http://localhost:3000/movies/premieres  
http://localhost:3000/movies/premieres/&genre=adventure  
http://localhost:3000/movies/premieres/&title=IronMan

---

### **movies responses / json:**
```
200 - [
        { 
          "type": 1, 
          "genre_ids": [
              80,
              18,
              53
          ],
          "_id": "5dd7d504bcc96024e04452e9",
          "type": 1,
          "popularity": 556.715,
          "vote_count": 5288,
          "video": false,
          "poster_path": "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
          "id": 475557,
          "adult": false,
          "backdrop_path": "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
          "original_language": "en",
          "original_title": "Joker",
          "title": "Joker",
          "vote_average": 8.5,
          "overview": "During the 1980s...",
          "release_date": "2019-10-02"
        }
      ]

404 - { message: 'The resource you requested could not be found' }  

500 - { message: `movies error` }


```

# Users

## <span style="color: yellow"> POST</span> - /user/register

Register a new user. 

http://localhost:3000/user/register

### **body:**
```
{  
  "username":"nick1",  
  "password": "12345678A%",
  "email": "nick1@gmail.com  
}  
```
### **responses / json:**
```
200 - { message: '<userName> has been successfully registered' }

400 - { message: `password too short`, cod: 0 }
      { message: `password must have a digit`, cod: 1 }
      { message: `password must have a capitalCase`, cod: 2 }
      { message: `password must have a special character`, cod: 3 }

401 - { message: `user <userName>, already exists..` }

404 - { message: 'The resource you requested could not be found' }  

500 - { message: `save user error` }

```

## <span style="color: yellow"> POST</span> - /user/login

User Login. return a valid token.

http://localhost:3000/user/login

### **body:**
```
{  
  "username":"nick1",  
  "password": "12345678A%",
}  
```
### **responses / json:**
```
200 - {
        "message": "... login successful ...",
        "token": "7132c508-8c6e-4d1f-8362-b6f1b9666899" 
      }

400 - { message: `... login failed ...` }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `login error` }

```

## <span style="color: lightGreen"> GET</span> - /user/profile

Get user profile. 

http://localhost:3000/user/profile

### **header:**
```
{
  key: '8ce2d780-d76a-4091-bf20-296876f4fab3'
}
```

### **responses / json:**
```
200 - {
        "order": {
          "movieId": 475557,
          "dateRent": "2019-11-23T13:02:47.428Z",
          "dateArrival": "2019-11-25T13:02:47.428Z",
          "daysRent": 2,
          "price": 4
        },
        "_id": "5dd90dc8f19e7206b8268708",
        "username": "nick1",
        "email": "nick1@gmail.com",
        "orders": [
          {
            "movieId": 475557,
            "dateRent": "2019-11-23T13:02:47.436Z",
            "daysRent": 2,
            "price": 4
          }
        ]
      }

401 - { message: "... invalid token ..." }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `profile error` }

```

## <span style="color: lightGreen"> GET</span> - /user/logout

User Logout, remove user token.

http://localhost:3000/user/logout

### **header:**
```
{
  key: '8ce2d780-d76a-4091-bf20-296876f4fab3'
}
```

### **responses / json:**
```
200 - { "message": "... valid logout ..." }

401 - { message: "... invalid token ..." }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `logout error` }


```
# Orders
## <span style="color: yellow"> POST</span> - /order (rent)

Rent movie order.

http://localhost:3000/order

### **header:**
```
  {
    key: 7132c508-8c6e-4d1f-8362-b6f1b9666899
  }
```

### **body:**
```
{
	"type": "rent",
	"movieId": 475557,
	"deliveryCity": "Barcelona",
	"daysRent": 2,
	"price": 4
}
```
### **responses / json:**
```
200 - { "message": "... rent successful ..." }

400 - { message: '... user already has a movie rented ...' }

401 - { message: "... invalid token ..." }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `rent error` }

```

## <span style="color: yellow"> POST</span> - /order (return)

Return movie order.

http://localhost:3000/order

### **header:**
```
  {
    key: 7132c508-8c6e-4d1f-8362-b6f1b9666899
  }
```

### **body:**
```
{
	"type": "return",
	"movieId": 475557,
}
```
### **responses / json:**
```
200 - { "message": "... renturn successful ..." }

400 - { message: '... It is not a movie pending to be returned ...' }

401 - { message: "... invalid token ..." }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `return error` }

```

## <span style="color: yellow"> POST</span> - /order/delivery

Get delivery date by city. 

http://localhost:3000/order/delivery/?city=Valencia

### **header:**
```
  {
    key: 7132c508-8c6e-4d1f-8362-b6f1b9666899
  }
```
### **responses / json:**
```
200 - { "dateArrival": "2019-11-26T13:45:56.986Z" }

401 - { message: "... invalid token ..." }

404 - { message: 'The resource you requested could not be found' }

500 - { message: `delivery error` }


```

# Genres
## <span style="color: lightGreen"> GET</span> - /movies/genres

Get a list of genres (supports id, name filtering)

http://localhost:3000/movies/genres  
http://localhost:3000/movies/genres/&id=53  
http://localhost:3000/movies/genres/&name=Thriller

### **responses / json:**
```
200 - [
        {
          "_id": 28,
          "name": "Action"
        },
        {
          "_id": 12,
          "name": "Adventure"
        }
      ]

404 - { message: 'The resource you requested could not be found' }

500 - { message: `pofile error` }


```

# Cities
## <span style="color: lightGreen"> GET</span> - /movies/cities

Get a list of cities (supports name filtering)

http://localhost:3000/cities  
http://localhost:3000/cities/&name=Barcelona  

### **responses / json:**
```
200 - [
        {
          "_id": "5dd13f97dddafe4448fb7a08",
          "name": "Valencia",
          "deliverDays": 1
        },
        {
          "_id": "5dd17f879cb6f3338c7a1f56",
          "name": "Barcelona",
          "deliverDays": 2
        }
      ]

404 - { message: 'The resource you requested could not be found' }

500 - { message: `cities error` }


```

# Price
## <span style="color: lightGreen"> GET</span> - /price

Get a list of price (supports typeMovie filtering)

http://localhost:3000/price  
http://localhost:3000/price/&type=1  

### **responses / json:**
```
200 - [
        {
          "_id": 1,
          "price": 3
        },
        {
          "_id": 2,
          "price": 2
        }
      ]

404 - { message: 'The resource you requested could not be found' }

500 - { message: `price error` }


```