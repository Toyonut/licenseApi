FROM node:12-slim

WORKDIR /opt/LicenseApi

COPY ./ .

RUN  npm install

EXPOSE 3000

CMD [ "node", "./bin/www" ]
