using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Hackathon.Pages
{
    public class GameSimulatorModel : PageModel
    {
        public void OnGet()
        {
            if (String.IsNullOrEmpty(HttpContext.Session.GetString("ID")))
            {
                var id = HttpContext.Session.Id;
                HttpContext.Session.SetString("ID", id);
                ViewData["Name"] = null;
            }
            else
            {
                ViewData["Name"] = HttpContext.Session.GetString("Name");
            }
        }

        public void OnPostRegister()
        {
            ViewData["Name"] = Request.Form["name"];
            HttpContext.Session.SetString("Name", Request.Form["name"]);
        }

    }
}
