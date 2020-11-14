FROM node:12.18.3
RUN mkdir /app 
 
WORKDIR /app
RUN npm install -g @angular/cli 
RUN npm install -g @nestjs/cli 

COPY . . 