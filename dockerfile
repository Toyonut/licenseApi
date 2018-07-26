FROM node:8.11.3

WORKDIR /opt/LicenseApi

COPY ./ .

RUN  npm install

EXPOSE 3000

CMD [ "node", "./bin/www" ]
