import { fireEvent, render, screen } from '@testing-library/react';
import App from "../App"
import CreateEmpForm from "../CreateEmpForm";

const nameEmptyErrorMsg = "Name is required."
const nameFormatErrorMsg = "Allow only English alphabet.  Format as (firstname lastname)."
const nameTooLongErrorMsg  = "Too long (over 60 characters)."

const emailFormatErrorMsg = "Email format need to be (firstname.lastname@gmail.com)."




test("Validation test of Full Name", async () => {
    const { container } = render(<CreateEmpForm />);
  
    const fullNameInput = container.querySelector("input#fullName");
    const saveButton = container.querySelector("#save")
    
    // Test: No input to Full Name
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(nameEmptyErrorMsg)

    // Test: Incorrect format of Full Name
    fireEvent.change(fullNameInput, {target: { value: "IanChi" }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(nameFormatErrorMsg)

    // Test: Correct format but too long input to Full Name
    fireEvent.change(fullNameInput, {target: { value: "Iannnnnnnnnnnnnnnnnnnnnnnnnnnnn Chiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii" }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(nameTooLongErrorMsg)

    // Test: Correct input to Full Name
    fireEvent.change(fullNameInput, {target: { value: "Ian Chi" }});
    fireEvent.click(saveButton)
    const nameHasError = container.innerHTML.includes(nameEmptyErrorMsg) 
    || container.innerHTML.includes(nameFormatErrorMsg) || container.innerHTML.includes(nameTooLongErrorMsg)
    expect(nameHasError).toBe(false)

  }); 

  test("Validation test of Email", async () => {
    const { container } = render(<CreateEmpForm />);
  
    const fullNameInput = container.querySelector("input#fullName");
    const emailInput = container.querySelector("input#email")
    const saveButton = container.querySelector("#save")
    
    // Give a correct input of Full Name
    fireEvent.change(fullNameInput, {target: { value: "Ian Chi" }});
    
    // Test: Blank input to Email
    fireEvent.change(emailInput, {target: { value: "  " }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(emailFormatErrorMsg)

    // Test: Incorrect format of Email (not in general email format)
    fireEvent.change(emailInput, {target: { value: "Ian.Chi" }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(emailFormatErrorMsg)

    // Test: Incorrect format of Email (not firstname.lastname@gmail.com)
    fireEvent.change(emailInput, {target: { value: "IanChi@gmail.com" }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(emailFormatErrorMsg)
    
    // Test: Does not contain firstName & lastName in Email (not firstname.lastname@gmail.com)
    fireEvent.change(emailInput, {target: { value: "John.Chen@gmail.com" }});
    fireEvent.click(saveButton)
    expect(container.innerHTML).toContain(emailFormatErrorMsg)

    // Test: Correct Email format
    fireEvent.change(emailInput, {target: { value: "Ian.Chi@gmail.com" }});
    fireEvent.click(saveButton)
    const nameHasError = container.innerHTML.includes(nameEmptyErrorMsg) 
    || container.innerHTML.includes(nameFormatErrorMsg) || container.innerHTML.includes(nameTooLongErrorMsg)
    expect(nameHasError).toBe(false)
    expect(container.innerHTML).not.toContain(emailFormatErrorMsg)
  }); 