# Gathering (gathering-web)

Gathering

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev

# Ubuntu
ENV_GATHERING_SERVICE_HOST=http://localhost:8080 \
quasar dev

# Windows (Powershell)
$env:ENV_GATHERING_SERVICE_HOST="http://localhost:8080";
quasar dev

# Windows (CMD)
@echo off
set ENV_GATHERING_SERVICE_HOST=http://localhost:8080 ^
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
