# Development

Pasos para levantar la app en desarrollo

1. levantar la base de datos
```sh
docker compose up -d
``` 

2. crear una copia de .env.template y remonbrarlo a .env
3. reemplazar los valores
4. ejecutar `npm install`, `npm run dev`
5. ejecutar prisma command
```

npx prisma migrate dev
npx prisma generate
```

6.  ejecutar SEED para crear la BD `http://localhost:3000/api/seed`


Prisma command init

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
Opcional Prisma: si ya tengo una BD y no tengo el schema de primsa ejecutar `npx prisma db pull`
luego ejecutar `npx prisma generate`, para agregar el nuevo schema al cliente y poder acceder y hacer consultas
- si se modifica el schema agregando nuevos atributos a una Tabla se debe utilizar `npx prisma db push`, y asi se mantienen los datos.