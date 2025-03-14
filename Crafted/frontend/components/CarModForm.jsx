import React, { useState, useEffect } from "react";
import * as garageService from "../services/garageService";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function CarModForm( {carData} ) {
  
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    yearOfManufacture: "",
    modifications: {
      interior: {
        seats: "",
        steeringWheel: "",
      },
      exterior: {
        wheels: "",
        spoilers: "",
      },
      engine: {
        exhaustSystems: {
          downpipe: "",
          midpipe: "",
          muffler: "",
        },
        ecuTuning: "",
      },
    },
  });

  // Update formData when props changes
  useEffect(() => {
    if (carData) {
      
      // Destructure props to access nested properties
      const {
        make,
        model,
        yearOfManufacture,
        modifications: {
          interior: { seats, steeringWheel },
          exterior: { wheels, spoilers },
          engine: {
            exhaustSystems: { downpipe, midpipe, muffler },
            ecuTuning,
          },
        },
      } = carData;

      // Set formData with destructured values
      setFormData({
        make: make,
        model: model,
        yearOfManufacture: yearOfManufacture,
        modifications: {
          interior: {
            seats: seats,
            steeringWheel: steeringWheel,
          },
          exterior: {
            wheels: wheels,
            spoilers: spoilers,
          },
          engine: {
            exhaustSystems: {
              downpipe: downpipe,
              midpipe: midpipe,
              muffler: muffler,
            },
            ecuTuning: ecuTuning,
          },
        },
      });
    }
  }, [carData]);

  console.log("step 2", formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      modifications: {
        ...prevData.modifications,
        [section]: {
          ...prevData.modifications[section],
          [field]: value,
        },
      },
    }));
  };

  const handleExhaustChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      modifications: {
        ...prevData.modifications,
        engine: {
          ...prevData.modifications.engine,
          exhaustSystems: {
            ...prevData.modifications.engine.exhaustSystems,
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSubmit = async () => {
    console.log(carData)
    try {
      const car_id = carData._id;
      console.log(car_id)

      const carDataToSend = formData
      console.log(carDataToSend)

      const updateCar = await garageService.editCar(car_id, carDataToSend);
      console.log("Form submitted:", updateCar);
    } catch (error) {
      console.log("unable to edit car details");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-5xl">
        <CardHeader color="blue" className="mb-4 p-4">
          <Typography variant="h5" color="black">
            Car Modification Form
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-6 p-6">
          {/* Basic Info Section */}
          <div>
            <Typography variant="h6" className="mb-4 border-b pb-2">
              Basic Information
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography variant="small" className="mb-2">
                  Make
                </Typography>
                <Input
                  size="lg"
                  name="make"
                  value={formData.make}
                  
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Model
                </Typography>
                <Input
                  size="lg"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Year of Manufacture
                </Typography>
                <Input
                  size="lg"
                  name="yearOfManufacture"
                  type="number"
                  value={formData.yearOfManufacture}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Interior Section */}
          <div>
            <Typography variant="h6" className="mb-4 border-b pb-2">
              Interior Modifications
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="small" className="mb-2">
                  Seats
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.interior.seats}
                  onChange={(e) =>
                    handleNestedChange("interior", "seats", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Steering Wheel
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.interior.steeringWheel}
                  onChange={(e) =>
                    handleNestedChange("interior", "steeringWheel", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Exterior Section */}
          <div>
            <Typography variant="h6" className="mb-4 border-b pb-2">
              Exterior Modifications
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="small" className="mb-2">
                  Wheels
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.exterior.wheels}
                  onChange={(e) =>
                    handleNestedChange("exterior", "wheels", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Spoilers
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.exterior.spoilers}
                  onChange={(e) =>
                    handleNestedChange("exterior", "spoilers", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Engine Section */}
          <div>
            <Typography variant="h6" className="mb-4 border-b pb-2">
              Engine Modifications
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="small" className="mb-2">
                  Downpipe
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.engine.exhaustSystems.downpipe}
                  onChange={(e) =>
                    handleExhaustChange("downpipe", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Midpipe
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.engine.exhaustSystems.midpipe}
                  onChange={(e) =>
                    handleExhaustChange("midpipe", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  Muffler
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.engine.exhaustSystems.muffler}
                  onChange={(e) =>
                    handleExhaustChange("muffler", e.target.value)
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Typography variant="small" className="mb-2">
                  ECU Tuning
                </Typography>
                <Input
                  size="lg"
                  value={formData.modifications.engine.ecuTuning}
                  onChange={(e) =>
                    handleNestedChange("engine", "ecuTuning", e.target.value)
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter className="p-6 pt-0 flex justify-end gap-4">
          <Button variant="outlined" color="red" onClick={() => console.log("Cancel clicked")}>
            Cancel
          </Button>
          <Button variant="outlined" color="green" onClick={handleSubmit}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}