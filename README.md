# nfacto-crowd-funding-api
Les éléments suivants sont utilisé dans ce projet:
- [ExpressJS](https://expressjs.com) Pour le routing
- [Sequelize](http://docs.sequelizejs.com) ORM pour les bases de données
- [body-parser](https://github.com/expressjs/body-parser) pour gerez les retour HTTP post
- [multer](https://github.com/expressjs/multer) Pour l'upload de fichier 
- base de donnée MYSQL
---
### Installation
Soyez sur d'avoir installé [NodeJS](https://nodejs.org/) et de possédez MYSQL sur votre machine

1. Cloner ce repertoire sur votre machine
2. Crée une nouvelle base de données MYSQL . Récuper le fichier sql et importer le dans votre base de données mysql.
3. `cd` vers votre repertoire local et lancer `npm install` en utilisant un terminal
4. Suivez les indications suivantes pour configurer votre base de données et votre port
```javascript
//Set app config
const port = 3000;
const baseUrl = 'http://localhost:'+port;

//Connect to database
const sequelize = new Sequelize('androidproject', 'root', 'yourpassword', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
```

Puis lancer la commande `node index.js` pour démarrez le serveur

---


### Routes
`GET /project/`
Récuperer tous les projets


