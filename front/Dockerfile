FROM node:18-alpine as node_base

# create app folder
RUN mkdir /app && chown node /app && chmod 700 /app
WORKDIR /app

# copy and install the node environment
COPY .babelrc package.json webpack.config.js .eslintrc.json jest.config.js /app/
RUN chown node .babelrc package.json webpack.config.js

# copy the source code of the app
COPY ./src /app/src
COPY ./public /app/public

# ======================== DEV ENVIRONMENT ========================
FROM node_base as development

COPY  ./install-frontend-dev.sh /usr/local/bin/
RUN sed -i 's/\r$//g' /usr/local/bin/install-frontend-dev.sh \
    && chmod +x /usr/local/bin/install-frontend-dev.sh
USER node

CMD ["/usr/local/bin/install-frontend-dev.sh"]

# ======================== PROD ENVIRONMENT ========================
FROM node_base as production

COPY  ./install-frontend-prod.sh /usr/local/bin/
RUN sed -i 's/\r$//g' /usr/local/bin/install-frontend-prod.sh \
    && chmod +x /usr/local/bin/install-frontend-prod.sh
USER node

CMD ["/usr/local/bin/install-frontend-prod.sh"]