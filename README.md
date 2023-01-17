# My Repertoire

![GitHub repo size](https://img.shields.io/github/repo-size/DirkGaston/my-repertoire)
![GitHub stars](https://img.shields.io/github/stars/DirkGaston/my-repertoire?style=social)
![GitHub forks](https://img.shields.io/github/forks/DirkGaston/my-repertoire?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/DirkGrave?style=social)

**My Repertoire** is a basic song management system that allows you to register a list of songs with their corresponding keys.

## Background

The music school "E-Sueño" is motivating its singing students to perform live and has contacted the local restaurant to use its stage and start a calendar of presentations. In order to manage the songs their students will sing, the school hired a freelance developer to create a CRUD type application.

In this challenge you will have to develop an Express server that uses the File
System module to add, modify and delete songs stored in a local JSON named repertoire.json.

The server will need to make the following routes available:

● POST /songs : Receives the data corresponding to a song and adds it to the
repertoire. <br>
● GET /songs : Returns a JSON with the songs registered in the repertoire. <br>
● PUT /songs/:id : Receives the data of a song to be edited and updates it by manipulating the JSON. <br>
● DELETE /songs/:id : Receives the id of a song by queryString and deletes it from the
repertoire. <br>

## Installing **My Repertoire**

To install **My Repertoire**, use the following command:

```bash
$ npm install
```

## Using **My Repertoire**

To use **My Repertoire**, just run the server with the following command:

```bash
$ npm run dev
```

the URL is:

http://localhost:3000/

## Contact

If you want to contact me you can reach me at <dirkgaston87@gmail.com>.
