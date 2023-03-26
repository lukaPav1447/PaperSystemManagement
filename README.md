# PaperSystemManagement  

# Env file   
Create a .env file in then root and add the following:  
  
NODE_ENV = development  
PORT = 5000  
MONGO_URI = your mongodb uri 
JWT_SECRET = 'floki'  
PAYPAL_CLIENT_ID = your paypal client id  

# Install Dependencies (frontend & backend):

npm install  
cd frontend  
npm install  

# Seed database

# Import data  
npm run data:import  

# Destroy data  
npm run data:destroy  

# Sample User Logins  

admin@example.com (Admin)  
123456  
  
professor@example.com (Professor)  
123456  
  
student@example.com (Student)  
123456  
