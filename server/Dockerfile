# ---- Base Node ----
FROM node:8.5.0-wheezy AS base
# set working directory
RUN mkdir /app
RUN mkdir -p /app/public
WORKDIR /app
# copy project file
COPY package.json /app
 
#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --production 
# copy production node_modules aside
RUN mkdir prod_node_modules
RUN cp -a /app/node_modules/. /app/prod_node_modules/
# install ALL node_modules, including 'devDependencies'
RUN npm install
 
#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS test
COPY . /app
RUN npm run precommit
CMD [ "npm", "run", "precommit" ]
 
#
# ---- Release ----
FROM base AS release
ENV NODE_ENV production
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules /app/node_modules
# copy app sources
COPY ./src /app
copy ./dist /app/public
# expose port and define CMD
CMD [ "node", "index.js" ]


