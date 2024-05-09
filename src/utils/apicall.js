const fetch = require('node-fetch');
const config = require("../../config.json")

async function checkCookie() {
    try {
        const response = await fetch("https://www.itemsatis.com/api/getBillingInformation", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded",
                cookie: `PHPSESSID=${config.session_id};`
            }
        });

        if(!response.ok){
            return {
                success: false,
                message: `Failed to fetch session_id information: ${response.status}`
            }
        }

        const datas = await response.json();

        if (!datas.success) {
            return {
                success: false,
                message: "Session_id Invalid. Please check your session_id"
            };
        } else {
            return {
                success: true,
                message: "session_id is valid."
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Failed to fetch session_id information: ${error.message}`
        };
    }
}


async function getReviews() {
    try {
        const response = await fetch("https://www.itemsatis.com/api/merchant/v1/getReviewsNoAnswer", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                cookie: `PHPSESSID=${config.session_id};`
            },
            body: JSON.stringify({ Page: 1, Limit: 10, OldLimit: 10 }),
        });

        if (!response.ok) {
            return {
                success: false,
                message: `Failed to fetch reviews: ${response.status}`
            }
        }

        const data = await response.json();

        if (!data.success || !data.data || !data.data.reviews || data.data.reviews.length === 0) return [];

        const reviews = data.data.reviews;
        return reviews.map(x => ({
            Id: x.Id,
            UserName: x.User.UserName,
            Message: x.Message,
            Title: x.Post.Title,
            Average: x.Points.Average
        }));
    } catch (error) {
        return {
            success: false,
            message: `Failed to fetch reviews: ${error.message}`
        }
    }
}

module.exports = { checkCookie, getReviews }