FROM ghcr.io/puppeteer/puppeteer:24.10.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "tsx", "./batch/autoInsertData.ts"]