using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using ProductManagementSystemDAL.AccessFactory;
using ProductManagementSystemDAL.DataModel;
using Newtonsoft.Json;

namespace ProductManagementSystemDAL.Managers
{
    public class ProductManager
    {
        Database dbObj = null;
        private readonly ResponseManager _responseManager;
        public ProductManager(Database dbObj)
        {
            this.dbObj = dbObj;
            _responseManager = new ResponseManager();
        }

        public List<Product> GetProducts(int id)
        {
            List<Product> lstProduct = new List<Product>();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "SELECT p.ProductId,p.ProductCategoryId,pc.ProductCategoryName,p.Name,p.Description FROM Product p JOIN ProductCategory pc ON p.ProductCategoryId = pc.ProductCategoryId ";
                    if (id > 0) { query = query + " Where p.ProductCategoryId = " + id.ToString(); }
                    query = query + " ORDER BY p.ProductId";
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            var srno = 0;
                            while (reader.Read())
                            {
                                srno++;
                                var product = new Product
                                {
                                    ProductId = reader["ProductId"] == DBNull.Value ? 0 : (int)reader["ProductId"],
                                    ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
                                    ProductCategoryName = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"],
                                    Name = reader["Name"] == DBNull.Value ? "" : (string)reader["Name"],
                                    Description = reader["Description"] == DBNull.Value ? "" : (string)reader["Description"],
                                };
                                lstProduct.Add(product);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
            }
            return lstProduct;
        }

        public List<ddvalues> GetProductsDtlsForDD()
        {
            List<ddvalues> lstData = new List<ddvalues>();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    using (IDbCommand command = dbObj.CreateCommand(
                        "SELECT ProductId,Name FROM Product ORDER BY ProductId",
                        connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            var srno = 0;
                            while (reader.Read())
                            {
                                srno++;
                                var product = new ddvalues
                                {
                                    key = reader["ProductId"] == DBNull.Value ? 0 : (int)reader["ProductId"],
                                    value = reader["Name"] == DBNull.Value ? "" : (string)reader["Name"],
                                };
                                lstData.Add(product);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
            }
            return lstData;
        }

        public List<ProductCategory> GetCategory()
        {
            List<ProductCategory> lstProductCategory = new List<ProductCategory>();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "SELECT ProductCategoryId,ProductCategoryName,ProductCategoryDescription FROM ProductCategory ";
                    query = query + " ORDER BY ProductCategoryId";
                    using (IDbCommand command = dbObj.CreateCommand(query,connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            var srno = 0;
                            while (reader.Read())
                            {
                                srno++;
                                var productCategory = new ProductCategory
                                {
                                    ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
                                    ProductCategoryName = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"],
                                    ProductCategoryDescription = reader["ProductCategoryDescription"] == DBNull.Value ? "" : (string)reader["ProductCategoryDescription"],
                                };
                                lstProductCategory.Add(productCategory);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
            }
            return lstProductCategory;
        }

        public List<ddvalues> GetCategoryDtlsForDD()
        {
            List<ddvalues> lstData = new List<ddvalues>();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    using (IDbCommand command = dbObj.CreateCommand(
                        "SELECT ProductCategoryId,ProductCategoryName FROM ProductCategory ORDER BY ProductCategoryId",
                        connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            var srno = 0;
                            while (reader.Read())
                            {
                                srno++;
                                var product = new ddvalues
                                {
                                    key = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
                                    value = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"],
                                };
                                lstData.Add(product);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
            }
            return lstData;
        }

        public List<ddvalues> GetAttributesByCatID(int id)
        {
            List<ddvalues> lstData = new List<ddvalues>();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "select AttributeId, AttributeName from ProductAttributeLookup where ProductCategoryId = " + id + " order by AttributeId";
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            var srno = 0;
                            while (reader.Read())
                            {
                                srno++;
                                var product = new ddvalues
                                {
                                    key = reader["AttributeId"] == DBNull.Value ? 0 : (int)reader["AttributeId"],
                                    value = reader["AttributeName"] == DBNull.Value ? "" : (string)reader["AttributeName"],
                                };
                                lstData.Add(product);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
            }
            return lstData;
        }

        public string SaveProduct(Product product)
        {
            try
            {
                int prodId = 0;
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "insert into Product values (" +product.ProductCategoryId + ",'" + product.Name+ "','" +product.Description+ "')";
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                        command.Dispose();
                    }
                    query = "Select max(ProductId) from Product";
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        prodId = Convert.ToInt32(command.ExecuteScalar());
                        command.Dispose();
                    }
                    for (int i = 0; i < product.lstProductAttributes.Count; i++)
                    {
                        query = "insert into ProductAttributes values (" + prodId + "," + product.lstProductAttributes[i].AttributeId + ",'" + product.lstProductAttributes[i].AttributeValue + "')";
                        using (IDbCommand command = dbObj.CreateCommand(query, connection))
                        {
                            command.ExecuteNonQuery();
                            command.Dispose();
                        }
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
                return "failure";
            }
            return "success";
        }

        public string UpdateProduct(Product product)
        {
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "update product set Name = '" + product.Name + "', Description ='"+ product.Description + "' where ProductId = " + product.ProductId;
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                        command.Dispose();
                    }
                    for (int i = 0; i < product.lstProductAttributes.Count; i++)
                    {
                        query = "update ProductAttributes set AttributeValue = '"+ product.lstProductAttributes[i].AttributeValue + "' where ProductId = " + product.ProductId + " and AttributeId = " + product.lstProductAttributes[i].AttributeId;
                        using (IDbCommand command = dbObj.CreateCommand(query, connection))
                        {
                            command.ExecuteNonQuery();
                            command.Dispose();
                        }
                    }
                    connection.Dispose();
                }
            }
            catch (Exception)
            {
                return "failure";
            }
            return "success";
        }

        public Product FetchProduct(int productId)
        {
            Product product = new Product();
            try
            {
                using (IDbConnection connection = dbObj.CreateOpenConnection())
                {
                    string query = "select p.ProductId, p.ProductCategoryId, pc.ProductCategoryName, p.Name, p.Description from Product p JOIN ProductCategory pc on p.ProductCategoryId = pc.ProductCategoryId where p.ProductId = " + productId;
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                product.ProductId = reader["ProductId"] == DBNull.Value ? 0 : (int)reader["ProductId"];
                                product.ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"];
                                product.ProductCategoryName = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"];
                                product.Name = reader["Name"] == DBNull.Value ? "" : (string)reader["Name"];
                                product.Description = reader["Description"] == DBNull.Value ? "" : (string)reader["Description"];
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }

                    List<ProductAttributes> lstattr = new List<ProductAttributes>();
                    query = "select pa.AttributeId,pa.AttributeValue,pal.AttributeName, pc.ProductCategoryId, pc.ProductCategoryName from ProductAttributes pa JOIN ProductAttributeLookup pal on pa.AttributeId = pal.AttributeId  JOIN ProductCategory pc on pc.ProductCategoryId = pal.ProductCategoryId where ProductId = " + productId;
                    using (IDbCommand command = dbObj.CreateCommand(query, connection))
                    {
                        using (IDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var data = new ProductAttributes
                                {
                                    ProductId = productId,
                                    AttributeId = reader["AttributeId"] == DBNull.Value ? 0 : (int)reader["AttributeId"],
                                    AttributeValue = reader["AttributeValue"] == DBNull.Value ? "" : (string)reader["AttributeValue"],
                                    AttributeName = reader["AttributeName"] == DBNull.Value ? "" : (string)reader["AttributeName"],
                                    ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
                                    ProductCategoryName = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"],
                                };
                                lstattr.Add(data);
                            }
                            reader.Dispose();
                        }
                        command.Dispose();
                    }
                    connection.Dispose();
                    product.lstProductAttributes = lstattr;
                }
            }
            catch (Exception)
            {
            }
            return product;
        }

        public LoginDetails Login(LoginDetails loginDetails)
        {
            var response = new Response();
            try
            {
                //Temporary Hardcoded username and password//
                if ((loginDetails.username.Equals("admin") && loginDetails.password.Equals("admin123")) || 
                    (loginDetails.username.Equals("user") && loginDetails.password.Equals("user123")))
                {
                    loginDetails.loginStatus = true;
                    loginDetails.loginStatusMsg = "SUCCESS";
                }
                else
                {
                    loginDetails.loginStatus = false;
                    loginDetails.loginStatusMsg = "Username/Password Incorrect";
                }
                response = _responseManager.CreateResponse(null, HttpStatusCode.OK, JsonConvert.SerializeObject(loginDetails));
            }
            catch (Exception ex)
            {
                response = _responseManager.CreateResponse(ex.Message, HttpStatusCode.InternalServerError, null);
            }
            return loginDetails;
        }

        //public Response GetAttributeNameByCategory()
        //{
        //    var response = new Response();
        //    var lstProductAttributes = new List<ProductAttributes>();
        //    try
        //    {
        //        using (IDbConnection connection = dbObj.CreateOpenConnection())
        //        {
        //            using (IDbCommand command = dbObj.CreateCommand(
        //                "SELECT AttributeId,ProductId,ProductCategoryId,AttributeName,AttributeValue FROM ProductCategory ORDER BY ProductCategoryId",
        //                connection))
        //            {
        //                using (IDataReader reader = command.ExecuteReader())
        //                {
        //                    var srno = 0;
        //                    while (reader.Read())
        //                    {
        //                        srno++;
        //                        var productAttributes = new ProductAttributes
        //                        {
        //                            AttributeId = reader["AttributeId"] == DBNull.Value ? 0 : (int)reader["AttributeId"],
        //                            ProductId = reader["ProductId"] == DBNull.Value ? 0 : (int)reader["ProductId"],
        //                            ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
        //                            AttributeName = reader["AttributeName"] == DBNull.Value ? "" : (string)reader["AttributeName"],
        //                            AttributeValue = reader["AttributeValue"] == DBNull.Value ? "" : (string)reader["AttributeValue"],
        //                        };
        //                        lstProductAttributes.Add(productAttributes);
        //                    }
        //                    reader.Dispose();
        //                }
        //                command.Dispose();
        //            }
        //            connection.Dispose();
        //        }
        //        response = _responseManager.CreateResponse(null, HttpStatusCode.OK, JsonConvert.SerializeObject(lstProductAttributes));
        //    }
        //    catch (Exception ex)
        //    {
        //        response = _responseManager.CreateResponse(ex.Message, HttpStatusCode.InternalServerError, null);
        //    }
        //    return response;
        //}

        //public Response GetAttributeByProductAndCategory()
        //{
        //    var response = new Response();
        //    var lstProductCategory = new List<ProductCategory>();
        //    try
        //    {
        //        using (IDbConnection connection = dbObj.CreateOpenConnection())
        //        {
        //            using (IDbCommand command = dbObj.CreateCommand(
        //                "SELECT ProductCategoryId,ProductCategoryName,ProductCategoryDescription FROM ProductCategory ORDER BY ProductCategoryId",
        //                connection))
        //            {
        //                using (IDataReader reader = command.ExecuteReader())
        //                {
        //                    var srno = 0;
        //                    while (reader.Read())
        //                    {
        //                        srno++;
        //                        var productCategory = new ProductCategory
        //                        {
        //                            ProductCategoryId = reader["ProductCategoryId"] == DBNull.Value ? 0 : (int)reader["ProductCategoryId"],
        //                            ProductCategoryName = reader["ProductCategoryName"] == DBNull.Value ? "" : (string)reader["ProductCategoryName"],
        //                            ProductCategoryDescription = reader["ProductCategoryDescription"] == DBNull.Value ? "" : (string)reader["ProductCategoryDescription"],
        //                        };
        //                        lstProductCategory.Add(productCategory);
        //                    }
        //                    reader.Dispose();
        //                }
        //                command.Dispose();
        //            }
        //            connection.Dispose();
        //        }
        //        response = _responseManager.CreateResponse(null, HttpStatusCode.OK, JsonConvert.SerializeObject(lstProductCategory));
        //    }
        //    catch (Exception ex)
        //    {
        //        response = _responseManager.CreateResponse(ex.Message, HttpStatusCode.InternalServerError, null);
        //    }
        //    return response;
        //}
    }
}
