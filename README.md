# Eavesdrop

## Setup Instructions
### Frontend

1. Clone the repository using
   
   ```
   git clone https://github.com/IshaanShettigar/Eavesdrop.git
   ```

2. Install all dependencies using

   ```
   npm i
   ```

3. Run the code by running the following command in the terminal
   ```
   npm run start
   ```

### Backend
4. For the Backend, run `cd backend` and then:
   ```
   npm install
   ```

5. Create a ` .env ` with the following variables
   * **PORT = 5000**
   * **MONGO_URI = mongodb+srv://<mongousername>:<mongopassword>@cluster0.3wcvvpq.mongodb.net/<DatabaseName>?retryWrites=true&w=majority**

   Replace <mongousername> with your MongoDB user name eg.) ishaanshettigar
   Replace <mongopassword> with your MongoDB password eg.) iitbombay
   Replace <DatabaseName> with the name of your database eg.) Eavesdrop
   
6. Run the following command in your terminal once you have cd'ed into the backend folder

   ```
   node populatedb.js
   ```

7. Run 
   ```   
   npm run dev
   ```


