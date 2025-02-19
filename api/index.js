// api/index.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        if (req.url === '/today') {
            const today = new Date();
            const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const date = today.getDate();
            const day = days[today.getDay()];
            
            res.status(200).json({
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
        } else if (req.url === '/exam') {
            const examDate = new Date(2025, 5, 10); // 예시: 2025년 6월 10일 시험일
            const today = new Date();
            const diffTime = examDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            res.status(200).json({
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
            res.status(404).json({ error: 'Not Found' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
