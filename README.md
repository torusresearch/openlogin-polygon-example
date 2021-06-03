
# Description:-
- Basic example to use openlogin sdk with polygon network

# Installation:-
- `npm i`

# Run in dev mode:
- `npm start`


# Note:
- Before deployment to real domain you need to register your project at `https://developer.tor.us`

- Get the projectId/clientId from developer dashboard and replace clientId in `openlogin` sdk constructor in `containers/login/index.js` file:-

``` 
    const sdkInstance = new OpenLogin({
        clientId: process.env.REACT_APP_CLIENT_ID, // your project id
        network: 'testnet',
    });
```

- You don't need to register your project for localhost development you can pass any string as client id.