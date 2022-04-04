# Restaurant-Application
Restaurant web application with the possibility of logging and ordering

## Table of contents
* [General info](#general-info)
* [Technology](#technology)
* [Setup](#setup)

##General info
Project allowes not logged in user to browse the restaurant offers and to sign up. After logging normal user can buy dishes basket and then look on his profile with purchase history. He is also allowed to publish comments and rate dishes he has previously bought. Manager role provides a panel for managing dishes. The administrator can assign a role to user and change persistence for website. 
<p align="center">
  <img src="nice.gif" alt="animated" />
</p>
##Technology:
- Angular.js
- Firebase Firestore
- (optional) self-made server in Node.js (without authorization) on "server" branch 

## Setup
To run this project, install it locally using npm:
```
$ cd ../restaurant
$ npm install
$ ng serve --open
```
