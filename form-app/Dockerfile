FROM node:18

RUN /bin/bash &&\
    apt-get -y update &&\
    apt-get -y upgrade &&\
    apt-get -y install ncat &&\
    npm install -g npm &&\
    mkdir /app /build

COPY ./ /build

WORKDIR /build
RUN yarn &&\
    yarn build &&\
    mv -f ./.output/* /app &&\
    mv -f ./start.sh /app &&\
    rm -rf /build

CMD sh /app/start.sh
EXPOSE 3000
