import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Candidate, CandidateUserProfile, Recruiter, RecruiterUserProfile } from '../db/database.js';

export const GoogleLogin = async (req, res) => {

    console.log('mai run hogya');
    try {
        const { token, role } = req.body;


        // Verify Google token
        const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);

        if (!googleResponse.data) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }

        const { email, name, picture, sub } = googleResponse.data; // Extract user info

        // Check if the user already exists in Candidate or Recruiter collection
        let user = await Candidate.findOne({ email }) || await Recruiter.findOne({ email });

        if (!user) {
            // Auto-register the user
            const hashedPassword = await bcrypt.hash(sub, 10); // Hash Google ID as password (not used)

            if (role === 'candidate') {
                user = new Candidate({
                    googleId: sub,
                    email,
                    name,
                    password: hashedPassword, // Dummy password
                    role,
                });

                await user.save();

                // Create Candidate Profile
                const candidateProfile = new CandidateUserProfile({
                    candidateInfo: user._id,
                    email,
                    name,
                    role,
                });

                await candidateProfile.save();

                user.candidateProfile = candidateProfile._id; // Link profile to user
                await user.save();
            }
            else if (role === 'recruiter') {
                user = new Recruiter({
                    googleId: sub,
                    email,
                    name,
                    password: hashedPassword, // Dummy password
                    role,
                });

                await user.save();

                // Create Recruiter Profile
                const recruiterProfile = new RecruiterUserProfile({
                    recruiterInfo: user._id,
                    email,
                    name,
                    role,
                });

                await recruiterProfile.save();

                user.recruiterProfile = recruiterProfile._id; // Link profile to user
                await user.save();
            }
        }

        // Generate JWT Token
        const authToken = jwt.sign(
            { userId: user._id, email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie("jwttoken", authToken, { httpOnly: true });

        res.status(200).json({
            message: user.isNew ? "Registered & Logged in Successfully" : "Logged in Successfully",
            token: authToken,
            user,
        });

    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ message: "Login failed. Please try again later." });
    }
};
