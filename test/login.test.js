import request from 'supertest';
import app from '../src/server.js'; // 서버 객체 import

//npm run test 로 테스트 가능
describe('로그인 API 테스트', () => {
    it('성공: 올바른 아이디와 비밀번호로 로그인', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ user_id: 'user1', user_pwd: 'pass1' });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user.id).toBe('user1');
    });

    it('실패: 잘못된 아이디나 비밀번호', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ user_id: 'wrong', user_pwd: 'pass1' });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });
});