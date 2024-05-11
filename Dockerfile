# Specify a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Bind the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
