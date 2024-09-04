interface throwValidateParams {
    function: Function
    expectedError: string
}

class Tests {
    async throwValidate(params: throwValidateParams) {
        let expectedError = 'Era para ter o erro correto!'
        try {
            await params.function();
        } catch (error) {
            if (error instanceof Error) {
                expectedError = error.message
            }
        }

        expect(expectedError).toBe(params.expectedError);
    }
}

export default new Tests();