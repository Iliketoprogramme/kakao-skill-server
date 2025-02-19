const express = require('express'); // Express 라이브러리 가져오기
const app = express(); // 앱 생성
app.use(express.json()); // JSON 데이터 처리를 위한 설정

// "오늘 날짜 알려줘" 요청 처리
app.post('/today', (req, res) => {
    const today = new Date();
    const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = days[today.getDay()];

    res.json({
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
});

// "시험 몇 일 남았어?" 요청 처리
app.post('/exam', (req, res) => {
    const examDate = new Date(2025, 5, 10); // 예시: 2025년 6월 10일 시험일
    const today = new Date();

    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.json({
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
});

// 서버 실행 (Vercel에서는 필요 없지만, 로컬 테스트 용도)
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));