const USER_ID = "1387525695173038212";
const statusColors = {
    online: "#23a55a",
    idle: "#f0b232",
    dnd: "#f23f43",
    offline: "#80848e"
};

async function fetchLanyard() {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const data = await res.json();
    return data.data;
}

document.getElementById("discord-btn").addEventListener("click", async () => {
    const data = await fetchLanyard();
    const overlay = document.getElementById("discord-overlay");

    document.getElementById("discord-avatar").src = 
        `https://cdn.discordapp.com/avatars/${USER_ID}/${data.discord_user.avatar}.png?size=128`;
    document.getElementById("discord-username").textContent = data.discord_user.username;
    document.getElementById("discord-status-dot").style.background = statusColors[data.discord_status] || statusColors.offline;

    const customStatus = data.activities?.find(a => a.type === 4);
    document.getElementById("discord-custom-status").textContent = customStatus?.state || "";

    const activity = data.activities?.find(a => a.type === 0);
    document.getElementById("discord-activity").textContent = activity ? `Playing ${activity.name}` : "";

    overlay.style.display = "flex";
});

document.getElementById("discord-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("discord-overlay")) {
        document.getElementById("discord-overlay").style.display = "none";
    }
});