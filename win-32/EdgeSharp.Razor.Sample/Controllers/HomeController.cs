using System.Diagnostics;
using EdgeSharp.Core.Configuration;
using EdgeSharp.Core.Infrastructure;
using EdgeSharp.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EdgeSharp.Razor.Sample.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _config;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IConfiguration config, ILogger<HomeController> logger)
        {
            _config = config;
            _logger = logger;
        }

        public IActionResult Index()
        {
            var info = new Info
            {
                SdkVersion = _config.SdkVersion ?? VersionInfo.SdkVersion,
                RuntimeVersion = _config?.RuntimeVersion
            };

            return View(info);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new Shared.Models.ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
