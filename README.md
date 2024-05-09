# ItemSatis Automatic Review Response System

This project is a script that automatically responds to the evaluations received on ItemSatış.

## Configuration
1. **Node.js Installation:** As a first step, Node.js must be installed on your computer. If Node.js is not installed on your computer, you can download and install the latest version of Node.js from [this link](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi).
2. **Cookie-Editor Extension:** Add the Cookie-Editor extension to your browser. You can download the extension from [here](https://chromewebstore.google.com/detail/hlkenndednhfkekhgcdicdfddnkalmdm).
3. **Obtaining Session_id:** You need to use the Cookie-Editor extension to manage the cookies required for the project to work. You can learn how to use it by watching the video below:

https://github.com/Endylus/itemsatis_automatic_comment_reply_system/assets/122468378/07edd629-7033-44b6-a0ab-bf78674e032b


4. Configure the program by editing the `config.json` file. An example configuration is as follows:

```json
{
    "session_id": "Your session_id",
    "low_score": 7,
    "low_score_setting": {
        "enabled": true,
        "text": "Yaşamış olduğunuz sorunu sohbet kısmından yazarsanız, size yardımcı olmaktan memnuniyet duyarız."
    },
    "high_score_setting": {
        "enabled": true,
        "text": "Bizi tercih ettiğiniz için teşekkür ederiz! Yardıma ihtiyacınız olursa her zaman buradayız."
    }
}
```
- `session_id`: Your ItemSatış account session_id.
- `low_score`: A value set for comments receiving equal or lower scores.
- `low_score_setting`: Automatic response setting for low-rated comments.
- `high_score_setting`: Automatic response setting for high-rated comments.


## Usage

1. Install the required packages:

```
npm install
```

2. Run the script:

```
npm start
```

## Disclaimer of Liability
No responsibility is accepted for any problems that may arise from the use of this project and its content. Users are responsible for configuring and using the project on their own systems. Users should take necessary precautions and follow configuration instructions correctly before using the project.

## Support

If you have any questions, feel free to join my Discord server: [https://discord.gg/dctoken](https://discord.gg/dctoken)
