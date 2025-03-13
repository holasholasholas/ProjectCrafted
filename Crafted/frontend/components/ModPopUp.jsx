import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export function CarModForm({ setOpen, open, mods }) {
    console.log(mods)
  
  const [formData, setFormData] = useState({
    model: mods?.model || "",
    make: mods?.make || "",
    year: mods?.yearOfManufacture || "",
    interior: {
      seats: mods?.seats || "",
      steeringWheel: mods?.steeringWheel || "",
    },
    exterior: {
      wheels: mods?.wheels || "",
      spoiler: mods?.spoiler || "",
    },
    engine: {
      exhaust: mods?.exhaust || "",
      tuning: mods?.ecu || "",
    },
  });

  
  useEffect(() => {
    setFormData({
      model: mods?.model || "",
      make: mods?.make || "",
      year: mods?.yearOfManufacture || "",
      interior: {
        seats: mods?.seats || "",
        steeringWheel: mods?.steeringWheel || "",
      },
      exterior: {
        wheels: mods?.wheels || "",
        spoiler: mods?.spoiler || "",
      },
      engine: {
        exhaust: mods?.exhaust || "",
        tuning: mods?.ecu || "",
      },
    });
  }, [mods]);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInteriorChange = (e) => {
    setFormData({
      ...formData,
      interior: {
        ...formData.interior,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleExteriorChange = (e) => {
    setFormData({
      ...formData,
      exterior: {
        ...formData.exterior,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleEngineChange = (e) => {
    setFormData({
      ...formData,
      engine: {
        ...formData.engine,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = () => {
    
    const result = {
      model: formData.model,
      make: formData.make,
      yearOfManufacture: formData.year,
      modifications: {
        interior: formData.interior,
        exterior: formData.exterior,
        engine: formData.engine,
      },
    };

    console.log("Form submitted:", result);
    handleOpen();

    
    return result;
  };

  return (
    <>
      <Button onClick={handleOpen}>Modify Car</Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
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
                    Year
                  </Typography>
                  <Input
                    size="lg"
                    name="year"
                    type="number"
                    value={formData.year}
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
                    name="seats"
                    value={formData.interior.seats}
                    onChange={handleInteriorChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Typography variant="small" className="mb-2">
                    Steering Wheel
                  </Typography>
                  <Input
                    size="lg"
                    name="steeringWheel"
                    value={formData.interior.steeringWheel}
                    onChange={handleInteriorChange}
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
                    name="wheels"
                    value={formData.exterior.wheels}
                    onChange={handleExteriorChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Typography variant="small" className="mb-2">
                    Spoiler
                  </Typography>
                  <Input
                    size="lg"
                    name="spoiler"
                    value={formData.exterior.spoiler}
                    onChange={handleExteriorChange}
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
                    Exhaust System
                  </Typography>
                  <Input
                    size="lg"
                    name="exhaust"
                    value={formData.engine.exhaust}
                    onChange={handleEngineChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <Typography variant="small" className="mb-2">
                    ECU Tuning
                  </Typography>
                  <Input
                    size="lg"
                    name="tuning"
                    value={formData.engine.tuning}
                    onChange={handleEngineChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="p-6 pt-0 flex justify-end gap-4">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              Cancel
            </Button>
            <Button variant="outlined" color="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}