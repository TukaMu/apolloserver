import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { faker } from '@faker-js/faker';
import { hash, token, tests } from "@/libs";

import { AllUserType } from "@/dtos/enums";
import { UserModel } from "@/dtos/models";
import { LoginByUserUC, ILoginByUserUC } from "..";
import { IGetUserUC } from "@/useCases/user";

const getUserUCMock = mock<IGetUserUC>()
const hashMock = mock<typeof hash>()
const tokenMock = mock<typeof token>()
const loginByUserUCMock: ILoginByUserUC = new LoginByUserUC(
    getUserUCMock,
    hashMock,
    tokenMock
)

const userDataMock = mock<UserModel>({
    id: faker.string.nanoid(),
    login: 'login',
    name: 'name',
    password: 'password',
    type: [AllUserType.teacher]
})
const tokenData = 'token'

describe('login-by-user-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works', async () => {
        when(getUserUCMock.execute)
            .calledWith({ login: userDataMock.login })
            .mockResolvedValue(userDataMock)

        when(hashMock.validate)
            .calledWith({
                hash: 'password',
                value: 'password'
            })
            .mockResolvedValue(true)

        when(tokenMock.create)
            .calledWith({
                login: userDataMock.login,
                name: userDataMock.name,
                type: userDataMock.type
            })
            .mockResolvedValue(tokenData)

        const response = await loginByUserUCMock.execute({
            login: userDataMock.login,
            password: userDataMock.password
        })

        expect(response).toEqual({
            token: tokenData,
            type: userDataMock.type
        })
    })

    it('should throw - ' + `Usuário com login ${userDataMock.login} não foi encontrado!`, async () => {
        when(getUserUCMock.execute)
            .calledWith({ login: userDataMock.login })
            .mockResolvedValue(null)

        await tests.throwValidate({
            expectedError: `Usuário com login ${userDataMock.login} não foi encontrado!`,
            function: () => loginByUserUCMock.execute({
                login: userDataMock.login,
                password: userDataMock.password
            })
        })
    })
})