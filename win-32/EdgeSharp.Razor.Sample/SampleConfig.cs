using EdgeSharp.Core.Defaults;
using EdgeSharp.Core.Infrastructure;
using System;

namespace EdgeSharp.Razor.Sample
{
    internal class SampleConfig : Configuration
    {
        public SampleConfig() : base()
        {
            // var localResource = new UrlScheme("http", "app", null, UrlSchemeType.ResourceRequest);
            var hostToFolderscheme = new UrlScheme("http", "app", "app", UrlSchemeType.HostToFolder);

            //  UrlSchemes.Add(localResource);
            UrlSchemes.Add(hostToFolderscheme);

            var appDirectory = AppDomain.CurrentDomain.BaseDirectory;
            //var initialUrl = Path.Combine(appDirectory, "app", "index.html");
            var initialUrl = "https://edgesharp.owin.com/";
            //var initialUrl = "https://edgesharp.test/";
            StartUrl = initialUrl;

            // Make borderless
            // WindowOptions.Borderless = true;
        }
    }
}