nodeAbode!

Creating the databases
-----------------------
- create your ```config.json``` file in:
 - ```./server/config.json```
- fill in ```config.json``` with the following:
```
{
  "development": {
    "username": "DB_SUPERUSER",
    "password": "DB_SUPERUSER_PW",
    "database": "DB_NAME",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "DB_SUPERUSER",
    "password": "DB_SUPERUSER_PW",
    "database": "DB_NAME",
    "host": "127.0.0.1",
    "port": "5432",
    "dialect": "postgres"
  }
}
```
- run your DB migrate using:
 - ```node_modules/.bin/sequelize db:migrate```


 **Made with love by [Jason Luong](http://github.com/j-luong), [Jess Astubry](http://github.com/JAstbury) and [Mike Miller](http://github.com/mjosephmiller)**
