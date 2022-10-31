import React, { useState, useReducer, useEffect } from "react";
import { skillsReducer, initialSkills, addSkillAction, clearSkillsAction} from "../reducer/skill";

export default function CreateEmpForm() {

    const [fields, setFields] = useState({ "fullName": "", "email": "", "skillName": "", "skillExp": "" , "proficiency": "" });
    const [skills, skillsDispatch] = useReducer(skillsReducer, initialSkills);
    const [errors, setErrors] = useState({});
    const [allowAddSkill, setAllowAddSkill] = useState(false)

    const handleValidation = async () => {
        const currentErrors = {};

        let key = "fullName"
        let field = fields.fullName.trim();
        const fullNameREGX = /(^[A-Za-z]){0,60}[ ]([A-Za-z]){0,60}$/
        if (field.length === 0)
            currentErrors[key] = "Name is required.";
        else if (field.length > 60)
            currentErrors[key] = "Too long (over 60 characters).";
        else if (!fullNameREGX.test(field))
            currentErrors[key] = "Allow only English alphabet.  Format as (firstname lastname).";

        // Check email only if when name is validated
        key = "email";
        field = fields.email.trim();
        if (!currentErrors["fullName"]){
            const names = fields.fullName.trim().split(" ")
            const firstName = names[0]
            const lastName = names[1]
            const emailREGX = new RegExp(`^${firstName}.${lastName}@gmail.com$`);
            if (!emailREGX.test(field)){
                currentErrors[key] = "Email format need to be (firstname.lastname@gmail.com)";
            }
        }
        
        setErrors(currentErrors);
        console.log(Object.keys(currentErrors).length === 0 )
        return Object.keys(currentErrors).length === 0 ;
    };

    const skillValidation = () => {
        if (!fields.skillName || !fields.skillExp) {
            return false
        }
        const name = fields.skillName.trim();
        const year = fields.skillExp.trim();
        // Skill name validation
        if (name == "" || name.length > 20) {
            return false;
        }
        // Skill exp in year validation
        if (!/^[0-9]{1,2}$/.test(year)) {
            return false;
        }
        if (parseInt(year) < 1 || parseInt(year) > 20) {
            return false;
        }
        return true;
    }

    const addSkill = (event) => {
        event.preventDefault();
        // Add skill to store
        skillsDispatch(addSkillAction(fields.skillName, fields.skillExp, fields.proficiency));
        // Clear skill for text fields
        setFields({ ...fields, "skillName": "", "skillExp": "", "proficiency": ""});
        setAllowAddSkill(false)
    }

    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(await handleValidation()){
            const employee = {
                "fullName":fields.fullName,
                "email":fields.email,
                "skills":skills,
            }
            localStorage.setItem("employee", JSON.stringify(employee))
            setFields({ "fullName": "", "email": "", "skillName": "", "skillExp": "" , "proficiency": "" })
            skillsDispatch(clearSkillsAction());
        }
    }

    useEffect(()=>{
        // Check valid of add skill button
        setAllowAddSkill(skillValidation())
    },[fields])

    return (
        <div className="card border-primary m-3">
            <div className="card-header text-bg-primary" style={{ fontWeight: "bold" }}>
                Create Employee
            </div>
            <div className="card-body">
                <div className="md-3">
                    <form className="form">

                        <div className="row form-group mb-3">
                            <label htmlFor="fullName" className="col col-md-2 col-control-label">Full Name</label>
                            <div className="col">
                                <input type="text" name="fullName" id="fullName" className="col-md-6 col-form-control"
                                    value={fields.fullName} onChange={handleInputChange} />
                                {errors.fullName && 
                                <div className="text-danger">{errors.fullName}</div>
                                }
                            </div>
                        </div>

                        <div className="row form-group mb-3">
                            <label htmlFor="email" className="col-md-2 col-control-label">Email</label>
                            <div className="col">
                                <input type="email" name="email" id="email" className="col-md-6 col-form-control"
                                    value={fields.email} onChange={handleInputChange} />
                                {errors.email && 
                                <div className="text-danger">{errors.email}</div>
                                } 
                            </div>
                        </div>

                        <div className="row form-group mb-3">
                            <div className="row mb-3">
                                <label className="col-md-2 col-control-label"></label>
                                <div className="col">
                                    <button type="button" className="ms-1 btn btn-secondary col-md-6 btn-sm"
                                        onClick={addSkill} disabled={!allowAddSkill}>Add a new skill</button>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="skill" className="col-md-2 col-control-label">Skill</label>
                                <div className="col col-md-6">
                                    <input type="text" name="skillName" id="skillName" className="me-3 col-md-5 col-form-control"
                                        placeholder={"Name"} value={fields.skillName} onChange={handleInputChange} />
                                    <input type="number" name="skillExp" id="skillExp" className="me-3 col-md-5 col-form-control"
                                        placeholder={"Experience in year"} value={fields.skillExp} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="row">
                                <label htmlFor="proficiency" className="me-10 col-md-2 col-control-label">Proficiency</label>
                                <div className="col col-md-6 col-form-control" >
                                    <input type="radio" name="proficiency" id="beginner" className="col me-1"
                                        value="beginner" onClick={handleInputChange} />
                                    <label className="me-3" htmlFor="beginner" style={{ fontWeight: "normal" }}>Beginner</label>
                                    <input type="radio" name="proficiency" id="intermediate" className="col me-1"
                                        value="intermediate" onClick={handleInputChange} />
                                    <label className="me-3" htmlFor="intermediate" style={{ fontWeight: "normal" }} >Intermediate</label>
                                    <input type="radio" name="proficiency" id="advanced" className="col me-1"
                                        value="advanced" onClick={handleInputChange} />
                                    <label className="me-3" htmlFor="advanced" style={{ fontWeight: "normal" }} >Advanced</label>
                                </div>
                            </div>

                        </div>
                        
                        <div className="row form-group">
                        {skills.length > 0 &&
                            <div className="row mb-3">
                                <label className="col col-md-2 col-control-label"> Skills Table</label>
                                <div className="col col-md-5 col-form-control">
                                    <table class="table table-bordered table-hover">
                                        <thead class="table-secondary">
                                            <tr>
                                            <th scope="col">Skill Name</th>
                                            <th scope="col">Years of Experience</th>
                                            <th scope="col">Proficiency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            skills.map((skill)=>{
                                                return (
                                                    <tr>
                                                        <td>{skill.name}</td>
                                                        <td>{skill.year}</td>
                                                        <td>{skill.proficiency}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            }
                        </div>


                    </form>
                </div>
            </div>
            <div className="card-footer text-bg-light">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}

