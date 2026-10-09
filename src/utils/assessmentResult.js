// The API sometimes nests the payload one level deeper (result.result)
export const unwrapResult = (assessment) => {

    const raw = assessment?.result || {};

    return raw.result || raw;

};
