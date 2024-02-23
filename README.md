# doppelkopf

To install dependencies:

```bash
cd ./client
bun install

cd ../server
bun install
```

You will need a running mongodb to connect to. You can start one using Docker with the follwoing command:

```
docker run --name <name of your container> -p 27017:27017 --expose 27017 -v $(pwd)/data:/bitname/mongodb -e MONGODB_ROOT_PASSWORD=123 -e MONGODB_USERNAME=<user name> -e MONGODB_PASSWORD=<password> -e MONGODB_DATABASE=<name of db> bitnami/mongodb:latest
```
# Disclaimer

As doppelkopf is a pretty complex game it will take quite a while to build. Hence, I will focus to create a minimal version first.

- [ ] callouts (90, 60, 30 etc.)
- [ ] changing gameorders (solo, hochzeit etc.)
- [ ] ruleset config bascic (with 9 vs bar vs tournament ruleset)
- [ ] ruleset config custom (add or remove schweinchen etc.)
- [ ] chat functionality

This project was created using `bun init` in bun v1.0.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
