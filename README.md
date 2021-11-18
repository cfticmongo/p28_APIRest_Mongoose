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

Para permitir operaciones de consulta si el cluster ha entrado en modo SECONDARY

A los miembros le pasamos la configuración:

rs.secondaryOk()

Además a nivel de API en mongoose hay que añadir:

Opción connectWithNoPrimary

Y en la URI añadir la opción

readPreference=<valor>

## Colección de artículos

let articles = [
    { 
        "brand": "Adidas", 
        "model": "VS Pace", 
        "description": "Lorem ipsum donor", 
        "colors": ["negro", "blanco", "blanco-rojo", "blanco-azul"], 
        "sizes": ["39", "40", "41", "42", "43", "44"], 
        "price": 70, 
        "currentPrice": 35, 
        "tags": ["lifestyle", "piel", "outlet"], 
        "gender": "hombre", 
        "pic": "https://i.ibb.co/Kh4w8XC/1.jpg" 
    },
    { "brand": "Adidas", "model": "Grand Court", "description": "Lorem ipsum donor", "colors": ["blanco", "blanco-celeste", "blanco-negro"], "sizes": ["35", "36", "37", "38", "39", "40"], "price": 75, "currentPrice": 55, "tags": ["lifestyle", "piel"], "gender": "mujer", "pic": "https://i.ibb.co/HH9yRts/2.jpg" },
    { "brand": "Adidas", "model": "Xtreme", "description": "Lorem ipsum donor", "colors": ["negro", "azul", "rojo"], "sizes": ["41", "42", "43", "44"], "price": 90, "currentPrice": 80, "tags": ["running"], "gender": "hombre", "pic": "https://i.ibb.co/H4chd3c/3.jpg" },
    { "brand": "New Balance", "model": "Day", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "blanco-rojo", "blanco-azul"], "sizes": ["39", "40", "41", "42", "43", "44"], "price": 70, "currentPrice": 40, "tags": ["lifestyle", "outlet"], "gender": "hombre", "pic": "https://i.ibb.co/P6tjSG8/4.jpg" },
    { "brand": "New Balance", "model": "Day", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "blanco-rojo", "blanco-azul"], "sizes": ["35", "36", "37", "38", "39", "40"], "price": 70, "currentPrice": 40, "tags": ["lifestyle", "outlet"], "gender": "mujer", "pic": "https://i.ibb.co/vD9xgcH/5.jpg" },
    { "brand": "Nike", "model": "Revolution", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "rosa", "naranja"], "sizes": ["35", "36", "37", "38", "39", "40"], "price": 70, "currentPrice": 50, "tags": ["running"], "gender": "mujer", "pic": "https://i.ibb.co/YZ6XZj0/6.jpg" },
    { "brand": "Nike", "model": "Revolution", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "rosa", "naranja"], "sizes": ["32", "33", "34", "35", "36"], "price": 60, "currentPrice": 40, "tags": ["running", "lifestyle"], "gender": "niña", "pic": "https://i.ibb.co/FD4xrv4/7.jpg" },
    { "brand": "Nike", "model": "Revolution", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "rojo", "azul"], "sizes": ["39", "40", "41", "42", "43", "44"], "price": 70, "currentPrice": 50, "tags": ["running"], "gender": "hombre", "pic": "https://i.ibb.co/r3049Jz/8.jpg" },
    { "brand": "Nike", "model": "Revolution", "description": "Lorem ipsum donor", "colors": ["negro", "blanco", "rojo", "azul"], "sizes": ["34", "45", "36", "37", "38"], "price": 60, "currentPrice": 40, "tags": ["running", "lifestyle"], "gender": "niño", "pic": "https://i.ibb.co/Ps2WB3R/9.jpg" },
]

use app

db.articles.insert(articles)

## Documentación APIRest con swagger

npm i swagger-jsdoc swagger-ui-express