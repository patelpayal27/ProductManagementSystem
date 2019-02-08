using ProductManagementSystemDAL.DataModel;
using ProductManagementSystemDAL.Managers;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProductManagementSystemWebApi.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class DataController : ApiController
    {
        private static DatabaseManager _dm = null;
        private static ProductManager _productManager = null;
        DataController()
        {
            string connStringUsed = "SQLConnectionString";
            string connString = System.Configuration.ConfigurationManager.AppSettings["sqlConnString"];
            _dm = new DatabaseManager(connStringUsed, connString);
            _productManager = new ProductManager(_dm.DatabaseObj);
        }

        public List<Product> GetProducts()
        {
            return _productManager.GetProducts(0);
        }

        public List<Product> GetProductsByCatId(int id)
        {
            return _productManager.GetProducts(id);
        }

        public List<ddvalues> GetProductsDtlsForDD()
        {
            return _productManager.GetProductsDtlsForDD();
        }

        public List<ddvalues> GetCategoryDtlsForDD()
        {
            return _productManager.GetCategoryDtlsForDD();
        }

        public List<ProductCategory> GetCategory()
        {
            return _productManager.GetCategory();
        }

        public List<ddvalues> GetAttributesByCatID(int id)
        {
            return _productManager.GetAttributesByCatID(id);
        }


        public Product GetProductDetailsById(int id)
        {
            return _productManager.FetchProduct(id);
        }

        public string PostProductCreate([FromBody] Product product)
        {
            return _productManager.SaveProduct(product);
        }

        public string PostProductUpdate([FromBody] Product product)
        {
            return _productManager.UpdateProduct(product);
        }

        public LoginDetails Login([FromBody] LoginDetails loginDetails)
        {
            return _productManager.Login(loginDetails);
        }
    }
}
