using EdgeSharp.Core.Defaults;
using EdgeSharp.Core.Infrastructure;
using System;

namespace EdgeSharp.WinForms.Razor.Sample
{
    internal class SampleConfig : Configuration
    {
        public SampleConfig() : base()
        {
           // var localResource = new UrlScheme("http", "app", null, UrlSchemeType.ResourceRequest);
            var hostToFolderscheme = new UrlScheme("http", "app", "app", UrlSchemeType.HostToFolder);
            var requestScheme1 = new UrlScheme("https://github.com/edgesharp/EdgeSharp", true, UrlSchemeType.ExternalBrowser);
            var requestScheme2 = new UrlScheme("https://www.youtube.com/watch?v=-ri7TmPeqLc", true, UrlSchemeType.Blocked);

          //  UrlSchemes.Add(localResource);
            UrlSchemes.Add(hostToFolderscheme);
            UrlSchemes.Add(requestScheme1);
            UrlSchemes.Add(requestScheme2);

            var appDirectory = AppDomain.CurrentDomain.BaseDirectory;
            //var initialUrl = Path.Combine(appDirectory, "htf", "index.html");
            //var initialUrl = Path.Combine(appDirectory, "app", "index.html");
            // var initialUrl = "https://www.bing.com/";
            //var initialUrl = "http://app/index.html";
            // var initialUrl = "http://htf/index.html";
            var initialUrl = "https://edgesharp.owin.com/";
            StartUrl = initialUrl;

            // Make borderless
            // WindowOptions.Borderless = true;
        }
    }
}