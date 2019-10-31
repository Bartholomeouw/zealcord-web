const { RichEmbed } = require("discord.js");
const { exec } = require("child_process");

async function execute(client, message, args, color) {
    if (!client.owners.includes(message.author.id)) return undefined;
    if (!args[0]) {
        return message.channel.send("Please provide the **Bash Commands** too!");
    };
    /* try {
        if (!args.length) return message.channel.send(this.help.usage, {
            code: "ini"
        });
        exec(args.join(" "), (error, output) => {
            if (!error) return message.channel.send(output, {
                code: "diff"
            });
            return message.channel.send(error, {
                code: "ini"
            });
        });
    } catch (err) {
        return message.channel.send(err.stack, {
            code: "ini"
        });
    } */
    const m = await message.channel.send(`❯_ ${  args.join(" ")}`);
    exec(`${args.join(" ")}`, async (e, stdout, stderr) => {
        if (e) {
            return m.edit(`\`\`\`js\n${e.message}\n\`\`\``);
        }

        if (!stdout && !stderr) {
            return message.channel.send("<:yes:435160984521408512> Completed without result.");
        }

        if (stdout) {
            const pages = paginate(stdout, 1950);
            for (const page of pages) {
                await message.channel.send(`\`\`\`ini\n${page}\`\`\``);
            }
        }

        if (stderr) {
            const pages = paginate(stderr, 1950);
            for (const page of pages) {
                await message.channel.send(`\`\`\`ini\n${page}\`\`\``);
            }
        }
    });
};

function paginate(text, limit = 2000) {
    const lines = text.trim().split("\n");
    const pages = [];

    let chunk = "";
    for (const line of lines) {
        if (chunk.length + line.length > limit && chunk.length > 0) {
            pages.push(chunk);
            chunk = "";
        }

        if (line.length > limit) {
            const lineChunks = line.length / limit;
            for (let i = 0; i < lineChunks; i++) {
                const start = i * limit;
                const end = start + limit;
                pages.push(line.slice(start, end));
            }
        } else {
            chunk += `${line}\n`;
        }
    }

    if (chunk.length > 0) {
        pages.push(chunk);
    }

    return pages;
}

this.conf = {
    aliases: ["ex", "execute", "$"],
    cooldown: 5
}

this.help = {
    name: "exec",
    description: "Execute the Bash codes.",
    usage: "exec <command>"
}

this.run = execute;