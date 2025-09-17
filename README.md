# Minecraft Skin Search

A small web app to search Minecraft usernames and view their current skins using the Mojang API.

## Features
- Search by Minecraft username
- Resolve username → UUID
- Display current skin (and cape if available)

## APIs Used
- **Username → UUID:**  
  `https://api.mojang.com/users/profiles/minecraft/{username}`
- **UUID → Profile & Textures:**  
  `https://sessionserver.mojang.com/session/minecraft/profile/{uuid}`

## Run Locally
```bash
# install dependencies
npm install

# start dev server
npm start
