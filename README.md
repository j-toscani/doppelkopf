# doppelkopf

This Repo uses [Devcontainers](https://containers.dev/). When using VSCode, your IDE should ask you to install an extension. Just follow the recommended steps and you will have a fully functioning environment in minutes.

If you are not using an IDE which supports devcontainers (e.g. Zed) you will need to install [Bun](https://bun.sh/docs/installation) as this project uses it as it´s runtime.

You will then have to install the package dependencies with the following commands:

```bash
cd ./packages/client
bun install

cd ../server
bun install
```

To run the projects, move into the root folder of the project and run the following commands ins seperate terminal windows:

```bash
bun run server:dev
bun run client:dev
```

# Disclaimer

As doppelkopf is a pretty complex game it will take quite a while to build. Hence, I will focus to create a minimal version first.

- [ ] callouts (90, 60, 30 etc.)
- [ ] changing gameorders (solo, hochzeit etc.)
- [ ] ruleset config bascic (with 9 vs bar vs tournament ruleset)
- [ ] ruleset config custom (add or remove schweinchen etc.)
- [ ] chat functionality

This project was created using `bun init` in bun v1.0.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
