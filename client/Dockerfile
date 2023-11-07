###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production

# Create app directory
WORKDIR /usr/src/app

RUN npm run build

# Bundle app source
COPY . .

CMD [ "npm", "start" ]
