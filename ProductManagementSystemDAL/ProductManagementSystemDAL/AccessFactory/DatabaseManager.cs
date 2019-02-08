using ProductManagementSystemDAL.AccessFactory;

namespace ProductManagementSystemDAL.Managers
{
    public class DatabaseManager
    {
        public Database DatabaseObj { get; set; }
        public DatabaseManager(string connStringUsed, string connString)
        {
            DatabaseObj = DatabaseFactory.CreateDatabase(connStringUsed, connString);
        }
    }
}
