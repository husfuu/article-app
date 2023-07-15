# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the container
COPY . .

# Build the Next.js app for production
RUN yarn build

# Expose port 3000 to the outside world (Next.js default port)
EXPOSE 3000

# Set the command to run the app when the container starts
CMD ["yarn", "start"]
