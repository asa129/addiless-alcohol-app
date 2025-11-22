FROM ghcr.io/puppeteer/puppeteer:24.10.2

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT []

CMD ["npx", "tsx", "./batch/autoInsertData.ts"]