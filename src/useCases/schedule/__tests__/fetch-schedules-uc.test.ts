import _ from "lodash";
import { mock } from 'jest-mock-extended'
import { verifyAllWhenMocksCalled, when } from 'jest-when'
import { faker } from '@faker-js/faker';
import { mongodb } from "@/libs";

import { ScheduleModel } from "@/dtos/models";
import { FetchSchedulesUC, IFetchSchedulesUC } from "..";

const mongodbMock = mock<typeof mongodb>()
const fetchSchedulesUCMock: IFetchSchedulesUC = new FetchSchedulesUC(mongodbMock)

const customerId = faker.string.nanoid()
const schedulesMock = mock<ScheduleModel[]>([
    {
        customerId,
        teacherId: faker.string.nanoid()
    },
    {
        customerId,
        teacherId: faker.string.nanoid()
    }
])

describe('fetch-schedules-uc => execute', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        verifyAllWhenMocksCalled()
    })

    it('should works - customerId existente', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'fetch',
                collection: 'schedules',
                data: {
                    customerId
                }
            })
            .mockResolvedValue(schedulesMock)

        const response = await fetchSchedulesUCMock.execute({
            customerId
        })

        expect(response).toEqual(schedulesMock)
    })

    it('should works - customerId não existente', async () => {
        when(mongodbMock.run)
            .calledWith({
                action: 'fetch',
                collection: 'schedules',
                data: {
                    customerId
                }
            })
            .mockResolvedValue([])

        const response = await fetchSchedulesUCMock.execute({
            customerId
        })

        expect(response).toEqual([])
    })
})