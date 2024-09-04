import React, { useState } from "react";
import "../Resources/Resources.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../utils/AuthContext";
import { Login } from "../Login/Login";

function HireResources() {
  const { loggedInUser } = useAuth();

  const [resources, setResources] = useState({
    company_name: "",
    company_website: "",
    email: "",
    ph_no: "",
    available_expert: [],
    from: "",
    to: "",
    desc_requirement: "",
    address: "Please select a specified address",
    documents: null,
    Cover_Img: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let newValue = value;

    if (type === "checkbox") {
      const { available_expert } = resources;
      if (checked && !available_expert.includes(value)) {
        newValue = [...available_expert, value];
      } else if (!checked && available_expert.includes(value)) {
        newValue = available_expert.filter((expert) => expert !== value);
      }
    } else if (type === "file") {
      newValue = files[0];
    }

    setResources({
      ...resources,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in resources) {
      formData.append(key, resources[key]);
    }

    try {
      const res = await axios.post(
        'http://localhost:9002/api/requirements/getRequirement',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      console.log(res)

      toast.success('resources created successfully!');
      console.log('resources created successfully:', res.data);
    } catch (error) {
      console.error('resources failed:', error.response ? error.response.data : error.message);
      toast.error('An error occurred. Please try again later.');
    }
  };


  return (
    loggedInUser? (
    <>
      <div className="demo-page">
        <form className="demo-page-content" onSubmit={handleSubmit}>
          <section>
            <h1>Hire a Requirement</h1>

            <div className="nice-form-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Your company name"
                name="company_name"
                value={resources.company_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nice-form-group">
              <label>Company Website</label>
              <input
                type="url"
                placeholder="www.Company.com"
                name="company_website"
                value={resources.company_website}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nice-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={resources.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nice-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Your phone number"
                name="ph_no"
                value={resources.ph_no}
                onChange={handleChange}
                required
              />
            </div>

            <fieldset className="nice-form-group">
              <legend>Available Experts</legend>
              <div className="nice-form-group">
                <input
                  type="checkbox"
                  id="softwareEngineer"
                  name="available_expert"
                  value="Software Engineer"
                  checked={resources.available_expert.includes('Software Engineer')}
                  onChange={handleChange}
                />
                <label htmlFor="softwareEngineer">Software Engineer</label>

                <input
                  type="checkbox"
                  id="dataScientist"
                  name="available_expert"
                  value="Data Scientist"
                  checked={resources.available_expert.includes('Data Scientist')}
                  onChange={handleChange}
                />
                <label htmlFor="dataScientist">Data Scientist</label>

                <input
                  type="checkbox"
                  id="uiuxDesigner"
                  name="available_expert"
                  value="UI/UX Designer"
                  checked={resources.available_expert.includes('UI/UX Designer')}
                  onChange={handleChange}
                />
                <label htmlFor="uiuxDesigner">UI/UX Designer</label>
              </div>
            </fieldset>

            <div className="nice-form-group">
              <label>From</label>
              <input
                type="date"
                name="from"
                value={resources.from}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nice-form-group">
              <label>To</label>
              <input
                type="date"
                name="to"
                value={resources.to}
                onChange={handleChange}
                required
              />
            </div>

            <div className="nice-form-group">
              <label>Describe Available Resources</label>
              <textarea
                rows="5"
                placeholder="More about experts or resources"
                name="desc_requirement"
                value={resources.desc_requirement}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="nice-form-group">
              <label>Company Location</label>
              <select
                name="address"
                value={resources.address}
                onChange={handleChange}
                required
              >
                <option>Please select a specified address</option>
                <option>Delhi</option>
                <option>Gurugram</option>
                <option>Noida</option>
                <option>Haryana</option>
              </select>
            </div>

            <div className="nice-form-group">
              <label>Upload Document</label>
              <input
                type="file"
                name="documents"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
              />
            </div>

            <div className="nice-form-group">
              <label>Upload Cover Image</label>
              <input
                type="file"
                name="cover_Img"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <div className="nice-form-group">
              <button className="Button" type="submit">
                Post Resources
              </button>
            </div>
          </section>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </>
    ) : (
      <Login />
    )
  );
}

export default HireResources;
