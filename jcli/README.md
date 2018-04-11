# app-server

## Setup
```shell
# Create an env file using the example
cp .env.example .env
```

We use valid ssl keys in development. They are not included in the repo and need to be obtained from an admin.  
- Obtain the `dev.talkbigly.com` private keys from an admin
- Add `fullchain.pem` and `privkey.pem` to `/keys`
- Map `dev.talkbigly.com` to `127.0.0.1` on your machine by editing your hosts file
