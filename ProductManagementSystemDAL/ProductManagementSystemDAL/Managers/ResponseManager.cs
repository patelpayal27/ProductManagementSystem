using ProductManagementSystemDAL.DataModel;
using System;
using System.Net;

namespace ProductManagementSystemDAL.Managers
{
    public class ResponseManager
    {
        public Response CreateResponse(string errorMessage, HttpStatusCode errorCode, string resultJson)
        {
            return new Response { errorMessage = errorMessage, errorCode = Convert.ToInt32(errorCode), resultJson = resultJson };
        }
    }
}
