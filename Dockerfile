FROM node:12.18.3
RUN mkdir /usr/src/app 
 
WORKDIR /usr/src/app
RUN npm install -g @angular/cli 
RUN npm install -g @nestjs/cli 

COPY . . 