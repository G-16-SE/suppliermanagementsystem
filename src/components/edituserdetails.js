import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/supplyrecords.css";

export default function editUserDetails() {
  return (
    <div className="Container-fluid">
            <h2>Edit Account Information</h2>

      <Form className="form">
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input type="text" name="Name" id="Name" />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email Address</Label> 
          <Input type="text" name="email" id="email" />
        </FormGroup>
        <FormGroup>
          <Label for="contactno">Contact number</Label>
          <Input type="text"  name="contactno" id="contactno" />
        </FormGroup>

        
        <Button color="primary"> Submit </Button>
      </Form>
    </div>
  );
}
