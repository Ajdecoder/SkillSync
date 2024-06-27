import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostResources() {
  const [post, setPost] = useState({
    company_name: "",
    company_website: "",
    email: "",
    ph_no: "",
    available_expert: [],
    from: "",
    to: "",
    desc_requirement: "",
    address: "Please select a specified address",
    Documents: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let newValue = value;

    if (type === "checkbox") {
      const { available_expert } = post;
      if (checked && !available_expert.includes(value)) {
        newValue = [...available_expert, value];
      } else if (!checked && available_expert.includes(value)) {
        newValue = available_expert.filter((expert) => expert !== value);
      }
    } else if (type === "file") {
      newValue = files[0];
    }

    setPost({
      ...post,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    const requiredFields = [
      "company_name",
      "company_website",
      "email",
      "ph_no",
      "from",
      "to",
      "desc_requirement",
      "address",
      "Documents",
    ];

    for (const field of requiredFields) {
      if (!post[field]) {
        toast.error(`Please fill all fields`);
        return;
      }
    }

    // If all required fields are filled, proceed with form submission
    try {
      const res = await axios.post(
        "http://localhost:9002/requirements/postRequirement",
        post,
        { withCredentials: true }
      );

      if (res.data) {
        setPost({
          company_name: "",
          company_website: "",
          email: "",
          ph_no: "",
          available_expert: [],
          from: "",
          to: "",
          desc_requirement: "",
          address: "Please select a specified address",
          Documents: null,
        });
        toast.success("Resources Post Success");
      }
    } catch (error) {
      console.error("Post failed:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="demo-page">
        <form className="demo-page-content" onSubmit={handleSubmit}>
          <section>
            <div className="href-target" id="input-types"></div>
            <h1>Post a Requirement</h1>
            <p>Companies will Connect to you soon :)</p>

            <div className="nice-form-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Your company name"
                name="company_name"
                value={post.company_name}
                onChange={handleChange}
              />
            </div>

            <div className="nice-form-group">
              <label>Company website</label>
              <input
                type="url"
                placeholder="www.Company.com"
                name="company_website"
                value={post.company_website}
                onChange={handleChange}
                className="icon-left"
              />
            </div>

            <div className="nice-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={post.email}
                onChange={handleChange}
                className="icon-left"
              />
            </div>

            <div className="nice-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Your phonenumber"
                name="ph_no"
                value={post.ph_no}
                onChange={handleChange}
                className="icon-left"
              />
            </div>

            <fieldset className="nice-form-group">
              <legend>Available Expert</legend>
              <div className="nice-form-group">
                <input
                  type="checkbox"
                  id="webDeveloper"
                  name="available_expert"
                  value="Web Developer"
                  checked={post.available_expert.includes("Web Developer")}
                  onChange={handleChange}
                />
                <label htmlFor="webDeveloper">Web Developer</label>

                <input
                  type="checkbox"
                  id="reactDeveloper"
                  name="available_expert"
                  value="React Developer"
                  checked={post.available_expert.includes("React Developer")}
                  onChange={handleChange}
                />
                <label htmlFor="reactDeveloper">React Developer</label>

                <input
                  type="checkbox"
                  id="aiEngineer"
                  name="available_expert"
                  value="AI/ML Engineer"
                  checked={post.available_expert.includes("AI/ML Engineer")}
                  onChange={handleChange}
                />
                <label htmlFor="aiEngineer">AI/ML Engineer</label>
              </div>
            </fieldset>

            <div className="nice-form-group">
              <label>From</label>
              <input
                type="date"
                name="from"
                value={post.from}
                onChange={handleChange}
              />
            </div>

            <div className="nice-form-group">
              <label>To</label>
              <input
                type="date"
                name="to"
                value={post.to}
                onChange={handleChange}
              />
            </div>

            <div className="nice-form-group">
              <label>Describe Available Resources</label>
              <textarea
                rows="5"
                placeholder="More about experts or resources "
                name="desc_requirement"
                value={post.desc_requirement}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="nice-form-group">
              <label>Company Location</label>
              <select
                name="address"
                value={post.address}
                onChange={handleChange}
              >
                <option>Please select a specified address</option>
                <option>Delhi</option>
                <option>Gurugram</option>
                <option>Noida</option>
                <option>Haryana</option>
              </select>
            </div>

            <div className="nice-form-group">
              <label> Upload Docs</label>
              <input type="file" name="Documents" onChange={handleChange} />
            </div>

            <div className="nice-form-group">
              <button className="Button" type="submit" onClick={handleSubmit}>
                Post Resources
              </button>
            </div>
          </section>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </>
  );
}

export default PostResources;
