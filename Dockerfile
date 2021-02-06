# FROM node:12.18.3
# RUN mkdir /app 
 
# WORKDIR /app
# RUN npm install -g @angular/cli 
# RUN npm install -g @nestjs/cli 

# COPY . . 

FROM ubuntu:xenial

LABEL MAINTAINER="Weerayut Hongsa <kusumoto.com@gmail.com>"

ARG NODEJS_VERSION="10"
ARG IONIC_VERSION="6.11.0"
ARG ANDROID_SDK_VERSION="3859397"
ARG ANDROID_HOME="/opt/android-sdk"
ARG ANDROID_BUILD_TOOLS_VERSION="29.0.2"

# ARG NODEJS_VERSION="10"
# ARG IONIC_VERSION="4.2.1"
# ARG ANDROID_SDK_VERSION="3859397"
# ARG ANDROID_HOME="/opt/android-sdk"
# ARG ANDROID_BUILD_TOOLS_VERSION="26.0.2"

# 1) Install system package dependencies
# 2) Install Nodejs/NPM/Ionic-Cli
# 3) Install Android SDK
# 4) Install SDK tool for support ionic build command
# 5) Cleanup
# 6) Add and set user for use by ionic and set work folder

ENV ANDROID_HOME "${ANDROID_HOME}"

RUN apt-get update 
RUN apt-get install -y \
       build-essential \
       openjdk-8-jre \
       openjdk-8-jdk \
       curl \
       unzip \
       git \
       gradle 
RUN curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x | bash -
RUN apt-get update 
RUN apt-get install -y nodejs 
RUN npm install -g cordova ionic
RUN cd /tmp 
RUN curl -fSLk https://dl.google.com/android/repository/sdk-tools-linux-${ANDROID_SDK_VERSION}.zip -o sdk-tools-linux-${ANDROID_SDK_VERSION}.zip 
RUN unzip sdk-tools-linux-${ANDROID_SDK_VERSION}.zip 
RUN mkdir /opt/android-sdk 
RUN mv tools /opt/android-sdk 
RUN (while sleep 3; do echo "y"; done) | $ANDROID_HOME/tools/bin/sdkmanager --licenses 
RUN $ANDROID_HOME/tools/bin/sdkmanager "platform-tools" 
RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" 
RUN apt-get autoremove -y 
RUN rm -rf /tmp/sdk-tools-linux-${ANDROID_SDK_VERSION}.zip 
RUN mkdir /ionicapp

WORKDIR /ionicapp

EXPOSE 3005 80 443 22 4200