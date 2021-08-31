# EClassroom

## Introduction

EClassroom is an all purpose online classroom web application which provides students and teachers with various features at par with an offline class environment.

Website Link : https://eclassroom.vercel.app/

Github Repositories : 

* FrontEnd - https://github.com/tiger-yash/EClassroom-frontend
 
* BackEnd - https://github.com/tiger-yash/EClassroom-backend

## About

* FrontEnd: The Front End of the Web Application is made using ReactJS and Redux making the website extremely reactive and responsive. 

* BackEnd: The Back End is made in Django REST framework and the created APIs allow frontend to fetch all the necessary information from the user data to the test marks of the students.

# Features

The Features provided by our platform  

## AUTHENTICATION :

* The Users can Register either by filling up their emails and unique username or by using **GOOGLE SIGNUP** .

* The users can similarly Login by any of the 2 methods that are either username and password login or **GOOGLE LOGIN**.

![Screenshot from 2021-08-31 20-32-32](https://user-images.githubusercontent.com/74406801/131534591-35f6eae1-64ee-4d38-87c9-93f61bd8d02b.png)
![Screenshot from 2021-08-31 20-32-25](https://user-images.githubusercontent.com/74406801/131534602-a0e9aadd-c1ba-449f-8a20-39ad00649d96.png)


## FOR TEACHERS:

* Teachers can  create classes for their subjects.
* The DashBoard will display all the classes they are Teaching in.
* They can generate the code for their class and share the code with the students so that they can join the class.
* They can view all the members of the class.
* They can create Assignments and Tests for the students providing the links and assigning deadlines. The tests/assignments will also have final dates after which * * submissions won’t be accepted and submissions between the due date and end date will be considered as late submissions.
* Teachers will also be able to view the submissions and mark the students which data is shared with them immediately.
* Teachers can also join other classes as Teaching Assistants or Co-Teachers and assist the Class Teacher handle student submissions.

## FOR STUDENTS: 

* Students can join any class using the 7-digit Class Code provided to them by the teacher.
* The DashBoard will display all the classes they are studying in.
* Students will be able to view all the members of the class.
* They can view assignments and tests assigned to them by the teacher.
* They can make submissions to the assigned tests and assignments, by providing the links to the PDFs uploaded on any secure server with access to the teacher.
* They can also edit their submissions.
* One Bonus feature is that the previous submissions are only overridden and not deleted, so once submitted it won’t be possible for them to submit nothing which is a major feature.
* After getting marked the students will be able to view them in that particular Test/Assignment.
* Students can unenroll from classes.


# To Run Locally

In the project directory, you can run:
### `yarn install`
This installs all the dependencies.

To run the app in the development mode :\
### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


