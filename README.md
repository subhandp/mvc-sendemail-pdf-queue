# mvc-cloud-upload
{{local}} : domain
# Mendapatkan Token
url : {{local}}/login

Data body:
```js
{
  username : "putra",
  password : "Doe"
}
```
Result
```js
{
    "status": "OK",
    "token": "..token"
}
```
# Upload image pada cloudinary
Upload image cloudinary method POST
url : {{local}}/post

Header :
```js

  {
    authorization: ..token,
    Content-Type: multipart/form-data
  }

```
Data body form-data:
```js

  {
    "title": "title post baru",
    "content": "content post",
    "tags": "home,post",
    "status": "publish",
    "AuthorId": 1,
    image : ..file
  }
```
