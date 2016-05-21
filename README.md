# server-status-page

Renders a simple status page. Should be used in conjunction with [server-status](https://github.com/jebschiefer/server-status). This should be run behind a reverse proxy with authentication if you don't want the world to see this information.

### Installation
```
$ npm install
```

### Usage
1. Set up [server-status](https://github.com/jebschiefer/server-status) on the servers you wish show statuses.

2. Add servers to `config.json`.

3. Start the web app:

```
$ npm start
```
