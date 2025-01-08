# pathAPI routes and endpoints

## Notes:

### All routes start with '/api/v1'
### All endpoint will return the same response when server fails.
> - status code: 500
> - response body: 
>    ```json
>    {
>        "message": "error message"
>    }
>    ```
>

## routes
1.  `/auth`

    - /Login

      - Method: `POST`
      - Header: ''
      - Body:

        ```json
        {
          "email": "example@domain.com",
          "password": "ABC123@*()abc"
        }
        ```

      Responses:

      - Success
        - status code: `200`
        - response body
          ```json
          {
            "profile": {
              "firstName": "ahmad",
              "lastName": "Abdelraheem",
              "email": "ahmad@email.com",
              "position": "Software Engineer",
              "Level": "Associate",
              "countryID": 6,
              "countryName": "Jordan",
              "isEmailConfirmed": true,
              "profileImage": "long blob" // may change to id and served from another endpoint
            },
            "token": "the token"
          }
          ```
      - Email is not exist

        - status code: `400`
        - response body
          ```json
          {
            "message": "Email is not exist"
          }
          ```

      - Incorrect Password
        - status code: `401`
        - response body
          ```json
          {
            "message": "Invalid credentials"
          }
          ```

    ***

    - /Signup

      - Method: `POST`
      - Header: ''
      - Body:
        ```json
        {
          "firstName": "Ahmad",
          "lastName": "Abdelraheem",
          "email": "example@domain.com",
          "password": "ABC123@*()abc"
        }
        ```
      - Responses
        - Success
          - status code: `201`
          - response
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "",
                "Level": "",
                "countryID": -1,
                "countryName": "",
                "isEmailConfirmed": false,
                "profileImage": null // may change to id and served from another endpoint (null will be -1)
              },
              "token": "the token"
            }
            ```
        - Email is already exist
          - status code: `400`
          - response
            ```json
            {
              "message": "Email is already exist"
            }
            ```

    ***

    - /Password-Recovery

      - Method: `POST`
      - Header: ''
      - Body:
        ```json
        {
          "email": "example@domain.com"
        }
        ```
      - Responses
        - Success
          - status code: `201`
          - response
            ```json
            {}
             // Will send a link with a token to user email
            ```
        - Email is not exist
          - status code: `400`
          - response
            ```json
            {
              "message": "Email is not exist"
            }
            ```

    ***

    - /Change-Password

      - Method: `POST`
      - Header:
        ```json
        {
          "Authorization": "Bearer ${user-jwt-token}"
        }
        ```
      - Body:
        ```json
        {
          "newPassword": "abcd1234",
          "oldPassword": "12345678" // Will not be required when the token is for changing password.
        }
        ```
      - Responses
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "Software Engineer",
                "Level": "Associate",
                "countryID": 6,
                "countryName": "Jordan",
                "isEmailConfirmed": true,
                "profileImage": "long blob" // may change to id and served from another endpoint
              },
              "token": "the token"
            }
            ```
        - Failed
          - status code: `401`
          - response
            ```json
            {
              "message": "Access Denied" // old password or token is incorrect
            }
            ```

    ***

    - /Confirm-Email

      - Method: `POST`
      - Header:
        ```json
        {
          "Authorization": "Bearer ${user-jwt-token}"
        }
        ```
      - Body:
        ```json
        {
        }
        ```
      - Responses
        - Success
          - status code: `200`
          - response body
            ```json
            {
              "profile": {
                "firstName": "ahmad",
                "lastName": "Abdelraheem",
                "email": "ahmad@email.com",
                "position": "Software Engineer",
                "Level": "Associate",
                "countryID": 6,
                "countryName": "Jordan",
                "isEmailConfirmed": true,
                "profileImage": "long blob" // may change to id and served from another endpoint
              },
              "token": "the token"
            }
            ```
        - Failed
          - status code: `401`
          - response
            ```json
            {
              "message": "Access Denied" // token is incorrect
            }
            ```

