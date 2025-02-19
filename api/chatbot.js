// api/chatbot.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('Request Body:', req.body); // 요청 본문 로그
            const message = req.body.userRequest.message.text; // 사용자가 보낸 메시지
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
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
