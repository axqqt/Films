FROM node:1.0.0
RUN npm install
ENV PORT=8000
CMD [ "Docker is running 😊🐳" ]