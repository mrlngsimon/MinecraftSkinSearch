import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
    res.send("Nothing's here")
});


app.get("/mc/:name", async(req, res) => {
    const username = req.params.name;

    try {
        const uuidResponse = await fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`);
        if(!uuidResponse.ok) throw new Error("Player not found!");

        const uuidData = await uuidResponse.json();
        console.log("Got UUID: " + uuidData.id);

        const skinResponse = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuidData.id}`);
        if(!skinResponse.ok) throw new Error("Player skin not found!");
        const skinResponseJSON = await skinResponse.json();
        

        const base64skinValue = skinResponseJSON.properties.find(p => p.name === "textures").value;
        const decoded = Buffer.from(base64skinValue, "base64").toString("utf8");
        const skinData = JSON.parse(decoded);
        console.log("Got skin Data!" + "\n");

        res.json({ uuid: uuidData.id, url: skinData.textures.SKIN.url });
    } catch(error) {
        res.status(500).json({error: error.message})
    }

});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});
