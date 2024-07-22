<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=AikouAI&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Support Server][support-shield]][support-server]
[![MIT License][license-shield]][license-url]
[![Run on Repl.it](https://repl.it/badge/github/LucasB25/AikouAI)](https://repl.it/github/LucasB25/AikouAI)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/LucasB25/AikouAI)

<!-- PROJECT LOGO -->
<br />

  <h1 align="center">AikouAI</h1>

  <p align="center">AikouAI and TypeScript.
    <br />
    <br />
        <a href="https://discord.gg/AhUJa2kdAr">Server Support</a>
    ·
    <a href="https://github.com/LucasB25/AikouAI/issues">Report Bug & Request Feature</a>
  </p>
</p>

# AikouAI

AikouAI is a versatile Discord bot that now also offers text-to-text capabilities through its integration with Google Gemini, an advanced text generation model platform. It automatically responds to specific commands on Discord, generating text or images based on the nature of users' requests.

## 🔧 Requirements

-   Create Discord Bot and get token and client id from [Discord Developer Portal](https://discord.com/developers/applications)

-   Download [Node.js](https://nodejs.org/en/download/)

-   Create [Replicate](https://replicate.com/) account and get token

-   Create [Gemini](https://makersuite.google.com/) account and get token

## 🚀 Installation from source

1. Clone the AikouAI repository:

```bash
git clone https://github.com/LucasB25/AikouAI.git
```

2. change the directory to AikouAI

```bash
cd AikouAI
```

3. Install the required packages:

```bash
npm i
or
yarn i
```

4. Set up your environment variables:

Create a `.env` file in the root directory of your project with the following variables:
or you can use the [.env.example](https://raw.githubusercontent.com/LucasB25/AikouAI/main/.env.example) file

```bash
TOKEN= #Discord Bot Token
CLIENT_ID= #Discord Bot Client ID
ACTIVITY=/help
DATABASE_URL= "" #Your database url (if sqlite then you can leave it blank)

#ForumChannels
FORUM_CHANNELS= ["",""] #Forum Channels: An array of forum channel IDs where the bot will operate. Add your forum channel IDs here.
TAGS_NAMES= ["",""] #Tags Names: An array of tag names that will be applied to threads created in the specified forum channels.

#For REPLICATE
REPLICATE_TOKEN= #Replicate Token from https://replicate.com/signin
REPLICATE_MODEL=bytedance/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a

#For GEMINI
GEMINI_KEY= #GEMINI key from https://makersuite.google.com/
GEMINI_MODEL=gemini-1.5-flash
```

5. generate the prisma client

```bash
npm run prisma:push
```

Run the migrations (Only if you want to migrate your database)

```bash
npm run prisma:migrate
```

6. Run the bot:

```bash
npm start
```

## 📜 Contributing

Thank you for your interest in contributing to AikouAI! Here are some guidelines to follow when contributing:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write clean and concise code that follows the established coding style.
3. Create detailed and thorough documentation for any new features or changes.
4. Write and run tests for your code.
5. Submit a pull request with your changes.

Your contribution will be reviewed by the project maintainers, and any necessary feedback or changes will be discussed with you. We appreciate your help in making AikouAI better!

## 👥 Contributors

Thanks goes to these wonderful people :

<a href="https://github.com/LucasB25/AikouAI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LucasB25/AikouAI" />
</a>

[version-shield]: https://img.shields.io/github/package-json/v/LucasB25/AikouAI?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/LucasB25/AikouAI.svg?style=for-the-badge
[contributors-url]: https://github.com/LucasB25/AikouAI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LucasB25/AikouAI.svg?style=for-the-badge
[forks-url]: https://github.com/LucasB25/AikouAI/network/members
[stars-shield]: https://img.shields.io/github/stars/LucasB25/AikouAI.svg?style=for-the-badge
[stars-url]: https://github.com/LucasB25/AikouAI/stargazers
[issues-shield]: https://img.shields.io/github/issues/LucasB25/AikouAI.svg?style=for-the-badge
[issues-url]: https://github.com/LucasB25/AikouAI/issues
[license-shield]: https://img.shields.io/github/license/LucasB25/AikouAI.svg?style=for-the-badge
[license-url]: https://github.com/LucasB25/AikouAI/blob/mains/LICENSE
[support-server]: https://discord.gg/AhUJa2kdAr
[support-shield]: https://img.shields.io/discord/942117923001098260.svg?style=for-the-badge&logo=discord&colorB=7289DA
