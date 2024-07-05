import { Modal } from "mod-mod-modal-for-msg-registry";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import states from "../data/states.json";
import status from "../data/statusEmployee.json";
import { addEmployee } from "../store/employeeSlice";
import DatesPicker from "./DatesPicker";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { NumberInput } from "./NumberInput";

function Form() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  console.log(employees);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    startDate: null,
    street: "",
    city: "",
    zipcode: 0,
    statsSelection: "",
    depSelection: "",
  });
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDate = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dateOfBirth ||
      !formData.startDate ||
      !formData.street ||
      !formData.city ||
      !formData.zipcode ||
      !formData.statsSelection ||
      !formData.depSelection
    ) {
      setModalMessage("Please fill in all required fields.");
      setIsModalOpen(true);
      return;
    }

    const newPerson = {
      ...formData,
      dateOfBirth: formData.dateOfBirth?.format("DD-MM-YYYY"),
      startDate: formData.startDate?.format("DD-MM-YYYY"),
    };

    dispatch(addEmployee(newPerson));
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      startDate: null,
      street: "",
      city: "",
      zipcode: 0,
      statsSelection: "",
      depSelection: "",
    });
    setModalMessage("Employee added successfully!");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <div className="flex flex-col m-auto p-62 items-center">
      <h1 className="mt-16">Create Employee</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col max-w-md p-6 gap-6"
        noValidate
      >
        <div className="flex flex-col">
          <Input
            label="FirstName"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <Input
            label="LastName"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <DatesPicker
            func={(value) => handleChangeDate("dateOfBirth", value)}
            formData={formData}
            name="Date Of Birth"
            val="dateOfBirth"
          />
        </div>
        <div className="flex flex-col">
          <DatesPicker
            func={(value) => handleChangeDate("startDate", value)}
            formData={formData}
            name="Start Date"
            val="startDate"
          />
        </div>
        <div className="">
          <div className="flex flex-col gap-6">
            <Input
              label="Street"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />

            <Input
              label="City"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <Dropdown
              buttonLabel="Stats"
              tabData={states.map((state) => ({
                label: state.name,
                value: state.abbreviation,
              }))}
              onSelect={(selectedItem) =>
                setFormData({ ...formData, statsSelection: selectedItem })
              }
            />
            <div>
              <label htmlFor="zipcode">Zip Code</label>
              <NumberInput
                aria-label="Demo number input"
                placeholder="Type a number…"
                value={formData.zipcode}
                name="zipcode"
                onChange={(event, val) => {
                  setFormData({
                    ...formData,
                    zipcode: val,
                  });
                }}
              />
            </div>
          </div>
        </div>

        <Dropdown
          buttonLabel="Department"
          tabData={status.map((statu) => ({
            label: statu.label,
            value: statu.label,
          }))}
          onSelect={(selectedItem) =>
            setFormData({ ...formData, depSelection: selectedItem })
          }
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <p>{modalMessage}</p>
        </Modal>
        <button
          type="submit"
          className="bg-[#65a30d] text-white border-white p-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
