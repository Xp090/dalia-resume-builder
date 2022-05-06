# Dalia Resume Builder

## APIs Documentation

### 1. Resume Builder Status `GET /api/resumeBuilder`

Needs to be called by the client at the beginning to get the status of the builder for the current user.
It will return the resume data that has been submitted before by the user and a hint for the client for the current step
in the builder
to show the corresponding fields for the user to fill in the UI.
If the currentStep is null, then the resume build process is completed
The user is identified by JWT token sent in the Authorization header.
in case of new user or if the token is invalid a new user will be created and new generated token will be sent in the
response
and the client should store it and send it with future requests

#### examples:

* Response When a previous resume data was submitted by a user

```shell
curl -XGET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzUzNmNlODU5M2NjN2VlZDAwM2ViMyIsImlhdCI6MTY1MTg0ODkxMCwic3ViIjoiNjI3NTM2Y2U4NTkzY2M3ZWVkMDAzZWIzIn0.S_IOUmD1GCRyvnzuTxot9Wv2_DHg9wozh_wj42SyyXc' -H "Content-type: application/json" 'https://dalia-resume-builder.herokuapp.com/api/resumeBuilder'
```

```json
{
  "resume": {
    "personalInfo": {
      "firstName": "Mohammad",
      "lastName": "Amir",
      "email": "example@mail.com",
      "phone": "12312412",
      "birthdate": "2022-05-06T17:03:16.679Z",
      "address": "15 Wall Street"
    },
    "education": null,
    "experience": null,
    "skills": null
  },
  "currentStep": "education"
}
```

* Response for new user

```shell
curl -XGET -H "Content-type: application/json" 'https://dalia-resume-builder.herokuapp.com/api/resumeBuilder'
```

```json
{
  "resume": {
    "personalInfo": null,
    "education": null,
    "experience": null,
    "skills": null
  },
  "currentStep": "personalInfo",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzU1MDRjODk3N2I3MWNiNTA2ZGYwNyIsImlhdCI6MTY1MTg1NTQzNiwic3ViIjoiNjI3NTUwNGM4OTc3YjcxY2I1MDZkZjA3In0.-OqyLmEo6I8K-RqnPY7IYf6ofmH7oKSdaK7KM_M1FWA"
}
```

### 2. Update Resume `POST /api/resumeBuilder/{step}`

Resume Builder has 4 steps:
[
'personalInfo',
'education',
'experience',
'skills'
]
each step need to be submitted individually by specifying its name in the url **{step}** param
And here are the fields for each step:

```javascript
resume = {
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        birthdate: Date,
        address: String,
    },
    education: [{
        degree: String,
        school: String,
        graduationYear: Number
    }],
    experience: [{
        jobTitle: String,
        entityName: String,
        startDate: Date,
        endDate: Date,
    }],
    skills: [String]
}
```
the fields need to be sent inside "data" key

#### examples:

```shell
curl -XPOST -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzU1MDRjODk3N2I3MWNiNTA2ZGYwNyIsImlhdCI6MTY1MTg1NTQzNiwic3ViIjoiNjI3NTUwNGM4OTc3YjcxY2I1MDZkZjA3In0.-OqyLmEo6I8K-RqnPY7IYf6ofmH7oKSdaK7KM_M1FWA' -H "Content-type: application/json" -d '{
  "data": {
    "firstName": "Mohamed",
    "lastName": "Amir",
    "email": "example@mail.com",
    "phone": "12312412",
    "birthdate": "2022-05-06T17:03:16.679Z",
    "address": "15 Wall Street"
  }
}' 'https://dalia-resume-builder.herokuapp.com/api/resumeBuilder/personalInfo'
```

```json
{
  "resume": {
    "personalInfo": {
      "firstName": "Mohammad",
      "lastName": "Amir",
      "email": "example@mail.com",
      "phone": "12312412",
      "birthdate": "2022-05-06T17:03:16.679Z",
      "address": "15 Wall Street"
    },
    "education": null,
    "experience": null,
    "skills": null
  },
  "currentStep": "education"
}
```

```shell
curl -XPOST -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzU1MDRjODk3N2I3MWNiNTA2ZGYwNyIsImlhdCI6MTY1MTg1NTQzNiwic3ViIjoiNjI3NTUwNGM4OTc3YjcxY2I1MDZkZjA3In0.-OqyLmEo6I8K-RqnPY7IYf6ofmH7oKSdaK7KM_M1FWA' -H "Content-type: application/json" -d '{
  "data": [
      {
        "degree": "Computer Science",
        "school": "Cairo University",
        "graduationYear": 2022
      },
      {
        "degree": "Mechanical Engineering",
        "school": "Alexandria University",
        "graduationYear": 2015
      }
    ]
}' 'https://dalia-resume-builder.herokuapp.com/api/resumeBuilder/education'
```

```json
{
  "resume": {
    "personalInfo": {
      "firstName": "Mohammad",
      "lastName": "Amir",
      "email": "example@mail.com",
      "phone": "12312412",
      "birthdate": "2022-05-06T17:03:16.679Z",
      "address": "15 Wall Street"
    },
    "education": [
      {
        "degree": "Computer Science",
        "school": "Cairo University",
        "graduationYear": 2022
      },
      {
        "degree": "Mechanical Engineering",
        "school": "Alexandria University",
        "graduationYear": 2015
      }
    ],
    "experience": null,
    "skills": null
  },
  "currentStep": "experience"
}
```
