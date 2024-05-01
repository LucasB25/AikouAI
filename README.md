<center><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Midjourney&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient" /></center>

[![Version][version-shield]](version-url)
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Support Server][support-shield]][support-server]
[![MIT License][license-shield]][license-url]
[![Run on Repl.it](https://repl.it/badge/github/LucasB25/Midjourney)](https://repl.it/github/LucasB25/Midjourney)
[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/LucasB25/Midjourney)

<!-- PROJECT LOGO -->
<br />

  <h1 align="center">Midjourney</h1>

  <p align="center">Midjourney and TypeScript.
    <br />
    <br />
        <a href="https://discord.gg/AhUJa2kdAr">Serveur Support</a>
    ·
    <a href="https://github.com/LucasB25/Midjourney/issues">Report Bug & Request Feature</a>
  </p>
</p>

# Midjourney

A Discord Bot that can generate text based on a given prompt using [Replicate](https://replicate.com/)

## 🔧 Requirements

-   Create Discord Bot and get token and client id from [Discord Developer Portal](https://discord.com/developers/applications)

-   Download [Node.js](https://nodejs.org/en/download/)

-   Create [Replicate](https://replicate.com/) account and get token

## 🚀 Installation from source

1. Clone the Midjourney repository:

```bash
git clone https://github.com/LucasB25/Midjourney.git
```

2. change the directory to Midjourney

```bash
cd Midjourney
```

3. Install the required packages:

```bash
npm i
```

4. Set up your environment variables:

Create a `.env` file in the root directory of your project with the following variables:
or you can use the [.env.example](https://raw.githubusercontent.com/LucasB25/Midjourney/main/.env.example) file

```bash
TOKEN= #Discord Bot Token
CLIENT_ID= #Discord Bot Client ID
COLOR=#00ff00
REPLICATE_TOKEN= #Replicate Token from https://replicate.com/signin
REPLICATE_MODEL=bytedance/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a
```

5. Run the bot:

```bash
npm start
```

## 📜 Contributing

Thank you for your interest in contributing to Midjourney! Here are some guidelines to follow when contributing:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Write clean and concise code that follows the established coding style.
3. Create detailed and thorough documentation for any new features or changes.
4. Write and run tests for your code.
5. Submit a pull request with your changes.

Your contribution will be reviewed by the project maintainers, and any necessary feedback or changes will be discussed with you. We appreciate your help in making Midjourney better!

## 👥 Contributors

Thanks goes to these wonderful people :

<a href="https://github.com/LucasB25/Midjourney/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LucasB25/Midjourney" alt="contributors" width="500" />
</a>

[version-shield]: https://img.shields.io/github/package-json/v/LucasB25/Midjourney?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/LucasB25/Midjourney.svg?style=for-the-badge
[contributors-url]: https://github.com/LucasB25/Midjourney/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/LucasB25/Midjourney.svg?style=for-the-badge
[forks-url]: https://github.com/LucasB25/Midjourney/network/members
[stars-shield]: https://img.shields.io/github/stars/LucasB25/Midjourney.svg?style=for-the-badge
[stars-url]: https://github.com/LucasB25/Midjourney/stargazers
[issues-shield]: https://img.shields.io/github/issues/LucasB25/Midjourney.svg?style=for-the-badge
[issues-url]: https://github.com/LucasB25/Midjourney/issues
[license-shield]: https://img.shields.io/github/license/LucasB25/Midjourney.svg?style=for-the-badge
[license-url]: https://github.com/LucasB25/Midjourney/blob/mains/LICENSE
[support-server]: https://discord.gg/AhUJa2kdAr
[support-shield]: https://img.shields.io/discord/942117923001098260.svg?style=for-the-badge&logo=discord&colorB=7289DA
