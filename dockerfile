FROM node:8.9.4

WORKDIR /opt/LicenseApi

COPY ./ .

RUN  npm install

EXPOSE 3000

CMD [ "node", "./bin/www" ]
