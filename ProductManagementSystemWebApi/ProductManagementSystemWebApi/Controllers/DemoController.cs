using ProductManagementSystemWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace ProductManagementSystemWebApi.Controllers
{
    public class DemoController : ApiController
    {
        Demo[] products = new Demo[]
        {
            new Demo { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
            new Demo { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
            new Demo { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
        };

        public IEnumerable<Demo> GetDemo()
        {
            return products;
        }

        public IHttpActionResult GetDemo1(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}
