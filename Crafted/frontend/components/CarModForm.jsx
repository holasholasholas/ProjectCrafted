
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as garageService from "../services/garageService";
import { usePDF } from 'react-to-pdf'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function CarModForm({ carData }) {

  const navigate = useNavigate();


  
    const { toPDF, targetRef } = usePDF({
      filename: 'CarMods.pdf',
    });

  
  // Initialize form state with default values
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    yearOfManufacture: "",
    modifications: {
      interior: { seats: "", steeringWheel: "" },
      exterior: { wheels: "", spoilers: "" },
      engine: {
        exhaustSystems: { downpipe: "", midpipe: "", muffler: "" },
        ecuTuning: "",
      },
    },
  });

  // Update formData when carData changes
  useEffect(() => {
    if (carData) {
      setFormData(carData);
    }
  }, [carData]);

 // https://react.dev/reference/react/useState
  
 // Fixed handleChange function to handle nested form fields
  const handleChange = (e, section, field, subField) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      // updates level 3
      if (section && field && subField) {
        return {...prevData, modifications: {...prevData.modifications, [section]: {...prevData.modifications[section], [field]: {...prevData.modifications[section][field], [subField]: value,
              },
            },
          },
        };
        //updates level 2
      } else if (section && field) {
        return {
          ...prevData,
          modifications: {
            ...prevData.modifications,
            [section]: {
              ...prevData.modifications[section],
              [field]: value,
            },
          },
        };
      } else {
        // updates level 1
        return {
          ...prevData, [name]: value,
        };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const car_id = carData._id;
      const updateCar = await garageService.editCar(car_id, formData);
      console.log("Form submitted:", updateCar);
      navigate('/garage')
    } catch (error) {
      console.log("Unable to edit car details:", error);
    }
  };

  return (
    <>
    
   <div style={{ display: 'none' }} ref={targetRef}>
  <h2>Car Modifications</h2>
  <p>Car Make: {formData.make}</p>
  <p>Car Model: {formData.model}</p>
  <p>Year of Manufacture: {formData.yearOfManufacture}</p>
  
  <h3>Interior Modifications</h3>
  <p>Seats: {formData.modifications.interior.seats}</p>
  <p>Steering Wheel: {formData.modifications.interior.steeringWheel}</p>
  
  <h3>Exterior Modifications</h3>
  <p>Wheels: {formData.modifications.exterior.wheels}</p>
  <p>Spoilers: {formData.modifications.exterior.spoilers}</p>
  
  <h3>Engine Modifications</h3>
  <p>Exhaust Systems:</p>
  <ul>
    <li>Downpipe: {formData.modifications.engine.exhaustSystems.downpipe}</li>
    <li>Midpipe: {formData.modifications.engine.exhaustSystems.midpipe}</li>
    <li>Muffler: {formData.modifications.engine.exhaustSystems.muffler}</li>
  </ul>
  <p>ECU Tuning: {formData.modifications.engine.ecuTuning}</p>
</div>


    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-5xl">
        <CardHeader color="blue" className="mb-4 p-4">
          <Typography variant="h5" color="black">
            Car Modification Form
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-6 p-6">
          {/* Basic Information Section */}
          <FormSection title="Basic Information">
            <InputField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
            />
            <InputField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
            <InputField
              label="Year of Manufacture"
              name="yearOfManufacture"
              type="number"
              value={formData.yearOfManufacture}
              onChange={handleChange}
            />
          </FormSection>

          {/* Interior Modifications Section */}
          <FormSection title="Interior Modifications">
            <InputField
              label="Seats"
              name="seats"
              value={formData.modifications.interior.seats}
              onChange={(e) => handleChange(e, "interior", "seats")}
            />
            <InputField
              label="Steering Wheel"
              name="steeringWheel"
              value={formData.modifications.interior.steeringWheel}
              onChange={(e) => handleChange(e, "interior", "steeringWheel")}
            />
          </FormSection>

          {/* Exterior Modifications Section */}
          <FormSection title="Exterior Modifications">
            <InputField
              label="Wheels"
              name="wheels"
              value={formData.modifications.exterior.wheels}
              onChange={(e) => handleChange(e, "exterior", "wheels")}
            />
            <InputField
              label="Spoilers"
              name="spoilers"
              value={formData.modifications.exterior.spoilers}
              onChange={(e) => handleChange(e, "exterior", "spoilers")}
            />
          </FormSection>

          {/* Engine Modifications Section */}
          <FormSection title="Engine Modifications">
            <InputField
              label="Downpipe"
              name="downpipe"
              value={formData.modifications.engine.exhaustSystems.downpipe}
              onChange={(e) =>
                handleChange(e, "engine", "exhaustSystems", "downpipe")
              }
            />
            <InputField
              label="Midpipe"
              name="midpipe"
              value={formData.modifications.engine.exhaustSystems.midpipe}
              onChange={(e) =>
                handleChange(e, "engine", "exhaustSystems", "midpipe")
              }
            />
            <InputField
              label="Muffler"
              name="muffler"
              value={formData.modifications.engine.exhaustSystems.muffler}
              onChange={(e) =>
                handleChange(e, "engine", "exhaustSystems", "muffler")
              }
            />
            <InputField
              label="ECU Tuning"
              name="ecuTuning"
              value={formData.modifications.engine.ecuTuning}
              onChange={(e) => handleChange(e, "engine", "ecuTuning")}
            />
          </FormSection>
        </CardBody>

        <CardFooter className="p-6 pt-0 flex justify-end gap-4">
          <Button
            variant="outlined"
            color="red"
            onClick={() => navigate("/garage")}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="green" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="outlined" color="blue" onClick={toPDF}>
            Export to PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}

// Reusable Form Section Component https://stackoverflow.com/questions/65409862/how-to-create-a-reusable-input-field-using-react
const FormSection = ({ title, children }) => (
  <div>
    <Typography variant="h6" className="mb-4 border-b pb-2">
      {title}
    </Typography>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

// Reusable Input Field Component 
const InputField = ({ label, value, onChange, name, type = "text" }) => (
  <div>
    <Typography variant="small" className="mb-2">
      {label}
    </Typography>
    <Input
      size="lg"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  </div>
);