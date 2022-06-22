const REQUIRE = 'This field is required!';

export const commentValidation = values => {
    const error = {};
    if(values.comment){
        error.comment = REQUIRE;
    }
    return error;
}