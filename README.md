# [averagenerdpost.com](https://www.averagenerdpost.com)

This is the source code for the website. It is build using [eleventy](https://www.11ty.dev/) and is provided as is if you want to take a look at how it works. If you feel there is anything that is not reflective of the policies posted on my website, please let me know and I will make sure to correct it.

# Steps to Download and Run

## Pre-requisites

**1. Git**  
Download it for [Windows](https://git-scm.com/downloads/win), [MacOS](https://git-scm.com/downloads/mac) or [Linux](https://git-scm.com/downloads/linux) and then follow the [first-time setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) guide.

**2. Node.js**  
Install [Node.js](https://nodejs.org/en/download) for your OS.

## Build Steps
Open a terminal and follow the steps below:

Clone the project to a directory in your working directory and then cd into it: 
```bash
git clone https://github.com/preppie22/averagenerdpost.com.git
cd averagenerdpost.com
```

Install Node.js packages:
```bash
npm install
```

Build and run locally:
```bash 
npm run serve
```
Now open a browser and type in `localhost:8080` in the address bar to see the webpage. Once you're done, go back to the terminal where you ran the above command and press **Ctrl+C** (Windows/Linux) or **^C** (MacOS) to stop the dev server.

If you want to build the website to a folder without testing it:
```bash
npm run build
```

# License

This source code is licensed under [GPL-3.0-or-later](LICENSE.md) and all content in `/src/contents` is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Images that are considered "original work" are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) and other images used across the website are bound by their respective licenses.
