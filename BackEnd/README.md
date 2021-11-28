# POST /api/login

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "username": "JohnDoe",
                "password": "123"
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA; Path=/
            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"

    + Body

            OK


# POST /api/register

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "first_name": "John",
                "last_name": "Doe",
                "username": "jd",
                "email": "john.doe@mail.com",
                "password": "123456",
                "phone": "+4917655455200",
                "credit_card": "4647 8270 5514 1433"
            }

+ Response 201 (text/plain; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiamQiLCJlbWFpbCI6ImpvaG4uZG9lQG1haWwuY29tIiwiaWF0IjoxNjM4MTA1MzAwfQ.Sc861jNXf7i2rmfOq75J-pqgSOczoGC0WmJCgffzPdA; Path=/
            Etag: W/"7-rM9AyJuqT6iOan/xHh+AW+7K/T8"

    + Body

            Created


# POST /api/user/create

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "first_name": "John",
                "last_name": "Doe",
                "username": "jd",
                "email": "john.doe@mail.com",
                "password": "123456",
                "phone": "+4917655455200",
                "credit_card": "4647 8270 5514 1433",
                "admin": "false",
                "test": "123"
            }

+ Response 201 (text/plain; charset=utf-8)

    + Headers

            Etag: W/"7-rM9AyJuqT6iOan/xHh+AW+7K/T8"
            X-Powered-By: Express

    + Body

            Created


# POST /api/user/read

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "first_name": "John"
            }

+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"112-O5I6Jwxr6QKwEu0i5/T75nVEfN4"

    + Body

            {"_id":"61a380d4b36d61c5c62e6d2b","first_name":"John","last_name":"Doe","username":"JohnDoe","email":"john.doe@mail.com","phone":"+4917655455200","credit_card":"4647 8270 5514 1433","password":"a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3","admin":false}


# POST /api/user/update

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "find": {
                    "first_name": "John"
                },
                "update": {
                    "admin": "true"
                }
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
            X-Powered-By: Express

    + Body

            OK


# POST /api/user/delete

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "first_name": "John"
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
            X-Powered-By: Express

    + Body

            OK


# POST /api/user/isadmin

+ Request

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA



+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"4-X/5TO4MPCKAyY0ipFgr6/IraRNs"

    + Body

            true


# GET /api/user

+ Request

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA



+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"198-rbtN1ZzbDlDTbms3PgQgQnR7bhU"

    + Body

            {"_id":"61a380d4b36d61c5c62e6d2b","first_name":"John","last_name":"Doe","username":"JohnDoe","email":"john.doe@mail.com","phone":"+4917655455200","credit_card":"4647 8270 5514 1433","tickets":[{"flight_id":"61a3ad5f22b6ef6ccfa7f315","first_name":"Jake","last_name":"Tran","birthdate":"1994-05-07T00:00:00Z","citizenship":"DE","gender":"m","numberPassport":"479487794","datePassport":"2011-01-01T00:00:00Z"}]}


# PATCH /api/user

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "username": "JohnDoe"
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"

    + Body

            OK


# POST /api/flights/create

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "origin": "IST",
                "destination": "FRA",
                "time": "2021-11-19T08:00:00Z",
                "seats": "100"
            }

+ Response 201 (text/plain; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"7-rM9AyJuqT6iOan/xHh+AW+7K/T8"

    + Body

            Created


# POST /api/flights/read

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "origin": "IST"
            }

+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"81-r8w9gv2b3CE/3nU1Knf8NPb2DFU"

    + Body

            {"_id":"61a3ad5f22b6ef6ccfa7f315","origin":"IST","destination":"FRA","time":"2021-11-19T08:00:00Z","seats":"100","passengers":[]}


# POST /api/flights/update

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "find": {
                    "origin": "IST",
                    "destination": "FRA",
                    "time": "10.03.2021 14:30",
                    "seats": "100"
                },
                "update": {
                    "time": "10.03.2021 15.00"
                }
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
            X-Powered-By: Express

    + Body

            OK


# POST /api/flights/delete

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "origin": "IST"
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"
            X-Powered-By: Express

    + Body

            OK


# POST /api/flights/search

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "origin": "IST",
                "destination": "FRA"
            }

+ Response 200 (application/json; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"83-VowraWa8uTiG30/chUcVQC7Y6sM"

    + Body

            [{"_id":"61a3ad5f22b6ef6ccfa7f315","origin":"IST","destination":"FRA","time":"2021-11-19T08:00:00Z","seats":"100","passengers":[]}]


# POST /api/flights/book

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "flight_id": "61a3ad5f22b6ef6ccfa7f315",
                "first_name": "Jake",
                "last_name": "Tran",
                "birthdate": "1994-05-07T00:00:00Z",
                "citizenship": "DE",
                "gender": "m",
                "numberPassport": "479487794",
                "datePassport": "2011-01-01T00:00:00Z"
            }

+ Response 200 (text/plain; charset=utf-8)

    + Headers

            X-Powered-By: Express
            Etag: W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"

    + Body

            OK


# POST /api/airports/search

+ Request (application/json; charset=utf-8)

    + Headers

            Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsInVzZXJuYW1lIjoiSm9obkRvZSIsImVtYWlsIjoiam9obi5kb2VAbWFpbC5jb20iLCJpYXQiOjE2MzgxMTcyNTJ9.SzfZUys22yruW8Oc-M1Zmi8uGvfxbdOtBtRquQSBXOA

    + Body

            {
                "iata": "FRA"
            }

+ Response 200 (application/json; charset=utf-8)

    + Headers

            Etag: W/"d2-Zg3ucQlrB+lVtAg/LxY/dlQMDlM"
            X-Powered-By: Express

    + Body

            {"icao":"EDDF","iata":"FRA","name":"Frankfurt am Main International Airport","city":"Frankfurt-am-Main","state":"Hesse","country":"DE","elevation":364,"lat":50.0264015198,"lon":8.543129921,"tz":"Europe/Berlin"}


