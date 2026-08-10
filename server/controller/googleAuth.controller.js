import axios from 'axios';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Candidate, CandidateUserProfile, Recruiter, RecruiterUserProfile } from '../db/database.js';

export const GoogleLogin = async (req, res) => {
    try {
        const { token, role } = req.body;

        if (!token || !role) {
            return res.status(400).json({ message: 'Token and role are required' });
        }

        // Verify Google Token
        const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
        const googleData = googleRes.data;

        if (!googleData || !googleData.email) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }

        const { email, name, picture, sub: googleId } = googleData;
        const hashedPassword = await bcrypt.hash(googleId, 10); // Dummy password

        let user = null;
        let profile = null;
        let profileCreated = false;

        if (role === 'candidate') {
            user = await Candidate.findOne({ email });
            profile = await CandidateUserProfile.findOne({ email });

            // Case 1: Account missing
            if (!user) {
                user = await new Candidate({
                    googleId,
                    email,
                    name,
                    password: hashedPassword,
                    role,
                }).save();
            }

            // Case 2: Profile missing
            if (!profile) {
                profile = await new CandidateUserProfile({
                    candidateInfo: user._id,
                    profilePicture: picture,
                    email,
                    name,
                    role,
                }).save();
                profileCreated = true;
            }

            // Ensure linkage
            if (!user.candidateProfile) {
                user.candidateProfile = profile._id;
                await user.save();
            }
        }

        else if (role === 'recruiter') {
            user = await Recruiter.findOne({ email });
            profile = await RecruiterUserProfile.findOne({ email });

            // Case 1: Account missing
            if (!user) {
                user = await new Recruiter({
                    googleId,
                    email,
                    name,
                    password: hashedPassword,
                    role,
                }).save();
            }

            // Case 2: Profile missing
            if (!profile) {
                profile = await new RecruiterUserProfile({
                    recruiterInfo: user._id,
                    profilePicture: picture,
                    email,
                    name,
                    role,
                }).save();
                profileCreated = true;
            }

            // Ensure linkage
            if (!user.recruiterProfile) {
                user.recruiterProfile = profile._id;
                await user.save();
            }
        }

        // Generate JWT
        const authToken = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: profileCreated ? "Registered & Logged in Successfully" : "Logged in Successfully",
            token: authToken,
            user,
        });

    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ message: "Login failed. Please try again later." });
    }
};
