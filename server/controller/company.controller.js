import {
    CompanyPostCollection,
    CompanyGetCollection,
  } from "../db/database.js";
  
  export const getRequirement = async (req, res) => {
    const {
      company_name,
      company_website,
      email,
      ph_no,
      available_expert,
      from,
      to,
      desc_requirement,
      address,
    } = req.body;
  
    const documents = req.files["documents"]
      ? req.files["documents"][0].path.replace("public\\", "")
      : null;
    const cover_Img = req.files["cover_Img"]
      ? req.files["cover_Img"][0].path.replace("public\\", "")
      : null;
  
    try {
      const newReq = new CompanyGetCollection({
        company_name,
        company_website,
        email,
        ph_no,
        available_expert,
        from,
        to,
        desc_requirement,
        address,
        documents,
        cover_Img,
      });
  
      await newReq.save();
      res
        .status(201)
        .json({ message: "Get Post created successfully", hiring: true });
    } catch (err) {
      console.error("Error:", err); // Log the error for debugging
      res
        .status(500)
        .json({ message: "Failed to create post. Please try again later." });
    }
  };
  
  export const postRequirement = async (req, res) => {
    const {
      company_name,
      company_website,
      email,
      ph_no,
      available_expert,
      from,
      to,
      desc_requirement,
      address,
      Status,
    } = req.body;
  
    const documents = req.files["documents"]
      ? req.files["documents"][0].path.replace("public\\", "")
      : null;
    const cover_Img = req.files["cover_Img"]
      ? req.files["cover_Img"][0].path.replace("public\\", "")
      : null;
  
    try {
      const newPost = new CompanyPostCollection({
        company_name,
        company_website,
        email,
        ph_no,
        available_expert,
        from,
        to,
        desc_requirement,
        address,
        documents,
        cover_Img,
        Status,
      });
  
      await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", required: true });
    } catch (err) {
      console.error("Error:", err);
      res
        .status(500)
        .json({ message: "Failed to create post. Please try again later." });
    }
  };

  export const allRequirements = async (req, res) => {
    try {
      const data1 = await CompanyGetCollection.find();
  
      const data2 = await CompanyPostCollection.find();
  
      const data = [...data1, ...data2];
  
      res.json({ data });
    } catch (error) {
      console.error(error.message);
    }
  };