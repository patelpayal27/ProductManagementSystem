using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductManagementSystemDAL.DataModel
{
    public class Product
    {
        public int ProductId;
        public int ProductCategoryId;
        public string ProductCategoryName;
        public string Name;
        public string Description;
        //public string Description123;
        public List<ProductAttributes> lstProductAttributes;
    }

    public class ddvalues
    {
        public int key;
        public string value;
    }

    public class ProductCategory {
        public int ProductCategoryId;
        public string ProductCategoryName;
        public string ProductCategoryDescription;
    }

    public class ProductAttributes {
        public int AttributeId;
        public int ProductId;
        public int ProductCategoryId;
        public string ProductCategoryName;
        public string AttributeName;
        public string AttributeValue;
    }

    public class LoginDetails
    {
        public string username;
        public string password;
        public string sessionid;
        public bool loginStatus;
        public string loginStatusMsg;
    }

    public class Response
    {
        public string resultJson;
        public int errorCode;
        public string errorMessage;
    }
}
