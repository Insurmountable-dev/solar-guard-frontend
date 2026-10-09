import {
    createHousehold
} from "./householdService";


import {
    createMeasurement
} from "./measurementService";


import {
    createAppliances
} from "./applianceService";


import {
    createAssessment as createAssessmentApi,
    getMyAssessments,
    getAssessmentsByHousehold,
    getAssessmentById,
    updateAssessmentStatus,
    getAssessmentAppliances,
    getAssessmentResult
} from "./solarAssessmentService";


import {
    calculateSolarSystem as calculateSolarSystemApi
} from "./solarCalculationService";


/*
|--------------------------------------------------------------------------
| HOUSEHOLD
|--------------------------------------------------------------------------
*/

export const saveHousehold =
    async (
        householdData
    ) => {

        const response =
            await createHousehold(
                householdData
            );


        const household =
            response.data ||
            response.household ||
            response;


        if (
            !household.household_id
        ) {

            throw new Error(
                "Household ID was not returned by the server."
            );

        }


        return household;

    };


/*
|--------------------------------------------------------------------------
| MEASUREMENT
|--------------------------------------------------------------------------
*/

export const saveMeasurement =
    async (
        householdId,
        measurementData
    ) => {

        const response =
            await createMeasurement(
                householdId,
                measurementData
            );


        return (
            response.data ||
            response.measurement ||
            response
        );

    };


/*
|--------------------------------------------------------------------------
| APPLIANCES
|--------------------------------------------------------------------------
*/

export const saveAppliances =
    async (
        householdId,
        appliances
    ) => {

        const response =
            await createAppliances(
                householdId,
                appliances
            );


        return (
            response.data ||
            response.appliances ||
            response
        );

    };


/*
|--------------------------------------------------------------------------
| CREATE ASSESSMENT
|--------------------------------------------------------------------------
*/

export const createAssessment =
    async (
        assessmentData
    ) => {

        return await createAssessmentApi(
            assessmentData
        );

    };


/*
|--------------------------------------------------------------------------
| SAVE DRAFT ASSESSMENT
|--------------------------------------------------------------------------
*/

export const saveAssessment =
    async (
        householdId
    ) => {

        const response =
            await createAssessmentApi({
                household_id:
                    householdId,

                assessment_status:
                    "draft"
            });


        const assessment =
            response.data ||
            response.assessment ||
            response;


        if (
            !assessment.assessment_id
        ) {

            throw new Error(
                "Assessment ID was not returned by the server."
            );

        }


        return assessment;

    };


/*
|--------------------------------------------------------------------------
| CALCULATE SOLAR SYSTEM
|--------------------------------------------------------------------------
*/

export const calculateSolarSystem =
    async (
        householdId,
        assessmentId
    ) => {

        const response =
            await calculateSolarSystemApi(
                householdId,
                assessmentId
            );


        return (
            response.data ||
            response.result ||
            response
        );

    };


/*
|--------------------------------------------------------------------------
| CALCULATE ASSESSMENT
|--------------------------------------------------------------------------
*/

export const calculateAssessment =
    async (
        householdId,
        assessmentId
    ) => {

        return await calculateSolarSystem(
            householdId,
            assessmentId
        );

    };


/*
|--------------------------------------------------------------------------
| RE-EXPORT ASSESSMENT FUNCTIONS
|--------------------------------------------------------------------------
*/

export {
    getMyAssessments,
    getAssessmentsByHousehold,
    getAssessmentById,
    updateAssessmentStatus,
    getAssessmentAppliances,
    getAssessmentResult
};