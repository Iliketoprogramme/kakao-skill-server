// api/index.js
export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // OPTIONS 요청이 오면 200 반환 (CORS preflight 해결)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // POST 요청 확인
    if (req.method === 'POST') {
        try {
            // Body 파싱
            const body = req.body;
            if (!body || !body.userRequest || !body.userRequest.utterance) {
                return res.status(400).json({ error: "Invalid request body" });
            }

            const text = body.userRequest.utterance; // 카카오톡에서 보낸 메시지 텍스트

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
            } else if (text === "시험 몇일 남았어?") {
                const examDate = new Date(2025, 5, 10); // 2025년 6월 10일
                const today = new Date();
                const diffTime = examDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return res.status(200).json({
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: `시험까지 ${diffDays}일 남았습니다! 📚`
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
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
