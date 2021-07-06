using EdgeSharp.Core;
using Microsoft.Web.WebView2.Core;
using System;

namespace EdgeSharp.WinForms.Sample
{
    public class SampleWebView2Control : WebView2Control
    {
        private AppBuilder<Startup> _appBuilder;

        protected override void Bootstrap()
        {
            //_appBuilder = new AppBuilder<Startup>();
            //ServiceLocator.Bootstrap(_appBuilder);
            base.Bootstrap();
        }

        protected override void OnInitializationCompleted(object sender, CoreWebView2InitializationCompletedEventArgs e)
        {
            base.OnInitializationCompleted(sender, e);
            CoreWebView2.NavigationCompleted += CoreWebView2_NavigationCompleted;
        }

        private void CoreWebView2_NavigationCompleted(object sender, CoreWebView2NavigationCompletedEventArgs e)
        {
        }

        protected override void Dispose(bool disposing)
        {
            //_appBuilder?.Stop();
            base.Dispose(disposing);
        }
    }
}
