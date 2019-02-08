using System;

namespace ProductManagementSystemDAL.AccessFactory
{
    //This class will get database type and connection string from config file.
    //For now I have just hardcoded the connection string
    public sealed class DatabaseFactory
    {
        public static Database CreateDatabase(string connectionStringUsed, string connectionString)
        {
            try
            {
                Database createdObject;
                switch (connectionStringUsed)
                {
                    case "SQLConnectionString":
                        createdObject = new SqlDatabase();
                        break;
                    case "OracleConnectionString":
                        createdObject = new SqlDatabase();//Add Oracle database here
                        break;
                    default:
                        createdObject = new SqlDatabase();
                        break;
                }
                createdObject.ConnectionString = connectionString;
                return createdObject;
            }
            catch (Exception excep)
            {
                throw new Exception("Error instantiating database." + excep.Message);
            }
        }
    }
}
