// api/chatbot.js
export default function handler(req, res) {
    // POST 요청인지 확인
    if (req.method === 'POST') {
        const message = req.body.userRequest.message.text; // 사용자가 보낸 메시지
        // 여기에 스킬 구현 코드 추가
        res.status(200).json({
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: `받은 메시지: ${message}`
                        }
                    }
                ]
            }
        });
    } else {
        // POST가 아닐 경우 405 오류 응답
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}