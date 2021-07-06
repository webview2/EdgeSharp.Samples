using EdgeSharp.Core.Configuration;
using EdgeSharp.Core.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace EdgeSharp.Wpf.RazorPages.Sample.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty(SupportsGet = true)]
        public string SdkVersion { get; set; }

        [BindProperty(SupportsGet = true)]
        public string RuntimeVersion { get; set; }

        private readonly IConfiguration _config;
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(IConfiguration config, ILogger<IndexModel> logger)
        {
            _config = config;
            _logger = logger;
        }

        public void OnGet()
        {
            SdkVersion = _config.SdkVersion ?? VersionInfo.SdkVersion;
            RuntimeVersion = _config?.RuntimeVersion;
        }
    }
}
