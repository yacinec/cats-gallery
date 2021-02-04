# Specifications <a href="./SPECIFICATIONS.md">French version</a>

## Introduction

You have been proposed this little assignment in order to check how you can address and tackle tasks that have been asked to you. Consider there is no exact answer to the problem nor only one way of doing. The goal of this exercise is to map your strengths and weaknesses. It will allow us to use your code as a discussion support during your technical interview.

## Scenario

A client would like to create a **web desktop interface** for a feline association. This interface should show cats that needs to be adopted and allows any visitor to make an appointment to adopt a cat.

## Deliverables

- A gallery showing pictures of cats with names.

![Step 1](./step1.png "Cats gallery")

- When clicking on a cat we can access to details and we should see a button "Make an appointment to adopt"

![Step 2](./step2.png "Cat details")

- When clicking on "Make an appointment to adopt", information of an appointment (date/time) should be displayed to the user.

![Step 3](./step3.png "Appointment confirmation")

**Images shown provide an example. Use your own way of doing if you want.**

## Requirements

You must create components to structure your interface. In order to display cats information and retrieve appointment information you will need to consume two different API endpoints :

### Cats list endpoint

- **URL** : `https://europe-west1-matters-test.cloudfunctions.net/getCats`

- **Method** : `GET`

- **Auth required** : No

- **Success response** :

  - **Code** : 200
  - **Content** : `[{"id":"1","name":"Robi","birthdate":"2015-03-29","breed":"Persian","location":"Paris refuge - 75","gender":"Male","picturePath":"http://placekitten.com/200/300"}, ...]`

- **Error response** :
  - **Code** : 405
  - **Content** : `{"error":"Method not allowed"}`

### Appointment endpoint

- **URL** : `https://europe-west1-matters-test.cloudfunctions.net/getAdoptionAppointment`

- **Method** : `POST`

- **Auth required** : No

- **Request body** :

```
{
  "catId": 15
}
```

- **Success response** :

  - **Code** : 200
  - **Content** : `{"appointment":"2019-04-09T20:04:42.230Z"}`

- **Error responses** :

  - **Code** : 405
  - **Content** : `{"error":"Method not allowed"}`

  - **Code** : 400
  - **Content** : `{"error":"You must provide a valid catId (number)"}`

## To go further

If you want to go deeper and improve your cats interface here are some topics you might want to cover :

- Make your grid fully responsive
- Add different kind of tests (integration, ...)
- Improve the provided CI by adding some useful jobs (linting, running extra tests, ...)
- Handle errors
- ...

## Submit your work

When you are done with the exercise, please push your code to a feature-branch and open a pull request.
