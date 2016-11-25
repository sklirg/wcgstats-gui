FROM node:alpine
MAINTAINER sklirg

COPY . .
RUN npm set progress=false
RUN npm install
RUN npm run build
RUN cp -r build /client

VOLUME ["/client"]

CMD ["cp", "-r", "build/.", "/client"]
