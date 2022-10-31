import React, { useState, useContext } from "react";

export default function CreateEmpForm() {

    const [fields, setFields] = useState({ "fullName": "", "email": "", skills: [], "proficiency": "" });
    const [skill, setSkill] = useState({ "skillName": "", "skillExp": "" });
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
            currentErrors[key] = "Allow only English alphabet.  Format:(firstname lastname).";

        // Check email if name validation is pass
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
        return errors === {} ;
    };

    const skillValidation = () => {
        if (!skill.skillName || !skill.skillExp) {
            console.log("false 1");
            return false
        }

        const name = skill.skillName.trim();
        const year = skill.skillExp.trim();

        // Skill name validation
        if (name == "" || name.length > 20) {
            console.log("false 2");
            return false;
        }

        // Skill exp in year validation
        if (!/^[0-9]{1,2}$/.test(year)) {
            console.log("false 3");
            return false;
        }
        if (parseInt(year) < 1 || parseInt(year) > 20) {
            console.log("false 4");
            return false;
        }
        console.log("true");
        return true;
    }


    const handleSkillChange = (event) => {
        setSkill({ ...skill, [event.target.name]: event.target.value })
        console.log(skill);
        setAllowAddSkill(skillValidation())
    }

    const addSkill = (event) => {
        event.preventDefault();
        if (skill.skillName.trim() === "" && skill.skillExp.trim() === "") {
            console.log("prevent empty");
            return
        }
        setFields({ ...fields, "skills": [...fields.skills, skill] });
        setSkill({ "skillName": "", "skillExp": "" });
    }

    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const bb = await handleValidation()
        if(bb)
            setFields({ "fullName": "", "email": "", skills: [], "proficiency": "" })
    }

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
                                <input type="text" name="fullName" id="fullName" className="md-6 col-form-control"
                                    value={fields.fullName} onChange={handleInputChange} />
                                {errors.fullName && 
                                <div className="text-danger">{errors.fullName}</div>
                                }
                            </div>
                        </div>

                        <div className="row form-group mb-3">
                            <label htmlFor="email" className="col-md-2 col-control-label">Email</label>
                            <div className="col">
                                <input type="email" name="email" id="email" className="md-6 col-form-control"
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
                            <label htmlFor="skill" className="col-md-2 col-control-label">Skill</label>
                            <div className="col">
                                <input type="text" name="skillName" id="skillName" className="me-3 col-md-3 col-form-control"
                                    placeholder={"Name"} value={skill.skillName} onChange={handleSkillChange} />
                                <input type="number" name="skillExp" id="skillExp" className="me-3 col-md-3 col-form-control"
                                    placeholder={"Experience in year"} value={skill.skillExp} onChange={handleSkillChange} />
                            </div>
                        </div>
                        
                        <div className="row form-group">
                            <label htmlFor="proficiency" className="me-10 col-md-2 col-control-label">Proficiency</label>
                            <div className="col col-md-6 col-form-control ">
                                <input type="radio" name="proficiency" id="beginner" className="col me-1"
                                    value="beginner" onChange={handleInputChange} />
                                <label className="me-3" htmlFor="beginner">Beginner</label>
                                <input type="radio" name="proficiency" id="intermediate" className="col me-1"
                                    value="intermediate" onChange={handleInputChange} />
                                <label className="me-3" htmlFor="intermediate">Intermediate</label>
                                <input type="radio" name="proficiency" id="advanced" className="col me-1"
                                    value="advanced" onChange={handleInputChange} />
                                <label className="me-3" htmlFor="advanced">Advanced</label>
                            </div>
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

