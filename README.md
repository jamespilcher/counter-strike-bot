# counter-strike-bot

Play Counter-Strike voice commands in your discord server!

## Development Guide

This guide was created using Ubuntu 24.04, though other versions/distros should be okay.

### Prerequisites:

Node.js

```
sudo apt install nodejs
```

npm

```
sudo apt install npm
```

Install ffmpeg for audio playback

```
sudo apt install ffmpeg
```

Install dependencies

```
npm install
```

~~[Install `ngrok` for local testing](https://ngrok.com/download)~~

~~via apt:~~

```
 curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
```

~~[NGROK] Create a sign up and install your auth token~~

- ~~Sign up for an account: https://dashboard.ngrok.com/signup~~
- ~~Install your authtoken: https://dashboard.ngrok.com/get-started/your-authtoken~~

Create `config.json` and place in root of directory. Get the tokens from Discord developer portal.

```
{
	"token": <"APPLICATION_TOKEN">,
	"clientId": <"DISCORD_APPLICATION_ID">,
	"guildId": <"TEST_SERVER_ID">
}
```
