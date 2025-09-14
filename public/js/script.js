const form = document.getElementById("getuuid");
const output = document.getElementById("output");
const skinimage = document.getElementById("skinimage");

form.addEventListener("submit", async function(e) {
    e.preventDefault()
    const username = document.getElementById("username").value.trim();
    if(username !== "") {
        try {
            const response = await fetch(`/mc/${username}`)
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || "Unexpected server error");
            }

            console.log(data);
            output.innerText = data.uuid;
            skinimage.src = "https://crafatar.com/renders/body/" + data.uuid;
        } catch (error){
            console.error("Error: " + error.message);
            output.innerText = "Not found";
            skinimage.src = "images/error.png";
            alert("Player with this username doesnt exist");
        }
    }


})
