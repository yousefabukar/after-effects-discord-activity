# Discord Rich Presence for After Effects

Shows your current After Effects project in Discord status with the AE icon.

## Setup

### 1. Create a Discord Application

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**
2. Name it `Adobe After Effects` (this name won't show in your status — just for your reference)
3. Copy the **Application ID** from the General Information page

### 2. Upload the AE icon

1. In your application, go to **Rich Presence → Art Assets**
2. Click **Add Image(s)** and upload the After Effects logo
3. Name it exactly `ae_logo`
4. Save changes

You can extract the icon from `C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\AfterFX.exe` using a tool like [Resource Hacker](http://www.angusj.com/resourcehacker/), or use any AE PNG you have.

### 3. Configure

Copy `config.example.json` to `config.json` and fill in your Application ID:

```json
{
  "clientId": "123456789012345678",
  "pollInterval": 10000,
  "largeImageKey": "ae_logo",
  "largeImageText": "Adobe After Effects"
}
```

### 4. Run

```
node src/index.js
```

Keep it running in the background while you work in After Effects.

## What it shows

- **Details**: `Working on ProjectName`
- **State**: `After Effects 2024` / `Rendering: 45%` / `After Effects 2024 — Unsaved changes`
- **Large icon**: AE logo (uploaded by you in step 2)
- **Elapsed time**: resets when you switch projects

## Push to GitHub

```
git remote add origin https://github.com/YOUR_USERNAME/discord-presence-AE.git
git branch -M main
git push -u origin main
```
