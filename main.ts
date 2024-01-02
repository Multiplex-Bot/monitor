import "https://deno.land/std@0.192.0/dotenv/load.ts";

import Embed from "./embed.ts";

function randomFooter(type: "failure" | "success") {
    const messages: string[] = JSON.parse(
        Deno.readTextFileSync(`./messages/${type}.json`)
    );

    const emoji = (() => {
        switch (type) {
            case "failure":
                return " 🪦";
            case "success":
                return " 👍";
        }
    })();

    return messages[Math.floor(Math.random() * messages.length)] + emoji;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getEnv(varName: string): string {
    const variable = Deno.env.get(varName);

    if (variable == undefined) {
        console.log(`FATAL ERROR: Env variable ${varName} is missing! ╯︿╰`);
        Deno.exit();
    }

    return variable;
}

async function getOnline(fails = 0): Promise<boolean> {
    try {
        const res = await fetch(`${getEnv("MULTIPLEX_ENDPOINT")}/health`);

        return res.status == 200;
    } catch {
        if (fails < 2) {
            await sleep(200);

            return await getOnline(fails + 1);
        }

        return false;
    }
}

async function executeWebhook(embed: Embed) {
    const res = await fetch(getEnv("WEBHOOK_URL"), {
        method: "POST",
        body: JSON.stringify({
            embeds: [embed],
            username: "Multiplex Uptime",
            avatar_url:
                "https://cdn.discordapp.com/avatars/1032459450415579249/4c2d41a2250b970c153f7bc418ec15bb.webp",
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (res.status !== 204) {
        console.log("WARNING: Probably failed to send webhook!");
    }
}

let isOnline = true;

while (true) {
    if (!(await getOnline())) {
        if (isOnline) {
            isOnline = false;

            await executeWebhook(
                new Embed()
                    .setTitle("Multiplex is down!")
                    .setDescription(
                        "If this was not announced and/or does not resolve itself soon, you should probably ping a dev."
                    )
                    .setThumbnail(
                        "https://cdn.discordapp.com/avatars/1032459450415579249/4c2d41a2250b970c153f7bc418ec15bb.webp"
                    )
                    .setColor(Number("0xc00017"))
                    .setFooter(randomFooter("failure"))
            );

            console.log("SADNESS: Multiplex is down!");
        }
    } else {
        if (!isOnline) {
            isOnline = true;

            await executeWebhook(
                new Embed()
                    .setTitle("Multiplex is up!")
                    .setDescription(
                        "Rejoice! The server has not burned down in a fire!"
                    )
                    .setThumbnail(
                        "https://cdn.discordapp.com/avatars/1032459450415579249/4c2d41a2250b970c153f7bc418ec15bb.webp"
                    )
                    .setColor(Number("0x219a54"))
                    .setFooter(randomFooter("success"))
            );

            console.log("HAPPINESS: Multiplex is up!");
        }
    }

    await sleep(2500);
}
