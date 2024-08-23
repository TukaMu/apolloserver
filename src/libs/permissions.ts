
import _ from 'lodash'
import { AllUserType } from '../dtos/enums/user-type'

interface validateParams {
    requiredPermissions: AllUserType[],
    permissions: AllUserType[],
    endPoint: string;
    function: Function
}

async function validate(params: validateParams) {
    try {
        if (!_.size(_.intersection([...params.requiredPermissions, AllUserType.root], params.permissions))) {
            throw new Error(`Sem permissão para acessar o endPoint ${params.endPoint}!`)
        }

        return params.function()
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export default {
    validate
}