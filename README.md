# APIRest Node Express Mongoose

Instalamos nodemon como dependencia de desarrollo

```
npm i nodemon --save-dev
```

Instalamos express y mongoose como dependencia

```
npm i express mongoose
```

Creamos el script para levantar el servidor con nodemon

En package.json

```
...
  "scripts": {
    "start": "nodemon app",
    ...
  },
...
```

Para usar variables de entorno en desarrollo se suele usar dotenv

```
npm i dotenv
```
Instalación de mongoose

```
npm i mongoose
```

Levantamos un cluster MongoDB para realizar las conexiones

mkdir server1
mkdir server2
mkdir server3

mongod --dbpath server1 --port 27101 --replSet clusterGetafe 
mongod --dbpath server2 --port 27102 --replSet clusterGetafe 
mongod --dbpath server3 --port 27103 --replSet clusterGetafe

Shell a uno de ellos

mongo --port 27101

E iniciamos el cluster

rs.initiate({ 
    _id: "clusterGetafe", 
    members: [ 
      {_id: 0, host: "localhost:27101"}, 
      {_id: 1, host: "localhost:27102"}, 
      {_id: 2, host: "localhost:27103"} 
    ] 
  })