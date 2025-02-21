export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // OPTIONS 요청이 오면 200 반환 (CORS preflight 해결)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // POST 요청만 허용
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // JSON 데이터 파싱 (Vercel에서 req.body가 undefined 되는 문제 해결)
        const body = typeof req.body === "object" ? req.body : JSON.parse(req.body);

        if (!body || !body.userRequest || !body.userRequest.utterance) {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const text = body.userRequest.utterance; // 카카오톡에서 보낸 메시지

        if (text === "오늘 날짜 알려줘") {
            const today = new Date();
            const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const date = today.getDate();
            const day = days[today.getDay()];

            return res.status(200).json({
                version: "2.0",
                template: {
                    outputs: [
                        {
                            simpleText: {
                                text: `오늘 날짜는 ${year}년 ${month}월 ${date}일 (${day})입니다! 📆`
                            }
                        }
                    ]
                }
            });
        } else {
            return res.status(200).json({
                version: "2.0",
                template: {
                    outputs: [
                        {
                            simpleText: {
                                text: "이해하지 못했어요. 다시 말씀해 주세요! 🤔"
                            }
                        }
                    ]
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
