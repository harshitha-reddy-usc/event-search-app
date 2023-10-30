FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --global nodemon --legacy-peer-deps

# Bundle app source
COPY . .
RUN npm install react-chevron --legacy-peer-deps
RUN npm run build

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "nodemon", "server/index.js" ]
