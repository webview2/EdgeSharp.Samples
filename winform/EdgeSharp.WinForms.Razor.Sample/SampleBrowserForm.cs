using EdgeSharp.Core;
using System.ComponentModel;

namespace EdgeSharp.WinForms.Razor.Sample
{
    public class SampleBrowserForm : BrowserForm
    {
        private AppBuilder<Startup> _appBuilder;

        public SampleBrowserForm()
        {
            Width = 1200;
            Height = 900;
            this.SetAppIcon();
        }

        protected override void Bootstrap()
        {
            //_appBuilder = new AppBuilder<Startup>();
            //ServiceLocator.Bootstrap(_appBuilder);
            //base.Bootstrap();
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            //_appBuilder?.Stop();
            base.OnClosing(e);
        }
    }
}

