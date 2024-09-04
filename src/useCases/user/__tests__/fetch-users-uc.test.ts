import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { faker } from '@faker-js/faker';
import { mongodb } from "@/libs";

import { UserModel } from "@/dtos/models";
import { FetchUsersUC, IFetchUsersUC } from "..";

const mongodbMock = mock<typeof mongodb>()
const fetchUsersUCCMock: IFetchUsersUC = new FetchUsersUC(
    mongodbMock
)

const customerId = faker.string.nanoid()
const teacherId = faker.string.nanoid()
const usersMock = mock<UserModel[]>([
    {
        id: customerId,
    },
    {
        id: teacherId,
    }
])

describe('fetch-users-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works - valores existentes', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'fetch',
                collection: 'users',
                data: {
                    "$and": [{ id: { "$in": [customerId, teacherId] } }]
                }
            })
            .mockResolvedValue(usersMock)

        const response = await fetchUsersUCCMock.execute({
            id: [customerId, teacherId]
        })

        expect(response).toEqual(usersMock)
    })

    it('should works - valores não existentes', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'fetch',
                collection: 'users',
                data: {
                    "$and": [{ id: { "$in": [customerId, teacherId] } }]
                }
            })
            .mockResolvedValue([])

        const response = await fetchUsersUCCMock.execute({
            id: [customerId, teacherId]
        })

        expect(response).toEqual([])
    })
})