# Letsnude

|          |                |     |
|----------|----------------|-----|
| NODE JS  | node:18-alpine |     |
| API      | express:4.18.2      |     |
| CLIENT   | reactjs:18.2.0 |     |
| POSTGRES |                |     |

## Getting Started

### Root project:

```bash
$ docker-compose up -d
$ cd api
$ npm run db:start:local || npm run db:start:dev
```

### Or

```bash
$ npm run start
```

## URLS
|         |                                 |     |
|---------|---------------------------------|-----|
| SITE    | http://localhost:8816           |     |
| API     | http://localhost:8816/api/      |     |
