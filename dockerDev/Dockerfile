FROM node:12.18.3
RUN mkdir /app
RUN mkdir /app/api
RUN mkdir /app/mobile
WORKDIR /app
RUN npm install -g @angular/cli 
RUN npm install -g @nestjs/cli 
RUN npm install -g @ionic/cli
RUN npm install -g cordova

# CMD ["ionic"]
#EXPOSE 8100 4200 3005

#ENTRYPOINT ["ionic"]
#CMD ["serve", "8100", "--address", "0.0.0.0"]