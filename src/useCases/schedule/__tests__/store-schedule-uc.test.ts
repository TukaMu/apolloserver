import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { faker } from '@faker-js/faker';
import { mongodb, tests } from "@/libs";

import { AllUserType } from "@/dtos/enums";
import { ScheduleModel, UserModel } from "@/dtos/models";
import { StoreScheduleUC, IStoreScheduleUC } from "..";
import { IFetchUsersUC } from "@/useCases/user";

const fetchUsersMock = mock<IFetchUsersUC>()
const mongodbMock = mock<typeof mongodb>()
const storeScheduleUCMock: IStoreScheduleUC = new StoreScheduleUC(
    fetchUsersMock,
    mongodbMock
)

const customerId = faker.string.nanoid()
const teacherId = faker.string.nanoid()
const scheduleData = {
    customerId,
    endsAt: new Date(),
    startsAt: new Date(),
    location: 'location',
    subject: 'subject',
    teacherId
}
const scheduleMock = mock<ScheduleModel>(scheduleData)
const usersMock = mock<UserModel[]>([
    {
        id: customerId,
        type: [AllUserType.customer]
    },
    {
        id: teacherId,
        type: [AllUserType.teacher]
    }
])

describe('store-schedule-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works', async () => {
        when(fetchUsersMock.execute)
            .calledWith({
                id: [customerId, teacherId]
            })
            .mockResolvedValue(usersMock)

        when(mongodbMock.run)
            .calledWith({
                action: 'store',
                collection: 'schedules',
                data: scheduleData
            })
            .mockResolvedValue(scheduleMock)

        const response = await storeScheduleUCMock.execute(scheduleData)

        expect(response).toEqual(scheduleMock)
    })

    it('should throw - Os dois usuários são iguas!', async () => {
        await tests.throwValidate({
            expectedError: 'Os dois usuários são iguas!',
            function: () => storeScheduleUCMock.execute({
                ...scheduleData,
                teacherId: customerId
            })
        })
    })

    it('should throw - Algum usuário não foi encontrado!', async () => {
        when(fetchUsersMock.execute)
            .calledWith({
                id: [customerId, teacherId]
            })
            .mockResolvedValue([
                {
                    ...usersMock[0],
                    id: faker.string.nanoid()
                },
                usersMock[1]
            ])

        await tests.throwValidate({
            expectedError: 'Algum usuário não foi encontrado!',
            function: () => storeScheduleUCMock.execute(scheduleData)
        })
    })

    it('should throw - Algum usuário não possui um cargo válido!', async () => {
        when(fetchUsersMock.execute)
            .calledWith({
                id: [customerId, teacherId]
            })
            .mockResolvedValue([
                {
                    ...usersMock[0],
                    type: [AllUserType.teacher]
                },
                usersMock[1]
            ])

        await tests.throwValidate({
            expectedError: 'Algum usuário não possui um cargo válido!',
            function: () => storeScheduleUCMock.execute(scheduleData)
        })
    })
})