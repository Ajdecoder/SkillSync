import { findCandidatesTool } from "./findCandidates";

const fetchfromApi = findCandidatesTool.invoke({
    skills: ["JavaScript", "Node.js"]
})

console.log(fetchfromApi)