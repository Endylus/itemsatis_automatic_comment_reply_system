const fs = require('fs');
const path = require('path');
const Logger = require('@endylus/logger');
const log = new Logger();

function checkConfigFiles() {
    if (!fs.existsSync(path.join(process.cwd(), './config.json'))) {
        let configData = {
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
        fs.writeFileSync(path.join(process.cwd(), './config.json'), JSON.stringify(configData, null, 2));
        log.warn('Config.json file not found. A new one has been created. Please fill in the information in the config.json file.');
        process.exit(0);
    } else {
        const config = fs.readFileSync(path.join(process.cwd(), './config.json'), 'utf8');
        const parsedConfig = JSON.parse(config);
        const errorMsg =
            (parsedConfig.session_id === "Your session_id" || parsedConfig.session_id === "" || parsedConfig.session_id === " ") ?
                `Fill in the session_id value in the config.json file.` :
                (isNaN(parsedConfig.low_score)) ?
                    `low_score value in the config.json file must be a number.` :
                    (parsedConfig.low_score_setting.enabled && parsedConfig.low_score_setting.text === "" || parsedConfig.low_score_setting.text === " ") ?
                        `If low_score_setting is enabled, you must fill in the text value.` :
                        (parsedConfig.high_score_setting.enabled && parsedConfig.high_score_setting.text === "" || parsedConfig.high_score_setting.text === " ") ?
                            `If high_score_setting is enabled, you must fill in the text value.` :
                            (!parsedConfig.high_score_setting.enabled && !parsedConfig.low_score_setting.enabled) ?
                                `At least one of the high_score_setting or low_score_setting must be enabled.` :
                                null;

        if (errorMsg) {
            log.warn(errorMsg)
            process.exit(0);
        }
    }
}

module.exports = checkConfigFiles;