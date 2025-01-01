# Step 1: Use a Node.js base image
FROM node:18-alpine as base

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app's files
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3001

# Step 8: Start the Next.js app
CMD ["npm", "start"]
