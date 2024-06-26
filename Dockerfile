FROM node:18-slim

RUN apt-get update && apt-get install -yq \
  build-essential \
  python3

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV SESSION_KEY=4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85
ENV PORT=9000

RUN make build

CMD ["bash", "-c", "make db-migrate && npm start"]
