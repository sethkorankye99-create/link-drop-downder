# 1. Use Node as the base
FROM node:18

# 2. Install Python 3 manually in the OS
RUN apt-get update && apt-get install -y python3 python3-pip

# 3. Create app directory
WORKDIR /app

# 4. Install app dependencies
COPY package*.json ./
RUN npm install

# 5. Bundle app source
COPY . .

# 6. Expose port and start
EXPOSE 3000
CMD [ "node", "server.js" ]