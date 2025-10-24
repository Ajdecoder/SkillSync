const parseJSON = (text, fallback = {}) => {
  try {
    let clean = text.trim();
    if (clean.startsWith("```")) {
      clean = clean.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    }
    return JSON.parse(clean);
  } catch {
    return fallback;
  }
};

export default parseJSON;
