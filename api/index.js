export default function handler(req, res) {
    // CORS 설정 추가
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // OPTIONS 요청 처리 (CORS Preflight 해결)
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // POST 요청만 처리
    if (req.method === "POST") {
        try {
            let body = req.body;

            // Vercel에서 req.body가 undefined일 경우 대비
            if (typeof req.body !== "object") {
                body = JSON.parse(req.body);
            }

            const text = body?.userRequest?.utterance || "";

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

    // 허용되지 않은 메소드 처리
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
