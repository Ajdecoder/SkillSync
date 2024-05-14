import Company from '../model/userModal.js';

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
    documents,
  } = req.body;

  try {
    const newReq = new Company({
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
    });

    await newReq.save();

    res.status(201).json({ message: "Get Post created successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Failed to create post. Please try again later." });
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
    documents,
  } = req.body;

  try { 
    const newPost = new Company({
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
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Failed to create post. Please try again later." });
  }
};

export const testRequirement = (req, res) => {
  res.status(201).json({ message: "Test2f was successful" });
};
