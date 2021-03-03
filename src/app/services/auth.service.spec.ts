import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(async () => {
        TestBed.configureTestingModule({ providers: [AuthService]});
        service = TestBed.inject(AuthService);
    });

    it('should use AuthService', () => {
        service = TestBed.inject(AuthService);
        expect(service.testUser.username).toBe('user@gmail.com');
        expect(service.testUser.password).toBe('123456');
        expect(service.testUser.token).toBe('testToken');
    });

    it('test getToken', () => {
        let token = service.getToken();
        expect(token).toBe(null);
    });

    it('test isLoggedIn', () => {
        let token2 = service.isLoggedIn();
        // console.log(token);
        expect(token2).toBe(null);
    });

    it('test login1', async () => {
        let testUser = { username: 'user@gmail.com', password: '123456', token: 'testToken' };
        service.login(testUser.username, testUser.password).subscribe((result) => {
            expect(result.username).toBe(testUser.username);
            expect(result.token).toBe('testToken');
        });
    });

    it('test login2', async () => {
        let testUser = { username: 'user@email.com', password: 'pass1234', token: 'testToken' };
        service.login(testUser.username, testUser.password).subscribe((result) => {
            expect(result.username).toBe(testUser.username);
            expect(result.token).toBe('testToken');
        });
    });

    it('test login error', async () => {
        let testUser = { username: 'user', password: 'pass1234', token: 'testToken' };
        service.login(testUser.username, testUser.password).subscribe((result) => {
            expect(result.error).toBe('invalid user');
        });
    });
});