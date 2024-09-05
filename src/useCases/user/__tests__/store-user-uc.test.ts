import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { hash, mongodb, tests } from "@/libs";

import { AllUserType, UserType } from "@/dtos/enums";
import { UserModel } from "@/dtos/models";
import { StoreUserUC, IStoreUserUC, IGetUserUC, IStoreUserUCArgs } from "..";

const getUserUCMock = mock<IGetUserUC>()
const mongodbMock = mock<typeof mongodb>()
const hashMock = mock<typeof hash>()
const storeUserUCMock: IStoreUserUC = new StoreUserUC(
    getUserUCMock,
    hashMock,
    mongodbMock
)

const inputData = mock<IStoreUserUCArgs>({
    login: 'login',
    name: 'name',
    password: 'password',
    type: [UserType.customer]
})
const hashResponse = 'hash'
const usersMock = mock<UserModel>({
    ...inputData,
    password: hashResponse,
    type: [AllUserType.customer]
})

describe('store-user-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works', async () => {
        when(getUserUCMock.execute)
            .calledWith({
                login: inputData.login
            })
            .mockResolvedValue(null)

        when(hashMock.create)
            .calledWith({
                value: inputData.password
            })
            .mockResolvedValue(hashResponse)

        when(mongodbMock.run)
            .calledWith({
                action: 'store',
                collection: 'users',
                data: {
                    ...inputData,
                    password: hashResponse
                }
            })
            .mockResolvedValue(usersMock)

        const response = await storeUserUCMock.execute(inputData)

        expect(response).toEqual(_.omit(usersMock, 'password'))
    })

    it('should throw - ' + `Usuário com login ${inputData.login} já existe!`, async () => {
        when(getUserUCMock.execute)
            .calledWith({
                login: inputData.login
            })
            .mockResolvedValue(usersMock)

        await tests.throwValidate({
            expectedError: `Usuário com login ${inputData.login} já existe!`,
            function: () => storeUserUCMock.execute(inputData)
        })
    })
})