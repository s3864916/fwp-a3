import React, { useState, useContext } from "react";

export default function CreateEmpForm() {

    const [fields, setFields] = useState({"fullName":"", "email":"", skills:[], "proficiency":""});
    const [skill, setSkill] = useState({"skillName":"", "skillExp":""});

    const handleSkillChange = (event) => {
        setSkill({...skill, [event.target.name]: event.target.value})
    }

    const addSkill = (event) => {
        event.preventDefault();
        if (skill.skillName.trim() === "" && skill.skillExp.trim() === "") {
            console.log("prevent empty");
            return 
        }
        setFields({...fields, "skills": [...fields.skills, skill]});
        setSkill({"skillName":"", "skillExp":""});
    }

    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
        console.log(fields);
      };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fields)
        setFields({"fullName":"", "email":"", skills:[], "proficiency":""})
    }

  return (
    <div className="card border-primary m-3">
        <div className="card-header text-bg-primary" style={{fontWeight:"bold"}}>
            Create Employee
        </div>
        <div className="card-body">
            <div className="md-3">
                <form className="form">
                    <div className="form-group mb-3">
                        <label htmlFor="fullName" className="me-10 col-md-2 col-control-label">Full Name</label>
                        <input type="text" name="fullName" id="fullName" className="col-md-6 col-form-control"
                            value={fields.fullName} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="me-10 col-md-2 col-control-label">Email</label>
                        <input type="email" name="email" id="email" className="col-md-6 col-form-control"
                            value={fields.email} onChange={handleInputChange}/>
                    </div>
                    <div className="form-group mb-3">
                        <div className="mb-3">
                            <label className="me-10 col-md-2 col-control-label"></label>
                            <button type="button" className="btn btn-secondary col-md-6" 
                            onClick={addSkill}>Add a new skill</button>
                        </div>

                        <label htmlFor="skill" className="me-10 col-md-2 col-control-label">Skill</label>
                        <input type="text" name="skillName" id="skillName" className="me-3 col-md-3 col-form-control"
                            placeholder={"Name"} value={skill.skillName} onChange={handleSkillChange}/>
                        <input type="number" name="skillExp" id="skillExp" className="me-3 col-md-3 col-form-control"
                        placeholder={"Experience in year"} value={skill.skillExp} onChange={handleSkillChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="proficiency" className="me-10 col-md-2 col-control-label">Proficiency</label>
                        <span className="col-md-6 col-form-control" style={{fontWeight:"normal"}}>
                            <input type="radio" name="proficiency" id="beginner" className="col"
                                value="beginner" onChange={handleInputChange}/>
                            <label htmlFor="beginner">Beginner</label>
                            <input type="radio" name="proficiency" id="intermediate" className="col"
                                value="intermediate" onChange={handleInputChange}/>
                            <label htmlFor="intermediate">Intermediate</label>
                            <input type="radio" name="proficiency" id="advanced" className="col"
                                value="advanced" onChange={handleInputChange}/>
                            <label htmlFor="advanced">Advanced</label>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <div className="card-footer text-bg-light">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    </div>
  );
}

