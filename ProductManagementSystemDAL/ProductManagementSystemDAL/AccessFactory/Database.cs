using System.Data;

namespace ProductManagementSystemDAL.AccessFactory
{
    public abstract class Database
    {
        public string ConnectionString;
        #region Abstract Functions
        public abstract IDbConnection CreateConnection();
        public abstract IDbCommand CreateCommand();
        public abstract IDbConnection CreateOpenConnection();
        public abstract IDbCommand CreateCommand(string commandText, IDbConnection connection);
        public abstract IDbCommand CreateStoredProcCommand(string procName, IDbConnection connection);
        public abstract IDataParameter CreateParameter(string parameterName, object parameterValue);
        public abstract IDataParameter CreateParameter(string parameterName, ParameterDirection parameterDirection, int paramterSize);
        #endregion
    }
}
