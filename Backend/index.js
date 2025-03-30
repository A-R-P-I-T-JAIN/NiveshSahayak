import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory database for demonstration
const users = {};
const otpStore = {};

// Generate random OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// Register Step 1: Basic info + OTP
app.post('/api/register/step1', (req, res) => {
  const { mobileNo } = req.body;
  
  if (!mobileNo) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  // Generate and store OTP (in production, send via SMS)
  const otp = generateOTP();
  otpStore[mobileNo] = {
    otp,
    expiresAt: Date.now() + 300000 // 5 minutes expiration
  };

  console.log(`OTP for ${mobileNo}: ${otp}`); // For testing purposes
  
  res.json({ 
    success: true,
    message: 'OTP sent successfully',
    tempUserId: uuidv4() // Temporary ID for the registration session
  });
});

// Verify OTP
app.post('/api/register/verify-otp', (req, res) => {
  const { mobileNo, otp } = req.body;
  
  if (!otpStore[mobileNo]) {
    return res.status(400).json({ error: 'OTP not requested or expired' });
  }
  console.log(`Verifying OTP for ${mobileNo}: ${otp}`); // For testing purposes
  console.log(`Stored OTP: ${otpStore[mobileNo].otp}`); // For testing purposes
  
  if (otpStore[mobileNo].otp != otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  
  if (Date.now() > otpStore[mobileNo].expiresAt) {
    return res.status(400).json({ error: 'OTP expired' });
  }
  
  // OTP is valid
  delete otpStore[mobileNo];
  res.json({ success: true, message: 'OTP verified successfully' });
});

// Register Step 2: Business info
app.post('/api/register/step2', (req, res) => {
  const { tempUserId, businessIdType, businessId, businessCategory } = req.body;
  
  if (!tempUserId || !businessIdType || !businessId || !businessCategory) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // In a real app, you'd validate business IDs based on type
  res.json({ 
    success: true,
    message: 'Business info saved',
    tempUserId // Pass along for next step
  });
});

// Register Step 3: Ownership info
app.post('/api/register/step3', (req, res) => {
  const { 
    tempUserId,
    ownershipType,
    ownerName,
    partners,
    familyRepName,
    agreedToTerms
  } = req.body;
  
  if (!agreedToTerms) {
    return res.status(400).json({ error: 'You must agree to the terms' });
  }
  
  // Validate based on ownership type
  if (ownershipType === 'Sole Proprietorship' && !ownerName) {
    return res.status(400).json({ error: 'Owner name is required' });
  }
  
  if (ownershipType === 'Partnership Firms' && (!partners || partners.length === 0)) {
    return res.status(400).json({ error: 'Partner information is required' });
  }
  
  if (ownershipType === 'Family-Owned Business' && !familyRepName) {
    return res.status(400).json({ error: 'Family representative name is required' });
  }
  
  // In a real app, you'd save this to your database
  const userId = uuidv4();
  const userData = {
    ...req.body,
    userId,
    registrationCompleted: true,
    createdAt: new Date().toISOString()
  };

  users[userId] = userData;
  const token = uuidv4();
  
  res.json({ 
    success: true,
    message: 'Registration completed successfully',
    userId,
    token, // Send token to client
    user: userData // Send user data if needed
  });
});

app.post('/api/login', (req, res) => {
  const { mobileNo, password } = req.body;
  
  if (!mobileNo || !password) {
    return res.status(400).json({ error: 'Mobile number and password are required' });
  }

  // In a real app, you would:
  // 1. Find the user in your database
  // 2. Verify the password (using bcrypt or similar)
  // 3. Generate a proper JWT token
  
  // For demo purposes, we'll just check if mobileNo exists in our mock users
  const userExists = Object.values(users).some(user => user.mobileNo === mobileNo);
  
  if (!userExists) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a token (in production, use JWT)
  const token = uuidv4();
  
  res.json({ 
    success: true,
    message: 'Login successful',
    token
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});