FROM node:14.15.4

WORKDIR /app

COPY package.json .

RUN npm install

# place the context from the root to the current work dir
COPY . .

# array is preferred form of given command line instructions
# https://docs.docker.com/engine/reference/builder/#cmd
CMD [ "npm", "start"]
