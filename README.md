# after-effects-discord-activity

Discord Rich Presence for Adobe After Effects. Shows your current project, version, and elapsed time in your Discord status.

## Setup

**1. Create a Discord application**

Go to [discord.com/developers/applications](https://discord.com/developers/applications), create a new app, and copy the **Application ID**.

**2. Upload the AE icon**

Under **Rich Presence → Art Assets**, upload the After Effects logo and name it `ae_logo`.

**3. Configure**

Copy `config.example.json` to `config.json` and paste your Application ID:

```json
{
  "clientId": "YOUR_APPLICATION_ID"
}
```

**4. Install & run**

```
npm install
node src/index.js
```

Keep it running in the background while you work.
