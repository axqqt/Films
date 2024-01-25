# Use a specific version of Node.js
# FROM node:18.17.0

# # Set the working directory inside the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json before running npm install
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Set environment variable for the port
# ENV PORT=8000

# # Expose the port the app runs on
# EXPOSE $PORT

# # Copy the rest of the application code
# COPY . .

# # Specify the command to run on container start
# CMD ["npm", "start"]


#still figuring out how to use docker!