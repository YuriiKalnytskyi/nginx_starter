# Letsnude

|          |                |     |
|----------|----------------|-----|
| NODE JS  | node:18-alpine |     |
| API      | nestjs:10      |     |
| CLIENT   | reactjs:18.2.0 |     |
| PGADMIN  |                |     |
| POSTGRES |                |     |

## Getting Started

### Root project:

```bash
$ docker-compose up -d
```

### And start the database settings

```bash
$ cd api
$ npm run db:start:local || npm run db:start:dev
```

## URLS
|         |                                 |     |
|---------|---------------------------------|-----|
| SITE    | http://localhost:8816           |     |
| API     | http://localhost:8816/api/      |     |
