
export const initialSkills = []

const ADD = "ADD";
const CLEAR = "CLEAR"

/** 
 *  Reducer for skills
 * @function skillsReducer
 * @param  {Array<Object>} state - list of skill
 * @param  {object} action - action to do with skill list
 * @returns {Array<Object>} - new skill list
 */
export function skillsReducer(state, action) {
    switch (action.type) {
        case ADD:
            return [...state, action.payload.skill]
        case CLEAR:
            return initialSkills
        default:
            return state;
    }
}
/**
 *  Action for add a skill
 * @function addSkillAction
 * @param  {string} name - name of skill
 * @param  {number} year - experience in year of skill
 * @param  {string} proficiency - proficiency of skill (beginner / intermediate / advanced) (allow null)
 * @returns {{type:string, payload:{skill:{name:string, year:number, proficiency:string}}}} - action object of add skill
 */
export function addSkillAction(name, year, proficiency) {
    return {
        type: ADD,
        payload: {
            skill: {
                "name": name,
                "year": year,
                "proficiency": proficiency
            }
        }
    }
};

/** 
 * Action for clear out current skill list
 * @function clearSkillsAction
 * @returns {{type:"CLEAR"}}
 */
export function clearSkillsAction() {
    return {
        type: CLEAR
    };
}
