using EdgeSharp.Core;
using System.ComponentModel;

namespace EdgeSharp.Wpf.RazorPages.Sample
{
    public class SampleWindow : BrowserWindow
    {
        private AppBuilder<Startup> _appBuilder;

        public SampleWindow()
        {
            Width = 1200;
            Height = 900;

            //_appBuilder = new AppBuilder<Startup>();
        }

        protected override void Bootstrap()
        {
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