# ✅ Task Manager

## 🔗 Live Link  
https://task-manager-app.onrender.com

## 📌 Description  
**Task Manager** is a full-stack **MERN web application** designed to streamline team task assignment and tracking. It features role-based dashboards for both **Admins** and **Users**, with advanced functionalities such as **task management**, **Excel export**, **email notifications**, and **secure authentication with password reset**. Admins can manage users, monitor progress, and assign tasks, while users can view and update their assigned tasks.

## ✨ Features  
- 👥 **Dynamic Dashboards** for both Admin and Users  
- 📤 **Admins can assign tasks** and export user/task lists to **Excel (.xlsx)**  
- 📨 **Email notifications** sent to users on task assignment or update  
- 🔐 **Authentication system** with JWT and bcrypt  
- 🔁 **Password reset** functionality via email  
- 📈 Admin dashboard includes **statistics and status tracking**  
- 📬 Email functionality built with **Nodemailer**  
- 📱 Fully **responsive UI** for all device sizes  

## 🛠️ Technologies Used  
- **React.js** – Frontend UI  
- **Node.js** – Backend runtime  
- **Express.js** – RESTful API  
- **MongoDB** – NoSQL Database  
- **JWT & bcrypt** – Authentication and encryption  
- **Nodemailer** – Email service for reset links & task alerts  
- **XLSX (excel.js)** – Exporting task and user lists  
- **React Router** – Client-side routing  

## ⚙️ Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/task-manager

## ⚙️ Installation  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Maruf-ult/Job_Hunt
   
2. Open the terminal in the repository folder:
 
   ```
   cd task-manager
    ```

3. Install backend dependencies:

   ```
   cd backend
   npm install

    ```

4. Install frontend dependencies:
   
   ```
   cd frontend
   npm install
     ```
5. Configure environment variables
     Create a .env file in the backend directory with the following:

     ```
        PORT=8000
        MONGO_URI=your_mongo_db_connection_string
        JWT_SECRET=your_jwt_secret_key
        ADMIN_INVITE_TOKEN=your_admin_invite_token
        NODE_ENV=development
        SMTP_USER=your_smtp_username
        SMTP_PASS=your_smtp_password
        SENDER_EMAIL=your_sender_email
        CLIENT_URL=http://localhost:3000

     ```
    
6. Configure MongoDB:
- Create an account on MongoDB Compass.
- Create a database and obtain your MongoDB URI.
- Create a `.env` file in the root directory and add your MongoDB URI:

  ```  MONGO_URI=your_mongodb_uri  ```
  

7. Run the backend application:
   
   ```
   cd backend
   npm start
   ```

8. Run the frontend application:
   
   ```
   cd frontend
   npm run dev
   ```


   
Feel free to adapt this template to your project's specific requirements. Happy coding! 🚀

: GitHub - Maruf-ult/Task_Manager
