FROM node:alpine


WORKDIR /app


EXPOSE 8000

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm","start"]