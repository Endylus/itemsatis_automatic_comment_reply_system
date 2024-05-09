const fetch = require('node-fetch');
const config = require('../../config.json');
const Logger = require('@endylus/logger');
const log = new Logger();

const answerReview = async (review) => {
    const { Average, UserName, Id } = review;
    let answer = getAnswer(Average);
    if (!answer) {
        log.info(`No answer for review by ${UserName} (${Id})`);
        return;
    }

    try {
        const response = await fetch("https://www.itemsatis.com/api/answerReview", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "*/*",
                "X-Requested-With": "XMLHttpRequest",
                "Cookie": `PHPSESSID=${config.phpsessid}`
            },
            body: `commentID=${Id}&Yanit=${answer}`
        });

        if (!response.ok) {
            log.error(`Failed to comment on review by ${UserName} (${Id}): ${response.status}`)
            return;
        }

        const data = await response.json();
        if (!data.success) {
            log.error(`Failed to comment on review by ${UserName} (${Id}): Server response indicates failure`);
            return;
        }

        log.info(`Successfully commented on review by ${UserName} (${Id}) with: ${answer}`);
    } catch (error) {
        log.error(`An error occurred while commenting on the review by ${UserName} (${Id}): ${error.message}`);
    }
};

module.exports = answerReview;

function getAnswer(average) {
    return (average <= config.low_score && config.low_score_setting.enabled)
        ? config.low_score_setting.text
        : (config.high_score_setting.enabled)
            ? config.high_score_setting.text
            : "";
}