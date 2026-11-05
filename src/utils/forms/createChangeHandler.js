export function createChangeHandler(setFormData, callback) {


    return function handleChange(eventOrName, newValue) {
        let name;
        let value;

        if (typeof eventOrName === "string") {

            name = eventOrName;
            value = newValue;

        } else {
            const { name: fieldName, value: fieldValue, type, checked} = eventOrName.target;
            name = fieldName;
            value = type === "checkbox" ? checked : fieldValue;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (callback) {
            callback();
        }
    };
}