require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import Routes
const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');
const CartRoute = require('./Routes/cartRoutes'); 
const TreatmentRoute = require('./Routes/treatmentRoutes');
const AuthRoute = require('./Routes/authRoutes');
const AppointmentsRoute = require('./Routes/AppointmentRoutes');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images/pet-image')));

// Use Routes
app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/cart', CartRoute); 
app.use('/api/treatments', TreatmentRoute);
app.use('/api', AppointmentsRoute);


// 🔍 Debug the MONGO_URI value
console.log('Connecting to MongoDB at:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(' Connected to MongoDB');

    const PORT = process.env.PORT || 4000; // Use .env PORT or default
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
  });
