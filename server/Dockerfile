###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As local

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "start:local1"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As dev

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "server.js" ]


FROM node:18-alpine As prod

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "server.js" ]
