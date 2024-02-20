const baseUrl = 'http://localhost:3000';
const kakaoAuthPortalUrl = 'https://accounts.kakao.com';
const kakaoSocialLoginButton = '[data-cy=social_login]';

interface UserData {
    kakaoLoginEmail: string;
    kakaoLoginPassword: string;
}

describe('카카오 소셜 로그인 테스트', () => {
    it('카카오 로그인 인증 포털 이동, 로그인 진행. 다시 홈으로 이동', () => {
        cy.visit(baseUrl);

        cy.get(kakaoSocialLoginButton).click();

        cy.origin('https://accounts.kakao.com', () => {
            cy.url().should('include', 'https://accounts.kakao.com/login');

            cy.fixture('user.json').then((user: UserData) => {
                cy.get('#loginId--1').type(user.kakaoLoginEmail);
                cy.get('#password--2').type(user.kakaoLoginPassword);
                // cy.get('#loginId--1').type(Cypress.env('kakaoLoginEmail'));
                // cy.get('#password--2').type(Cypress.env('kakaoLoginPassword'));
                cy.get('.confirm_btn .submit').click();
            });
        });

        cy.url().should('include', `${baseUrl}`);
    });
});
