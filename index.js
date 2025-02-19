export default function handler(req, res) {
    // 1️⃣ [중요] POST 요청만 허용
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // 2️⃣ 현재 날짜 & 요일 가져오기
    const today = new Date();
    const date = today.toISOString().split("T")[0]; // YYYY-MM-DD 형식
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const day = days[today.getDay()]; // 요일 가져오기

    // 3️⃣ 카카오톡 챗봇 응답 JSON 형식으로 반환
    res.status(200).json({
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: `오늘은 ${date} (${day}) 입니다.`
                    }
                }
            ]
        }
    });
}
