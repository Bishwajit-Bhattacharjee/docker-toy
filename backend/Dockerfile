FROM node:16
# ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

CMD npm run dev