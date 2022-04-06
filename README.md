# eShare | File Sharing App

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

A file sharing service, where you can upload files and provide a download link for anyone on the internet by sharing the link 🔗 or via mail ✉️ which remains active for 24hours 🕙
This project will be very useful for sharing files instantly without any further hassle.

https://user-images.githubusercontent.com/55273506/151742997-87a53dac-7396-430f-a074-ba888f782a92.mov

## Setup:

1.  Clone the repository.
2.  Install dependencies.

        yarn install

3.  Setup environment variables in `.env` file.

        PORT=
        MONGO_CONNECTION_URL=
        APP_BASE_URL=
        SMTP_HOST=
        SMTP_PORT=
        MAIL_USER=
        MAIL_PASS=
        ALLOWED_HOSTS=

4.  Run the server.

        yarn start
