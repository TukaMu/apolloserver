import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { faker } from '@faker-js/faker';
import { mongodb } from "@/libs";

import { UserModel } from "@/dtos/models";
import { GetUserUC, IGetUserUC } from "..";

const mongodbMock = mock<typeof mongodb>()
const getUserUCMock: IGetUserUC = new GetUserUC(mongodbMock)

const customerId = faker.string.nanoid()
const usersMock = mock<UserModel>({ id: customerId })

describe('get-user-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works - valor existente', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'get',
                collection: 'users',
                data: {
                    id: customerId
                }
            })
            .mockResolvedValue(usersMock)

        const response = await getUserUCMock.execute({
            id: customerId
        })

        expect(response).toEqual(usersMock)
    })

    it('should works - valor não existente', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'get',
                collection: 'users',
                data: {
                    id: customerId
                }
            })
            .mockResolvedValue(null)

        const response = await getUserUCMock.execute({
            id: customerId
        })

        expect(response).toEqual(null)
    })
})