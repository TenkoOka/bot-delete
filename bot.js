const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const schedule = require('node-schedule');

// Créez une nouvelle instance du client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Remplacez 'YOUR_DISCORD_TOKEN' par le token de votre bot
const token = 'MTMwNTE2NzQxNTI4OTU3NzU1Mg.GasBk1.EhYEjjxrwwfpL_dBoPJpnmXERuKBf6W-IPCpBw';

// Remplacez 'YOUR_CHANNEL_ID' par l'ID de votre canal Discord
const channelId = '1304461111298494534';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Planifiez la suppression des messages à 22h15 chaque jour
    schedule.scheduleJob('50 19 * * *', async () => {
        try {
            const channel = await client.channels.fetch(channelId);
            console.log(`Channel fetched: ${channel.id}`);

            if (channel.type === ChannelType.GuildText) {
                console.log('Channel type is GuildText.');
                let fetched;
                do {
                    fetched = await channel.messages.fetch({ limit: 100 });
                    console.log(`Fetched ${fetched.size} messages`);
                    await channel.bulkDelete(fetched).catch(error => {
                        console.error('Failed to delete messages:', error);
                    });
                } while (fetched.size >= 2);
                console.log('Messages deleted at 22:15');
            } else {
                console.error('Channel is not a text channel.');
            }
        } catch (error) {
            console.error('Error fetching channel or deleting messages:', error);
        }
    });
});

// Connexion du bot
client.login(token);

